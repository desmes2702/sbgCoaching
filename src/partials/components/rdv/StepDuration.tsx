// src/partials/components/rdv/StepDuration.tsx
import { useId, useMemo, useState } from "react";
import type { StepDurationProps } from "@/js/types/rdvTypes.ts";
import { ui, cx } from "@/js/forms/uiClasses.ts";
import { DURATION_OPTIONS } from "@/js/data/rdv/duration.ts";
import { validateDuration, canProceedDuration, type DurationWarnings } from "@/js/validation/rdvValidation.ts";

export default function StepDuration({ data, onChange, onPrev, onNext, canNext = false }: StepDurationProps) {
  const autoId = useId();
  const baseId = `duration-${autoId}`;

  const [touched, setTouched] = useState({ durationId: false, durationCustom: false });
  const warnings = useMemo<DurationWarnings>(() => validateDuration(data), [data]);

  const isOther = data.durationId === "other";
  const localValid = canProceedDuration(data);
  const canProceed = canNext && localValid;

  function setVal<K extends keyof StepDurationProps["data"]>(key: K, v: StepDurationProps["data"][K]) {
    onChange({ [key]: v } as Partial<StepDurationProps["data"]>);
  }

  function handleSelect(id: StepDurationProps["data"]["durationId"]) {
    setTouched((t) => ({ ...t, durationId: true }));
    setVal("durationId", id);
    if (id !== "other" && data.durationCustom) setVal("durationCustom", "");
  }

  function handleOtherText(txt: string) {
    setTouched((t) => ({ ...t, durationCustom: true }));
    onChange({ durationId: "other", durationCustom: txt });
  }

  function handleNextClick() {
    setTouched({ durationId: true, durationCustom: true });
    onNext?.();
  }

  return (
    <section className={cx("step", "step-duration", ui.form)} data-step="duration">
      
        <fieldset className={cx(ui.fieldset)}>
          <legend className={cx(ui.legend)} data-step-title tabIndex={-1}>
            Durée souhaitée
          </legend>

          <div className={cx(ui.grid)} id="duration-options">
            {DURATION_OPTIONS.map(opt => {
              const id = `${baseId}-${opt.id}`;
              const checked = data.durationId === opt.id;
              return (
                <label key={opt.id} htmlFor={id} className={cx(ui.choice, checked && ui.choiceSelected)}>
                  <input
                    id={id}
                    name={`${baseId}-radios`}
                    type="radio"
                    className={cx(ui.radio)}
                    checked={checked}
                    onChange={() => handleSelect(opt.id)}
                    aria-invalid={touched.durationId && Boolean(warnings.durationId)}
                  />
                  <span>{opt.label}</span>
                </label>
              );
            })}
          </div>

          {isOther && (
            <div className={cx(ui.group)} id="duration-custom">
              <label htmlFor={`${baseId}-custom`} className={cx(ui.label)}>Précision(s)</label>
              <input
                id={`${baseId}-custom`}
                className={cx(ui.input)}
                type="text"
                value={data.durationCustom}
                onChange={(e) => handleOtherText(e.target.value)}
                aria-invalid={touched.durationCustom && Boolean(warnings.durationCustom)}
              />
              {warnings.durationCustom && <p className={cx(ui.error)} role="alert">{warnings.durationCustom}</p>}
            </div>
          )}

          {touched.durationId && warnings.durationId && <p className={cx(ui.error)} role="alert">{warnings.durationId}</p>}
        </fieldset>

        <div className={cx(ui.actions)}>
          <button type="button" className={cx(ui.prev)} onClick={onPrev}>Retour</button>
          <button type="button" className={cx(ui.next)} aria-disabled={!canProceed} onClick={handleNextClick}>
            Continuer
          </button>
        </div>
    </section>
  );
}
