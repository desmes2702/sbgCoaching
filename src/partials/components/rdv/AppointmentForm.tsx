// src/partials/components/rdv/AppointmentForm.tsx
import { useEffect, useMemo, useRef, useState, useCallback } from "react";
import StepHeader from "@/partials/components/rdv/StepHeader.tsx";
import StepType from "@/partials/components/rdv/StepType.tsx";
import StepObjective from "@/partials/components/rdv/StepObjective.tsx";
import StepAgeFragility from "@/partials/components/rdv/StepAgeFragility.tsx";
import StepDuration from "@/partials/components/rdv/StepDuration.tsx";
import StepCoords from "@/partials/components/rdv/StepCoords.tsx";
import StepReview from "@/partials/components/rdv/StepReview.tsx";

import type { AppointmentData, StepKey, SubmitEvent } from "@/js/types/rdvTypes.ts";
import { canProceedObjective, canProceedAgeFragility, canProceedDuration, canProceedCoords, isFormValid, validateAgeFragility, validateDuration, validateCoords } from "@/js/validation/rdvValidation.ts";
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
  const [showSummary, setShowSummary] = useState(false);
  const summaryRef = useRef<HTMLDivElement | null>(null);

  const currentStep = STEPS[stepIndex];

  // autosave (opt-in) — ne sauvegarde PAS les données sensibles
  // Audit 2025-09-12: vérifié que age / fragility / notes sensibles / consentements ne sont pas écrits dans le storage
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
  const total = STEPS.length;

  // Clamp defensively if total evolves
  useEffect(() => {
    setStepIndex((s) => Math.min(Math.max(0, s), total - 1));
  }, [total]);

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

  // Next wrapper to show error summary when invalid
  const tryNext = useCallback(() => {
    if (canContinue) {
      setShowSummary(false);
      goNext();
      return;
    }
    setShowSummary(true);
    // focus the first error link and scroll to top of summary
    requestAnimationFrame(() => {
      const firstLink = summaryRef.current?.querySelector<HTMLAnchorElement>('a');
      if (firstLink) {
        firstLink.focus({ preventScroll: true });
        firstLink.scrollIntoView({ behavior: 'smooth', block: 'start' });
      } else {
        summaryRef.current?.focus({ preventScroll: true });
        summaryRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  }, [canContinue, goNext]);

  // Build error summary for current step
  const errorItems = useMemo(() => {
    const items: Array<{ href: string; label: string }> = [];
    switch (currentStep) {
      case "objective": {
        if (!canProceedObjective(data)) items.push({ href: "#objectiveNotes", label: "Précisez votre objectif (minimum requis)" });
        break;
      }
      case "ageFragility": {
        const w = validateAgeFragility(data);
        if (w.age) items.push({ href: "#age", label: w.age });
        if (w.isSeniorOrFragile) items.push({ href: "#frag-yes", label: w.isSeniorOrFragile });
        if (w.fragilityNotes) items.push({ href: "#fragilityNotes", label: w.fragilityNotes });
        if (w.sensitiveConsentAccepted) items.push({ href: "#sensitive-consent", label: w.sensitiveConsentAccepted });
        break;
      }
      case "duration": {
        const w = validateDuration(data);
        if (w.durationId) items.push({ href: "#duration-options", label: w.durationId });
        if (w.durationCustom) items.push({ href: "#duration-custom", label: w.durationCustom });
        break;
      }
      case "coords": {
        const w = validateCoords(data);
        if (w.firstname) items.push({ href: `#coords-firstname`, label: w.firstname });
        if (w.lastname) items.push({ href: `#coords-lastname`, label: w.lastname });
        if (w.email) items.push({ href: `#coords-email`, label: w.email });
        if (w.phone) items.push({ href: `#coords-phone`, label: w.phone });
        if (w.consentAccepted) items.push({ href: `#coords-consent`, label: w.consentAccepted });
        break;
      }
    }
    return items;
  }, [currentStep, data]);

  async function handleSubmitFinal() {
    setError("");
    if (submitting) return; // prevent double-submit
    if (!isFormValid(data)) { setError("Le formulaire contient des erreurs."); return; }
    if (data.isSeniorOrFragile === "yes" && !data.sensitiveConsentAccepted) { setError("Le consentement explicite est requis."); return; }

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

      {showSummary && !canContinue && errorItems.length > 0 && (
        <div ref={summaryRef} role="alert" aria-live="polite" tabIndex={-1} style={{ border: "1px solid rgba(255,255,255,.2)", borderRadius: ".5rem", padding: ".75rem", marginBottom: "1rem", minHeight: "2.5rem" }}>
          <p role="status" aria-live="polite" className={cx(ui.srOnly)}>Erreurs détectées dans le formulaire</p>
          <p style={{ margin: 0, marginBottom: ".5rem" }}>Veuillez corriger les points suivants&nbsp;:</p>
          <ul style={{ margin: 0, paddingLeft: "1rem" }}>
            {errorItems.map((it, i) => (
              <li key={i}><a href={it.href} style={{ color: "inherit", textDecoration: "underline" }}>{it.label}</a></li>
            ))}
          </ul>
        </div>
      )}

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
        <StepObjective data={data} onChange={(p) => setField(p)} onPrev={goPrev} onNext={tryNext} canNext={canContinue} />
      )}

      {currentStep === "ageFragility" && (
        <StepAgeFragility data={data} onChange={(p) => setField(p)} onPrev={goPrev} onNext={tryNext} canNext={canContinue} />
      )}

      {currentStep === "duration" && (
        <StepDuration data={data} onChange={(p) => setField(p)} onPrev={goPrev} onNext={tryNext} canNext={canContinue} />
      )}

      {currentStep === "coords" && (
        <StepCoords data={data} onChange={(p) => setField(p)} onPrev={goPrev} onNext={tryNext} canNext={canContinue} />
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
