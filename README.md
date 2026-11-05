# Tested by Omid

**Omid Ahmadi’s personal portfolio for quality engineering, test automation, and technical project delivery.**

[Visit the live portfolio](https://siromidahmadi.github.io/Tested-by-Omid/) · [LinkedIn](https://www.linkedin.com/in/ahmadiomid92) · [Get in touch](mailto:aomid6362@gmail.com)

## About the portfolio

Tested by Omid brings together my professional experience, selected projects, technical skills, education, and certifications in one place. It gives recruiters and collaborators a closer look at my work as a Senior SDET, QA Automation Engineer, and Technical Project Lead.

The portfolio highlights work across telecommunications, banking, healthcare, insurance, public infrastructure, and digital twin initiatives.

## What you’ll find

- **Experience:** roles at BuildLACCD, AT&T / DIRECTV, Universal Bank, Cigna, and State Farm, plus leadership and mentoring.
- **Selected projects:** DIRECTV SignalSaver, California Center Digital Twins Hub, Shade-LA, and other community and geospatial initiatives.
- **Skills:** automation frameworks, programming languages, CI/CD and cloud tools, API and data testing, test management, and spatial/XR testing.
- **Education and credentials:** degrees, training, and certificates, including **Workplace Success I: Creative Leadership** and **Facilities Management**, issued by West Los Angeles College in August 2026.
- **Résumé downloads:** PDF and Word versions.
- **Contact and meeting requests:** email, LinkedIn, and a form for proposing a 30-minute conversation.

## Design and implementation

Built with **HTML, CSS, and vanilla JavaScript** and hosted on **GitHub Pages**.

The site includes a dark visual theme with gold and crimson accents, a video hero, scroll-driven transitions, expandable role details, skills tabs, and English/Persian content switching. The meeting-request form uses a responsive layout and labelled inputs.

## Calendar and Google Meet

Visitors can request a meeting without Google sign-in. The form opens a prefilled email draft; the visitor must send it, and I confirm availability by email.

An optional Google Calendar integration can create a **proposed event in the authorizing user’s own calendar** and request a Google Meet link. It does not check my availability, send me an invitation, or confirm a booking.

Google Cloud configuration and live authorization testing are still required. Google Chat is not connected.

See [GOOGLE-SETUP.md](GOOGLE-SETUP.md) for configuration steps and integration limitations.

## Repository structure

```text
Tested-by-Omid/
├── index.html              # Portfolio content, inline styles, and interactions
├── style.css               # Additional stylesheet
├── meetings.css            # Meeting-request form styling
├── google-integration.js   # Email request and optional Calendar/Meet flow
├── GOOGLE-SETUP.md         # Google configuration and setup notes
├── Assest/                 # Photos, logos, videos, and résumé downloads
└── README.md
```

## Run locally

Clone the repository and open `index.html` in a browser:

```bash
git clone https://github.com/siromidahmadi/Tested-by-Omid.git
cd Tested-by-Omid
```

For the optional Google integration, serve the files through a local HTTP server and configure that exact origin in the Google OAuth client. Opening a local file alone is sufficient to view the portfolio, but does not complete Google OAuth setup.

## Contact

**Omid Ahmadi** · Los Angeles, California

- [LinkedIn](https://www.linkedin.com/in/ahmadiomid92)
- [GitHub](https://github.com/siromidahmadi)
- [Email](mailto:aomid6362@gmail.com)
