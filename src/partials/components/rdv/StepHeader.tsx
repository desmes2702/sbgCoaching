import React, { useEffect, useId, useMemo, useRef } from "react";
import type { JSX } from "react";
import type { StepHeaderProps } from "@/js/types/rdvTypes.ts";
import { ui, cx } from "@/js/forms/uiClasses.ts";

export default function StepHeader({ step, total, timeLeftMin }: StepHeaderProps): JSX.Element {
  const autoId = useId();
  const regionId = `step-header-${autoId}`;
  const liveRef = useRef<HTMLDivElement | null>(null);
  const safeTotal = Math.max(1, total || 1);
  const safeStep = Math.min(Math.max(1, step || 1), safeTotal);
  const percent = useMemo(
    () => Math.round(((safeStep - 1) / safeTotal) * 100),
    [safeStep, safeTotal]
  );
  const human = `${safeStep}/${safeTotal}`;
  const timeLabel =
    typeof timeLeftMin === "number" ? `~${timeLeftMin} min restantes` : "";

  useEffect(() => {
    if (liveRef.current) {
      liveRef.current.textContent = `Étape ${safeStep} sur ${safeTotal}.`;
    }
  }, [safeStep, safeTotal]);

  return (
    <header className={ui.stepHeader} aria-labelledby={regionId}>
      <div id={regionId} className={ui.title}>
        <span className={ui.counter}>
          Étape {human}
        </span>
        {timeLabel && <span className={ui.eta}>{timeLabel}</span>}
      </div>
      <div
        className={ui.stepHeaderBar}
        aria-hidden="true"
      >
        <div
          className={ui.stepHeaderFill}
          style={{ width: `${percent}%` }}
        />
      </div>
      <div ref={liveRef} className="sr-only" role="status" aria-live="polite" />
    </header>
  );
}
