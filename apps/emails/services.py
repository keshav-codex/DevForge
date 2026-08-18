import base64
from email.message import EmailMessage

from google.oauth2.credentials import Credentials
from googleapiclient.discovery import build

from allauth.socialaccount.models import SocialToken


def get_gmail_service(user):
    """
    Create and return a Gmail API service
    using the user's stored Google OAuth token.
    """

    # Get the OAuth token stored by django-allauth.
    social_token = SocialToken.objects.get(
        account__user=user,
        app__provider="google",
    )

    # Create Google API credentials from the stored token.
    credentials = Credentials(
        token=social_token.token,
    )

    # Create and return the Gmail API client.
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

    to:
        List of primary recipients.

    cc:
        Optional list of CC recipients.

    bcc:
        Optional list of BCC recipients.

    subject:
        Email subject.

    body:
        Email body.

    attachments:
        Optional list of uploaded files.
    """

    # Create Gmail API service.
    service = get_gmail_service(user)

    # Create the email message.
    message = EmailMessage()

    # Get the authenticated user's email address.
    sender = user.email

    # Set the sender.
    message["From"] = sender

    # Add primary recipients.
    if to:
        message["To"] = ", ".join(to)

    # Add CC recipients when provided.
    if cc:
        message["Cc"] = ", ".join(cc)

    # Add BCC recipients when provided.
    if bcc:
        message["Bcc"] = ", ".join(bcc)

    # Set subject.
    message["Subject"] = subject

    # Add email body.
    message.set_content(body)

    # Add attachments.
    if attachments:

        for uploaded_file in attachments:

            # Read uploaded file data.
            file_data = uploaded_file.read()

            # Determine MIME type.
            content_type = (
                uploaded_file.content_type
                or "application/octet-stream"
            )

            # Split MIME type into maintype and subtype.
            maintype, subtype = content_type.split(
                "/",
                1,
            )

            # Attach the file to the email.
            message.add_attachment(
                file_data,
                maintype=maintype,
                subtype=subtype,
                filename=uploaded_file.name,
            )

    # Convert the email into Gmail API format.
    encoded_message = base64.urlsafe_b64encode(
        message.as_bytes()
    ).decode()

    # Send the email through the authenticated
    # user's Gmail account.
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

    # Return Gmail's response.
    return result