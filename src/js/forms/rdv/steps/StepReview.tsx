// FILE: src/js/forms/rdv/steps/StepReview.tsx
/**
 * @file Step 5: Review and Submit with advanced features
 */
import React, { useState } from "react";
import type { StepProps, RdvData } from "../types/rdvTypes.ts"; // Added RdvData import
// Import Zod for schema picking
import { z } from "zod";
// Import the main RdvSchema and isSectionModified from validation.ts
import { RdvSchema, isSectionModified } from "../utils/validation.ts";

import StepType from "./StepType.tsx";
import StepDuration from "./StepDuration.tsx";
import StepFragility from "./StepFragility.tsx";
import StepObjective from "./StepObjective.tsx";
import StepCoord from "./StepCoord.tsx"; // Import StepCoord for inline editing

import { DURATION_LABELS } from "../../../data/rdv/duration.ts";
const FRAGILITY_LABELS = { oui: "Oui", non: "Non", "ne-precise-pas": "Non précisé" };

// Map section keys to their corresponding Zod schemas and step indices
const sectionSchemas = {
  type: { schema: RdvSchema.pick({ userType: true }), stepIndex: 0 },
  duration: { schema: RdvSchema.pick({ durationKey: true, customDurationMonths: true }), stepIndex: 1 },
  fragility: { schema: RdvSchema.pick({ fragility: true }), stepIndex: 2 },
  objective: { schema: RdvSchema.pick({ objective: true }), stepIndex: 3 },
  coord: { schema: RdvSchema.pick({ coord: true }), stepIndex: 4 }, // New coord section
};

type SectionKey = keyof typeof sectionSchemas; // Dynamically create SectionKey type

const SECTION_LABELS: Record<SectionKey, string> = {
  type: "Type de coaching",
  duration: "Durée",
  fragility: "Informations",
  objective: "Objectif",
  coord: "Coordonnées", // New label
};

const stepEditorComponents = {
  type: StepType,
  duration: StepDuration,
  fragility: StepFragility,
  objective: StepObjective,
  coord: StepCoord,
};

