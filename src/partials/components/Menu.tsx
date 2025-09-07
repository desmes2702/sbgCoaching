// src/partials/components/Menu.tsx - Version corrigée FR

import { useEffect, useRef, useState } from "react";

interface MenuProps {
  variant?: "white" | "black";
  "client:load"?: boolean;
  "client:idle"?: boolean;
  "client:visible"?: boolean;
  "client:media"?: string;
  "client:only"?: boolean | string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}

const Menu: React.FC<MenuProps> = ({
  variant = "white",
  "client:only": _clientOnly,
  "client:load": _clientLoad,
  "client:idle": _clientIdle,
  "client:visible": _clientVisible,
  "client:media": _clientMedia,
  ...otherProps
}) => {
  const isWhite = variant === "white";
  const wrapperClass = isWhite ? "wrapper-1440-black" : "wrapper-1440";

  const [isClient, setIsClient] = useState(false);
  useEffect(() => setIsClient(true), []);

  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const openBtnRef = useRef<HTMLButtonElement>(null);
  const lastFocusedRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!isClient) return;
    const menu = menuRef.current;
    if (!menu) return;

    if (isOpen) {
      document.body.classList.add("scroll-locked");
      requestAnimationFrame(() => {
        menu.classList.add("menu-open");
        const first = menu.querySelector<HTMLElement>('a[href], button:not([disabled]), [tabindex="0"]');
        first?.focus();
      });
    } else {
      document.body.classList.remove("scroll-locked");
      menu.classList.remove("menu-open");
      lastFocusedRef.current?.focus();
    }
  }, [isClient, isOpen]);

  useEffect(() => {
    if (!isClient) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) setIsOpen(false);
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isClient, isOpen]);

  const trapFocus = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key !== "Tab" || !menuRef.current) return;
    const focusable = menuRef.current.querySelectorAll<HTMLElement>('a[href], button:not([disabled]), [tabindex="0"]');
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  };

  if (!isClient) {
    return (
      <div className={wrapperClass}>
        <header className="header">
          <div className="header__container">
            <div className={`header__logo ${variant === "black" ? "header__logo-black" : ""}`}>
              <a href="/" className="header__logo-link">
                <img id="menu__logo" src={`/img/logo-${variant === "black" ? "black" : "white"}.svg`} alt="Logo SBG Coaching" />
              </a>
            </div>
            <nav className={`header__nav ${variant === "black" ? "header__nav-black" : ""}`}>
              <ul className="header__nav-list">
                <li className="header__nav-item">
                  <span>coaching</span>
                  <a href="/coaching-entreprise" className="header__nav-link link-underline-appear">Entreprise</a>
                </li>
                <li className="header__nav-item">
                  <span>coaching</span>
                  <a href="/coaching-general" className="header__nav-link link-underline-appear">Général</a>
                </li>
              </ul>
            </nav>
            <button
              className="header__btn__menu menu__toggle"
              aria-label="Ouvrir le menu"
              aria-controls="menu"
              aria-expanded="false"
              disabled
              tabIndex={-1}
              style={{ opacity: 0.5, pointerEvents: "none" }}
            >
              <img id="menu__icon" src={`/img/icon__burger-${variant === "black" ? "black" : "white"}.svg`} alt="Ouvrir le menu" />
            </button>
          </div>
        </header>
      </div>
    );
  }

  return (
    <div className={wrapperClass} suppressHydrationWarning>
      <header className="header" suppressHydrationWarning>
        <div className="header__container">
          <div className={`header__logo ${variant === "black" ? "header__logo-black" : ""}`}>
            <a href="/" className="header__logo-link">
              <img id="menu__logo" src={`/img/logo-${variant === "black" ? "black" : "white"}.svg`} alt="Logo SBG Coaching" />
            </a>
          </div>
          <nav className={`header__nav ${variant === "black" ? "header__nav-black" : ""}`} suppressHydrationWarning>
            <ul className="header__nav-list">
              <li className="header__nav-item">
                <span>coaching</span>
                <a href="/coaching-entreprise" className="header__nav-link link-underline-appear">Entreprise</a>
              </li>
              <li className="header__nav-item">
                <span>coaching</span>
                <a href="/coaching-general" className="header__nav-link link-underline-appear">Général</a>
              </li>
            </ul>
          </nav>
          <button
            ref={openBtnRef}
            className="header__btn__menu menu__toggle"
            aria-label="Ouvrir le menu"
            aria-controls="menu"
            aria-expanded={isOpen}
            onClick={() => {
              lastFocusedRef.current = document.activeElement as HTMLElement;
              setIsOpen(true);
            }}
          >
            <img id="menu__icon" src={`/img/icon__burger-${variant === "black" ? "black" : "white"}.svg`} alt="Ouvrir le menu" />
          </button>
        </div>
      </header>
      <div
        ref={menuRef}
        id="menu"
        className="menu"
        role="dialog"
        aria-modal="true"
        tabIndex={-1}
        onKeyDown={trapFocus}
      >
        <button className="menu__close" aria-label="Fermer le menu" onClick={() => setIsOpen(false)}>
          ×
        </button>
        <nav className="menu__nav">
          <section className="menu__section">
            <h2 className="menu__title">Informations</h2>
            <ul className="menu__list">
              <li className="menu__item"><a href="/" className="menu__link link-underline-appear">Accueil</a></li>
              <li className="menu__item"><a href="/temoignages" className="menu__link link-underline-appear">Témoignages</a></li>
              <li className="menu__item"><a href="/a-propos" className="menu__link link-underline-appear">À propos</a></li>
              <li className="menu__item"><a href="/contact" className="menu__link link-underline-appear">Contact</a></li>
              <li className="menu__item menu__item__rdv">
                <a href="/contact" className="menu__link link-underline-replay">Prise de rendez-vous</a>
              </li>
            </ul>
          </section>
          <section className="menu__section">
            <h2 className="menu__title">Coaching</h2>
            <ul className="menu__list">
              <li className="menu__item">
                <a href="/coaching-entreprise" className="menu__link link-underline-appear">Entreprise</a>
              </li>
              <li className="menu__item">
                <a href="/coaching-sportif-video" className="menu__link link-underline-appear">Vidéos</a>
              </li>
              <li className="menu__item">
                <a href="/coaching-general" className="menu__link link-underline-appear">Général</a>
              </li>
            </ul>
          </section>
          <section className="menu__section menu__section__profil">
            <h2 className="menu__title">Mon espace</h2>
            <ul className="menu__list">
              <li className="menu__item menu__item__program">
                <a href="#my-programs" className="menu__link link-underline-appear">Mes programmes</a>
              </li>
              <li className="menu__item menu__item__info">
                <a href="#my-info" className="menu__link link-underline-appear">Mes informations</a>
              </li>
              <li className="menu__item menu__item__disconnect">
                <a href="#logout" className="menu__link link-underline-appear">Se déconnecter</a>
              </li>
            </ul>
          </section>
        </nav>
      </div>
    </div>
  );
};

export default Menu;

