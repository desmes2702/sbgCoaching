import { useEffect, useState, useRef, useMemo } from "react";
import { heroData } from "@/js/data/heroData";
import { testimonials } from "@/js/data/testimonialsData";
import LinksSocial from "@partials/components/LinksSocial";

interface HeroContent {
  id: string;
  title: string;
  paragraphs?: string[];
  backgroundMain?: string;
  backgroundThumbnail?: string;
  video?: string;
  link?: {
    href: string;
    label: string;
  };
}

interface HeroProps {
  page: "entreprise" | "general";
}

const CoachingHero: React.FC<HeroProps> = ({ page }) => {
  const slides: HeroContent[] = useMemo(() => {
    const baseSlides = heroData[page] || [];

    const featuredTestimonials: Record<"general", string[]> = {
      general: ["christian-6", "justin-5"]
    };

    const pageTestimonials =
      page === "general"
        ? featuredTestimonials.general
            .map((id) => testimonials.find((t) => t.id === id))
            .filter((t): t is NonNullable<typeof t> => !!t)
            .map((t, i) => ({
              id: `general-testimonial-${i + 1}`,
              title: t.name,
              paragraphs: [t.text[0]],
              backgroundMain: t.photo,
              backgroundThumbnail: t.thumbnail || t.photo,
              link: {
                href: "/testimonials",
                label: "Lire le témoignage"
              }
            }))
        : [];

    const finalSlides =
      page === "general"
        ? [baseSlides[0], ...pageTestimonials]
        : baseSlides;

    console.log(`[HERO - ${page}] Slides utilisés :`, finalSlides.map((s) => s.title));
    return finalSlides;
  }, [page]);

  const [index, setIndex] = useState(0);
  const totalSlides = slides.length;
  const main = slides[index];
  const secondary = slides.filter((_, i) => i !== index);

  const isVideo = !!main.video;
  const isTestimonial = main.link?.href === "/testimonials";

  const videoRef = useRef<HTMLVideoElement>(null);
  const mainContentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (page === "entreprise" && index === 1 && videoRef.current) {
      videoRef.current.volume = 0.5;
    }
  }, [index, page]);

  useEffect(() => {
    mainContentRef.current?.focus();
  }, [index]);

  const next = () => setIndex((i) => (i + 1) % totalSlides);
  const prev = () => setIndex((i) => (i - 1 + totalSlides) % totalSlides);

  const findIndexById = (id: string | undefined): number =>
    id ? slides.findIndex((s) => s.id === id) : -1;

  const handleThumbnailKey = (e: React.KeyboardEvent, targetIndex: number) => {
    if (e.key === "Enter" || e.key === " ") {
      setIndex(targetIndex);
    }
  };

  if (!slides.length || !slides[index]) return null;

  return (
    <div className="wrapper-1440" id="page__coaching__wrapper__hero">
      <section
        className="coaching__hero"
        role="region"
        aria-label={`Section de présentation coaching ${page}`}
      >
        <div className="coaching__hero-col1">
          <div className="coaching__hero__content">
            <div
              id={main.id}
              className={[
                "coaching__hero__content__bck",
                `coaching__hero__content-bck${index + 1}`,
                isVideo ? "is-video" : "",
                isTestimonial ? "is-testimonial" : ""
              ].join(" ")}
              style={
                isVideo && page === "entreprise" && index === 1
                  ? {}
                  : main.backgroundMain
                  ? { backgroundImage: `url(${main.backgroundMain})` }
                  : {}
              }
              tabIndex={-1}
              ref={mainContentRef}
              aria-current="true"
              aria-live="polite"
            >
              <span className="visually-hidden">
                Slide actif : {main.title.replace(/<[^>]+>/g, "")}
              </span>

              {isVideo ? (
                <div className="video-wrapper">
                  <video
                    ref={videoRef}
                    src={main.video}
                    autoPlay
                    loop
                    playsInline
                    controls
                    preload="none"
                    aria-hidden="true"
                  />
                </div>
              ) : (
                <>
                  <h2
                    className="title"
                    tabIndex={0}
                    dangerouslySetInnerHTML={{ __html: main.title }}
                  />
                  {main.paragraphs?.map((p, i) => (
                    <p key={i}>{p}</p>
                  ))}
                  {main.link && (
                    <p>
                      <a
                        className="link-underline-replay"
                        href={main.link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {main.link.label}
                      </a>
                    </p>
                  )}
                </>
              )}

              <div className="hero__content__btn" role="group" aria-label="Navigation slides">
                <button
                  onClick={prev}
                  aria-label="Slide précédent"
                  className="hero__nav hero__nav--left"
                  type="button"
                />
                <span className="hero__index" aria-live="polite" aria-atomic="true" tabIndex={0}>
                  {index + 1}
                </span>
                <span className="hero__index-slash" aria-hidden="true">/{totalSlides}</span>
                <button
                  onClick={next}
                  aria-label="Slide suivant"
                  className="hero__nav hero__nav--right"
                  type="button"
                />
              </div>

              {!isVideo && (
                <div className="hero__content__cta">
                  <a href="/contact" className="button button-red">
                    Prendre rdv
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="wrapper-center">
          <div className="coaching__hero-col2">
            <h2 tabIndex={0}>Actualité</h2>
            {secondary.map((item, i) => {
              const itemIndex = findIndexById(item.id);
              const isSelected = index === itemIndex;

              return (
                <div
                  key={item.id}
                  aria-hidden={!isSelected}
                  onClick={() => setIndex(itemIndex)}
                  onKeyDown={(e) => handleThumbnailKey(e, itemIndex)}
                  className={`coaching__hero__content coaching__hero__content-secondary coaching__hero__content-secondary-${i + 1}`}
                  style={{
                    backgroundImage: `url(${item.backgroundThumbnail})`,
                    cursor: "pointer"
                  }}
                  role="button"
                  tabIndex={0}
                  aria-label={`Aller au slide ${itemIndex + 1} : ${item.title.replace(/<[^>]+>/g, "")}`}
                  aria-current={isSelected ? "true" : undefined}
                />
              );
            })}

            <div className="coaching__hero__social">
              <LinksSocial variant="black" size={24} />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CoachingHero;
