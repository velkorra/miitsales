from django.apps import AppConfig


class AppConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'app'
    def ready(self) -> None:
        # from .views import ReactView
        # from .models import React
        # art = React(employee='axel', department='f')
        # art.save()
        pass