import { useEffect, useState, useRef, useMemo } from "react";
import { testimonials } from "@/js/data/__data";
import LinksSocial from "@partials/components/LinksSocial";

interface HeroContent {
  title: string;
  paragraphs: string[];
  backgroundMain?: string;
  backgroundThumbnail?: string;
  video?: string;
  link?: {
    href: string;
    label: string;
  };
  id?: string;
}

interface HeroProps {
  page: "entreprise" | "general";
}

const CoachingHero: React.FC<HeroProps> = ({ page }) => {
  // Filtrer les témoignages selon la page et mémoriser les slides
  const slides = useMemo(() => {
    const pageTestimonials = testimonials.filter(t => t.key === page);
    
    return [
      {
        id: `${page}-slide-1`,
        title: `Coaching sportif <span>_${page === "entreprise" ? "Entreprise" : "Général"}</span>`,
        paragraphs: [
          page === "entreprise" 
            ? "Dans le monde professionnel moderne, la productivité et le bien-être des employés sont plus interconnectés que jamais."
            : "Retrouvez la forme, gagnez en énergie et atteignez vos objectifs personnels.",
          page === "entreprise"
            ? "Reconnaissant cette réalité, le coaching en entreprise émerge comme une solution incontournable pour les organisations visant l'excellence."
            : "Avec un accompagnement sur-mesure, le coaching s'adapte à vous, pas l'inverse."
        ],
        backgroundMain: `/img/${page}/${page}__post1.webp`,
        backgroundThumbnail: `/img/${page}/${page}__post1-thumb.webp`
      },
      ...pageTestimonials.slice(0, 2).map((testimonial, index) => ({
        id: `${page}-testimonial-${index + 1}`,
        title: testimonial.name,
        paragraphs: [testimonial.text[0]],
        backgroundMain: testimonial.photo,
        backgroundThumbnail: `/img/${page}/${page}__post${index + 2}-thumb.webp`,
        link: {
          href: "/testimonials",
          label: "Lire le témoignage"
        }
      }))
    ];
  }, [page]); // Ne recalculer que si la page change

  const totalSlides: number = slides.length;
  const [index, setIndex] = useState<number>(0);
  const [main, setMain] = useState<HeroContent>(slides[0]);
  const [secondary, setSecondary] = useState<HeroContent[]>(
    slides.filter((_, i: number) => i !== 0)
  );
  const videoRef = useRef<HTMLVideoElement>(null);

  // Fonction pour trouver l'index d'un élément par son ID
  const findIndexById = (id: string | undefined): number => {
    if (!id) return -1;
    return slides.findIndex((item: HeroContent) => item.id === id);
  };

  const next = () => setIndex((current) => (current + 1) % totalSlides);
  const prev = () => setIndex((current) => (current - 1 + totalSlides) % totalSlides);

  useEffect(() => {
    const newMain = slides[index];
    const newSecondary = slides.filter((_, i: number) => i !== index);
    setMain(newMain);
    setSecondary(newSecondary);

    if (page === "entreprise" && index === 1 && videoRef.current) {
      videoRef.current.volume = 0.5;
    }
  }, [index, page, slides]);

  const isTestimonial = main.link?.href === "/testimonials";
  const isVideo = !!main.video;

  // Gestion du focus automatique sur le slide actif
  const mainContentRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    mainContentRef.current?.focus();
  }, [index]);

  // Fonction pour gérer Enter/Space sur miniatures
  const handleThumbnailKey = (e: React.KeyboardEvent, targetIndex: number) => {
    if (e.key === "Enter" || e.key === " ") {
      setIndex(targetIndex);
    }
  };

  return (
    <div className="wrapper-1440" id="page__coaching__wrapper__hero">
      <section
        className="coaching__hero"
        role="region"
        aria-label={`Section de présentation coaching ${page === "entreprise" ? "entreprise" : "général"}`}
      >
        <div className="coaching__hero-col1">
          <div className="coaching__hero__content">
            <div
              id={`${page}-slide-${index + 1}`}
              className={[
                "coaching__hero__content__bck",
                `coaching__hero__content-bck${index + 1}`,
                isVideo ? "is-video" : "",
                isTestimonial ? "is-testimonial" : "",
              ]
                .filter(Boolean)
                .join(" ")}
              style={
                page === "entreprise" && index === 1 && isVideo
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
                    aria-hidden="true"
                    preload="none"
                  />
                </div>
              ) : (
                <>
                  <h2 className="title" tabIndex={0} dangerouslySetInnerHTML={{ __html: main.title }} />
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
                  tabIndex={0}
                  type="button"
                />
                <span
                  className="hero__index"
                  aria-live="polite"
                  aria-atomic="true"
                  tabIndex={0}
                >
                  {index + 1}
                </span>
                <span className="hero__index-slash" aria-hidden="true">/{totalSlides}</span>
                <button
                  onClick={next}
                  aria-label="Slide suivant"
                  className="hero__nav hero__nav--right"
                  tabIndex={0}
                  type="button"
                />
              </div>

              {!isVideo && (
                <div className="hero__content__cta">
                  <a href="/contact" className="button button-red ">
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
                  aria-hidden={!isSelected}
                  key={item.id ?? `secondary-${i}`}
                  onClick={() => setIndex(itemIndex > -1 ? itemIndex : 0)}
                  onKeyDown={(e) => handleThumbnailKey(e, itemIndex > -1 ? itemIndex : 0)}
                  className={`coaching__hero__content coaching__hero__content-secondary coaching__hero__content-secondary-${i + 1}`}
                  style={
                    item.backgroundThumbnail
                      ? { backgroundImage: `url(${item.backgroundThumbnail})`, cursor: "pointer" }
                      : { cursor: "pointer" }
                  }
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
