// FILE: src/js/forms/rdv/utils/validation.ts
import type { RdvData, RdvFile, CoordData } from "../types/rdvTypes.ts"; // Import CoordData

// --- Validation Constants ---
export const MAX_FILES = 3;
export const MAX_FILE_SIZE_MB = 5;
export const MAX_FILE_SIZE_BYTES = MAX_FILE_SIZE_MB * 1024 * 1024;
export const ALLOWED_FILE_TYPES = ["image/jpeg", "image/png", "application/pdf"];
export const MIN_OBJECTIVE_LENGTH = 10;
export const MIN_CUSTOM_DURATION = 1;
export const MAX_CUSTOM_DURATION = 24;

// Regex for name validation (letters, accents, hyphens, spaces)
const NAME_REGEX = /^[a-zA-Z\u00C0-\u017F\s-]{2,50}$/;
// Basic email regex (RFC basique)
const EMAIL_REGEX = /^[^"]@["]+\.[^"]{2,}$/;
// Phone regex (7-20 digits, accepts spaces, +, (, ), -)
const PHONE_REGEX = /^[0-9\s\+\(\)\-]{7,20}$/;

export type ValidationResult = {
  valid: boolean;
  errors: Record<string, string>;
};

// --- Individual Validators ---
export const validateType = (data: RdvData): ValidationResult => {
  const errors: Record<string, string> = {};
  if (!data.userType) {
    errors.userType = "Veuillez choisir Entreprise ou Particulier.";
  }
  return { valid: Object.keys(errors).length === 0, errors };
};

export const validateDuration = (data: RdvData): ValidationResult => {
  const errors: Record<string, string> = {};
  if (!data.durationKey) {
    errors.durationKey = "Veuillez choisir une durée.";
  } else if (data.durationKey === "autre") {
    const v = Number(data.customDurationMonths ?? 0);
    if (!Number.isInteger(v) || v < MIN_CUSTOM_DURATION || v > MAX_CUSTOM_DURATION) {
      errors.customDurationMonths = `La durée personnalisée doit être entre ${MIN_CUSTOM_DURATION} et ${MAX_CUSTOM_DURATION} mois.`;
    }
  }
  return { valid: Object.keys(errors).length === 0, errors };
};

export const validateFragility = (data: RdvData): ValidationResult => {
  const errors: Record<string, string> = {};
  if (!data.fragility) {
    errors.fragility = "Veuillez indiquer votre situation.";
  } else if (data.fragility === "oui") {
    const n = data.files.length;
    if (n < 1 || n > MAX_FILES) {
      errors.files = `Ajoutez entre 1 et ${MAX_FILES} fichiers.`;
    } else {
      for (const f of data.files) {
        const okType = ALLOWED_FILE_TYPES.includes(f.type);
        const okSize = f.size <= MAX_FILE_SIZE_BYTES;
        if (!okType) {
          errors[`file-${f.id}-type`] = `${f.name}: type non autorisé.`;
        }
        if (!okSize) {
          errors[`file-${f.id}-size`] = `${f.name}: dépasse ${MAX_FILE_SIZE_MB} Mo.`;
        }
      }
    }
  }
  return { valid: Object.keys(errors).length === 0, errors };
};

export const validateObjective = (data: RdvData): ValidationResult => {
  const errors: Record<string, string> = {};
  if (!data.objective || data.objective.trim().length < MIN_OBJECTIVE_LENGTH) {
    errors.objective = `Décrivez votre objectif (au moins ${MIN_OBJECTIVE_LENGTH} caractères).`;
  }
  return { valid: Object.keys(errors).length === 0, errors };
};

export const validateCoord = (coord: CoordData): ValidationResult => {
  const errors: Record<string, string> = {};

  if (!coord.firstName || !NAME_REGEX.test(coord.firstName)) {
    errors.firstName = "Prénom invalide (2-50 caractères, lettres, accents, tirets, espaces).";
  }
  if (!coord.lastName || !NAME_REGEX.test(coord.lastName)) {
    errors.lastName = "Nom invalide (2-50 caractères, lettres, accents, tirets, espaces).";
  }
  if (!coord.email || !EMAIL_REGEX.test(coord.email)) {
    errors.email = "Adresse email invalide.";
  }
  if (!coord.phone || !PHONE_REGEX.test(coord.phone)) {
    errors.phone = "Numéro de téléphone invalide (7-20 chiffres, accepte +, espaces, parenthèses, tirets).";
  }
  // preferredSlot is optional, no validation needed unless specific values are required
  if (coord.message && coord.message.length > 1000) {
    errors.message = "Message trop long (max 1000 caractères).";
  }
  if (!coord.consentRgpd) {
    errors.consentRgpd = "Vous devez accepter la politique de confidentialité.";
  }

  return { valid: Object.keys(errors).length === 0, errors };
};

// --- Step-level Validation ---
export const validateStep = (stepIndex: number, data: RdvData): ValidationResult => {
  let allErrors: Record<string, string> = {};
  let isValid = true;

  const addErrors = (result: ValidationResult) => {
    if (!result.valid) {
      isValid = false;
      allErrors = { ...allErrors, ...result.errors };
    }
  };

  switch (stepIndex) {
    case 0: addErrors(validateType(data)); break;
    case 1: addErrors(validateDuration(data)); break;
    case 2: addErrors(validateFragility(data)); break;
    case 3: addErrors(validateObjective(data)); break;
    case 4: addErrors(validateCoord(data.coord)); break; // Add validation for coord step
    case 5: /* Review step has no direct validation */ break; // Adjust step index for review
    default: isValid = false; allErrors.step = "Étape inconnue."; break;
  }
  return { valid: isValid, errors: allErrors };
};

// --- Form-level Validation ---
export const validateForm = (data: RdvData): ValidationResult => {
  let allErrors: Record<string, string> = {};
  let isValid = true;

  const addErrors = (result: ValidationResult) => {
    if (!result.valid) {
      isValid = false;
      allErrors = { ...allErrors, ...result.errors };
    }
  };

  addErrors(validateType(data));
  addErrors(validateDuration(data));
  addErrors(validateFragility(data));
  addErrors(validateObjective(data));
  addErrors(validateCoord(data.coord)); // Add validation for coord data

  return { valid: isValid, errors: allErrors };
};

// --- Helper for checking if a section was modified (can be kept if needed elsewhere) ---
export function isSectionModified(k: string, a: RdvData, b?: RdvData): boolean {
  if (!b) return false;
  const pick = (d: RdvData) => {
    if (k === "type") return { userType: d.userType };
    if (k === "duration") return { durationKey: d.durationKey, customDurationMonths: d.customDurationMonths };
    if (k === "fragility") return { fragility: d.fragility, files: d.files.map(f => ({ name:f.name, type:f.type, size:f.size })) };
    if (k === "objective") return { objective: d.objective };
    if (k === "coord") return { coord: d.coord }; // Add coord to pick
    return {};
  };
  return JSON.stringify(pick(a)) !== JSON.stringify(pick(b));
}