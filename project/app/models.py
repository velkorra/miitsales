from collections.abc import Iterable
from django.db import models

class Flight(models.Model):
    departure_city = models.CharField(max_length=50)
    departure_airport = models.CharField(max_length=50)
    arrival_city = models.CharField(max_length=50)
    arrival_airport = models.CharField(max_length=50)
    departure_day = models.CharField(max_length=50)
    departure_time = models.CharField(max_length=50)
    arrival_day = models.CharField(max_length=50)
    arrival_time = models.CharField(max_length=50)
    aviation_company = models.CharField(max_length=50)
    spare_economy = models.IntegerField()
    spare_business = models.IntegerField()
    price_economy = models.IntegerField()
    price_business = models.IntegerField()
    plane = models.CharField(max_length=50)
    

    
class Ticket(models.Model):
    flightID = models.IntegerField()
    price = models.IntegerField()
    ticket_class = models.CharField(max_length=50)