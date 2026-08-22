DEVFORGE NAVIGATION — COMPLETE GENERATION SPECIFICATION

Generate the complete DevForge navigation component from this specification alone.

Do not assume access to existing HTML, CSS, or JavaScript.
Do not ask questions.
Generate the required files directly.

==================================================
FILES
==================================================

Generate:

templates/components/navigation.html
static/css/components/navigation.css

JavaScript is not required.

==================================================
COMPONENT
==================================================

Create a semantic top navigation using:

.main-navigation
.nav-logo
.nav-menu
.nav-link
.nav-logout-form
.nav-logout

Include:

1. DevForge logo
2. Dashboard
3. Activity
4. Reports
5. Analytics
6. Logout

==================================================
DJANGO CONTRACT
==================================================

Preserve these URL names exactly:

dashboard
activity
reports
analytics
account_logout

Logout must remain a POST form with:

{% csrf_token %}

Do not convert logout to a GET link.

==================================================
DESIGN
==================================================

Use the existing DevForge visual language:

- dark premium surface
- subtle transparency
- soft blur
- compact but comfortable spacing
- full-width top navigation
- subtle Ember → Spark bottom accent

Logo:

- Space Grotesk
- bold
- Ember → Spark gradient
- subtle gradient movement

Links:

Normal:
- muted text
- clean transparent surface

Hover:
- brighter text
- subtle upward movement
- gradient underline reveal
- restrained glow

Logout:

Use:

#ff4d6d
#ff2f56

Apply subtle danger emphasis, lift, gradient sweep, and controlled glow.

==================================================
RESPONSIVE
==================================================

Support:

360px
480px
768px
1024px
large desktop
ultra-wide

Use fluid spacing and sizing.

At smaller widths, the navigation must remain usable without causing page-level horizontal overflow.

Keep the existing selectors stable.

==================================================
ANIMATION
==================================================

CSS only.

Use:

cubic-bezier(0.22, 1, 0.36, 1)

Default duration:

0.35s

Allowed:

- logo gradient movement
- underline reveal
- subtle hover translation
- accent movement
- logout gradient sweep
- restrained glow

No aggressive scaling or excessive animation.

==================================================
ACCESSIBILITY
==================================================

Provide:

- semantic navigation
- keyboard accessibility
- visible :focus-visible states
- sufficient contrast
- reduced-motion support

Support:

@media (prefers-reduced-motion: reduce)

==================================================
DESIGN TOKENS
==================================================

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

Fonts:

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

Preserve all required selectors and Django URL names.

It must visually match the DevForge base, footer, and future components without introducing a separate design language.