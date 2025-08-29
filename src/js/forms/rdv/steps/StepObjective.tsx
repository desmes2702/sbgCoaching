// FILE: src/js/forms/rdv/steps/StepObjective.tsx
/**
 * @file Step 4: User's Objective
 */
import React from "react";
import type { StepProps } from "../types/rdvTypes.ts";
import { MIN_OBJECTIVE_LENGTH } from "../utils/validation.ts";

const StepObjective: React.FC<StepProps> = ({ state, dispatch, mode = 'full' }) => {
  const { objective } = state.data;
  const charCount = objective.trim().length;
  const isError = charCount > 0 && charCount < MIN_OBJECTIVE_LENGTH;

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
          className={`textarea ${isError ? "textarea--error" : ""}`}
          rows={6}
          required
          minLength={MIN_OBJECTIVE_LENGTH}
          aria-describedby="objective-footer"
        />
        <div id="objective-footer" style={{display: 'flex', justifyContent: 'space-between'}}>
          {isError ? (
            <p className="form__error" aria-live="polite">
              Minimum {MIN_OBJECTIVE_LENGTH} caractères requis.
            </p>
          ) : (
            <span />
          )}
          <p
            className={`char-counter ${isError ? "form__error" : ""}`}
            aria-live="polite"
          >
            {charCount} / {MIN_OBJECTIVE_LENGTH}+
          </p>
        </div>
      </div>
  );
};

export default StepObjective;
