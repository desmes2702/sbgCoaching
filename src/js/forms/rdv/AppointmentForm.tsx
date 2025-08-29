// FILE: src/js/forms/rdv/AppointmentForm.tsx
/**
 * @file Main orchestrator for the multi-step appointment form.
 */
import React, { useReducer } from "react";
import { rdvReducer, initialRdvState } from "./state/rdvReducer.ts";
import { useLocalStorage } from "./hooks/useLocalStorage.ts";
// Import the new validation functions
import { validateStep, validateForm } from "./utils/validation.ts";
import { submitAppointment } from "./api/submit.ts"; // New import for submission logic

import Progress from "./components/Progress.tsx";
import FormError from "./components/FormError.tsx";
import FormSuccess from "./components/FormSuccess.tsx"; // New import for success component
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

  const CurrentStepComponent = stepComponents[state.currentStep];

  const handleNext = () => {
    const stepValidationResult = validateStep(state.currentStep, state.data);
    if (stepValidationResult.valid) {
      dispatch({ type: "SET_GLOBAL_ERROR", payload: null }); // Clear global error on valid step
      if (state.currentStep === 3) { // Before review step
          dispatch({ type: "ENTER_REVIEW" });
      } else {
          dispatch({ type: "VALIDATE_AND_GO_NEXT" });
      }
    } else {
      // For now, just display a generic message. Later, we can pass stepValidationResult.errors to FormError
      dispatch({ type: "SET_GLOBAL_ERROR", payload: "Veuillez compléter l'étape avant de continuer." });
    }
  };

  const handlePrev = () => {
    dispatch({ type: "SET_GLOBAL_ERROR", payload: null }); // Clear global error on prev step
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
    dispatch({ type: "SET_GLOBAL_ERROR", payload: null }); // Clear global error on submit attempt

    const formValidationResult = validateForm(state.data);
    if (!formValidationResult.valid) {
        // For now, just display a generic message. Later, we can pass formValidationResult.errors to FormError
        dispatch({ type: "SET_GLOBAL_ERROR", payload: "Le formulaire n'est pas complet. Veuillez vérifier toutes les étapes." });
        return;
    }
    
    // Call the new submitAppointment function
    await submitAppointment({
      data: state.data,
      honeypot: state.honeypot,
      startTime: state.startTime,
      dispatch: dispatch,
      // enableCaptcha: true, // Enable this when CAPTCHA is configured
      // getCaptchaToken: async () => { /* Implement CAPTCHA token retrieval here */ return null; },
    });
  };
  
  if (!state.isHydrated) return <div>Chargement...</div>;
  
  if (state.submission.status === 'success') {
    return (
        <FormSuccess onReset={() => dispatch({type: 'RESET'})} /> // Use FormSuccess component
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

      {(state.globalError || (state.submission.status === 'error' && state.submission.error)) && (
        <FormError globalMessage={state.globalError || state.submission.error || "Une erreur est survenue."} />
      )}

      <div className="step-content">
        <CurrentStepComponent state={state} dispatch={dispatch} mode="full" />
      </div>
      
      <div className="controls">
        {state.currentStep > 0 && (
            <button type="button" onClick={handlePrev} disabled={state.submission.status === 'pending'} className="button button--ghost">Précédent</button>
        )}

        {state.currentStep < steps.length - 1 ? (
          <button type="button" onClick={handleNext} disabled={!validateStep(state.currentStep, state.data).valid} className="button button--primary" style={{marginLeft: 'auto'}}>Continuer</button>
        ) : (
           <button type="submit" disabled={!validateForm(state.data).valid || state.submission.status === 'pending'} className="button button--primary" style={{marginLeft: 'auto'}}>
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