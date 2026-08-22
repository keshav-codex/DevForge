DEVFORGE FOOTER — COMPLETE GENERATION SPECIFICATION

Generate the complete DevForge footer from this specification alone.

Do not assume access to any existing HTML, CSS, or JavaScript.

Do not ask questions.

Generate the required files directly.

==================================================
1. FILES
==================================================

Generate exactly these files:

templates/components/footer.html
static/css/components/footer.css

JavaScript is NOT required.

The footer must be implemented using HTML and CSS only.


==================================================
2. COMPONENT STRUCTURE
==================================================

Create a semantic <footer> component.

Required selectors:

.main-footer
.footer-container
.footer-brand
.footer-contact
.footer-link
.footer-legal
.footer-support
.footer-social
.footer-social-title
.footer-social-links
.footer-social-link
.footer-social-icon
.footer-copyright

The footer must contain these five main visual areas:

1. Brand / About
2. Contact
3. Legal
4. Support
5. Social / Profiles

Copyright must appear as the final footer area.


==================================================
3. BRAND / ABOUT
==================================================

Brand name:

DevForge

Description:

A personal development and productivity platform.

Use:

.footer-brand

The DevForge brand heading must have strong visual hierarchy.

Use the DevForge Ember → Spark visual language for the brand.


==================================================
4. CONTACT
==================================================

Create a Contact section.

Required selector:

.footer-contact

Heading:

Contact

Include the following:

Mobile:
9667131795

Use:

<a href="tel:9667131795">

Email:
kjkeshav0698@gmail.com

Use:

<a href="mailto:kjkeshav0698@gmail.com">

Portfolio:
https://keshav-codex.github.io/Portfolio/

The Portfolio link must:

- open in a new tab
- use target="_blank"
- use rel="noopener noreferrer"

All contact links must use:

.footer-link


==================================================
5. LEGAL
==================================================

Create a Legal section.

Required selector:

.footer-legal

Heading:

Legal

Include:

Privacy Policy
Terms of Service

Use Django URL reversing.

Privacy Policy:

{% url 'privacy_policy' %}

Terms of Service:

{% url 'terms_of_service' %}

Do not hard-code these two URLs.

All links must use:

.footer-link


==================================================
6. SUPPORT
==================================================

Create a Support section.

Required selector:

.footer-support

Heading:

Support

Include:

Help Center
Contact Us
Report an Issue

Until real destinations are supplied, placeholder links may use:

href="#"

All links must use:

.footer-link


==================================================
7. SOCIAL / PROFILE SECTION
==================================================

Create a social/profile section.

Required selector:

.footer-social

Heading:

Find Me

Heading selector:

.footer-social-title

Social platforms:

1. LinkedIn
2. GitHub
3. HackerRank
4. LeetCode
5. Instagram

Every social item must use:

.footer-social-link

Every social item must contain a:

data-platform

attribute.

Required platform identifiers:

linkedin
github
hackerrank
leetcode
instagram

Example:

<a
    href="#"
    class="footer-social-link"
    data-platform="linkedin"
>

Real profile URLs may remain placeholders until supplied.


==================================================
8. SOCIAL SVG ICONS
==================================================

Every social platform must use an inline SVG icon.

Required selector:

.footer-social-icon

The SVG icons must be decorative.

Use:

aria-hidden="true"

The visible platform name must also be included as text.

Example structure:

<a
    href="#"
    class="footer-social-link"
    data-platform="github"
>

    <svg
        class="footer-social-icon"
        viewBox="0 0 24 24"
        fill="currentColor"
        aria-hidden="true"
    >
        ...
    </svg>

    <span>GitHub</span>

</a>

Do not rely on the icon alone to communicate the platform.


==================================================
9. COPYRIGHT
==================================================

Create:

.footer-copyright

Display exactly:

© 2026 DevForge. All rights reserved.

Copyright must visually separate itself from the main footer content using a subtle border or separator.


