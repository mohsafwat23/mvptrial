from django.http.response import JsonResponse
from django.shortcuts import render
from rest_framework import generics, serializers, status
from .serializers import RoomSerializer, CreateRoomSerializer, UpdateRoomSerializer
from .models import Room, User, Restaurant
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.decorators import api_view
import random

# Create your views here.

#function that takes in 25 random restaurants from the django database and stores it in the created room
def addRestaurants(room):
    # change to how many random restaurants you want
    num_rest = 25

    restaurants = list(Restaurant.objects.all())

    random_restaurants = random.sample(restaurants, num_rest)
    for item in random_restaurants:
        room.restaurant.add(item)

    room.save()

#view the format of all available rooms at localhost/api/room
class RoomView(generics.ListAPIView):
    queryset = Room.objects.all()
    serializer_class = RoomSerializer


class GetRoom(APIView):
    serializer_class = RoomSerializer
    lookup_url_kwarg = 'code'

    def get(self, request, format=None):
        #pass in a room code that we are trying to get
        code = request.GET.get(self.lookup_url_kwarg)
        #lookup the room by the code 
        if code != None:
            room = Room.objects.filter(code=code)
            #make sure room is unique
            if len(room) > 0:
                #serializing room
                data = RoomSerializer(room[0]).data
                #new dictionary value that is the host session key
                data['is_host'] = self.request.session.session_key == room[0].host

                return Response(data, status=status.HTTP_200_OK)
            return Response({'Room Not found': 'Invalid Room'}, status=status.HTTP_404_NOT_FOUND)
        return Response({'Bad Request': 'Invalid data...'}, status=status.HTTP_400_BAD_REQUEST)

#there is a bug while joing the room again after leaving
class JoinRoom(APIView):
    lookup_url_kwarg = 'code'
    lookup_url_kwarg_user = 'username'

    def post(self, request, format=None):
        #if your device is not in an active session (via the session key) a session will be created
        if not self.request.session.exists(self.request.session.session_key):
            self.request.session.create()

        code = request.data.get(self.lookup_url_kwarg)
        username = request.data.get(self.lookup_url_kwarg_user)
        #lookup the room by the code 
        if code != None:
            room_result = Room.objects.filter(code=code)
            #make sure room is unique
            if len(room_result) > 0:
                room = room_result[0]
                #new dictionary values that is the room code and username
                self.request.session['room_code'] = code
                self.request.session["username"] = username
                #Yuanling should elaborate
                user = User(username=username,
                            session_key=self.request.session.session_key, room=room)
                user.save()
                return Response({'message': 'Room Joined!'}, status=status.HTTP_200_OK)
            return Response({'Bad Request': 'No room code'}, status=status.HTTP_400_BAD_REQUEST)
        return Response({'Bad Request': 'cant find code key'}, status=status.HTTP_400_BAD_REQUEST)


class CreateRoomView(APIView):
    serializer_class = CreateRoomSerializer

    def post(self, request, format=None):
        #if your device is not in an active session (via the session key) a session will be created
        if not self.request.session.exists(self.request.session.session_key):
            self.request.session.create()

        #serialize room data
        #which are getting what the user puts for the given fields
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            guest_can_pause = serializer.data.get('guest_can_pause')
            votes_to_skip = serializer.data.get('votes_to_skip')
            host = self.request.session.session_key
            host_username = serializer.data.get("host_username")
            room_queryset = Room.objects.filter(host=host)
            user_queryset = User.objects.filter(session_key=host)
            #if the host has an active room, update whith what fields he puts
            if room_queryset.exists():
                room = room_queryset[0]
                room.host_username = host_username
                room.guest_can_pause = guest_can_pause
                room.votes_to_skip = votes_to_skip
                room.save(update_fields=[
                          'guest_can_pause', 'votes_to_skip', 'host_username'])
                self.request.session['room_code'] = room.code
                return Response(RoomSerializer(room).data, status=status.HTTP_200_OK)
            #if no active room, a room is created with the fields and saved
            else:
                room = Room(host=host, guest_can_pause=guest_can_pause,
                            votes_to_skip=votes_to_skip, host_username=host_username)

                room.save()
                addRestaurants(room)

                user = User(username=host_username,
                            session_key=host, room=room)
                user.save()
                self.request.session['room_code'] = room.code
                self.request.session['username'] = host_username
                return Response(RoomSerializer(room).data, status=status.HTTP_201_CREATED)

        return Response({'Bad Request': 'Invalid data...'}, status=status.HTTP_400_BAD_REQUEST)

#Yuanling should elaborate
class UserInRoom(APIView):
    def get(self, request, format=None):
        if not self.request.session.exists(self.request.session.session_key):
            self.request.session.create()
        data = {
            'code': self.request.session.get('room_code'),
            "username": self.request.session.get("username")
        }
        return JsonResponse(data, status=status.HTTP_200_OK)


class LeaveRoom(APIView):
    def post(self, request, format=None):
        if 'room_code' in self.request.session:
            self.request.session.pop('room_code')
            host_id = self.request.session.session_key
            room_results = Room.objects.filter(host=host_id)
            if len(room_results) > 0:
                room = room_results[0]
                room.delete()
            curr_user = User.objects.get(session_key=self.request.session.session_key)
            curr_user.delete()

        return Response({'message': 'success'}, status=status.HTTP_200_OK)


#this is supposed to update all of the fields in the room as the user wishes
#such as number of votes
#will definetly change to update the restaurants
class UpdateRoom(APIView):
    serializer_class = UpdateRoomSerializer

    def patch(self, request, format=None):
        if not self.request.session.exists(self.request.session.session_key):
            self.request.session.create()
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            #swipedright = serializer.data.get('swipedright')
            code = serializer.data.get('code')

            queryset = Room.objects.filter(code=code)
            if not queryset.exists():
                return Response({'msg': 'Invalid Room'}, status=status.HTTP_404_NOT_FOUND)

            room = queryset[0]
            # user_id = self.request.session.session_key
            # if room.host != user_id:
            #     return Response({'msg': 'not host of room'}, status=status.HTTP_403_FORBIDDEN)

            #room.swipedright = swipedright
            #room.save(update_fields=['swipedright'])
            return Response(RoomSerializer(room).data, status=status.HTTP_200_OK)

        return Response({'Bad Request': 'Invalid data...'}, status=status.HTTP_400_BAD_REQUEST)


# @api_view(['GET'])
# def restaurants(request):
#     restaurants = list(Restaurant.objects.all())
#     restaurants = random.sample(restaurants, 25)
#     serializer = RestaurantSerializer(restaurants, many=True)
#     return Response(serializer.data)
