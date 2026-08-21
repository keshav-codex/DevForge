from pathlib import Path

from docx import Document
from pypdf import PdfReader


def extract_text(uploaded_file):
    """
    Extract readable text from supported files.

    Supported:
    PDF, DOCX, TXT

    DOC is currently not supported by python-docx.
    """

    extension = Path(
        uploaded_file.name
    ).suffix.lower()


    if extension == ".txt":

        return uploaded_file.read().decode(
            "utf-8",
            errors="ignore",
        )


    if extension == ".pdf":

        reader = PdfReader(
            uploaded_file
        )

        text = []

        for page in reader.pages:

            page_text = page.extract_text()

            if page_text:
                text.append(page_text)

        return "\n\n".join(text)


    if extension == ".docx":

        document = Document(
            uploaded_file
        )

        text = []

        for paragraph in document.paragraphs:

            if paragraph.text.strip():
                text.append(
                    paragraph.text
                )

        return "\n".join(text)


    if extension == ".doc":

        raise ValueError(
            "Legacy .doc files are not supported yet."
        )


    raise ValueError(
        "Unsupported file type."
    )