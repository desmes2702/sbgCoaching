// FILE: tests/rdv.e2e.ts
import { test, expect } from "@playwright/test";

test.describe("Formulaire RDV", () => {
    test.beforeEach(async ({ page }) => {
        await page.goto("/rdv");
    });

    test("Progression: futur bloqué, passé OK", async ({ page }) => {
        // L'étape 0 est active, l'étape 1 doit être désactivée
        await expect(page.locator('button.step:text("Durée")')).toBeDisabled();

        // Remplir l'étape 1
        await page.locator('label:text("Particulier")').click();
        await page.locator('button:text("Continuer")').click();

        // Maintenant l'étape 0 doit être cliquable
        await expect(page.locator('button.step:text("Type")')).toBeEnabled();
        await page.locator('button.step:text("Type")').click();
        await expect(page.locator('h2.legend:text("Vous êtes...")')).toBeVisible();
    });

    test("Sommaire d’erreurs cliquable ouvre la bonne section", async ({ page }) => {
        // Forcer la navigation jusqu'au récapitulatif
        await page.locator('label:text("Particulier")').click();
        await page.locator('button:text("Continuer")').click();
        await page.locator('label:text("3 mois")').click();
        await page.locator('button:text("Continuer")').click();
        await page.locator('label:text("Non")').click();
        await page.locator('button:text("Continuer")').click();
        // Laisser l'objectif vide pour créer une erreur
        await page.locator('button:text("Continuer")').click();

        // Sur le récap, le sommaire des erreurs doit être visible
        await expect(page.locator(".rdv__errors")).toBeVisible();
        
        // Cliquer sur le lien d'erreur de l'objectif
        await page.locator('.errors__link:has-text("Objectif")').click();

        // L'éditeur pour l'objectif doit être visible
        await expect(page.locator("#review-editor-objective")).toBeVisible();
        await expect(page.locator("#review-editor-objective textarea")).toBeFocused();
    });

    test("Édition inline et toast de confirmation", async ({ page }) => {
        // Remplir le formulaire pour atteindre le récap
        await page.locator('label:text("Particulier")').click();
        await page.locator('button:text("Continuer")').click();
        await page.locator('label:text("3 mois")').click();
        await page.locator('button:text("Continuer")').click();
        await page.locator('label:text("Non")').click();
        await page.locator('button:text("Continuer")').click();
        await page.locator('textarea#objective').fill("Mon objectif initial est celui-ci.");
        await page.locator('button:text("Continuer")').click();

        // Cliquer sur modifier pour l'objectif
        await page.locator('#review-objective button:text("Modifier")').click();

        // Modifier l'objectif
        await page.locator('#review-editor-objective textarea').fill("Mon objectif a été modifié.");
        await page.locator('#review-editor-objective button:text("Enregistrer")').click();

        // Le toast de confirmation doit apparaître
        await expect(page.locator(".toast__item:has-text('Modifications enregistrées.')")).toBeVisible();

        // Le badge "Modifié" doit être visible
        await expect(page.locator('#review-objective .badge--modified')).toBeVisible();
    });
});