Create the complete frontend for the DevForge AI Activity page from scratch.

Assume that no HTML, CSS, or JavaScript files exist. This prompt is the complete specification for the page.

Generate three coordinated files:

1. activity/ai.html
2. css/activity/ai.css
3. js/activity/ai.js

The page must be complete on the first implementation. Do not provide a partial stylesheet or expect later CSS patching.

=========================================================
1. APPLICATION
=========================================================

Application name:

DevForge

Page name:

AI Activity

Page purpose:

Provide a focused workspace where users can ask AI questions,
optionally attach documents, submit their request, and view
the generated AI response.

The interface should feel like a professional AI workspace
inside a developer-oriented dashboard.

=========================================================
2. DJANGO TEMPLATE
=========================================================

The page extends:

base.html

Load Django static files.

Page title:

AI Activity | DevForge

Load these stylesheets in this order:

1. activity_common.css
2. ai.css

Use the existing navigation component.

The page-specific JavaScript is:

activity/ai.js

Use the application's existing content and navigation blocks.

The form must support multipart form submission because documents
can be attached.

Use CSRF protection.

=========================================================
3. PAGE STRUCTURE
=========================================================

Create the following hierarchy:

Main
└── AI Activity container
    ├── Page header
    │   ├── Heading
    │   └── Description
    │
    ├── Optional error message
    │
    └── AI Composer
        ├── Composer header
        └── AI form
            ├── Prompt section
            ├── AI response section
            ├── Documents section
            │   ├── Upload area
            │   ├── File input
            │   └── Selected files
            └── Submit action

=========================================================
4. PAGE IDENTIFIERS
=========================================================

Use these exact IDs.

Page:

ai-activity-page
ai-activity-container
ai-activity-header

Error:

ai-error-message

Composer:

ai-composer

Form:

ai-activity-form

Submit:

ai-submit-button
ai-submit-text
ai-submit-loading

Response:

ai-response-container
ai-response-content

Documents:

ai-file-section
ai-upload-area
ai-upload-icon
ai-selected-files

=========================================================
5. SUPPORTING CLASSES
=========================================================

Use these classes:

page
page-container
page-header
card
card-title
message
error

ai-composer-header
ai-composer-description

ai-form-group
ai-field-label
field-error

ai-response-header
ai-response-status
ai-response-content

ai-file-header
ai-field-help

ai-upload-area
ai-upload-icon
ai-upload-description

ai-selected-files

ai-form-actions
primary-button
ai-loading-text

=========================================================
6. EXACT PAGE TEXT
=========================================================

Page heading:

AI Activity

Page description:

Ask AI a question, analyze information,
or work with your documents.

Composer heading:

Ask AI

Composer description:

Enter your request below. You can optionally
attach documents for AI to analyze.

Prompt label:

Ask AI

Response label:

AI Response

Response status:

Generated

Documents label:

Documents

Documents description:

Optional. Add documents if you want
AI to analyze their content.

Upload title:

Add documents

Supported files:

PDF, DOCX or TXT

Upload limit:

Maximum 5 files · Maximum total size 10 MB

Submit:

Ask AI

Loading:

Thinking...

=========================================================
7. AI PROMPT
=========================================================

Create a large multiline prompt field.

The field must:

- Be the primary interaction on the page.
- Have a clearly visible label.
- Have comfortable typing space.
- Support long prompts.
- Wrap text naturally.
- Have readable placeholder text.
- Have a strong but unobtrusive focus state.

Use the Django form's prompt field rather than replacing it
with unrelated hardcoded form logic.

Display field validation errors below the field when present.

=========================================================
8. AI RESPONSE
=========================================================

Only display the response section when an AI response exists.

Structure:

AI Response
Generated

Response content

The response area must:

- Be visually distinct from the editable prompt.
- Support long responses.
- Preserve line breaks.
- Wrap long words safely.
- Never create horizontal page overflow.
- Have comfortable reading spacing.
- Be scrollable when the response becomes excessively long.
- Clearly communicate that the content was generated.

Render response line breaks correctly.

=========================================================
9. DOCUMENT UPLOAD
=========================================================

Create an optional document upload section.

The user should immediately understand:

Documents are optional.

The upload area must communicate:

Add documents

PDF, DOCX or TXT

Maximum 5 files · Maximum total size 10 MB

The visible upload area should act as the user-friendly
interface for the underlying file input.

The actual Django file field must still exist.

The visible file input should not visually dominate the design.

=========================================================
10. SELECTED FILES
=========================================================

When files are selected, JavaScript should display them
inside the selected-files area.

Each selected file should have:

- Filename
- File size where appropriate
- Clear separation from other selected files

Long filenames must not break the layout.

Selected files must remain readable on very small screens.

If no files are selected, the selected-files area should
remain visually empty.

=========================================================
11. SUBMIT BUTTON
=========================================================

The primary action is:

Ask AI

During processing:

Thinking...

The loading state must be visually clear.

The normal and loading labels must not overlap.

The button must remain readable in both states.

The loading state should not cause significant layout shifting.

The button should have:

- Normal state
- Hover state
- Focus state
- Active state
- Disabled/loading state

=========================================================
12. ERROR STATES
=========================================================

Support two types of frontend presentation:

Page-level error:

Something went wrong while processing your request.

Field-level validation errors.

Errors must:

- Be clearly visible.
- Have strong contrast.
- Not look like normal content.
- Remain readable on phones.
- Not cause horizontal overflow.

