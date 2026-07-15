from django.contrib import admin
from django_summernote.admin import SummernoteModelAdmin
from .models import (
    SiteSettings, Profile, Skill, Experience, Education, Project, 
    ProjectImage, ProfessionalActivity, Certification, Achievement, 
    Testimonial, BlogPost, GalleryItem, Message, Statistic
)

class ProjectImageInline(admin.TabularInline):
    model = ProjectImage
    extra = 1


@admin.register(SiteSettings)
class SiteSettingsAdmin(admin.ModelAdmin):
    list_display = ('site_name', 'accent_color', 'availability_status')


@admin.register(Profile)
class ProfileAdmin(SummernoteModelAdmin):
    summernote_fields = ('detailed_bio',)
    list_display = ('full_name', 'title', 'location')


@admin.register(Skill)
class SkillAdmin(admin.ModelAdmin):
    list_display = ('name', 'category', 'level', 'ordering')
    list_filter = ('category', 'level')
    search_fields = ('name',)
    list_editable = ('ordering',)


@admin.register(Experience)
class ExperienceAdmin(SummernoteModelAdmin):
    summernote_fields = ('responsibilities',)
    list_display = ('position', 'company_name', 'duration', 'employment_type', 'remote_onsite', 'ordering')
    list_filter = ('employment_type', 'remote_onsite')
    search_fields = ('position', 'company_name')
    list_editable = ('ordering',)


@admin.register(Education)
class EducationAdmin(admin.ModelAdmin):
    list_display = ('degree', 'institution', 'passing_year', 'ordering')
    search_fields = ('degree', 'institution')
    list_editable = ('ordering',)


@admin.register(Project)
class ProjectAdmin(SummernoteModelAdmin):
    summernote_fields = ('long_description', 'problem', 'solution', 'challenges', 'lessons_learned', 'architecture')
    list_display = ('title', 'version', 'category', 'project_status', 'is_featured', 'is_pinned', 'is_draft', 'ordering')
    list_filter = ('category', 'project_status', 'is_featured', 'is_pinned', 'is_draft')
    search_fields = ('title', 'short_description')
    prepopulated_fields = {'slug': ('title',)}
    list_editable = ('is_featured', 'is_pinned', 'is_draft', 'ordering')
    inlines = [ProjectImageInline]


@admin.register(ProfessionalActivity)
class ProfessionalActivityAdmin(SummernoteModelAdmin):
    summernote_fields = ('description',)
    list_display = ('title', 'category', 'date_or_duration', 'association', 'ordering')
    list_filter = ('category',)
    search_fields = ('title', 'association')
    list_editable = ('ordering',)


@admin.register(Certification)
class CertificationAdmin(admin.ModelAdmin):
    list_display = ('name', 'issuing_organization', 'issue_date', 'ordering')
    search_fields = ('name', 'issuing_organization')
    list_editable = ('ordering',)


@admin.register(Achievement)
class AchievementAdmin(admin.ModelAdmin):
    list_display = ('title', 'date', 'award_provider', 'category')
    list_filter = ('category',)
    search_fields = ('title', 'award_provider')


@admin.register(Testimonial)
class TestimonialAdmin(admin.ModelAdmin):
    list_display = ('client_name', 'company', 'rating', 'is_visible')
    list_filter = ('rating', 'is_visible')
    search_fields = ('client_name', 'company')
    list_editable = ('is_visible',)


@admin.register(BlogPost)
class BlogPostAdmin(SummernoteModelAdmin):
    summernote_fields = ('content',)
    list_display = ('title', 'category', 'read_time', 'is_draft', 'created_at')
    list_filter = ('category', 'is_draft')
    search_fields = ('title', 'summary')
    prepopulated_fields = {'slug': ('title',)}
    list_editable = ('is_draft',)


@admin.register(GalleryItem)
class GalleryItemAdmin(admin.ModelAdmin):
    list_display = ('title', 'category', 'aspect_ratio')
    list_filter = ('category',)
    search_fields = ('title',)


@admin.register(Message)
class MessageAdmin(admin.ModelAdmin):
    list_display = ('sender_name', 'email', 'subject', 'created_at', 'is_read')
    list_filter = ('is_read', 'created_at')
    search_fields = ('sender_name', 'email', 'subject', 'body')
    readonly_fields = ('sender_name', 'email', 'phone', 'subject', 'body', 'created_at')


@admin.register(Statistic)
class StatisticAdmin(admin.ModelAdmin):
    list_display = ('label', 'value', 'suffix', 'ordering')
    list_editable = ('value', 'suffix', 'ordering')
    search_fields = ('label',)

