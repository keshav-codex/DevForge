from django.urls import path

from .views import activity


urlpatterns = [
    # Email Activity page.
    path("", activity, name="email_activity"),
]