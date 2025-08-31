// FILE: src/js/forms/rdv/utils/validation.spec.ts
import { describe, it, expect } from "vitest";
import { validateStep, validateForm, isSectionModified } from "./validation.ts"; // Updated imports
import type { RdvData } from "../types/rdvTypes.ts";

const validData: RdvData = {
    userType: "particulier",
    durationKey: "3-mois", // Updated to match new enum
    customDurationMonths: 1,
    fragility: "non",
    objective: "Un objectif valide avec assez de caractères",
    coord: { // Added coord data
        firstName: "Test",
        lastName: "User",
        email: "test@example.com",
        phone: "0123456789",
        consentRgpd: true
    }
};

describe('RdvSchema Validation', () => {
  it('validates step data with Zod schema', () => {
    const result = validateStep(0, { ...validData, userType: 'particulier' });
    expect(result.valid).toBe(true);
    expect(result.errors).toEqual({});
  });

  it('detects invalid userType', () => {
    const result = validateStep(0, { ...validData, userType: 'invalid' as any }); // Cast to any for testing invalid enum
    expect(result.valid).toBe(false);
    expect(result.errors).toHaveProperty('userType');
  });

  it('detects custom duration out of bounds (too low)', () => {
    const result = validateStep(1, { ...validData, durationKey: "autre", customDurationMonths: 0 });
    expect(result.valid).toBe(false);
    expect(result.errors).toHaveProperty('customDurationMonths');
    expect(result.errors.customDurationMonths[0]).toContain("entre 1 et 24 mois"); // Changed to [0]
  });

  it('detects custom duration out of bounds (too high)', () => {
    const result = validateStep(1, { ...validData, durationKey: "autre", customDurationMonths: 25 });
    expect(result.valid).toBe(false);
    expect(result.errors).toHaveProperty('customDurationMonths');
    expect(result.errors.customDurationMonths[0]).toContain("entre 1 et 24 mois"); // Changed to [0]
  });

  it('detects short objective', () => {
    const result = validateStep(3, { ...validData, objective: "short" });
    expect(result.valid).toBe(false);
    expect(result.errors).toHaveProperty('objective');
  });

  it('validates coord data', () => {
    const result = validateStep(4, { ...validData, coord: { ...validData.coord, email: 'invalid-email' } });
    console.log('Coord validation errors:', result.errors); // Added console.log
    expect(result.valid).toBe(false);
    expect(result.errors).toHaveProperty('coord'); // Check for 'coord' property
    expect(result.errors.coord).toContain('Adresse email invalide.'); // Check if the array contains the message
  });

  it('validates entire form with valid data', () => {
    const result = validateForm(validData);
    expect(result.valid).toBe(true);
    expect(result.errors).toEqual({});
  });

  it('detects errors in entire form with invalid data', () => {
    const invalidData = {
      ...validData,
      userType: 'invalid' as any,
      objective: 'short',
      coord: { ...validData.coord, email: 'invalid-email' }
    };
    const result = validateForm(invalidData);
    expect(result.valid).toBe(false);
    expect(result.errors).toHaveProperty('userType');
    expect(result.errors).toHaveProperty('objective');
    expect(result.errors).toHaveProperty('coord'); // Check for 'coord' property
    expect(result.errors.coord).toContain('Adresse email invalide.'); // Check if the array contains the message
  });
});

describe("isSectionModified", () => {
    it("détecte une modification dans une section", () => {
        const baseline = { ...validData };
        const modified = { ...validData, objective: "Un tout nouvel objectif" };
        expect(isSectionModified("objective", modified, baseline)).toBe(true);
    });

    it("ne détecte aucune modification si les données sont identiques", () => {
        const baseline = { ...validData };
        const modified = { ...validData };
        expect(isSectionModified("objective", modified, baseline)).toBe(false);
    });
});