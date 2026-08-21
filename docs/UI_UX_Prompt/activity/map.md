Create the complete frontend for a DevForge Map Activity page from scratch.

Assume that no HTML, CSS, or JavaScript files exist. Do not rely on any existing implementation. The prompt itself must contain enough information to independently recreate the intended page accurately.

This is a frontend UI/UX implementation task. Do not implement backend business logic, database operations, API endpoints, Django views, models, serializers, or authentication logic.

=========================================================
1. PAGE IDENTITY
=========================================================

Application:
DevForge

Page:
Map Activity

Purpose:
Allow a user to save a meaningful place as either visited or planned, using a map, place search, address information, and optional AI assistance for creating a description.

Overall experience:
Professional developer-dashboard interface with a modern dark theme, strong readability, clear hierarchy, and practical form-based interaction.

=========================================================
2. FILES
=========================================================

Create:

HTML:
activity/map.html

CSS:
activity/map.css

JavaScript:
activity/map.js

The page extends the application's main base template.

The page-specific CSS should work together with the application's existing common activity styling.

=========================================================
3. PAGE STRUCTURE
=========================================================

Create the following structure:

Main page:
- Map Activity page
- Central page container

Page header:
- Main heading
- Supporting description

Location composer card:
- Composer heading
- Supporting explanation
- Location form

Form sections:

A. Place Name
- Text input
- Label
- Placeholder
- Validation-message area

B. Status
- Select field
- Default option
- Visited option
- Planned option

C. Description
- Description label
- AI Assist button beside the label
- Description textarea

D. AI Assistant panel
Initially hidden.

When displayed, contain:
- AI Assistant heading
- Short explanatory text
- Instruction label
- Instruction textarea
- Generate Description button
- AI response/status message area

E. Address
- Address label
- Read-only address textarea
- Placeholder explaining that the address comes from map selection

F. Coordinates
- Latitude hidden field
- Longitude hidden field

G. Map selection section
- Section heading: "Select Location"
- Supporting text explaining that the user can search for a place or click directly on the map
- Search input
- Search button
- Search status/message area
- Interactive map container

H. Final action
- Save Location button

=========================================================
4. EXACT HTML IDENTIFIERS
=========================================================

Use these identifiers so the HTML, CSS, and JavaScript remain clearly connected:

Main:
- location-activity-page
- location-activity-container
- location-activity-header

Composer:
- location-composer
- location-form

Place:
- location-place-name
- location-place-name-error

Status:
- location-status

Description:
- location-description
- location-description-label
- location-ai-button

AI:
- location-ai-panel
- location-ai-instruction
- location-ai-generate
- location-ai-message

Address:
- location-address

Coordinates:
- location-latitude
- location-longitude

Map:
- location-map-section
- location-search-input
- location-search-button
- location-search-message
- location-map

Use meaningful supporting classes such as:

- page
- page-container
- page-header
- card
- card-title
- location-composer-header
- location-helper-text
- location-form-row
- location-field-label
- form-control
- field-error
- location-description-header
- location-ai-panel
- location-ai-header
- location-ai-title
- location-ai-description
- location-ai-actions
- location-map-section
- location-map-header
- location-map-title
- location-map-description
- location-map-search
- location-search-message
- location-map
- location-form-actions
- primary-button

=========================================================
5. EXACT UI TEXT
=========================================================

Page heading:

Location Activity

Page description:

Save a meaningful place as visited or planned.

Composer heading:

Save Location

Composer description:

Search for a place or select a location directly from the map.

Place field:

Place Name

Placeholder:

Enter place name

Status:

Status

Default option:

Select status

Options:

Visited
Planned

Description:

Description

Description placeholder:

Add details about this place.

AI button:

AI Assist

AI panel:

AI Assistant

AI panel description:

Use the place name, status and your instruction to create or improve the description.

Instruction:

Instruction

Instruction placeholder:

Example: Write a short and meaningful description about why I want to visit this place.

AI action:

Generate Description

AI status area:
Keep empty initially and allow JavaScript-generated status messages.

Address:

Address

Address placeholder:

Select a location on the map

Map section:

Select Location

Map description:

Search for a place or click directly on the map.

Search placeholder:

Search for a place...

Search button:

Search

Search message:
Keep empty initially and allow JavaScript-generated status messages.

Final button:

Save Location

=========================================================
6. COLOR SYSTEM
=========================================================

Use a consistent DevForge dark interface.

Page background:
#0f1219

Primary card/surface:
#1b2029

Secondary surface:
#202630

Form control background:
#292f39

Form control hover/focus surface:
#303743 / #333b48

Borders:
#303846
#414b59
#3e4857

Primary accent:
#4fd1ff

Primary accent hover:
#78dcff

Main text:
#f5f7fb

Secondary text:
#aeb7c5

Placeholder text:
#a5afbd

Error text:
#ff9b9b

Error surface:
#321f24

Dark button text:
#071017

Use these colors consistently throughout the page.

