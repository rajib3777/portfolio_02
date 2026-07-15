import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'portfolio_project.settings')
django.setup()

from django.contrib.auth.models import User

def create_admin():
    if not User.objects.filter(username='admin').exists():
        User.objects.create_superuser('admin', 'admin@example.com', 'adminpass123')
        print("Superuser 'admin' created successfully with password 'adminpass123'")
    else:
        print("Superuser 'admin' already exists.")

if __name__ == "__main__":
    create_admin()
