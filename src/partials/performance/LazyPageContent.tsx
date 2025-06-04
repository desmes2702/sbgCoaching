// src/partials/performance/LazyPageContent.tsx
import { useEffect, useRef, useState, ReactNode, Suspense } from "react";

export default function LazyPageContent({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const alreadyInView =
      el.getBoundingClientRect().top < window.innerHeight &&
      el.getBoundingClientRect().bottom > 0;

    if (alreadyInView) {
      setVisible(true); // direct render
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`lazy-section ${visible ? "is-visible" : ""}`}
    >
      {visible && <Suspense fallback={null}>{children}</Suspense>}
    </div>
  );
}
