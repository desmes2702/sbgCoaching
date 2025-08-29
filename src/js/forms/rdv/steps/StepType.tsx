// FILE: src/js/forms/rdv/steps/StepType.tsx
/**
 * @file Step 1: User Type Selection
 */
import React from "react";
import type { StepProps } from "../types/rdvTypes.ts";
import { validateType } from "../utils/validation.ts"; // Import validateType

const options = [
  { id: "particulier", label: "Particulier" },
  { id: "entreprise", label: "Entreprise" },
] as const;

const StepType: React.FC<StepProps> = ({ state, dispatch, mode = 'full' }) => {
  const { userType } = state.data;
  const validationResult = validateType(state.data); // Get validation result
  const userTypeError = validationResult.errors.userType; // Get specific error for userType

  const errorId = "userType-error"; // Unique ID for the error message

  return (
    <fieldset className={mode === 'inline' ? 'fieldset--inline' : ''}>
        {mode === 'full' && <legend className="legend" id="userType-legend">Vous êtes...</legend>}
        <div
          className="radio-card-group"
          role="radiogroup"
          aria-labelledby={mode === 'full' ? 'userType-legend' : undefined} // Link to legend for accessibility
        >
          {options.map((opt) => (
            <div
              key={opt.id}
              className={`radio-card ${
                userType === opt.id ? "radio-card--checked" : ""
              }`}
            >
              <input
                type="radio"
                id={`userType-${opt.id}`}
                name="userType"
                value={opt.id}
                checked={userType === opt.id}
                onChange={() => dispatch({ type: "SET_USER_TYPE", payload: opt.id })}
                className="radio-card__input"
                aria-invalid={!!userTypeError} // Add aria-invalid
                aria-describedby={userTypeError ? errorId : undefined} // Link to error message
              />
              <label
                htmlFor={`userType-${opt.id}`}
                className="radio-card__label"
              >
                {opt.label}
              </label>
            </div>
          ))}
        </div>
        {userTypeError && ( // Display error message if present
          <p id={errorId} className="form__field-error">
            {userTypeError}
          </p>
        )}
      </fieldset>
  );
};

export default StepType;