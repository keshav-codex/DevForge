from django.core.exceptions import ValidationError
from allauth.socialaccount.models import SocialAccount
from django.contrib.auth.decorators import login_required
from django.shortcuts import render
from django.utils import timezone

from apps.emails.forms import EmailActivityForm
from apps.emails.models import Email
from apps.emails.services import send_email
from apps.files.models import File
from apps.files.validators import validate_uploaded_files


@login_required
def activity(request):
    """
    Email Activity page.

    Handles:
    - To / Cc / Bcc recipients
    - Subject
    - Body
    - Attachments
    - Gmail sending
    - Email activity record
    """

    # Get the authenticated user's profile.
    profile = request.user.profile

    # Handle form submission.
    if request.method == "POST":

        # Pass submitted data and uploaded files to the form.
        form = EmailActivityForm(
            request.POST,
            request.FILES,
        )

        # Continue only when validation succeeds.
        if form.is_valid():

            # Get cleaned email data.
            to = form.cleaned_data["to"]
            cc = form.cleaned_data["cc"]
            bcc = form.cleaned_data["bcc"]

            subject = form.cleaned_data["subject"]
            body = form.cleaned_data["body"]

            # Get uploaded attachments.
            uploaded_files = request.FILES.getlist("attachments")

            try:
                # Validate file count, size and file types.
                uploaded_files = validate_uploaded_files(
                    uploaded_files
                )

            except ValidationError as error:

                # Return the form with the validation error.
                form.add_error(
                    None,
                    error.message
                )

                return render(
                    request,
                    "activity/email.html",
                    {
                        "form": form,
                        "connected_email": request.user.email,
                    },
                )

            # Create the activity record before sending.
            email_record = Email.objects.create(
                profile=profile,
                to=to,
                cc=cc,
                bcc=bcc,
                subject=subject,
                body=body,
                status="pending",
            )

            try:
                # Send email through the user's connected Gmail account.
                result = send_email(
                    user=request.user,
                    to=to,
                    cc=cc,
                    bcc=bcc,
                    subject=subject,
                    body=body,
                    attachments=uploaded_files,
                )

                # Save Gmail message ID.
                email_record.message_id = result.get("id")

                # Mark activity as successfully sent.
                email_record.status = "sent"

                # Store the successful sending time.
                email_record.sent_at = timezone.now()

                email_record.save()

                # Save attachment records.
                for uploaded_file in uploaded_files:

                    File.objects.create(
                        profile=profile,
                        email=email_record,
                        source="email",
                        file=uploaded_file,
                        original_name=uploaded_file.name,
                        file_type=uploaded_file.content_type or "",
                        file_size=uploaded_file.size,
                    )

                # Show success page.
                return render(
                    request,
                    "activity/email.html",
                    {
                        "form": EmailActivityForm(),
                        "connected_email": request.user.email,
                        "success": "Email sent successfully.",
                    },
                )

            except Exception as error:

                # Mark activity as failed.
                email_record.status = "failed"
                email_record.save()

                # Show error to the user.
                return render(
                    request,
                    "activity/email.html",
                    {
                        "form": form,
                        "connected_email": request.user.email,
                        "error": str(error),
                    },
                )

    else:
        # Empty form for normal page load.
        form = EmailActivityForm()


    # Get the user's connected Google account.
    social_account = SocialAccount.objects.filter(
        user=request.user,
        provider="google",
    ).first()

    # Get the email stored by the Google account.
    connected_email = social_account.extra_data.get("email", "") if social_account else ""

    return render(
        request,
        "activity/email.html",
        {
            "form": form,
            "connected_email": connected_email,
        },
    )