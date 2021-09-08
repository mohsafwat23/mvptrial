from rest_framework import serializers
from .models import Room, User, Restaurant, RoomRightSwipes

#the serializers turn complex data from the django database to a list of jsons that can be easily fetched and rendered

#serializer for the restaurant model
class RestaurantSerializer2(serializers.ModelSerializer):
    class Meta:
        model = Restaurant
        fields = ('id','cuisine', 'name', 'rating', 'image', 'map_url', 'price', 'menu')

#serializer for the room model
#the restaurant serializer is called within to serialize the restaurant objects within each room
#to see this, go to localhost/api/room
#todo : remove unnecessary fields
class RoomSerializer(serializers.ModelSerializer):
    restaurant = RestaurantSerializer2(read_only=True, many=True)
    class Meta:
        model = Room
        fields = '__all__'

#serializer for creating the room model
#this serializes what the user chooses when creating a room
#follows CRUD method
#todo : remove unnecessary fields
class CreateRoomSerializer(serializers.ModelSerializer):
    class Meta:
        model = Room
        fields = ('guest_can_pause', 'votes_to_skip', 'host_username')


#updating the room serializer
#this is still under construction, since we want the update room to just update the restaurants inside each room
class UpdateRoomSerializer(serializers.ModelSerializer):
    code = serializers.CharField(validators=[])

    class Meta:
        model = Room
        fields = ('code')

#users serializer
#users Yuanling should document
class UserSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = ('username')
