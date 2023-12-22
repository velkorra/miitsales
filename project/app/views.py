from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from . models import *
from . serializer import *


class FlightView(APIView):
    def get(self, request):
        output = [{
            'departure_city': output.departure_city,
            'departure_airport': output.departure_airport,
            'arrival_city': output.arrival_city,
            'arrival_airport': output.arrival_airport,
            'departure_day': output.departure_day,
            'departure_time': output.departure_time,
            'arrival_day': output.arrival_day,
            'arrival_time': output.arrival_time,
            'aviation_company': output.aviation_company,
            'spare_economy': output.spare_economy,
            'spare_business': output.spare_business,
            'price_economy': output.price_economy,
            'price_business': output.price_business,
            'plane': output.plane
            } for output in Flight.objects.all()]
        return Response(output)
    def post(self, request):
        serializer = FlightSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response(serializer.data)

class TicketView(APIView):
    def get(self, request):
        output = [{
            'flightID': output.flightID,
            'price': output.price,
            'ticket_class': output.ticket_class
            } for output in Ticket.objects.all()]
        return Response(output)
    
    def post(self, request):
        serializer = TicketSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response(serializer.data)