import { useEffect, useRef, useState } from "react";

export default function LazyFadeIn({
  children,
  className = ""
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const markFirstChild = () => {
      const firstChild = el.firstElementChild;
      if (firstChild) {
        firstChild.classList.add("fade-child-visible");
      }
    };

    requestAnimationFrame(() => {
      const rect = el.getBoundingClientRect();
      const isInView = rect.top < window.innerHeight && rect.bottom > 0;

      if (isInView) {
        setIsVisible(true);
        markFirstChild();
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
      ref={ref}
      className={`fade-in-section ${isVisible ? "is-visible" : ""} ${className}`}
    >
      {children}
    </div>
  );
}
