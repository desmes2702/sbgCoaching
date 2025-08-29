// FILE: src/js/forms/rdv/steps/StepFragility.tsx
/**
 * @file Step 3: Fragility and File Upload
 */
import React from "react";
import type { StepProps, Fragility, RdvFile } from "../types/rdvTypes.ts";
import Uploader from "../components/Uploader.tsx";

const options: { id: Fragility; label: string }[] = [
  { id: "non", label: "Non" },
  { id: "oui", label: "Oui" },
  { id: "ne-precise-pas", label: "Je ne souhaite pas préciser" },
];

const StepFragility: React.FC<StepProps> = ({ state, dispatch, mode = 'full' }) => {
  const { fragility, files } = state.data;

  const handleFilesAdded = (newFiles: RdvFile[]) => {
    dispatch({ type: "ADD_FILES", payload: newFiles });
  };

  const handleFileRemoved = (fileId: string) => {
    dispatch({ type: "REMOVE_FILE", payload: fileId });
  };

  return (
    <fieldset className={mode === 'inline' ? 'fieldset--inline' : ''}>
        {mode === 'full' && (
            <legend className="legend">
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
              />
              <label htmlFor={`fragility-${opt.id}`} className="radio-label">
                {opt.label}
              </label>
            </div>
          ))}
        </div>

      {fragility === "oui" && (
        <div className="uploader-section">
          <label id="uploader-label" className="form-label">
            Téléversez vos documents (certificat médical, etc.)
          </label>
          <Uploader
            files={files}
            onFilesAdded={handleFilesAdded}
            onFileRemoved={handleFileRemoved}
          />
        </div>
      )}
    </fieldset>
  );
};

export default StepFragility;
