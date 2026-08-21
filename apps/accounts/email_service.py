from django.conf import settings
from django.core.mail import send_mail


def send_welcome_email(profile):
    """
    Send a welcome email after successful profile creation.
    """

    recipient = profile.email

    if not recipient:
        return False

    name = profile.full_name or profile.first_name or "there"

    subject = "Welcome to DevForge"

    message = f"""
Hello {name},

Welcome to DevForge!

Your account has been successfully created.

DevForge is your personal development and productivity platform.

We are glad to have you here.

Regards,
DevForge Team
"""

    send_mail(
        subject=subject,
        message=message,
        from_email=settings.DEFAULT_FROM_EMAIL,
        recipient_list=[recipient],
        fail_silently=False,
    )

    return True