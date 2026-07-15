from django.db import models


class SiteSettings(models.Model):
    site_name = models.CharField(max_length=100, default="My Portfolio")
    tagline = models.CharField(max_length=200, blank=True, null=True)
    seo_title = models.CharField(max_length=200, blank=True, null=True)
    seo_description = models.TextField(blank=True, null=True)
    seo_keywords = models.CharField(max_length=255, blank=True, null=True, help_text="Comma-separated")
    google_analytics_id = models.CharField(max_length=50, blank=True, null=True)
    accent_color = models.CharField(max_length=50, default="purple", help_text="e.g. blue, purple, cyan, emerald, orange")
    social_links = models.JSONField(default=dict, blank=True)
    resume_pdf = models.FileField(upload_to='resumes/', blank=True, null=True)
    profile_image = models.ImageField(upload_to='profile/', blank=True, null=True)
    availability_status = models.CharField(max_length=100, default="Available for hire")

    class Meta:
        verbose_name = "Site Settings"
        verbose_name_plural = "Site Settings"

    def __str__(self):
        return self.site_name


class Profile(models.Model):
    full_name = models.CharField(max_length=100)
    title = models.CharField(max_length=100)
    bio_summary = models.TextField()
    detailed_bio = models.TextField()
    location = models.CharField(max_length=100)
    nationality = models.CharField(max_length=100)
    languages = models.JSONField(default=list, blank=True, help_text="List of languages, e.g. ['English', 'Bengali']")

    def __str__(self):
        return self.full_name


class Skill(models.Model):
    LEVEL_CHOICES = [
        ('Beginner', 'Beginner'),
        ('Intermediate', 'Intermediate'),
        ('Advanced', 'Advanced'),
        ('Expert', 'Expert'),
    ]
    name = models.CharField(max_length=50)
    category = models.CharField(max_length=50, help_text="Frontend, Backend, Database, DevOps, Tools, Soft Skills, etc.")
    level = models.CharField(max_length=20, choices=LEVEL_CHOICES, default='Intermediate')
    icon_class = models.CharField(max_length=50, blank=True, null=True, help_text="React Icons name or CSS class")
    ordering = models.IntegerField(default=0)

    class Meta:
        ordering = ['ordering', 'name']

    def __str__(self):
        return f"{self.name} ({self.level})"


class Experience(models.Model):
    EMPLOYMENT_CHOICES = [
        ('Full-Time', 'Full-Time'),
        ('Contract', 'Contract'),
        ('Freelance', 'Freelance'),
        ('Part-Time', 'Part-Time'),
        ('Internship', 'Internship'),
    ]
    REMOTE_CHOICES = [
        ('Remote', 'Remote'),
        ('Onsite', 'Onsite'),
        ('Hybrid', 'Hybrid'),
    ]
    company_name = models.CharField(max_length=100)
    company_logo = models.ImageField(upload_to='companies/', blank=True, null=True)
    company_website = models.URLField(blank=True, null=True)
    position = models.CharField(max_length=100)
    duration = models.CharField(max_length=50, help_text="e.g. Jan 2024 - Present")
    employment_type = models.CharField(max_length=20, choices=EMPLOYMENT_CHOICES, default='Full-Time')
    remote_onsite = models.CharField(max_length=10, choices=REMOTE_CHOICES, default='Remote')
    team_size = models.IntegerField(default=1, blank=True, null=True)
    technologies = models.JSONField(default=list, blank=True, help_text="JSON list of tech used")
    responsibilities = models.TextField(help_text="Summernote RichText description of roles")
    achievements = models.JSONField(default=list, blank=True, help_text="JSON list of key achievements")
    reference = models.TextField(blank=True, null=True, help_text="Name / Contact info of reference")
    current = models.BooleanField(default=False)
    ordering = models.IntegerField(default=0)

    class Meta:
        ordering = ['ordering', '-id']

    def __str__(self):
        return f"{self.position} at {self.company_name}"


