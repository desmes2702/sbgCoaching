import { useEffect, useState } from "react";

declare global {
  interface Window {
    grecaptcha: any;
  }
}

const AUTO_SAVE_KEY = "sbg_contact_form_draft";
const COMPLETION_TIME = "2 min pour remplir ce formulaire";
const RECAPTCHA_SITE_KEY = import.meta.env.VITE_RECAPTCHA_SITE_KEY;

function ContactForm() {
  const [form, setForm] = useState({
    lastname: "",
    firstname: "",
    phone: "",
    email: "",
    message: "",
    terms: false,
    honeypot: "",
  });

  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});
  const [startTime] = useState(Date.now());
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean | null>(null);
  const [isFormValid, setIsFormValid] = useState(false);
  const [showRedirectMsg, setShowRedirectMsg] = useState(false);

  // Autosave/load
  useEffect(() => {
    const saved = localStorage.getItem(AUTO_SAVE_KEY);
    if (saved) setForm(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem(AUTO_SAVE_KEY, JSON.stringify(form));
  }, [form]);

  // Validation globale
  useEffect(() => {
    const noErrors = Object.values(validationErrors).every((e) => !e);
    const allRequiredFilled = Boolean(form.lastname && form.firstname && form.email && form.message && form.terms);
    setIsFormValid(noErrors && allRequiredFilled);
  }, [validationErrors, form]);

  // Redirection après succès
  useEffect(() => {
    if (showRedirectMsg) {
      const timer = setTimeout(() => {
        window.location.href = "/thanks";
      }, 1800);
      return () => clearTimeout(timer);
    }
  }, [showRedirectMsg]);

  // Charge le script reCAPTCHA v3
  useEffect(() => {
    if (!RECAPTCHA_SITE_KEY) return;
    if (document.getElementById("recaptcha-script")) return;
    const script = document.createElement("script");
    script.id = "recaptcha-script";
    script.src = `https://www.google.com/recaptcha/api.js?render=${RECAPTCHA_SITE_KEY}`;
    script.async = true;
    document.body.appendChild(script);
    return () => {
      if (document.getElementById("recaptcha-script")) {
        document.body.removeChild(script);
      }
    };
  }, []);

  const validateField = (name: string, value: string | boolean) => {
    let error = "";
    if ((name === "lastname" || name === "firstname" || name === "message") && !value) {
      error = "Ce champ est requis.";
    }
    if (name === "email" && typeof value === "string") {
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
        error = "Adresse email invalide.";
      }
    }
    if (name === "phone" && typeof value === "string" && value.length > 0) {
      if (!/^0\d{2,3}[ .-]?\d{2}[ .-]?\d{2}[ .-]?\d{2}$/.test(value)) {
        error = "Format téléphone incorrect (ex : 0494 20 50 75).";
      }
    }
    if (name === "terms" && value !== true) {
      error = "Vous devez accepter les conditions.";
    }
    setValidationErrors((prev) => ({ ...prev, [name]: error }));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    const checked = type === "checkbox" ? (e.target as HTMLInputElement).checked : undefined;
    const fieldValue: string | boolean = type === "checkbox" ? checked! : value;
    setForm((prev) => ({ ...prev, [name]: fieldValue }));
    validateField(name, fieldValue);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (Date.now() - startTime < 3000) {
      setError("Merci de patienter au moins 3 secondes avant de valider.");
      return;
    }

    if (form.honeypot) return;

    // Validation finale
    let hasError = false;
    Object.entries(form).forEach(([k, v]) => {
      validateField(k, v);
      if (validationErrors[k]) hasError = true;
    });
    if (hasError || !isFormValid) {
      setError("Merci de corriger les erreurs avant d'envoyer.");
      return;
    }

    try {
      let recaptchaToken = "";
      if (window.grecaptcha && RECAPTCHA_SITE_KEY) {
        await new Promise<void>((resolve) => window.grecaptcha.ready(resolve));
        recaptchaToken = await window.grecaptcha.execute(RECAPTCHA_SITE_KEY, { action: "submit" });
      }

      if (!recaptchaToken) {
        console.warn("⚠️ Aucun token reCAPTCHA généré");
        throw new Error("Token reCAPTCHA vide !");
      }

      console.log("✅ reCAPTCHA token :", recaptchaToken);
      console.log("📤 Données envoyées :", { ...form, recaptchaToken });

      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, recaptchaToken }),
      });

      console.log("📥 Réponse brute :", res);

      if (!res.ok) {
        const errText = await res.text();
        console.error("❌ Erreur backend :", errText);
        throw new Error("Erreur côté serveur");
      }

      const result = await res.json();

      if (result.success) {
        setSuccess(true);
        setShowRedirectMsg(true);
        setForm({
          lastname: "",
          firstname: "",
          phone: "",
          email: "",
          message: "",
          terms: false,
          honeypot: "",
        });
        localStorage.removeItem(AUTO_SAVE_KEY);
        return;
      } else {
        setSuccess(false);
        setError(result.error || "Erreur lors de l'envoi.");
      }
    } catch (err) {
      console.error("❌ Erreur réseau :", err);
      setSuccess(false);
      setError("Erreur réseau, veuillez réessayer.");
    }
  };

  return (
    <div className="wrapper-982-black">
      <section id="footer-contact-form" className="contact__form section-height90">
        <h2 className="contact__title title">Formulaire de contact</h2>
        <p className="contact__time-estimate" aria-hidden="true">
          {COMPLETION_TIME}
        </p>
        <p className="contact__intro">
          Toutes les informations inscrites dans ce formulaire seront directement envoyées à notre boîte mail.
        </p>

        <form onSubmit={handleSubmit} noValidate>
          <input
            type="text"
            name="honeypot"
            value={form.honeypot}
            onChange={handleChange}
            hidden
            tabIndex={-1}
            aria-hidden="true"
          />

          <div className="contact__wrapper-col1">
            <fieldset className="contact__personal">
              <legend>Informations personnelles</legend>
              <label htmlFor="lastname" className="contact__label">
                Nom*
              </label>
              <input
                type="text"
                id="lastname"
                name="lastname"
                className={`contact__input ${validationErrors.lastname ? "no-margin" : ""}`}
                required
                aria-required="true"
                autoComplete="family-name"
                value={form.lastname}
                onChange={handleChange}
              />
              {validationErrors.lastname && <p className="form__error">{validationErrors.lastname}</p>}

              <label htmlFor="firstname" className="contact__label">
                Prénom*
              </label>
              <input
                type="text"
                id="firstname"
                name="firstname"
                className={`contact__input ${validationErrors.firstname ? "no-margin" : ""}`}
                required
                aria-required="true"
                autoComplete="given-name"
                value={form.firstname}
                onChange={handleChange}
              />
              {validationErrors.firstname && <p className="form__error">{validationErrors.firstname}</p>}
            </fieldset>

            <fieldset className="contact__information">
              <legend>Coordonnées</legend>
              <label htmlFor="phone" className="contact__label">
                Téléphone
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                className={`contact__input ${validationErrors.phone ? "no-margin" : ""}`}
                autoComplete="tel"
                placeholder="04XX XX XX XX"
                value={form.phone}
                onChange={handleChange}
              />
              {validationErrors.phone && <p className="form__error">{validationErrors.phone}</p>}

              <label htmlFor="email" className="contact__label">
                Email*
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className={`contact__input ${validationErrors.email ? "no-margin" : ""}`}
                required
                aria-required="true"
                autoComplete="email"
                placeholder="exemple@domaine.com"
                value={form.email}
                onChange={handleChange}
              />
              {validationErrors.email && <p className="form__error">{validationErrors.email}</p>}
            </fieldset>
          </div>

          <div className="contact__wrapper-col2">
            <fieldset className="contact__message">
              <legend>Votre message</legend>
              <label htmlFor="message" className="contact__label">
                Message*
              </label>
              <textarea
                id="message"
                name="message"
                className={`contact__textarea ${validationErrors.message ? "no-margin" : ""}`}
                required
                aria-required="true"
                value={form.message}
                onChange={handleChange}
              />
              {validationErrors.message && <p className="form__error">{validationErrors.message}</p>}
            </fieldset>

            <fieldset className="contact__terms">
              <div>
                <input
                  type="checkbox"
                  id="terms"
                  name="terms"
                  required
                  aria-required="true"
                  checked={form.terms}
                  onChange={handleChange}
                />
                <label htmlFor="terms">
                  J'accepte les <a href="/LegalMentions" target="_blank">mentions légales</a> et les{" "}
                  <a href="/PrivacyPolicy" target="_blank">conditions d'utilisation</a>.
                </label>
              </div>
              {validationErrors.terms && <p className="form__error">{validationErrors.terms}</p>}
            </fieldset>

            {error && <p className="form__error" role="alert">{error}</p>}
            {success === true && <p className="form__success" role="status">Votre message a bien été envoyé 🎉</p>}
            {success === false && <p className="form__error" role="alert">Erreur lors de l'envoi du formulaire.</p>}
            {showRedirectMsg && <p className="form__success" role="status">Redirection en cours...</p>}

            <button
              type="submit"
              className={`contact__button button button-red ${isFormValid ? "" : "button-disabled"}`}
              aria-label="Envoyer le formulaire de contact"
              disabled={!isFormValid}
            >
              Envoyer
            </button>
          </div>
        </form>
      </section>
    </div>
  );
}

export default ContactForm;
