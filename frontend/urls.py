from django.urls import path
from .views import index, privacy, terms

urlpatterns = [
    path('', index),
    path('join', index),
    path('create',index),
    path('room/<str:roomCode>', index),  #dynamic url
    path('privacy', privacy),
    path('terms', terms),
]