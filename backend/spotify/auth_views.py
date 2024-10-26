import os
import requests
from django.http import JsonResponse, HttpResponseRedirect
from django.conf import settings
from urllib.parse import urlencode

SPOTIFY_CLIENT_ID = settings.SPOTIFY_CLIENT_ID
SPOTIFY_CLIENT_SECRET = settings.SPOTIFY_CLIENT_SECRET
SPOTIFY_REDIRECT_URI = settings.SPOTIFY_REDIRECT_URI  # This should be a route in your Django app
SPOTIFY_SCOPE = 'user-read-private user-read-email playlist-modify-public playlist-modify-private'  # Adjust scopes as necessary

def spotify_login(request):
    # Spotify authorization URL
    auth_url = 'https://accounts.spotify.com/authorize'
    
    # URL parameters for Spotify OAuth
    params = {
        'client_id': SPOTIFY_CLIENT_ID,
        'response_type': 'code',
        'redirect_uri': SPOTIFY_REDIRECT_URI,
        'scope': SPOTIFY_SCOPE,
    }

    # Redirect the user to Spotify's OAuth page
    return HttpResponseRedirect(f'{auth_url}?{urlencode(params)}')

def spotify_callback(request):
    code = request.GET.get('code')
    token_url = 'https://accounts.spotify.com/api/token'
    
    # Exchange authorization code for access token
    response = requests.post(token_url, data={
        'grant_type': 'authorization_code',
        'code': code,
        'redirect_uri': SPOTIFY_REDIRECT_URI,
        'client_id': SPOTIFY_CLIENT_ID,
        'client_secret': SPOTIFY_CLIENT_SECRET,
    })

    # Extract access token
    token_data = response.json()
    access_token = token_data.get('access_token')

    # Here you can store the token in your database or session
    # For now, we will return it as JSON
    #return JsonResponse({'access_token': access_token})

    # Redirect to frontend with access token
    frontend_url = f'http://localhost:3000?access_token={access_token}'  # Replace with your React app's URL
    return HttpResponseRedirect(frontend_url)
