from django.contrib import admin
from .views import Flight, Session, Ticket
# Register your models here.
admin.site.register(Flight)
admin.site.register(Session)
admin.site.register(Ticket)