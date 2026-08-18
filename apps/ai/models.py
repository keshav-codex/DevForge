from django.db import models

from apps.accounts.models import Profile


class AIInteraction(models.Model):
    profile = models.ForeignKey(
        Profile,
        on_delete=models.CASCADE,
        related_name='ai_interactions'
    )

    input_text = models.TextField()

    response_text = models.TextField(
        blank=True
    )

    created_at = models.DateTimeField(
        auto_now_add=True
    )

    updated_at = models.DateTimeField(
        auto_now=True
    )

    def __str__(self):
        return f"AI Interaction - {self.profile.email}"