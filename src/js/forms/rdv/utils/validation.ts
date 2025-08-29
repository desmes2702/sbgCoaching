// FILE: src/js/forms/rdv/utils/validation.ts
import type { RdvData, RdvFile } from "./rdvTypes.ts";

// --- Validation Constants ---
export const MAX_FILES = 3;
export const MAX_FILE_SIZE_MB = 5;
export const MAX_FILE_SIZE_BYTES = MAX_FILE_SIZE_MB * 1024 * 1024;
export const ALLOWED_FILE_TYPES = ["image/jpeg", "image/png", "application/pdf"];
export const MIN_OBJECTIVE_LENGTH = 10;
export const MIN_CUSTOM_DURATION = 1;
export const MAX_CUSTOM_DURATION = 24;

export type SectionKey = "type" | "duration" | "fragility" | "objective";

// --- Individual Validators ---
export const isUserTypeValid = (data: RdvData): boolean => !!data.userType;

export const isDurationValid = (data: RdvData): boolean => {
  if (!data.durationKey) return false;
  if (data.durationKey === "autre") {
    const v = data.customDurationMonths;
    return v != null && v >= MIN_CUSTOM_DURATION && v <= MAX_CUSTOM_DURATION;
  }
  return true;
};

export const isFragilityValid = (data: RdvData): boolean => {
    if (!data.fragility) return false;
    if (data.fragility === 'oui') {
        if (data.files.length < 1 || data.files.length > MAX_FILES) return false;
        for (const f of data.files) {
            if (!ALLOWED_FILE_TYPES.includes(f.type)) return false;
            if (f.size > MAX_FILE_SIZE_BYTES) return false;
        }
    }
    return true;
};

export const isObjectiveValid = (data: RdvData): boolean =>
  data.objective.trim().length >= MIN_OBJECTIVE_LENGTH;

// --- Step-level Validation ---
export const isStepValid = (stepIndex: number, data: RdvData): boolean => {
  switch (stepIndex) {
    case 0: return isUserTypeValid(data);
    case 1: return isDurationValid(data);
    case 2: return isFragilityValid(data);
    case 3: return isObjectiveValid(data);
    case 4: return true;
    default: return false;
  }
};

// --- New Structured Error Generation ---
export function getSectionErrors(data: RdvData): Record<SectionKey, string[]> {
  const out: Record<SectionKey, string[]> = { type: [], duration: [], fragility: [], objective: [] };

  if (!data.userType) out.type.push("Veuillez choisir Entreprise ou Particulier.");

  if (!data.durationKey) out.duration.push("Veuillez choisir une durée.");
  if (data.durationKey === "autre") {
    const v = Number(data.customDurationMonths ?? 0);
    if (!Number.isInteger(v) || v < 1 || v > 24) out.duration.push("La durée personnalisée doit être entre 1 et 24 mois.");
  }

  if (!data.fragility) out.fragility.push("Veuillez indiquer votre situation.");
  if (data.fragility === "oui") {
    const n = data.files.length;
    if (n < 1 || n > 3) out.fragility.push("Ajoutez entre 1 et 3 fichiers.");
    for (const f of data.files) {
      const okType = ALLOWED_FILE_TYPES.includes(f.type);
      const okSize = f.size <= MAX_FILE_SIZE_BYTES;
      if (!okType) out.fragility.push(`${f.name}: type non autorisé.`);
      if (!okSize) out.fragility.push(`${f.name}: dépasse 5 Mo.`);
    }
  }

  if (!data.objective || data.objective.trim().length < 10) {
    out.objective.push("Décrivez votre objectif (au moins 10 caractères).");
  }

  return out;
}

export function isSectionValid(k: SectionKey, data: RdvData): boolean {
  return getSectionErrors(data)[k].length === 0;
}

export function isSectionModified(k: SectionKey, a: RdvData, b?: RdvData): boolean {
  if (!b) return false;
  const pick = (d: RdvData) => {
    if (k === "type") return { userType: d.userType };
    if (k === "duration") return { durationKey: d.durationKey, customDurationMonths: d.customDurationMonths };
    if (k === "fragility") return { fragility: d.fragility, files: d.files.map(f => ({ name:f.name, type:f.type, size:f.size })) };
    if (k === "objective") return { objective: d.objective };
    return {};
  };
  return JSON.stringify(pick(a)) !== JSON.stringify(pick(b));
}

export function isFormFullyValid(data: RdvData): boolean {
  const errors = getSectionErrors(data);
  return Object.values(errors).every(arr => arr.length === 0);
}
