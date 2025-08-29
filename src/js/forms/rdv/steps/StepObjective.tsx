// FILE: src/js/forms/rdv/steps/StepObjective.tsx
/**
 * @file Step 4: User's Objective
 */
import React from "react";
import type { StepProps } from "../types/rdvTypes.ts";
import { MIN_OBJECTIVE_LENGTH, validateObjective } from "../utils/validation.ts"; // Import validateObjective

const StepObjective: React.FC<StepProps> = ({ state, dispatch, mode = 'full' }) => {
  const { objective } = state.data;
  const validationResult = validateObjective(state.data); // Get validation result
  const objectiveError = validationResult.errors.objective; // Get specific error for objective

  const charCount = objective.trim().length;
  // const isError = charCount > 0 && charCount < MIN_OBJECTIVE_LENGTH; // This logic is now handled by validateObjective

  const errorId = "objective-error"; // Unique ID for the error message

  return (
    <div className={`form-group ${mode === 'inline' ? 'form-group--inline' : ''}`}>
        <label htmlFor="objective" className="legend">
          Votre objectif
        </label>
        <textarea
          id="objective"
          name="objective"
          value={objective}
          onChange={(e) =>
            dispatch({ type: "SET_OBJECTIVE", payload: e.target.value })
          }
          className={`textarea ${objectiveError ? "textarea--error" : ""}`} // Use objectiveError for styling
          rows={6}
          required
          minLength={MIN_OBJECTIVE_LENGTH}
          aria-describedby={objectiveError ? errorId : "objective-footer"} // Link to error message or hint
          aria-invalid={!!objectiveError} // Add aria-invalid
        />
        <div id="objective-footer" style={{display: 'flex', justifyContent: 'space-between'}}>
          {objectiveError ? ( // Display error message if present
            <p id={errorId} className="form__field-error" aria-live="polite">
              {objectiveError}
            </p>
          ) : (
            <span />
          )}
          <p
            className={`char-counter ${objectiveError ? "form__field-error" : ""}`} // Use objectiveError for styling
            aria-live="polite"
          >
            {charCount} / {MIN_OBJECTIVE_LENGTH}+
          </p>
        </div>
      </div>
  );
};

export default StepObjective;