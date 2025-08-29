// FILE: src/js/forms/rdv/components/Progress.tsx
/**
 * @file Displays the progress of the multi-step form.
 */
import React from "react";
import type { RdvAction } from "../types/rdvTypes.ts";

interface ProgressProps {
  currentStep: number;
  maxReachableStep: number;
  steps: string[];
  dispatch: React.Dispatch<RdvAction>;
}

const Progress: React.FC<ProgressProps> = ({ currentStep, maxReachableStep, steps, dispatch }) => {
  return (
    <nav aria-label="Progression du formulaire">
      <div className="progress">
        {steps.map((label, index) => {
          return (
            <button
              type="button"
              data-step={index}
              key={label}
              className={[
                "progress__step",
                index === currentStep ? "progress__step--current" : "",
                index <= maxReachableStep ? "progress__step--clickable" : "progress__step--locked"
              ].filter(Boolean).join(" ")}
              aria-current={index === currentStep ? "step" : undefined}
              aria-disabled={index > maxReachableStep}
              disabled={index > maxReachableStep}
              tabIndex={index > maxReachableStep ? -1 : 0}
              onClick={() => dispatch({ type: "GO_TO_STEP", payload: index })}
            >
              <span className="progress__label">{label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};

export default Progress;
