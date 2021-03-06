# Generated by Django 4.0 on 2022-01-02 06:31

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('spotify', '0002_alter_spotifytoken_refresh_token'),
    ]

    operations = [
        migrations.AlterField(
            model_name='spotifytoken',
            name='access_token',
            field=models.CharField(max_length=150, null=True),
        ),
        migrations.AlterField(
            model_name='spotifytoken',
            name='token_type',
            field=models.CharField(max_length=50, null=True),
        ),
        migrations.AlterField(
            model_name='spotifytoken',
            name='user',
            field=models.CharField(max_length=50, null=True, unique=True),
        ),
    ]
