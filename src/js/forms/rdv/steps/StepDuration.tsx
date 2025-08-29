// FILE: src/js/forms/rdv/steps/StepDuration.tsx
/**
 * @file Step 2: Duration Selection
 */
import React from "react";
import type { StepProps, DurationKey } from "../types/rdvTypes.ts";
import { MIN_CUSTOM_DURATION, MAX_CUSTOM_DURATION } from "../utils/validation.ts";

const options: { id: DurationKey; label: string }[] = [
  { id: "3m", label: "3 mois" },
  { id: "6m", label: "6 mois" },
  { id: "12m", label: "12 mois" },
  { id: "autre", label: "Autre durée" },
];

const StepDuration: React.FC<StepProps> = ({ state, dispatch, mode = 'full' }) => {
  const { durationKey, customDurationMonths } = state.data;

  const handleCustomDurationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = parseInt(e.target.value, 10);
    if (isNaN(value)) value = MIN_CUSTOM_DURATION;
    value = Math.max(MIN_CUSTOM_DURATION, Math.min(MAX_CUSTOM_DURATION, value));
    dispatch({ type: "SET_CUSTOM_DURATION", payload: value });
  };

  return (
    <fieldset className={mode === 'inline' ? 'fieldset--inline' : ''}>
        {mode === 'full' && <legend className="legend">Durée du coaching</legend>}
        <div
          className="radio-card-group"
          role="radiogroup"
        >
          {options.map((opt) => (
            <div
              key={opt.id}
              className={`radio-card ${
                durationKey === opt.id ? "radio-card--checked" : ""
              }`}
            >
              <input
                type="radio"
                id={`duration-${opt.id}`}
                name="duration"
                value={opt.id}
                checked={durationKey === opt.id}
                onChange={() => dispatch({ type: "SET_DURATION", payload: opt.id })}
                className="radio-card__input"
              />
              <label
                htmlFor={`duration-${opt.id}`}
                className="radio-card__label"
              >
                {opt.label}
              </label>
            </div>
          ))}
        </div>

      {durationKey === "autre" && (
        <div className="custom-duration form-group">
            <label htmlFor="custom-duration-months" className="form-label">
              Nombre de mois
            </label>
            <input
              type="number"
              id="custom-duration-months"
              name="custom-duration-months"
              value={customDurationMonths}
              onChange={handleCustomDurationChange}
              min={MIN_CUSTOM_DURATION}
              max={MAX_CUSTOM_DURATION}
              className="form-input"
              aria-describedby="custom-duration-hint"
              required
            />
            <p id="custom-duration-hint" className="form-hint">
                Entre {MIN_CUSTOM_DURATION} et {MAX_CUSTOM_DURATION} mois.
            </p>
          </div>
      )}
    </fieldset>
  );
};

export default StepDuration;
