from django.contrib import admin
from .models import Follow, Notification, Tag, Playlist, Genre
from .models import Profile

@admin.register(Profile)
class ProfileAdmin(admin.ModelAdmin):
    list_display = ('user', 'spotify_id', 'email', 'profile_picture', 'bio')
    search_fields = ('user__username', 'email')
    list_filter = ('followers',)

# Register Follow model
@admin.register(Follow)
class FollowAdmin(admin.ModelAdmin):
    list_display = ('follower', 'following', 'followed_at')
    search_fields = ('follower__username', 'following__username')
    list_filter = ('followed_at',)

# Register Notification model
@admin.register(Notification)
class NotificationAdmin(admin.ModelAdmin):
    list_display = ('user', 'sender', 'notification_type', 'is_read', 'created_at')
    search_fields = ('user__username', 'sender__username', 'text')
    list_filter = ('notification_type', 'is_read', 'created_at')

# Register Tag model
@admin.register(Tag)
class TagAdmin(admin.ModelAdmin):
    list_display = ('name',)
    search_fields = ('name',)

# Register the Genre model
@admin.register(Genre)
class GenreAdmin(admin.ModelAdmin):
    list_display = ('name',)  # Display genre name in the list view
    search_fields = ('name',)  # Add a search bar for genres

# Customize the Playlist admin
@admin.register(Playlist)
class PlaylistAdmin(admin.ModelAdmin):
    list_display = ('title', 'created_by', 'created_at', 'public')  # Fields to show in list view
    search_fields = ('title', 'description')  # Add search functionality
    list_filter = ('public', 'created_at')  # Add filters for public status and creation date
    filter_horizontal = ('genres',)  # Add horizontal filter widget for genres (better for many-to-many fields)
    readonly_fields = ('created_at', 'updated_at')  # Make certain fields read-only
    fieldsets = (
        (None, {
            'fields': ('title', 'description', 'spotify_playlist_id', 'created_by', 'genres', 'public')
        }),
        ('Advanced options', {
            'classes': ('collapse',),
            'fields': ('imported', 'imdesc', 'primarycolor', 'secondarycolor', 'mood', 'tags', 'likes'),
        }),
    )