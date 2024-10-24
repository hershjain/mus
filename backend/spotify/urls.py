from django.urls import path
from .auth_views import spotify_login

urlpatterns = [
    path('login/', spotify_login, name='spotify_login'),
    #path('auth/callback/', SpotifyCallback.as_view(), name='spotify-callback'),
    # Add other endpoints
]   