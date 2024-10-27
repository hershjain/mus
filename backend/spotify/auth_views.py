import os
import spotipy
from spotipy.oauth2 import SpotifyOAuth
import requests
from django.http import JsonResponse, HttpResponseRedirect
from django.conf import settings
from urllib.parse import urlencode

SPOTIFY_CLIENT_ID = settings.SPOTIFY_CLIENT_ID
SPOTIFY_CLIENT_SECRET = settings.SPOTIFY_CLIENT_SECRET
SPOTIFY_REDIRECT_URI = settings.SPOTIFY_REDIRECT_URI  # This should be a route in your Django app
SPOTIFY_SCOPE = 'user-library-read user-read-private user-read-email playlist-modify-public playlist-modify-private playlist-read-private'  # Adjust scopes as necessary

def spotify_login(request):
    print('calling login function')
    sp_oauth = SpotifyOAuth(client_id=SPOTIFY_CLIENT_ID,
                            client_secret=SPOTIFY_CLIENT_SECRET,
                            redirect_uri=SPOTIFY_REDIRECT_URI,
                            scope=SPOTIFY_SCOPE)
    auth_url = sp_oauth.get_authorize_url()
    return HttpResponseRedirect(auth_url)

#@csrf_exempt
def spotify_callback(request):
    print("in callback function")
    sp_oauth = SpotifyOAuth(client_id=SPOTIFY_CLIENT_ID,
                            client_secret=SPOTIFY_CLIENT_SECRET,
                            redirect_uri=SPOTIFY_REDIRECT_URI)
    
    code = request.GET.get('code')
    print("got code")
    try:
        # Exchange the authorization code for an access token
        print('trying code')
        token_info = sp_oauth.get_access_token(code)

        # Check if the token information was successfully retrieved
        if token_info:
            # Store the token info in the session
            request.session['token_info'] = token_info
            return HttpResponseRedirect('http://localhost:3000/app/profile')
        else:
            return JsonResponse({"error": "Failed to retrieve token info"}, status=401)
    
    except Exception as e:
        return JsonResponse({"error": str(e)}, status=400)
    

def get_playlists(request):
    print('calling playlist func')
    token_info = request.session.get('token_info', None)
    if token_info:
        sp = spotipy.Spotify(auth=token_info['access_token'])
        playlists = sp.current_user_playlists(limit=10)
        print(playlists)
        return JsonResponse(playlists)
    return JsonResponse({"error": "Not authenticated"}, status=401)

