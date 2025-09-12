// src/js/types/rdvTypes.ts
// Types + Props partagés

export type StepKey =
  | "type"
  | "objective"
  | "ageFragility"
  | "duration"
  | "coords"
  | "review";

export type YesNoNa = "yes" | "no" | "na";
export type DurationValue = "3m" | "6m" | "12m" | "other";

export type AppointmentData = {
  // 1) Type
  typeId: "entreprise" | "particulier" | "";

  // 2) Objectif
  objectiveNotes: string;

  // 3) Âge + fragilité
  age: number | "";
  isSeniorOrFragile: YesNoNa;
  fragilityNotes: string;

  // 4) Durée
  durationId: DurationValue | "";
  durationCustom: string;

  // 5) Coordonnées
  firstname: string;
  lastname: string;
  email: string;
  phone: string;
  notes: string;

  // Divers
  consentAccepted: boolean; // RGPD (contact)
  website: string;          // honeypot anti-spam
  // Consentement explicite pour données sensibles (étape 3)
  sensitiveConsentAccepted?: boolean;
};

/* --------- Événements envoyés par le step Review --------- */
export type SubmitEvent =
  | { type: "change"; payload: Partial<AppointmentData> }
  | { type: "submit" };

export type SubmitEventFn = (evt: SubmitEvent) => void;
export type VoidFn = () => void;

/* --------- props navigation --------- */
export interface StepNavProps {
  onPrev?: VoidFn;
  onNext?: VoidFn;
  canNext?: boolean;
}

/* --------- header --------- */
export interface StepHeaderProps {
  step: number;   // 1-based
  total: number;
  timeLeftMin?: number;
  onGotoStep?: (oneBasedIndex: number) => void; // navigation via les points
}

/* --------- chaque step --------- */
export interface StepTypeProps extends StepNavProps {
  data: AppointmentData;
  onChange: (value: AppointmentData["typeId"]) => void;
}

export interface StepObjectiveProps extends StepNavProps {
  data: AppointmentData;
  onChange: (partial: Pick<AppointmentData, "objectiveNotes">) => void;
}

export interface StepAgeFragilityProps extends StepNavProps {
  data: AppointmentData;
  onChange: (
    partial: Partial<Pick<AppointmentData, "age" | "isSeniorOrFragile" | "fragilityNotes" | "sensitiveConsentAccepted">>
  ) => void;
}

export interface StepDurationProps extends StepNavProps {
  data: AppointmentData;
  onChange: (partial: Partial<Pick<AppointmentData, "durationId" | "durationCustom">>) => void;
}

export interface StepCoordsProps extends StepNavProps {
  data: AppointmentData;
  onChange: (partial: Partial<Pick<AppointmentData,
    "firstname" | "lastname" | "email" | "phone" | "notes" | "consentAccepted">>) => void;
}

/* --------- review --------- */
export interface StepReviewProps {
  data: AppointmentData;
  onPrev?: VoidFn;
  onSubmit: SubmitEventFn;
  submitting?: boolean;
}

