# DevForge

> A personal development and productivity platform built with Django, PostgreSQL, REST APIs, AI integration, Gmail integration, and Google Authentication.


## About DevForge

DevForge is a personal development and productivity platform designed to bring different everyday activities into one application.

The project is built as a full-stack Django application with authentication, email management, location activity, AI assistance, file management, reporting, analytics, and API integration.

The main goal of DevForge is not only to provide useful functionality, but also to serve as a practical, specification-driven software development project covering modern backend development concepts.

---

## Live Demo

**Production:** [Open DevForge](https://devforge-xxd1.onrender.com)

---

## Core Features

### Google Authentication

- Sign in using Google OAuth.
- Automatic user profile creation.
- Google account information stored in the DevForge profile.
- Profile photo support.
- Email verification information.
- Google account metadata.
- Secure authentication using Django Allauth.

### Email Activity

DevForge provides an email activity system connected with Gmail.

Features include:

- Compose emails.
- To, CC and BCC recipient management.
- Subject and body management.
- File attachments.
- Email status tracking.
- Gmail integration.
- Send emails through the authenticated user's Gmail account.
- AI-assisted email generation and improvement.

### Location Activity

Users can record places and travel-related activities.

Features include:

- Place name.
- Visited / Planned status.
- Address.
- Latitude and longitude.
- Location description.
- Interactive map support.
- Map-based location selection.
- AI-assisted location descriptions.

### AI Assistance

AI is integrated into multiple activities to reduce manual work.

Current use cases include:

- AI-assisted email writing.
- AI-assisted email improvement.
- AI-generated location descriptions.
- User-provided instructions for controlling AI output.
- AI interaction tracking.

The AI system is designed so that the user remains in control of the final content.

### File Management

DevForge supports files associated with activities.

Supported file types include:

- PDF
- DOC
- DOCX
- TXT

File handling includes:

- Original filename preservation.
- File type tracking.
- File size tracking.
- Activity association.
- Email attachments.
- AI support files.
- Upload validation.

### Reports

The Reports module reads activity data from the application's existing models rather than maintaining a separate report database.

Reports are designed to provide activity information from:

- Email activity
- Location activity
- AI interactions
- Files

Pagination is used to keep larger datasets manageable.

### Analytics

The project includes an analytics area designed to provide a higher-level view of application activity and data.

---

## Technology Stack

### Backend

- Python
- Django
- Django REST Framework
- PostgreSQL
- Django Allauth

### Frontend

- HTML
- CSS
- JavaScript
- Bootstrap
- Leaflet

### Authentication & APIs

- Google OAuth 2.0
- Gmail API
- Gmail SMTP
- REST APIs

### AI

- OpenAI API
- Google Gemini API

### Deployment

- Render
- PostgreSQL
- WhiteNoise
- Environment-based configuration

### Development Tools

- Git
- GitHub
- VS Code
- Python virtual environment

---

## Project Architecture

DevForge follows a modular Django application structure.

```text
DevForge/
│

├── apps/

│   │

│   ├── accounts/

│   │   ├── models.py

│   │   ├── views.py

│   │   ├── urls.py

│   │   └── signals.py

│   │

│   ├── emails/

│   │   ├── models.py

│   │   ├── forms.py

│   │   ├── views.py

│   │   └── urls.py

│   │

│   ├── location/

│   │   ├── models.py

│   │   ├── views.py

│   │   └── urls.py

│   │

│   ├── ai/

│   │   ├── models.py

│   │   ├── views.py

│   │   └── urls.py

│   │

│   ├── files/

│   │   ├── models.py

│   │   ├── views.py

│   │   └── urls.py

│   │

│   └── reports/

│       ├── views.py

│       └── urls.py

│

├── config/

│   ├── settings.py

│   ├── urls.py

│   ├── wsgi.py

│   └── ...

│

├── templates/

├── static/

├── media/

├── manage.py

└── requirements.txt

## Application Modules

| Module     | Responsibility                                  |

| ---------- | ----------------------------------------------- |

| `accounts` | Authentication, profiles and account management |

| `emails`   | Email activity and Gmail integration            |

| `location` | Location and map activity                       |

| `ai`       | AI interactions and AI-assisted features        |

| `files`    | File uploads and activity attachments           |

| `reports`  | Reading and presenting activity data            |

| `config`   | Django project configuration                    |

Database Design

DevForge uses PostgreSQL as its primary database.

Important entities include:

User
 │

 └── Profile

       │

       ├── Email

       │     └── File

       │

       ├── Location

       │

       ├── AIInteraction

       │       └── File

       │

       └── File

The Profile model acts as the primary application-level relationship between a Django user and DevForge activities.


#  Authentication Flow

User

 │

 ▼

Google Authentication

 │

 ▼

Django Allauth

 │

 ▼

User

 │

 ▼

Profile

 │

 ├── Google information

 ├── Profile photo

 ├── Email information

 └── Gmail connection


# Gmail Integration

DevForge uses Google OAuth to obtain permission for Gmail functionality.

The application requests:

openid
profile
email
https://www.googleapis.com/auth/gmail.send

The Gmail permission is required because sending emails through the user's Gmail account is a core DevForge feature.

AI Workflow

A typical AI-assisted activity follows this pattern:

User Input

    │

    ▼

AI Instruction

    │

    ▼

Django Backend

    │

    ▼

AI API

    │

    ▼

Generated Response

    │

    ▼

User Reviews / Edits

    │

    ▼

Final Activity

AI-generated content is returned to the user for review rather than automatically being treated as final content.

Security

The project uses environment variables for sensitive configuration.

Sensitive values include:

Django SECRET_KEY
Database credentials
Google OAuth credentials
Gmail credentials
OpenAI API key
Gemini API key
Production configuration

These values should never be committed to GitHub.

Production configuration uses:

DEBUG=False

and environment-based configuration for deployment.


# Deployment

DevForge is deployed using Render.

The production environment requires:

Django web service
PostgreSQL database
Environment variables
Static file configuration
Production security configuration
Google OAuth production redirect URI
Gmail API configuration
SMTP configuration

#Future Improvements

Potential future improvements include:

Advanced analytics dashboards
More AI-assisted workflows
Advanced reporting
More REST API endpoints
Improved file management
Activity search and filtering
Notification system
Expanded user profile
Improved production monitoring
Automated testing expansion
CI/CD improvements
Learning & Development Purpose

DevForge is also a practical software engineering project created to work with real-world technologies and development practices.

The project provides hands-on experience with:

Python
Django
PostgreSQL
REST APIs
Authentication
OAuth 2.0
Gmail API
SMTP
AI APIs
JavaScript
Maps
File handling
Database relationships
Environment-based configuration
Deployment
Production debugging
Modular application architecture


#Author

Keshav Jha
Developer / Software Engineering Learner

#License

This project is developed for learning, portfolio, and personal development purposes.