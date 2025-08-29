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

export interface RdvData {
  userType: UserType | null;
  durationKey: DurationKey | null;
  customDurationMonths: number;
  fragility: Fragility | null;
  files: RdvFile[];
  objective: string;
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
}

export type RdvAction =
  | { type: "HYDRATE_FROM_STORAGE"; payload: Partial<RdvData> }
  | { type: "SET_USER_TYPE"; payload: UserType }
  | { type: "SET_DURATION"; payload: DurationKey }
  | { type: "SET_CUSTOM_DURATION"; payload: number }
  | { type: "SET_FRAGILITY"; payload: Fragility }
  | { type: "ADD_FILES"; payload: RdvFile[] }
  | { type: "REMOVE_FILE"; payload: string }
  | { type: "SET_OBJECTIVE"; payload: string }
  | { type: "SET_HONEYPOT"; payload: string }
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
  | { type: "SET_GLOBAL_ERROR"; payload: string | null }; // New action type

// --- Component Props ---
export interface StepProps {
  state: RdvState;
  dispatch: React.Dispatch<RdvAction>;
  mode?: "full" | "inline";
}
