import { useEffect, useMemo, useState } from "react";

import StepHeader from "@/partials/components/rdv/StepHeader.tsx";
import StepType from "@/partials/components/rdv/StepType.tsx";
import StepObjective from "@/partials/components/rdv/StepObjective.tsx";
import StepAgeFragility from "@/partials/components/rdv/StepAgeFragility.tsx";
import StepDuration from "@/partials/components/rdv/StepDuration.tsx";
import StepCoords from "@/partials/components/rdv/StepCoords.tsx";
import StepReview from "@/partials/components/rdv/StepReview.tsx";
import Progress from "@/partials/components/rdv/Progress.tsx";

import type { AppointmentData, StepKey, SubmitEvent } from "@/js/types/rdvTypes.ts";
import { canProceedObjective, canProceedAgeFragility, canProceedDuration, canProceedCoords, isFormValid } from "@/js/validation/rdvValidation.ts";
import { ui } from "@/js/forms/uiClasses.ts";

const STEPS: StepKey[] = ["type", "objective", "ageFragility", "duration", "coords", "review"];
const STEP_LABELS: Record<StepKey, string> = {
  type: "Type",
  objective: "Objectif",
  ageFragility: "Âge & Santé",
  duration: "Durée",
  coords: "Coordonnées",
  review: "Récapitulatif",
};
const STORAGE_KEY = "rdvFormDraft_v2";
const MIN_SUBMIT_DELAY_MS = 1500;

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
  website: ""
};

export default function AppointmentForm() {
  const [data, setData] = useState<AppointmentData>(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      const stored = raw ? JSON.parse(raw) : {};
      if (stored.v === 1) {
        return { ...INITIAL_DATA, ...stored.data };
      }
      return INITIAL_DATA;
    } catch {
      return INITIAL_DATA;
    }
  });

  const [stepIndex, setStepIndex] = useState(0);
  const [maxReachableStep, setMaxReachableStep] = useState(0);
  const [startedAt] = useState(() => Date.now());
  const [submitting, setSubmitting] = useState(false);
  const [ok, setOk] = useState(false);
  const [error, setError] = useState("");

  const currentStep = STEPS[stepIndex];

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ v: 1, data }));
    } catch {}
  }, [data]);

  const goNext = () => {
    setStepIndex(i => {
      const nextStep = Math.min(i + 1, STEPS.length - 1);
      setMaxReachableStep(prev => Math.max(prev, nextStep));
      return nextStep;
    });
  };
  const goPrev = () => setStepIndex(i => Math.max(i - 1, 0));
  const goToStep = (index: number) => {
    if (index <= maxReachableStep) {
      setStepIndex(index);
    }
  };
  const setField = (partial: Partial<AppointmentData>) => setData(prev => ({ ...prev, ...partial }));

  const canContinue = useMemo(() => {
    switch (currentStep) {
      case "type": return !!data.typeId;
      case "objective": return canProceedObjective(data);
      case "ageFragility": return canProceedAgeFragility(data);
      case "duration": return canProceedDuration(data);
      case "coords": return canProceedCoords(data);
      case "review": return isFormValid(data);
      default: return false;
    }
  }, [currentStep, data]);

  const timeLeftMin = useMemo(() => {
    const total = STEPS.length;
    const done = stepIndex;
    const remaining = Math.max(0, total - done - 1);
    return Math.max(1, Math.round((remaining * 20) / 60));
  }, [stepIndex]);

  async function handleSubmitFinal() {
    setError("");
    if (data.website.trim() !== "") {
      // Honeypot anti-spam
      setError("Une erreur est survenue.");
      return;
    }

    const elapsed = Date.now() - startedAt;
    if (elapsed < MIN_SUBMIT_DELAY_MS) {
      setError("Veuillez patienter un court instant avant de valider.");
      return;
    }

    try {
      setSubmitting(true);
      await new Promise(r => setTimeout(r, 600)); // simulate (remplace avec fetch réel !)
      setOk(true);
      localStorage.removeItem(STORAGE_KEY);
    } catch (err: any) {
      setError(err?.message || "Impossible de valider pour le moment.");
    } finally {
      setSubmitting(false);
    }
  }

  function onReviewEvent(evt: SubmitEvent) {
    if (evt.type === "change") setField(evt.payload);
    else if (evt.type === "submit") handleSubmitFinal();
  }

  if (ok) {
    return (
      <section className={ui.form} aria-live="polite">
        <h2>Merci !</h2>
        <p>Votre demande a bien été envoyée.<br />Nous revenons vers vous rapidement.</p>
      </section>
    );
  }

  return (
    <form
      className={ui.form}
      aria-labelledby="appointment-form-title"
      noValidate
      onSubmit={e => e.preventDefault()}
      autoComplete="off"
    >
      <StepHeader step={stepIndex + 1} total={STEPS.length} timeLeftMin={timeLeftMin} />
      <Progress
        currentStepIndex={stepIndex}
        maxReachableStep={maxReachableStep}
        steps={STEPS.map(step => STEP_LABELS[step])}
        goToStep={goToStep}
      />
      <div id="appointment-form-title" className={ui.title}>
        Prendre RDV coaching
      </div>
      {currentStep === "type" && (
        <StepType
          data={data}
          onChange={val => setField({ typeId: val })}
          onNext={goNext}
        />
      )}
      {currentStep === "objective" && (
        <StepObjective
          data={data}
          onChange={partial => setField(partial)}
          onPrev={goPrev}
          onNext={goNext}
          canNext={canContinue}
        />
      )}
      {currentStep === "ageFragility" && (
        <StepAgeFragility
          data={data}
          onChange={partial => setField(partial)}
          onPrev={goPrev}
          onNext={goNext}
          canNext={canContinue}
        />
      )}
      {currentStep === "duration" && (
        <StepDuration
          data={data}
          onChange={partial => setField(partial)}
          onPrev={goPrev}
          onNext={goNext}
          canNext={canContinue}
        />
      )}
      {currentStep === "coords" && (
        <StepCoords
          data={data}
          onChange={partial => setField(partial)}
          onPrev={goPrev}
          onNext={goNext}
          canNext={canContinue}
        />
      )}
      {currentStep === "review" && (
        <StepReview
          data={data}
          onPrev={goPrev}
          onSubmit={onReviewEvent}
          submitting={submitting}
        />
      )}

      {/* Honeypot anti-spam */}
      <input
        type="text"
        name="website"
        style={{ display: "none" }}
        autoComplete="off"
        tabIndex={-1}
        value={data.website}
        onChange={e => setField({ website: (e.target as HTMLInputElement).value })}
      />

      {error && <div className={ui.error} aria-live="polite">{error}</div>}
    </form>
  );
}