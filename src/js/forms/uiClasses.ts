// src/js/forms/uiClasses.ts
// Point central pour les classes utilitaires (BEM-friendly).
// Conservé + enrichi (ajouts non-breaking).

export const ui = {
  // existants
  control: "field__control control",
  label: "field__label",
  error: "field__error",
  choice: "choice",
  choiceSelected: "is-selected",

  // formulaires
  form: "form",
  fieldset: "form__fieldset",
  legend: "form__legend",
  group: "form__group",
  grid: "form__grid",
  title: "step__title",
  hint: "form__hint",
  actions: "form__actions",
  button: "btn",
  buttonPrimary: "btn btn--primary",
  buttonGhost: "btn btn--ghost",
  next: "btn btn--primary",
  prev: "btn btn--ghost",
  submit: "btn btn--primary",
  textarea: "control control--textarea",
  input: "control control--input",
  chip: "chip",
  chips: "chips",
  check: "check",
  radio: "radio",
  srOnly: "sr-only",

  // Step header
  stepHeader: "step-header",
  stepHeaderBar: "step-header__bar",
  stepHeaderFill: "step-header__fill",
  stepHeaderMeta: "step-header__meta",
  counter: "step-header__counter",
  eta: "step-header__eta",
  info: "step-header__info",
};

// Tiny utilitaire pour concaténer des classes
export function cx(...parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(" ");
}
