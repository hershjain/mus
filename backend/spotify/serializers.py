from rest_framework import serializers
from .models import Profile

class RegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = ['username', 'email', 'password', 'profile_picture', 'bio']
        extra_kwargs = {
            'password': {'write_only': True},
            'email': {'required': True},
        }

    def validate_username(self, value):
        if Profile.objects.filter(username=value).exists():
            raise serializers.ValidationError("Username is already taken")
        return value

    def validate_email(self, value):
        if Profile.objects.filter(email=value).exists():
            raise serializers.ValidationError("Email is already registered")
        return value

    def create(self, validated_data):
        user = Profile(
            username=validated_data['username'],
            email=validated_data['email'],
            profile_picture=validated_data.get('profile_picture'),
            bio=validated_data.get('bio')
        )
        user.set_password(validated_data['password'])
        user.save()
        return user