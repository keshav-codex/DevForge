DEVFORGE FOOTER — COMPLETE GENERATION SPECIFICATION

Generate the complete DevForge footer from this specification alone.

Do not assume access to existing HTML, CSS or JavaScript.
Do not ask questions.
Generate the required files directly.

==================================================
FILES
==================================================

Generate:

templates/components/footer.html
static/css/components/footer.css

JavaScript is not required.

==================================================
COMPONENT STRUCTURE
==================================================

Create a semantic footer with these required selectors:

.main-footer
.footer-container
.footer-brand
.footer-contact
.footer-link
.footer-social
.footer-social-title
.footer-social-links
.footer-social-link
.footer-social-icon
.footer-copyright

Organize the footer into:

1. Brand/about area
2. Contact area
3. Social/profile area
4. Copyright area

==================================================
BRAND CONTENT
==================================================

Brand:
DevForge

Description:
A personal development and productivity platform.

==================================================
CONTACT CONTENT
==================================================

Provide contact links for:

Mobile:
9667131795

Email:
kjkeshav0698@gmail.com

Portfolio:
https://keshav-codex.github.io/Portfolio/

The portfolio should open in a new tab with appropriate security attributes.

==================================================
SOCIAL CONTENT
==================================================

Social platforms:

LinkedIn
GitHub
HackerRank
LeetCode
Instagram

Every social item must use:

.footer-social-link

and a platform identifier through:

data-platform

Required identifiers:

linkedin
github
hackerrank
leetcode
instagram

Use inline SVG icons with the `.footer-social-icon` selector.

The icons are decorative and should use appropriate accessibility treatment.

Social destination URLs may remain placeholders until real profile URLs are supplied.

==================================================
COPYRIGHT
==================================================

Display:

© 2026 DevForge. All rights reserved.

==================================================
VISUAL DESIGN
==================================================

The footer must feel like a continuation of the DevForge navigation.

Use:

- dark premium surface
- subtle separation from content
- restrained Ember → Spark accent
- low-opacity borders
- spacious layout
- strong visual hierarchy
- readable muted text

Brand heading:

- Space Grotesk
- strong weight
- Ember → Spark gradient

Body:

- Inter
- muted text

==================================================
CONTACT LINKS
==================================================

Normal:

- muted
- clean
- understated

Hover:

- brighter
- subtle accent
- underline reveal
- small horizontal movement

==================================================
SOCIAL LINKS
==================================================

Normal:

- subtle surface
- low-opacity border
- muted icon/text

Hover:

- slight lift
- small icon movement
- controlled glow
- platform-specific accent

Platform accents:

LinkedIn:
#0A66C2

GitHub:
#24292f

HackerRank:
#00A162

LeetCode:
#FFA116

Instagram:
#E1306C

These colors are only used to identify platforms on interaction.

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

Desktop should use a flexible multi-area layout.

Smaller screens should progressively collapse into a vertical layout.

Social items must wrap naturally.

Use fluid spacing and typography.

Use meaningful ranges around:

360px
480px
768px
1024px

Large displays must use sensible maximum content widths.

Never create horizontal overflow.

==================================================
ANIMATION
==================================================

CSS ONLY.

Allowed:

- subtle entrance
- gradient accent movement
- brand gradient movement
- link underline reveal
- social lift
- icon micro-movement
- restrained glow

Use:

cubic-bezier(0.22, 1, 0.36, 1)

Default duration:

0.35s

No JavaScript styling or animation.

==================================================
ACCESSIBILITY
==================================================

Support:

- semantic footer
- keyboard navigation
- visible focus-visible states
- sufficient contrast
- decorative SVG accessibility
- reduced-motion preference

Support:

prefers-reduced-motion: reduce

==================================================
DESIGN SYSTEM
==================================================

Background:
#12141c

Surface:
#1a1d27

Borders:
rgba(255, 255, 255, 0.05)
rgba(255, 255, 255, 0.08)

Ember:
#ffa35c
#ff7a45
#ff5b2e

Spark:
#6fe3ff
#4fd1ff

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

The footer must be independently reproducible from this specification.

It must share the same visual language as the navigation, base and every future DevForge section.