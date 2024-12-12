from django.urls import path
from .auth_views import get_spotify_auth_url, spotify_callback, get_playlists, get_categories, get_catPL, get_spf, get_spuserid, set_imp_playlists
from .views import user_profile, login_required, set_bio, set_username, import_pl


urlpatterns = [
    path('auth/login', get_spotify_auth_url, name='get_spotify_auth_url'),
    path('auth/callback/', spotify_callback, name='spotify_callback'),
    path('playlists/', get_playlists, name='get_playlists'),
    path('categories/', get_categories, name='get_categories'),
    path('catPL/', get_catPL, name='get_catPL'),
    path('set-username/', set_username, name='set_username'),
    path('set-bio/', set_bio, name='set_bio'),
    path('getspf/', get_spf, name='get_spf'),
    path('getspuserid/', get_spuserid, name='get_spuserid'),
    path('profile/', user_profile, name='user_profile'),
    path('import-pl/', import_pl, name='import-pl'),
    path('setimp/', set_imp_playlists, name='setimp'),


]
    