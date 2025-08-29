// FILE: src/js/forms/rdv/state/rdvReducer.ts
/**
 * @file Reducer for managing the state of the multi-step appointment form.
 */

import type { RdvState, RdvAction } from "../types/rdvTypes.ts";
import { MAX_FILES } from "../utils/validation.ts";

export const initialRdvState: RdvState = {
  currentStep: 0,
  maxReachableStep: 0,
  isHydrated: false,
  data: {
    userType: null,
    durationKey: null,
    customDurationMonths: 1,
    fragility: null,
    files: [],
    objective: "",
  },
  reviewBaseline: undefined,
  submission: {
    status: "idle",
    error: null,
  },
  toasts: [],
  honeypot: "",
  startTime: Date.now(),
  globalError: null, // Initialize globalError
};

export function rdvReducer(state: RdvState, action: RdvAction): RdvState {
  switch (action.type) {
    case "HYDRATE_FROM_STORAGE": {
      return {
        ...state,
        data: { ...state.data, ...action.payload },
        isHydrated: true,
        submission: initialRdvState.submission,
        startTime: Date.now(),
        globalError: null, // Clear global error on hydration
      };
    }

    // --- Data mutations ---
    case "SET_USER_TYPE":
      return { ...state, data: { ...state.data, userType: action.payload } };
    case "SET_DURATION":
      return { ...state, data: { ...state.data, durationKey: action.payload } };
    case "SET_CUSTOM_DURATION":
      return { ...state, data: { ...state.data, customDurationMonths: action.payload } };
    case "SET_FRAGILITY":
      return { ...state, data: { ...state.data, fragility: action.payload, files: action.payload !== "oui" ? [] : state.data.files } };
    case "ADD_FILES": {
      const newFiles = [...state.data.files, ...action.payload].slice(0, MAX_FILES);
      return { ...state, data: { ...state.data, files: newFiles } };
    }
    case "REMOVE_FILE": {
      const updatedFiles = state.data.files.filter((file) => file.id !== action.payload);
      return { ...state, data: { ...state.data, files: updatedFiles } };
    }
    case "SET_OBJECTIVE":
      return { ...state, data: { ...state.data, objective: action.payload } };
    case "SET_HONEYPOT":
      return { ...state, honeypot: action.payload };

    // --- Navigation ---
    case "GO_TO_STEP":
      if (action.payload >= 0 && action.payload <= state.maxReachableStep) {
        return { ...state, currentStep: action.payload };
      }
      return state;
    case "VALIDATE_AND_GO_NEXT":
        const nextStep = state.currentStep + 1;
        return {
            ...state,
            currentStep: nextStep,
            maxReachableStep: Math.max(state.maxReachableStep, nextStep),
        };
    case "PREV_STEP":
      return { ...state, currentStep: state.currentStep - 1 };
    case "ENTER_REVIEW":
        return { ...state, currentStep: 4, reviewBaseline: structuredClone(state.data) };
    case "SNAPSHOT_REVIEW_BASELINE":
        return { ...state, reviewBaseline: structuredClone(state.data) };

    // --- Submission ---
    case "SUBMIT_START":
      return { ...state, submission: { status: "pending", error: null } };
    case "SUBMIT_SUCCESS":
      return { ...state, submission: { status: "success", error: null } };
    case "SUBMIT_ERROR":
      return { ...state, submission: { status: "error", error: action.payload }, globalError: null }; // Clear global error on submission error
    case "RESET":
      return { ...initialRdvState, isHydrated: state.isHydrated, startTime: Date.now() };

    // --- New Global Error Handling ---
    case "SET_GLOBAL_ERROR":
      return { ...state, globalError: action.payload, submission: { status: "idle", error: null } }; // Clear submission error when setting global error

    // --- Toasts ---
    case "TOAST_SHOW": {
        const id = String(Date.now());
        return { ...state, toasts: [...state.toasts, { id, message: action.payload.message }] };
    }
    case "TOAST_DISMISS": {
        return { ...state, toasts: state.toasts.filter(t => t.id !== action.payload.id) };
    }

    default:
      return state;
  }
}
