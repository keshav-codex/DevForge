Create the final production-ready `ai.css` for the DevForge AI Reports page.

Existing template:
`templates/reports/ai.html`

Existing page structure:

- AI Reports page
- Header:
  - "AI Reports"
  - "View reports and insights generated from your AI activity."
- Dynamic report content container
- Pagination container
- Existing JavaScript loads AI reports from:
  `/reports/api/ai/`

The existing `ai.js` must NOT be changed.

The JavaScript dynamically creates:

- `.ai-report-card`
- `.ai-report-header`
- `.ai-report-input`
- `.ai-report-output`
- `.ai-report-dates`
- `.ai-report-files`
- `.ai-report-attachments`
- `.ai-report-file`
- `.ai-report-no-files`

AI data currently displayed:
- Input
- Output
- Created date
- Updated date
- Supporting attachments
- Attachment original name
- File type
- File size

Existing states:
- Loading
- API error
- No AI activity
- Successful AI report results
- Previous / Next pagination

Important:
- Frontend only.
- Do not modify `ai.js`.
- Do not modify API URLs.
- Do not modify data fields.
- Do not modify pagination logic.
- Do not introduce fake AI metrics.
- Do not change backend business logic.
- Work with `reports_common.css`.

Design goal:
Create a professional AI interaction report interface.

AI report card:
- Make the card easy to scan.
- Clearly separate Input and Output.
- Input should look like the user's original request.
- Output should receive stronger visual reading priority because it may contain longer text.
- Preserve whitespace and line breaks.
- Long AI responses must wrap naturally.
- Long prompts must never overflow.
- File names must wrap safely.
- Dates should appear as secondary metadata.

Attachments:
- Make attachment information look like structured file rows.
- Clearly distinguish filename, file type, and file size.
- Do not make attachments visually overpower the AI response.

Typography:
- Comfortable reading width.
- Strong section headings.
- Clear distinction between content and metadata.
- AI output should support long-form reading.

Status:
- Keep status visually secondary and compact.

Responsive system:
Use only four ranges:

1. Above 1200px:
   - Spacious report card.
   - Comfortable information grouping.

2. 769px–1200px:
   - Preserve readable content width.
   - Adapt metadata and file layout.

3. 481px–768px:
   - Stack information when necessary.
   - Ensure AI text remains comfortable to read.

4. 480px and below:
   - Fully mobile-friendly.
   - Stack header/status.
   - Stack attachment metadata.
   - No horizontal overflow.
   - Long text must wrap.

Accessibility:
- Clear focus states where interactive elements exist.
- Good contrast.
- Respect reduced-motion preferences.

Write the complete final `ai.css` from scratch.
Do not provide a patch.