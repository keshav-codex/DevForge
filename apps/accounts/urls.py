from django.urls import path

from . import views


urlpatterns = [
    path("welcome/", views.welcome, name="welcome"),
    path("dashboard/", views.dashboard, name="dashboard"),
    path("activity/", views.activity, name="activity"),
]