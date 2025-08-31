// FILE: src/js/forms/rdv/state/rdvReducer.ts
/**
 * @file Reducer for managing the state of the multi-step appointment form.
 */

import type { RdvState, RdvAction } from "../types/rdvTypes.ts";
// MAX_FILES is no longer needed here as files are not part of RdvData
// import { MAX_FILES } from "../utils/validation.ts";

export const initialRdvState: RdvState = {
  currentStep: 0,
  maxReachableStep: 0,
  isHydrated: false,
  data: {
    userType: "particulier", // Default to a valid value
    durationKey: "3-mois", // Default to a valid value
    customDurationMonths: 1,
    fragility: "non", // Default to a valid value
    objective: "",
    coord: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      preferredSlot: "",
      message: "",
      consentRgpd: false,
    },
  },
  reviewBaseline: undefined,
  submission: {
    status: "idle",
    error: null,
  },
  toasts: [],
  honeypot: "",
  startTime: Date.now(),
  globalError: null,
  validationErrors: null,
};

export function rdvReducer(state: RdvState, action: RdvAction): RdvState {
  switch (action.type) {
    case "HYDRATE_FROM_STORAGE": {
      return {
        ...state,
        data: {
          ...state.data,
          ...action.payload,
          objective: action.payload.objective ?? state.data.objective,
          coord: {
            ...state.data.coord,
            ...action.payload.coord,
            firstName: action.payload.coord?.firstName ?? state.data.coord.firstName,
            lastName: action.payload.coord?.lastName ?? state.data.coord.lastName,
            email: action.payload.coord?.email ?? state.data.coord.email,
            phone: action.payload.coord?.phone ?? state.data.coord.phone,
            preferredSlot: action.payload.coord?.preferredSlot ?? state.data.coord.preferredSlot,
            message: action.payload.coord?.message ?? state.data.coord.message,
            consentRgpd: action.payload.coord?.consentRgpd ?? state.data.coord.consentRgpd,
          }
        },
        isHydrated: true,
        submission: initialRdvState.submission,
        startTime: Date.now(),
        globalError: null,
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
      return { ...state, data: { ...state.data, fragility: action.payload } }; // Removed files logic
    case "SET_OBJECTIVE":
      return { ...state, data: { ...state.data, objective: action.payload } }; // Removed ?? ""
    case "SET_HONEYPOT":
      return { ...state, honeypot: action.payload };

    // --- New CoordData mutations ---
    case "SET_FIRST_NAME":
      return { ...state, data: { ...state.data, coord: { ...state.data.coord, firstName: action.payload } } };
    case "SET_LAST_NAME":
      return { ...state, data: { ...state.data, coord: { ...state.data.coord, lastName: action.payload } } };
    case "SET_EMAIL":
      return { ...state, data: { ...state.data, coord: { ...state.data.coord, email: action.payload } } };
    case "SET_PHONE":
      return { ...state, data: { ...state.data, coord: { ...state.data.coord, phone: action.payload } } };
    case "SET_PREFERRED_SLOT":
      return { ...state, data: { ...state.data, coord: { ...state.data.coord, preferredSlot: action.payload } } };
    case "SET_MESSAGE":
      return { ...state, data: { ...state.data, coord: { ...state.data.coord, message: action.payload } } };
    case "SET_CONSENT_RGPD":
      return { ...state, data: { ...state.data, coord: { ...state.data.coord, consentRgpd: action.payload } } };

    // --- Navigation ---
    case "GO_TO_STEP":
      if (action.payload >= 0 && action.payload <= state.maxReachableStep) {
        return { ...state, currentStep: action.payload, validationErrors: null, globalError: null };
      }
      return state;
    case "VALIDATE_AND_GO_NEXT":
        const nextStep = state.currentStep + 1;
        return {
            ...state,
            currentStep: nextStep,
            maxReachableStep: Math.max(state.maxReachableStep, nextStep),
            validationErrors: null,
            globalError: null,
        };
    case "PREV_STEP":
      return { ...state, currentStep: state.currentStep - 1, validationErrors: null, globalError: null };
    case "ENTER_REVIEW":
        return {
            ...state,
            currentStep: 5,
            maxReachableStep: Math.max(state.maxReachableStep, 5),
            reviewBaseline: structuredClone(state.data),
            validationErrors: null,
            globalError: null,
        };
    case "SNAPSHOT_REVIEW_BASELINE":
        return { ...state, reviewBaseline: structuredClone(state.data) };

    // --- Submission ---
    case "SUBMIT_START":
      return { ...state, submission: { status: "pending", error: null }, validationErrors: null, globalError: null };
    case "SUBMIT_SUCCESS":
      return { ...state, submission: { status: "success", error: null }, validationErrors: null, globalError: null };
    case "SUBMIT_ERROR":
      return { ...state, submission: { status: "error", error: action.payload }, globalError: null, validationErrors: null };
    case "RESET":
      return { ...initialRdvState, isHydrated: state.isHydrated, startTime: Date.now(), validationErrors: null, globalError: null };

    // --- New Global Error Handling ---
    case "SET_GLOBAL_ERROR":
      return { ...state, globalError: action.payload, submission: { status: "idle", error: null }, validationErrors: null };
    case "SET_VALIDATION_ERRORS":
      return { ...state, validationErrors: action.payload, globalError: null };

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
