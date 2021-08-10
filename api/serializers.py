from rest_framework import serializers
from .models import Room, User
from restaurants.models import Restaurant


class RoomSerializer(serializers.ModelSerializer):
    class Meta:
        model = Room
        fields = ('id', 'code', 'host', 'guest_can_pause',
                  'votes_to_skip', 'created_at', 'host_username')


class CreateRoomSerializer(serializers.ModelSerializer):
    class Meta:
        model = Room
        fields = ('guest_can_pause', 'votes_to_skip', 'host_username')


class UpdateRoomSerializer(serializers.ModelSerializer):
    code = serializers.CharField(validators=[])

    class Meta:
        model = Room
        fields = ('guest_can_pause', 'votes_to_skip', 'code')


class RestaurantSerializer(serializers.ModelSerializer):

    class Meta:
        model = Restaurant
        fields = ('id', 'cuisine', 'name', 'rating', 'image')


class UserSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = ('username')
