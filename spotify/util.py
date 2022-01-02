from datetime import timedelta
from re import T

from requests import post

from .credentials import CLIENT_ID, CLIENT_SECRET
from .models import SpotifyToken
from django.utils import timezone
def get_user_tokens(session_key):
    user_tokens=SpotifyToken.objects.filter(user=session_key) 
    if user_tokens.exists():
        return user_tokens[0]
    else:
        return None
def update_or_create_token(session_key,access_token,token_type,expires_in,refresh_token):
    tokens=get_user_tokens(session_key)
    # expires_in=timezone.now()+timedelta(seconds=expires_in)
    if tokens:
        print("refresh token is ",refresh_token)
        tokens.access_token=access_token
        tokens.refresh_token=refresh_token
        tokens.expires_in=expires_in
        tokens.token_type=token_type
        tokens.save(update_fields=['acess_token','refresh_token','expires_in','token_type'])
    else:
        tokens=SpotifyToken(user=session_key,access_token=access_token,token_type=token_type,refresh_token=refresh_token,expires_in=expires_in)
        tokens.save()

def refresh_spotify_token(session_key):
    tokens=get_user_tokens(session_key)
    refresh_token=tokens.refresh_token
    print("tokens is ",tokens)
    # response=post('https://accounts.spotify/api/token',data={
    #     'grant_type':'refresh_token',
    #     'refresh_token':refresh_token,
    #     'client_id':CLIENT_ID,
    #     'client_secret':CLIENT_SECRET
    # }).json()
    # access_token=response.get('access_token')
    # token_type=response.get('token_type')
    # expires_in=response.get('expires_in')
    # refresh_token=response.get('refresh_token')
    # update_or_create_token(session_key=session_key,access_token=access_token,token_type=token_type,expires_in=expires_in,refresh_token=refresh_token)



def is_spotify_authenticated(session_key):
    token=get_user_tokens(session_key)
    print("token is ",token)
    if token:
        expiry=token.expires_in
        if True:
            refresh_spotify_token(session_key)
        return True
    return False
