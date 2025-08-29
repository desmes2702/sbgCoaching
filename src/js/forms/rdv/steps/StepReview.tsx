// FILE: src/js/forms/rdv/steps/StepReview.tsx
/**
 * @file Step 5: Review and Submit with advanced features
 */
import React, { useState } from "react";
import type { StepProps } from "../types/rdvTypes.ts";
import { getSectionErrors, isSectionValid, isSectionModified, SectionKey } from "../utils/validation.ts";

import StepType from "./StepType.tsx";
import StepDuration from "./StepDuration.tsx";
import StepFragility from "./StepFragility.tsx";
import StepObjective from "./StepObjective.tsx";

import { DURATION_LABELS } from "../../../data/rdv/duration.ts";
const FRAGILITY_LABELS = { oui: "Oui", non: "Non", "ne-precise-pas": "Non précisé" };
const SECTION_LABELS: Record<SectionKey, string> = { type: "Type de coaching", duration: "Durée", fragility: "Informations", objective: "Objectif" };

const stepEditorComponents = { type: StepType, duration: StepDuration, fragility: StepFragility, objective: StepObjective };

const StepReview: React.FC<StepProps> = ({ state, dispatch }) => {
  const [editing, setEditing] = useState({ type: false, duration: false, fragility: false, objective: false });

  const { data, reviewBaseline } = state;
  const errors = getSectionErrors(data);
  const hasErrors = Object.values(errors).some(arr => arr.length > 0);

  const handleToggleEdit = (key: SectionKey) => {
    setEditing(current => ({ ...current, [key]: !current[key] }));
  };

  const handleSave = (key: SectionKey) => {
    if (!isSectionValid(key, data)) return;
    handleToggleEdit(key);
    dispatch({ type: "SNAPSHOT_REVIEW_BASELINE" });
    dispatch({ type: "TOAST_SHOW", payload: { message: "Modifications enregistrées." } });
  };

  const handleJumpToSection = (e: React.MouseEvent, key: SectionKey) => {
      e.preventDefault();
      setEditing(s => ({ ...s, [key]: true }));
      const el = document.getElementById(`review-${key}`);
      el?.scrollIntoView({ behavior: "smooth", block: "center" });
      setTimeout(() => el?.focus(), 300);
  }

  const sections: { key: SectionKey; title: string; content: React.ReactNode }[] = [
    { key: "type", title: "Type de coaching", content: <ContentItem label="Vous êtes" value={data.userType} /> },
    { key: "duration", title: "Durée", content: <ContentItem label="Durée" value={data.durationKey === "autre" ? `${data.customDurationMonths} mois` : (data.durationKey ? DURATION_LABELS[data.durationKey] : null)} /> },
    { key: "fragility", title: "Informations", content: <><ContentItem label="Fragilité" value={data.fragility ? FRAGILITY_LABELS[data.fragility] : null} />{data.fragility === "oui" && <ContentItem label="Documents" value={data.files.length > 0 ? <ul className="file-list">{data.files.map(f => <li key={f.id}>{f.name}</li>)}</ul> : "Aucun"} />}</> },
    { key: "objective", title: "Objectif", content: <ContentItem label="Votre objectif" value={data.objective} /> },
  ];

  return (
    <div className="review">
      <h2 className="legend">Récapitulatif</h2>
      <p className="subheading">Vérifiez vos informations avant de soumettre.</p>

      {hasErrors && (
        <nav className="rdv__errors" aria-label="Résumé des erreurs" aria-live="assertive">
            <p className="rdv__errors-title">Veuillez corriger les sections suivantes :</p>
            <ul className="rdv__errors-list">
            {Object.entries(errors).map(([section, list]) => list.length > 0 && (
                <li key={section}>
                <a className="errors__link" href={`#review-${section}`} onClick={(e) => handleJumpToSection(e, section as SectionKey)}>
                    {SECTION_LABELS[section as SectionKey]} — {list[0]}
                </a>
                </li>
            ))}
            </ul>
        </nav>
      )}

      {sections.map(({ key, title, content }) => {
        const Editor = stepEditorComponents[key];
        const isEditing = editing[key];
        const isValid = isSectionValid(key, data);
        const isModified = isSectionModified(key, data, reviewBaseline);

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
                <Editor state={state} dispatch={dispatch} mode="inline" />
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
