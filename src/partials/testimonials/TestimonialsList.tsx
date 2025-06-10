import { useState } from "react";
import { testimonials } from "@/js/data/testimonialsData";
import type { FC } from "react";
import TestimonialsLast from "./TestimonialsLast";

const TestimonialsList: FC = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  // 🔁 Trier du plus récent au plus ancien (valeur numérique de id)
  const sortedTestimonials = testimonials
    .filter((t) => !t.featured)
    .sort((a, b) => {
      const getNum = (id: string) => parseInt(id.split("-").pop() || "0", 10);
      return getNum(b.id) - getNum(a.id); // ordre décroissant
    });

  // 🔀 Diviser en deux colonnes alternées
  const col1 = sortedTestimonials.filter((_, i) => i % 2 === 0);
  const col2 = sortedTestimonials.filter((_, i) => i % 2 === 1);

  return (
    <div className="wrapper-1440">
      <section
        id="testimonials-last"
        className="testimonials-last"
        aria-labelledby="testimonials-heading"
      >
        <h2 id="testimonials-heading" className="testimonials__type">
          Les plus anciens
        </h2>
        <div className="testimonials__wrapper">
          <div className="testimonials__wrapper__col1">
            {col1.map((testimonial, i) => (
              <TestimonialsLast
                key={testimonial.id}
                testimonial={testimonial}
                index={i}
                activeIndex={activeIndex}
                setActiveIndex={setActiveIndex}
              />
            ))}
          </div>
          <div className="testimonials__wrapper__col2">
            {col2.map((testimonial, i) => (
              <TestimonialsLast
                key={testimonial.id}
                testimonial={testimonial}
                index={i + col1.length}
                activeIndex={activeIndex}
                setActiveIndex={setActiveIndex}
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default TestimonialsList;