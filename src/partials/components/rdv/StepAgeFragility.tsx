// src/partials/components/rdv/StepAgeFragility.tsx
import React from "react";
import type { StepAgeFragilityProps } from "@/js/types/rdvTypes.ts";
import { ui, cx } from "@/js/forms/uiClasses.ts";
import { AGE_MIN, AGE_MAX, MIN_FRAGILITY_CHARS, validateAgeFragility, canProceedAgeFragility } from "@/js/validation/rdvValidation.ts";

export default function StepAgeFragility({ data, onChange, onPrev, onNext, canNext }: StepAgeFragilityProps) {
  const warnings = validateAgeFragility(data);
  const valid = canProceedAgeFragility(data);

  return (
    <section className={cx("step", "step-agefragility", ui.form)} data-step="ageFragility">
      <fieldset className={cx(ui.fieldset)}>
        <legend className={cx(ui.legend)} data-step-title tabIndex={-1}>Âge & fragilité</legend>

        <div className={cx(ui.group)}>
          <label htmlFor="age" className={cx(ui.label)}>Âge <span aria-hidden="true">*</span></label>
          <input
            id="age"
            className={cx(ui.input)}
            type="number"
            min={AGE_MIN}
            max={AGE_MAX}
            inputMode="numeric"
            value={data.age === "" ? "" : data.age}
            onChange={(e) => onChange({ age: e.currentTarget.value === "" ? "" : e.currentTarget.valueAsNumber })}
            aria-invalid={Boolean(warnings.age)}
            aria-describedby="age-hint"
            required
          />
          <p id="age-hint" className={cx(ui.hint)}>{warnings.age || `Entre ${AGE_MIN} et ${AGE_MAX} ans.`}</p>
        </div>

        <fieldset className={cx(ui.group)}>
          <legend className={cx(ui.label)}>Avez‑vous une fragilité/handicap physique ? <span aria-hidden="true">*</span></legend>
          <div className={cx(ui.grid)}>
            {[
              { id: "yes", label: "Oui" },
              { id: "no",  label: "Non" },
              { id: "na",  label: "Ne souhaite pas préciser" },
            ].map(opt => {
              const id = `frag-${opt.id}`;
              const checked = data.isSeniorOrFragile === opt.id;
              return (
                <label key={opt.id} htmlFor={id} className={cx(ui.choice, checked && ui.choiceSelected)}>
                  <input
                    id={id}
                    type="radio"
                    className={cx(ui.radio)}
                    name="fragility"
                    checked={checked}
                    onChange={() => onChange({ isSeniorOrFragile: opt.id as any })}
                  />
                  <span>{opt.label}</span>
                </label>
              );
            })}
          </div>
        </fieldset>

        {data.isSeniorOrFragile === "yes" && (
          <div className={cx(ui.group)}>
            <label htmlFor="fragilityNotes" className={cx(ui.label)}>
              Précisez vos limitations (min. {MIN_FRAGILITY_CHARS} caractères)
            </label>
            <textarea
              id="fragilityNotes"
              className={cx(ui.textarea)}
              rows={3}
              value={data.fragilityNotes}
              onChange={(e) => onChange({ fragilityNotes: e.target.value })}
              aria-invalid={Boolean(warnings.fragilityNotes)}
            />
            {warnings.fragilityNotes && <p className={cx(ui.error)} role="alert">{warnings.fragilityNotes}</p>}
          </div>
        )}
      </fieldset>

      <div className={cx(ui.actions)}>
        <button type="button" className={cx(ui.prev)} onClick={onPrev}>Retour</button>
        <button type="button" className={cx(ui.next)} onClick={onNext} disabled={!canNext || !valid} aria-disabled={!canNext || !valid}>
          Continuer
        </button>
      </div>
    </section>
  );
}
