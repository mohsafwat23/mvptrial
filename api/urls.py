from django.urls import path
from . import views
from .views import *

urlpatterns = [
    path('room', RoomView.as_view()), #dispatch and send over to api.urls
    path('create-room', CreateRoomView.as_view()),
    path('get-room', GetRoom.as_view()),
    path('join-room', JoinRoom.as_view()),
    path('user-in-room', UserInRoom.as_view()),
    path('leave-room', LeaveRoom.as_view()),
    path('update-room', UpdateRoom.as_view()),
    path('swipe', GetSwipe),
    path('check/match', CheckMatch)
]
