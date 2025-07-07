import { useEffect, useState } from "react";
import { testimonials } from "@js/data/testimonialsData.ts";
import type { FC } from "react";
import TestimonialsLast from "./TestimonialsLast.tsx";

const TestimonialsList: FC = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  // 🔁 Trier du plus récent au plus ancien
  const sortedTestimonials = testimonials
    .filter((t) => !t.featured)
    .sort((a, b) => {
      const getNum = (id: string) => parseInt(id.split("-").pop() || "0", 10);
      return getNum(b.id) - getNum(a.id);
    });

  // ✅ Scroll fluide vers le témoignage ciblé (sans activation)
  useEffect(() => {
    const hash = window.location.hash.replace("#", "");
    if (!hash) return;

    const el = document.getElementById(hash);
    if (!el) return;

    el.scrollIntoView({ behavior: "smooth", block: "center" });
  }, []);

  return (
    <div className="wrapper-1440">
      <section
        id="testimonials-last"
        className="testimonials-last"
        aria-labelledby="testimonials-heading"
      >
        <h3 id="testimonials-heading" className="testimonials__type">
          Les plus anciens
        </h3>
        <div className="testimonials__wrapper">
          {sortedTestimonials.map((testimonial, i) => (
            <TestimonialsLast
              key={testimonial.id}
              testimonial={testimonial}
              index={i}
              activeIndex={activeIndex}
              setActiveIndex={setActiveIndex}
            />
          ))}
        </div>
      </section>
    </div>
  );
};

export default TestimonialsList;
