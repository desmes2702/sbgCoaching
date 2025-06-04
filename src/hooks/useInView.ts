import { useEffect, useState, useRef } from "react";

export function useInView<T extends HTMLElement = HTMLElement>(
  options?: IntersectionObserverInit
): [React.RefObject<T>, boolean] {
  const ref = useRef<null | T>(null); // ← ici
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    if (!ref.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1, ...options }
    );

    observer.observe(ref.current);

    return () => observer.disconnect();
  }, [options]);

  return [ref as React.RefObject<T>, isInView]; // ← ici aussi
}
