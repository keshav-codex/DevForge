from rest_framework import serializers

from apps.emails.models import Email
from apps.files.models import File
from apps.location.models import Location
from apps.ai.models import AIInteraction


class EmailFileSerializer(serializers.ModelSerializer):

    class Meta:
        model = File
        fields = [
            "id",
            "original_name",
            "file_type",
            "file_size",
        ]


class EmailReportSerializer(serializers.ModelSerializer):

    files = serializers.SerializerMethodField()

    class Meta:
        model = Email
        fields = [
            "id",
            "to",
            "cc",
            "bcc",
            "subject",
            "body",
            "status",
            "sent_at",
            "created_at",
            "files",
        ]

    def get_files(self, obj):

        files = obj.attachments.all()

        return EmailFileSerializer(
            files,
            many=True,
            context=self.context,
        ).data
    

class LocationReportSerializer(serializers.ModelSerializer):
    class Meta:
        model = Location
        fields = [
            "id",
            "place_name",
            "status",
            "description",
            "address",
            "latitude",
            "longitude",
            "created_at",
            "updated_at",
        ]


class AIReportSerializer(serializers.ModelSerializer):
    files = serializers.SerializerMethodField()

    class Meta:
        model = AIInteraction
        fields = [
            "id",
            "input_text",
            "output_text",
            "created_at",
            "updated_at",
            "files",
        ]

    def get_files(self, obj):
        files = obj.support_files.all()

        return EmailFileSerializer(
            files,
            many=True,
            context=self.context,
        ).data