# Generated by Django 5.1.2 on 2025-01-03 01:09

from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("spotify", "0008_playlist_sp_link_playlist_spu_id"),
    ]

    operations = [
        migrations.AddField(
            model_name="playlist",
            name="top_playlist",
            field=models.BooleanField(default=False),
        ),
    ]
