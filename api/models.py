from enum import unique
from django.db import models
import string
import random
import uuid

from django.db.models.fields.related import ForeignKey

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
    monday_opening = models.TextField(blank=True, null=True)
    monday_closing= models.TextField(blank=True, null=True)
    tuesday_opening = models.TextField(blank=True, null=True)
    tuesday_closing= models.TextField(blank=True, null=True)
    wednesday_opening = models.TextField(blank=True, null=True)    
    wednesday_closing= models.TextField(blank=True, null=True)
    thursday_opening = models.TextField(blank=True, null=True)
    thursday_closing= models.TextField(blank=True, null=True)
    friday_opening = models.TextField(blank=True, null=True)
    friday_closing= models.TextField(blank=True, null=True)
    saturday_opening = models.TextField(blank=True, null=True)
    saturday_closing= models.TextField(blank=True, null=True)
    sunday_opening = models.TextField(blank=True, null=True)
    sunday_closing= models.TextField(blank=True, null=True)
    def __str__(self):
        return self.name

    
    def geolocation_extractor(self):
        """
        Extracts geolocation values from a url formatted in the following way 
        https://maps.google.com/?q=43.06783875510204,-89.40913090816326   
        """
        
        counter = 0
        for char in self.map_url:
            counter += 1
            if char == '=':
                return self.map_url[counter + 1:].split(",")

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
    head_count = models.IntegerField(null=False, default=1)


    def __str__(self):
        return f'{self.code} - {self.host_username} '

"""
class SwipedRight(models.Model):
    name = models.TextField(null=True)
    room = models.ForeignKey(Room, on_delete=models.CASCADE,default="")
"""

class RoomRightSwipes(models.Model):
    restaurant = models.ManyToManyField(Restaurant, default="None")
    room = models.ForeignKey(Room, default="None", on_delete=models.CASCADE)


#users Yuanling should document
class User(models.Model):
    username = models.CharField(max_length=50, unique=False)
    session_key = models.CharField(max_length=50, unique=True)
    room = models.ForeignKey(Room, on_delete=models.CASCADE)
