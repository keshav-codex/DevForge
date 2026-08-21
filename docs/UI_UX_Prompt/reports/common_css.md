Create the final production-ready `reports_common.css` for the DevForge Reports section.

This is a shared stylesheet used by:

1. Reports Dashboard
2. AI Reports
3. Email Reports
4. Map Reports

Important:
- This is frontend UI work only.
- Do not modify backend business logic.
- Do not modify API behavior.
- Do not modify JavaScript.
- Do not introduce new data or fake metrics.
- Do not duplicate page-specific styling that belongs in `reports.css`, `ai.css`, `email.css`, or `map.css`.
- The stylesheet must work with the existing HTML and JavaScript exactly as provided.

Design goal:
Create a polished, professional, product-quality DevForge Reports visual system. It should feel like a real modern application rather than a basic Django template.

Shared design requirements:
- Dark professional application interface.
- Clear visual hierarchy.
- Excellent readability.
- Comfortable spacing.
- Consistent cards.
- Consistent borders, surfaces, typography, buttons, badges, messages, and pagination.
- Strong distinction between headings, body text, metadata, and secondary information.
- Long text must wrap safely.
- No horizontal overflow.
- Forms/data should remain readable on small screens.
- Good keyboard focus visibility.
- Good contrast between text and backgrounds.
- Avoid excessive visual effects.
- Use subtle interaction feedback.
- Keep the interface clean and professional.

Responsive system:
Use only these practical screen ranges:

1. Large desktop: above 1200px
2. Desktop/tablet: 769px–1200px
3. Mobile: 481px–768px
4. Small mobile: 480px and below

Do not create unnecessary breakpoints for individual phone sizes.

Shared components to style:
- Report page containers
- Report page headers
- Report content areas
- Shared cards
- Card titles
- Card descriptions
- Metadata
- Status badges
- Loading states
- Empty states
- Error states
- Attachment/file rows
- Pagination
- Pagination buttons
- Focus states
- Responsive spacing

Important architecture:
`reports_common.css` must contain only reusable Reports styling.

Do not put:
- Dashboard-specific card styling
- AI-specific styling
- Email-specific styling
- Map-specific styling

Those belong in their respective page CSS files.

Write the complete final CSS file from scratch.
Do not provide a patch.
Do not provide explanations inside the CSS.