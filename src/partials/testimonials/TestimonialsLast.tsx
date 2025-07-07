import { useState, useRef } from "react";
import type { FC } from "react";
import type { TestimonialType } from "@js/data/testimonialsData.ts";

interface Props {
  testimonial: TestimonialType;
  index: number;
  activeIndex: number | null;
  setActiveIndex: (index: number | null) => void;
}

const TestimonialsLast: FC<Props> = ({ testimonial, index, activeIndex, setActiveIndex }) => {
  const isActive = activeIndex === index;
  const contentRef = useRef<HTMLDivElement>(null);

  const toggleCard = () => {
    setActiveIndex(isActive ? null : index);
  };

  const id = `testimonial-content-${index}`;
  const titleId = `testimonial-title-${index}`;

  return (
    <article
      id={testimonial.id}
      className={`testimonial__item${isActive ? " testimonial__item--active" : ""}`}
      role="listitem"
      aria-labelledby={titleId}
      style={{ opacity: activeIndex === null || isActive ? 1 : 0.5 }}
    >
      <div className="testimonial__item__stack">
        <div className="testimonial__item__cover">
          <div
            className="testimonial__item__image"
            style={{ backgroundImage: `url('${testimonial.photo}')` }}
            role="img"
            aria-label={`Photo de ${testimonial.name}`}
          ></div>
          <button
            className={`testimonial__item__button${isActive ? " testimonial__item__button--active" : ""}`}
            aria-expanded={isActive ? "true" : "false"}
            aria-controls={id}
            onClick={toggleCard}
          >
            Voir le témoignage
            <span className="testimonial__item__arrow" aria-hidden="true"></span>
          </button>
        </div>

        <div
          className={`testimonial__item__content${isActive ? " testimonial__item__cover--up" : ""}`}
          id={id}
          aria-live="polite"
          role="region"
          ref={contentRef}
          style={{ overflowY: "auto" }}
        >
          <button
            className="testimonial__item__backBtn"
            onClick={toggleCard}
            aria-label="Fermer le témoignage"
          >
            ×
          </button>
          <header className="testimonial__item__header">
            <div>
              <h3 id={titleId} className="testimonial__item__name">
                {testimonial.name}
              </h3>
              {testimonial.job && (
                <p className="testimonial__item__job">{testimonial.job}</p>
              )}
            </div>
          </header>
          <div className="testimonial__item__contentText">
            {testimonial.text.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </div>
      </div>
    </article>
  );
};

export default TestimonialsLast;
