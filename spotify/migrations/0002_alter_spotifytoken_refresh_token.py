# Generated by Django 4.0 on 2022-01-02 06:30

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('spotify', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='spotifytoken',
            name='refresh_token',
            field=models.CharField(max_length=150, null=True),
        ),
    ]
