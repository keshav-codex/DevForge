Create the shared CSS foundation for the DevForge Activity section.

IMPORTANT:
You do NOT have access to the original HTML or any existing CSS.
Do not assume or recreate an unseen stylesheet.
Generate only the reusable common CSS rules described below.

PURPOSE:
This stylesheet is the shared visual foundation for:
- Activity Dashboard
- AI Activity
- Email Activity
- Map Activity

The page-specific styles will be supplied by separate CSS files.
Do NOT put page-specific layouts or component styling here.

FILE:
static/css/activity/activity-common.css


=========================================================
DESIGN SYSTEM
=========================================================

Create a dark, modern, premium developer-product interface.

Visual character:
- professional SaaS dashboard
- clean
- technical
- minimal but polished
- high information clarity
- subtle depth
- restrained futuristic feel
- no excessive gradients
- no excessive glowing effects
- no decorative animation that harms usability

Primary colors:

Background / application surfaces:
- #0f1117
- #141720
- #1a1d27

Primary text:
- #f5f7fb

Secondary text:
- #aeb5c2

Muted text:
- #7f8796

Primary accent:
- #4fd1ff

Accent hover/highlight:
- #78dcff

Error:
- #ff5b2e
- light error text approximately #ff9a78

Borders:
- subtle white transparency such as rgba(255,255,255,0.08)

Use transparent white overlays sparingly for depth.


=========================================================
TYPOGRAPHY
=========================================================

Use:
- "Space Grotesk" for major headings and card titles
- "Inter" for body text, labels, controls and supporting text

Headings should:
- have strong hierarchy
- use tight line-height
- use slightly negative letter spacing
- scale fluidly with clamp()

Body text should:
- remain highly readable
- use comfortable line-height
- use responsive font sizing where appropriate


=========================================================
COMMON PAGE STRUCTURE
=========================================================

Support the following reusable selectors:

.page
.page-container
.page-header
.page-header h1
.page-header p

.page:
- full available width
- minimum page height
- never create horizontal overflow

.page-container:
- centered
- fluid width
- responsive horizontal spacing
- use a sensible maximum width
- prevent excessive stretching on very large screens
- work from very small mobile screens through ultra-wide displays

Use modern CSS functions such as:
- min()
- max()
- clamp()
- calc()
where appropriate.


=========================================================
COMMON CARD FOUNDATION
=========================================================

Create a reusable .card foundation.

The common card should provide:
- dark surface
- subtle border
- rounded corners
- restrained shadow
- slight inset highlight
- consistent box sizing
- relative positioning

Do NOT define page-specific card dimensions,
grid structures, upload interfaces, email layouts,
map layouts, or AI layouts here.

Those belong to their respective page stylesheets.


=========================================================
COMMON CARD TYPOGRAPHY
=========================================================

Support:

.card-title
.card-description

.card-title:
- strong heading hierarchy
- primary text color
- Space Grotesk
- responsive sizing
- compact line height

.card-description:
- secondary text color
- Inter
- readable line height
- fluid sizing


=========================================================
COMMON MESSAGE STATES
=========================================================

Support:

.message
.message.error

Messages should:
- be visually separated from surrounding content
- use subtle borders
- use rounded corners
- use dark surfaces
- remain readable on small screens

Error messages should use the DevForge error palette
without becoming visually aggressive.


=========================================================
ACCESSIBILITY
=========================================================

Provide a consistent :focus-visible treatment for:
- links
- buttons
- cards
- inputs
- textareas
- selects

Use the DevForge cyan accent:
#4fd1ff

Focus indicators must be clearly visible without excessive glow.


=========================================================
RESPONSIVE REQUIREMENT
=========================================================

The stylesheet must support the full practical device range:

- very small phones around 320px
- 360px phones
- 390–480px phones
- large phones
- small tablets
- tablets
- 10–13 inch laptops
- standard desktop displays
- 1440px displays
- 1600px+ displays
- 1920px displays
- ultra-wide displays above 2200px

Do NOT design around only three breakpoints.

Prefer fluid CSS first.
Use media queries only when actual layout changes are necessary.

Prevent:
- horizontal scrolling
- excessively wide text blocks
- oversized typography
- stretched cards
- unusable spacing on tiny screens


=========================================================
LARGE SCREEN BEHAVIOR
=========================================================

Large displays must remain visually balanced.

Do not allow:
- unlimited content width
- excessively long text lines
- giant empty horizontal layouts

Use maximum content widths and fluid spacing.


=========================================================
MOTION
=========================================================

This stylesheet may provide only shared transition/focus behavior.

Animation rules:
- subtle
- fast enough to feel responsive
- approximately 200–350ms for normal interaction
- use ease or cubic-bezier timing
- never animate layout unnecessarily

Respect:

@media (prefers-reduced-motion: reduce)

Disable or greatly reduce non-essential transitions and animations
for users who request reduced motion.


=========================================================
STRICT RULES
=========================================================

CSS ONLY.

Do not use JavaScript for:
- styling
- animation
- responsive behavior
- hover effects
- transitions

Do not introduce:
- Bootstrap
- Tailwind
- external CSS frameworks
- page-specific selectors
- inline styles

The resulting stylesheet must be reusable by all four Activity pages.