const StepReview: React.FC<StepProps> = ({ state, dispatch, validationErrors }) => {
  const [editing, setEditing] = useState<Record<SectionKey, boolean>>({
    type: false,
    duration: false,
    fragility: false,
    objective: false,
    coord: false,
  });

  const { data, reviewBaseline } = state;
  const hasErrors = !!validationErrors && Object.keys(validationErrors).length > 0;
  const allFormErrors = validationErrors || {};

  const handleToggleEdit = (key: SectionKey) => {
    setEditing(current => ({ ...current, [key]: !current[key] }));
  };

  // isSectionModified is now imported from validation.ts

  const handleSave = (key: SectionKey) => {
    // Re-validate the specific section using its Zod schema
    const { schema } = sectionSchemas[key];
    let sectionDataForValidation: Partial<RdvData>; // Use Partial<RdvData>
    if (key === 'coord') {
      sectionDataForValidation = { coord: data.coord }; // Wrap coord in an object
    } else {
      sectionDataForValidation = data;
    }
    const result = schema.safeParse(sectionDataForValidation);

    if (!result.success) {
      // If there are errors, update the global state with these errors
      // This will trigger re-render and display errors in the section
      dispatch({ type: "SET_VALIDATION_ERRORS", payload: { ...validationErrors, ...result.error.flatten().fieldErrors } }); // Use flatten().fieldErrors directly
      dispatch({ type: "SET_GLOBAL_ERROR", payload: `Veuillez corriger les erreurs dans la section "${SECTION_LABELS[key]}".` });
      return;
    }
    // If validation passes, clear errors related to this section from global state
    const newValidationErrors = { ...validationErrors };
    Object.keys(newValidationErrors).forEach(errorKey => {
      if (errorKey.startsWith(key)) { // Simple check, might need refinement for nested errors
        delete newValidationErrors[errorKey];
      }
    });
    dispatch({ type: "SET_VALIDATION_ERRORS", payload: newValidationErrors });
    dispatch({ type: "SET_GLOBAL_ERROR", payload: null });

    handleToggleEdit(key);
    dispatch({ type: "SNAPSHOT_REVIEW_BASELINE" });
    dispatch({ type: "TOAST_SHOW", payload: { message: "Modifications enregistrées." } });
  };

  const handleJumpToSection = (e: React.MouseEvent, key: SectionKey) => {
      e.preventDefault();
      setEditing(s => ({ ...s, [key]: true }));
      
      // Use the global validationErrors to find the first error field
      const sectionErrors = validationErrors || {};
      const firstErrorFieldInSect = Object.keys(sectionErrors).find(errKey => errKey.startsWith(key));
      
      let elementToFocus: HTMLElement | null = null;
      if (firstErrorFieldInSect) {
        elementToFocus = document.getElementById(firstErrorFieldInSect);
      } else {
        elementToFocus = document.getElementById(`review-${key}`);
      }

      if (elementToFocus) {
        elementToFocus.scrollIntoView({ behavior: "smooth", block: "center" });
        setTimeout(() => elementToFocus?.focus(), 300);
      }
  }

  const sections: { key: SectionKey; title: string; content: React.ReactNode }[] = [
    { key: "type", title: "Type de coaching", content: <ContentItem label="Vous êtes" value={data.userType} /> },
    { key: "duration", title: "Durée", content: <ContentItem label="Durée" value={data.durationKey === "autre" ? `${data.customDurationMonths} mois` : (data.durationKey ? DURATION_LABELS[data.durationKey] : null)} /> },
    { key: "fragility", title: "Informations", content: <><ContentItem label="Fragilité" value={data.fragility ? FRAGILITY_LABELS[data.fragility] : null} />{/* Removed files content */}</> },
    { key: "objective", title: "Objectif", content: <ContentItem label="Votre objectif" value={data.objective} /> },
    { key: "coord", title: "Coordonnées", content: (
        <>
          <ContentItem label="Prénom" value={data.coord.firstName} />
          <ContentItem label="Nom" value={data.coord.lastName} />
          <ContentItem label="Email" value={data.coord.email} />
          <ContentItem label="Téléphone" value={data.coord.phone} />
          {data.coord.preferredSlot && <ContentItem label="Créneau préféré" value={data.coord.preferredSlot} />} 
          {data.coord.message && <ContentItem label="Message" value={data.coord.message} />} 
          <ContentItem label="Consentement RGPD" value={data.coord.consentRgpd ? "Oui" : "Non"} />
        </>
      )
    },
  ];

  return (
    <div className="review">
      <h2 className="legend">Récapitulatif</h2>
      <p className="subheading">Vérifiez vos informations avant de soumettre.</p>

      {hasErrors && (
        <nav className="rdv__errors" aria-label="Résumé des erreurs" aria-live="assertive">
            <p className="rdv__errors-title">Veuillez corriger les sections suivantes :</p>
            <ul className="rdv__errors-list">
            {Object.entries(allFormErrors).map(([field, message]) => (
                <li key={field}>
                <a className="errors__link" href={`#${field}`} onClick={(e) => {
                    e.preventDefault();
                    const element = document.getElementById(field);
                    if (element) {
                        element.scrollIntoView({ behavior: "smooth", block: "center" });
                        setTimeout(() => element.focus(), 300);
                    }
                }}>
                    {message}
                </a>
                </li>
            ))}
            </ul>
        </nav>
      )}

      {sections.map(({ key, title, content }) => {
        const Editor = stepEditorComponents[key];
        const isEditing = editing[key];
        
        // Determine if the section has errors from the global validationErrors
        const sectionHasErrors = Object.keys(allFormErrors).some(errorKey => errorKey.startsWith(key));
        const isValid = !sectionHasErrors; // Section is valid if no errors start with its key

        const isModified = reviewBaseline ? isSectionModified(key, data, reviewBaseline) : false;

        return (
          <section key={key} id={`review-${key}`} tabIndex={-1} className="review__section">
            <header className="review__header">
              <h3 id={`review-title-${key}`} className="review__title">
                {title}
                <span className={`badge ${isValid ? "badge--complete" : "badge--invalid"} ${isModified ? "badge--modified" : ""}`}>
                  {isModified ? "Modifié" : isValid ? "Complet" : "À corriger"}
                </span>
              </h3>
              <button type="button" aria-expanded={isEditing} aria-controls={`review-editor-${key}`} onClick={() => handleToggleEdit(key)} className="edit-button">
                {isEditing ? "Annuler" : "Modifier"}
              </button>
            </header>
            {!isEditing ? <div className="review__summary">{content}</div> : (
              <div id={`review-editor-${key}`} role="region" className="review__editor">
                <Editor state={state} dispatch={dispatch} mode="inline" validationErrors={validationErrors} />
                <div className="review__editor-actions">
                  <button type="button" className="button button--primary" disabled={!isValid} onClick={() => handleSave(key)}>Enregistrer</button>
                </div>
              </div>
            )}
          </section>
        );
      })}
    </div>
  );
};

const ContentItem: React.FC<{ label: string; value: React.ReactNode }> = ({ label, value }) => (
    <div className="content__item">
      <span className="content__label">{label}</span>
      {value ? <span className="content__value">{value}</span> : <span className="content__value content__value--empty">Non renseigné</span>}
    </div>
);

export default StepReview;