export function initScrollReveal(): void {
  const elements = document.querySelectorAll<HTMLElement>("[data-reveal]");

  const observer = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach(({ isIntersecting, target }) => {
        if (isIntersecting) {
          const el = target as HTMLElement;
          el.classList.add("is-visible");

          // Gestion du delay custom via data-reveal-delay
          const delay = el.dataset.revealDelay;
          if (delay) {
            el.style.transitionDelay = delay;
          }

          observer.unobserve(el);
        }
      });
    },
    { threshold: 0.1 }
  );

  elements.forEach((el) => observer.observe(el));
}