class Education(models.Model):
    degree = models.CharField(max_length=100)
    institution = models.CharField(max_length=100)
    passing_year = models.CharField(max_length=50)
    result = models.CharField(max_length=50, blank=True, null=True)
    certificates = models.JSONField(default=list, blank=True, help_text="JSON list of certificates earned")
    relevant_courses = models.JSONField(default=list, blank=True, help_text="JSON list of courses")
    achievements = models.TextField(blank=True, null=True, help_text="Achievements or honors")
    ordering = models.IntegerField(default=0)

    class Meta:
        ordering = ['ordering', '-passing_year']
        verbose_name_plural = "Education"

    def __str__(self):
        return f"{self.degree} - {self.institution}"


class Project(models.Model):
    STATUS_CHOICES = [
        ('Active', 'Active'),
        ('Archived', 'Archived'),
        ('Completed', 'Completed'),
        ('In Development', 'In Development'),
    ]
    VISIBILITY_CHOICES = [
        ('Public', 'Public'),
        ('Private', 'Private'),
    ]
    title = models.CharField(max_length=100)
    slug = models.SlugField(unique=True)
    version = models.CharField(max_length=20, default="v1.0.0")
    category = models.CharField(max_length=50, help_text="Web App, Mobile, Open Source, etc.")
    project_status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='Completed')
    client = models.CharField(max_length=100, blank=True, null=True)
    industry = models.CharField(max_length=100, blank=True, null=True)
    team_size = models.IntegerField(default=1)
    repository_visibility = models.CharField(max_length=10, choices=VISIBILITY_CHOICES, default='Public')
    deployment = models.CharField(max_length=50, default="Vercel")
    live_server = models.URLField(blank=True, null=True)
    api_documentation = models.URLField(blank=True, null=True)
    database = models.CharField(max_length=50, default="SQLite")
    ci_cd = models.CharField(max_length=100, default="GitHub Actions")
    testing = models.CharField(max_length=100, default="Jest / PyTest")
    performance_score = models.IntegerField(default=90, help_text="Lighthouse Performance Score")
    seo_score = models.IntegerField(default=90, help_text="Lighthouse SEO Score")
    security_score = models.IntegerField(default=90, help_text="Security Audit Score")
    future_roadmap = models.JSONField(default=list, blank=True, help_text="JSON list of future goals")
    downloads_count = models.IntegerField(default=0)
    
    thumbnail = models.ImageField(upload_to='projects/', blank=True, null=True)
    short_description = models.TextField()
    long_description = models.TextField(help_text="Summernote RichText long description")
    technologies = models.JSONField(default=list, blank=True, help_text="JSON list of tech tags")
    duration = models.CharField(max_length=50, help_text="e.g. 3 Months")
    role = models.CharField(max_length=100, default="Lead Developer")
    
    problem = models.TextField(blank=True, null=True)
    solution = models.TextField(blank=True, null=True)
    architecture = models.TextField(blank=True, null=True, help_text="Architecture explanation or details")
    features = models.JSONField(default=list, blank=True, help_text="JSON list of features")
    
    github_link = models.URLField(blank=True, null=True)
    demo_link = models.URLField(blank=True, null=True)
    
    challenges = models.TextField(blank=True, null=True)
    lessons_learned = models.TextField(blank=True, null=True)
    video_url = models.URLField(blank=True, null=True, help_text="YouTube or direct video preview link")
    
    is_featured = models.BooleanField(default=False)
    is_pinned = models.BooleanField(default=False)
    is_draft = models.BooleanField(default=False)
    ordering = models.IntegerField(default=0)

    class Meta:
        ordering = ['ordering', '-id']

    def __str__(self):
        return self.title


class ProjectImage(models.Model):
    project = models.ForeignKey(Project, on_delete=models.CASCADE, related_name='images')
    image = models.ImageField(upload_to='projects/gallery/')
    caption = models.CharField(max_length=200, blank=True, null=True)

    def __str__(self):
        return f"Gallery Image for {self.project.title}"


