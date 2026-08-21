from rest_framework import generics
from rest_framework.permissions import IsAuthenticated

from apps.emails.models import Email
from apps.location.models import Location
from apps.ai.models import AIInteraction

from .pagination import ReportPagination
from .serializers import (
    EmailReportSerializer,
    LocationReportSerializer,
    AIReportSerializer
)


class EmailReportAPIView(generics.ListAPIView):
    serializer_class = EmailReportSerializer
    permission_classes = [IsAuthenticated]
    pagination_class = ReportPagination

    def get_queryset(self):
        profile = self.request.user.profile

        return (
            Email.objects
            .filter(profile=profile)
            .prefetch_related("attachments")
            .order_by("-created_at")
        )


class LocationReportAPIView(generics.ListAPIView):
    serializer_class = LocationReportSerializer
    permission_classes = [IsAuthenticated]
    pagination_class = ReportPagination

    def get_queryset(self):
        profile = self.request.user.profile

        return (
            Location.objects
            .filter(profile=profile)
            .order_by("-created_at")
        )



class AIReportAPIView(generics.ListAPIView):
    serializer_class = AIReportSerializer
    permission_classes = [IsAuthenticated]
    pagination_class = ReportPagination

    def get_queryset(self):
        profile = self.request.user.profile

        return (
            AIInteraction.objects
            .filter(profile=profile)
            .prefetch_related("support_files")
            .order_by("-created_at")
        )