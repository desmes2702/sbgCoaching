// FILE: src/js/forms/rdv/utils/validation.ts
import { z } from "zod";
import type { RdvData, RdvFile, CoordData } from "../types/rdvTypes.ts"; // Import CoordData

// --- Validation Constants ---
export const MAX_FILES = 3;
export const MAX_FILE_SIZE_MB = 5;
export const MAX_FILE_SIZE_BYTES = MAX_FILE_SIZE_MB * 1024 * 1024;
export const ALLOWED_FILE_TYPES = ["image/jpeg", "image/png", "application/pdf"];
export const MIN_OBJECTIVE_LENGTH = 10;
export const MIN_CUSTOM_DURATION = 1;
export const MAX_CUSTOM_DURATION = 24;

export type ValidationResult = {
  valid: boolean;
  errors: Record<string, string>;
};

// --- Zod Schemas ---
// --- Zod Schemas ---
// Schéma principal centralisé
export const RdvSchema = z.object({
  userType: z.enum(['particulier', 'entreprise'], {
    errorMap: () => ({ message: "Veuillez choisir Entreprise ou Particulier." }),
  }),
  durationKey: z.enum(['3-mois', '6-mois', '12-mois', 'autre'], {
    errorMap: () => ({ message: "Veuillez choisir une durée." }),
  }),
  customDurationMonths: z.preprocess(
    (val) => Number(val),
    z.number().int().min(MIN_CUSTOM_DURATION, `La durée personnalisée doit être entre ${MIN_CUSTOM_DURATION} et ${MAX_CUSTOM_DURATION} mois.`).max(MAX_CUSTOM_DURATION, `La durée personnalisée doit être entre ${MIN_CUSTOM_DURATION} et ${MAX_CUSTOM_DURATION} mois.`)
  ).optional(),
  fragility: z.enum(['oui', 'non', 'ne-precise-pas'], {
    errorMap: () => ({ message: "Veuillez indiquer votre situation." }),
  }),
  objective: z.string().min(MIN_OBJECTIVE_LENGTH, `Décrivez votre objectif (au moins ${MIN_OBJECTIVE_LENGTH} caractères).`).max(1000),
  coord: z.object({
    firstName: z.string().regex(/^[a-zA-Z\u00C0-\u017F\s-]{2,50}$/, "Prénom invalide (2-50 caractères, lettres, accents, tirets, espaces)."),
    lastName: z.string().regex(/^[a-zA-Z\u00C0-\u017F\s-]{2,50}$/, "Nom invalide (2-50 caractères, lettres, accents, tirets, espaces)."),
    email: z.string().email("Adresse email invalide."),
    phone: z.string().regex(/^[0-9\s\+\(\)\-]{7,20}$/, "Numéro de téléphone invalide (7-20 chiffres, accepte +, espaces, parenthèses, tirets)."),
    consentRgpd: z.boolean().refine(val => val === true, "Vous devez accepter la politique de confidentialité.")
  })
});

// Validateurs dérivés par étape
export const validateStep = (stepIndex: number, data: RdvData) => {
  const schemas = {
    0: RdvSchema.pick({ userType: true }),
    1: RdvSchema.pick({ durationKey: true, customDurationMonths: true }),
    2: RdvSchema.pick({ fragility: true }),
    3: RdvSchema.pick({ objective: true }),
    4: RdvSchema.pick({ coord: true })
  };
  
  const result = schemas[stepIndex]?.safeParse(data);
  return {
    valid: result?.success ?? false,
    errors: result?.success ? {} : result.error.flatten().fieldErrors
  };
};

// --- Form-level Validation ---
export const validateForm = (data: RdvData): ValidationResult => {
  const result = RdvSchema.safeParse(data);
  return {
    valid: result.success,
    errors: result.success ? {} : result.error.flatten().fieldErrors
  };
};

// --- Helper for checking if a section was modified (can be kept if needed elsewhere) ---
export function isSectionModified(k: string, a: RdvData, b?: RdvData): boolean {
  if (!b) return false;
  const pick = (d: RdvData) => {
    if (k === "type") return RdvSchema.pick({ userType: true }).parse(d);
    if (k === "duration") return RdvSchema.pick({ durationKey: true, customDurationMonths: true }).parse(d);
    if (k === "fragility") return RdvSchema.pick({ fragility: true }).parse(d);
    if (k === "objective") return RdvSchema.pick({ objective: true }).parse(d);
    if (k === "coord") return RdvSchema.pick({ coord: true }).parse(d);
    return {};
  };
  return JSON.stringify(pick(a)) !== JSON.stringify(pick(b));
}