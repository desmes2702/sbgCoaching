import { useEffect, useState } from "react";

const AUTO_SAVE_KEY = "sbg_contact_form_draft";
const COMPLETION_TIME = "2 min pour remplir ce formulaire";

function ContactForm() {
  const [form, setForm] = useState({
    lastname: "",
    firstname: "",
    phone: "",
    email: "",
    message: "",
    terms: false,
    honeypot: ""
  });

  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});
  const [startTime] = useState(Date.now());
  const [error, setError] = useState<string | null>(null);
  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem(AUTO_SAVE_KEY);
    if (saved) setForm(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem(AUTO_SAVE_KEY, JSON.stringify(form));
  }, [form]);

  useEffect(() => {
    const noErrors = Object.values(validationErrors).every(e => !e);
    const allRequiredFilled = Boolean(form.lastname && form.firstname && form.email && form.message && form.terms);
    setIsFormValid(noErrors && allRequiredFilled);
  }, [validationErrors, form]);

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
      if (!/^(\+32\s?[1-9]{1}[0-9]?\s?\d{2}\s?\d{2}\s?\d{2}|\b0[1-9]{1}[0-9]?\s?\d{2}\s?\d{2}\s?\d{2})$/.test(value)) {
        error = "Format téléphone incorrect (ex : 0494 20 50 75).";
      }
    }

    if (name === "terms" && value !== true) {
      error = "Vous devez accepter les conditions.";
    }

    setValidationErrors(prev => ({ ...prev, [name]: error }));
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    const checked = type === "checkbox" ? (e.target as HTMLInputElement).checked : undefined;
    const fieldValue: string | boolean = type === "checkbox" ? checked! : value;
    setForm(prev => ({ ...prev, [name]: fieldValue }));
    validateField(name, fieldValue);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (Date.now() - startTime < 3000) {
      setError("Merci de patienter au moins 3 secondes avant de valider.");
      return;
    }
    if (form.honeypot) return;
    localStorage.removeItem(AUTO_SAVE_KEY);
    e.currentTarget.submit();
  };

  return (
    <div className="wrapper-982-black">
      <section id="footer-contact-form" className="contact__form section-height90 scroll-reveal">
        <h2 className="contact__title title">Formulaire de contact</h2>
        <p className="contact__time-estimate" aria-hidden="true">{COMPLETION_TIME}</p>
        <p className="contact__intro">Toutes les informations inscrites dans ce formulaire seront directement envoyées à notre boîte mail.</p>

        <form onSubmit={handleSubmit} action="/submit" method="post" noValidate>
          <input type="text" name="honeypot" value={form.honeypot} onChange={handleChange} hidden tabIndex={-1} aria-hidden="true" />

          <div className="contact__wrapper-col1">
            <fieldset className="contact__personal">
              <legend>Informations personnelles</legend>
              <label htmlFor="lastname" className="contact__label">Nom*</label>
              <input type="text" id="lastname" name="lastname" className={`contact__input ${validationErrors.lastname ? 'no-margin' : ''}`} required aria-required="true" autoComplete="family-name" value={form.lastname} onChange={handleChange} />
              {validationErrors.lastname && <p className="form__error" role="alert">{validationErrors.lastname}</p>}

              <label htmlFor="firstname" className="contact__label">Prénom*</label>
              <input type="text" id="firstname" name="firstname" className={`contact__input ${validationErrors.firstname ? 'no-margin' : ''}`} required aria-required="true" autoComplete="given-name" value={form.firstname} onChange={handleChange} />
              {validationErrors.firstname && <p className="form__error" role="alert">{validationErrors.firstname}</p>}
            </fieldset>

            <fieldset className="contact__information">
              <legend>Coordonnées</legend>
              <label htmlFor="phone" className="contact__label">Téléphone</label>
              <input type="tel" id="phone" name="phone" className={`contact__input ${validationErrors.phone ? 'no-margin' : ''}`} autoComplete="tel" pattern="^(\+32\s?[1-9]{1}[0-9]?\s?\d{2}\s?\d{2}\s?\d{2}|\b0[1-9]{1}[0-9]?\s?\d{2}\s?\d{2}\s?\d{2})$" placeholder="04XX XX XX XX" value={form.phone} onChange={handleChange} />
              {validationErrors.phone && <p className="form__error" role="alert">{validationErrors.phone}</p>}
              <label htmlFor="email" className="contact__label">Email*</label>
              <input type="email" id="email" name="email" className={`contact__input ${validationErrors.email ? 'no-margin' : ''}`} required aria-required="true" autoComplete="email" placeholder="exemple@domaine.com" value={form.email} onChange={handleChange} />
              {validationErrors.email && <p className="form__error" role="alert">{validationErrors.email}</p>}
            </fieldset>
          </div>

          <div className="contact__wrapper-col2">
            <fieldset className="contact__message">
              <legend>Votre message</legend>
              <label htmlFor="message" className="contact__label">Message*</label>
              <textarea id="message" name="message" className={`contact__textarea ${validationErrors.message ? 'no-margin' : ''}`} required aria-required="true" value={form.message} onChange={handleChange}></textarea>
              {validationErrors.message && <p className="form__error" role="alert">{validationErrors.message}</p>}
            </fieldset>

            <fieldset className="contact__terms">
              <div><input type="checkbox" id="terms" name="terms" required aria-required="true" checked={form.terms} onChange={handleChange} />
              <label htmlFor="terms">
                J'accepte les <a href="/LegalMentions" target="_blank">mentions légales</a> et les <a href="/PrivacyPolicy" target="_blank">conditions d'utilisation</a>.
              </label></div>
              {validationErrors.terms && <p className="form__error" role="alert">{validationErrors.terms}</p>}
            </fieldset>

            <fieldset className="contact__recaptcha">
              <div className="g-recaptcha" data-sitekey="VOTRE_SITE_KEY"></div>
            </fieldset>

            {error && <p className="form__error" role="alert">{error}</p>}

            <button
              type="submit"
              className={`contact__button button button-red ${isFormValid ? '' : 'button-disabled'}`}
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
