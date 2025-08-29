// FILE: src/js/forms/rdv/utils/validation.spec.ts
import { describe, it, expect } from "vitest";
import { getSectionErrors, isSectionValid, isSectionModified } from "./validation.ts";
import type { RdvData } from "../types/rdvTypes.ts";

const validData: RdvData = {
    userType: "particulier",
    durationKey: "3m",
    customDurationMonths: 1,
    fragility: "non",
    files: [],
    objective: "Un objectif valide avec assez de caractères"
};

describe("getSectionErrors", () => {
    it("ne renvoie aucune erreur pour des données valides", () => {
        const errors = getSectionErrors(validData);
        expect(Object.values(errors).every(e => e.length === 0)).toBe(true);
    });

    it("détecte une durée personnalisée hors bornes (trop faible)", () => {
        const data = { ...validData, durationKey: "autre" as const, customDurationMonths: 0 };
        const errors = getSectionErrors(data);
        expect(errors.duration.length).toBeGreaterThan(0);
        expect(errors.duration[0]).toContain("entre 1 et 24 mois");
    });

    it("détecte une durée personnalisée hors bornes (trop élevée)", () => {
        const data = { ...validData, durationKey: "autre" as const, customDurationMonths: 25 };
        const errors = getSectionErrors(data);
        expect(errors.duration.length).toBeGreaterThan(0);
    });

    it("détecte un objectif trop court", () => {
        const data = { ...validData, objective: "court" };
        const errors = getSectionErrors(data);
        expect(errors.objective.length).toBeGreaterThan(0);
    });

    it("exige des fichiers si fragilité = oui", () => {
        const data = { ...validData, fragility: "oui" as const, files: [] };
        const errors = getSectionErrors(data);
        expect(errors.fragility.length).toBeGreaterThan(0);
    });

    it("détecte un type de fichier non autorisé", () => {
        const data = { ...validData, fragility: "oui" as const, files: [{ id: "1", name: "test.exe", type: "application/x-msdownload", size: 100, base64: "base64" }] };
        const errors = getSectionErrors(data);
        expect(errors.fragility.length).toBeGreaterThan(0);
        expect(errors.fragility[0]).toContain("type non autorisé");
    });

    it("détecte un fichier trop lourd", () => {
        const data = { ...validData, fragility: "oui" as const, files: [{ id: "1", name: "large.pdf", type: "application/pdf", size: 6 * 1024 * 1024, base64: "base64" }] }; // 6MB
        const errors = getSectionErrors(data);
        expect(errors.fragility.length).toBeGreaterThan(0);
        expect(errors.fragility[0]).toContain("dépasse 5 Mo");
    });

    it("détecte un nombre de fichiers trop élevé", () => {
        const files = Array(4).fill({ id: "1", name: "file.pdf", type: "application/pdf", size: 100, base64: "base64" });
        const data = { ...validData, fragility: "oui" as const, files: files };
        const errors = getSectionErrors(data);
        expect(errors.fragility.length).toBeGreaterThan(0);
        expect(errors.fragility[0]).toContain("entre 1 et 3 fichiers");
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