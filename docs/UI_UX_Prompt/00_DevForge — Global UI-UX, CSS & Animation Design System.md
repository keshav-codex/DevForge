# DevForge — Global UI/UX, CSS & Animation Design System

## 1. Purpose

Use this document as the global visual and interaction specification for the DevForge application.

Every page and component must look like it belongs to the same product.

The implementation must prioritize:

1. Consistency
2. Reusability
3. Responsive design
4. Accessibility
5. Subtle premium interaction
6. CSS-only styling and animation
7. No unnecessary visual complexity

---

## 2. Technology Responsibility

### HTML

HTML is responsible for:

- Page structure
- Semantic structure
- Django template inheritance
- Django template tags
- Django context variables
- Forms
- Links
- Buttons
- User-facing text
- Accessibility attributes
- IDs/classes required by JavaScript

Never rename or remove backend-connected Django variables, URL names, form fields, IDs, data attributes, or template structures unless explicitly instructed.

### CSS

CSS is responsible for **all visual presentation and animation**.

CSS must control:

- Colors
- Typography
- Layout
- Spacing
- Responsive behavior
- Hover effects
- Focus effects
- Transitions
- Keyframe animations
- Shadows
- Gradients
- Glow
- Visual state changes

### JavaScript

JavaScript is responsible only for:

- API communication
- Backend data
- Variables
- Event handling
- DOM data updates
- Application logic
- Form/API processing
- Functional state changes

JavaScript must **never be used to implement styling or animation**.

Do not use JavaScript to directly set colors, dimensions, transforms, shadows, animation properties, transitions, or visual effects.

If JavaScript needs to communicate a visual state, it may toggle a semantic class or attribute. CSS must define the resulting appearance.

---

# 3. Global Color System

Use these colors consistently throughout DevForge.

## Backgrounds

- Primary background: `#12141c`
- Surface: `#1a1d27`
- Soft border: `rgba(255, 255, 255, 0.05)`
- Standard border: `rgba(255, 255, 255, 0.08)`

## Ember Accent

- Ember 400: `#ffa35c`
- Ember 500: `#ff7a45`
- Ember 600: `#ff5b2e`

Use ember for primary actions, warm highlights, important accents and brand emphasis.

## Spark Accent

- Spark 400: `#6fe3ff`
- Spark 500: `#4fd1ff`

Use spark as the cool counterpoint to ember.

## Danger

- Danger 500: `#ff4d6d`
- Danger 600: `#ff2f56`

Use for destructive actions, logout, warnings and error states.

## Text

- Primary: `#f5f6fa`
- Muted: `#9aa0ae`
- Dim: `#6b7080`

Do not introduce unrelated colors without a strong functional reason.

---

# 4. Typography

### Display / headings

Use:

`Space Grotesk`

Recommended weights:

- 500
- 600
- 700

### Body / interface

Use:

`Inter`

Recommended weights:

- 400
- 500
- 600

Typography should have a clear hierarchy.

Headings should feel technical, modern and confident.

Body text should remain highly readable.

Avoid excessive font sizes, excessive letter spacing and decorative typography.

---

# 5. Shape System

Use:

- Small radius: `8px`
- Medium radius: `14px`
- Pill radius: `999px`

Use rounded corners deliberately.

Do not make every element excessively rounded.

Buttons, badges and compact controls may use pill styling where appropriate.

---

# 6. Motion System

Global easing:

`cubic-bezier(0.22, 1, 0.36, 1)`

Default duration:

`0.35s`

Animations should feel:

- Smooth
- Fast enough to feel responsive
- Premium
- Controlled
- Purposeful

Avoid:

- Excessive bouncing
- Continuous large movements
- Flashing
- Distracting rotations
- Long decorative animations
- Animation on every element

---

# 7. Approved Animation Patterns

### Micro movement

Use subtle:

```text
translateY(-1px)
translateY(-2px)
translateY(-4px)
```

for hover interactions.

### Gradient movement

Use animated gradients for:

- Brand accents
- Decorative borders
- Small accent rules
- Premium visual highlights

### Underline reveal

Links may use a pseudo-element that:

