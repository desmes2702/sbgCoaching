import { useMemo } from "react";
import { ui, cx } from "@/js/forms/uiClasses.ts";

interface ProgressProps {
  currentStepIndex: number;
  maxReachableStep: number;
  steps: string[];
  goToStep: (index: number) => void;
}

export default function Progress({ currentStepIndex, maxReachableStep, steps, goToStep }: ProgressProps) {
  return (
    <nav aria-label="Progression" className="progress">
      {steps.map((stepName, index) => {
        const isClickable = index <= maxReachableStep;
        const isCurrent = index === currentStepIndex;
        return (
          <button
            key={stepName}
            type="button"
            className={cx(
              ui.progressStep,
              isCurrent && ui.progressStepCurrent,
              isClickable && ui.progressStepClickable,
              !isClickable && ui.progressStepLocked
            )}
            onClick={() => isClickable && goToStep(index)}
            disabled={!isClickable}
            aria-current={isCurrent ? "step" : undefined}
            aria-disabled={!isClickable}
            tabIndex={!isClickable ? -1 : undefined}
          >
            <span className={ui.progressLabel}>{stepName}</span>
          </button>
        );
      })}
    </nav>
  );
}