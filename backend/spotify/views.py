from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth.decorators import login_required
from .serializers import ProfileSerializer

@api_view(['GET'])
@login_required
def user_profile(request):
    user = request.user
    profile = user.profile  # assuming a OneToOneField between User and Profile models
    serializer = ProfileSerializer(profile)
    return Response(serializer.data)


# Create your views here.

