// FILE: src/js/forms/rdv/components/Progress.tsx
import React from "react";
import type { RdvAction } from "../types/rdvTypes.ts";

interface ProgressProps {
  currentStep: number;
  maxReachableStep: number;
  steps: string[];
  dispatch: React.Dispatch<RdvAction>;
}

const Progress: React.FC<ProgressProps> = ({
  currentStep,
  maxReachableStep,
  steps,
  dispatch,
}) => {
  console.log("Progress Component Render:");
  console.log("  currentStep:", currentStep);
  console.log("  maxReachableStep:", maxReachableStep);

  return (
    <nav aria-label="Progression du formulaire">
      <ol role="list" className="progress-steps">
        {steps.map((stepName, index) => {
          console.log(`  Step ${index} (${stepName}):`);
          console.log(`    index < currentStep: ${index < currentStep}`);
          console.log(`    index <= maxReachableStep: ${index <= maxReachableStep}`);
          console.log(`    isDone: ${index < currentStep || index <= maxReachableStep}`);
          console.log(`    isClickable: ${index <= maxReachableStep}`);

          return (
            <li
              key={stepName}
              aria-current={index === currentStep ? "step" : undefined}
              className={`progress-step ${
                index === currentStep ? "progress-step--current" : ""
              } ${index <= maxReachableStep ? "progress-step--completed" : ""}`}
            >
              {index < currentStep && <span aria-hidden="true">✓</span>}
              <button
                type="button"
                disabled={index > maxReachableStep}
                onClick={() => dispatch({ type: "GO_TO_STEP", payload: index })}
              >
                {stepName}
              </button>
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default React.memo(Progress);