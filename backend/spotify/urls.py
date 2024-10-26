from django.urls import path
from . import auth_views 

urlpatterns = [
    path('auth/login', auth_views.spotify_login, name='spotify_login'),
    path('auth/callback', auth_views.spotify_callback, name='spotify_callback'),
    path('playlists', auth_views.get_playlists, name='get_playlists')
]
    