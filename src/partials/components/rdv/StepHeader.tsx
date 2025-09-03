// src/partials/components/rdv/StepHeader.tsx
import React, { useEffect, useId, useMemo, useRef } from "react";
import type { JSX } from "react";
import type { StepHeaderProps } from "@/js/types/rdvTypes.ts";
import { ui, cx } from "@/js/forms/uiClasses.ts";

export default function StepHeader({ step, total, timeLeftMin }: StepHeaderProps): JSX.Element {
  const autoId = useId();
  const regionId = `step-header-${autoId}`;
  const liveRef = useRef<HTMLParagraphElement | null>(null);

  const safeTotal = Math.max(1, total || 1);
  const safeStep = Math.min(Math.max(1, step || 1), safeTotal);
  const percent = useMemo(() => Math.round(((safeStep - 1) / safeTotal) * 100), [safeStep, safeTotal]);
  const human = `${safeStep}/${safeTotal}`;
  const timeLabel = typeof timeLeftMin === "number" ? `~${timeLeftMin} min restantes` : "";

  useEffect(() => {
    if (liveRef.current) {
      liveRef.current.textContent = `Étape ${safeStep} sur ${safeTotal}.`;
    }
  }, [safeStep, safeTotal]);

  return (
    <header className={cx(ui.stepHeader)} role="region" aria-labelledby={`${regionId}-title`} aria-describedby={`${regionId}-desc`}>
      <div className={cx(ui.stepHeaderBar)} aria-hidden="true">
        <div className={cx(ui.stepHeaderFill)} style={{ width: `${percent}%` }} />
      </div>

      <div className={cx(ui.stepHeaderMeta)}>
        <h2 id={`${regionId}-title`} className={cx(ui.title)} data-step-title tabIndex={-1}>
          Votre demande de rendez‑vous
        </h2>
        <div className={cx(ui.info)}>
          <span id={`${regionId}-counter`} className={cx(ui.counter)}>
            Étape <strong>{human}</strong>
          </span>
          {timeLabel && <span className={cx(ui.eta)}>{timeLabel}</span>}
        </div>
        <p id={`${regionId}-desc`} ref={liveRef} className={cx(ui.srOnly)} aria-live="polite" />
      </div>
    </header>
  );
}
