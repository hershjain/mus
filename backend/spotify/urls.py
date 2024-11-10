from django.urls import path
from .auth_views import get_spotify_auth_url, spotify_callback, get_playlists
from .views import user_profile, login_required


urlpatterns = [
    path('auth/login', get_spotify_auth_url, name='get_spotify_auth_url'),
    path('auth/callback/', spotify_callback, name='spotify_callback'),
    path('playlists/', get_playlists, name='get_playlists'),
    path('profile/', user_profile, name='user-profile'),
]
    