from django.db import models
import string
import random

def generate_unique_id():
    length = 6

    while True:
        roomid = ''.join(random.choices(string.ascii_uppercase, k=length)) #make a id with length 6
        if Room.objects.filter(roomid=roomid).count() == 0: #check models if id is unique
            break   #if not true keep generating new ids

    return roomid



# Create your models here.
class Room(models.Model):
    roomid = models.CharField(max_length=8,unique=True)
    hostid = models.CharField(max_length=50, unique=True)

    guest_can_pause = models.IntegerField(null=False, default=1)    #remove later
    votes_to_skip = models.IntegerField(null=False, default=1)      #remove later

    created_at = models.DateTimeField(auto_now_add=True)