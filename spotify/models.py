from re import T
from django.db import models


class SpotifyToken(models.Model):
    user=models.CharField(max_length=50,unique=True,null=True)
    created_at=models.DateTimeField(auto_now_add=True)
    refresh_token=models.CharField(max_length=150,null=True)
    access_token=models.CharField(max_length=150,null=True)
    expires_in=models.DateField(null=True)
    token_type=models.CharField(max_length=50,null=True)
    def __str__(self) -> str:
        return str(self.user)+" acess token +:"+str(self.access_token)
# Create your models here.
