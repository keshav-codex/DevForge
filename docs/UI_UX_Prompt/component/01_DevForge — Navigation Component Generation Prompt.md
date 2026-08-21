DEVFORGE NAVIGATION — COMPLETE GENERATION SPECIFICATION

Generate the complete DevForge navigation component from this specification alone.

Do not assume access to an existing HTML, CSS, or JavaScript file.
Do not ask questions.
Generate the required files directly.

==================================================
FILES
==================================================

Generate:

templates/components/navigation.html
static/css/components/navigation.css

No JavaScript is required for navigation styling or animation.

==================================================
COMPONENT STRUCTURE
==================================================

Create a semantic top-level navigation component.

Required selectors:

.main-navigation
.nav-logo
.nav-menu
.nav-link
.nav-logout-form
.nav-logout

The navigation must contain:

1. DevForge brand/logo
2. Dashboard navigation item
3. Activity navigation item
4. Reports navigation item
5. Analytics navigation item
6. Logout action

==================================================
DJANGO CONTRACT
==================================================

Preserve these Django URL names:

dashboard
activity
reports
analytics
account_logout

The logout action must remain a POST form.

The logout form must include Django CSRF protection.

Do not convert logout into a normal GET link.

Do not rename any required selector or Django URL name.

==================================================
UI TEXT
==================================================

Brand:
DevForge

Navigation labels:

Dashboard
Activity
Reports
Analytics
Logout

Keep the wording clear and product-oriented.

==================================================
VISUAL STRUCTURE
==================================================

The navigation should be:

- full width
- positioned at the top
- visually separated from page content
- dark and premium
- slightly translucent
- subtly blurred
- compact but comfortable
- suitable for a productivity/development platform

Use a restrained bottom accent based on the Ember → Spark gradient.

==================================================
LOGO
==================================================

The logo should:

- use Space Grotesk
- have strong visual weight
- use the Ember → Spark gradient
- have subtle gradient movement
- remain readable at every screen size

==================================================
NAVIGATION LINKS
==================================================

Normal state:

- muted/light text
- transparent background
- clean appearance

Hover state:

- brighter text
- subtle upward movement
- gradient underline reveal
- small Spark accent
- restrained glow

Focus state:

- clearly visible keyboard focus

Do not use aggressive scaling.

==================================================
LOGOUT
==================================================

Use the Danger palette:

#ff4d6d
#ff2f56

Normal state:

- subtle danger emphasis

Hover state:

- slight lift
- danger gradient sweep
- controlled glow
- smooth transition

==================================================
RESPONSIVE DESIGN
==================================================

Support:

- very small phones
- phones
- tablets
- laptops
- desktop
- large desktop
- ultra-wide

Use fluid sizing and spacing.

Use meaningful layout changes around:

360px
480px
768px
1024px

At very small widths, the menu may wrap or horizontally scroll within the navigation.

Do not require JavaScript for responsive behavior.

Never create horizontal overflow on the page.

==================================================
ANIMATION
==================================================

CSS ONLY.

Use:

cubic-bezier(0.22, 1, 0.36, 1)

Default duration:

0.35s

Allowed effects:

- logo gradient movement
- accent movement
- underline reveal
- subtle hover translation
- logout gradient sweep
- restrained glow

Do not use JavaScript for animation or styling.

==================================================
ACCESSIBILITY
==================================================

Provide:

- semantic navigation
- keyboard accessibility
- visible focus-visible state
- appropriate contrast
- reduced-motion support

Support:

prefers-reduced-motion: reduce

==================================================
DESIGN SYSTEM
==================================================

Use the DevForge global system:

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

Danger:
#ff4d6d
#ff2f56

Text:
#f5f6fa
#9aa0ae
#6b7080

Typography:

Space Grotesk
Inter

Radius:

8px
14px
999px

==================================================
REPRODUCIBILITY
==================================================

The navigation must be independently reproducible from this specification.

It must visually match every other DevForge component and must not introduce a separate design language.
