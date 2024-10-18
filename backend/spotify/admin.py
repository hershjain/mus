from django.contrib import admin
from .models import Follow, Notification, Tag, Playlist

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

# Register Playlist model
@admin.register(Playlist)
class PlaylistAdmin(admin.ModelAdmin):
    list_display = ('title', 'created_by', 'created_at', 'updated_at')
    search_fields = ('title', 'created_by__username')
    list_filter = ('created_at', 'updated_at', 'tags')
    filter_horizontal = ('tags', 'likes')  # This adds a better UI for many-to-many fields

