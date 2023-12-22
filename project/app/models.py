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
    def __str__(self) -> str:
        return f'Полет {self.departure_airport} - {self.arrival_airport} {self.departure_day}'    

    
class Ticket(models.Model):
    flightID = models.IntegerField()
    price = models.IntegerField()
    ticket_class = models.CharField(max_length=50)
    
class Session(models.Model):
    token = models.CharField(max_length=60)
    status = models.CharField(max_length=10)
    userID = models.CharField(max_length=60)
    time = models.DateTimeField(auto_now=False, auto_now_add=True)