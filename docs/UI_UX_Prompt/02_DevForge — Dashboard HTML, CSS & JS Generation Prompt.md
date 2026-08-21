
DEVFORGE DASHBOARD — COMPLETE GENERATION SPECIFICATION

Generate the complete DevForge dashboard page from this specification alone.

Do not assume access to existing HTML, CSS or JavaScript.
Do not ask questions.
Generate the required files directly.

==================================================
FILES
==================================================

Generate:

templates/dashboard.html
static/css/dashboard.css

The page inherits the global DevForge base template.

==================================================
DJANGO TEMPLATE CONTRACT
==================================================

The page must extend:

base.html

Use the title:

Dashboard | DevForge

Use the shared navigation component.

The authenticated Django user object is available.

Display the user's name using:

user.first_name

with fallback:

user.username

Use Django's `default` behavior so the username is displayed when the first name is unavailable.

Do not rename or replace the Django user object.

==================================================
PAGE STRUCTURE
==================================================

Create a semantic main dashboard page.

Required selectors:

#dashboard-page
.dashboard-page or .page
#dashboard-container
.page-container
#dashboard-header
.page-header
.page-eyebrow
.page-description
#dashboard-overview
.dashboard-overview
.dashboard-welcome
.section-eyebrow

The page should contain:

1. Dashboard header
2. Personalized user greeting
3. Short product-oriented description
4. Workspace overview section
5. Supporting explanation of available DevForge capabilities

==================================================
UI CONTENT
==================================================

The interface should communicate:

- the user is inside the DevForge workspace
- their workspace is ready
- they can manage activities
- they can review reports
- they can explore analytics
- email, map and AI activities are available

Use polished product-oriented language.

Avoid generic instructional wording such as "use the navigation menu".

The page should feel like a real productivity/development product rather than a basic Django learning project.

==================================================
HEADER
==================================================

Include:

Eyebrow:
DEVFORGE WORKSPACE

Personalized heading:

Welcome, followed by the authenticated user's first name, falling back to username.

Supporting text should communicate that the workspace provides access to activity, reports and insights.

Use strong visual hierarchy.

==================================================
OVERVIEW
==================================================

Include an overview surface containing:

Eyebrow:
WORKSPACE OVERVIEW

Heading conveying:

Everything in one workspace.

Supporting content should mention:

- email activity
- map activity
- AI activity
- generated reports
- analytics

Do not invent additional backend data.

==================================================
VISUAL DESIGN
==================================================

Use the global DevForge system.

Background:
#12141c

Surface:
#1a1d27

Ember:
#ffa35c
#ff7a45
#ff5b2e

Spark:
#6fe3ff
#4fd1ff

Primary text:
#f5f6fa

Muted:
#9aa0ae

Dim:
#6b7080

Typography:

Space Grotesk for headings

Inter for body/interface

==================================================
PAGE VISUAL LANGUAGE
==================================================

The dashboard should feel:

- premium
- technical
- clean
- spacious
- modern
- focused
- product-oriented

Use:

- subtle surface gradients
- low-opacity borders
- restrained shadows
- controlled glow
- Ember/Spark accents
- clear content hierarchy

Do not make the page visually noisy.

==================================================
DASHBOARD HEADER
==================================================

The header should have:

- subtle entrance animation
- large responsive heading
- readable supporting description
- restrained Ember/Spark gradient treatment

==================================================
OVERVIEW SURFACE
==================================================

Create a premium surface with:

- dark translucent background
- subtle gradient atmosphere
- low-opacity border
- restrained shadow
- Ember → Spark accent line
- subtle decorative glow

The decorative effects must not interfere with text readability.

==================================================
ANIMATION
==================================================

CSS ONLY.

Use:

cubic-bezier(0.22, 1, 0.36, 1)

Default duration:

0.35s

Allowed:

- header entrance
- overview entrance
- subtle accent movement
- restrained gradient/glow movement
- hover effects if interactive elements are introduced

Do not use JavaScript for animation or styling.

==================================================
RESPONSIVE DESIGN
==================================================

The dashboard must work correctly on:

- very small phones
- phones
- tablets
- laptops
- desktop
- large desktop
- ultra-wide displays

Use fluid CSS.

Meaningful responsive ranges may include:

360px
480px
768px
1024px
1440px+

Use:

clamp()
min()
max()
minmax()
flexible widths
sensible max-width containers

On large screens, prevent excessively wide text blocks.

On small screens:

- reduce spacing
- reduce typography proportionally
- maintain readable line lengths
- keep cards within viewport
- prevent horizontal overflow

==================================================
ACCESSIBILITY
==================================================

Use semantic HTML.

Maintain:

- readable contrast
- logical heading hierarchy
- keyboard focus where interactive elements exist
- reduced-motion support

Support:

prefers-reduced-motion: reduce

==================================================
JAVASCRIPT
==================================================

Do not add JavaScript for visual effects.

If future dashboard functionality requires JavaScript, it may handle:

- API requests
- backend data
- event handling
- DOM data rendering
- functional state

It must never control:

- colors
- animation
- transitions
- shadows
- hover styling
- decorative transforms

==================================================
REPRODUCIBILITY
==================================================

Another AI must be able to generate the dashboard HTML and CSS from this specification alone.

The generated dashboard must work with the stated Django template contract without requiring clarification or access to the original files.

It must visually belong to the same DevForge product as the base, navigation and footer.