- starts at scaleX(0)
- expands to scaleX(1)
- originates from center or edge

### Glow

Use restrained:

- text-shadow
- box-shadow
- gradient glow

Glow must remain subtle.

### Button sweep

Buttons may use a pseudo-element that sweeps a gradient across the button on hover.

### Icon micro-interaction

Icons may:

- scale slightly
- translate slightly
- rotate a few degrees

Do not combine excessive transformations.

---

# 8. Hover Rules

Interactive elements must provide clear feedback.

Preferred effects:

- Color transition
- Border transition
- Small translation
- Shadow/glow
- Underline reveal
- Background gradient
- Small icon movement

Avoid aggressive scaling.

Default hover scale should generally remain around:

`1.00–1.03`

---

# 9. Focus Accessibility

Every keyboard-accessible interactive element must have a visible `:focus-visible` state.

Do not remove outlines without replacing them with an accessible visual indicator.

Use the Spark palette or another appropriate high-contrast focus treatment.

---

# 10. Responsive Design

Every component must work from very small devices to ultra-wide screens.

Design for:

- Very small phones
- Small phones
- Large phones
- Tablets
- Small laptops
- Desktop
- Large desktop
- Ultra-wide monitors

Prefer fluid CSS:

- `clamp()`
- `%`
- `min()`
- `max()`
- `minmax()`
- flexible grids
- flexible gaps

Avoid unnecessary fixed widths.

Content must never unintentionally overflow horizontally.

Large screens must not produce excessively stretched layouts. Use sensible `max-width` containers.

---

# 11. Component Reuse

Prefer reusable CSS classes over page-specific duplication.

If several pages share:

- Cards
- Buttons
- Headers
- Filters
- Tables
- Badges
- Forms
- Empty states
- Stat blocks

create reusable styles wherever practical.

Section-specific CSS should extend the global design system rather than creating a new visual language.

---

# 12. Glass / Surface Treatment

Use the DevForge dark surfaces consistently.

Where appropriate:

```text
rgba(18, 20, 28, 0.85)
```

with:

```text
backdrop-filter: blur(...)
```

Use glass effects selectively.

Do not turn every component into glassmorphism.

---

# 13. Borders and Shadows

Borders should generally use low-opacity white values.

Preferred:

```text
rgba(255, 255, 255, 0.05)
rgba(255, 255, 255, 0.08)
```

Shadows should create depth without looking heavy.

Use accent-colored shadows only for interactive or highlighted elements.

---

# 14. Gradients

Primary DevForge gradient direction:

Ember → Spark

Typical gradient:

```text
linear-gradient(90deg, #ff7a45, #4fd1ff)
```

Warm gradient:

```text
linear-gradient(100deg, #ffa35c, #ff7a45, #ff5b2e)
```

Use gradients as accents rather than covering the entire interface.

---

# 15. User Experience

The interface should communicate hierarchy immediately.

Users should quickly understand:

- Where they are
- What the page does
- What information matters
- What action is primary
- What action is destructive
- What information is secondary

Avoid decorative UI that does not provide value.

Use meaningful UI text rather than generic labels where appropriate.

---

# 16. Accessibility

Support:

- Keyboard navigation
- Visible focus states
- Sufficient text contrast
- Semantic HTML
- Appropriate ARIA attributes where required
- Reduced motion preferences

Include:

```css
@media (prefers-reduced-motion: reduce)
```

and disable non-essential animation and transitions.

---

# 17. CSS Quality Rules

CSS must:

- Use clear section comments
- Use reusable variables
- Avoid unnecessary duplication
- Avoid `!important` unless genuinely necessary
- Keep selectors understandable
- Keep responsive rules organized
- Keep animation definitions close to their usage
- Avoid styling through JavaScript

The stylesheet should be production-quality rather than merely visually functional.

---

# 18. Reproducibility Requirement

Another AI agent using this specification must be able to reproduce the same visual language.

It must not invent:

- A new color palette
- A new typography system
- A different radius system
- A different animation philosophy
- A different shadow language
- A different responsive philosophy

New page-specific components must inherit the DevForge design system.

The result must visually feel like one coherent premium product.