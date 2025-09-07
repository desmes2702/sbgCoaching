// src/partials/components/rdv/StepReview.tsx
import { useCallback, useMemo, useState } from "react";
import type { AppointmentData, StepReviewProps, YesNoNa, DurationValue } from "@/js/types/rdvTypes.ts";
import { DURATION_OPTIONS, DURATION_LABELS } from "@/js/data/rdv/duration.ts";
import { ui, cx } from "@/js/forms/uiClasses.ts";
import {
  MIN_OBJECTIVE_CHARS,
  MIN_FRAGILITY_CHARS,
  AGE_MIN,
  AGE_MAX,
  validateCoords,
  canProceedObjective,
  canProceedAgeFragility,
  canProceedDuration,
  isFormValid
} from "@/js/validation/rdvValidation.ts";

/* -------------------- Utils -------------------- */
function durationListLabel(value: DurationValue | "", custom: string) {
  if (!value) return "—";
  if (value === "other" && custom.trim()) return `Autre (${custom.trim()})`;
  return DURATION_LABELS[value as DurationValue] || "—";
}

/* =========================================================================================
   StepReview — récap + édition inline
========================================================================================= */
export default function StepReview({ data, onPrev, onSubmit, submitting = false }: StepReviewProps) {
  const [editing, setEditing] = useState<{ coaching: boolean; health: boolean; coords: boolean }>({
    coaching: false,
    health: false,
    coords: false,
  });

  // copies locales pendant l’édition
  const [coaching, setCoaching] = useState<Pick<AppointmentData, "objectiveNotes" | "durationId" | "durationCustom" | "typeId">>({
    typeId: data.typeId,
    objectiveNotes: data.objectiveNotes,
    durationId: data.durationId,
    durationCustom: data.durationCustom,
  });

  const [health, setHealth] = useState<Pick<AppointmentData, "age" | "isSeniorOrFragile" | "fragilityNotes">>({
    age: data.age,
    isSeniorOrFragile: data.isSeniorOrFragile,
    fragilityNotes: data.fragilityNotes,
  });

  const [coords, setCoords] = useState<Pick<AppointmentData, "firstname" | "lastname" | "email" | "phone" | "notes" | "consentAccepted">>({
    firstname: data.firstname,
    lastname: data.lastname,
    email: data.email,
    phone: data.phone,
    notes: data.notes,
    consentAccepted: data.consentAccepted,
  });

  // validations locales
  const coordWarnings = useMemo(() => validateCoords({ ...data, ...coords }), [data, coords]);

  const coachingValid =
    canProceedObjective({ ...data, ...coaching }) && canProceedDuration({ ...data, ...coaching });

  const healthValid = canProceedAgeFragility({ ...data, ...health });

  const coordsValid = !coordWarnings.firstname && !coordWarnings.lastname && !coordWarnings.email && !coordWarnings.phone && !coordWarnings.consentAccepted;

  const formOk = isFormValid({ ...data, ...coaching, ...health, ...coords });

  /* Actions */
  const applyCoaching = useCallback(() => {
    if (!coachingValid) return;
    onSubmit({ type: "change", payload: coaching });
    setEditing((e) => ({ ...e, coaching: false }));
  }, [coaching, coachingValid, onSubmit]);

  const applyHealth = useCallback(() => {
    if (!healthValid) return;
    onSubmit({ type: "change", payload: health });
    setEditing((e) => ({ ...e, health: false }));
  }, [health, healthValid, onSubmit]);

  const applyCoords = useCallback(() => {
    if (!coordsValid) return;
    onSubmit({ type: "change", payload: coords });
    setEditing((e) => ({ ...e, coords: false }));
  }, [coords, coordsValid, onSubmit]);

  return (
    <section className={cx("step", "step-review", ui.form)} data-step="review" aria-labelledby="review-title">
      <h3 id="review-title" className={cx(ui.title)} data-step-title tabIndex={-1}>Récapitulatif</h3>

      {/* ===== Coaching ===== */}
      <div className="step-review__section">
        <div className="step-review__head">
          <h4 className={cx(ui.legend)}>Coaching</h4>
          {!editing.coaching ? (
            <button className={cx(ui.button)} onClick={() => setEditing((e) => ({ ...e, coaching: true }))}>Modifier</button>
          ) : (
            <div className={cx(ui.actions)}>
              <button className={cx(ui.buttonGhost)} onClick={() => setEditing((e) => ({ ...e, coaching: false }))}>Annuler</button>
              <button className={cx(ui.buttonPrimary)} onClick={applyCoaching} disabled={!coachingValid}>Valider</button>
            </div>
          )}
        </div>

        {!editing.coaching ? (
          <dl className="step-review__content">
            <div className="step-review__row">
              <dt>Type</dt>
              <dd>{data.typeId === "entreprise" ? "Entreprise" : data.typeId === "particulier" ? "Particulier" : "—"}</dd>
            </div>
            <div className="step-review__row">
              <dt>Objectif</dt>
              <dd>{data.objectiveNotes || "—"}</dd>
            </div>
            <div className="step-review__row">
              <dt>Durée</dt>
              <dd>{durationListLabel(data.durationId, data.durationCustom)}</dd>
            </div>
          </dl>
        ) : (
          <div className="step-review__form">
            <div className={cx(ui.group)}>
              <span className={cx(ui.label)}>Type</span>
              <div className={cx(ui.grid)}>
                {(["entreprise", "particulier"] as const).map((id) => {
                  const checked = coaching.typeId === id;
                  return (
                    <label key={id} className={cx(ui.choice, checked && ui.choiceSelected)}>
                      <input type="radio" className={cx(ui.radio)} name="typeId" checked={checked} onChange={() => setCoaching((c) => ({ ...c, typeId: id }))} />
                      <span>{id === "entreprise" ? "Entreprise" : "Particulier"}</span>
                    </label>
                  );
                })}
              </div>
            </div>

            <div className={cx(ui.group)}>
              <label className={cx(ui.label)} htmlFor="review-objective">Objectif <small>(min. {MIN_OBJECTIVE_CHARS} caractères)</small></label>
              <textarea
                id="review-objective"
                className={cx(ui.textarea)}
                rows={3}
                value={coaching.objectiveNotes}
                onChange={(e) => setCoaching((c) => ({ ...c, objectiveNotes: e.target.value }))}
                aria-invalid={!canProceedObjective({ ...data, ...coaching })}
              />
            </div>

            <div className={cx(ui.group)}>
              <span className={cx(ui.label)}>Durée</span>
              <div className={cx(ui.grid)}>
                {DURATION_OPTIONS.map(opt => {
                  const checked = coaching.durationId === opt.id;
                  return (
                    <label key={opt.id} className={cx(ui.choice, checked && ui.choiceSelected)}>
                      <input
                        type="radio"
                        className={cx(ui.radio)}
                        name="duration"
                        checked={checked}
                        onChange={() => setCoaching((c) => ({ ...c, durationId: opt.id }))}
                      />
                      <span>{opt.label}</span>
                    </label>
                  );
                })}
              </div>
              {coaching.durationId === "other" && (
                <div className={cx(ui.group)}>
                  <label htmlFor="review-duration-custom" className={cx(ui.label)}>Précision(s)</label>
                  <input
                    id="review-duration-custom"
                    className={cx(ui.input)}
                    type="text"
                    value={coaching.durationCustom}
                    onChange={(e) => setCoaching((c) => ({ ...c, durationCustom: e.target.value }))}
                  />
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* ===== Santé & âge ===== */}
      <div className="step-review__section">
        <div className="step-review__head">
          <h4 className={cx(ui.legend)}>Âge & santé</h4>
          {!editing.health ? (
            <button className={cx(ui.button)} onClick={() => setEditing((e) => ({ ...e, health: true }))}>Modifier</button>
          ) : (
            <div className={cx(ui.actions)}>
              <button className={cx(ui.buttonGhost)} onClick={() => setEditing((e) => ({ ...e, health: false }))}>Annuler</button>
              <button className={cx(ui.buttonPrimary)} onClick={applyHealth} disabled={!healthValid}>Valider</button>
            </div>
          )}
        </div>

        {!editing.health ? (
          <dl className="step-review__content">
            <div className="step-review__row"><dt>Âge</dt><dd>{data.age || "—"}</dd></div>
            <div className="step-review__row">
              <dt>Fragilité</dt>
              <dd>{data.isSeniorOrFragile === "yes" ? "Oui" : data.isSeniorOrFragile === "no" ? "Non" : "Ne souhaite pas préciser"}</dd>
            </div>
            {data.isSeniorOrFragile === "yes" && (
              <div className="step-review__row"><dt>Détails</dt><dd>{data.fragilityNotes || "—"}</dd></div>
            )}
          </dl>
        ) : (
          <div className="step-review__form">
            <div className={cx(ui.group)}>
              <label htmlFor="review-age" className={cx(ui.label)}>Âge</label>
              <input
                id="review-age"
                className={cx(ui.input)}
                type="number"
                min={AGE_MIN}
                max={AGE_MAX}
                value={health.age === "" ? "" : health.age}
                onChange={(e) => setHealth((h) => ({ ...h, age: e.currentTarget.value === "" ? "" : e.currentTarget.valueAsNumber }))}
              />
            </div>
            <div className={cx(ui.group)}>
              <span className={cx(ui.label)}>Fragilité</span>
              <div className={cx(ui.grid)}>
                {(["yes", "no", "na"] as YesNoNa[]).map(id => {
                  const checked = health.isSeniorOrFragile === id;
                  return (
                    <label key={id} className={cx(ui.choice, checked && ui.choiceSelected)}>
                      <input type="radio" className={cx(ui.radio)} name="frag-review" checked={checked} onChange={() => setHealth((h) => ({ ...h, isSeniorOrFragile: id }))} />
                      <span>{id === "yes" ? "Oui" : id === "no" ? "Non" : "Ne souhaite pas préciser"}</span>
                    </label>
                  );
                })}
              </div>
            </div>
            {health.isSeniorOrFragile === "yes" && (
              <div className={cx(ui.group)}>
                <label htmlFor="review-frag-notes" className={cx(ui.label)}>Détails (min. {MIN_FRAGILITY_CHARS})</label>
                <textarea
                  id="review-frag-notes"
                  className={cx(ui.textarea)}
                  rows={3}
                  value={health.fragilityNotes}
                  onChange={(e) => setHealth((h) => ({ ...h, fragilityNotes: e.target.value }))}
                />
              </div>
            )}
          </div>
        )}
      </div>

      {/* ===== Coordonnées ===== */}
      <div className="step-review__section">
        <div className="step-review__head">
          <h4 className={cx(ui.legend)}>Coordonnées</h4>
          {!editing.coords ? (
            <button className={cx(ui.button)} onClick={() => setEditing((e) => ({ ...e, coords: true }))}>Modifier</button>
          ) : (
            <div className={cx(ui.actions)}>
              <button className={cx(ui.buttonGhost)} onClick={() => setEditing((e) => ({ ...e, coords: false }))}>Annuler</button>
              <button className={cx(ui.buttonPrimary)} onClick={applyCoords} disabled={!coordsValid}>Valider</button>
            </div>
          )}
        </div>

        {!editing.coords ? (
          <dl className="step-review__content">
            <div className="step-review__row"><dt>Nom</dt><dd>{[data.firstname, data.lastname].filter(Boolean).join(" ") || "—"}</dd></div>
            <div className="step-review__row"><dt>E‑mail</dt><dd>{data.email || "—"}</dd></div>
            <div className="step-review__row"><dt>Téléphone</dt><dd>{data.phone || "—"}</dd></div>
            {data.notes && <div className="step-review__row"><dt>Message</dt><dd>{data.notes}</dd></div>}
            <div className="step-review__row"><dt>Consentement</dt><dd>{data.consentAccepted ? "Accepté" : "Non accepté"}</dd></div>
          </dl>
        ) : (
          <div className="step-review__form">
            <div className={cx(ui.grid)}>
              <div className={cx(ui.group)}>
                <label htmlFor="review-firstname" className={cx(ui.label)}>Prénom</label>
                <input id="review-firstname" className={cx(ui.input)} type="text" value={coords.firstname} onChange={(e) => setCoords((c) => ({ ...c, firstname: e.target.value }))} />
              </div>
              <div className={cx(ui.group)}>
                <label htmlFor="review-lastname" className={cx(ui.label)}>Nom</label>
                <input id="review-lastname" className={cx(ui.input)} type="text" value={coords.lastname} onChange={(e) => setCoords((c) => ({ ...c, lastname: e.target.value }))} />
              </div>
              <div className={cx(ui.group)}>
                <label htmlFor="review-email" className={cx(ui.label)}>E‑mail</label>
                <input id="review-email" className={cx(ui.input)} type="email" value={coords.email} onChange={(e) => setCoords((c) => ({ ...c, email: e.target.value }))}
                />
              </div>
              <div className={cx(ui.group)}>
                <label htmlFor="review-phone" className={cx(ui.label)}>Téléphone</label>
                <input id="review-phone" className={cx(ui.input)} type="tel" value={coords.phone} onChange={(e) => setCoords((c) => ({ ...c, phone: e.target.value }))} />
              </div>
              <div className={cx(ui.group)}>
                <label htmlFor="review-notes" className={cx(ui.label)}>Message (optionnel)</label>
                <textarea id="review-notes" className={cx(ui.textarea)} rows={3} value={coords.notes} onChange={(e) => setCoords((c) => ({ ...c, notes: e.target.value }))} />
              </div>
              <label className={cx(ui.check)}>
                <input type="checkbox" checked={coords.consentAccepted} onChange={(e) => setCoords((c) => ({ ...c, consentAccepted: e.target.checked }))} />
                <span>J’accepte que mes données soient utilisées pour me recontacter.</span>
              </label>
            </div>
          </div>
        )}
      </div>

      {/* ===== Submit ===== */}
      <footer className={cx(ui.actions)} style={{ marginTop: "1rem" }}>
        <button type="button" className={cx(ui.prev)} onClick={onPrev}>Retour</button>
        <button
          className={cx(ui.submit)}
          type="button"
          disabled={!formOk || submitting}
          onClick={() => onSubmit({ type: "submit" })}
        >
          {submitting ? "Envoi…" : "Envoyer la demande"}
        </button>
      </footer>
    </section>
  );
}
