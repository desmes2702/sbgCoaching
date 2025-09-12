// src/partials/components/rdv/StepCoords.tsx
import { useMemo, useState, useId } from "react";
import type { StepCoordsProps, AppointmentData } from "@/js/types/rdvTypes.ts";
import { ui, cx } from "@/js/forms/uiClasses.ts";
import { validateCoords, canProceedCoords, type CoordsWarnings } from "@/js/validation/rdvValidation.ts";

export default function StepCoords({ data, onChange, onPrev, onNext, canNext = false }: StepCoordsProps) {
  const autoId = useId();
  const baseId = `coords-${autoId}`;

  const warnings = useMemo<CoordsWarnings>(() => validateCoords(data), [data]);
  const [touched, setTouched] = useState({
    firstname: false,
    lastname: false,
    email: false,
    phone: false,
    notes: false,
    consent: false,
  });

  const show = (k: keyof typeof touched) => {
    const mapData: Record<keyof typeof touched, unknown> = {
      firstname: data.firstname,
      lastname: data.lastname,
      email: data.email,
      phone: data.phone,
      notes: data.notes,
      consent: data.consentAccepted,
    };
    const mapWarn: Record<keyof typeof touched, unknown> = {
      firstname: warnings.firstname,
      lastname: warnings.lastname,
      email: warnings.email,
      phone: warnings.phone,
      notes: undefined,
      consent: warnings.consentAccepted,
    };
    return Boolean((touched[k] || mapData[k]) && mapWarn[k]);
  };
  const localValid = canProceedCoords(data);
  const canProceed = canNext && localValid;

  const onField =
    <K extends keyof AppointmentData>(key: K) =>
    (v: AppointmentData[K]) =>
      onChange({ [key]: v } as Partial<AppointmentData>);

  return (
    <section className={cx("step", "step-coords", ui.form)} role="group" aria-labelledby={`${baseId}-title`}>
      <h3 id={`${baseId}-title`} className={cx(ui.title)} data-step-title tabIndex={-1}>Vos coordonnées</h3>

      <div className={cx(ui.group)} id="coords-firstname">
        <label htmlFor={`${baseId}-firstname`} className={cx(ui.label)}>Prénom <span aria-hidden="true">*</span></label>
        <input
          id={`${baseId}-firstname`}
          className={cx(ui.input)}
          type="text"
          autoComplete="given-name"
          value={data.firstname}
          onChange={(e) => onField("firstname")(e.target.value)}
          onBlur={() => setTouched((t) => ({ ...t, firstname: true }))}
          aria-invalid={show("firstname")}
        />
        {show("firstname") && <p className={cx(ui.error)} role="alert">{warnings.firstname}</p>}
      </div>

      <div className={cx(ui.group)} id="coords-lastname">
        <label htmlFor={`${baseId}-lastname`} className={cx(ui.label)}>Nom <span aria-hidden="true">*</span></label>
        <input
          id={`${baseId}-lastname`}
          className={cx(ui.input)}
          type="text"
          autoComplete="family-name"
          value={data.lastname}
          onChange={(e) => onField("lastname")(e.target.value)}
          onBlur={() => setTouched((t) => ({ ...t, lastname: true }))}
          aria-invalid={show("lastname")}
        />
        {show("lastname") && <p className={cx(ui.error)} role="alert">{warnings.lastname}</p>}
      </div>

      <div className={cx(ui.group)} id="coords-email">
        <label htmlFor={`${baseId}-email`} className={cx(ui.label)}>E‑mail <span aria-hidden="true">*</span></label>
        <input
          id={`${baseId}-email`}
          className={cx(ui.input)}
          type="email"
          inputMode="email"
          autoComplete="email"
          value={data.email}
          onChange={(e) => onField("email")(e.target.value)}
          onBlur={() => setTouched((t) => ({ ...t, email: true }))}
          aria-invalid={show("email")}
        />
        {show("email") && <p className={cx(ui.error)} role="alert">{warnings.email}</p>}
      </div>

      <div className={cx(ui.group)} id="coords-phone">
        <label htmlFor={`${baseId}-phone`} className={cx(ui.label)}>Téléphone <span aria-hidden="true">*</span></label>
        <input
          id={`${baseId}-phone`}
          className={cx(ui.input)}
          type="tel"
          inputMode="tel"
          autoComplete="tel"
          value={data.phone}
          onChange={(e) => onField("phone")(e.target.value)}
          onBlur={() => setTouched((t) => ({ ...t, phone: true }))}
          aria-invalid={show("phone")}
          placeholder="+32 4xx xx xx xx"
        />
        {show("phone") && <p className={cx(ui.error)} role="alert">{warnings.phone}</p>}
      </div>

      <div className={cx(ui.group)}>
        <label htmlFor={`${baseId}-notes`} className={cx(ui.label)}>Message (optionnel)</label>
        <textarea
          id={`${baseId}-notes`}
          className={cx(ui.textarea)}
          rows={3}
          value={data.notes}
          onChange={(e) => onField("notes")(e.target.value)}
          onBlur={() => setTouched((t) => ({ ...t, notes: true }))}
        />
      </div>

      <label className={cx(ui.check)} id="coords-consent">
        <input
          type="checkbox"
          checked={data.consentAccepted}
          onChange={(e) => onField("consentAccepted")(e.target.checked)}
          onBlur={() => setTouched((t) => ({ ...t, consent: true }))}
          aria-invalid={Boolean(warnings.consentAccepted)}
        />
        <span>J’accepte que mes données soient utilisées pour me recontacter.</span>
      </label>
      {Boolean(warnings.consentAccepted) && <p className={cx(ui.error)} role="alert">{warnings.consentAccepted}</p>}

      <div className={cx(ui.actions)}>
        <button type="button" className={cx(ui.prev)} onClick={onPrev}>Retour</button>
        <button type="button" className={cx(ui.next)} onClick={onNext} aria-disabled={!canProceed} tabIndex={!canProceed ? -1 : 0}>
          Continuer
        </button>
      </div>
    </section>
  );
}
