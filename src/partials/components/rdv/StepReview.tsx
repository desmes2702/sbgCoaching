import { useCallback, useMemo, useState } from "react";
import type { StepReviewProps, YesNoNa, DurationValue } from "@/js/types/rdvTypes.ts";
import { DURATION_OPTIONS, DURATION_LABELS } from "@/js/data/rdv/duration.ts";
import { ui, cx } from "@/js/forms/uiClasses.ts";
import {
  MIN_OBJECTIVE_CHARS,
  MIN_FRAGILITY_CHARS,
  validateCoords,
  canProceedObjective,
  canProceedAgeFragility,
  canProceedDuration,
  isFormValid
} from "@/js/validation/rdvValidation.ts";

function durationListLabel(value: DurationValue | "", custom: string) {
  if (!value) return "—";
  if (value === "autre" && custom.trim()) return `Autre (${custom.trim()})`;
  return DURATION_LABELS[value as DurationValue] || "—";
}

export default function StepReview({ data, onPrev, onSubmit, submitting = false }: StepReviewProps) {
  const [editing, setEditing] = useState<{ coaching: boolean; health: boolean; coords: boolean }>({
    coaching: false,
    health: false,
    coords: false,
  });
  const [coaching, setCoaching] = useState({
    typeId: data.typeId,
    objectiveNotes: data.objectiveNotes,
    durationId: data.durationId,
    durationCustom: data.durationCustom,
  });
  const [health, setHealth] = useState({
    age: data.age,
    isSeniorOrFragile: data.isSeniorOrFragile,
    fragilityNotes: data.fragilityNotes,
  });
  const [coords, setCoords] = useState({
    firstname: data.firstname,
    lastname: data.lastname,
    email: data.email,
    phone: data.phone,
    notes: data.notes,
    consentAccepted: data.consentAccepted,
  });
  const coordWarnings = useMemo(() => validateCoords({ ...data, ...coords }), [data, coords]);
  const coachingValid =
    canProceedObjective({ ...data, ...coaching }) && canProceedDuration({ ...data, ...coaching });
  const healthValid = canProceedAgeFragility({ ...data, ...health });
  const coordsValid =
    !coordWarnings.firstname &&
    !coordWarnings.lastname &&
    !coordWarnings.email &&
    !coordWarnings.phone &&
    !coordWarnings.consentAccepted;
  const formOk = isFormValid({ ...data, ...coaching, ...health, ...coords });

  const errorsBySection = useMemo(() => {
    const errors: Record<string, string[]> = { coaching: [], health: [], coords: [] };
    if (!canProceedObjective({ ...data, ...coaching })) errors.coaching.push("objectif");
    if (!canProceedDuration({ ...data, ...coaching })) errors.coaching.push("durée");
    if (!canProceedAgeFragility({ ...data, ...health })) errors.health.push("âge/fragilité");
    if (Object.keys(coordWarnings).length > 0) errors.coords.push("coordonnées");
    return errors;
  }, [data, coaching, health, coords, coordWarnings]);

  const applyCoaching = useCallback(() => {
    if (!coachingValid) return;
    onSubmit({ type: "change", payload: coaching });
    setEditing(e => ({ ...e, coaching: false }));
  }, [coaching, coachingValid, onSubmit]);

  const applyHealth = useCallback(() => {
    if (!healthValid) return;
    onSubmit({ type: "change", payload: health });
    setEditing(e => ({ ...e, health: false }));
  }, [health, healthValid, onSubmit]);

  const applyCoords = useCallback(() => {
    if (!coordsValid) return;
    onSubmit({ type: "change", payload: coords });
    setEditing(e => ({ ...e, coords: false }));
  }, [coords, coordsValid, onSubmit]);

  function handleFinalSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!formOk || submitting) return;
    onSubmit({ type: "submit" });
  }

  // BEM pour toutes les sections, feedback instantané, interactions accessibles
  return (
    <form className={ui.form} aria-labelledby="step-review-title" onSubmit={handleFinalSubmit} noValidate>
      <h2 id="step-review-title" className={cx(ui.legend, ui.title)}>
        Récapitulatif
      </h2>
      {Object.values(errorsBySection).some(arr => arr.length > 0) && (
        <nav className="rdv__errors" aria-live="assertive">
          <p>Veuillez corriger les erreurs suivantes :</p>
          <ul>
            {Object.entries(errorsBySection).map(([section, errors]) => (
              errors.length > 0 && (
                <li key={section}>
                  <a href={`#review-${section}`}>
                    {section === "coaching" && "Coaching"}
                    {section === "health" && "Âge & santé"}
                    {section === "coords" && "Coordonnées"}
                    : {errors.join(", ")}
                  </a>
                </li>
              )
            ))}
          </ul>
        </nav>
      )}
      {/* COACHING */}
      <section className={ui.fieldset} aria-labelledby="review-coaching">
        <header className={ui.stepHeader}>
          <h3 id="review-coaching">Coaching {errorsBySection.coaching.length > 0 ? <span className="badge badge--invalid">À corriger</span> : <span className="badge badge--complete">Complet</span>}</h3>
          {!editing.coaching ? (
            <button type="button" className={ui.buttonGhost} onClick={() => setEditing(e => ({ ...e, coaching: true }))}>
              Modifier
            </button>
          ) : (
            <div className={ui.actions}>
              <button
                type="button"
                className={ui.buttonGhost}
                onClick={() => setEditing(e => ({ ...e, coaching: false }))}
              >
                Annuler
              </button>
              <button type="button" className={ui.buttonPrimary} onClick={applyCoaching} disabled={!coachingValid}>
                Valider
              </button>
            </div>
          )}
        </header>
        {!editing.coaching ? (
          <dl>
            <dt>Type</dt>
            <dd>
              {data.typeId === "entreprise"
                ? "Entreprise"
                : data.typeId === "particulier"
                ? "Particulier"
                : "—"}
            </dd>
            <dt>Objectif</dt>
            <dd>{data.objectiveNotes || "—"}</dd>
            <dt>Durée</dt>
            <dd>{durationListLabel(data.durationId, data.durationCustom)}</dd>
          </dl>
        ) : (
          <>
            <div className={ui.chips} role="radiogroup" aria-required="true">
              {(["entreprise", "particulier"] as const).map(id => (
               <label className={cx(ui.chip, coaching.typeId === id ? ui.choiceSelected : undefined)} key={id}>
                  <input
                    type="radio"
                    name="type"
                    value={id}
                    checked={coaching.typeId === id}
                    onChange={() => setCoaching(c => ({ ...c, typeId: id }))}
                    className={ui.radio}
                    required
                    aria-checked={coaching.typeId === id}
                  />
                  <span>{id === "entreprise" ? "Entreprise" : "Particulier"}</span>
                </label>
              ))}
            </div>
            <label className={ui.label} htmlFor="review-objective">
              Objectif (min. {MIN_OBJECTIVE_CHARS} caractères)
              <textarea
                id="review-objective"
                name="review-objective"
                className={ui.textarea}
                value={coaching.objectiveNotes}
                onChange={e => setCoaching(c => ({ ...c, objectiveNotes: e.target.value }))}
                aria-invalid={!canProceedObjective({ ...data, ...coaching })}
                minLength={MIN_OBJECTIVE_CHARS}
                required
                rows={2}
              />
            </label>
            <div className={ui.chips} role="radiogroup" aria-required="true">
              {DURATION_OPTIONS.map(opt => (
               <label className={cx(ui.chip, coaching.durationId === opt.id ? ui.choiceSelected : undefined)} key={opt.id}>
                  <input
                    type="radio"
                    name="durationId"
                    value={opt.id}
                    checked={coaching.durationId === opt.id}
                    onChange={() => setCoaching(c => ({ ...c, durationId: opt.id }))}
                    className={ui.radio}
                    required
                    aria-checked={coaching.durationId === opt.id}
                  />
                  <span>{opt.label}</span>
                </label>
              ))}
            </div>
            {coaching.durationId === "autre" && (
              <input
                type="text"
                className={ui.input}
                value={coaching.durationCustom}
                placeholder="Précisez la durée"
                onChange={e => setCoaching(c => ({ ...c, durationCustom: e.target.value }))}
                required
              />
            )}
          </>
        )}
      </section>
      {/* SANTÉ + AGE */}
      <section className={ui.fieldset} aria-labelledby="review-health">
        <header className={ui.stepHeader}>
          <h3 id="review-health">Âge & santé {errorsBySection.health.length > 0 ? <span className="badge badge--invalid">À corriger</span> : <span className="badge badge--complete">Complet</span>}</h3>
          {!editing.health ? (
            <button type="button" className={ui.buttonGhost} onClick={() => setEditing(e => ({ ...e, health: true }))}>
              Modifier
            </button>
          ) : (
            <div className={ui.actions}>
              <button
                type="button"
                className={ui.buttonGhost}
                onClick={() => setEditing(e => ({ ...e, health: false }))}
              >
                Annuler
              </button>
              <button type="button" className={ui.buttonPrimary} onClick={applyHealth} disabled={!healthValid}>
                Valider
              </button>
            </div>
          )}
        </header>
        {!editing.health ? (
          <dl>
            <dt>Âge</dt>
            <dd>{data.age || "—"}</dd>
            <dt>Fragilité</dt>
            <dd>
              {data.isSeniorOrFragile === "yes"
                ? "Oui"
                : data.isSeniorOrFragile === "no"
                ? "Non"
                : "Ne souhaite pas préciser"}
            </dd>
            {data.isSeniorOrFragile === "yes" && (
              <>
                <dt>Détails</dt>
                <dd>{data.fragilityNotes || "—"}</dd>
              </>
            )}
          </dl>
        ) : (
          <>
            <label className={ui.label} htmlFor="review-age">
              Âge
              <input
                id="review-age"
                name="review-age"
                className={ui.input}
                type="number"
                min={1}
                max={123}
                value={health.age}
                onChange={e =>
                  setHealth(h => ({
                    ...h,
                    age: e.currentTarget.value === "" ? "" : Number(e.target.value),
                  }))
                }
                required
              />
            </label>
            <div className={ui.chips} role="radiogroup" aria-required="true">
              {(["yes", "no", "na"] as YesNoNa[]).map(id => (
                <label className={cx(ui.chip, health.isSeniorOrFragile === id ? ui.choiceSelected : undefined)} key={id}>
                  <input
                    type="radio"
                    name="isSeniorOrFragile"
                    value={id}
                    checked={health.isSeniorOrFragile === id}
                    onChange={() => setHealth(h => ({ ...h, isSeniorOrFragile: id }))}
                    className={ui.radio}
                    required
                    aria-checked={health.isSeniorOrFragile === id}
                  />
                  <span>
                    {id === "yes"
                      ? "Oui"
                      : id === "no"
                      ? "Non"
                      : "Ne souhaite pas préciser"}
                  </span>
                </label>
              ))}
            </div>
            {health.isSeniorOrFragile === "yes" && (
              <label className={ui.label} htmlFor="review-fragilityNotes">
                Détails (min. {MIN_FRAGILITY_CHARS})
                <textarea
                  id="review-fragilityNotes"
                  name="review-fragilityNotes"
                  className={ui.textarea}
                  value={health.fragilityNotes}
                  onChange={e => setHealth(h => ({ ...h, fragilityNotes: e.target.value }))}
                  aria-invalid={health.fragilityNotes.length < MIN_FRAGILITY_CHARS}
                  required
                  rows={2}
                />
              </label>
            )}
          </>
        )}
      </section>
      {/* COORDONNÉES */}
      <section className={ui.fieldset} aria-labelledby="review-coords">
        <header className={ui.stepHeader}>
          <h3 id="review-coords">Coordonnées {errorsBySection.coords.length > 0 ? <span className="badge badge--invalid">À corriger</span> : <span className="badge badge--complete">Complet</span>}</h3>
          {!editing.coords ? (
            <button type="button" className={ui.buttonGhost} onClick={() => setEditing(e => ({ ...e, coords: true }))}>
              Modifier
            </button>
          ) : (
            <div className={ui.actions}>
              <button
                type="button"
                className={ui.buttonGhost}
                onClick={() => setEditing(e => ({ ...e, coords: false }))}
              >
                Annuler
              </button>
              <button type="button" className={ui.buttonPrimary} onClick={applyCoords} disabled={!coordsValid}>
                Valider
              </button>
            </div>
          )}
        </header>
        {!editing.coords ? (
          <dl>
            <dt>Nom</dt>
            <dd>{[data.firstname, data.lastname].filter(Boolean).join(" ") || "—"}</dd>
            <dt>E-mail</dt>
            <dd>{data.email || "—"}</dd>
            <dt>Téléphone</dt>
            <dd>{data.phone || "—"}</dd>
            {data.notes && (
              <>
                <dt>Message</dt>
                <dd>{data.notes}</dd>
              </>
            )}
            <dt>Consentement</dt>
            <dd>{data.consentAccepted ? "Accepté" : "Non accepté"}</dd>
          </dl>
        ) : (
          <>
            <label className={ui.label} htmlFor="review-firstname">
              Prénom
              <input
                id="review-firstname"
                name="review-firstname"
                className={ui.input}
                value={coords.firstname}
                onChange={e => setCoords(c => ({ ...c, firstname: e.target.value }))}
                required
              />
            </label>
            <label className={ui.label} htmlFor="review-lastname">
              Nom
              <input
                id="review-lastname"
                name="review-lastname"
                className={ui.input}
                value={coords.lastname}
                onChange={e => setCoords(c => ({ ...c, lastname: e.target.value }))}
                required
              />
            </label>
            <label className={ui.label} htmlFor="review-email">
              E-mail
              <input
                id="review-email"
                name="review-email"
                type="email"
                className={ui.input}
                value={coords.email}
                onChange={e => setCoords(c => ({ ...c, email: e.target.value }))}
                required
              />
            </label>
            <label className={ui.label} htmlFor="review-phone">
              Téléphone
              <input
                id="review-phone"
                name="review-phone"
                className={ui.input}
                value={coords.phone}
                onChange={e => setCoords(c => ({ ...c, phone: e.target.value }))}
                required
              />
            </label>
            <label className={ui.label} htmlFor="review-notes">
              Message (optionnel)
              <textarea
                id="review-notes"
                name="review-notes"
                className={ui.textarea}
                value={coords.notes}
                onChange={e => setCoords(c => ({ ...c, notes: e.target.value }))}
                rows={2}
              />
            </label>
            <label className={ui.check}>
              <input
                type="checkbox"
                name="review-consentAccepted"
                checked={coords.consentAccepted}
                onChange={e => setCoords(c => ({ ...c, consentAccepted: e.target.checked }))}
                required
              />
              J’accepte que mes données soient utilisées pour me recontacter.
            </label>
            <div>
              {coordWarnings.firstname && <div className={ui.error}>{coordWarnings.firstname}</div>}
              {coordWarnings.lastname && <div className={ui.error}>{coordWarnings.lastname}</div>}
              {coordWarnings.email && <div className={ui.error}>{coordWarnings.email}</div>}
              {coordWarnings.phone && <div className={ui.error}>{coordWarnings.phone}</div>}
              {coordWarnings.consentAccepted && <div className={ui.error}>{coordWarnings.consentAccepted}</div>}
            </div>
          </>
        )}
      </section>
      <div className={ui.actions}>
        {onPrev && (
          <button type="button" className={ui.prev} onClick={() => onPrev()} disabled={submitting}>
            Précédent
          </button>
        )}
        <button type="submit" className={ui.submit} disabled={!formOk || submitting}>
          Envoyer la demande
        </button>
      </div>
    </form>
    <div className="toast" role="status" aria-live="polite"></div>
  );
}
