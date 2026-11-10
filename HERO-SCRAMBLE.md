# Ordered hero text scramble

On scrolling into the Test./Automate./Ship. headline, only Test. scrambles. The next distinct scroll gesture animates Automate.; the third animates Ship. Each gesture is separated by 160ms of scroll inactivity. Entry and its settling events count as one gesture. A later gesture received during animation queues its word, so no two words scramble together. After Ship., the headline remains still until the visitor leaves and re-enters this slide. Original typography and reserved word widths are unchanged. Reduced motion disables scrambling. Language changes retain translations and reset the sequence for the next scroll.

The live site is static HTML/CSS/JavaScript. The supplied optional React source is components/ui/text-scramble.tsx (motion/react dependency); see BUTTON-INTEGRATION.md for setup guidance.
