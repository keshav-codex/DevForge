from pathlib import Path

from django.core.exceptions import ValidationError

from apps.files.models import File


def validate_uploaded_files(uploaded_files):
    """
    Validate files uploaded to an activity.

    Rules:
    - Maximum 5 files.
    - Maximum combined size 10 MB.
    - Only PDF, DOC, DOCX and TXT files.
    """

    # Convert uploaded files to a list.
    uploaded_files = list(uploaded_files)

    # Check file count.
    if len(uploaded_files) > File.MAX_FILES:
        raise ValidationError(
            "You can upload a maximum of 5 files."
        )

    # Calculate total upload size.
    total_size = sum(
        uploaded_file.size
        for uploaded_file in uploaded_files
    )

    # Check combined size.
    if total_size > File.MAX_TOTAL_SIZE:
        raise ValidationError(
            "The total file size cannot exceed 10 MB."
        )

    # Validate every file.
    for uploaded_file in uploaded_files:

        extension = Path(
            uploaded_file.name
        ).suffix.lower()

        if extension not in File.ALLOWED_EXTENSIONS:
            raise ValidationError(
                f"{uploaded_file.name} is not a supported file type. "
                "Allowed types: PDF, DOC, DOCX and TXT."
            )

    return uploaded_files