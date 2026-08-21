from django.urls import path

from . import views


urlpatterns = [

    path(
        "",
        views.reports,
        name="reports",
    ),

    path(
        "email/",
        views.email_report,
        name="email_report",
    ),

    path(
        "map/",
        views.map_report,
        name="map_report",
    ),

    path(
        "ai/",
        views.ai_report,
        name="ai_report",
    ),

    path(
        "analytics/",
        views.analytics,
        name="analytics",
    ),
]