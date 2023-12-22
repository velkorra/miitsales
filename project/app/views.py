from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from . models import *
from . serializer import *
from django.contrib.auth.models import User


class FlightView(APIView):
    def get(self, request):
        output = [{
            'id':output.id,
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
        
class SessionView(APIView):
    def get(self, request):
        from random import randint
        request_type = request.GET.get('request_type')
        if request_type=='create_user':
            login = (request.GET.get('login'))
            password = (request.GET.get('password'))
            user = User.objects.create_user(username=login, email=login, password=password)
            session = Session(userID=user.get_username(), status='client', token=str(randint(10**20, 10**50)))
            session.save()
            print(session)
            return Response({'babba': 'bobba'})
        if request_type=='login':
            login = (request.GET.get('login'))
            password = (request.GET.get('password'))
            try:
                user = User.objects.get(username=login)
                session = Session.objects.get(userID=login)
                if user.check_password(password):
                    output = {
                    'success': True,
                    'status': session.status,
                    'token': session.token,
                    'username':login
                    }
                    return Response(output)
                else:
                    return Response({'success': False})
            except Exception as e:
                print(e)

        output = [{
            'userID': output.userID,
            'status': output.status,
            'token': output.token
            } for output in Session.objects.all()]
        return Response(output)
    
    def post(self, request):
        serializer = TicketSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response(serializer.data)
        
