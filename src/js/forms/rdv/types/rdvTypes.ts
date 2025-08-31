// FILE: src/js/forms/rdv/types/rdvTypes.ts
/**
 * @file Defines the core TypeScript types for the appointment form state and props.
 */

// --- Data Structures ---
export type UserType = "entreprise" | "particulier";
export type DurationKey = "3m" | "6m" | "12m" | "autre";
export type Fragility = "oui" | "non" | "ne-precise-pas";

export interface RdvFile {
  id: string;
  file: File;
  name: string;
  type: string;
  size: number;
  previewUrl?: string;
  base64?: string;
}

// New CoordData type
export type CoordData = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  preferredSlot?: string;   // ex. "Matin", "Midi", "Après-midi", "Soir"
  message?: string;         // optionnel
  consentRgpd: boolean;     // case à cocher obligatoire
};

export interface RdvData {
  userType: UserType;
  durationKey: DurationKey;
  customDurationMonths?: number;
  fragility: Fragility;
  objective: string;
  coord: CoordData;
}

export interface Toast {
    id: string;
    message: string;
}

// --- State & Actions ---
export interface RdvState {
  data: RdvData;
  currentStep: number;
  maxReachableStep: number;
  reviewBaseline?: RdvData; // Snapshot for comparing modifications
  isHydrated: boolean;
  submission: {
    status: "idle" | "pending" | "success" | "error";
    error: string | null;
  };
  toasts: Toast[];
  honeypot: string;
  startTime: number;
  globalError: string | null; // New field for global errors
  validationErrors: Record<string, string> | null; // New field for detailed validation errors
}

export type RdvAction =
  | { type: "HYDRATE_FROM_STORAGE"; payload: Partial<RdvData> }
  | { type: "SET_USER_TYPE"; payload: UserType }
  | { type: "SET_DURATION"; payload: DurationKey }
  | { type: "SET_CUSTOM_DURATION"; payload: number }
  | { type: "SET_FRAGILITY"; payload: Fragility }
  | { type: "SET_OBJECTIVE"; payload: string }
  | { type: "SET_HONEYPOT"; payload: string }
  // New actions for CoordData
  | { type: "SET_FIRST_NAME"; payload: string }
  | { type: "SET_LAST_NAME"; payload: string }
  | { type: "SET_EMAIL"; payload: string }
  | { type: "SET_PHONE"; payload: string }
  | { type: "SET_PREFERRED_SLOT"; payload: string }
  | { type: "SET_MESSAGE"; payload: string }
  | { type: "SET_CONSENT_RGPD"; payload: boolean }
  | { type: "GO_TO_STEP"; payload: number }
  | { type: "VALIDATE_AND_GO_NEXT" }
  | { type: "PREV_STEP" }
  | { type: "ENTER_REVIEW" }
  | { type: "SNAPSHOT_REVIEW_BASELINE" }
  | { type: "SUBMIT_START" }
  | { type: "SUBMIT_SUCCESS" }
  | { type: "SUBMIT_ERROR"; payload: string }
  | { type: "RESET" }
  | { type: "TOAST_SHOW"; payload: { message: string } }
  | { type: "TOAST_DISMISS"; payload: { id: string } }
  | { type: "SET_GLOBAL_ERROR"; payload: string | null }
  | { type: "SET_VALIDATION_ERRORS"; payload: Record<string, string> | null }; // New action for validation errors

// --- Component Props ---
export interface StepProps {
  state: RdvState;
  dispatch: React.Dispatch<RdvAction>;
  mode?: "full" | "inline";
  validationErrors?: Record<string, string> | null; // New field for detailed validation errors
}