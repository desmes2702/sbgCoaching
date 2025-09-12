// src/partials/components/rdv/AppointmentForm.tsx
import { useEffect, useMemo, useState } from "react";
import StepHeader from "@/partials/components/rdv/StepHeader.tsx";
import StepType from "@/partials/components/rdv/StepType.tsx";
import StepObjective from "@/partials/components/rdv/StepObjective.tsx";
import StepAgeFragility from "@/partials/components/rdv/StepAgeFragility.tsx";
import StepDuration from "@/partials/components/rdv/StepDuration.tsx";
import StepCoords from "@/partials/components/rdv/StepCoords.tsx";
import StepReview from "@/partials/components/rdv/StepReview.tsx";

import type { AppointmentData, StepKey, SubmitEvent } from "@/js/types/rdvTypes.ts";
import { canProceedObjective, canProceedAgeFragility, canProceedDuration, canProceedCoords, isFormValid } from "@/js/validation/rdvValidation.ts";
import { ui, cx } from "@/js/forms/uiClasses.ts";

const STEPS: StepKey[] = ["type", "objective", "ageFragility", "duration", "coords", "review"];
const STORAGE_KEY = "rdvFormDraft_v2";
const AUTOSAVE_ENABLED = false; // RGPD: opt-in (désactivé par défaut)
const MIN_SUBMIT_DELAY_MS = 2000; // anti-spam: délai minimal ≥ 2s

const INITIAL_DATA: AppointmentData = {
  typeId: "",
  objectiveNotes: "",
  age: "",
  isSeniorOrFragile: "na",
  fragilityNotes: "",
  durationId: "",
  durationCustom: "",
  firstname: "",
  lastname: "",
  email: "",
  phone: "",
  notes: "",
  consentAccepted: false,
  website: "",
  sensitiveConsentAccepted: false,
};

export default function AppointmentForm() {
  const [data, setData] = useState<AppointmentData>(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? { ...INITIAL_DATA, ...JSON.parse(raw) } : INITIAL_DATA;
    } catch {
      return INITIAL_DATA;
    }
  });
  const [stepIndex, setStepIndex] = useState(0);
  const [startedAt] = useState(() => Date.now());
  const [submitting, setSubmitting] = useState(false);
  const [ok, setOk] = useState(false);
  const [error, setError] = useState("");

  const currentStep = STEPS[stepIndex];

  // autosave (opt-in) — ne sauvegarde PAS les données sensibles
  useEffect(() => {
    if (!AUTOSAVE_ENABLED) return;
    try {
      const draft: Partial<AppointmentData> = {
        typeId: data.typeId,
        objectiveNotes: data.objectiveNotes,
        durationId: data.durationId,
        durationCustom: data.durationCustom,
        firstname: data.firstname,
        lastname: data.lastname,
        email: data.email,
        phone: data.phone,
        notes: data.notes,
        // Ne PAS stocker: age, isSeniorOrFragile, fragilityNotes, sensitiveConsentAccepted
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(draft));
    } catch { /* noop */ }
  }, [data]);

  // Focus management: focus sur le titre de l'étape courante
  useEffect(() => {
    const t = window.setTimeout(() => {
      const el = document.querySelector<HTMLElement>("[data-step-title]");
      el?.focus({ preventScroll: true });
    }, 0);
    return () => window.clearTimeout(t);
  }, [stepIndex]);

  const goNext = () => setStepIndex((i) => Math.min(i + 1, STEPS.length - 1));
  const goPrev = () => setStepIndex((i) => Math.max(i - 1, 0));
  const setField = (partial: Partial<AppointmentData>) => setData((prev) => ({ ...prev, ...partial }));

  const canContinue = useMemo(() => {
    switch (currentStep) {
      case "type":
        return !!data.typeId;
      case "objective":
        return canProceedObjective(data);
      case "ageFragility":
        return canProceedAgeFragility(data);
      case "duration":
        return canProceedDuration(data);
      case "coords":
        return canProceedCoords(data);
      case "review":
        return isFormValid(data);
      default:
        return false;
    }
  }, [currentStep, data]);

  const timeLeftMin = useMemo(() => {
    const total = STEPS.length;
    const done = stepIndex;
    const remaining = Math.max(0, total - done - 1);
    // estimation ~20s par step -> mn
    return Math.max(1, Math.round((remaining * 20) / 60));
  }, [stepIndex]);

  async function handleSubmitFinal() {
    setError("");

    // honeypot
    if (data.website.trim() !== "") {
      setError("Une erreur est survenue.");
      return;
    }
    // anti submit trop rapide
    const elapsed = Date.now() - startedAt;
    if (elapsed < MIN_SUBMIT_DELAY_MS) {
      setError("Veuillez patienter un court instant avant de valider.");
      return;
    }

    try {
      setSubmitting(true);
      // Brancher ici ton envoi (Mailjet/Laravel/API)
      // await sendAppointment(data)
      await new Promise((r) => setTimeout(r, 600));
      setOk(true);
      localStorage.removeItem(STORAGE_KEY);
    } catch (err: unknown) {
      const msg = typeof err === 'object' && err !== null && 'message' in err
        ? String((err as { message?: unknown }).message || '')
        : '';
      setError(msg || "Impossible de valider pour le moment.");
    } finally {
      setSubmitting(false);
    }
  }

  function onReviewEvent(evt: SubmitEvent) {
    if (evt.type === "change") {
      setField(evt.payload);
    } else if (evt.type === "submit") {
      handleSubmitFinal();
    }
  }

  if (ok) {
    return (
      <div className="form-success">
        <h3 className={cx(ui.title)}>Merci !</h3>
        <p>Votre demande a bien été envoyée. Nous revenons vers vous rapidement.</p>
      </div>
    );
  }

  return (
    <form className={cx(ui.form)} onSubmit={(e) => e.preventDefault()} noValidate>
      <StepHeader step={stepIndex + 1} total={STEPS.length} timeLeftMin={timeLeftMin} />

      {currentStep === "type" && (
        <StepType
          data={data}
          onChange={(value) => {
            setField({ typeId: value });
            console.log("✅ typeId mis à jour :", value);
          }}
          onNext={goNext}
        />
      )}

      {currentStep === "objective" && (
        <StepObjective data={data} onChange={(p) => setField(p)} onPrev={goPrev} onNext={goNext} canNext={canContinue} />
      )}

      {currentStep === "ageFragility" && (
        <StepAgeFragility data={data} onChange={(p) => setField(p)} onPrev={goPrev} onNext={goNext} canNext={canContinue} />
      )}

      {currentStep === "duration" && (
        <StepDuration data={data} onChange={(p) => setField(p)} onPrev={goPrev} onNext={goNext} canNext={canContinue} />
      )}

      {currentStep === "coords" && (
        <StepCoords data={data} onChange={(p) => setField(p)} onPrev={goPrev} onNext={goNext} canNext={canContinue} />
      )}

      {currentStep === "review" && (
        <StepReview data={data} onPrev={goPrev} onSubmit={onReviewEvent} submitting={submitting} />
      )}

      {/* honeypot anti-spam */}
      <label className={cx(ui.srOnly)} aria-hidden="true">
        Laissez ce champ vide
        <input
          type="text" name="website" tabIndex={-1} autoComplete="off"
          value={data.website}
          onChange={(e) => setField({ website: (e.target as HTMLInputElement).value })}
        />
      </label>

      {error && <p className={cx(ui.error)} role="alert" style={{ marginTop: "1rem" }}>{error}</p>}
    </form>
  );
}
