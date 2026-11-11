# Progressive headline reveal

First scroll into the headline reveals Test.; the next gesture reveals Automate.; the third reveals Ship. Previously revealed words remain visible. Each word resolves over 1.6 seconds. Scroll gestures settle after 300ms, grouping wheel bursts and native touch inertia. Fast input queues the next word without overlapping animations.

The hero has 650 viewport heights of scroll space, with the headline active from 30% to 80% progress. This preserves approximately the previous entrance timing while giving the three-word sequence more room on phones/tablets. Stable viewport units avoid browser toolbar height jumps where supported. Typography is unchanged. Leaving the slide resets the sequence; reduced motion renders the full static headline.
