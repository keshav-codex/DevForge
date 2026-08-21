from django import forms


class EmailActivityForm(forms.Form):
    """
    Form for the Email Activity page.

    All email fields are optional at form level because
    the same form is used for both normal email sending
    and AI email assistance.

    Recipient validation is handled by Django when
    recipient values are actually provided.
    """

    subject = forms.CharField(
        max_length=300,
        required=False,
    )

    body = forms.CharField(
        required=False,
        widget=forms.Textarea,
    )

    def clean_recipients(self, field_name):
        """
        Read and validate a recipient group.

        To, Cc and Bcc are submitted as multiple values
        by the recipient-chip JavaScript.
        """

        values = self.data.getlist(field_name)

        values = [
            value.strip().lower()
            for value in values
            if value.strip()
        ]

        email_validator = forms.EmailField()

        for email in values:
            email_validator.clean(email)

        # Prevent duplicates within the same field.
        if len(values) != len(set(values)):
            raise forms.ValidationError(
                f"Duplicate {field_name.upper()} recipient."
            )

        return values

    def clean(self):
        """
        Validate recipient groups without making any
        recipient mandatory at form level.
        """

        cleaned_data = super().clean()

        to = self.clean_recipients("to")
        cc = self.clean_recipients("cc")
        bcc = self.clean_recipients("bcc")

        # Prevent the same address from appearing
        # in multiple recipient groups.
        all_recipients = to + cc + bcc

        if len(all_recipients) != len(set(all_recipients)):
            raise forms.ValidationError(
                "The same email address cannot appear in "
                "To, Cc or Bcc more than once."
            )

        cleaned_data["to"] = to
        cleaned_data["cc"] = cc
        cleaned_data["bcc"] = bcc

        return cleaned_data