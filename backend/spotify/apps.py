from django.apps import AppConfig


class SpotifyConfig(AppConfig):
    default_auto_field = "django.db.models.BigAutoField"
    name = "backend.spotify"

    def ready(self):
        import spotify.signals
