import os
import spotipy
import csv
from collections import Counter
from spotipy.oauth2 import SpotifyOAuth
import requests
from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse, HttpResponseRedirect
from django.conf import settings
from urllib.parse import urlencode
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Profile
from django.utils import timezone
from datetime import timedelta
from django.shortcuts import redirect
from django.contrib.auth.decorators import login_required
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import api_view, permission_classes
from django.contrib.auth import login
from django.contrib.auth.models import User
from .models import Playlist, Genre
from rest_framework.authtoken.models import Token
import urllib.parse
from rest_framework import status
from rest_framework_simplejwt.authentication import JWTAuthentication
from spotipy import Spotify



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
    print('completed login')
    print(f'User: {request.user} | Authenticated: {request.user.is_authenticated}')
    #user = User.objects.get(username='username')  # Retrieve the user object based on your logic
    #print(user)
    print(Token.objects)
    #login(request, user)  # Log the user in
    return HttpResponseRedirect(auth_url)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_spotify_auth_url(request):
    print("in get spot url func")
    params = {
        "client_id": SPOTIFY_CLIENT_ID,
        "response_type": "code",
        "redirect_uri": SPOTIFY_REDIRECT_URI,
        "scope": SPOTIFY_SCOPE,
    }
    auth_url = "https://accounts.spotify.com/authorize?" + urllib.parse.urlencode(params)
    return Response({"auth_url": auth_url})

@csrf_exempt
@api_view(['GET'])
#@login_required
@permission_classes([IsAuthenticated])
def spotify_callback(request):
    print('Calling Spotify callback function')
    code = request.GET.get("code")
    if not code:
        return Response({"error": "Authorization code not provided"}, status=400)
    
    print('Authorization code received: ' + code)
    
    # Spotify token request
    auth_data = {
        'grant_type': 'authorization_code',
        'code': code,
        'redirect_uri': SPOTIFY_REDIRECT_URI,
        'client_id': SPOTIFY_CLIENT_ID,
        'client_secret': SPOTIFY_CLIENT_SECRET,
    }

    response = requests.post('https://accounts.spotify.com/api/token', data=auth_data)
    if response.status_code == 200:
        tokens = response.json()
        access_token = tokens.get('access_token')
        refresh_token = tokens.get('refresh_token')
        

        # Save tokens in the Profile model
        profile, created = Profile.objects.get_or_create(user=request.user)
        profile.access_token = access_token
        profile.refresh_token = refresh_token
        profile.access_token_expires_at = timezone.now() + timedelta(seconds=tokens.get('expires_in'))
        profile.save()
        print('here is user: '+str(profile.user))
        print('here is user spot token: '+str(profile.access_token))

        sp = Spotify(auth=profile.access_token)
        results = sp.current_user()
        userid = results['id']
        
        profile.spotify_id = userid
        profile.save()

        return Response('spot access tokens saved',status=status.HTTP_200_OK)  # Or respond with a success message
    else:
        print(response.json())  # Debugging: print the error message from Spotify
        return Response({"error": "Failed to authenticate with Spotify"}, status=400)


