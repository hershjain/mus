from django.urls import path
from .auth_views import get_spotify_auth_url, spotify_callback, get_playlists, get_categories, get_catPL, get_spf, get_spuserid, set_imp_playlists, add_playlist_to_lib, get_spotifyconnection
from .views import user_profile, login_required, set_bio, set_username, pullhh, pub_user_profile, follow_user, pullall, pullpfs, set_toppl, rem_toppl


urlpatterns = [
    path('auth/login', get_spotify_auth_url, name='get_spotify_auth_url'),
    path('auth/callback/', spotify_callback, name='spotify_callback'),
    path('playlists/', get_playlists, name='get_playlists'),
    path('setimp/', set_imp_playlists, name='setimp'),
    path('categories/', get_categories, name='get_categories'),
    path('catPL/', get_catPL, name='get_catPL'),
    path('set-username/', set_username, name='set_username'),
    path('set-bio/', set_bio, name='set_bio'),
    path('getspf/', get_spf, name='get_spf'),
    path('getspuserid/', get_spuserid, name='get_spuserid'),
    path('check-connection/', get_spotifyconnection, name='get_spotifyconnection'),
    path('profile/', user_profile, name='user_profile'),
    path('profile/<str:username>/', pub_user_profile, name='pub_user_profile'),
    path('profile/<str:username>/follow/', follow_user, name='follow_user'),
    path('add-pl/', add_playlist_to_lib, name='add-pl'),
    path('pullhh/', pullhh, name='pullhh'),
    path('pullall/', pullall, name='pullall'),
    path('pullpfs/', pullpfs, name='pullpfs'),
    path('settoppl/', set_toppl, name='settoppl'),
    path('remtoppl/', rem_toppl, name='remtoppl'),
]
    