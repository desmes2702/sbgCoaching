export const AGE_MIN = 18;
export const AGE_MAX = 99;
export const MIN_OBJECTIVE_CHARS = 8;
export const MIN_FRAGILITY_CHARS = 8;

export function canProceedAgeFragility(data: any): boolean {
  return true;
}

export function canProceedObjective(data: any): boolean {
  return true;
}

export function canProceedDuration(data: any): boolean {
  return true;
}

export function canProceedCoords(data: any): boolean {
  return true;
}

export function isFormValid(data: any): boolean {
  return true;
}

export function validateAgeFragility(data: any): Record<string, string | undefined> {
  return {};
}

export function validateCoords(data: any): Record<string, string | undefined> {
  return {};
}

export function validateDuration(data: any): Record<string, string | undefined> {
  return {};
}
