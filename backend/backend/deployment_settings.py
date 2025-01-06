import os
import dj_database_url
from .settings import *
from .settings import BASE_DIR
import environ

# Initialize environment variables
env = environ.Env()


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

CORS_ALLOWED_ORIGINS = [
    "http://localhost:3000",  
    "http://localhost:8000",
    "https://musplays.netlify.app",
    "https://accounts.spotify.com",
]

STORAGES = {
    "default":{
         "BACKEND" : "django.core.files.storage.FileSystemStorage",
    },
    "staticfiles" : {
        "BACKEND" : "whitenoise.storage.CompressedStaticFilesStorage"
    },
       
}

INSTALLED_APPS = [
    # Django default apps
    "django.contrib.admin",
    "django.contrib.auth",
    "django.contrib.contenttypes",
    "django.contrib.sessions",
    "django.contrib.messages",
    "django.contrib.staticfiles",

    # Third-party apps
    'rest_framework',
    'corsheaders',
    'djoser',
    'rest_framework.authtoken',

    # Your custom app
    'spotify',
]

CORS_ORIGIN_ALLOW_ALL = True

CORS_ORIGIN_WHITELIST = [
    "https://musplays.netlify.app",
]

CORS_ALLOWED_ORIGINS = [
    "http://localhost:3000",  # React frontend during development
    "http://localhost:8000",
    "https://musplays.netlify.app",
    "https://mus-7du3.onrender.com",
    "https://accounts.spotify.com",

    # "https://your-production-domain.com",  # Replace with your production domain
]

CORS_ALLOW_CREDENTIALS = True

# Allow specific methods for preflight
CORS_ALLOW_METHODS = [
    "GET",
    "POST",
    "PUT",
    "PATCH",
    "DELETE",
    "OPTIONS",
]

# If headers are needed
CORS_ALLOW_HEADERS = [
   'access-control-allow-origin',
   "accept",
    "accept-encoding",
    "authorization",
    "content-type",
    "dnt",
    "origin",
    "user-agent",
    "x-csrftoken",
    "x-requested-with",
]

# Need to review this eventually for how we want the rest framework to be. 
REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': (
        'rest_framework.authentication.SessionAuthentication',  # For session-based auth
        'rest_framework.authentication.TokenAuthentication',    # If using token-based auth
        'rest_framework_simplejwt.authentication.JWTAuthentication',
    ),
    'DEFAULT_PERMISSION_CLASSES': (
        'rest_framework.permissions.IsAuthenticated',
    ),
    'DEFAULT_PAGINATION_CLASS': 'rest_framework.pagination.PageNumberPagination',
    'PAGE_SIZE': 10,
}

print("POSTGRES_DB:", env('POSTGRES_DB'))
print("POSTGRES_USER:", env('POSTGRES_USER'))
print("POSTGRES_PASSWORD:", env('POSTGRES_PASSWORD'))
print("POSTGRES_HOST:", env('POSTGRES_HOST'))
print("POSTGRES_PORT:", env('POSTGRES_PORT'))

DATABASES = {
    'default' : dj_database_url.config(
        default=os.environ['DATABASE_URL'],
        conn_max_age=600
    )
    # 'default': {
    #         'ENGINE': 'django.db.backends.postgresql',
    #         'NAME': env('POSTGRES_DB'),
    #         'USER': env('POSTGRES_USER'),
    #         'PASSWORD': env('POSTGRES_PASSWORD'),
    #         'HOST': env('POSTGRES_HOST'),
    #         'PORT': env('POSTGRES_PORT', default='5432'),  # Default PostgreSQL port
    #     }
}

BASE_DIR = Path(__file__).resolve().parent.parent

STATIC_URL = "/static/"
    # Tell Django to copy static assets into a path called `staticfiles` (this is specific to Render)
STATIC_ROOT = BASE_DIR / "staticfiles"    
# Enable the WhiteNoise storage backend, which compresses static files to reduce disk use
    # and renames the files with unique names for each version to support long-term caching
STATICFILES_STORAGE = 'whitenoise.storage.CompressedManifestStaticFilesStorage'

SPOTIFY_CLIENT_ID = env('SPOTIFY_CLIENT_ID')
SPOTIFY_CLIENT_SECRET = env('SPOTIFY_CLIENT_SECRET')
SPOTIFY_REDIRECT_URI = env('SPOTIFY_REDIRECT_URI')

#Script for logging
LOGGING = {
    'version': 1,
    'disable_existing_loggers': False,
    'handlers': {
        'console': {
            'class': 'logging.StreamHandler',
        },
    },
    'root': {
        'handlers': ['console'],
        'level': 'INFO',
    },
}

DEFAULT_AUTO_FIELD = "django.db.models.BigAutoField"

#token session settings for tokens to be stored and accessed:

SESSION_COOKIE_AGE = 3600  # The session will persist for 1 hour (in seconds)
SESSION_SAVE_EVERY_REQUEST = True  # This refreshes the session expiration on every request
SESSION_EXPIRE_AT_BROWSER_CLOSE = False  # Optional: Keep the session after the browser is closed
SESSION_ENGINE = 'django.contrib.sessions.backends.signed_cookies'  # You can use DB-based sessions too

#SimpleJWT auth stuff
SIMPLE_JWT = {
    'ACCESS_TOKEN_LIFETIME': timedelta(minutes=30),
    'REFRESH_TOKEN_LIFETIME': timedelta(days=1),
    'AUTH_HEADER_TYPES': ('Bearer',),
}

#djoser settings to enable endpoints for user registration and login.
DJOSER = {
    'LOGIN_FIELD': 'email',  # or 'email', if you use email for login
    'USER_CREATE_PASSWORD_RETYPE': True,  # Require password confirmation on registration
    'SERIALIZERS': {
        'user': 'djoser.serializers.UserSerializer',
    },
}

APPEND_SLASH = True