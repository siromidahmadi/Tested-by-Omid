# Expandable contact action bar

The Let's Connect section now has quick links for Email, Phone, LinkedIn, GitHub, and Book a Call above the existing glass contact cards.

The live static site uses `contact-actions.css` and `contact-actions.js` to adapt the supplied component's expand/collapse behavior. Labels expand on desktop pointer entry or keyboard focus, with a 90 ms collapse delay. A labelled toggle handles touch screens and manual expansion; Escape collapses the bar. Native anchors preserve email, telephone, new-tab link behavior, and accessible names even when visual labels are collapsed. The expanded bar wraps into a two-column layout on narrow screens. Reduced-motion preferences and English/Persian labels are supported.

## Supplied React source

`components/ui/be-ui-expanable-action-bar.tsx` contains the user-supplied original React component. It is an optional reference, not loaded by the static portfolio. The registry URL was provided as https://21st.dev/r/starc007/be-ui-expanable-action-bar; the attached component source was used directly instead of downloading it.

For a React workspace, follow [BUTTON-INTEGRATION.md](BUTTON-INTEGRATION.md) to set up Vite, React, TypeScript, Tailwind, shadcn, and the `@` alias. Keep reusable components in `components/ui` and global Tailwind styles in `src/index.css`. That component path matches the supplied imports and keeps UI primitives separate from page content.

Install the additional dependencies in that React workspace:

```sh
npm install clsx motion tailwind-merge
```

The original demo additionally uses `lucide-react`; install it if using that demo. Pass contact-specific items and handlers in place of its Send/Archive/Alerts examples. The supplied component renders buttons; native links or an anchor-aware adaptation should be used for production contact navigation. No stock imagery or providers are needed.
