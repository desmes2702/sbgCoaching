// src/partials/components/rdv/StepType.tsx
import type { StepTypeProps } from "@/js/types/rdvTypes.ts";
import { ui, cx } from "@/js/forms/uiClasses.ts";

export default function StepType({ data, onChange, onNext }: StepTypeProps) {
  const options = [
    { id: "entreprise",  label: "Entreprise" },
    { id: "particulier", label: "Particulier" },
  ] as const;

  const enabled = Boolean(data.typeId);

  function handleContinue() {
    if (!enabled) {
      // UX: focus sur la 1ère radio pour guider l’utilisateur
      const first = document.querySelector<HTMLInputElement>('input[name="type"]');
      first?.focus();
      return;
    }
    onNext?.();
  }

  return (
    <section className={cx("step", "step-type", ui.form)} data-step="type">
      <fieldset className={cx(ui.fieldset)}>
        <legend className={cx(ui.legend)} data-step-title tabIndex={-1}>
          Type de rendez‑vous
        </legend>

        <div className={cx(ui.grid)}>
          {options.map((opt) => {
            const selected = data.typeId === opt.id;
            const id = `type-${opt.id}`;
            return (
              <label key={opt.id} htmlFor={id} className={cx(ui.choice, selected && ui.choiceSelected)}>
                <input
                  id={id}
                  type="radio"
                  className={cx(ui.radio)}
                  name="type"
                  checked={selected}
                  onChange={() => onChange(opt.id)}
                />
                <span>{opt.label}</span>
              </label>
            );
          })}
        </div>
      </fieldset>

      <div className={cx(ui.actions)}>
        {/* Ne PAS utiliser l’attribut disabled (évite tout blocage CSS/overlay).
           On expose juste aria-disabled pour l’accessibilité visuelle. */}
        <button
          type="button"
          className={cx(ui.next)}
          onClick={handleContinue}
          aria-disabled={!enabled}
          data-enabled={enabled ? "1" : "0"}
        >
          Continuer
        </button>
      </div>
    </section>
  );
}
