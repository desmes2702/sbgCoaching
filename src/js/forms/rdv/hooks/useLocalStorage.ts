// FILE: src/js/forms/rdv/hooks/useLocalStorage.ts
/**
 * @file Custom hook to persist and retrieve form state from localStorage.
 */
import { useEffect } from "react";
import type { RdvState, RdvAction, RdvData } from "../types/rdvTypes.ts";

const STORAGE_KEY = "sbg-rdv-draft";

// Function to safely stringify state, omitting sensitive or irrelevant parts
function serializeState(state: RdvState): string {
  const dataToSave: Partial<RdvData> & { currentStep?: number } = {
    currentStep: state.currentStep,
    userType: state.userType,
    durationKey: state.durationKey,
    customDurationMonths: state.customDurationMonths,
    fragility: state.fragility,
    objective: state.objective,
    // We don't save files as they are not easily serializable and have security implications.
    // The user will need to re-upload them.
  };
  return JSON.stringify(dataToSave);
}

// Function to safely parse state from storage
function deserializeState(storedState: string): Partial<RdvData> {
  try {
    const parsed = JSON.parse(storedState);
    // Basic schema validation
    if (typeof parsed === "object" && parsed !== null) {
        // We only return data, not implementation details like currentStep
        const { userType, durationKey, customDurationMonths, fragility, objective, currentStep } = parsed;
        return { userType, durationKey, customDurationMonths, fragility, objective, currentStep };
    }
  } catch (error) {
    console.error("Failed to parse state from localStorage:", error);
  }
  return {};
}

export function useLocalStorage(
  state: RdvState,
  dispatch: React.Dispatch<RdvAction>
) {
  // On mount, try to hydrate state from localStorage
  useEffect(() => {
    try {
      const storedState = localStorage.getItem(STORAGE_KEY);
      if (storedState) {
        const persistedData = deserializeState(storedState);
        dispatch({ type: "HYDRATE_FROM_STORAGE", payload: persistedData });
      } else {
        // If no stored state, ensure we mark as hydrated to allow saving
        dispatch({ type: "HYDRATE_FROM_STORAGE", payload: {} });
      }
    } catch (error) {
      console.error("Could not read from localStorage:", error);
      dispatch({ type: "HYDRATE_FROM_STORAGE", payload: {} });
    }
  }, [dispatch]);

  // On state change, persist to localStorage
  useEffect(() => {
    // Only save if hydration is complete and form is not successfully submitted
    if (state.isHydrated && state.submission.status !== "success") {
      try {
        const serializedState = serializeState(state);
        localStorage.setItem(STORAGE_KEY, serializedState);
      } catch (error) {
        console.error("Could not write to localStorage:", error);
      }
    }
    // If submission is successful, clear the stored draft
    if (state.submission.status === "success") {
        try {
            localStorage.removeItem(STORAGE_KEY);
        } catch (error) {
            console.error("Could not remove item from localStorage:", error);
        }
    }
  }, [state]);
}
