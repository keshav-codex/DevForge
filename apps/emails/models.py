from django.db import models

from apps.accounts.models import Profile


class Email(models.Model):

    STATUS_CHOICES = [
        ("draft", "Draft"),
        ("pending", "Pending"),
        ("sent", "Sent"),
        ("failed", "Failed"),
    ]

    profile = models.ForeignKey(
        Profile,
        on_delete=models.CASCADE,
        related_name="emails",
    )

    # Primary recipients.
    to = models.JSONField()

    # Carbon-copy recipients.
    cc = models.JSONField(
        default=list,
        blank=True,
    )

    # Blind-carbon-copy recipients.
    bcc = models.JSONField(
        default=list,
        blank=True,
    )

    # Email subject.
    subject = models.CharField(
        max_length=300,
    )

    # Email body.
    body = models.TextField()

    status = models.CharField(
        max_length=20,
        choices=STATUS_CHOICES,
        default="draft",
    )

    message_id = models.CharField(
        max_length=255,
        blank=True,
    )

    sent_at = models.DateTimeField(
        null=True,
        blank=True,
    )

    created_at = models.DateTimeField(
        auto_now_add=True,
    )

    updated_at = models.DateTimeField(
        auto_now=True,
    )

    def __str__(self):
        return self.subject