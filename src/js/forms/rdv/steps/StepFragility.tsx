// FILE: src/js/forms/rdv/steps/StepFragility.tsx
/**
 * @file Step 3: Fragility and File Upload
 */
// FILE: src/js/forms/rdv/steps/StepFragility.tsx
/**
 * @file Step 3: Fragility and File Upload
 */
import React from "react";
import type { StepProps, Fragility } from "../types/rdvTypes.ts"; // Removed RdvFile import
// Removed Uploader import
// import Uploader from "../components/Uploader.tsx";

const options: { id: Fragility; label: string }[] = [
  { id: "non", label: "Non" },
  { id: "oui", label: "Oui" },
  { id: "ne-precise-pas", label: "Je ne souhaite pas préciser" },
];

const StepFragility: React.FC<StepProps> = ({ state, dispatch, mode = 'full', validationErrors }) => {
  const { fragility } = state.data; // Removed files from destructuring
  const fragilityError = validationErrors?.fragility; // Error for radio group
  // Removed filesError and filesErrorId

  const fragilityErrorId = "fragility-error";
  // Removed filesErrorId

  // Removed handleFilesAdded and handleFileRemoved functions

  return (
    <fieldset className={mode === 'inline' ? 'fieldset--inline' : ''}>
        {mode === 'full' && (
            <legend className="legend" id="fragility-legend">
                Informations complémentaires
            </legend>
        )}
        <p className="description">
          Présentez-vous une fragilité ou pathologie (physique ou mentale)
          pertinente pour le coaching ?
        </p>
        <div
          className="radio-group--inline"
          role="radiogroup"
          aria-labelledby={mode === 'full' ? 'fragility-legend' : undefined}
        >
          {options.map((opt) => (
            <div key={opt.id}>
              <input
                type="radio"
                id={`fragility-${opt.id}`}
                name="fragility"
                value={opt.id}
                checked={fragility === opt.id}
                onChange={() => dispatch({ type: "SET_FRAGILITY", payload: opt.id })}
                className="radio-input"
                aria-invalid={!!fragilityError} // Add aria-invalid
                aria-describedby={fragilityError ? fragilityErrorId : undefined} // Link to error message
              />
              <label htmlFor={`fragility-${opt.id}`} className="radio-label">
                {opt.label}
              </label>
            </div>
          ))}
        </div>
        {fragilityError && ( // Display error for radio group
          <p id={fragilityErrorId} className="form__field-error">
            {fragilityError}
          </p>
        )}
      {/* Removed the entire uploader section */}
    </fieldset>
  );
};

export default StepFragility;