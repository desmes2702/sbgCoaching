// FILE: src/js/forms/rdv/api/submit.ts
import type { RdvData, RdvAction } from "../types/rdvTypes.ts";

interface SubmitAppointmentOptions {
  data: RdvData;
  honeypot: string;
  startTime: number;
  dispatch: React.Dispatch<RdvAction>;
  // Add a feature flag for CAPTCHA
  enableCaptcha?: boolean;
  getCaptchaToken?: () => Promise<string | null>; // Function to get CAPTCHA token
}

export const submitAppointment = async ({
  data,
  honeypot,
  startTime,
  dispatch,
  enableCaptcha = false,
  getCaptchaToken,
}: SubmitAppointmentOptions): Promise<void> => {
  dispatch({ type: "SET_GLOBAL_ERROR", payload: null }); // Clear any previous global errors

  // Anti-spam: Honeypot check
  if (honeypot) {
    console.warn("Honeypot field filled. Blocking submission.");
    dispatch({ type: "SUBMIT_ERROR", payload: "Soumission bloquée: Détection de spam." });
    return;
  }

  // Anti-spam: Minimum delay check
  const minDelay = 2500; // 2.5 seconds
  if (Date.now() - startTime < minDelay) {
    console.warn("Submission too fast. Blocking submission.");
    dispatch({ type: "SUBMIT_ERROR", payload: `Soumission bloquée: Veuillez attendre au moins ${minDelay / 1000} secondes avant de soumettre.` });
    return;
  }

  // CAPTCHA integration (feature flag)
  let captchaToken: string | null = null;
  if (enableCaptcha && getCaptchaToken) {
    try {
      captchaToken = await getCaptchaToken();
      if (!captchaToken) {
        dispatch({ type: "SUBMIT_ERROR", payload: "Erreur CAPTCHA: Jeton non obtenu." });
        return;
      }
    } catch (error) {
      dispatch({ type: "SUBMIT_ERROR", payload: `Erreur CAPTCHA: ${error instanceof Error ? error.message : "Erreur inconnue."}` });
      return;
    }
  }

  dispatch({ type: "SUBMIT_START" });

  try {
    // TODO: Replace with actual backend endpoint from environment variable
    const backendUrl = import.meta.env.PUBLIC_BACKEND_API_URL || "/api/rdv/submit"; // Example placeholder

    // Mock submission for now
    if (backendUrl === "/api/rdv/submit") {
      console.log("Mocking submission:", { data, captchaToken });
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate network delay
      // Simulate success or error
      if (Math.random() > 0.1) { // 90% success rate for mock
        dispatch({ type: "SUBMIT_SUCCESS" });
      } else {
        dispatch({ type: "SUBMIT_ERROR", payload: "Erreur de soumission simulée." });
      }
      return;
    }

    const response = await fetch(backendUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        data: data,
        meta: {
          userAgent: navigator.userAgent,
          ts: new Date().toISOString(),
          captchaToken: captchaToken, // Include CAPTCHA token if available
        },
      }),
    });

    // TODO: Backend sanitization and validation are crucial here.
    // This frontend sanitization is minimal. For free text fields, consider DOMPurify.
    // Example: const sanitizedObjective = DOMPurify.sanitize(data.objective);

    if (!response.ok) throw new Error((await response.json()).message || "Une erreur est survenue.");
    dispatch({ type: "SUBMIT_SUCCESS" });
  } catch (error) {
    dispatch({ type: "SUBMIT_ERROR", payload: error instanceof Error ? error.message : "Erreur inconnue." });
  }
};
