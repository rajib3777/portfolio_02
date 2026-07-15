from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    SiteSettingsViewSet, ProfileViewSet, SkillViewSet, ExperienceViewSet, 
    EducationViewSet, ProjectViewSet, ProfessionalActivityViewSet, 
    CertificationViewSet, AchievementViewSet, TestimonialViewSet, 
    BlogPostViewSet, GalleryItemViewSet, MessageViewSet, StatisticViewSet
)

router = DefaultRouter()
router.register(r'settings', SiteSettingsViewSet, basename='settings')
router.register(r'profile', ProfileViewSet, basename='profile')
router.register(r'skills', SkillViewSet, basename='skills')
router.register(r'experience', ExperienceViewSet, basename='experience')
router.register(r'education', EducationViewSet, basename='education')
router.register(r'projects', ProjectViewSet, basename='projects')
router.register(r'activities', ProfessionalActivityViewSet, basename='activities')
router.register(r'certifications', CertificationViewSet, basename='certifications')
router.register(r'achievements', AchievementViewSet, basename='achievements')
router.register(r'testimonials', TestimonialViewSet, basename='testimonials')
router.register(r'blog', BlogPostViewSet, basename='blog')
router.register(r'gallery', GalleryItemViewSet, basename='gallery')
router.register(r'messages', MessageViewSet, basename='messages')
router.register(r'stats', StatisticViewSet, basename='stats')

urlpatterns = [
    path('', include(router.urls)),
]
