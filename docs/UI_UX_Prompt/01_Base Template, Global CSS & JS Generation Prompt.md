DEVFORGE BASE — COMPLETE GENERATION SPECIFICATION

Generate the complete global foundation of the DevForge application from this specification alone.

Do not assume access to any existing HTML, CSS, or JavaScript files.
Do not ask questions.
Generate the required files directly.

==================================================
PURPOSE
==================================================

Create the global base template and global stylesheet used by the authenticated DevForge application.

Every future page must inherit this visual and structural foundation.

The implementation must establish a consistent premium dark product interface.

==================================================
FILES
==================================================

Generate:

templates/base.html
static/css/base.css

The base template may load the existing global JavaScript file:

static/js/base.js

JavaScript must never be responsible for styling or animation.

==================================================
DJANGO TEMPLATE CONTRACT
==================================================

The base template must:

- load Django static files
- provide a page title block named `title`
- provide a `navigation` block
- provide a `content` block
- provide an `extra_css` block
- provide an `extra_js` block
- include the shared `components/footer.html`
- load the global base stylesheet
- load the shared navigation stylesheet
- load the shared footer stylesheet
- preserve the Leaflet CDN stylesheet dependency

These names are part of the Django template contract and must not be renamed.

The default page title should be DevForge.

==================================================
GLOBAL DESIGN SYSTEM
==================================================

Primary background:
#12141c

Surface:
#1a1d27

Soft border:
rgba(255, 255, 255, 0.05)

Standard border:
rgba(255, 255, 255, 0.08)

Ember palette:
#ffa35c
#ff7a45
#ff5b2e

Spark palette:
#6fe3ff
#4fd1ff

Danger palette:
#ff4d6d
#ff2f56

Primary text:
#f5f6fa

Muted text:
#9aa0ae

Dim text:
#6b7080

==================================================
TYPOGRAPHY
==================================================

Display/headings:
Space Grotesk

Body/interface:
Inter

Headings should feel modern, technical and confident.

Body text must remain readable and comfortable.

==================================================
SHAPE SYSTEM
==================================================

Small radius:
8px

Medium radius:
14px

Pill:
999px

Use rounded corners deliberately.

==================================================
MOTION SYSTEM
==================================================

Primary easing:
cubic-bezier(0.22, 1, 0.36, 1)

Default transition duration:
0.35s

Animation must be:

- smooth
- subtle
- premium
- purposeful

Avoid excessive bouncing, flashing, rotation or continuous movement.

==================================================
BASE CSS RESPONSIBILITIES
==================================================

The global stylesheet must establish:

- CSS reset
- box sizing
- body foundation
- typography foundation
- link foundation
- image and media behavior
- form control foundation
- selection styling
- scrollbar styling
- focus-visible styling
- reusable container behavior
- reusable surface behavior
- responsive foundation
- reduced-motion support

Do not place navigation-specific or footer-specific styling inside base.css.

==================================================
RESPONSIVE DESIGN
==================================================

The entire application must work from very small phones through ultra-wide monitors.

Use fluid CSS as the primary strategy.

Use:

- clamp()
- min()
- max()
- minmax()
- flexible dimensions
- percentage-based layouts
- sensible max-width containers

Meaningful responsive ranges may include:

360px
480px
768px
1024px
1440px+

Do not rely on breakpoints alone.

Large screens must use maximum readable content widths instead of stretching content across the entire viewport.

Very small screens must not create horizontal page overflow.

==================================================
ACCESSIBILITY
==================================================

Provide:

- visible keyboard focus
- semantic foundation
- readable contrast
- sensible form focus states
- reduced-motion support

Use `:focus-visible`.

Support:

`prefers-reduced-motion: reduce`

Non-essential animation and transitions must be reduced or disabled.

==================================================
JAVASCRIPT RULE
==================================================

JavaScript is permitted only for functional behavior.

It may handle:

- application logic
- data
- events
- API communication
- DOM updates

It must never directly implement:

- colors
- animation
- transitions
- shadows
- hover effects
- decorative transforms
- visual styling

CSS controls all visual presentation.

==================================================
REPRODUCIBILITY
==================================================

Another AI must be able to generate the same base architecture and visual foundation using this prompt alone.

Do not invent a different color palette, typography system, radius system, motion system or responsive philosophy.