==================================================
10. DESKTOP LAYOUT
==================================================

The footer must use a flexible multi-column desktop layout.

At normal desktop widths, the five main sections should appear on the same row:

Brand | Contact | Legal | Support | Find Me

Do not intentionally force the Social section onto a second row.

Use flexible sizing rather than rigid fixed widths.

The footer must work correctly at:

1024px
1280px
1440px
1920px
2560px+

Large displays must use a sensible maximum content width.

The general structure should be:

Full-width footer
        ↓
Centered maximum-width container
        ↓
Five flexible columns


==================================================
11. RESPONSIVE DESIGN
==================================================

Support:

360px
480px
768px
1024px
1440px+

Never create horizontal overflow.

Desktop:

Show all footer sections normally.

Tablet:

Progressively reduce:

- spacing
- column gaps
- typography where necessary

while preserving readability.

Mobile:

Use a compact vertical layout.

The following sections should become compact mobile sections:

Contact
Legal
Support
Find Me

The mobile footer should prioritize:

- compact spacing
- clear hierarchy
- readable links
- controlled vertical height

The Brand section should remain visible.

The Copyright section should remain visible.

Do not allow the footer to become excessively tall on mobile.

JavaScript must NOT be required for basic footer usability.


==================================================
12. VISUAL DESIGN
==================================================

The footer must feel like a direct continuation of the DevForge navigation.

Use:

- dark premium surface
- subtle separation from page content
- restrained Ember → Spark accents
- low-opacity borders
- spacious layout
- strong visual hierarchy
- readable muted text
- professional developer-platform aesthetic

Do NOT use:

- pure black background
- cream colors
- bright white backgrounds
- excessive neon
- excessive glow
- cartoon styling
- heavy glassmorphism


==================================================
13. COLOR SYSTEM
==================================================

Use the following DevForge design system.

Background:

--df-bg-primary: #12141c;

Surface:

--df-bg-surface: #1a1d27;

Borders:

--df-border: rgba(255, 255, 255, 0.08);

--df-border-soft: rgba(255, 255, 255, 0.05);

Ember:

--df-ember-400: #ffa35c;

--df-ember-500: #ff7a45;

--df-ember-600: #ff5b2e;

Spark:

--df-spark-400: #6fe3ff;

--df-spark-500: #4fd1ff;

Text:

--df-text-primary: #f5f6fa;

--df-text-muted: #9aa0ae;

--df-text-dim: #6b7080;


==================================================
14. TYPOGRAPHY
==================================================

Display / headings:

Space Grotesk

Body:

Inter

The brand heading must use:

- Space Grotesk
- strong font weight
- Ember → Spark gradient
- professional visual hierarchy

Body text must use:

- Inter
- muted colors
- comfortable line height
- readable sizing


==================================================
15. CONTACT LINK INTERACTION
==================================================

Normal state:

- muted text
- clean appearance
- understated design

Hover state:

- brighter text
- subtle accent
- small horizontal movement
- underline reveal

The interaction should feel similar to:

Contact →

Movement must remain subtle and professional.


==================================================
16. SOCIAL LINK DESIGN
==================================================

Normal state:

- subtle surface
- low-opacity border
- muted icon
- muted text

Hover state:

- slight lift
- small icon movement
- controlled glow
- platform-specific accent

Use subtle transforms and shadows.

Do not create excessive neon effects.


==================================================
17. PLATFORM COLORS
==================================================

Platform-specific colors should primarily appear during interaction.

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

Normal social links should remain visually consistent with the DevForge theme.


==================================================
18. GRADIENT ANIMATION
==================================================

Use a restrained Ember → Spark animated accent.

Possible uses:

- brand text
- subtle footer accent
- decorative border/accent
- hover states

The animation must remain professional.

Do not animate the entire footer aggressively.

Use CSS only.


==================================================
19. ANIMATION SYSTEM
==================================================

Use:

cubic-bezier(0.22, 1, 0.36, 1)

