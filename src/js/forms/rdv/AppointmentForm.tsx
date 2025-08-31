// FILE: src/js/forms/rdv/AppointmentForm.tsx
/**
 * @file Main orchestrator for the multi-step appointment form.
 */
import React, { useReducer, Suspense } from "react";
import { rdvReducer, initialRdvState } from "./state/rdvReducer.ts";
import { useLocalStorage } from "./hooks/useLocalStorage.ts";
import useFocusManagement from "./hooks/useFocusManagement.ts"; // Import the new hook
// Import the new validation functions
import { validateStep, validateForm } from "./utils/validation.ts";
import { submitAppointment } from "./api/submit.ts"; // New import for submission logic

import Progress from "./components/Progress.tsx";
import FormError from "./components/FormError.tsx";
import FormSuccess from "./components/FormSuccess.tsx";
const StepType = React.lazy(() => import("./steps/StepType.tsx"));
const StepDuration = React.lazy(() => import("./steps/StepDuration.tsx"));
const StepFragility = React.lazy(() => import("./steps/StepFragility.tsx"));
const StepObjective = React.lazy(() => import("./steps/StepObjective.tsx"));
const StepCoord = React.lazy(() => import("./steps/StepCoord.tsx")); // New import for StepCoord
const StepReview = React.lazy(() => import("./steps/StepReview.tsx"));

// Adjust steps and stepComponents arrays
const steps = ["Type", "Durée", "Infos", "Objectif", "Coordonnées", "Récap"];
const stepComponents = [
  StepType,
  StepDuration,
  StepFragility,
  StepObjective,
  StepCoord, // Add StepCoord
  StepReview,
];

const AppointmentForm: React.FC = () => {
  const [state, dispatch] = useReducer(rdvReducer, initialRdvState);
  useLocalStorage(state, dispatch);
  useFocusManagement(state.validationErrors, state.globalError); // Call the new hook

  // Préchargement idle de la step suivante
  React.useEffect(() => {
    const nextStepIndex = state.currentStep + 1;
    if (nextStepIndex < stepComponents.length) {
      const id = window.requestIdleCallback?.(() => {
        // Dynamically import the next step component
        // The stepComponents array already holds the lazy-loaded components,
        // so we just need to trigger their loading.
        // Accessing stepComponents[nextStepIndex] will trigger the import.
        void stepComponents[nextStepIndex]; 
      });
      return () => id && window.cancelIdleCallback?.(id);
    }
  }, [state.currentStep]);

  const CurrentStepComponent = stepComponents[state.currentStep];

  const handleNext = () => {
    console.log("Current step data before validation:", state.data); // Debugging line
    const stepValidationResult = validateStep(state.currentStep, state.data);
    console.log("Step validation result:", stepValidationResult); // Debugging line

    if (stepValidationResult.valid) {
      dispatch({ type: "SET_VALIDATION_ERRORS", payload: null }); // Clear validation errors on valid step
      dispatch({ type: "SET_GLOBAL_ERROR", payload: null }); // Clear global error on valid step
      // Adjust step index for review
      if (state.currentStep === 4) { // Before review step (now index 4)
          dispatch({ type: "ENTER_REVIEW" });
      } else {
          dispatch({ type: "VALIDATE_AND_GO_NEXT" });
      }
    }
    else {
      dispatch({ type: "SET_VALIDATION_ERRORS", payload: stepValidationResult.errors }); // Set detailed validation errors
      dispatch({ type: "SET_GLOBAL_ERROR", payload: "Veuillez compléter l'étape avant de continuer." }); // Keep generic message for now
    }
  };

  const handlePrev = () => {
    dispatch({ type: "SET_GLOBAL_ERROR", payload: null }); // Clear global error on prev step
    dispatch({ type: "SET_VALIDATION_ERRORS", payload: null }); // Clear validation errors on prev step
    dispatch({ type: "PREV_STEP" });
  };

  const handleStepClick = (stepIndex: number) => {
    // Adjust step index for review
    if (stepIndex === 5 && state.maxReachableStep >= 5) { // Review step is now index 5
        dispatch({ type: "ENTER_REVIEW" });
    } else {
        dispatch({ type: "GO_TO_STEP", payload: stepIndex });
    }
  };

  const [submitCooldown, setSubmitCooldown] = React.useState(false); // Add submitCooldown state

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (submitCooldown) return; // Prevent multiple submissions during cooldown
    
    dispatch({ type: "SET_GLOBAL_ERROR", payload: null }); // Clear global error on submit attempt
    dispatch({ type: "SET_VALIDATION_ERRORS", payload: null }); // Clear validation errors on submit attempt

    const formValidationResult = validateForm(state.data);
    if (!formValidationResult.valid) {
        dispatch({ type: "SET_VALIDATION_ERRORS", payload: formValidationResult.errors }); // Set detailed validation errors
        dispatch({ type: "SET_GLOBAL_ERROR", payload: "Le formulaire n'est pas complet. Veuillez vérifier toutes les étapes." }); // Keep generic message for now
        return;
    }
    
    setSubmitCooldown(true); // Start cooldown
    // Cooldown UX of 3 seconds
    setTimeout(() => setSubmitCooldown(false), 3000);

    let captchaToken: string | null = null;
    const CAPTCHA_ENABLED = import.meta.env.PUBLIC_CAPTCHA_ENABLED === 'true'; // Feature flag

    if (CAPTCHA_ENABLED) {
      try {
        // Ensure grecaptcha is loaded and available
        if (window.grecaptcha) {
          captchaToken = await window.grecaptcha.execute(import.meta.env.PUBLIC_CAPTCHA_SITE_KEY, { // Use PUBLIC_CAPTCHA_SITE_KEY
            action: 'rdv_submit'
          });
        } else {
          console.warn('grecaptcha is not loaded. Proceeding without CAPTCHA token.');
        }
      } catch (error) {
        // Graceful fallback if CAPTCHA fails
        console.warn('CAPTCHA failed, proceeding without token', error);
      }
    }

    // Call the new submitAppointment function
    await submitAppointment({
      data: state.data,
      honeypot: state.honeypot,
      startTime: state.startTime,
      dispatch: dispatch,
      captchaToken: captchaToken, // Pass captchaToken
    });
  };
  
  if (!state.isHydrated) return <div>Chargement...</div>;
  
  if (state.submission.status === 'success') {
    return (
        <FormSuccess onReset={() => dispatch({type: 'RESET'})} />
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
        <Suspense fallback={<div>Chargement de l'étape...</div>}>
          <CurrentStepComponent state={state} dispatch={dispatch} mode="full" validationErrors={state.validationErrors} />
        </Suspense>
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