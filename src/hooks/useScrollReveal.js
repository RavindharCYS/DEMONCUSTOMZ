import { useEffect } from 'react';

// Observes every element carrying a `data-reveal` attribute and adds
// `is-visible` the first time it enters the viewport, then stops watching it.
// One IntersectionObserver for the whole page keeps this cheap, and the
// one-shot reveal avoids the "flickers every time you scroll past it" feel.
export default function useScrollReveal() {
  useEffect(() => {
    const targets = document.querySelectorAll('[data-reveal]');
    if (!targets.length) return undefined;

    if (typeof IntersectionObserver === 'undefined') {
      targets.forEach((el) => el.classList.add('is-visible'));
      return undefined;
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.14, rootMargin: '0px 0px -64px 0px' }
    );

    targets.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}
