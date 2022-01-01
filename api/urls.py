from django.urls import path,include
from .views import CreateRoomView, RoomView,isGoodView
urlpatterns=[
    path('room',RoomView.as_view()),
    path('createroom',CreateRoomView.as_view()),
    path('checkroom',isGoodView.as_view())
]