# Shiny résumé download button

The two footer résumé links are combined into one Download Résumé disclosure styled from the supplied Designali shiny-button source. Opening it offers Download PDF and Download Word, preserving both files and download attributes.

The live static implementation uses native details/summary, `resume-shiny.css`, and `resume-download.js`. Enter/Space toggle it, Tab reaches the format links, Escape closes it and returns focus, and clicking outside closes it. The blue conic-gradient border, dot pattern, inner shimmer, and hover glow follow the supplied design. Reduced-motion preferences disable animation. English and Persian labels are retained. The hero résumé links are outside this footer-specific change.

The optional React source is stored in `components/ui/shiny-button.tsx`. Its Next.js-specific `style jsx` attribute was changed to standard `style` for React portability, and its button has `type="button"`. It needs React but no additional runtime package. See [BUTTON-INTEGRATION.md](BUTTON-INTEGRATION.md) for React/TypeScript/Tailwind/shadcn setup and component/style paths.

Registry reference: https://21st.dev/r/designali-in/shiny-button. The user-supplied source was used directly; no registry download or CLI install was needed. No stock images or icon dependencies are used.
