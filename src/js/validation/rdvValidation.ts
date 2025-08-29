export const AGE_MIN = 18;
export const AGE_MAX = 99;
export const MIN_OBJECTIVE_CHARS = 10;
export const MIN_FRAGILITY_CHARS = 0; // si tu veux rendre notes facultatives

export function validateObjective(data: any) {
  const errors: Record<string,string|undefined> = {};
  if (!data.objectiveNotes || String(data.objectiveNotes).trim().length < MIN_OBJECTIVE_CHARS) {
    errors.objectiveNotes = `Décrivez votre objectif (≥ ${MIN_OBJECTIVE_CHARS} caractères).`;
  }
  return errors;
}

export function validateAgeFragility(data: any) {
  const errors: Record<string,string|undefined> = {};
  const age = Number(data.age);
  if (!Number.isInteger(age) || age < AGE_MIN || age > AGE_MAX) {
    errors.age = `Âge entre ${AGE_MIN} et ${AGE_MAX}.`;
  }
  if (!["yes","no","na"].includes(data.fragilityId)) {
    errors.fragilityId = "Choix requis (Oui / Non / NSP).";
  }
  // si “oui” et qu’un upload est requis, on validera dans la section upload (commit 3)
  return errors;
}

export function validateDuration(data: any) {
  const errors: Record<string,string|undefined> = {};
  if (!data.durationId) errors.durationId = "Choisissez une durée.";
  if (data.durationId === "autre") {
    const v = Number(data.durationCustom ?? 0);
    if (!Number.isInteger(v) || v < 1 || v > 24) {
      errors.durationCustom = "Durée personnalisée entre 1 et 24 mois.";
    }
  }
  return errors;
}

export function validateCoords(data: any) {
  const errors: Record<string,string|undefined> = {};
  if (!data.firstName?.trim()) errors.firstName = "Prénom requis.";
  if (!data.lastName?.trim()) errors.lastName = "Nom requis.";
  if (!/^[^S@]+@[^S@]+\.[^S@]+$/.test(String(data.email||""))) {
    errors.email = "Email invalide.";
  }
  return errors;
}

// Helpers pour activer/désactiver “Suivant”
export function canProceedObjective(d:any){ return Object.keys(validateObjective(d)).length===0; }
export function canProceedAgeFragility(d:any){ return Object.keys(validateAgeFragility(d)).length===0; }
export function canProceedDuration(d:any){ return Object.keys(validateDuration(d)).length===0; }
export function isFormValid(d:any){
  return canProceedObjective(d) && canProceedAgeFragility(d) && canProceedDuration(d) && Object.keys(validateCoords(d)).length===0;
}