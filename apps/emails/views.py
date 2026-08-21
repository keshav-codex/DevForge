from django.contrib.auth.decorators import login_required
from django.core.exceptions import ValidationError
from django.shortcuts import render
from django.utils import timezone

from allauth.socialaccount.models import SocialAccount

from apps.ai.services import (
    generate_email_draft,
    improve_email,
    summarize_email,
)

from apps.emails.forms import EmailActivityForm
from apps.emails.models import Email
from apps.emails.services import send_email

from apps.files.models import File
from apps.files.validators import validate_uploaded_files


def get_connected_email(user):
    """
    Get the email address of the connected Google account.
    """

    social_account = SocialAccount.objects.filter(
        user=user,
        provider="google",
    ).first()

    if not social_account:
        return ""

    return social_account.extra_data.get(
        "email",
        "",
    )


@login_required
def activity(request):
    """
    Email Activity page.

    Normal email:
        To / Cc / Bcc
        Subject
        Body
        Attachments
        Gmail sending

    AI email:
        AI works independently of recipients.
        Subject, body and attachments are optional context.
    """

    profile = request.user.profile

    connected_email = get_connected_email(
        request.user
    )

    # =========================================================
    # GET
    # =========================================================

    if request.method == "GET":

        return render(
            request,
            "activity/email.html",
            {
                "form": EmailActivityForm(),
                "connected_email": connected_email,
            },
        )

    # =========================================================
    # CHECK AI ACTION FIRST
    # =========================================================
    #
    # IMPORTANT:
    # Do NOT run EmailActivityForm validation here.
    #
    # The normal form requires a recipient.
    # AI does not require a recipient.
    #

    ai_action = request.POST.get(
        "ai_action",
        "",
    ).strip()

    if ai_action:

        instruction = request.POST.get(
            "ai_instruction",
            "",
        ).strip()

        subject = request.POST.get(
            "subject",
            "",
        ).strip()

        body = request.POST.get(
            "body",
            "",
        ).strip()

        # -----------------------------------------------------
        # AI instruction is the only required AI input.
        # -----------------------------------------------------

        if not instruction:

            return render(
                request,
                "activity/email.html",
                {
                    "form": EmailActivityForm(
                        request.POST
                    ),
                    "connected_email": connected_email,
                    "error": (
                        "Please enter an instruction "
                        "for the AI assistant."
                    ),
                },
            )

        # -----------------------------------------------------
        # Optional files for AI context.
        # -----------------------------------------------------

        uploaded_files = request.FILES.getlist(
            "attachments"
        )

        try:

            uploaded_files = validate_uploaded_files(
                uploaded_files
            )

        except ValidationError as error:

            return render(
                request,
                "activity/email.html",
                {
                    "form": EmailActivityForm(
                        request.POST
                    ),
                    "connected_email": connected_email,
                    "error": error.message,
                },
            )

        # -----------------------------------------------------
        # Run AI.
        # -----------------------------------------------------

        try:

            if ai_action == "draft":

                ai_response = generate_email_draft(
                    instruction=instruction,
                    subject=subject,
                    body=body,
                    attachments=uploaded_files,
                )

            elif ai_action == "improve":

                ai_response = improve_email(
                    instruction=instruction,
                    subject=subject,
                    body=body,
                    attachments=uploaded_files,
                )

            elif ai_action == "summarize":

                ai_response = summarize_email(
                    instruction=instruction,
                    subject=subject,
                    body=body,
                    attachments=uploaded_files,
                )

            else:

                return render(
                    request,
                    "activity/email.html",
                    {
                        "form": EmailActivityForm(
                            request.POST
                        ),
                        "connected_email": connected_email,
                        "error": "Invalid AI action.",
                    },
                )

        except Exception as error:

            print(
                "EMAIL AI ERROR:",
                error,
            )

            return render(
                request,
                "activity/email.html",
                {
                    "form": EmailActivityForm(
                        request.POST
                    ),
                    "connected_email": connected_email,
                    "error": (
                        "Unable to generate an AI response. "
                        "Please try again."
                    ),
                },
            )

        # -----------------------------------------------------
        # AI response is passed to the template.
        # The AI service will return:
        # SUBJECT:
        # BODY:
        # The template/JS will put these values into
        # the subject and body fields.
        # -----------------------------------------------------

        return render(
            request,
            "activity/email.html",
            {
                "form": EmailActivityForm(
                    request.POST
                ),
                "connected_email": connected_email,
                "ai_response": ai_response,
                "ai_action": ai_action,
            },
        )

    # =========================================================
    # NORMAL EMAIL SEND
    # =========================================================

    form = EmailActivityForm(
        request.POST,
        request.FILES,
    )

    if not form.is_valid():

        return render(
            request,
            "activity/email.html",
            {
                "form": form,
                "connected_email": connected_email,
            },
        )

    # =========================================================
    # EMAIL DATA
    # =========================================================

    to = form.cleaned_data["to"]
    cc = form.cleaned_data["cc"]
    bcc = form.cleaned_data["bcc"]

    subject = form.cleaned_data["subject"]
    body = form.cleaned_data["body"]

    # =========================================================
    # FILE VALIDATION
    # =========================================================

    uploaded_files = request.FILES.getlist(
        "attachments"
    )

    try:

        uploaded_files = validate_uploaded_files(
            uploaded_files
        )

    except ValidationError as error:

        form.add_error(
            None,
            error.message,
        )

        return render(
            request,
            "activity/email.html",
            {
                "form": form,
                "connected_email": connected_email,
            },
        )

    # =========================================================
    # CREATE EMAIL RECORD
    # =========================================================

    email_record = Email.objects.create(
        profile=profile,
        to=to,
        cc=cc,
        bcc=bcc,
        subject=subject,
        body=body,
        status="pending",
    )

    # =========================================================
    # SEND EMAIL
    # =========================================================

    try:

        result = send_email(
            user=request.user,
            to=to,
            cc=cc,
            bcc=bcc,
            subject=subject,
            body=body,
            attachments=uploaded_files,
        )

        email_record.message_id = result.get(
            "id"
        )

        email_record.status = "sent"

        email_record.sent_at = timezone.now()

        email_record.save()

        # =====================================================
        # SAVE ATTACHMENTS
        # =====================================================

        for uploaded_file in uploaded_files:

            File.objects.create(
                profile=profile,
                email=email_record,
                source="email",
                file=uploaded_file,
                original_name=uploaded_file.name,
                file_type=(
                    uploaded_file.content_type
                    or ""
                ),
                file_size=uploaded_file.size,
            )

        # =====================================================
        # SUCCESS
        # =====================================================

        return render(
            request,
            "activity/email.html",
            {
                "form": EmailActivityForm(),
                "connected_email": connected_email,
                "success": "Email sent successfully.",
            },
        )

    except Exception as error:

        print(
            "EMAIL SEND ERROR:",
            error,
        )

        email_record.status = "failed"

        email_record.save()

        return render(
            request,
            "activity/email.html",
            {
                "form": form,
                "connected_email": connected_email,
                "error": str(error),
            },
        )