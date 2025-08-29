export type DurationValue = "3m" | "6m" | "12m" | "autre";

export type YesNoNa = "yes" | "no" | "na";

export interface AppointmentData {
  typeId: "" | "entreprise" | "particulier";
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
  consentAccepted: boolean;
  website: string;
  files?: { name: string; type: string; size: number; base64: string }[];
}

export type StepKey = "type" | "objective" | "ageFragility" | "duration" | "coords" | "review";

export interface StepProps {
  data: AppointmentData;
  onChange: (partial: Partial<AppointmentData>) => void;
  onPrev?: () => void;
  onNext?: () => void;
  canNext?: boolean;
}

export interface StepTypeProps extends StepProps {
  onChange: (typeId: AppointmentData['typeId']) => void;
}

export interface StepObjectiveProps extends StepProps {}
export interface StepAgeFragilityProps extends StepProps {}
export interface StepDurationProps extends StepProps {}
export interface StepCoordsProps extends StepProps {}
export interface StepReviewProps extends StepProps {
  onSubmit: (event: SubmitEvent) => void;
  submitting: boolean;
}

export type SubmitEvent = { type: "change"; payload: Partial<AppointmentData> } | { type: "submit" };