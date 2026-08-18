from django.db import models


class Profile(models.Model):
    google_id = models.CharField(
        max_length=255,
        unique=True
    )

    email = models.EmailField(
        unique=True
    )

    email_verified = models.BooleanField(
        default=False
    )

    first_name = models.CharField(
        max_length=150
    )

    last_name = models.CharField(
        max_length=150,
        blank=True
    )

    full_name = models.CharField(
        max_length=300
    )

    profile_picture = models.URLField(
        blank=True
    )

    google_locale = models.CharField(
        max_length=20,
        blank=True
    )

    google_hosted_domain = models.CharField(
        max_length=255,
        blank=True
    )

    gmail_connected = models.BooleanField(
        default=False
    )

    gmail_permission_granted = models.BooleanField(
        default=False
    )

    gmail_scopes = models.JSONField(
        default=list,
        blank=True
    )

    gmail_token_expiry = models.DateTimeField(
        null=True,
        blank=True
    )

    last_login = models.DateTimeField(
        null=True,
        blank=True
    )

    last_activity_at = models.DateTimeField(
        null=True,
        blank=True
    )

    created_at = models.DateTimeField(
        auto_now_add=True
    )

    updated_at = models.DateTimeField(
        auto_now=True
    )

    is_active = models.BooleanField(
        default=True
    )

    def __str__(self):
        return self.email