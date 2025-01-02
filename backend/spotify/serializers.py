from rest_framework import serializers
from .models import Profile, Playlist

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

class ProfileSerializer(serializers.ModelSerializer):
    username = serializers.CharField(source="user.username", read_only=True)  # user.username from Profile

    class Meta:
        model = Profile
        fields = ['username', 'bio', 'profile_picture']  # Include relevant fields

class PlaylistSerializer(serializers.ModelSerializer):
    created_by = serializers.SerializerMethodField()
    genres = serializers.SerializerMethodField()

    class Meta:
        model = Playlist
        fields = ['title', 'description', 'spotify_playlist_id', 'created_by', 'public', 'genres', 'cover_img', 'spu_id', 'sp_link']

    def get_genres(self, obj):
        return [genre.name for genre in obj.genres.all()]

    def get_created_by(self, obj):
        return obj.created_by.username
    
    