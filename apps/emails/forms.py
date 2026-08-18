from django import forms
from django.core.exceptions import ValidationError


class EmailActivityForm(forms.Form):
    """
    Form for the Email Activity page.

    To, Cc and Bcc are submitted as multiple values
    from the recipient-chip JavaScript.
    """

    # Email subject.
    subject = forms.CharField(
        max_length=300,
        required=True,
    )

    # Email body.
    body = forms.CharField(
        required=True,
        widget=forms.Textarea,
    )

    def clean_recipients(self, field_name, required=False):
        """
        Validate a group of email recipients.

        Example:
            to = [
                "person1@gmail.com",
                "person2@gmail.com"
            ]
        """

        # Django's QueryDict can contain multiple values
        # with the same field name.
        values = self.data.getlist(field_name)

        # Remove empty values.
        values = [
            value.strip().lower()
            for value in values
            if value.strip()
        ]

        # To must contain at least one recipient.
        if required and not values:
            raise ValidationError(
                "Please add at least one recipient."
            )

        # Prevent duplicate recipients inside the same field.
        if len(values) != len(set(values)):
            raise ValidationError(
                f"Duplicate {field_name.upper()} recipient."
            )

        # Validate every email address.
        email_validator = forms.EmailField()

        for email in values:
            email_validator.clean(email)

        return values

    def clean(self):
        """
        Validate To, Cc and Bcc together.
        """

        cleaned_data = super().clean()

        # Get and validate recipients.
        to = self.clean_recipients(
            "to",
            required=True
        )

        cc = self.clean_recipients(
            "cc"
        )

        bcc = self.clean_recipients(
            "bcc"
        )

        # Prevent the same email from appearing
        # in different recipient groups.
        all_recipients = to + cc + bcc

        if len(all_recipients) != len(set(all_recipients)):
            raise ValidationError(
                "The same email address cannot appear in "
                "To, Cc or Bcc more than once."
            )

        # Store the cleaned recipient lists.
        cleaned_data["to"] = to
        cleaned_data["cc"] = cc
        cleaned_data["bcc"] = bcc

        return cleaned_data