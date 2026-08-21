Create the final production-ready `reports.css` for the DevForge Reports Dashboard.

Existing page:
`templates/reports/reports.html`

The page contains:

- DevForge Reports eyebrow
- Main heading: "Your activity, organized."
- Description explaining that users can explore email, location, and AI activity reports.
- "Explore your reports" section
- Three clickable report cards:
  1. Email Activity
  2. Location Activity
  3. AI Activity
- Footer note explaining that reports are generated from DevForge activity and are account-specific.

Existing navigation:
- Email card → `{% url 'email_report' %}`
- Map card → `{% url 'map_report' %}`
- AI card → `{% url 'ai_report' %}`

Existing important classes/IDs must remain compatible:
- `#reports-page`
- `#reports-container`
- `#reports-header`
- `#reports-header-content`
- `#reports-eyebrow`
- `#reports-title`
- `#reports-description`
- `#reports-overview`
- `#reports-overview-heading`
- `#reports-content`
- `.report-card`
- `.report-card-content`
- `.report-card-icon`
- `.report-card-text`
- `.report-card-category`
- `.report-card-action`
- `#reports-email-card`
- `#reports-map-card`
- `#reports-ai-card`
- `#reports-footer`

Important:
- Frontend only.
- Do not change backend logic.
- Do not create fake statistics.
- Do not add charts or metrics.
- Do not require new JavaScript.
- Do not change URLs.
- Do not change the meaning of the existing content.
- Work with `reports_common.css`.

Design direction:
Make the dashboard feel like the central Reports area of a professional product.

Header:
- Small professional eyebrow.
- Strong primary heading.
- Short readable supporting description.
- Clear spacing between header and report selection area.

Report cards:
- Three polished clickable cards.
- Desktop should comfortably support three cards in one row.
- Each card should have:
  - Icon area
  - Category
  - Report title
  - Concise description
  - Clear action area
  - Navigation arrow
- Entire card should feel clickable.
- Use subtle hover/focus interaction.
- Do not overuse animation.
- Keep card heights visually balanced.
- Maintain strong text hierarchy.
- Make long text wrap correctly.

The three cards should feel related but slightly distinguishable:
- Email → communication
- Location → geographic activity
- AI → intelligence

Do not introduce excessive colors. Use restrained accent treatment.

Footer:
- Keep it visually secondary.
- It should not compete with the cards.

Responsive behavior:
Use only:

1. Above 1200px:
   - Three cards in a balanced row.
   - Comfortable spacing.

2. 769px–1200px:
   - Responsive two-column layout where appropriate.
   - Remaining card should remain visually balanced.

3. 481px–768px:
   - Single-column cards or an extremely comfortable mobile/tablet arrangement.
   - Preserve readability.

4. 480px and below:
   - Single-column.
   - Compact but comfortable spacing.
   - No horizontal overflow.

Accessibility:
- Clear keyboard focus.
- Sufficient contrast.
- Do not rely only on hover.
- Respect `prefers-reduced-motion`.

Write the complete final `reports.css` from scratch.
Do not provide a patch.