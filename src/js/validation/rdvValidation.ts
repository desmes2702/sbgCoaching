// src/js/validation/rdvValidation.ts
// Règles centralisées (coords + duration + objectif + âge/fragilité)

import type { AppointmentData, YesNoNa, DurationValue } from "@/js/types/rdvTypes.ts";

/** Règles génériques */
export const nameRegex = /^[A-Za-zÀ-ÖØ-öø-ÿ' -]{2,}$/;
export const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** 🇪🇺 Téléphone simple et robuste : >= 9 chiffres après nettoyage */
export const digits = (s: string) => (s || "").replace(/\D+/g, "");
export const isValidPhone = (s?: string) => !!s && digits(s).length >= 9;

/** Bornes & minimums */
export const AGE_MIN = 4;
export const AGE_MAX = 100;
export const MIN_OBJECTIVE_CHARS = 10;
export const MIN_FRAGILITY_CHARS = 10;

/* ============== OBJECTIF ============== */
export function canProceedObjective(data: AppointmentData): boolean {
  return (data.objectiveNotes || "").trim().length >= MIN_OBJECTIVE_CHARS;
}

/* ============== ÂGE & FRAGILITÉ ============== */
export type AgeFragWarnings = Partial<{
  age: string;
  isSeniorOrFragile: string;
  fragilityNotes: string;
}>;

export function validateAgeFragility(data: AppointmentData): AgeFragWarnings {
  const w: AgeFragWarnings = {};
  const ageNum = typeof data.age === "number" ? data.age : Number.NaN;

  if (!Number.isFinite(ageNum) || ageNum < AGE_MIN || ageNum > AGE_MAX) {
    w.age = `Âge invalide (entre ${AGE_MIN} et ${AGE_MAX} ans).`;
  }
  if (!data.isSeniorOrFragile) {
    w.isSeniorOrFragile = "Veuillez indiquer si vous avez une fragilité/handicap.";
  }
  if (data.isSeniorOrFragile === "yes" && (data.fragilityNotes || "").trim().length < MIN_FRAGILITY_CHARS) {
    w.fragilityNotes = `Merci de préciser vos limitations (min. ${MIN_FRAGILITY_CHARS} caractères).`;
  }
  return w;
}

export function canProceedAgeFragility(data: AppointmentData): boolean {
  const w = validateAgeFragility(data);
  return !w.age && !w.isSeniorOrFragile && !w.fragilityNotes;
}

/* ============== DURÉE ============== */
export type DurationWarnings = Partial<{
  durationId: string;
  durationCustom: string;
}>;

export function validateDuration(data: AppointmentData): DurationWarnings {
  const w: DurationWarnings = {};
  if (!data.durationId) {
    w.durationId = "Sélectionnez une durée.";
  } else if (data.durationId === "other") {
    const txt = data.durationCustom || "";
    if (txt.trim().length < 2) w.durationCustom = 'Veuillez préciser la durée (champ "Précision(s)").';
  }
  return w;
}

export function canProceedDuration(data: AppointmentData): boolean {
  if (!data.durationId) return false;
  if (data.durationId === "other") {
    return (data.durationCustom || "").trim().length >= 2;
  }
  return true;
}

/* ============== COORDONNÉES ============== */
export type CoordsWarnings = Partial<{
  firstname: string;
  lastname: string;
  email: string;
  phone: string;
  notes: string;
  consentAccepted: string;
}>;

export function validateCoords(data: AppointmentData): CoordsWarnings {
  const w: CoordsWarnings = {};
  if (!nameRegex.test((data.firstname || "").trim())) w.firstname = "Prénom invalide.";
  if (!nameRegex.test((data.lastname || "").trim())) w.lastname = "Nom invalide.";
  if (!emailRegex.test((data.email || "").trim())) w.email = "Adresse e‑mail invalide.";
  if (!isValidPhone(data.phone)) w.phone = "Numéro invalide (au moins 9 chiffres).";
  if (!data.consentAccepted) w.consentAccepted = "Le consentement est requis.";
  return w;
}

export function canProceedCoords(data: AppointmentData): boolean {
  const w = validateCoords(data);
  return !w.firstname && !w.lastname && !w.email && !w.phone && !w.consentAccepted;
}

/* ============== RECAP GLOBAL ============== */
export function isFormValid(data: AppointmentData): boolean {
  return Boolean(
    data.typeId &&
    canProceedObjective(data) &&
    canProceedAgeFragility(data) &&
    canProceedDuration(data) &&
    canProceedCoords(data)
  );
}
