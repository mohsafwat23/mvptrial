from mvp.restaurants.serializers import RoomElements
from django.shortcuts import render
from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView
from api.models import Room
from .models import Restaurant
from .serializers import RestaurantSerializer

# Create your views here.
class CurrentRestaurant(APIView):
    serializer_class = RestaurantSerializer
    def get(self, request, format=None):
        room_code = self.request.session.get('room_code')
        room = Room.objects.filter(code=room_code)
        if room.exists():
            room = room[0]
        else:
            return Response({}, status=status.HTTP_404_NOT_FOUND)
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            cuisine = serializer.data.get('name')
            name = serializer.data.get('name')

        return Response({'Bad Request': 'Invalid data...'}, status=status.HTTP_400_BAD_REQUEST)

