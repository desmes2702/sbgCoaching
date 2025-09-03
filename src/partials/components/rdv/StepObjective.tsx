// src/partials/components/rdv/StepObjective.tsx
import type { StepObjectiveProps } from "@/js/types/rdvTypes.ts";
import { ui, cx } from "@/js/forms/uiClasses.ts";
import { MIN_OBJECTIVE_CHARS, canProceedObjective } from "@/js/validation/rdvValidation.ts";

export default function StepObjective({ data, onChange, onPrev, onNext, canNext }: StepObjectiveProps) {
  const valid = canProceedObjective(data);

  return (
    <section className={cx("step", "step-objective", ui.form)} data-step="objective">
      <fieldset className={cx(ui.fieldset)}>
        <legend className={cx(ui.legend)} data-step-title tabIndex={-1}>
          Votre objectif principal
        </legend>

        <div className={cx(ui.group)}>
          <label htmlFor="objectiveNotes" className={cx(ui.label)}>
            Décrivez brièvement votre objectif <span aria-hidden="true">*</span>
          </label>
          <textarea
            id="objectiveNotes"
            className={cx(ui.textarea)}
            rows={4}
            value={data.objectiveNotes}
            onChange={(e) => onChange({ objectiveNotes: e.target.value })}
            placeholder="Perte de poids, remise en forme, préparation d’un événement, santé…"
            required
            aria-invalid={!valid}
            aria-describedby="objective-hint"
          />
          <p id="objective-hint" className={cx(ui.hint)}>
            {data.objectiveNotes.trim().length}/{MIN_OBJECTIVE_CHARS} caractères min.
          </p>
        </div>
      </fieldset>

      <div className={cx(ui.actions)}>
        <button type="button" className={cx(ui.prev)} onClick={onPrev}>Retour</button>
        <button
          type="button"
          className={cx(ui.next)}
          onClick={onNext}
          disabled={!canNext || !valid}
          aria-disabled={!canNext || !valid}
        >
          Continuer
        </button>
      </div>
    </section>
  );
}
