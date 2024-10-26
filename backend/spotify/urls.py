from django.urls import path
from .auth_views import spotify_login, spotify_callback

urlpatterns = [
    path('auth/login', spotify_login, name='spotify_login'),
    path('auth/callback', spotify_callback, name='spotify_callback')
    # Add other endpoints
]   