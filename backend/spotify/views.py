from django.shortcuts import render
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth.decorators import login_required
from .serializers import ProfileSerializer
from django.contrib.auth import authenticate
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.permissions import AllowAny
from .models import Profile


@api_view(['GET'])
@login_required
def user_profile(request):
    user = request.user
    profile = user.profile  # assuming a OneToOneField between User and Profile models
    serializer = ProfileSerializer(profile)
    return Response(serializer.data)

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

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def import_pl(request):
    try:
        # new_bio = request.data.get("bio")
        # if not new_bio:
        #     return Response({"error": "Bio is required"}, status=400)

        # # Update the bio in the Profile model
        # profile = Profile.objects.get(user=request.user)
        # profile.bio = new_bio
        # profile.save()
        return Response(request.data)
        #return Response({"message": "Playlist was imported"}, status=200)

    except Profile.DoesNotExist:
        return Response({"error": "Profile not found"}, status=404)
    except Exception as e:
        return Response({"error": str(e)}, status=500)

