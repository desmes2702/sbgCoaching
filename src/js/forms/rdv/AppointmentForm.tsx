// FILE: src/js/forms/rdv/AppointmentForm.tsx
/**
 * @file Main orchestrator for the multi-step appointment form.
 */
import React, { useReducer, useState } from "react";
import { rdvReducer, initialRdvState } from "./state/rdvReducer.ts";
import { useLocalStorage } from "./hooks/useLocalStorage.ts";
import { isStepValid, isFormFullyValid } from "./utils/validation.ts";

import Progress from "./components/Progress.tsx";
import StepType from "./steps/StepType.tsx";
import StepDuration from "./steps/StepDuration.tsx";
import StepFragility from "./steps/StepFragility.tsx";
import StepObjective from "./steps/StepObjective.tsx";
import StepReview from "./steps/StepReview.tsx";

const steps = ["Type", "Durée", "Infos", "Objectif", "Récap"];
const stepComponents = [
  StepType,
  StepDuration,
  StepFragility,
  StepObjective,
  StepReview,
];

const AppointmentForm: React.FC = () => {
  const [state, dispatch] = useReducer(rdvReducer, initialRdvState);
  useLocalStorage(state, dispatch);

  const [validationError, setValidationError] = useState<string | null>(null);

  const CurrentStepComponent = stepComponents[state.currentStep];

  const handleNext = () => {
    if (isStepValid(state.currentStep, state.data)) {
      setValidationError(null);
      if (state.currentStep === 3) { // Before review step
          dispatch({ type: "ENTER_REVIEW" });
      } else {
          dispatch({ type: "VALIDATE_AND_GO_NEXT" });
      }
    } else {
      setValidationError("Veuillez compléter l'étape avant de continuer.");
    }
  };

  const handlePrev = () => {
    setValidationError(null);
    dispatch({ type: "PREV_STEP" });
  };

  const handleStepClick = (stepIndex: number) => {
    if (stepIndex === 4 && state.maxReachableStep >= 4) {
        dispatch({ type: "ENTER_REVIEW" });
    } else {
        dispatch({ type: "GO_TO_STEP", payload: stepIndex });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setValidationError(null);

    if (!isFormFullyValid(state.data)) {
        setValidationError("Le formulaire n'est pas complet. Veuillez vérifier toutes les étapes.");
        return;
    }
    
    if (state.honeypot) return;
    if (Date.now() - state.startTime < 3000) return;

    dispatch({ type: "SUBMIT_START" });

    try {
      const response = await fetch("/api/rdv/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ data: state.data, meta: { userAgent: navigator.userAgent, ts: new Date().toISOString() } }),
      });
      if (!response.ok) throw new Error((await response.json()).message || "Une erreur est survenue.");
      dispatch({ type: "SUBMIT_SUCCESS" });
    } catch (error) {
      dispatch({ type: "SUBMIT_ERROR", payload: error instanceof Error ? error.message : "Erreur inconnue." });
    }
  };
  
  if (!state.isHydrated) return <div>Chargement...</div>;
  
  if (state.submission.status === 'success') {
    return (
        <div className="submission-feedback submission-feedback--success" role="alert">
            <h3>Demande envoyée !</h3>
            <p>Merci. Nous avons bien reçu votre demande et nous vous recontacterons bientôt.</p>
            <button type="button" onClick={() => dispatch({type: 'RESET'})} className="button button--primary">Nouvelle demande</button>
        </div>
    );
  }

  return (
    <form className="rdv-form" onSubmit={handleSubmit} noValidate>
      <Progress 
        currentStep={state.currentStep} 
        maxReachableStep={state.maxReachableStep}
        steps={steps} 
        dispatch={dispatch} 
      />

      <div className="step-content">
        <CurrentStepComponent state={state} dispatch={dispatch} mode="full" />
      </div>
      
      {state.submission.status === 'error' && (
         <div className="submission-feedback submission-feedback--error" role="alert">
            <h3>Erreur de soumission</h3>
            <p>{state.submission.error}</p>
        </div>
      )}

      <div className="controls">
        {state.currentStep > 0 && (
            <button type="button" onClick={handlePrev} disabled={state.submission.status === 'pending'} className="button button--ghost">Précédent</button>
        )}

        {validationError && (
            <p className="form__error" role="status" aria-live="assertive">{validationError}</p>
        )}

        {state.currentStep < steps.length - 1 ? (
          <button type="button" onClick={handleNext} disabled={!isStepValid(state.currentStep, state.data)} className="button button--primary" style={{marginLeft: 'auto'}}>Continuer</button>
        ) : (
           <button type="submit" disabled={!isFormFullyValid(state.data) || state.submission.status === 'pending'} className="button button--primary" style={{marginLeft: 'auto'}}>
                {state.submission.status === 'pending' ? 'Envoi en cours...' : 'Envoyer la demande'}
            </button>
        )}
      </div>

      <input
        type="text"
        name="website"
        autoComplete="off"
        value={state.honeypot}
        onChange={(e) => dispatch({ type: "SET_HONEYPOT", payload: e.target.value })}
        className="sr-only"
        tabIndex={-1}
        aria-hidden="true"
      />

      <div className="toast" role="status" aria-live="polite">
        {state.toasts.map(t => (
            <div key={t.id} className="toast__item">
            <p className="toast__message">{t.message}</p>
            <button className="toast__close" onClick={() => dispatch({ type:"TOAST_DISMISS", payload:{ id: t.id }})} aria-label="Fermer la notification">×</button>
            </div>
        ))}
      </div>
    </form>
  );
};

export default AppointmentForm;
