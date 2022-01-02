from django.http import response
from django.shortcuts import redirect, render
from rest_framework.response import Response
from .credentials import REDIRECT_URI,CLIENT_ID,CLIENT_SECRET
from rest_framework.views import APIView
from requests import Request,post
from rest_framework import status
from rest_framework.response import Response
from .util import get_user_tokens ,SpotifyToken, is_spotify_authenticated, update_or_create_token
class AuthURL(APIView):
    def get(self,request,format=None):
        scopes='user-read-playback-state user-modify-playback-state user-read-currently-playing'
        url=Request('GET',"https://accounts.spotify.com/authorize",params={
            'scope':scopes,
            'response_type':'code',
            'redirect_uri':REDIRECT_URI,
            'client_id':CLIENT_ID
        }).prepare().url
        return Response({'url':url},status=status.HTTP_200_OK)

def spotify_callback(request,formant=None):
    code=request.GET.get('code')
    error=request.GET.get('error')
    try:
        response=post("https://account.spotify.com/api/token",data={
        'grant_type':'authorization',
        'code':code,
        'redirect_uri':REDIRECT_URI,
        'client_id':CLIENT_ID,
        'client_secret':CLIENT_SECRET,
        }).json()
    except:
        print("loda")
        response={}
    access_token=response.get('access_token')
    token_type=response.get('token_type')
    refresh_token=response.get('refresh_token')
    expires_in=response.get('expires_in')
    error=response.get('error')
    if not request.session.exists(request.session.session_key):
        request.session.create()
    update_or_create_token(session_key=request.session.session_key,access_token=access_token,token_type=token_type,expires_in=expires_in,refresh_token=refresh_token)
    return redirect('frontend:')

class IsAuthenticated(APIView):
    def get(self,request,format=None):
        isauthenticated=is_spotify_authenticated(self.request.session.session_key)
        return Response({"status":isauthenticated},status=status.HTTP_200_OK)
