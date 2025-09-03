// Déclaration minimale pour éviter les erreurs TS,
// car @types/web-vitals n’existe pas publiquement.
declare module 'web-vitals' {
  export interface Metric {
    name: string;
    value: number;
    id: string;
  }

  export function getCLS(cb: (metric: Metric) => void): void;
  export function getFID(cb: (metric: Metric) => void): void;
  export function getFCP(cb: (metric: Metric) => void): void;
  export function getLCP(cb: (metric: Metric) => void): void;
  export function getTTFB(cb: (metric: Metric) => void): void;
}
