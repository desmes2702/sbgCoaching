import React, { useState, useRef, useEffect } from "react";

const TYPES = [
  {
    key: "private",
    title: "Privé",
    subtitle1: "Un suivi personnalisé",
    text1:
      "Le coaching privé est idéal si vous souhaitez une attention particulière et un programme d'entraînement spécifiquement conçu pour vous.",
    subtitle2: "Flexibilité et résultats",
    text2:
      "Vous choisissez les créneaux qui vous conviennent et bénéficiez d’une progression optimale grâce à un suivi précis de vos performances.",
    btnClass: "button button-red",
    cardClass: "coaching__types__card coaching__types__card-private",
  },
  {
    key: "group",
    title: "Groupe",
    subtitle1: "Une dynamique de groupe motivante",
    text1:
      "Les entraînements en groupe sont parfaits pour ceux qui aiment partager leur effort avec d'autres.",
    subtitle2: "Adapté à tous les niveaux",
    text2:
      "Chaque exercice peut être ajusté pour répondre à vos capacités, tout en favorisant un esprit d’équipe.",
    btnClass: "button button-red",
    cardClass: "coaching__types__card coaching__types__card-group",
  },
  {
    key: "business",
    title: "Entreprise",
    subtitle1: "Bien-être et performance au travail",
    text1:
      "Offrez à vos équipes une expérience de coaching dédiée, directement sur le lieu de travail.",
    subtitle2: "Des bénéfices concrets",
    text2:
      "Diminution du stress, amélioration de la productivité et meilleure ambiance.",
    btnClass: "button button-black",
    cardClass: "coaching__types__card coaching__types__card-business",
  },
];

const DRAG_THRESHOLD = 10;
const MAX_DRAG = 50;
const ROTATE_OFFSET = 5;

function useIsMobile(breakpoint = 768) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth <= breakpoint);
    };

    checkIsMobile();
    window.addEventListener("resize", checkIsMobile);
    return () => window.removeEventListener("resize", checkIsMobile);
  }, [breakpoint]);

  return isMobile;
}

const Type = () => {
  const [index, setIndex] = useState(1);
  const [dragX, setDragX] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [hovered, setHovered] = useState<number | null>(null);
  const startXRef = useRef<number | null>(null);
  const startTouchX = useRef<number | null>(null);

  const isMobile = useIsMobile();

  const onMouseDown = (e: React.MouseEvent) => {
    startXRef.current = e.clientX;
    setIsDragging(true);
  };

  const onMouseMove = (e: MouseEvent) => {
    if (!isDragging || startXRef.current === null) return;
    const diff = e.clientX - startXRef.current;
    const limitedDiff = Math.max(-MAX_DRAG, Math.min(MAX_DRAG, diff));
    setDragX(limitedDiff);
  };

  const onMouseUp = () => {
    if (!isDragging) return;

    if (dragX > DRAG_THRESHOLD) {
      setIndex((prev) => (prev === 0 ? TYPES.length - 1 : prev - 1));
    } else if (dragX < -DRAG_THRESHOLD) {
      setIndex((prev) => (prev === TYPES.length - 1 ? 0 : prev + 1));
    }

    setIsDragging(false);
    setDragX(0);
  };

  const onTouchStart = (e: React.TouchEvent) => {
    startTouchX.current = e.touches[0].clientX;
    setIsDragging(true);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    if (startTouchX.current === null) return;
    const diff = e.touches[0].clientX - startTouchX.current;
    const limitedDiff = Math.max(-MAX_DRAG, Math.min(MAX_DRAG, diff));
    setDragX(limitedDiff);
  };

  const onTouchEnd = () => {
    if (dragX > DRAG_THRESHOLD) {
      setIndex((prev) => (prev === 0 ? TYPES.length - 1 : prev - 1));
    } else if (dragX < -DRAG_THRESHOLD) {
      setIndex((prev) => (prev === TYPES.length - 1 ? 0 : prev + 1));
    }
    setIsDragging(false);
    setDragX(0);
    startTouchX.current = null;
  };

  useEffect(() => {
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
    };
  }, [isDragging, dragX]);

  return (
    <div className="wrapper-1440-black " id="page__coaching__wrapper__types">
      <section className="coaching__types" role="list" aria-label="Nos types de coaching">
        <h2 className="coaching__types__title">Nos types de coaching</h2>
        <div
          className={`type__slider3d ${isDragging ? "is-grabbing" : ""}`}
          role="list"
          aria-label="Types de coaching"
          onMouseDown={onMouseDown}
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
        >
          {TYPES.map((type, i) => {
            const pos = ((i - index + TYPES.length) % TYPES.length);
            let transform = "";
            let zIndex = 1;
            const rotateBoost = dragX !== 0 ? (dragX > 0 ? ROTATE_OFFSET : -ROTATE_OFFSET) : 0;
            let baseScale = 1;
            const translateXSide = isMobile ? 20 : 25;

            if (pos === 0) {
              baseScale = 1;
              transform = `translateX(calc(-50% + ${dragX}px)) rotateY(${rotateBoost}deg) translateZ(0rem)`;
              zIndex = 2;
            } else if (pos === 1) {
              baseScale = 0.96;
              transform = `translateX(calc(-50% + ${dragX}px)) rotateY(${5 + rotateBoost}deg) translateX(${translateXSide}rem)`;
            } else if (pos === TYPES.length - 1) {
              baseScale = 0.96;
              transform = `translateX(calc(-50% + ${dragX}px)) rotateY(${-5 + rotateBoost}deg) translateX(-${translateXSide}rem)`;
            } else {
              return null;
            }

            const isHovered = hovered === i;

            const scale = pos === 0 ? (isHovered ? 1.025 : 1) : isHovered ? 0.985 : baseScale;
            const opacity = isMobile ? 1 : pos === 0 ? 1 : 0.7;
            const filter = isHovered || pos === 0 ? "none" : "blur(0px)";
            const boxShadow = pos === 0 ? "0 1.5rem 4rem rgba(0, 0, 0, 0.3)" : "none";
            const extraClass = pos === 0 ? "no-blur" : "";

            return (
              <div
                key={type.key}
                className={`${type.cardClass} ${pos !== 0 ? "is-side" : ""} ${extraClass}`}
                style={{ transform: `${transform} scale(${scale})`, zIndex, opacity, filter, boxShadow }}
                onMouseEnter={() => setHovered(i)}
                onMouseLeave={() => setHovered(null)}
                tabIndex={0}
                role="listitem"
                aria-label={`${type.title} type de coaching`}
              >
                <h3 className="coaching__types__card__title title">{type.title}</h3>
                <div className="coaching__types__card__content">
                  <h4>{type.subtitle1}</h4>
                  <p>{type.text1}</p>
                  <h4>{type.subtitle2}</h4>
                  <p>{type.text2}</p>
                </div>
                <div className="coaching__types__card__cta">
                  <a href="contact" className={type.btnClass}>Commencez</a>
                </div>
              </div>
            );
          })}
        </div>
        <div className="type__controls">
          <button
            className="type__prev"
            aria-label="Type précédent"
            type="button"
            onClick={() => setIndex((prev) => (prev === 0 ? TYPES.length - 1 : prev - 1))}
          />
          <span className="type__index">{index + 1} <div>/ {TYPES.length}</div></span>
          <button
            className="type__next"
            aria-label="Type suivant"
            type="button"
            onClick={() => setIndex((prev) => (prev === TYPES.length - 1 ? 0 : prev + 1))}
          />
        </div>
      </section>
    </div>
  );
};

export default Type;
