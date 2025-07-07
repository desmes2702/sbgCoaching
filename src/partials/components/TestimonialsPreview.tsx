import { useState } from "react";
import { testimonials } from "@js/data/testimonialsData.ts";
import type { FC } from "react";
import type { TestimonialType } from "@js/data/testimonialsData.ts";
import TestimonialsLast from "@partials/testimonials/TestimonialsLast.tsx";

interface Props {
  category: "entreprise" | "general";
}

const TITLES = {
  entreprise: {
    title: "Témoignages",
    subtitle: "Des équipes transformées",
    intro:
      "Des entreprises qui constatent un impact positif sur la cohésion, la motivation et le bien-être au travail grâce à SBG Coaching :",
  },
  general: {
    title: "Témoignages",
    subtitle: "Des parcours inspirants",
    intro:
      "Des clients satisfaits qui recommandent SBG Coaching pour leur progression et leur bien-être au quotidien :",
  },
};

const TestimonialsPreview: FC<Props> = ({ category }) => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const filtered: TestimonialType[] = testimonials
    .filter((t) => t.key === category)
    .sort((a, b) => {
      const getNum = (id: string) => parseInt(id.split("-").pop() || "0", 10);
      return getNum(a.id) - getNum(b.id);
    });

  const lastThree = filtered.slice(-3);

  const { title, subtitle, intro } = TITLES[category];

  return (
    <div className="wrapper-1440-black testimonials__preview">
      <section
        className="testimonials-last"
        aria-labelledby={`testimonials-last-title-${category}`}
      >
        <h2 className="testimonials__title subTitle">{title}</h2>
        <h3
          id={`testimonials-last-title-${category}`}
          className="testimonials__subtitle title"
        >
          {subtitle}
        </h3>
        <p className="testimonials__intro">{intro}</p>
        <div className="testimonials__wrapper">
            {lastThree.map((testimonial: TestimonialType, i: number) => (
              <TestimonialsLast
                key={testimonial.id}
                testimonial={testimonial}
                index={i}
                activeIndex={activeIndex}
                setActiveIndex={setActiveIndex}
              />
            ))}
        </div>
        <a href="/temoignages" className="button button-red">
          Voir tout
        </a>
      </section>
    </div>
  );
};

export default TestimonialsPreview;
