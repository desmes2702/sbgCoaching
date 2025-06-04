import { useEffect, useRef, useState } from "react";

export default function LazyFadeIn({
  children,
  className = ""
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = wrapperRef.current;
    if (!el) return;

    const page = typeof document !== "undefined" ? document.body.dataset.page : "";

    // ❌ Désactiver l’animation pour la page "contact"
    if (page === "contact") {
      setIsVisible(true);
      return;
    }

    requestAnimationFrame(() => {
      const rect = el.getBoundingClientRect();
      const isInView = rect.top < window.innerHeight && rect.bottom > 0;

      if (isInView) {
        setIsVisible(true);
      } else {
        const observer = new IntersectionObserver(
          ([entry]) => {
            if (entry.isIntersecting) {
              setIsVisible(true);
              observer.disconnect();
            }
          },
          { threshold: 0.1 }
        );
        observer.observe(el);
      }
    });
  }, []);

  return (
    <div
      ref={wrapperRef}
      className={`fade-in-section ${isVisible ? "is-visible" : ""} ${className}`}
    >
      {children}
    </div>
  );
}
