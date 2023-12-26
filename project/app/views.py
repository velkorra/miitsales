from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from . models import *
from . serializer import *
from django.contrib.auth.models import User
from django.db.models import Q


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
            'username': output.username
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
        if request_type=='cashrefund':
            login = (request.GET.get('login'))
            if User.objects.filter(username=login).exists():
                flightID=request.GET.get('id')
                flight = Flight.objects.get(id=flightID)
                print(flight)
                flight.spare_economy+=1
                flight.save()
                ticket = Ticket.objects.get(flightID=flightID, username=login)
                ticket.delete()
                return Response({'success': True})      
        if request_type=='cashpay':
            login = (request.GET.get('login'))
            
            if User.objects.filter(username=login).exists():
                flightID=request.GET.get('id')
                flight = Flight.objects.get(id=flightID)
                if Ticket.objects.filter(username=login, flightID=flightID).exists():
                    return Response({'success':'already bought'})
                flight.spare_economy-=1
                flight.save()
                ticket = Ticket(username=login, flightID=flightID)
                ticket.save()
                return Response({'success': True})
            else:
                return Response({'success': False})
        if request_type=='refund':
            login = (request.GET.get('login'))
            password = (request.GET.get('password'))
            card= (request.GET.get('card'))
            if card=='456987123' and password=='key118':
                flightID=request.GET.get('id')
                flight = Flight.objects.get(id=flightID)
                flight.spare_economy+=1
                flight.save()
                ticket = Ticket.objects.get(flightID=flightID, username=login)
                ticket.delete()
                return Response({'success': True})      
        if request_type=='alluser':
            tickets = Ticket.objects.all()
            output = [{
                'id':Flight.objects.get(id=output.flightID).id,
                'departure_city': Flight.objects.get(id=output.flightID).departure_city,
                'departure_airport': Flight.objects.get(id=output.flightID).departure_airport,
                'arrival_city': Flight.objects.get(id=output.flightID).arrival_city,
                'arrival_airport': Flight.objects.get(id=output.flightID).arrival_airport,
                'departure_day': Flight.objects.get(id=output.flightID).departure_day,
                'departure_time': Flight.objects.get(id=output.flightID).departure_time,
                'arrival_day': Flight.objects.get(id=output.flightID).arrival_day,
                'arrival_time': Flight.objects.get(id=output.flightID).arrival_time,
                'aviation_company': Flight.objects.get(id=output.flightID).aviation_company,
                'spare_economy': Flight.objects.get(id=output.flightID).spare_economy,
                'spare_business': Flight.objects.get(id=output.flightID).spare_business,
                'price_economy': Flight.objects.get(id=output.flightID).price_economy,
                'price_business': Flight.objects.get(id=output.flightID).price_business,
                'plane': Flight.objects.get(id=output.flightID).plane,
                'user':output.username
            } for output in tickets]
            return Response(output)
        if request_type == 'userflights':
            login = (request.GET.get('username'))
            tickets = [ticket.flightID for ticket in Ticket.objects.filter(username=login)]
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
            } for output in Flight.objects.filter(id__in=tickets)]
            return Response(output)
        if request_type=='payment':
            login = (request.GET.get('login'))
            password = (request.GET.get('password'))
            card= (request.GET.get('card'))
            if card=='456987123' and password=='key118':
                flightID=request.GET.get('id')
                flight = Flight.objects.get(id=flightID)
                if Ticket.objects.filter(username=login, flightID=flightID).exists():
                    return Response({'success':'already bought'})
                flight.spare_economy-=1
                flight.save()
                ticket = Ticket(username=login, flightID=flightID)
                ticket.save()
                return Response({'success': True})
            else:
                return Response({'success': False})
        if request_type=='create_user':
            login = (request.GET.get('login'))
            password = (request.GET.get('password'))
            try:
                user = User.objects.create_user(username=login, email=login, password=password)
                session = Session(userID=user.get_username(), status='client', token=str(randint(10**20, 10**50)))
                session.save()
                output = {
                    'success': True,
                    'status': session.status,
                    'token': session.token,
                    'username':login
                    }
                return Response(output)
            except:
                return Response({'success': False})
        if request_type=='login':
            login = (request.GET.get('login'))
            password = (request.GET.get('password'))
            try:
                user = User.objects.get(username=login)
                print(user, user.check_password(password))
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
        
