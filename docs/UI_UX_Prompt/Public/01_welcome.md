DEVFORGE PUBLIC WELCOME PAGE — COMPLETE GENERATION SPECIFICATION

Generate the complete DevForge public welcome/authentication entry page from this specification alone.

Do not assume access to any existing HTML, CSS or JavaScript.
Do not ask questions.
Generate the required files directly.

==================================================
FILES
==================================================

Generate:

templates/public/welcome.html
static/css/public/welcome.css

No JavaScript is required.

==================================================
DJANGO CONTRACT
==================================================

This is a standalone public page.

The template must load Django static files.

The template must load Django socialaccount functionality.

Google authentication is provided by Django Allauth.

The Google login form must:

- use the Django Allauth Google provider URL
- use the provider name `google`
- submit using POST
- include Django CSRF protection
- use a submit button

Do not replace the Allauth provider URL with a hardcoded authentication URL.

Do not implement authentication through JavaScript.

==================================================
PAGE STRUCTURE
==================================================

Create a full-screen public welcome experience containing:

1. Main welcome page
2. Atmospheric background layer
3. Centered welcome container
4. DevForge brand identity
5. Brand mark
6. Product eyebrow
7. Main welcome heading
8. Tagline
9. Product description
10. Authentication card
11. Authentication explanation
12. Google sign-in action
13. Security/authentication note

Required selectors:

.welcome-page
.welcome-container
.welcome-content
.welcome-atmosphere
.welcome-orb
.welcome-orb-one
.welcome-orb-two
.welcome-brand
.welcome-mark
.welcome-brand-name
.welcome-eyebrow
.welcome-heading
.welcome-tagline
.welcome-description
.login-section
.login-copy
.google-login-form
.google-login-button
.google-icon
.login-arrow
.login-note

==================================================
UI CONTENT
==================================================

Brand:

DevForge

Brand mark:

DF

Eyebrow:

YOUR DEVELOPMENT WORKSPACE

Main heading:

Welcome to DevForge

Tagline:

Build. Explore. Learn.

Description should communicate that DevForge provides one focused place for exploring:

- development
- technology
- tools
- practical projects
- learning

Authentication heading should communicate:

Ready to get started?

Authentication description should tell the user that they can securely continue with their Google account.

Button text:

Continue with Google

Supporting note:

Secure authentication powered by Google

The wording should feel like a polished software product.

Avoid generic "Login" page language.

==================================================
GLOBAL DEVFORGE VISUAL SYSTEM
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

Standard border:

rgba(255, 255, 255, 0.08)

==================================================
TYPOGRAPHY
==================================================

Use:

Space Grotesk for:

- brand
- main heading
- important display text

Inter for:

- descriptions
- authentication interface
- supporting text
- button interface

==================================================
VISUAL CHARACTER
==================================================

The page should feel:

- premium
- modern
- technical
- trustworthy
- minimal
- polished
- product-oriented

It should resemble a production SaaS/developer platform rather than a basic Django authentication page.

==================================================
BRAND
==================================================

Create a compact DF brand mark next to the DevForge wordmark.

The mark should use:

- rounded corners
- subtle border
- translucent surface
- restrained Spark glow

The DevForge wordmark should use an Ember → Spark gradient.

==================================================
MAIN HEADING
==================================================

Use a large responsive heading.

Apply a restrained gradient treatment transitioning from:

primary text

toward:

Ember

and:

Spark

Maintain strong readability.

==================================================
AUTHENTICATION CARD
==================================================

Create a premium authentication surface.

Characteristics:

- dark translucent background
- subtle Ember/Spark atmospheric gradient
- low-opacity border
- rounded corners
- restrained shadow
- backdrop blur where supported

The card should visually separate authentication from the marketing/welcome content.

==================================================
GOOGLE BUTTON
==================================================

Create a prominent full-width Google authentication button.

Characteristics:

- light Google-style surface
- dark readable text
- rounded corners
- Google identity indicator
- right-side directional arrow

Hover:

- slight upward movement
- brighter surface
- restrained shadow
- subtle Spark atmosphere

Active:

- return toward original position

Focus:

- clear Spark outline

Do not use JavaScript.

==================================================
ATMOSPHERE
==================================================

Create two large, extremely subtle blurred background orbs.

One uses Ember.

One uses Spark.

They should move slowly using CSS.

Keep opacity low enough that they never compete with content.

==================================================
ANIMATION
==================================================

CSS ONLY.

Use:

cubic-bezier(0.22, 1, 0.36, 1)

Allowed animations:

- page entrance
- authentication card entrance
- brand gradient movement
- brand mark pulse
- atmospheric orb drift
- Google button micro-interaction
- arrow movement on hover

Animation must be restrained.

No:

- bouncing
- flashing
- excessive scaling
- rapid movement
- JavaScript animation

==================================================
RESPONSIVE DESIGN
==================================================

The page must work correctly on:

- very small phones
- phones
- tablets
- laptops
- desktops
- large monitors
- ultra-wide displays

Use fluid sizing first.

Use:

clamp()
min()
max()

Meaningful ranges may include:

360px
480px
768px
1024px
1440px+

On small screens:

- reduce outer spacing
- reduce heading size proportionally
- keep the authentication card within the viewport
- maintain readable text
- preserve comfortable touch targets

On large screens:

- maintain a controlled maximum content width
- prevent excessive text line length
- preserve visual focus around the central content

Never create horizontal overflow.

==================================================
ACCESSIBILITY
==================================================

Use semantic HTML.

The authentication action must be keyboard accessible.

Provide:

- visible focus-visible state
- readable contrast
- appropriate button semantics
- accessible decorative elements
- reduced-motion support

Support:

prefers-reduced-motion: reduce

==================================================
JAVASCRIPT
==================================================

Do not create JavaScript for this page.

Django Allauth handles authentication.

CSS handles all:

- styling
- animation
- hover
- focus
- transitions
- visual effects
- responsive behavior

==================================================
REPRODUCIBILITY
==================================================

Another AI must be able to generate the complete welcome.html and welcome.css from this specification alone.

The result must preserve the Django Allauth Google authentication contract and visually belong to the same DevForge product as the loading, base, navigation and footer components.