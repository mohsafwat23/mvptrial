from enum import unique
#from mvp.api.views import restaurants
#from mvp.api.views import restaurants
from django.db import models
import string
import random
import uuid


def generate_unique_code():
    length = 6

    while True:
        code = ''.join(random.choices(string.ascii_uppercase, k=length))
        if Room.objects.filter(code=code).count() == 0:
            break

    return code


class Restaurant(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    cuisine = models.TextField(null=True)
    name = models.TextField(null=True)
    rating = models.FloatField(null=True)
    image = models.TextField(null=True)
    map_url = models.TextField(null=True)
    price = models.TextField(null=True)
    menu = models.TextField(null=True)

    def __str__(self):
        return self.name


class Room(models.Model):
    code = models.CharField(
        max_length=8, default=generate_unique_code, unique=True)
    host = models.CharField(max_length=50, unique=True)
    host_username = models.CharField(max_length=50, default="None")
    guest_can_pause = models.BooleanField(null=False, default=False)
    votes_to_skip = models.IntegerField(null=False, default=1)
    created_at = models.DateTimeField(auto_now_add=True)
    restaurant = models.ManyToManyField(Restaurant, default="None")


class User(models.Model):
    username = models.CharField(max_length=50, unique=True)
    session_key = models.CharField(max_length=50, unique=True)
    room = models.ForeignKey(Room, on_delete=models.CASCADE)
