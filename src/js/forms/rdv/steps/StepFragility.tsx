// FILE: src/js/forms/rdv/steps/StepFragility.tsx
/**
 * @file Step 3: Fragility and File Upload
 */
import React from "react";
import type { StepProps, Fragility, RdvFile } from "../types/rdvTypes.ts";
import Uploader from "../components/Uploader.tsx";
import { validateFragility } from "../utils/validation.ts"; // Import validateFragility

const options: { id: Fragility; label: string }[] = [
  { id: "non", label: "Non" },
  { id: "oui", label: "Oui" },
  { id: "ne-precise-pas", label: "Je ne souhaite pas préciser" },
];

const StepFragility: React.FC<StepProps> = ({ state, dispatch, mode = 'full' }) => {
  const { fragility, files } = state.data;
  const validationResult = validateFragility(state.data); // Get validation result
  const fragilityError = validationResult.errors.fragility; // Error for radio group
  const filesError = validationResult.errors.files; // Error for file count

  const fragilityErrorId = "fragility-error";
  const filesErrorId = "files-error";

  const handleFilesAdded = (newFiles: RdvFile[]) => {
    dispatch({ type: "ADD_FILES", payload: newFiles });
  };

  const handleFileRemoved = (fileId: string) => {
    dispatch({ type: "REMOVE_FILE", payload: fileId });
  };

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

      {fragility === "oui" && (
        <div className="uploader-section">
          <label id="uploader-label" className="form-label">
            Téléversez vos documents (certificat médical, etc.)
          </label>
          <Uploader
            files={files}
            onFilesAdded={handleFilesAdded}
            onFileRemoved={handleFileRemoved}
            aria-invalid={!!filesError || Object.keys(validationResult.errors).some(key => key.startsWith('file-'))} // Check for file count error or individual file errors
            aria-describedby={filesError ? filesErrorId : undefined}
          />
          {filesError && ( // Display error for file count
            <p id={filesErrorId} className="form__field-error">
              {filesError}
            </p>
          )}
          {Object.entries(validationResult.errors).map(([key, message]) => {
            if (key.startsWith('file-')) {
              return (
                <p key={key} className="form__field-error">
                  {message}
                </p>
              );
            }
            return null;
          })}
        </div>
      )}
    </fieldset>
  );
};

export default StepFragility;