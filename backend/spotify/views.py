from django.shortcuts import render, get_object_or_404
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth.decorators import login_required
from django.http import JsonResponse
from .serializers import ProfileSerializer, PlaylistSerializer
from django.contrib.auth import authenticate
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.permissions import AllowAny
from .models import Profile, Playlist, Genre, User


@api_view(['GET'])
@login_required
def user_profile(request):
    user = request.user
    profile = user.profile  # assuming a OneToOneField between User and Profile models
    serializer = ProfileSerializer(profile)
    return Response(serializer.data)

@api_view(['POST'])
def pub_user_profile(request, username, pf):
    try:
        profile = get_object_or_404(Profile, user__username=username)
        target_profile = get_object_or_404(Profile, user__username=pf)

        is_following = request.user.profile.following.filter(pk=target_profile.pk).exists()

        # Include whatever data you want to return
        profile_data = {
            'username': profile.user.username,
            'bio': profile.bio,
            'profile_picture': profile.profile_picture if profile.profile_picture else None,
            #'email': profile.email,
            'followers_count': profile.followers.count(),
            #'following_count': profile.user.following.count(),
            'is_following': is_following
        }

        return JsonResponse(profile_data, safe=False)
    except Exception as e:
        return JsonResponse({'error': str(e)}, status=500)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def set_username(request):
    try:
        new_username = request.data.get("username")
        if not new_username:
            return Response({"error": "Username is required"}, status=400)

        # Update the username on the User model
        user = request.user
        user.username = new_username
        user.save()
        return Response({"message": "Username updated successfully"}, status=200)

    except Exception as e:
        return Response({"error": str(e)}, status=500)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def set_bio(request):
    try:
        new_bio = request.data.get("bio")
        if not new_bio:
            return Response({"error": "Bio is required"}, status=400)

        # Update the bio in the Profile model
        profile = Profile.objects.get(user=request.user)
        profile.bio = new_bio
        profile.save()
        return Response({"message": "Bio updated successfully"}, status=200)

    except Profile.DoesNotExist:
        return Response({"error": "Profile not found"}, status=404)
    except Exception as e:
        return Response({"error": str(e)}, status=500)

@api_view(['POST'])
@permission_classes([AllowAny])  # Allow access without authentication
def login_view(request):
    # Get username and password from the request
    username = request.data.get('username')
    password = request.data.get('password')
    
    # Authenticate user using Django's built-in authentication
    user = authenticate(request, username=username, password=password)
    
    if user is not None:
        # Generate JWT tokens
        refresh = RefreshToken.for_user(user)
        return Response({
            'refresh': str(refresh),
            'access': str(refresh.access_token),
            'username': user.username,
            'email': user.email,
        })
    return Response({"error": "Invalid credentials"}, status=400)
# Create your views here.

@api_view(['GET'])
def pullhh(request):
    try:

        genre = get_object_or_404(Genre, name='Hip-Hop')

        hhpl = Playlist.objects.filter(genres=genre)
        serializer = PlaylistSerializer(hhpl, many=True)
        return Response(serializer.data)

    except Profile.DoesNotExist:
        return Response({"error": "Playlists couldn't be pulled"}, status=404)
    except Exception as e:
        return Response({"error": str(e)}, status=500)
    
@api_view(['GET'])
def pullall(request):
    try:

        genre = get_object_or_404(Genre, name='Hip-Hop')

        allpl = Playlist.objects.filter(imported=True)
        serializer = PlaylistSerializer(allpl, many=True)
        return Response(serializer.data)

    except Profile.DoesNotExist:
        return Response({"error": "Playlists couldn't be pulled"}, status=404)
    except Exception as e:
        return Response({"error": str(e)}, status=500)

@api_view(['GET'])
def pullpfs(request):
    try:
        pfs = Profile.objects.all()
        serializer = ProfileSerializer(pfs, many=True)
        return Response(serializer.data)

    except Profile.DoesNotExist:
        return Response({"error": "Profiles couldn't be pulled"}, status=404)
    except Exception as e:
        return Response({"error": str(e)}, status=500)
    
@api_view(['POST'])
@login_required
def follow_user(request, username):
    target_user = get_object_or_404(User, username=username)
    target_profile = get_object_or_404(Profile, user=target_user)
    current_profile = request.user.profile

    if current_profile == target_profile:
        return JsonResponse({'error': 'You cannot follow yourself.'}, status=400)

    if target_profile in current_profile.following.all():
        # Unfollow if already following
        current_profile.following.remove(target_profile)
        current_profile.save()
        message = "Unfollowed successfully."
    else:
        # Follow the user
        current_profile.following.add(target_profile)
        current_profile.save()
        message = "Followed successfully."

    return JsonResponse({'message': message, 'following_count': current_profile.following.count()})