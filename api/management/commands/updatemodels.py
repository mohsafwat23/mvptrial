from django.core.management.base import BaseCommand
import pandas as pd
from api.models import Restaurant
class Command(BaseCommand):
    help = 'import booms'

    def add_arguments(self, parser):
        pass
    def handle(self, *args, **options):
        df=pd.read_csv('Madison_Restaurants_final.csv')
        for CUISINE, NAME, RATING, IMAGE, MAP_URL, PRICE, MENU, MONDAY_OPENING, MONDAY_CLOSING, TUESDAY_OPENING, TUESDAY_CLOSING, WEDNESDAY_OPENING, WEDNESDAY_CLOSING, THURSDAY_OPENING, THURSDAY_CLOSING, FRIDAY_OPENING, FRIDAY_CLOSING, SATURDAY_OPENING, SATURDAY_CLOSING, SUNDAY_OPENING, SUNDAY_CLOSING, in zip(df.Cuisine,df.Name,df.Rating, df.Image, df.map_url, df.Price, df.Menu, df.Monday_Opening, df.Monday_Closing, df.Tuesday_Opening, df.Tuesday_Closing, df.Wednesday_Opening, df.Wednesday_Closing, df.Thursday_Opening, df.Thursday_Closing, df.Friday_Opening, df.Friday_Closing, df.Saturday_Opening, df.Saturday_Closing, df.Sunday_Opening, df.Sunday_Closing):
            models = Restaurant(cuisine=CUISINE, name = NAME, rating=RATING, image=IMAGE, map_url=MAP_URL, price=PRICE, menu=MENU, monday_opening = MONDAY_OPENING, monday_closing=MONDAY_CLOSING, tuesday_opening=TUESDAY_OPENING, tuesday_closing=TUESDAY_CLOSING, wednesday_opening=WEDNESDAY_OPENING, wednesday_closing=WEDNESDAY_CLOSING, thursday_opening=THURSDAY_OPENING, thursday_closing=THURSDAY_CLOSING, friday_opening=FRIDAY_OPENING, friday_closing=FRIDAY_CLOSING, saturday_opening=SATURDAY_OPENING, saturday_closing=SATURDAY_CLOSING, sunday_opening=SUNDAY_OPENING, sunday_closing=SUNDAY_CLOSING)
            models.save()
