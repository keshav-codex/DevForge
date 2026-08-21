from django.db.models.signals import post_save
from django.dispatch import receiver
from django.contrib.auth.models import User

from allauth.socialaccount.models import SocialAccount

from .models import Profile
from .email_service import send_welcome_email


@receiver(post_save, sender=User)
def create_profile(sender, instance, created, **kwargs):

    profile, profile_created = Profile.objects.get_or_create(
        user=instance
    )

    social_account = SocialAccount.objects.filter(
        user=instance,
        provider="google"
    ).first()

    if social_account:

        data = social_account.extra_data

        profile.google_id = social_account.uid
        profile.email = instance.email
        profile.email_verified = data.get(
            "email_verified",
            False
        )

        profile.first_name = data.get(
            "given_name",
            ""
        )

        profile.last_name = data.get(
            "family_name",
            ""
        )

        profile.full_name = data.get(
            "name",
            f"{profile.first_name} {profile.last_name}".strip()
        )

        profile.profile_picture = data.get(
            "picture",
            ""
        )

        profile.google_locale = data.get(
            "locale",
            ""
        )

        profile.google_hosted_domain = data.get(
            "hd",
            ""
        )

        profile.save()

        # Send welcome email only when
        # the Profile was created for the first time.
        if profile_created:

            send_welcome_email(
                profile
            )