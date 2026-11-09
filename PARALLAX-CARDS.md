# Selected Roles parallax cards

The live website is static HTML/CSS/JavaScript. role-parallax.js adapts the supplied React component’s spring values (stiffness 300, damping 30), 17.5-degree tilt, and opposite image/content movement. The original React source is preserved at components/ui/parallax-card.tsx, importing cn from lib/utils and framer-motion. It is not loaded by the static site.

For a React/TypeScript/Tailwind build, use the existing components/ui directory and @ alias, and install framer-motion. See BUTTON-INTEGRATION.md for the project setup guidance. Keep reusable components in components/ui so the supplied imports resolve consistently. Styles for the live site are at the repository root.

Only the five Selected Roles cards receive this treatment. Existing logos: AT&T, Universal Bank, Cigna, State Farm. BuildLACCD has no supplied logo and retains a company-name fallback. Aura Engine also lacks a logo in the assets, but is in Leadership & Mentoring and was not changed. Touch devices and reduced-motion users receive stable, untransformed cards. Role details and language switching remain available.
