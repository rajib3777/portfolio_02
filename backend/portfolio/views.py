from rest_framework import viewsets, mixins, status
from rest_framework.response import Response
from rest_framework.decorators import action
from django.shortcuts import get_object_or_404
from django.db.models import Q
from .models import (
    SiteSettings, Profile, Skill, Experience, Education, Project, 
    ProfessionalActivity, Certification, Achievement, Testimonial, 
    BlogPost, GalleryItem, Message, Statistic
)
from .serializers import (
    SiteSettingsSerializer, ProfileSerializer, SkillSerializer, 
    ExperienceSerializer, EducationSerializer, ProjectSerializer, 
    ProfessionalActivitySerializer, CertificationSerializer, 
    AchievementSerializer, TestimonialSerializer, BlogPostSerializer, 
    GalleryItemSerializer, MessageSerializer, StatisticSerializer
)

class SiteSettingsViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = SiteSettings.objects.all()
    serializer_class = SiteSettingsSerializer

    def list(self, request):
        settings = SiteSettings.objects.first()
        if not settings:
            # Create a default settings object if none exists
            settings = SiteSettings.objects.create(site_name="Developer Portfolio")
        serializer = self.get_serializer(settings)
        return Response(serializer.data)


class ProfileViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer

    def list(self, request):
        profile = Profile.objects.first()
        if not profile:
            profile = Profile.objects.create(
                full_name="John Doe",
                title="Lead Software Engineer",
                bio_summary="Creative Full Stack Developer designing elegant web solutions.",
                detailed_bio="<p>Passionate about building performant systems and high-fidelity user interfaces.</p>",
                location="Dhaka, Bangladesh",
                nationality="Bangladeshi"
            )
        serializer = self.get_serializer(profile)
        return Response(serializer.data)


class SkillViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Skill.objects.all()
    serializer_class = SkillSerializer


class ExperienceViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Experience.objects.all()
    serializer_class = ExperienceSerializer


class EducationViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Education.objects.all()
    serializer_class = EducationSerializer


class ProjectViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Project.objects.filter(is_draft=False)
    serializer_class = ProjectSerializer
    lookup_field = 'slug'

    def get_queryset(self):
        queryset = Project.objects.filter(is_draft=False)
        is_featured = self.request.query_params.get('featured', None)
        is_pinned = self.request.query_params.get('pinned', None)
        category = self.request.query_params.get('category', None)
        search = self.request.query_params.get('search', None)

        if is_featured == 'true':
            queryset = queryset.filter(is_featured=True)
        if is_pinned == 'true':
            queryset = queryset.filter(is_pinned=True)
        if category:
            queryset = queryset.filter(category__iexact=category)
        if search:
            queryset = queryset.filter(
                Q(title__icontains=search) | 
                Q(short_description__icontains=search) | 
                Q(technologies__icontains=search)
            )
        return queryset


class ProfessionalActivityViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = ProfessionalActivity.objects.all()
    serializer_class = ProfessionalActivitySerializer

    def get_queryset(self):
        queryset = ProfessionalActivity.objects.all()
        category = self.request.query_params.get('category', None)
        if category:
            queryset = queryset.filter(category__iexact=category)
        return queryset


class CertificationViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Certification.objects.all()
    serializer_class = CertificationSerializer


class AchievementViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Achievement.objects.all()
    serializer_class = AchievementSerializer


class TestimonialViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Testimonial.objects.filter(is_visible=True)
    serializer_class = TestimonialSerializer


class BlogPostViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = BlogPost.objects.filter(is_draft=False)
    serializer_class = BlogPostSerializer
    lookup_field = 'slug'

    def get_queryset(self):
        queryset = BlogPost.objects.filter(is_draft=False)
        category = self.request.query_params.get('category', None)
        search = self.request.query_params.get('search', None)
        
        if category:
            queryset = queryset.filter(category__iexact=category)
        if search:
            queryset = queryset.filter(
                Q(title__icontains=search) | 
                Q(summary__icontains=search) |
                Q(content__icontains=search)
            )
        return queryset


class GalleryItemViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = GalleryItem.objects.all()
    serializer_class = GalleryItemSerializer


class MessageViewSet(mixins.CreateModelMixin, viewsets.GenericViewSet):
    queryset = Message.objects.all()
    serializer_class = MessageSerializer

    def create(self, request, *args, **kwargs):
        # We can implement rate limiting here if desired, but default validation works great
        return super().create(request, *args, **kwargs)


class StatisticViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Statistic.objects.all()
    serializer_class = StatisticSerializer

