Create the final production-ready frontend UI/UX for the DevForge Email Activity page.

PURPOSE
Design a modern email composer where users can:
- Compose and send emails.
- Add To, CC, and BCC recipients.
- Enter a subject.
- Write the email body.
- Use optional AI assistance.
- Add attachments.
- Send the email.
- Clearly see success, validation, and error messages.

PAGE STRUCTURE

1. PAGE HEADER — OUTSIDE THE FORM CARD

Display:

Email Activity

Compose and send emails with ease.

If a connected email exists:

Sending from user@example.com

The page title should be slightly larger and prominent.
The supporting sentence should be short and secondary.
"Sending from" should remain normal-sized.
Only the email address should receive subtle emphasis.

2. EMAIL COMPOSER CARD

Inside the card, use this order:

- Success/error messages
- To recipient field
- CC recipient field
- BCC recipient field
- Subject
- Email body
- AI Assistant
- Attachments
- Send Email button


VISUAL DESIGN

Create a sophisticated dark productivity-application interface.

Use this color system:

Page background:
#0f1319

Main card:
#1b2029

Secondary surface:
#202630

Input background:
#292f39

Input focus background:
#303743

Primary text:
#f5f7fb

Secondary text:
#aeb7c5

Muted text:
#7f8998

Borders:
#303846

Input borders:
#414b59

Primary accent:
#4fd1ff

Primary hover:
#78dcff

Success background:
#173126

Success border:
#28583e

Success text:
#b9f5d0

Error background:
#321f24

Error border:
#6b343d

Error text:
#ffb0b0

Maintain strong contrast throughout the entire interface.

Never allow:
- White text on a white background.
- Black text on a black background.
- Dark placeholder text on dark inputs.
- Low-contrast button text.


TYPOGRAPHY

Use a clean modern sans-serif style.

Page title:
1.8rem–2.25rem

Section headings:
Approximately 1rem

Field labels:
Medium/semibold

Supporting text:
Smaller and muted

Form text:
Comfortable and highly readable

Buttons:
Semibold


RECIPIENT SECTION

Make To, CC, and BCC feel like a modern email client.

Recipient fields should:

- Support multiple recipients visually.
- Display recipients as compact chips/tags.
- Allow chips to wrap naturally.
- Keep the input integrated with the recipient area.
- Provide clear focus states.
- Make CC and BCC controls easy to discover.
- Avoid unnecessary vertical space.

On mobile, recipient chips and inputs must wrap naturally without horizontal overflow.


SUBJECT

Use a clean single-line subject field.

The subject input should have:

- Comfortable padding.
- Clear placeholder.
- Strong contrast.
- Clear focus state.
- Professional spacing.


EMAIL BODY

The email body should be the largest writing area.

Make it feel like an actual email editor rather than a generic textarea.

Use:

- Comfortable internal spacing.
- Highly readable text.
- Clear placeholder text.
- Strong contrast.
- Clear focus state.
- Vertical resizing where appropriate.


AI ASSISTANT

AI assistance is a supporting feature, not the main purpose of the page.

Provide a compact:

AI Assistant

action near the composition area.

When opened, the AI section should contain:

- A short explanation of what AI can help with.
- An instruction/input area.
- Useful actions for generating or improving email content.
- Clear separation from the actual email body.

The AI section should visually belong to the email composer while remaining distinguishable.


ATTACHMENTS

Create a polished attachment area.

Primary text:

Add attachments

Supporting text:

Attach files to your email.

The upload area should:

- Be immediately recognizable.
- Use a subtle dashed border.
- Work well with mouse and touch.
- Clearly display selected files.
- Display useful file information.
- Prevent long filenames from breaking the layout.
- Keep attachment rows compact.


MESSAGES

Success and error messages should appear near the top of the composer.

Success example:

Email sent successfully.

Error example:

Unable to send email.

Use semantic success/error styling.

Messages should be:

- Noticeable.
- Compact.
- Easy to read.
- Consistent with the overall interface.
- Visually distinct without overpowering the composer.


SEND ACTION

The primary action is:

Send Email

Use the primary accent color.

The button must:

- Have comfortable touch dimensions.
- Be visually prominent.
- Have a clear hover state.
- Have a clear focus state.
- Have readable text.
- Become full-width or appropriately sized on small screens.


RESPONSIVE DESIGN

Design for all device sizes:

- Small phones
- Large phones
- Tablets
- Laptops
- Desktop monitors
- Large/ultrawide displays

Mobile behavior:

- Reduce card padding.
- Stack controls where necessary.
- Make Send Email full-width.
- Allow recipient chips to wrap.
- Prevent horizontal scrolling.
- Keep the page header aligned with the composer.
- Maintain comfortable touch targets.

Desktop behavior:

- Use a readable maximum content width.
- Avoid excessively stretched inputs.
- Maintain balanced whitespace.
- Keep the composer visually centered and professional.


UX DIRECTION

The final UI should feel:

- Professional
- Clean
- Modern
- Calm
- Product-like
- Easy to scan
- Practical for frequent email composition

Avoid:

- Excessive decoration.
- Huge empty spaces.
- Unnecessary animations.
- Excessive rounded elements.
- Heavy gradients.
- Low-contrast text.
- Generic dashboard-style controls.

IMPORTANT

This is a frontend-only task.

Do not change backend business logic.

Preserve all existing Django variables, form fields, IDs, names, and functionality.

Do not introduce changes that would break the existing JavaScript.

The result should be a complete final implementation, not a patch or partial styling solution.