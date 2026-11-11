# Progressive headline and final glitch

Test., Automate., and Ship. are revealed on three separate scroll gestures, resolving over 1.6 seconds each. Later words stay hidden until their turn. After Ship. finishes, the three words receive one 1-second Kokonut-style glitch (opposing duplicate layers, 3px displacement, 1-degree skew), then return to normal. No font family, font size, font weight, line spacing, letter spacing, or headline layout is changed. The one-shot state resets when leaving the slide; nothing glitches before the final word completes. Reduced motion disables both effects. The duplicate visual layers are aria-hidden.

The supplied MIT React component is preserved at components/ui/glitch-text.tsx. It depends on motion/react and @/lib/utils, and is optional for React/TypeScript/Tailwind projects. See BUTTON-INTEGRATION.md for setup guidance. The static live adaptation uses hero-scramble.js and hero-scramble.css.
