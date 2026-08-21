from pathlib import Path

from django.conf import settings
from google import genai

from apps.files.services import extract_text


def generate_ai_response(
    prompt,
    document_context="",
):
    """
    Generate an AI response using Gemini.
    """

    client = genai.Client(
        api_key=settings.GEMINI_API_KEY
    )

    system_message = (
        "You are the AI assistant for DevForge. "
        "Provide clear, accurate, useful and well-structured "
        "answers. Use all information supplied by the user. "
        "Do not invent missing information."
    )

    user_message = prompt

    if document_context:

        user_message = f"""
User request:

{prompt}

Relevant document content:

{document_context}
"""

    response = client.models.generate_content(
        model="gemini-3.6-flash",
        contents=user_message,
        config={
            "system_instruction": system_message,
        },
    )

    return response.text


def get_document_context(attachments):
    """
    Extract text from uploaded files for AI context.

    Files are optional.
    Unsupported extraction errors are allowed to
    propagate to the calling view.
    """

    if not attachments:
        return ""

    documents = []

    for uploaded_file in attachments:

        text = extract_text(
            uploaded_file
        )

        if text.strip():

            documents.append(
                f"""
FILE: {Path(uploaded_file.name).name}

{text}
"""
            )

    return "\n".join(documents)


def generate_email_draft(
    instruction,
    subject="",
    body="",
    attachments=None,
):
    """
    Generate an email from the user's instruction.

    Subject, body and attachments are optional.
    If provided, they are used as additional context.
    """

    document_context = get_document_context(
        attachments
    )

    prompt = f"""
Create an email based on the user's instruction.

USER INSTRUCTION:
{instruction}
"""

    if subject:

        prompt += f"""

EXISTING SUBJECT:
{subject}

Use the existing subject as context.
Improve or modify it only when appropriate.
"""

    if body:

        prompt += f"""

EXISTING EMAIL BODY:
{body}

Use the existing body as context.
Preserve useful information and improve it according
to the user's instruction.
"""

    if document_context:

        prompt += f"""

ATTACHED DOCUMENTS:
{document_context}

Use relevant information from the attached documents.
"""

    prompt += """

Return exactly in this format:

SUBJECT:
<final subject>

BODY:
<final email body>

Do not add any explanation outside this format.
"""

    return generate_ai_response(
        prompt=prompt,
    )


def improve_email(
    instruction,
    subject="",
    body="",
    attachments=None,
):
    """
    Improve an existing email using the user's instruction.

    Existing subject, body and attachments are optional.
    """

    document_context = get_document_context(
        attachments
    )

    prompt = f"""
Improve or rewrite the email according to the
user's instruction.

USER INSTRUCTION:
{instruction}
"""

    if subject:

        prompt += f"""

EXISTING SUBJECT:
{subject}
"""

    if body:

        prompt += f"""

EXISTING EMAIL BODY:
{body}
"""

    if document_context:

        prompt += f"""

ATTACHED DOCUMENTS:
{document_context}
"""

    prompt += """

Use whatever information is provided.
Do not assume that subject, body or documents exist
when they are not provided.

Return exactly in this format:

SUBJECT:
<final subject>

BODY:
<final email body>

Do not add any explanation outside this format.
"""

    return generate_ai_response(
        prompt=prompt,
    )


def summarize_email(
    instruction,
    subject="",
    body="",
    attachments=None,
):
    """
    Summarize or analyze email information according
    to the user's instruction.

    All input fields are optional except instruction.
    """

    document_context = get_document_context(
        attachments
    )

    prompt = f"""
Follow the user's instruction regarding the email.

USER INSTRUCTION:
{instruction}
"""

    if subject:

        prompt += f"""

EMAIL SUBJECT:
{subject}
"""

    if body:

        prompt += f"""

EMAIL BODY:
{body}
"""

    if document_context:

        prompt += f"""

ATTACHED DOCUMENTS:
{document_context}
"""

    prompt += """

Use all provided information.

Return exactly in this format:

SUBJECT:
<appropriate subject>

BODY:
<appropriate response>

Do not add any explanation outside this format.
"""

    return generate_ai_response(
        prompt=prompt,
    )


# Map AI assist

def generate_location_description(
    place_name,
    status,
    instruction,
    description="",
):
    """
    Generate or improve a location description.

    Place name, status and instruction are used as context.
    Existing description is optional.
    """

    prompt = f"""
Create or improve a location description based on the
user's instruction.

PLACE NAME:
{place_name}

STATUS:
{status}

USER INSTRUCTION:
{instruction}
"""

    if description:
        prompt += f"""

EXISTING DESCRIPTION:
{description}

Use the existing description as context.
Preserve its useful meaning and improve or rewrite it
according to the user's instruction.
"""

    prompt += """

Rules:

- Follow the user's instruction carefully.
- Use the place name and status as context.
- If the status is "Planned", write appropriately from
  the perspective of a planned or intended visit.
- If the status is "Visited", write appropriately about
  the visit only using information supplied by the user.
- Do not invent personal experiences, feelings, people,
  events, dates or other personal facts.
- If an existing description is provided, preserve its
  important information unless the instruction asks
  otherwise.
- Make the result natural, clear and meaningful.
- Return ONLY the final location description.
- Do not add headings, labels, explanations or commentary.
"""

    client = genai.Client(
        api_key=settings.GEMINI_API_KEY
    )

    system_message = (
        "You are the AI assistant for DevForge Map Activity. "
        "Your job is to create or improve a location description. "
        "Use the place name, visit status, existing description "
        "and user's instruction as provided. "
        "Follow the user's instruction carefully. "
        "Do not invent personal experiences or unsupported facts. "
        "Return only the final description."
    )

    response = client.models.generate_content(
        model="gemini-3.6-flash",
        contents=prompt,
        config={
            "system_instruction": system_message,
        },
    )

    return response.text.strip()