// FILE: src/js/forms/rdv/steps/StepType.tsx
/**
 * @file Step 1: User Type Selection
 */
import React from "react";
import type { StepProps } from "../types/rdvTypes.ts";

const options = [
  { id: "particulier", label: "Particulier" },
  { id: "entreprise", label: "Entreprise" },
] as const;

const StepType: React.FC<StepProps> = ({ state, dispatch, mode = 'full' }) => {
  const { userType } = state.data;

  return (
    <fieldset className={mode === 'inline' ? 'fieldset--inline' : ''}>
        {mode === 'full' && <legend className="legend">Vous êtes...</legend>}
        <div
          className="radio-card-group"
          role="radiogroup"
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
      </fieldset>
  );
};

export default StepType;