Do not introduce unrelated colors unless necessary for semantic states.

=========================================================
7. VISUAL DESIGN
=========================================================

The page should look like a polished production dashboard.

Page:
- Dark but not pure black.
- Comfortable contrast.
- No black text on dark surfaces.
- No white text disappearing into light controls.

Card:
- Clearly separated from the page background.
- Moderate rounded corners.
- Subtle border.
- Avoid excessive shadows.

Form:
- Comfortable spacing between fields.
- Labels clearly visible.
- Inputs visually separated from the card.
- Textareas should have enough vertical space.
- Form should not feel cramped.

Typography:
- Clean modern sans-serif appearance.
- Heading clearly dominant.
- Supporting text smaller and visually subordinate.
- Labels medium/semibold.
- Button labels clearly readable.

Buttons:
- Primary actions visually obvious.
- AI Assist should feel like a useful secondary action.
- Search should be compact but easy to use.
- Save Location should be the strongest final action.
- Button text must always have sufficient contrast.

=========================================================
8. PAGE HEADER ALIGNMENT
=========================================================

The "Location Activity" heading and its description must sit directly above the location form.

The left edge of:

Location Activity

must align exactly with the left edge of:

Save Location

form/card.

The header must not appear independently shifted left or right.

The page header and location composer should share the same readable maximum width and horizontal alignment.

=========================================================
9. MAP DESIGN
=========================================================

The map is an important part of the page.

Create a clearly defined map area with:

- Comfortable height
- Rounded corners
- Visible border
- Clear separation from surrounding content
- Responsive width
- Good usability on touch devices

The search input and Search button should appear together above the map.

On narrow screens, they should stack naturally if necessary.

Do not allow the map to create horizontal page overflow.

The map implementation itself can be handled by JavaScript using the required map library.

=========================================================
10. AI ASSISTANT UI
=========================================================

AI assistance is optional and should not dominate the page.

The AI Assist button should appear beside the Description label.

When the AI panel is visible:

- Give it its own visually distinct surface.
- Keep it visually connected to Description.
- Clearly separate the instruction field from the generated response/status area.
- Keep Generate Description visually prominent within the AI panel.
- Make every piece of AI-related text readable.

=========================================================
11. RESPONSIVE DESIGN
=========================================================

Design for all common device categories:

- Very small phones
- Smartphones
- Large smartphones
- Small tablets
- Tablets
- Laptops
- Desktop monitors
- Large desktop monitors
- Ultrawide displays

Do not design only around three fixed device sizes.

Small screens:
- Prevent horizontal scrolling.
- Stack controls where necessary.
- Make buttons easy to tap.
- Allow headings and descriptions to wrap.
- Keep form fields within the viewport.
- Keep the map useful.
- Make search controls adapt naturally.
- Make the AI panel comfortable to use.

Medium screens:
- Maintain comfortable spacing.
- Avoid excessive empty space.
- Keep map and form proportions balanced.

Large screens:
- Keep the content centered.
- Prevent the form from becoming excessively wide.
- Maintain a comfortable reading width.
- Keep the page header aligned with the form.
- Allow the map to become larger without becoming disproportionate.

Ultrawide screens:
- Do not stretch the entire interface across the full viewport.
- Maintain a controlled maximum content width.
- Preserve visual hierarchy and readability.

=========================================================
12. ACCESSIBILITY
=========================================================

Ensure:

- Labels are clearly associated with fields.
- Text has sufficient contrast.
- Placeholder text remains readable.
- Buttons have readable labels.
- Focus states are clearly visible.
- Interactive controls are usable with keyboard and touch.
- Touch targets are comfortably sized.
- Error/status messages are visually distinguishable.
- Reduced-motion preferences are respected.

=========================================================
13. JAVASCRIPT SCOPE
=========================================================

JavaScript should only handle frontend interaction required by this page, such as:

- Map initialization
- Map interaction
- Place search interaction
- Updating location information from map selection
- AI Assist interface interaction
- Showing/hiding the AI panel
- Frontend loading states
- Frontend status messages
- Frontend form-related UI behavior

Do not implement backend business logic.

Do not invent database behavior.

Do not invent API contracts beyond what is explicitly required for the frontend interaction.

=========================================================
14. DJANGO TEMPLATE REQUIREMENTS
=========================================================

The page should be compatible with Django templates.

Use the appropriate static-file loading mechanism for page-specific CSS and JavaScript.

Extend the main base template.

Keep navigation handled by the application's existing navigation component.

Keep the page-specific stylesheet separate from common activity styling.

=========================================================
15. FINAL QUALITY REQUIREMENT
=========================================================

The final result should feel like a real production feature inside DevForge.

It should be:

- Clean
- Professional
- Responsive
- Accessible
- Consistent
- Easy to understand
- Comfortable on touch devices
- Comfortable on desktop
- Visually balanced
- Free from black-on-black or white-on-white readability problems

Generate the required HTML, CSS, and JavaScript from this specification without asking for any additional files or clarification.