DEVFORGE PUBLIC LOADING PAGE — COMPLETE GENERATION SPECIFICATION

Generate the complete DevForge public loading page from this specification alone.

Do not assume access to any existing HTML, CSS or JavaScript file.
Do not ask questions.
Generate the required files directly.

==================================================
FILES
==================================================

Generate:

templates/public/loading.html
static/css/public/loading.css
static/js/public/loading.js

==================================================
FUNCTIONAL CONTRACT
==================================================

This is a standalone public loading page.

It must load Django static assets.

The page must load:

public/loading.css
public/loading.js

The JavaScript must wait exactly 3 seconds and then redirect the browser to:

/welcome/

Do not change this destination.

JavaScript is functional only.

JavaScript must NOT control:

- colors
- styling
- animations
- transitions
- hover effects
- visual progress
- decorative effects

All visual behavior must be implemented exclusively with CSS.

==================================================
PAGE STRUCTURE
==================================================

Create a full-viewport loading experience containing:

1. Main loading page
2. Central loading content
3. DevForge brand identity
4. Brand mark
5. Product tagline
6. Loading status
7. Animated loading indicator
8. Animated progress indicator
9. Decorative atmospheric background elements

Required selectors:

.loading-page
.loading-content
.loading-brand
.brand-mark
.loading-tagline
.loading-status
.loading-spinner
.loading-status-text
.loading-dots
.loading-progress
.loading-progress-bar
.loading-atmosphere
.atmosphere-orb
.atmosphere-orb-one
.atmosphere-orb-two

Use IDs where appropriate for major page/content containers.

==================================================
UI CONTENT
==================================================

Brand:

DevForge

Brand mark:

DF

Tagline:

Learn. Build. Integrate. Deploy.

Loading status:

Preparing your workspace

The interface should feel like a real software product initialization screen.

Avoid generic browser-style loading language.

==================================================
GLOBAL VISUAL LANGUAGE
==================================================

Background:

#12141c

Surface:

#1a1d27

Primary text:

#f5f6fa

Muted text:

#9aa0ae

Dim text:

#6b7080

Ember:

#ffa35c
#ff7a45
#ff5b2e

Spark:

#6fe3ff
#4fd1ff

Borders:

rgba(255, 255, 255, 0.05)
rgba(255, 255, 255, 0.08)

==================================================
TYPOGRAPHY
==================================================

Use:

Space Grotesk for the DevForge brand.

Inter for tagline, status and interface text.

The brand should have strong visual hierarchy.

The tagline should remain understated.

==================================================
VISUAL CHARACTER
==================================================

The loading screen should feel:

- premium
- technical
- futuristic but restrained
- minimal
- polished
- product-oriented

Use a dark cinematic background with subtle Ember and Spark atmospheric lighting.

Do not make it look like a gaming splash screen.

Do not overload the screen with visual elements.

==================================================
BRAND
==================================================

Create a compact "DF" brand mark beside the DevForge wordmark.

The brand mark should have:

- subtle surface treatment
- rounded corners
- thin border
- restrained Spark glow

The DevForge wordmark should use an Ember → Spark gradient.

The gradient may animate slowly using CSS.

==================================================
LOADING STATUS
==================================================

Display:

Preparing your workspace

Include a small circular spinner.

The spinner must be CSS-only.

Include animated loading dots.

==================================================
PROGRESS INDICATOR
==================================================

Create a thin horizontal progress-style visual beneath the status.

It is decorative only.

It must not determine when navigation occurs.

The actual redirect timing is controlled exclusively by JavaScript.

Use an Ember → Spark gradient.

==================================================
ATMOSPHERIC BACKGROUND
==================================================

Add two subtle blurred atmospheric orbs.

One should use an Ember tone.

One should use a Spark tone.

They should move extremely slowly using CSS animation.

Keep opacity low.

They must never interfere with readability.

==================================================
ANIMATION
==================================================

CSS ONLY.

Use:

cubic-bezier(0.22, 1, 0.36, 1)

Animations may include:

- content entrance
- brand gradient movement
- brand mark pulse
- spinner rotation
- loading dot opacity
- progress sweep
- atmospheric orb drift

Animation must remain smooth and restrained.

Do not use JavaScript for any animation.

==================================================
RESPONSIVE DESIGN
==================================================

The loading page must work from:

- very small phones
- phones
- tablets
- laptops
- desktops
- large monitors
- ultra-wide displays

Use fluid sizing.

Use:

clamp()
min()
max()

Meaningful responsive ranges may include:

360px
480px
768px
1024px

The central content must remain visually centered.

The brand, tagline and loading status must remain readable at small widths.

Never create horizontal overflow.

==================================================
ACCESSIBILITY
==================================================

Use semantic HTML.

The loading status should be exposed appropriately to assistive technologies.

Decorative animation elements should be hidden from assistive technologies.

Provide readable contrast.

Support:

prefers-reduced-motion: reduce

When reduced motion is requested, disable or substantially reduce non-essential animations.

==================================================
JAVASCRIPT CONTRACT
==================================================

JavaScript has exactly one functional responsibility:

After 3 seconds, navigate to:

/welcome/

Do not add JavaScript for:

- animation
- CSS class toggling for visual effects
- progress animation
- hover effects
- responsive behavior
- colors
- layout

CSS is exclusively responsible for the visual experience.

==================================================
REPRODUCIBILITY
==================================================

Another AI must be able to generate the complete loading.html, loading.css and loading.js from this specification alone.

The generated result must preserve the 3-second redirect contract while reproducing the DevForge visual language used throughout the application.