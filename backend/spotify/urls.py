from django.urls import path
from .auth_views import spotify_login, spotify_callback, get_playlists
from . import views


urlpatterns = [
    path('auth/login', spotify_login, name='spotify_login'),
    path('auth/callback/', spotify_callback, name='spotify_callback'),
    path('playlists', get_playlists, name='get_playlists'),
    path('profile/', views.user_profile, name='user-profile'),
]
    