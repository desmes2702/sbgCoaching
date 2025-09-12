// src/js/forms/uiClasses.ts
// Point central pour les classes utilitaires (BEM-friendly).
// Conservé + enrichi (ajouts non-breaking).

export const ui = {
  // Classes alignées sur le "classique" (réutilisation BEM existant)
  // Contrôles
  control: "input",
  label: "rdv-form__label form__label",
  error: "form__error",
  choice: "form__question__choice",
  choiceSelected: "is-selected",

  // Formulaire / structure
  form: "form form--multistep rdv-form",
  fieldset: "form__fieldset",
  legend: "form__legend",
  group: "form__question__group",
  // Grille de choix (radios/checkboxes)
  grid: "rdv-form__choices",
  // Titres
  title: "rdv-form__step-title",
  // Texte d'aide
  hint: "form__hint",
  // Actions navigation
  actions: "rdv-form__nav",
  // Boutons (SCSS existant rdv: .btn, .btn--primary, .btn--ghost)
  button: "btn",
  buttonPrimary: "btn btn--primary",
  buttonGhost: "btn btn--ghost",
  next: "btn btn--primary rdv-form__next",
  prev: "btn btn--ghost rdv-form__prev",
  submit: "btn btn--primary rdv-form__submit",

  // Champs
  textarea: "input",
  input: "input",
  chip: "chip",
  chips: "chips",
  check: "choice choice--checkbox",
  radio: "",
  srOnly: "sr-only",

  // Step header (utilisé par compat mais le header sort ses propres classes rdv-form__*)
  stepHeader: "rdv-form__header",
  stepHeaderBar: "rdv-form__progress",
  stepHeaderFill: "rdv-form__progress-bar",
  stepHeaderMeta: "rdv-form__headline",
  counter: "rdv-form__counter",
  eta: "rdv-form__eta",
  info: "rdv-form__steps",
};

// Tiny utilitaire pour concaténer des classes
export function cx(...parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(" ");
}
