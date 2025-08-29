import type { StepObjectiveProps } from "@/js/types/rdvTypes.ts";
import { MIN_OBJECTIVE_CHARS, canProceedObjective } from "@/js/validation/rdvValidation.ts";
import { ui, cx } from "@/js/forms/uiClasses.ts";
import { useState } from "react";

export default function StepObjective({ data, onChange, onPrev, onNext, canNext }: StepObjectiveProps) {
  const [touched, setTouched] = useState(false);
  const valid = canProceedObjective(data);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (valid) onNext?.();
  }

  return (
    <form className={ui.form} onSubmit={handleSubmit} aria-labelledby="step-objective-title">
      <fieldset className={ui.fieldset}>
        <legend className={cx(ui.legend, ui.title)} id="step-objective-title">
          Votre objectif <span className={ui.srOnly}>(obligatoire)</span>
        </legend>
        <div className={ui.group}>
          <label className={ui.label} htmlFor="objectiveNotes">
            Merci de préciser votre objectif :
          </label>
          <textarea
            id="objectiveNotes"
            name="objectiveNotes"
            className={ui.textarea}
            value={data.objectiveNotes}
            onChange={e => onChange({ objectiveNotes: e.target.value })}
            onBlur={() => setTouched(true)}
            minLength={MIN_OBJECTIVE_CHARS}
            required
            aria-required="true"
            aria-invalid={!!(!valid && (touched || data.objectiveNotes))}
            aria-describedby="objective-hint"
            rows={3}
          />
          <div id="objective-hint" className={ui.hint}>
            {data.objectiveNotes.length < MIN_OBJECTIVE_CHARS
              ? `Minimum ${MIN_OBJECTIVE_CHARS} caractères (${MIN_OBJECTIVE_CHARS - data.objectiveNotes.length} restants)`
              : "Objectif valide"}
          </div>
        </div>
      </fieldset>
      <div className={ui.actions}>
        {onPrev && (
          <button type="button" className={ui.prev} onClick={() => onPrev()}>
            Précédent
          </button>
        )}
        <button type="submit" className={ui.next} disabled={!valid}>
          Suivant
        </button>
      </div>
    </form>
  );
}
