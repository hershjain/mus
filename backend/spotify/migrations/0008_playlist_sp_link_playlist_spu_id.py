# Generated by Django 5.1.2 on 2025-01-02 04:55

from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("spotify", "0007_playlist_cover_img"),
    ]

    operations = [
        migrations.AddField(
            model_name="playlist",
            name="sp_link",
            field=models.URLField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name="playlist",
            name="spu_id",
            field=models.CharField(blank=True, max_length=100, null=True),
        ),
    ]