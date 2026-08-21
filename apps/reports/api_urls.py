from django.urls import path

from .api_views import (
    EmailReportAPIView,
    LocationReportAPIView,
    AIReportAPIView,
)


urlpatterns = [

    path(
        "email/",
        EmailReportAPIView.as_view(),
        name="email-report-api",
    ),

    path(
        "map/",
        LocationReportAPIView.as_view(),
        name="map-report-api",
    ),

    path(
        "ai/",
        AIReportAPIView.as_view(),
        name="ai-report-api",
    ),
]