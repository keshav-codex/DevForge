from django.contrib.auth.decorators import login_required
from django.shortcuts import render

from apps.ai.forms import AIActivityForm
from apps.ai.models import AIInteraction
from apps.ai.services import (
    generate_ai_response,
)

from apps.files.models import File
from apps.files.services import extract_text

@login_required
def activity(request):

    if request.method == "POST":

        form = AIActivityForm(
            request.POST,
            request.FILES,
        )

        if form.is_valid():

            prompt = form.cleaned_data["prompt"]

            uploaded_files = form.cleaned_data["files"]


            # =================================================
            # FILE VALIDATION
            # =================================================

            if len(uploaded_files) > 5:

                return render(
                    request,
                    "activity/ai.html",
                    {
                        "form": form,
                        "error": (
                            "You can upload a maximum of 5 files."
                        ),
                    },
                )


            total_size = sum(
                uploaded_file.size
                for uploaded_file in uploaded_files
            )

            if total_size > 10 * 1024 * 1024:

                return render(
                    request,
                    "activity/ai.html",
                    {
                        "form": form,
                        "error": (
                            "Total file size cannot exceed 10 MB."
                        ),
                    },
                )


            # =================================================
            # EXTRACT DOCUMENT TEXT
            # =================================================

            document_parts = []


            for uploaded_file in uploaded_files:

                try:

                    extracted_text = extract_text(
                        uploaded_file
                    )

                except ValueError as error:

                    return render(
                        request,
                        "activity/ai.html",
                        {
                            "form": form,
                            "error": str(error),
                        },
                    )

                except Exception:

                    return render(
                        request,
                        "activity/ai.html",
                        {
                            "form": form,
                            "error": (
                                f"Unable to read "
                                f"{uploaded_file.name}."
                            ),
                        },
                    )


                if extracted_text.strip():

                    document_parts.append(
                        (
                            f"\n"
                            f"--- {uploaded_file.name} ---\n"
                            f"{extracted_text}\n"
                        )
                    )


            document_context = "\n".join(
                document_parts
            )


            # =================================================
            # GENERATE AI RESPONSE
            # =================================================

            try:

                output_text = generate_ai_response(
                    prompt=prompt,
                    document_context=document_context,
                )

            except Exception as error:

                print(
                    "AI ERROR:",
                    error,
                )

                return render(
                    request,
                    "activity/ai.html",
                    {
                        "form": form,
                        "error": (
                            "Unable to generate an AI response. "
                            "Please try again."
                        ),
                    },
                )


            # =================================================
            # SAVE AI INTERACTION
            # =================================================

            interaction = AIInteraction.objects.create(
                profile=request.user.profile,
                input_text=prompt,
                output_text=output_text,
            )


            # =================================================
            # SAVE UPLOADED FILES
            # =================================================

            for uploaded_file in uploaded_files:

                File.objects.create(
                    profile=request.user.profile,
                    ai_interaction=interaction,
                    source="ai",
                    file=uploaded_file,
                    original_name=uploaded_file.name,
                    file_type=uploaded_file.content_type,
                    file_size=uploaded_file.size,
                )


            # =================================================
            # SUCCESS RESPONSE
            # =================================================

            return render(
                request,
                "activity/ai.html",
                {
                    "form": AIActivityForm(),
                    "response": output_text,
                    "interaction": interaction,
                },
            )


    else:

        form = AIActivityForm()


    return render(
        request,
        "activity/ai.html",
        {
            "form": form,
        },
    )