def refresh_spotify_token(profile):
    refresh_token = profile.refresh_token
    response = requests.post('https://accounts.spotify.com/api/token', data={
        'grant_type': 'refresh_token',
        'refresh_token': refresh_token,
        'client_id': SPOTIFY_CLIENT_ID,
        'client_secret': SPOTIFY_CLIENT_SECRET,
    })
    if response.status_code == 200:
        new_access_token = response.json().get('access_token')
        profile.access_token = new_access_token
        profile.save()
        return new_access_token
    else:
        print("Error refreshing token:", response.json())
        return None  # or handle error appropriately
    

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_playlists(request):
    # Authenticate the JWT token and retrieve the user
    jwt_authenticator = JWTAuthentication()
    try:
        # Extract and validate the JWT token from the header
        user, _ = jwt_authenticator.authenticate(request)
        profile = Profile.objects.get(user=user)

        # Check if the Spotify access token is expired
        if profile.access_token_is_expired():  # Assuming access_token_is_expired() is defined
            refresh_spotify_token(profile)  # Refresh the token if needed

        # Use the Spotify access token to fetch playlists
        sp = Spotify(auth=profile.access_token)
        results = sp.current_user()
        userid = results['id']
        #playlists = sp.current_user_playlists(limit=50)
        plz = {}
        off = 0
        kval = 0
        for x in range(0,3):
            #print(off)
            playlists = sp.current_user_playlists(limit=50, offset=off)
            for idx, item in enumerate(playlists['items']):
                #print(item)
                if item and item['images']:
                    new_dict = {kval: item}
                    plz.update(new_dict)
                    kval+=1
            off+=50

            
        return JsonResponse(plz, safe=False)

    except Profile.DoesNotExist:
        return JsonResponse({'error': 'Profile not found.'}, status=404)
    except Exception as e:
        return JsonResponse({'error': str(e)}, status=500)
    
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_spuserid(request):
    # Authenticate the JWT token and retrieve the user
    jwt_authenticator = JWTAuthentication()
    try:
        # Extract and validate the JWT token from the header
        user, _ = jwt_authenticator.authenticate(request)
        profile = Profile.objects.get(user=user)

        # Check if the Spotify access token is expired
        if profile.access_token_is_expired():  # Assuming access_token_is_expired() is defined
            refresh_spotify_token(profile)  # Refresh the token if needed

        # Use the Spotify access token to fetch playlists
        sp = Spotify(auth=profile.access_token)
        results = sp.current_user()
        userid = results['id']

        return JsonResponse(userid, safe=False)

    except Profile.DoesNotExist:
        return JsonResponse({'error': 'userid not found.'}, status=404)
    except Exception as e:
        return JsonResponse({'error': str(e)}, status=500)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_categories(request):
    # Authenticate the JWT token and retrieve the user
    jwt_authenticator = JWTAuthentication()
    try:
        # Extract and validate the JWT token from the header
        user, _ = jwt_authenticator.authenticate(request)
        profile = Profile.objects.get(user=user)

        # Check if the Spotify access token is expired
        if profile.access_token_is_expired():  # Assuming access_token_is_expired() is defined
            refresh_spotify_token(profile)  # Refresh the token if needed

        # Use the Spotify access token to fetch playlists
        sp = Spotify(auth=profile.access_token)
        results = sp.categories()
        categories = results['categories']['items']
        

        return JsonResponse(categories, safe=False)

    except Profile.DoesNotExist:
        return JsonResponse({'error': 'Profile not found.'}, status=404)
    except Exception as e:
        return JsonResponse({'error': str(e)}, status=500)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_catPL(request):
    # Authenticate the JWT token and retrieve the user
    jwt_authenticator = JWTAuthentication()
    try:
        # Extract and validate the JWT token from the header
        user, _ = jwt_authenticator.authenticate(request)
        profile = Profile.objects.get(user=user)

        # Check if the Spotify access token is expired
        if profile.access_token_is_expired():  # Assuming access_token_is_expired() is defined
            refresh_spotify_token(profile)  # Refresh the token if needed

        # Use the Spotify access token to fetch playlists
        sp = Spotify(auth=profile.access_token)
        catPL = {}
        results = sp.categories()
        categories = results['categories']['items']
        for x in categories:
            userid = x['id']
            new_dict = {f'key{x}': sp.category_playlists(category_id=userid,limit=6)}
            catPL.update(new_dict)
        #pls = catPL['playlists']
        

        return JsonResponse(catPL, safe=False)

    except Profile.DoesNotExist:
        return JsonResponse({'error': 'Profile not found.'}, status=404)
    except Exception as e:
        return JsonResponse({'error': str(e)}, status=500)
    
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_spf(request):
    # Authenticate the JWT token and retrieve the user
    jwt_authenticator = JWTAuthentication()
    try:
        # Extract and validate the JWT token from the header
        user, _ = jwt_authenticator.authenticate(request)
        profile = Profile.objects.get(user=user)

        # Check if the Spotify access token is expired
        if profile.access_token_is_expired():  # Assuming access_token_is_expired() is defined
            refresh_spotify_token(profile)  # Refresh the token if needed

        # Use the Spotify access token to fetch playlists
        sp = Spotify(auth=profile.access_token)
        profile = Profile.objects.get(user=request.user)
        results = sp.current_user()
        imageval = results['images']
        for x in imageval:
            for x in imageval:
                if str(x['height']) == '300':
                    img = x['url']
                    profile.profile_picture = img
                    profile.save()
        return JsonResponse(img, safe=False)

    except Profile.DoesNotExist:
        return JsonResponse({'error': 'Profile/PFpic not found.'}, status=404)
    except Exception as e:
        return JsonResponse({'error': str(e)}, status=500)
    
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def set_imp_playlists(request):
    # Authenticate the JWT token and retrieve the user
    jwt_authenticator = JWTAuthentication()
    try:
        # Extract and validate the JWT token from the header
        user, _ = jwt_authenticator.authenticate(request)
        profile = Profile.objects.get(user=user)

        # Check if the Spotify access token is expired
        if profile.access_token_is_expired():  # Assuming access_token_is_expired() is defined
            refresh_spotify_token(profile)  # Refresh the token if needed

        # Use the Spotify access token to fetch playlists
        sp = Spotify(auth=profile.access_token)
        results = sp.current_user()
        userid = results['id']
        print("userid =" +userid)
        #playlists = sp.current_user_playlists(limit=50)
        

        plz = {}
        off = 0
        kval = 0
        for x in range(0,4):
            #print(off)
            playlists = sp.current_user_playlists(limit=50, offset=off)
            for idx, item in enumerate(playlists['items']):
                if item:
                    new_dict = {kval: item}
                    plz.update(new_dict)
                    kval+=1
            off+=50

        print(" this is profile.user: "+str(profile.user))

        def load_genre_data(file_paths):
            """
            Load genre data from CSV files into a dictionary where keys are artists
            and values are genres.
            """
            genre_mapping = {}
            for genre, file_path in file_paths.items():
                try:
                    with open(file_path, 'r') as file:
                        reader = csv.reader(file)
                        for row in reader:
                            for artist in row:
                                genre_mapping[artist.strip().lower()] = genre
                except FileNotFoundError:
                    print(f"Warning: File {file_path} not found. Skipping.")
            return genre_mapping

        def assign_top_genres(artists, genre_mapping, top_n=3):
            """
            Assign the top N genres to a playlist based on artist-genre mappings.
            """
            # Count genres for the given artists
            genre_counts = Counter()
            unmatched_artists = []
            
            for artist in artists:
                genre = genre_mapping.get(artist.lower())
                if genre:
                    genre_counts[genre] += 1
                else:
                    unmatched_artists.append(artist)
            
            # Get the top N genres
            top_genres = [genre for genre, _ in genre_counts.most_common(top_n)]
            
            #print(f"Top {top_n} genres: {top_genres}")
            #print(f"Unmatched artists: {unmatched_artists}")
            
            return top_genres

        # Example usage:
        current_dir = os.path.dirname(os.path.abspath(__file__))
        file_paths = {
            'Hip-Hop': os.path.join(current_dir, 'WikiRapArtists12.17.24.csv'),
            'EDM': os.path.join(current_dir, 'WikiEDMArtists12.28.24.csv'),
            'Country': os.path.join(current_dir, 'WikiCountryArtists12.29.24.csv'),
            'Jazz': os.path.join(current_dir, 'WikiJazzArtists12.29.24.csv'),
            'Pop': os.path.join(current_dir, 'WikiPopArtists12.28.24.csv'),
            'Reggae': os.path.join(current_dir, 'WikiRegaeArtists12.29.24.csv'),
            'Reggaeton': os.path.join(current_dir, 'WikiReggaetonArtists12.29.24.csv'),
            'RnB': os.path.join(current_dir, 'WikiRnBArtists12.29.24.csv'),
            'Rock': os.path.join(current_dir, 'WikiRockArtists12.29.24.csv'),
        }

        # Load genre mappings once
        genre_mapping = load_genre_data(file_paths)

        for item in plz:
            if plz[item] and plz[item]['images']:
                t = plz[item]['name']
                desc = plz[item]['description']
                spID = plz[item]['id']
                imp = True
                uID = plz[item]['owner']['id']
                existing = Playlist.objects.filter(spotify_playlist_id=spID).exists()
                img = plz[item]['images'][0]['url']
                splink = plz[item]['external_urls']['spotify']         
                
                if not existing and uID == userid:
                    try:
                        print("about to import playlist: "+t)
                        
                        # Collect all artist names from the playlist's tracks
                        tracks = sp.playlist_tracks(spID)['items']
                        artist_names = [
                            artist['name']
                            for track in tracks
                            if track.get('track') and track['track'].get('artists')
                            for artist in track['track']['artists']
                        ]
                        
                        top_genres = assign_top_genres(artist_names, genre_mapping)
                        
                        pl = Playlist(title=t, description=desc, created_by=profile.user, spotify_playlist_id=spID, imported=imp, cover_img=img, spu_id=uID, sp_link= splink, public=True)
                        pl.save()
                        
                        for genre_name in top_genres:
                            genre, _ = Genre.objects.get_or_create(name=genre_name)
                            pl.genres.add(genre)

                        print('Playlist saved: '+pl.title)
                    except Exception as e:
                        print(f"Error saving playlist '{t}': {e}")


        return JsonResponse(plz, safe=False)

    except Profile.DoesNotExist:
        return JsonResponse({'error': 'Profile not found.'}, status=404)
    except Exception as e:
        return JsonResponse({'error': str(e)}, status=500)
    
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def add_playlist_to_lib(request, spid, spuid):
    # Authenticate the JWT token and retrieve the user
    jwt_authenticator = JWTAuthentication()
    try:
        # Extract and validate the JWT token from the header
        user, _ = jwt_authenticator.authenticate(request)
        profile = Profile.objects.get(user=user)

        # Check if the Spotify access token is expired
        if profile.access_token_is_expired():  # Assuming access_token_is_expired() is defined
            refresh_spotify_token(profile)  # Refresh the token if needed

        # Use the Spotify access token to fetch playlists
        sp = Spotify(auth=profile.access_token)
        try:
            sp.user_playlist_follow_playlist(playlist_owner_id=spuid,playlist_id=spid)
            return Response('Added playlist to library', safe=False)
        
        except Exception as e:
            print(f"Error adding playlist to library: {e}")

    except Profile.DoesNotExist:
        return JsonResponse({'error': 'Profile not found.'}, status=404)
    except Exception as e:
        return JsonResponse({'error': str(e)}, status=500)