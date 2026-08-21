from django import forms


class MultipleFileInput(forms.FileInput):
    allow_multiple_selected = True


class MultipleFileField(forms.FileField):
    def __init__(self, *args, **kwargs):
        kwargs.setdefault(
            "widget",
            MultipleFileInput(),
        )

        super().__init__(*args, **kwargs)

    def clean(self, data, initial=None):
        single_file_clean = super().clean

        if isinstance(data, (list, tuple)):
            result = [
                single_file_clean(file, initial)
                for file in data
            ]

            return result

        return [single_file_clean(data, initial)]


class AIActivityForm(forms.Form):

    prompt = forms.CharField(
        label="Ask AI",
        widget=forms.Textarea(
            attrs={
                "class": "form-control ai-prompt-input",
                "rows": 8,
                "placeholder": (
                    "Ask anything, explain a concept, "
                    "analyze information, or give an instruction..."
                ),
                "autocomplete": "off",
            }
        ),
    )

    files = MultipleFileField(
        label="Documents",
        required=False,
        widget=MultipleFileInput(
            attrs={
                "class": "ai-file-input",
                "accept": ".pdf,.docx,.txt",
            }
        ),
    )