class ProfessionalActivity(models.Model):
    ACTIVITY_CHOICES = [
        ('Open Source', 'Open Source'),
        ('Speaking', 'Speaking'),
        ('Mentoring', 'Mentoring'),
        ('Volunteer', 'Volunteer'),
        ('Research', 'Research'),
        ('Publications', 'Publications'),
    ]
    title = models.CharField(max_length=150)
    category = models.CharField(max_length=20, choices=ACTIVITY_CHOICES, default='Open Source')
    description = models.TextField(help_text="Rich text content")
    date_or_duration = models.CharField(max_length=100, help_text="e.g. PyCon 2025 or Ongoing")
    link = models.URLField(blank=True, null=True)
    association = models.CharField(max_length=150, blank=True, null=True, help_text="e.g. IEEE, GitHub Org, etc.")
    ordering = models.IntegerField(default=0)

    class Meta:
        ordering = ['ordering', '-id']
        verbose_name_plural = "Professional Activities"

    def __str__(self):
        return f"[{self.category}] {self.title}"


class Certification(models.Model):
    name = models.CharField(max_length=150)
    issuing_organization = models.CharField(max_length=150)
    issue_date = models.CharField(max_length=50)
    credential_url = models.URLField(blank=True, null=True)
    credential_id = models.CharField(max_length=100, blank=True, null=True)
    image = models.ImageField(upload_to='certifications/', blank=True, null=True)
    ordering = models.IntegerField(default=0)

    class Meta:
        ordering = ['ordering', '-id']

    def __str__(self):
        return self.name


class Achievement(models.Model):
    CATEGORY_CHOICES = [
        ('Awards', 'Awards'),
        ('Hackathons', 'Hackathons'),
        ('Competitions', 'Competitions'),
        ('Open Source', 'Open Source Contribution'),
        ('Community', 'Community Contribution'),
    ]
    title = models.CharField(max_length=150)
    description = models.TextField()
    date = models.CharField(max_length=50)
    award_provider = models.CharField(max_length=150, blank=True, null=True)
    category = models.CharField(max_length=20, choices=CATEGORY_CHOICES, default='Awards')
    credential_url = models.URLField(blank=True, null=True)

    def __str__(self):
        return self.title


class Testimonial(models.Model):
    client_name = models.CharField(max_length=100)
    position = models.CharField(max_length=100)
    company = models.CharField(max_length=100)
    review = models.TextField()
    rating = models.IntegerField(default=5, help_text="Rating out of 5")
    image = models.ImageField(upload_to='testimonials/', blank=True, null=True)
    is_visible = models.BooleanField(default=True)

    def __str__(self):
        return f"{self.client_name} - {self.company}"


class BlogPost(models.Model):
    title = models.CharField(max_length=200)
    slug = models.SlugField(unique=True)
    summary = models.TextField()
    content = models.TextField(help_text="Summernote or Markdown content")
    category = models.CharField(max_length=50)
    tags = models.JSONField(default=list, blank=True, help_text="JSON list of tags, e.g. ['React', 'CSS']")
    read_time = models.CharField(max_length=20, help_text="e.g. 5 min read")
    image = models.ImageField(upload_to='blog/', blank=True, null=True)
    author = models.CharField(max_length=100, default="Author")
    is_draft = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    seo_title = models.CharField(max_length=200, blank=True, null=True)
    seo_description = models.TextField(blank=True, null=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return self.title


class GalleryItem(models.Model):
    title = models.CharField(max_length=100, blank=True)
    image = models.ImageField(upload_to='gallery/')
    category = models.CharField(max_length=50, default="Photography")
    aspect_ratio = models.CharField(
        max_length=30,
        default="aspect-square",
        help_text="Tailwind aspect classes: aspect-square, aspect-video, aspect-[3/4], aspect-[4/3]"
    )

    def __str__(self):
        return self.title or f"Gallery Item {self.id}"


class Message(models.Model):
    sender_name = models.CharField(max_length=100)
    email = models.EmailField()
    phone = models.CharField(max_length=20, blank=True, null=True)
    subject = models.CharField(max_length=200)
    body = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    is_read = models.BooleanField(default=False)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return f"Message from {self.sender_name} - {self.subject}"


class Statistic(models.Model):
    label = models.CharField(max_length=100)
    value = models.IntegerField()
    suffix = models.CharField(max_length=10, default="+", blank=True)
    ordering = models.IntegerField(default=0)

    class Meta:
        ordering = ['ordering', 'label']

    def __str__(self):
        return f"{self.label}: {self.value}{self.suffix}"

