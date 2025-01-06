import os
import dj_database_url
from .settings import *
from .settings import BASE_DIR

ALLOWED_HOSTS = [
    "localhost",
    "127.0.0.1",
    # ***** NEED TO ADD OUR URL HERE ***** #
    "http://mus-7du3.onrender.com",
    "http://musplays.netlify.app",
    "mus-7du3.onrender.com",
]

CSRF_TRUSTED_ORIGINS = ['https://mus-7du3.onrender.com']

DEBUG = False
SECRET_KEY = env('SECRET_KEY')

MIDDLEWARE = [
    "django.middleware.security.SecurityMiddleware",
    "whitenoise.middleware.WhiteNoiseMiddleware",
    'corsheaders.middleware.CorsMiddleware',
    "django.middleware.common.CommonMiddleware",
    "django.contrib.sessions.middleware.SessionMiddleware",
    "django.middleware.csrf.CsrfViewMiddleware",
    "django.contrib.auth.middleware.AuthenticationMiddleware",
    "django.contrib.messages.middleware.MessageMiddleware",
    "django.middleware.clickjacking.XFrameOptionsMiddleware",
]

# CORS_ALLOWED_ORIGINS = [
#     "http://localhost:3000",  
#     "http://localhost:8000",
#     "https://musplays.netlify.app",
#     "https://accounts.spotify.com",
# ]

STORAGES = {
    "default":{
         "BACKEND" : "django.core.files.storage.FileSystemStorage",
    },
    "staticfiles" : {
        "BACKEND" : "whitenoise.storage.CompressedStaticFilesStorage"
    },
       
}

DATABASES = {
    'default': {
            'ENGINE': 'django.db.backends.postgresql',
            'NAME': env('POSTGRES_DB'),
            'USER': env('POSTGRES_USER'),
            'PASSWORD': env('POSTGRES_PASSWORD'),
            'HOST': env('POSTGRES_HOST'),
            'PORT': env('POSTGRES_PORT', default='5432'),  # Default PostgreSQL port
        }
}

BASE_DIR = Path(__file__).resolve().parent.parent

STATIC_URL = "/static/"
    # Tell Django to copy static assets into a path called `staticfiles` (this is specific to Render)
STATIC_ROOT = BASE_DIR / "staticfiles"    
# Enable the WhiteNoise storage backend, which compresses static files to reduce disk use
    # and renames the files with unique names for each version to support long-term caching
STATICFILES_STORAGE = 'whitenoise.storage.CompressedManifestStaticFilesStorage'