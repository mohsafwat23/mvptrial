from .models import *

def check_for_match(room): 
    # RoomRightSwipes that has the given room0
    # How many times do all the cards appear as a right swipe

    # You compare the result against room.head_count variable 

    # If they are equal it means everybody in the group swiped right on it 
    # and the given card is a match 

    restarant = None

    for restaurant in room.restaurant.all().reverse():
        if RoomRightSwipes.objects.filter(room=room).filter(restaurant=restaurant).count() == room.head_count:
            return True, restaurant

    return False, restaurant