Default duration:

0.35s

Allowed animations:

- subtle entrance
- gradient movement
- brand gradient movement
- link underline reveal
- social lift
- icon micro-movement
- restrained glow

Do NOT use:

- bouncing
- shaking
- rapid flashing
- excessive scaling
- large continuous movements


==================================================
20. ACCESSIBILITY
==================================================

The footer must provide:

- semantic <footer>
- semantic links
- keyboard navigation
- visible :focus-visible states
- sufficient text contrast
- accessible link text
- decorative SVG accessibility treatment
- reduced-motion support

Use:

:focus-visible

for keyboard focus.

Decorative SVG icons must use:

aria-hidden="true"


==================================================
21. REDUCED MOTION
==================================================

Implement:

@media (prefers-reduced-motion: reduce)

When reduced motion is enabled:

- disable gradient animation
- disable entrance animation
- minimize transform transitions
- preserve all functionality
- preserve visual hierarchy


==================================================
22. LAYOUT SAFETY
==================================================

The footer must:

- never cause horizontal overflow
- never exceed viewport width
- handle long email addresses safely
- handle long URLs safely
- handle narrow screens
- handle large screens
- use min-width: 0 where necessary
- allow text wrapping

For potentially long contact information, use:

overflow-wrap: anywhere;

where appropriate.


==================================================
23. FOOTER POSITIONING
==================================================

The footer must behave correctly inside a normal DevForge page layout.

The footer itself must NOT use:

position: fixed;

Do not allow the footer to:

- cover page content
- float over content
- appear randomly in the middle of the page
- create unnecessary black space

The footer should naturally appear after page content.

If a page has very little content, the overall page layout may use a sticky-footer structure so the footer rests near the bottom of the viewport.

Do not make the footer itself fixed.


==================================================
24. CSS SCOPING SAFETY
==================================================

footer.css must be carefully scoped.

Do NOT globally redefine:

html
body
a
h1
h2
h3
p
button
input
*
    
unless absolutely necessary.

Do not allow footer.css to interfere with:

- navigation
- page content
- forms
- legal pages
- dashboard
- reports
- analytics
- authentication pages

Prefer selectors such as:

.main-footer
.footer-container
.footer-brand
.footer-contact
.footer-legal
.footer-support
.footer-social
.footer-copyright

and their descendants.


==================================================
25. DESIGN CONSISTENCY
==================================================

The footer must visually belong to the same product as:

DevForge Navigation
DevForge Base
DevForge Public Pages
DevForge Dashboard
DevForge Reports
DevForge Analytics

Use the same:

- color system
- typography
- border language
- radius system
- animation curve
- spacing philosophy
- dark premium aesthetic


==================================================
26. CODE QUALITY
==================================================

Generated HTML and CSS must be:

- clean
- semantic
- readable
- maintainable
- production-oriented
- clearly structured
- appropriately commented
- free from unnecessary duplication

Do not generate artificial complexity merely to increase code length.

Do not remove required functionality to make the code shorter.


==================================================
27. FINAL REQUIRED FEATURES
==================================================

The final footer MUST contain:

Brand
Contact
Legal
Support
LinkedIn
GitHub
HackerRank
LeetCode
Instagram
Copyright

It MUST support:

Responsive design
Desktop five-column layout
Mobile compact layout
Hover effects
Focus-visible states
CSS animations
Gradient animation
Platform hover accents
Reduced-motion support
Overflow protection
Long-text protection
Sticky-footer compatibility
Independent CSS scoping
No JavaScript dependency


==================================================
28. OUTPUT REQUIREMENT
==================================================

Return the implementation as exactly two complete files:

FILE 1:

templates/components/footer.html

FILE 2:

static/css/components/footer.css

Do not omit any required section.

Do not provide pseudocode.

Do not provide partial code.

Do not replace required functionality with explanations.

The implementation must be directly copy-pasteable into the DevForge Django project.