import base64
from email.message import EmailMessage

from django.conf import settings

from google.oauth2.credentials import Credentials
from googleapiclient.discovery import build

from allauth.socialaccount.models import SocialToken


def get_gmail_service(user):
    """
    Create and return a Gmail API service
    using the user's stored Google OAuth credentials.
    """

    # Get the user's stored Google OAuth token.
    social_token = SocialToken.objects.get(
        account__user=user,
        app__provider="google",
    )

    # Get the Google OAuth application.
    social_app = social_token.app

    if not social_app:
        raise ValueError(
            "Google OAuth application is not configured."
        )

    # Create Google credentials.
    credentials = Credentials(
        token=social_token.token,
        refresh_token=social_token.token_secret,
        token_uri="https://oauth2.googleapis.com/token",
        client_id=social_app.client_id,
        client_secret=social_app.secret,
    )

    # Create and return Gmail API service.
    return build(
        "gmail",
        "v1",
        credentials=credentials,
    )


def send_email(
    user,
    to,
    cc=None,
    bcc=None,
    subject="",
    body="",
    attachments=None,
):
    """
    Send an email through the authenticated
    user's Gmail account.
    """

    service = get_gmail_service(user)

    message = EmailMessage()

    # Sender.
    message["From"] = user.email

    # Recipients.
    if to:
        message["To"] = ", ".join(to)

    if cc:
        message["Cc"] = ", ".join(cc)

    if bcc:
        message["Bcc"] = ", ".join(bcc)

    # Subject and body.
    message["Subject"] = subject
    message.set_content(body)

    # Attachments.
    if attachments:

        for uploaded_file in attachments:

            file_data = uploaded_file.read()

            content_type = (
                uploaded_file.content_type
                or "application/octet-stream"
            )

            maintype, subtype = content_type.split(
                "/",
                1,
            )

            message.add_attachment(
                file_data,
                maintype=maintype,
                subtype=subtype,
                filename=uploaded_file.name,
            )

    # Convert email to Gmail API format.
    encoded_message = base64.urlsafe_b64encode(
        message.as_bytes()
    ).decode()

    # Send email.
    result = (
        service.users()
        .messages()
        .send(
            userId="me",
            body={
                "raw": encoded_message,
            },
        )
        .execute()
    )

    return result