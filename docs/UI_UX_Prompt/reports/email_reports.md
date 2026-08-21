DEVFORGE — EMAIL REPORTS FRONTEND IMPLEMENTATION
=================================================

Build the Email Reports page for the DevForge Django application.

Use the following JSON response as the backend data contract and build
the HTML, CSS, and JavaScript required to display it professionally.

-------------------------------------------------------
SAMPLE JSON RESPONSE
-------------------------------------------------------

{
  "id": 101,
  "to": [
    "rahul@example.com",
    "team@example.com"
  ],
  "cc": [
    "manager@example.com"
  ],
  "bcc": [],
  "subject": "Project status update",
  "body": "The project implementation has been completed successfully.\nPlease review the attached files.",
  "status": "sent",
  "created_at": "2026-08-21T09:42:15+05:30",
  "updated_at": "2026-08-21T09:45:02+05:30",
  "files": [
    {
      "id": 501,
      "name": "project-status.pdf",
      "size": 245760,
      "content_type": "application/pdf",
      "url": "/media/email/project-status.pdf"
    },
    {
      "id": 502,
      "name": "implementation-notes.docx",
      "size": 98304,
      "content_type": "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      "url": "/media/email/implementation-notes.docx"
    }
  ]
}

-------------------------------------------------------
DJANGO TEMPLATE
-------------------------------------------------------

Create:

templates/reports/email.html

The template must extend:

base.html

Load:

static

Use the existing DevForge navigation component.

Use these selectors exactly:

#email-report-page
#email-report-container
#email-report-header
#email-report-eyebrow
#email-report-description
#email-report-content
#email-report-loading
#email-report-pagination


-------------------------------------------------------
PAGE HEADER
-------------------------------------------------------

Create a professional report header:

Eyebrow:
Communication

H1:
Email Activity

Description:
Review your email activity, recipients, message content, and attached files.

The H1 must use the existing DevForge visual language:

- Space Grotesk
- animated gradient
- Ember/orange
- Cyan/spark
- Violet

Animation should be subtle and smooth.

Respect:

prefers-reduced-motion


-------------------------------------------------------
EMAIL REPORT CARD
-------------------------------------------------------

Create a report card for the email object.

Use:

.email-report-card

The card should contain:

.email-report-header

.email-report-details

.email-report-body

.email-report-files

.email-report-attachments

.email-report-file


-------------------------------------------------------
REPORT HEADER
-------------------------------------------------------

Display:

subject

and:

status

Example:

Project status update                         Sent

Use:

.email-report-status

for the status indicator.

The status must come from the JSON response.


-------------------------------------------------------
EMAIL DETAILS
-------------------------------------------------------

Display these JSON fields:

to
cc
bcc
created_at
updated_at

Use a clean metadata layout.

Example:

TO
rahul@example.com
team@example.com

CC
manager@example.com

BCC
No recipients

CREATED
21 Aug 2026, 09:42 AM

UPDATED
21 Aug 2026, 09:45 AM


Do not display recipient arrays as raw JSON.

Multiple recipients must be displayed individually or in a readable
formatted form.

If an array is empty, display:

No recipients


-------------------------------------------------------
MESSAGE BODY
-------------------------------------------------------

Display:

body

in a dedicated message/content section.

Preserve line breaks.

Long content must wrap safely.

Do not allow the message body to create horizontal page scrolling.


-------------------------------------------------------
ATTACHMENTS
-------------------------------------------------------

Display the files array in an attachment section.

Use:

.email-report-files
.email-report-attachments
.email-report-file

For every file display:

name
size
content_type
url

Example:

Attachments

project-status.pdf
240 KB
application/pdf
Open file

Convert the raw byte size into a human-readable format.

For example:

245760 → 240 KB

The URL should be presented as a usable file action/link.

If:

files: []

do not display an empty attachment section.


-------------------------------------------------------
RESPONSIVE DESIGN
-------------------------------------------------------

The page must work across all device sizes.

Support:

<= 320px
321–360px
361–480px
481–600px
601–768px
769–900px
901–1200px
1201–1440px
1441–1920px
> 1920px


Metadata layout:

Desktop:
3 columns

Tablet:
2 columns

Mobile:
1 column


Use flexible CSS.

Prefer:

minmax()
clamp()
grid
flexbox

Avoid unnecessary fixed widths.


-------------------------------------------------------
VERY SMALL DEVICES
-------------------------------------------------------

At <= 360px:

- metadata becomes one column
- subject/status stack vertically
- email addresses wrap
- filenames wrap
- message content wraps
- attachments stack
- pagination remains usable
- no horizontal overflow


-------------------------------------------------------
CSS
-------------------------------------------------------

Create:

static/css/reports/email.css

Use the existing DevForge design tokens from base.css.

Do not unnecessarily duplicate global styles.

Use these existing selectors:

.email-report-card
.email-report-header
.email-report-status
.email-report-details
.email-report-files
.email-report-attachments
.email-report-file

The page-specific CSS should work together with the existing
reports_common.css.

Do not break the shared report-card system.


-------------------------------------------------------
JAVASCRIPT
-------------------------------------------------------

Create:

static/js/reports/email.js

The JavaScript must:

1. Fetch the Email Reports API.
2. Handle loading.
3. Parse the JSON response.
4. Render the email report.
5. Render subject.
6. Render status.
7. Render To.
8. Render CC.
9. Render BCC.
10. Render created_at.
11. Render updated_at.
12. Render body.
13. Render files.
14. Format timestamps.
15. Format file sizes.
16. Handle empty recipient arrays.
17. Handle empty files arrays.
18. Handle API errors.
19. Handle empty results.


-------------------------------------------------------
SAFETY
-------------------------------------------------------

Dynamic API values must be inserted safely.

Do not execute API-provided HTML or JavaScript.

Treat body content as text unless the backend explicitly provides trusted,
sanitized HTML.


-------------------------------------------------------
DESIGN
-------------------------------------------------------

The final page should look like a polished DevForge report page.

Use:

- dark surfaces
- subtle borders
- comfortable spacing
- clear metadata hierarchy
- Ember/Cyan/Violet identity
- subtle motion
- responsive cards

Avoid:

- excessive gradients
- excessive animation
- cramped information
- giant cards
- unnecessary icons
- horizontal scrolling
- generic Bootstrap-looking UI


-------------------------------------------------------
FINAL REQUIREMENT
-------------------------------------------------------

Build the complete:

1. email.html
2. email.css
3. email.js

using the sample JSON above as the data structure.

Every JSON field must have an appropriate place in the UI:

id
to
cc
bcc
subject
body
status
created_at
updated_at
files

Do not invent additional backend fields.