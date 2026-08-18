from django.db import models

from apps.accounts.models import Profile
from apps.emails.models import Email
from apps.ai.models import AIInteraction
from django.core.exceptions import ValidationError


class File(models.Model):
    SOURCE_CHOICES = [
        ('email', 'Email'),
        ('ai', 'AI'),
    ]

    profile = models.ForeignKey(
        Profile,
        on_delete=models.CASCADE,
        related_name='files'
    )

    email = models.ForeignKey(
        Email,
        on_delete=models.CASCADE,
        related_name='attachments',
        null=True,
        blank=True
    )

    ai_interaction = models.ForeignKey(
        AIInteraction,
        on_delete=models.CASCADE,
        related_name='support_files',
        null=True,
        blank=True
    )

    source = models.CharField(
        max_length=20,
        choices=SOURCE_CHOICES
    )

    file = models.FileField(
        upload_to='files/'
    )

    original_name = models.CharField(
        max_length=255
    )

    file_type = models.CharField(
        max_length=100
    )

    file_size = models.PositiveBigIntegerField()

    uploaded_at = models.DateTimeField(
        auto_now_add=True
    )

    
    def clean(self):
        if self.source == 'email':
            if not self.email or self.ai_interaction:
                raise ValidationError(
                    'An email file must belong to an Email only.'
                )

        elif self.source == 'ai':
            if not self.ai_interaction or self.email:
                raise ValidationError(
                    'An AI file must belong to an AI interaction only.'
                )

    def __str__(self):
            return self.original_name
    