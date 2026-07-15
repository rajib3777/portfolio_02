import os
import django

# Set up django environment
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'portfolio_project.settings')
django.setup()

from portfolio.models import (
    SiteSettings, Profile, Skill, Experience, Education, Project, 
    ProfessionalActivity, Certification, Achievement, Testimonial, 
    BlogPost, GalleryItem, Statistic
)

def seed_database():
    print("Clearing old records...")
    SiteSettings.objects.all().delete()
    Profile.objects.all().delete()
    Skill.objects.all().delete()
    Experience.objects.all().delete()
    Education.objects.all().delete()
    Project.objects.all().delete()
    ProfessionalActivity.objects.all().delete()
    Certification.objects.all().delete()
    Achievement.objects.all().delete()
    Testimonial.objects.all().delete()
    BlogPost.objects.all().delete()
    GalleryItem.objects.all().delete()
    Statistic.objects.all().delete()


    print("Creating Site Settings...")
    settings = SiteSettings.objects.create(
        site_name="MD. RAJIBUL ISLAM SHUVO",
        tagline="Full Stack Developer",
        seo_title="MD. RAJIBUL ISLAM SHUVO | Full Stack Developer Portfolio",
        seo_description="Personal portfolio of MD. RAJIBUL ISLAM SHUVO, Full-Stack Developer specializing in Django, React.js, and PostgreSQL.",
        seo_keywords="React, Django, Python, Web Design, Full Stack, Portfolio, Creative Web, PostgreSQL",
        accent_color="purple",
        availability_status="Available for full-time positions & freelance projects",
        social_links={
            "github": "https://github.com",
            "linkedin": "https://linkedin.com",
            "email": "rajibulislam3777@gmail.com"
        }
    )

    print("Creating Profile...")
    Profile.objects.create(
        full_name="MD. RAJIBUL ISLAM SHUVO",
        title="Full Stack Developer",
        bio_summary="Full-Stack Developer specializing in Django, React.js, and PostgreSQL. Experienced in developing REST APIs, responsive web applications, automations, and production-ready software solutions with a focus on performance and scalability.",
        detailed_bio="<p>I am a dedicated Full-Stack Developer specializing in Django, React.js, and PostgreSQL. I have built and maintained robust REST APIs, engineered highly responsive frontends, created scripts to automate business operations, and contributed to production-grade software platforms.</p><p>My engineering focus is on writing modular, clean code, optimizing query database speeds, and ensuring web applications deliver smooth visual interactions and scale seamlessly.</p>",
        location="Dhaka, Bangladesh",
        nationality="Bangladeshi",
        languages=["English (Native)", "Bangla (Native)", "German (Basic)"]
    )

    print("Creating Statistics...")
    Statistic.objects.create(label="Years of Experience", value=2, suffix="+", ordering=1)
    Statistic.objects.create(label="Projects Shipped", value=12, suffix="+", ordering=2)
    Statistic.objects.create(label="Happy Clients", value=10, suffix="+", ordering=3)
    Statistic.objects.create(label="Technologies", value=18, suffix="", ordering=4)

    print("Creating Skills...")
    skills_data = [
        # Backend
        {"name": "Python", "category": "Backend", "level": "Expert", "ordering": 1},
        {"name": "Django", "category": "Backend", "level": "Expert", "ordering": 2},
        {"name": "Django REST Framework (DRF)", "category": "Backend", "level": "Expert", "ordering": 3},
        {"name": "Celery", "category": "Backend", "level": "Advanced", "ordering": 4},
        {"name": "Redis", "category": "Backend", "level": "Advanced", "ordering": 5},
        {"name": "REST APIs", "category": "Backend", "level": "Expert", "ordering": 6},
        {"name": "C", "category": "Backend", "level": "Advanced", "ordering": 7},
        {"name": "C++", "category": "Backend", "level": "Advanced", "ordering": 8},
        
        # Frontend
        {"name": "React.js", "category": "Frontend", "level": "Expert", "ordering": 1},
        {"name": "JavaScript (ES6+)", "category": "Frontend", "level": "Expert", "ordering": 2},
        {"name": "HTML5 & CSS3", "category": "Frontend", "level": "Expert", "ordering": 3},
        {"name": "Tailwind CSS", "category": "Frontend", "level": "Expert", "ordering": 4},
        {"name": "Bootstrap", "category": "Frontend", "level": "Expert", "ordering": 5},
        
        # Database
        {"name": "PostgreSQL", "category": "Database", "level": "Expert", "ordering": 1},
        {"name": "MySQL", "category": "Database", "level": "Advanced", "ordering": 2},
        {"name": "Data Structures", "category": "Database", "level": "Advanced", "ordering": 3},
        {"name": "Algorithms", "category": "Database", "level": "Advanced", "ordering": 4},
        {"name": "OOP Concepts", "category": "Database", "level": "Expert", "ordering": 5},
        
        # Tools / OS
        {"name": "Git & GitHub", "category": "Tools", "level": "Expert", "ordering": 1},
        {"name": "Postman", "category": "Tools", "level": "Expert", "ordering": 2},
        {"name": "Ubuntu Linux", "category": "Tools", "level": "Advanced", "ordering": 3},
        {"name": "Windows", "category": "Tools", "level": "Expert", "ordering": 4},
    ]
    for s in skills_data:
        Skill.objects.create(**s)

    print("Creating Experience...")
    Experience.objects.create(
        company_name="Galaxy TV",
        position="Automation Engineer",
        duration="April 30, 2026 - Present",
        employment_type="Full-Time",
        remote_onsite="Onsite",
        team_size=3,
        technologies=["Python", "Shell Scripting", "Cron Jobs", "Automation"],
        responsibilities="<p>Built and maintained Python automation scripts to streamline business processes, automate repetitive tasks, and improve day-to-day productivity.</p>",
        achievements=[
            "Automated core business report parsing and email delivery services.",
            "Wrote batch processing scripts, reducing manual operational tasks by 80%.",
            "Improved logging systems to trace background automation scripts."
        ],
        reference="HR Department - info@galaxytv.example.com",
        current=True,
        ordering=1
    )
    Experience.objects.create(
        company_name="Code Astro",
        position="Software Developer",
        duration="August 2025 - April 2026",
        employment_type="Full-Time",
        remote_onsite="Remote",
        team_size=5,
        technologies=["Django", "DRF", "React.js", "PostgreSQL", "JWT", "Redis", "Celery", "WebSockets"],
        responsibilities="<p>Worked on production-grade platforms including Captain Aminul Haque IT Institute, Authentic Furniture, chakrirbajar, nibrasfoundation.com, visafarm.com, grihokormi.com, alifmarrigamedia, rnr(e-commerce), and alif agro seeds.</p>",
        achievements=[
            "Contributed to secure JWT authentication architectures across client portals.",
            "Developed responsive frontends in React.js and dynamic, lightweight API routers in Django REST Framework.",
            "Integrated real-time notification feeds, AI-powered job matching algorithms, and webhooks."
        ],
        reference="Project Manager - engineering@codeastro.example.com",
        current=False,
        ordering=2
    )
    Experience.objects.create(
        company_name="Somadhan Soft",
        position="Software Developer Intern",
        duration="Jan 2025 - July 2025",
        employment_type="Internship",
        remote_onsite="Remote",
        team_size=4,
        technologies=["Django", "DRF", "React.js", "PostgreSQL", "JWT", "Bootstrap", "Git"],
        responsibilities="<p>Worked on production-grade platforms like VisaFarm and JobsAlign, contributing to full-stack features, authentication, and webhook notifications.</p>",
        achievements=[
            "Helped integrate third-party webhooks and debug API routing endpoints.",
            "Maintained responsive e-commerce design layouts using Bootstrap CSS and React.",
            "Assisted in database query profiling and database migrations."
        ],
        reference="Intern Supervisor - supervision@somadhansoft.example.com",
        current=False,
        ordering=3
    )

    print("Creating Education...")
    Education.objects.create(
        degree="Bachelor of Computer Science and Engineering (CSE)",
        institution="University of Scholars",
        passing_year="Ongoing",
        result="CGPA 4.00",
        relevant_courses=["Data Structures", "Algorithms", "Object-Oriented Programming (OOP)", "Database Management Systems"],
        achievements="Maintained a perfect 4.00 CGPA in computer science coursework.",
        ordering=1
    )
    Education.objects.create(
        degree="BAMS (Bachelor of Ayurveda Medicine & Surgery)",
        institution="University of Dhaka",
        passing_year="Completed",
        relevant_courses=["Department of Medicine"],
        achievements="Completed medical surgery training coursework.",
        ordering=2
    )
    Education.objects.create(
        degree="CSE Fundamental Course",
        institution="Phitron",
        passing_year="2-Year Program",
        relevant_courses=["C Programming", "C++ Programming", "Data Structures", "Algorithms", "OOP Basics"],
        achievements="Completed a rigorous 2-year software engineering and core fundamentals syllabus.",
        ordering=3
    )

    print("Creating Professional Activities...")
    ProfessionalActivity.objects.create(
        title="Open Source & Freelance Portfolio Building",
        category="Open Source",
        description="<p>Worked on production-grade platforms including Captain Aminul Haque IT Institute, Authentic Furniture, chakrirbajar, nibrasfoundation.com, visafarm.com, grihokormi.com, alifmarrigamedia, rnr(e-commerce), and alif agro seeds. Contributed to authentication, API development, AI-powered job matching, webhook integrations, and full-stack features using Django, DRF, JWT, PostgreSQL, and React.js.</p>",
        date_or_duration="2025 - Present",
        link="https://github.com",
        association="GitHub Community",
        ordering=1
    )
    ProfessionalActivity.objects.create(
        title="Python Operations Automation Tutors",
        category="Mentoring",
        description="<p>Mentored university peers on setting up cron jobs, writing basic file-parsing automations in Python, and deploying backend applications to cloud platforms.</p>",
        date_or_duration="Ongoing",
        association="Developer Peer Groups",
        ordering=2
    )

    print("Creating Projects...")
    # Project 1
    Project.objects.create(
        title="Biddyapath",
        slug="biddyapath",
        version="v1.8.0",
        category="Web App",
        project_status="Completed",
        client="Biddyapath Ltd",
        industry="EdTech",
        team_size=3,
        repository_visibility="Public",
        deployment="Vercel & Render",
        database="PostgreSQL",
        ci_cd="GitHub Actions",
        testing="PyTest & Jest",
        performance_score=95,
        seo_score=98,
        security_score=92,
        downloads_count=450,
        short_description="Architected and developed Biddyapath, a Django-React based EdTech platform with automation, real-time chat, Redis, Celery, Cron jobs, and payment integration to modernize education in Bangladesh.",
        long_description="<p>Biddyapath is a full-featured online education marketplace. It includes real-time messaging using WebSockets, task scheduling via Celery and Redis to dispatch notification emails, payment gateways, and automated cron jobs to manage student subscriptions.</p>",
        technologies=["Django", "React.js", "Redis", "Celery", "PostgreSQL", "WebSockets"],
        duration="5 Months",
        role="Lead Full Stack Developer",
        problem="Online learning portals in Bangladesh lacked real-time feedback loops between students and teachers, and course enrollments required manual processing.",
        solution="Built a unified REST API backend with WebSockets for real-time discussion rooms, background scheduling with Celery, and automated SSLCommerz payment verification.",
        is_featured=True,
        is_pinned=True,
        is_draft=False,
        ordering=1
    )

    # Project 2
    Project.objects.create(
        title="Captain Aminul Haque IT Institute LMS",
        slug="captain-aminul-haque-it-institute",
        version="v1.2.0",
        category="Web App",
        project_status="Completed",
        client="Captain Aminul Haque IT Institute",
        industry="EdTech / Institutional",
        team_size=2,
        repository_visibility="Public",
        deployment="Vercel & AWS",
        database="PostgreSQL",
        ci_cd="GitHub Actions",
        testing="Vitest",
        performance_score=96,
        seo_score=95,
        security_score=94,
        downloads_count=120,
        short_description="Built an LMS using Django, DRF, React.js, PostgreSQL, Redis, Celery, and WebSockets with live classes, video uploads, and real-time interaction.",
        long_description="<p>A comprehensive Learning Management System built for managing live courses. Features structured course categories, file uploads for video materials, student dashboards to review class timings, and interactive quizzes.</p>",
        technologies=["Django", "DRF", "React.js", "PostgreSQL", "Redis", "Celery", "WebSockets"],
        duration="4 Months",
        role="Full Stack Engineer",
        problem="The institution needed a portal that supports both asynchronous class video reviews and synchronous class coordination.",
        solution="Constructed a React dashboard integrated with AWS S3 storage for video files and WebSockets for coordination updates.",
        is_featured=True,
        is_pinned=False,
        is_draft=False,
        ordering=2
    )

    # Project 3
    Project.objects.create(
        title="Authentic Furniture E-Commerce",
        slug="authentic-furniture",
        version="v1.0.0",
        category="E-Commerce",
        project_status="Completed",
        client="Authentic Furniture",
        industry="Retail / E-Commerce",
        team_size=2,
        repository_visibility="Public",
        deployment="Vercel",
        database="PostgreSQL",
        performance_score=98,
        seo_score=97,
        security_score=95,
        downloads_count=350,
        short_description="Built a full-stack furniture application (Django + React) that generates optimized system of furniture decoration with your home design.",
        long_description="<p>Authentic Furniture is an e-commerce platform that allows buyers to browse customized furniture styles, configure decorations, add items to cart, and perform online checkouts.</p>",
        technologies=["Django", "React.js", "Tailwind CSS", "PostgreSQL", "GSAP"],
        duration="3 Months",
        role="Full Stack Developer",
        problem="Users found it difficult to visualize how furniture options fit structurally relative to typical home design themes.",
        solution="Built a clean, responsive frontend showcasing furniture layouts with GSAP animations, backed by a Django REST checkout engine.",
        is_featured=True,
        is_pinned=False,
        is_draft=False,
        ordering=3
    )

    # Project 4
    Project.objects.create(
        title="MicroWorkHub Freelance Platform",
        slug="microworkhub",
        version="v1.0.0",
        category="Web App",
        project_status="Completed",
        client="Personal Project",
        industry="Gig Economy",
        team_size=1,
        repository_visibility="Public",
        deployment="Render",
        database="PostgreSQL",
        performance_score=94,
        seo_score=96,
        security_score=93,
        downloads_count=80,
        short_description="Django, DRF, JWT, Database, Pandas, OOP, React.js, with all the features like Upwork.",
        long_description="<p>MicroWorkHub is a prototype marketplace for freelancers. Freelancers can apply to job postings, mock client wallets hold payments in escrow, and platform usage analytics are generated using Pandas dataframes.</p>",
        technologies=["Django", "DRF", "React.js", "PostgreSQL", "Pandas", "OOP"],
        duration="3 Months",
        role="Sole Developer",
        problem="Existing gig marketplaces charge heavy commissions, making small-scale freelance tasks less viable.",
        solution="Built a custom escrow transaction model and automated invoice matching system to support decentralized work verification.",
        is_featured=False,
        is_pinned=False,
        is_draft=False,
        ordering=4
    )

    print("Creating Testimonials...")
    Testimonial.objects.create(
        client_name="Aminul Haque",
        position="Director",
        company="IT Institute",
        review="Rajibul engineered a flawless custom LMS for our institute. His proficiency in Django WebSockets and database performance made the application incredibly stable under heavy student access loads.",
        rating=5
    )
    Testimonial.objects.create(
        client_name="Sarah Hossain",
        position="Operations Manager",
        company="Galaxy TV",
        review="Shuvo's Python automation scripts resolved our scheduling bottleneck overnight. Tasks that used to take hours now run seamlessly in milliseconds. Highly recommend his backend skills!",
        rating=5
    )

    print("Creating Blog Posts...")
    BlogPost.objects.create(
        title="Automating Scheduled Cron Operations in Django with Celery",
        slug="automating-cron-operations-django-celery",
        summary="A practical walkthrough of how to model background workers, handle task queues in Redis, and write scheduling tasks in Django REST applications.",
        content="<p>Automating reports, scheduling emails, and performing nightly databases cleanups are crucial in business portals. In Django, running heavy tasks inside a standard HTTP request blocks threads, causing delays for other users.</p><p>A robust solution is to defer these operations to background workers like Celery using Redis as a message broker. In this article, we'll configure Celery, set up broker credentials, write a periodic task, and configure django-celery-beat to manage cron schedules from our django admin panel dynamically...</p>",
        category="Backend Architecture",
        tags=["Django", "Celery", "Redis", "Automation"],
        read_time="6 min read",
        author="Md. Rajibul Islam Shuvo",
        is_draft=False
    )
    BlogPost.objects.create(
        title="Designing Responsive Grid Layouts with Tailwind CSS v4",
        slug="responsive-grids-tailwindcss-v4",
        summary="A quick update on style compilation in Tailwind v4: shifting from legacy @tailwind directives to the new @import syntax and theme CSS variables.",
        content="<p>Tailwind CSS v4 introduces significant engine optimizations, moving towards a CSS-first configuration pipeline. This means old configs like tailwind.config.js are replaced by native CSS variable mappings inside a @theme block.</p><p>If you're upgrading, remember that using legacy @tailwind directives causes compiler warnings in PostCSS. Instead, simply write @import 'tailwindcss' at the top of your index.css and extend colors and animation keyframes using native CSS variables. Let's see how we can build a glassmorphic dashboard grid using this new syntax...</p>",
        category="Frontend Development",
        tags=["Tailwind CSS", "React", "CSS Grid", "Vite"],
        read_time="4 min read",
        author="Md. Rajibul Islam Shuvo",
        is_draft=False
    )

    print("Creating Certifications...")
    Certification.objects.create(
        name="CSE Fundamentals Course",
        issuing_organization="Phitron (2-Year Program)",
        issue_date="2025",
        credential_id="PH-CSE-2025",
        ordering=1
    )

    print("Database seeding completed successfully!")

if __name__ == "__main__":
    seed_database()
