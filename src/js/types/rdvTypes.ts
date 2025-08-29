// src/js/types/rdvTypes.ts

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
  typeId: "entreprise" | "particulier" | "";
  objectiveNotes: string;
  age: number | "";
  isSeniorOrFragile: YesNoNa;
  fragilityNotes: string;
  durationId: DurationValue | "";
  durationCustom: string;
  firstname: string;
  lastname: string;
  email: string;
  phone: string;
  notes: string;
  consentAccepted: boolean; // RGPD
  website: string; // honeypot anti‑spam
};

export type SubmitEvent =
  | { type: "change"; payload: Partial<AppointmentData> }
  | { type: "submit" };
export type SubmitEventFn = (evt: SubmitEvent) => void;

export type VoidFn = () => void;

export interface StepNavProps {
  onPrev?: VoidFn;
  onNext?: VoidFn;
  canNext?: boolean;
}

export interface StepHeaderProps {
  step: number; // 1‑based
  total: number;
  timeLeftMin?: number;
}

export interface StepTypeProps extends StepNavProps {
  data: AppointmentData;
  onChange: (value: AppointmentData["typeId"]) => void;
}

export interface StepObjectiveProps extends StepNavProps {
  data: AppointmentData;
  onChange: (partial: Partial<AppointmentData>) => void;
}

export interface StepAgeFragilityProps extends StepNavProps {
  data: AppointmentData;
  onChange: (partial: Partial<AppointmentData>) => void;
}

export interface StepDurationProps extends StepNavProps {
  data: AppointmentData;
  onChange: (partial: Partial<AppointmentData>) => void;
}

export interface StepCoordsProps extends StepNavProps {
  data: AppointmentData;
  onChange: (partial: Partial<AppointmentData>) => void;
}

export interface StepReviewProps {
  data: AppointmentData;
  onPrev?: VoidFn;
  onSubmit: SubmitEventFn;
  submitting?: boolean;
}
