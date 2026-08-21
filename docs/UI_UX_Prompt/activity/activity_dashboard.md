Create the frontend for the DevForge Activity Dashboard.

IMPORTANT:
You do NOT have access to the original HTML or CSS.
Generate the page from the specification below.
Do not assume an existing implementation.

OUTPUT:
Generate exactly:
1. Activity Dashboard HTML
2. Activity Dashboard CSS

FILE TARGETS:
templates/activity/activity.html
static/css/activity/activity.css


=========================================================
DJANGO TEMPLATE REQUIREMENTS
=========================================================

The page extends the project's main:

base.html

The page must load:
- activity-common.css
- activity.css

Use Django static template syntax for both stylesheets.

Include the existing navigation component through the project's
navigation template include.

Do not create a new navigation implementation.

The page title must be:

Activity | DevForge


=========================================================
BACKEND CONNECTIONS — MUST NOT CHANGE
=========================================================

Preserve these exact Django URL names:

email_activity
map_activity
ai_activity

The three activity cards must link to those URL names.

Do not introduce:
- new Django variables
- new context variables
- new API calls
- JavaScript
- backend logic
- form processing


=========================================================
PAGE STRUCTURE
=========================================================

Create:

main
→ activity page container
→ page header
→ activity card collection


Use these existing structural identifiers:

#activity-page
#activity-container
#activity-header
#activity-content

Preserve these existing card identifiers:

#activity-email-card
#activity-map-card
#activity-ai-card


=========================================================
PAGE HEADER
=========================================================

Create a premium product-style Activity header.

The visual hierarchy should communicate:

Eyebrow:
"DevForge Workspace"

Main heading:
"Activity Center"

Supporting text:
"Access your email, location, and AI activity from one workspace."

The header should feel like a real SaaS product dashboard rather than
a basic Django page.


=========================================================
ACTIVITY CARDS
=========================================================

Create three primary navigation cards.

CARD 1:
Email Activity

Category/eyebrow:
"Communication"

Description should communicate that users can review:
- email activity
- messages
- recipients
- attachments
- delivery information

Action:
"Open Email Activity"

Destination:
Django URL name email_activity


CARD 2:
Map Activity

Category:
"Location"

Description should communicate that users can explore:
- saved locations
- addresses
- coordinates
- location activity

Action:
"Open Map Activity"

Destination:
Django URL name map_activity


CARD 3:
AI Activity

Category:
"Intelligence"

Description should communicate that users can explore:
- AI interactions
- generated responses
- supporting documents

Action:
"Open AI Activity"

Destination:
Django URL name ai_activity


=========================================================
HTML CLASS REQUIREMENTS
=========================================================

Use the shared selectors:

.page
.page-container
.page-header
.card
.card-title
.card-description

Add Activity-specific selectors:

.activity-header-content
.activity-eyebrow
.activity-card
.activity-card-content
.activity-card-label
.card-action

Do not create unnecessary class names.

Keep semantic HTML:
- main
- header
- section
- article-like navigation cards where appropriate
- headings
- paragraphs
- links


=========================================================
VISUAL DESIGN
=========================================================

Follow the DevForge visual system:

Background:
#0f1117 / existing application background

Card:
#1a1d27

Primary text:
#f5f7fb

Secondary text:
#aeb5c2

Accent:
#4fd1ff

Accent highlight:
#78dcff

Borders:
subtle rgba(255,255,255,0.08)


The three cards should feel like premium interactive
product navigation rather than ordinary hyperlinks.


=========================================================
CARD LAYOUT
=========================================================

Desktop:
- three cards in one row when sufficient width exists

Medium screens:
- intelligently reduce to two columns when appropriate

Small screens:
- one card per row

Very small screens:
- cards must remain comfortable and readable
- no horizontal overflow


Do not rely only on fixed pixel widths.

Use:
- CSS Grid
- minmax()
- clamp()
- fluid spacing
where appropriate.


=========================================================
CARD INTERACTION
=========================================================

Cards must have subtle premium interaction.

On hover:
- slight upward movement
- subtle border enhancement
- slightly stronger surface contrast
- restrained cyan highlight
- action arrow moves slightly
- no excessive glow

Use approximately 200–350ms transitions.

On active:
- slightly reduced hover movement.

On keyboard focus:
- clearly visible cyan focus outline.


=========================================================
RESPONSIVE REQUIREMENT
=========================================================

Design for:

320px
360px
390px
480px
600px
768px
900px
1024px
1280px
1440px
1600px
1920px
2200px+

Use fluid sizing and targeted breakpoints.

The layout must remain polished on:
- phones
- tablets
- laptops
- desktops
- large monitors
- ultra-wide monitors


=========================================================
ANIMATION RESTRICTION
=========================================================

CSS handles ALL visual animation.

Do not use JavaScript.

No JS is required for this page.

Do not implement animation using:
- JavaScript
- DOM manipulation
- timers
- event listeners


=========================================================
CONTENT QUALITY
=========================================================

UI text should sound like a real professional product.

Avoid generic instructional wording such as:
"Click here"
"View and manage"

Prefer concise product-oriented language.

Do not expose technical Django/API terminology to the user.


=========================================================
STRICT BACKEND SAFETY
=========================================================

Do not change:
- Django inheritance
- Django URL names
- existing IDs
- navigation include
- template architecture

Frontend structure and UI text may be improved,
but backend connections must remain untouched.

Generate clean, production-quality HTML and CSS.