from enum import unique
from django.db import models
import string
import random
import uuid

#generate a UNIQUE code for the room with all uppercase letters with a letter count of 6
#the function is called in the room models code field
def generate_unique_code():
    length = 6

    while True:
        code = ''.join(random.choices(string.ascii_uppercase, k=length))
        if Room.objects.filter(code=code).count() == 0:
            break

    return code

#a model for the restaurants and its specific field
#this model is linked with the updatemodels file, so that we can collect the restaurants from the csv
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

#room model is where the users will swipe
#it has a ManyToManyField that links the room with the restaurants model
#TO DO: remove unnecessary fields 
class Room(models.Model):
    code = models.CharField(
        max_length=8, default=generate_unique_code, unique=True)
    host = models.CharField(max_length=50, unique=True)
    host_username = models.CharField(max_length=50, default="None")
    guest_can_pause = models.BooleanField(null=False, default=False)
    votes_to_skip = models.IntegerField(null=False, default=1)
    created_at = models.DateTimeField(auto_now_add=True)
    restaurant = models.ManyToManyField(Restaurant, default="None")

#users Yuanling should document
class User(models.Model):
    username = models.CharField(max_length=50, unique=True)
    session_key = models.CharField(max_length=50, unique=True)
    room = models.ForeignKey(Room, on_delete=models.CASCADE)
