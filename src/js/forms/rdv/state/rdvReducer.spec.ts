// FILE: src/js/forms/rdv/state/rdvReducer.spec.ts
import { describe, it, expect } from "vitest";
import { rdvReducer, initialRdvState } from "./rdvReducer.ts";

describe("rdvReducer", () => {
  it("refuse GO_TO_STEP vers le futur", () => {
    const s1 = { ...initialRdvState, currentStep: 1, maxReachableStep: 1 };
    const s2 = rdvReducer(s1, { type: "GO_TO_STEP", payload: 3 });
    expect(s2.currentStep).toBe(1);
  });

  it("accepte GO_TO_STEP vers le passé", () => {
    const s1 = { ...initialRdvState, currentStep: 3, maxReachableStep: 3 };
    const s2 = rdvReducer(s1, { type: "GO_TO_STEP", payload: 1 });
    expect(s2.currentStep).toBe(1);
  });

  it("met à jour maxReachableStep sur VALIDATE_AND_GO_NEXT", () => {
    const s1 = { ...initialRdvState, currentStep: 1, maxReachableStep: 1 };
    const s2 = rdvReducer(s1, { type: "VALIDATE_AND_GO_NEXT" });
    expect(s2.maxReachableStep).toBe(2);
    expect(s2.currentStep).toBe(2);
  });

  it("crée un snapshot en entrant dans le récapitulatif", () => {
    const s1 = { ...initialRdvState, data: { ...initialRdvState.data, userType: 'particulier' } };
    const s2 = rdvReducer(s1, { type: "ENTER_REVIEW" });
    expect(s2.currentStep).toBe(4);
    expect(s2.reviewBaseline).toBeDefined();
    expect(s2.reviewBaseline?.userType).toBe('particulier');
  });

  it("HYDRATE_FROM_STORAGE n'écrase que state.data", () => {
    const hydratedPayload = {
      userType: "entreprise",
      objective: "Nouveau objectif",
    };
    const s1 = {
      ...initialRdvState,
      currentStep: 2,
      maxReachableStep: 3,
      isHydrated: false,
      data: {
        ...initialRdvState.data,
        userType: "particulier",
        objective: "Ancien objectif",
      },
    };
    const s2 = rdvReducer(s1, { type: "HYDRATE_FROM_STORAGE", payload: hydratedPayload });

    expect(s2.isHydrated).toBe(true);
    expect(s2.currentStep).toBe(2); // Should not be overwritten
    expect(s2.maxReachableStep).toBe(3); // Should not be overwritten
    expect(s2.data.userType).toBe("entreprise");
    expect(s2.data.objective).toBe("Nouveau objectif");
    expect(s2.data.durationKey).toBe(initialRdvState.data.durationKey); // Should retain initial state for non-hydrated fields
  });

  it("SNAPSHOT_REVIEW_BASELINE capture l'état actuel de data", () => {
    const s1 = { ...initialRdvState, data: { ...initialRdvState.data, userType: 'particulier', objective: 'Mon objectif' } };
    const s2 = rdvReducer(s1, { type: "SNAPSHOT_REVIEW_BASELINE" });
    expect(s2.reviewBaseline).toEqual(s1.data);
    // Ensure it's a deep copy, not a reference
    expect(s2.reviewBaseline).not.toBe(s1.data);
  });

  it("ajoute et retire un toast", () => {
      let state = rdvReducer(initialRdvState, { type: "TOAST_SHOW", payload: { message: "Test" } });
      expect(state.toasts.length).toBe(1);
      expect(state.toasts[0].message).toBe("Test");

      const toastId = state.toasts[0].id;
      state = rdvReducer(state, { type: "TOAST_DISMISS", payload: { id: toastId } });
      expect(state.toasts.length).toBe(0);
  });
});