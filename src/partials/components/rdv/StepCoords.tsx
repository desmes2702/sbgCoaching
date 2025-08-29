import { useMemo, useState } from "react";
import { validateCoords, canProceedCoords } from "@/js/validation/rdvValidation.ts";
import type { StepCoordsProps, AppointmentData } from "@/js/types/rdvTypes.ts";
import { ui } from "@/js/forms/uiClasses.ts";

export default function StepCoords({ data, onChange, onPrev, onNext, canNext = false }: StepCoordsProps) {
  const warnings = useMemo(() => validateCoords(data), [data]);
  const [touched, setTouched] = useState({
    firstname: false,
    lastname: false,
    email: false,
    phone: false,
    notes: false,
    consent: false
  });

  const localValid = canProceedCoords(data);
  const canProceed = canNext && localValid;

  function handleField(key: keyof AppointmentData, value: string | boolean) {
    onChange({ [key]: value } as Partial<AppointmentData>);
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (canProceed) onNext?.();
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Vos coordonnées (obligatoire)</h2>
      <div>
        <label>
          Prénom *
          <input
            type="text"
            value={data.firstname}
            onChange={e => handleField("firstname", e.target.value)}
            onBlur={() => setTouched(t => ({ ...t, firstname: true }))}
            aria-invalid={Boolean((touched.firstname || data.firstname) && warnings.firstname)}
            required
            className={ui.input}
          />
        </label>
        {(touched.firstname || data.firstname) && warnings.firstname && (
          <div className={ui.error}>{warnings.firstname}</div>
        )}
      </div>
      <div>
        <label>
          Nom *
          <input
            type="text"
            value={data.lastname}
            onChange={e => handleField("lastname", e.target.value)}
            onBlur={() => setTouched(t => ({ ...t, lastname: true }))}
            aria-invalid={Boolean((touched.lastname || data.lastname) && warnings.lastname)}
            required
            className={ui.input}
          />
        </label>
        {(touched.lastname || data.lastname) && warnings.lastname && (
          <div className={ui.error}>{warnings.lastname}</div>
        )}
      </div>
      <div>
        <label>
          E‑mail *
          <input
            type="email"
            value={data.email}
            onChange={e => handleField("email", e.target.value)}
            onBlur={() => setTouched(t => ({ ...t, email: true }))}
            aria-invalid={Boolean((touched.email || data.email) && warnings.email)}
            required
            className={ui.input}
          />
        </label>
        {(touched.email || data.email) && warnings.email && (
          <div className={ui.error}>{warnings.email}</div>
        )}
      </div>
      <div>
        <label>
          Téléphone *
          <input
            type="tel"
            value={data.phone}
            onChange={e => handleField("phone", e.target.value)}
            onBlur={() => setTouched(t => ({ ...t, phone: true }))}
            aria-invalid={Boolean((touched.phone || data.phone) && warnings.phone)}
            required
            className={ui.input}
          />
        </label>
        {(touched.phone || data.phone) && warnings.phone && (
          <div className={ui.error}>{warnings.phone}</div>
        )}
      </div>
      <div>
        <label>
          Message (optionnel)
          <textarea
            value={data.notes}
            onChange={e => handleField("notes", e.target.value)}
            onBlur={() => setTouched(t => ({ ...t, notes: true }))}
            aria-invalid={Boolean((touched.notes || data.notes) && warnings.notes)}
            rows={2}
            className={ui.textarea}
          />
        </label>
      </div>
      <div>
        <label>
          <input
            type="checkbox"
            checked={data.consentAccepted}
            onChange={e => handleField("consentAccepted", e.target.checked)}
            onBlur={() => setTouched(t => ({ ...t, consent: true }))}
            aria-invalid={Boolean(warnings.consentAccepted)}
            required
          />
          J’accepte que mes données soient utilisées pour me recontacter.
        </label>
        {warnings.consentAccepted && (
          <div className={ui.error}>{warnings.consentAccepted}</div>
        )}
      </div>
      <div className={ui.actions}>
        {onPrev && (
          <button type="button" className={ui.prev} onClick={onPrev}>
            Précédent
          </button>
        )}
        <button type="submit" className={ui.next} disabled={!canProceed}>
          Suivant
        </button>
      </div>
    </form>
  );
}
