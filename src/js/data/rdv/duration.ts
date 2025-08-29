export const DURATION_OPTIONS = [
  { id: "3m" as const, label: "3 mois" },
  { id: "6m" as const, label: "6 mois" },
  { id: "12m" as const, label: "12 mois" },
  { id: "autre" as const, label: "Autre" },
];

export const DURATION_LABELS: Record<"3m"|"6m"|"12m"|"autre", string> = {
  "3m": "3 mois", "6m": "6 mois", "12m": "12 mois", "autre": "Autre",
};