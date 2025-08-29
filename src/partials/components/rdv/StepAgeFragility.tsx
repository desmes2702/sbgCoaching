import type { StepAgeFragilityProps } from "@/js/types/rdvTypes.ts";
import type { YesNoNa } from "@/js/types/rdvTypes.ts";
import { AGE_MIN, AGE_MAX, MIN_FRAGILITY_CHARS, validateAgeFragility, canProceedAgeFragility } from "@/js/validation/rdvValidation.ts";
import { ui, cx } from "@/js/forms/uiClasses.ts";
import { useState } from "react";

const fragilityChoices = [
  { id: "yes", label: "Oui" },
  { id: "no", label: "Non" },
  { id: "na", label: "Ne souhaite pas préciser" }
];

export default function StepAgeFragility({ data, onChange, onPrev, onNext, canNext }: StepAgeFragilityProps) {
  const [touched, setTouched] = useState({ age: false, fragilityNotes: false });
  const warnings = validateAgeFragility(data);
  const valid = canProceedAgeFragility(data);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (valid) onNext?.();
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>
          Âge*
          <input
            type="number"
            min={AGE_MIN}
            max={AGE_MAX}
            value={data.age}
            onChange={e => onChange({ age: e.target.value === "" ? "" : Number(e.target.value) })}
            onBlur={() => setTouched(t => ({ ...t, age: true }))}
            className={ui.input}
            required
          />
        </label>
        {(touched.age || data.age) && warnings.age && (
          <div className={ui.error}>{warnings.age}</div>
        )}
      </div>
      <div>
        <div>Fragilité*</div>
        {fragilityChoices.map(opt => (
          <label key={opt.id} className={ui.choice}>
            <input
              type="radio"
              name="fragility"
              value={opt.id}
              checked={data.isSeniorOrFragile === opt.id}
              onChange={e => onChange({ isSeniorOrFragile: e.target.value as YesNoNa })}
            />
            {opt.label}
          </label>
        ))}
      </div>
      {data.isSeniorOrFragile === "yes" && (
        <div>
          <label>
            Détails
            <textarea
              value={data.fragilityNotes}
              onChange={e => onChange({ fragilityNotes: e.target.value })}
              onBlur={() => setTouched(t => ({ ...t, fragilityNotes: true }))}
              minLength={MIN_FRAGILITY_CHARS}
              className={ui.textarea}
              required
            />
          </label>
          {(touched.fragilityNotes || data.fragilityNotes) && warnings.fragilityNotes && (
            <div className={ui.error}>{warnings.fragilityNotes}</div>
          )}
        </div>
      )}
      <div className={ui.actions}>
        {onPrev && (
          <button type="button" className={ui.prev} onClick={onPrev}>
            Précédent
          </button>
        )}
        <button type="submit" className={ui.next} disabled={!canNext}>
          Suivant
        </button>
      </div>
    </form>
  );
}
