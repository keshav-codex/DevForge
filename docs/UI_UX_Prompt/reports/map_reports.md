Create the final production-ready `map.css` for the DevForge Map Reports page.

Existing template:
`templates/reports/map.html`

Existing page structure:

- Map Reports page
- Header:
  - "Map Reports"
  - "View reports and insights generated from your map and location-related activity."
- Dynamic report content container
- Pagination container
- Existing JavaScript loads map reports from:
  `/reports/api/map/`

The existing `map.js` must NOT be changed.

The JavaScript dynamically creates:

- `.map-report-card`
- `.map-report-header`
- `.map-report-details`
- `.map-report-coordinates`
- `.map-report-dates`
- `.map-report-status`

Location data currently displayed:
- Place name
- Status
- Description
- Address
- Latitude
- Longitude
- Created date
- Updated date

Existing states:
- Loading
- API error
- No location activity
- Successful location report results
- Previous / Next pagination

Important:
- Frontend only.
- Do not modify `map.js`.
- Do not modify API URLs.
- Do not modify data fields.
- Do not modify pagination.
- Do not change backend business logic.
- Do not create fake map statistics.
- Work with `reports_common.css`.

Design goal:
Create a polished location/activity report interface that makes geographic information easy to scan.

Card hierarchy:
1. Place name should be the primary heading.
2. Status should be immediately visible but compact.
3. Description and address should be clearly readable.
4. Coordinates should appear as structured geographic metadata.
5. Created and updated timestamps should be secondary.

Map report header:
- Place name and status should align naturally on larger screens.
- Long place names must wrap safely.
- Status must never cause overflow.

Location details:
- Description should have comfortable reading space.
- Address should wrap safely.
- Do not allow long addresses to break the layout.

Coordinates:
- Clearly group Latitude and Longitude.
- Make them look like geographic metadata rather than plain paragraphs.
- Keep values readable.
- Do not introduce an interactive map because the current page does not provide map functionality.

Dates:
- Keep created and updated timestamps visually secondary.
- Maintain clean alignment on larger screens.

Responsive system:
Use only four ranges:

1. Above 1200px:
   - Spacious structured layout.
   - Details and metadata should use available width efficiently.

2. 769px–1200px:
   - Maintain structured information without crowding.

3. 481px–768px:
   - Stack location details where appropriate.
   - Preserve readable address and description widths.

4. 480px and below:
   - Fully mobile-friendly.
   - Stack header/status.
   - Stack details and dates.
   - No horizontal overflow.
   - Long addresses and place names must wrap safely.

Accessibility:
- Good contrast.
- Clear focus states for interactive elements.
- Respect reduced-motion preferences.

Write the complete final `map.css` from scratch.
Do not provide a patch.