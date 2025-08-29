import { useMemo, useState } from "react";
import { DURATION_OPTIONS } from "@/js/data/rdv/duration.ts";
import type { DurationValue } from "@/js/types/rdvTypes.ts";
import { validateDuration, canProceedDuration } from "@/js/validation/rdvValidation.ts";
import type { StepDurationProps } from "@/js/types/rdvTypes.ts";
import { ui, cx } from "@/js/forms/uiClasses.ts";

export default function StepDuration({ data, onChange, onPrev, onNext, canNext = false }: StepDurationProps) {
  const [touched, setTouched] = useState({ durationId: false, durationCustom: false });
  const warnings = useMemo(() => validateDuration(data), [data]);
  const isOther = data.durationId === "other";
  const localValid = canProceedDuration(data);
  const canProceed = canNext && localValid;

  function handleSelect(id: string) {
    setTouched(t => ({ ...t, durationId: true }));
    onChange({ durationId: id as DurationValue });
    if (id !== "other" && data.durationCustom) {
      onChange({ durationCustom: "" });
    }
  }
  function handleOtherText(txt: string) {
    setTouched(t => ({ ...t, durationCustom: true }));
    onChange({ durationId: "other", durationCustom: txt });
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (canProceed) onNext?.();
  }

  return (
    <form className={ui.form} onSubmit={handleSubmit} aria-labelledby="step-duration-title">
      <fieldset className={ui.fieldset}>
        <legend className={cx(ui.legend, ui.title)} id="step-duration-title">
          Durée du coaching <span className={ui.srOnly}>(obligatoire)</span>
        </legend>
        <div className={ui.chips} role="radiogroup" aria-required="true">
          {DURATION_OPTIONS.map(opt => (
            <label className={cx(ui.chip, data.durationId === opt.id ? ui.choiceSelected : undefined)} key={opt.id}>
              <input
                type="radio"
                name="durationId"
                value={opt.id}
                checked={data.durationId === opt.id}
                onChange={() => handleSelect(opt.id)}
                className={ui.radio}
                required
                aria-checked={data.durationId === opt.id}
              />
              <span>{opt.label}</span>
            </label>
          ))}
        </div>
        {isOther && (
          <div className={ui.group}>
            <label className={ui.label} htmlFor="durationCustom">
              Précisez votre durée
            </label>
            <input
              id="durationCustom"
              name="durationCustom"
              type="text"
              className={ui.input}
              value={data.durationCustom}
              onChange={e => handleOtherText(e.target.value)}
              onBlur={() => setTouched(t => ({ ...t, durationCustom: true }))}
              aria-required="true"
              aria-invalid={!!warnings.durationCustom}
              required
            />
            {touched.durationCustom && warnings.durationCustom && (
              <div className={ui.error}>{warnings.durationCustom}</div>
            )}
          </div>
        )}
      </fieldset>
      <div className={ui.actions}>
        {onPrev && (
          <button type="button" className={ui.prev} onClick={() => onPrev()}>
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
