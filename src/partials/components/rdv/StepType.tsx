import type { StepTypeProps } from "@/js/types/rdvTypes.ts";
import { ui, cx } from "@/js/forms/uiClasses.ts";

const options = [
  { id: "entreprise", label: "Entreprise" },
  { id: "particulier", label: "Particulier" },
] as const;

export default function StepType({ data, onChange, onNext }: StepTypeProps) {
  const enabled = Boolean(data.typeId);

  function handleContinue(e: React.FormEvent) {
    e.preventDefault();
    if (!enabled) {
      const first = document.querySelector('input[name="type"]') as HTMLElement | null;
      first?.focus();
      return;
    }
    onNext?.();
  }

  return (
    <div className={ui.form} aria-labelledby="step-type-title" role="group">
      <fieldset className={ui.fieldset}>
        <legend className={cx(ui.legend, ui.title)} id="step-type-title">
          Type de coaching <span className={ui.srOnly}>(obligatoire)</span>
        </legend>
        <div className={ui.group} role="radiogroup" aria-required="true">
          {options.map(opt => (
            <label className={cx(ui.choice, data.typeId === opt.id ? ui.choiceSelected : undefined)} key={opt.id}>
              <input
                type="radio"
                name="type"
                value={opt.id}
                checked={data.typeId === opt.id}
                onChange={() => onChange(opt.id)}
                className={ui.radio}
                required
                aria-checked={data.typeId === opt.id}
              />
              <span>{opt.label}</span>
            </label>
          ))}
        </div>
      </fieldset>
      <div className={ui.actions}>
        <button type="button" className={ui.next} disabled={!enabled} onClick={handleContinue}>
          Suivant
        </button>
      </div>
    </div>
  );
}
