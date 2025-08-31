// FILE: src/js/forms/rdv/steps/StepCoord.tsx
/**
 * @file Step 5: Contact Information and GDPR Consent
 */
// FILE: src/js/forms/rdv/steps/StepCoord.tsx
/**
 * @file Step 5: Contact Information and GDPR Consent
 */
import React, { useState } from "react";
import type { StepProps } from "../types/rdvTypes.ts"; // Corrected path

// Debounce utility (simple implementation)
const debounce = (func: (...args: any[]) => void, delay: number) => {
  let timeout: NodeJS.Timeout;
  return (...args: any[]) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), delay);
  };
};

const preferredSlotOptions = ["Matin", "Midi", "Après-midi", "Soir"];

const StepCoord: React.FC<StepProps> = ({ state, dispatch, mode = 'full', validationErrors }) => {
  const { coord } = state.data;
  const errors = validationErrors || {}; // Use validationErrors from props

  // State to track touched fields for onBlur validation
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const handleBlur = (field: string) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
  };

  // Debounced message handler
  const debouncedSetMessage = React.useCallback(
    debounce((value: string) => {
      dispatch({ type: "SET_MESSAGE", payload: value });
    }, 300),
    [dispatch]
  );

  const handleMessageChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    // Update local state immediately for smooth typing experience
    // The actual state update via dispatch will be debounced
    debouncedSetMessage(e.target.value);
  };


  return (
    <fieldset className={mode === 'inline' ? 'fieldset--inline' : ''}>
      {mode === 'full' && <legend className="legend">Vos coordonnées</legend>}

      <div className="rdv-form__group">
        <div className="field">
          <label htmlFor="firstName" className="field__label">Prénom</label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            className={`field__input ${touched.firstName && errors.firstName ? 'field__input--invalid' : ''}`}
            value={coord.firstName}
            onChange={(e) => dispatch({ type: "SET_FIRST_NAME", payload: e.target.value })}
            onBlur={() => handleBlur("firstName")}
            autoComplete="given-name"
            aria-invalid={!!errors.firstName}
            aria-describedby={errors.firstName ? "firstName-error" : undefined}
            required
          />
          {touched.firstName && errors.firstName && (
            <p id="firstName-error" className="field__error">{errors.firstName}</p>
          )}
        </div>

        <div className="field">
          <label htmlFor="lastName" className="field__label">Nom</label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            className={`field__input ${touched.lastName && errors.lastName ? 'field__input--invalid' : ''}`}
            value={coord.lastName}
            onChange={(e) => dispatch({ type: "SET_LAST_NAME", payload: e.target.value })}
            onBlur={() => handleBlur("lastName")}
            autoComplete="family-name"
            aria-invalid={!!errors.lastName}
            aria-describedby={errors.lastName ? "lastName-error" : undefined}
            required
          />
          {touched.lastName && errors.lastName && (
            <p id="lastName-error" className="field__error">{errors.lastName}</p>
          )}
        </div>
      </div>

      <div className="rdv-form__group">
        <div className="field">
          <label htmlFor="email" className="field__label">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            className={`field__input ${touched.email && errors.email ? 'field__input--invalid' : ''}`}
            value={coord.email}
            onChange={(e) => dispatch({ type: "SET_EMAIL", payload: e.target.value })}
            onBlur={() => handleBlur("email")}
            inputMode="email"
            autoComplete="email"
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? "email-error" : undefined}
            required
          />
          {touched.email && errors.email && (
            <p id="email-error" className="field__error">{errors.email}</p>
          )}
        </div>

        <div className="field">
          <label htmlFor="phone" className="field__label">Téléphone</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            className={`field__input ${touched.phone && errors.phone ? 'field__input--invalid' : ''}`}
            value={coord.phone}
            onChange={(e) => dispatch({ type: "SET_PHONE", payload: e.target.value })}
            onBlur={() => handleBlur("phone")}
            inputMode="tel"
            autoComplete="tel"
            aria-invalid={!!errors.phone}
            aria-describedby={errors.phone ? "phone-error" : undefined}
            required
          />
          {touched.phone && errors.phone && (
            <p id="phone-error" className="field__error">{errors.phone}</p>
          )}
        </div>
      </div>

      <div className="field">
        <label htmlFor="preferredSlot" className="field__label">Créneau préféré (optionnel)</label>
        <select
          id="preferredSlot"
          name="preferredSlot"
          className="field__input"
          value={coord.preferredSlot}
          onChange={(e) => dispatch({ type: "SET_PREFERRED_SLOT", payload: e.target.value })}
        >
          <option value="">-- Choisir --</option>
          {preferredSlotOptions.map(slot => (
            <option key={slot} value={slot}>{slot}</option>
          ))}
        </select>
      </div>

      <div className="field">
        <label htmlFor="message" className="field__label">Votre message (optionnel)</label>
        <textarea
          id="message"
          name="message"
          className={`field__input ${touched.message && errors.message ? 'field__input--invalid' : ''}`}
          value={coord.message}
          onChange={handleMessageChange} // Use debounced handler
          onBlur={() => handleBlur("message")}
          rows={4}
          aria-invalid={!!errors.message}
          aria-describedby={errors.message ? "message-error" : undefined}
        />
        {touched.message && errors.message && (
          <p id="message-error" className="field__error">{errors.message}</p>
        )}
      </div>

      <div className="field field--checkbox">
        <input
          type="checkbox"
          id="consentRgpd"
          name="consentRgpd"
          className={`field__input ${touched.consentRgpd && errors.consentRgpd ? 'field__input--invalid' : ''}`}
          checked={coord.consentRgpd}
          onChange={(e) => dispatch({ type: "SET_CONSENT_RGPD", payload: e.target.checked })}
          onBlur={() => handleBlur("consentRgpd")}
          aria-invalid={!!errors.consentRgpd}
          aria-describedby={errors.consentRgpd ? "consentRgpd-error" : "rgpd-hint"}
          required
        />
        <label htmlFor="consentRgpd" className="field__label">
          J’accepte que SBG Coaching traite mes données pour me recontacter concernant ma demande de RDV.{" "}
          <a href="/privacy-policy" target="_blank" rel="noopener noreferrer" id="rgpd-hint">En savoir plus dans la Politique de confidentialité</a>.
        </label>
        {touched.consentRgpd && errors.consentRgpd && (
          <p id="consentRgpd-error" className="field__error">{errors.consentRgpd}</p>
        )}
      </div>
    </fieldset>
  );
};

export default StepCoord;