from django.db import models
from django.contrib.auth.models import User
from django.core.exceptions import ValidationError
from django.db.models.signals import post_save
from django.dispatch import receiver
from django.utils import timezone

class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    spotify_id = models.CharField(max_length=100, unique=True)
    access_token = models.CharField(max_length=255, blank=True, null=True)
    refresh_token = models.CharField(max_length=255, blank=True, null=True)
    profile_picture = models.URLField(blank=True, null=True)
    bio = models.TextField(blank=True, null=True)
    email = models.EmailField(unique=True)  # Ensure email uniqueness
    followers = models.ManyToManyField("self", symmetrical=False, related_name="following", blank=True)
    access_token_expires_at = models.DateTimeField(null=True, blank=True)  # Field to store the expiration time
    
    def __str__(self):
        return self.user.username
    
    def access_token_is_expired(self):
        """Check if the access token is expired."""
        if self.access_token_expires_at and timezone.now() >= self.access_token_expires_at:
            return True
        return False

class Tag(models.Model):
    name = models.CharField(max_length=50, unique=True)

    def __str__(self):
        return self.name

class Genre(models.Model):
    name = models.CharField(max_length=50, unique=True)

    def __str__(self):
        return self.name

class Playlist(models.Model):
    title = models.CharField(max_length=255)
    description = models.TextField(blank=True, null=True)
    spotify_playlist_id = models.CharField(max_length=255, unique=True)
    created_by = models.ForeignKey(User, on_delete=models.CASCADE, related_name="playlists")
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    public = models.BooleanField(default=False)
    cover_img = models.URLField(blank=True, null=True)
    imported = models.BooleanField(default=False)
    imdesc = models.TextField(blank=True, null=True)
    primarycolor = models.CharField(max_length=255, null=True)
    secondarycolor = models.CharField(max_length=25, null=True)
    mood = models.CharField(max_length=255, null=True)
    likes = models.ManyToManyField(User, related_name='liked_playlists', blank=True)
    tags = models.ManyToManyField(Tag, related_name='playlists', blank=True)
    genres = models.ManyToManyField(Genre, related_name='playlists', blank=True)

    # def clean(self):
    #     super().clean()
    #     # Enforce max of 3 genres
    #     if self.genres.count() > 3:
    #         raise ValidationError("A playlist can have at most 3 genres.")

    def save(self, *args, **kwargs):
        self.clean()  # Ensure validation is checked before saving
        super().save(*args, **kwargs)

    def __str__(self):
        return self.title
    
class PlaylistTrack(models.Model):
    playlist = models.ForeignKey(Playlist, on_delete=models.CASCADE, related_name="tracks")
    spotify_track_id = models.CharField(max_length=255)
    track_title = models.CharField(max_length=255)
    artist_name = models.CharField(max_length=255)

    def __str__(self):
        return f"{self.track_title} by {self.artist_name}"
    
class Like(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    playlist = models.ForeignKey(Playlist, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.user.username} liked {self.playlist.title}"
    
class Follow(models.Model):
    follower = models.ForeignKey(User, on_delete=models.CASCADE, related_name="following_set")
    following = models.ForeignKey(User, on_delete=models.CASCADE, related_name="followers_set")
    followed_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.follower.username} follows {self.following.username}"

class Notification(models.Model):
    NOTIFICATION_TYPES = (
        ('like', 'Like'),
        ('follow', 'Follow'),
    )

    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="notifications")  # The recipient of the notification
    sender = models.ForeignKey(User, on_delete=models.CASCADE, related_name="sent_notifications")  # The user who triggers the action (like/follow)
    playlist = models.ForeignKey('Playlist', on_delete=models.CASCADE, null=True, blank=True)  # Optional, only for 'like' notifications
    notification_type = models.CharField(max_length=10, choices=NOTIFICATION_TYPES)
    text = models.CharField(max_length=255, blank=True)  # Optional text for additional info
    is_read = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Notification to {self.user.username} from {self.sender.username} - {self.notification_type}"

    def mark_as_read(self):
        self.is_read = True
        self.save()