Do not implement backend error-generation logic.

Only present supplied error information.

=========================================================
13. COLOR SYSTEM
=========================================================

Use this exact DevForge dark palette.

Page background:

#0f1219

Primary card:

#1b2029

Secondary surface:

#202630

Form control background:

#292f39

Form control focused/hover surface:

#303743

Normal border:

#303846

Stronger border:

#414b59

Primary accent:

#4fd1ff

Primary accent hover:

#78dcff

Main text:

#f5f7fb

Secondary text:

#aeb7c5

Placeholder text:

#a5afbd

Error text:

#ff9b9b

Error background:

#321f24

Primary button text:

#071017

Do not introduce arbitrary colors.

Maintain readable contrast everywhere.

=========================================================
14. VISUAL STYLE
=========================================================

Create a polished professional dashboard interface.

The visual hierarchy should be:

1. AI Activity heading
2. Ask AI composer
3. Prompt field
4. AI response when available
5. Documents
6. Final action

Use:

- Moderate rounded corners
- Subtle borders
- Comfortable spacing
- Clear form hierarchy
- Professional typography
- Strong readability
- Controlled content width

Avoid:

- Excessive decoration
- Huge empty areas
- Excessive gradients
- Distracting effects
- Tiny form controls
- Low-contrast text
- Black text on dark surfaces
- White text on light surfaces

=========================================================
15. PAGE HEADER ALIGNMENT
=========================================================

The page header must align horizontally with the AI composer.

The left edge of:

AI Activity

must line up with the left edge of:

Ask AI

composer.

The header and composer should use the same maximum content width.

=========================================================
16. RESPONSIVE DESIGN
=========================================================

The page must work across:

- Very small phones
- Smartphones
- Large smartphones
- Small tablets
- Tablets
- Laptops
- Desktop monitors
- Large monitors
- Ultrawide displays

Phones:

- No horizontal scrolling.
- Prompt field uses available width.
- Upload area remains usable.
- Buttons remain touch-friendly.
- Response remains readable.
- Selected filenames wrap or truncate safely.
- Error messages wrap naturally.
- Composer padding reduces appropriately.

Tablets:

- Maintain comfortable spacing.
- Use available width efficiently.
- Keep response and document sections visually balanced.

Desktop:

- Use a controlled maximum width.
- Keep the composer comfortable for reading and writing.
- Avoid excessively wide text lines.

Ultrawide:

- Keep the entire content centered.
- Never stretch the composer across the full viewport.
- Preserve readable content width.

=========================================================
17. ACCESSIBILITY
=========================================================

Ensure:

- Every form field has an associated label.
- Keyboard focus is clearly visible.
- Interactive elements are identifiable.
- Text contrast is sufficient.
- Placeholder text is readable.
- Buttons have readable labels.
- Upload area is keyboard accessible where possible.
- Touch targets are comfortable.
- Long content cannot break the layout.
- Reduced-motion preferences are respected.

=========================================================
18. JAVASCRIPT
=========================================================

Create activity/ai.js for frontend interaction.

The JavaScript must handle:

A. Page initialization

Initialize all required event listeners after DOM loading.

B. Document selection

When files are selected:

- Read the selected files.
- Display selected filenames.
- Display useful file information.
- Update the selected-files area.
- Handle zero selected files gracefully.

C. File presentation

Ensure filenames and file information are safely rendered.

Do not inject untrusted filenames directly as executable HTML.

D. Form loading state

When the AI form is submitted:

- Show Thinking...
- Hide or replace the normal Ask AI label appropriately.
- Prevent confusing duplicate submission states.
- Keep the button visually consistent.

E. Loading restoration

When processing ends or the page returns to its normal state:

- Restore Ask AI.
- Restore the normal button appearance.

F. Frontend states

Support:

- Loading
- Empty file selection
- Selected files
- Error presentation

Do not implement actual AI processing.

Do not invent backend APIs.

Do not implement database logic.

Do not modify business rules.

=========================================================
19. CSS COMPLETENESS
=========================================================

The ai.css file must be production-ready on the first pass.

It must include styling for:

- Page header
- Error message
- Composer
- Composer header
- Form groups
- Labels
- Prompt field
- Textareas
- Inputs
- Focus states
- Placeholder states
- Field errors
- AI response
- Generated status
- Response scrolling
- Document section
- Upload area
- Upload icon
- Selected files
- Submit button
- Loading state
- Disabled state
- Mobile layout
- Tablet layout
- Desktop layout
- Very small phone layout
- Reduced-motion preference

Do not leave obvious styling gaps that require later patching.

=========================================================
20. COMMON CSS RELATIONSHIP
=========================================================

activity_common.css already provides the shared activity-page
foundation.

ai.css must provide only AI Activity-specific styling.

Do not unnecessarily duplicate the application's global
navigation or common activity layout.

=========================================================
21. FINAL QUALITY STANDARD
=========================================================

The finished page should look like a real DevForge product
feature rather than a basic Django form.

A user should immediately understand:

- Where to ask AI.
- Where the response appears.
- Where to attach documents.
- Which files have been selected.
- When AI is processing.
- What the primary action is.
- When something has gone wrong.

The final implementation must be:

- Professional
- Modern
- Responsive
- Accessible
- Consistent with DevForge
- Comfortable on mobile
- Comfortable on desktop
- Complete without CSS patchwork

Generate the complete HTML, CSS, and JavaScript implementation.