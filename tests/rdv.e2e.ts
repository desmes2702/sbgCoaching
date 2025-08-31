// FILE: tests/rdv.e2e.ts
import { test, expect } from "@playwright/test";
import { injectAxe, checkA11y } from "axe-playwright";

test.describe("Formulaire RDV", () => {
    test.beforeEach(async ({ page }) => {
        await page.goto("/rdv");
        await injectAxe(page); // Inject axe-core into the page
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
    test("Parcours complet Particulier 6 mois sans fragilité", async ({ page }) => {
        await checkA11y(page); // Initial accessibility check

        // Step 1: Type
        await page.locator('label:text("Particulier")').click();
        await page.locator('button:text("Continuer")').click();
        await checkA11y(page); // Accessibility check after step 1

        // Step 2: Durée
        await page.locator('label:text("6 mois")').click();
        await page.locator('button:text("Continuer")').click();
        await checkA11y(page); // Accessibility check after step 2

        // Step 3: Fragilité
        await page.locator('label:text("Non")').click();
        await page.locator('button:text("Continuer")').click();
        await checkA11y(page); // Accessibility check after step 3

        // Step 4: Objectif
        await page.locator('textarea#objective').fill("Mon objectif est de devenir un meilleur coach.");
        await page.locator('button:text("Continuer")').click();
        await checkA11y(page); // Accessibility check after step 4

        // Step 5: Coordonnées
        await page.locator('input#firstName').fill("Jean");
        await page.locator('input#lastName').fill("Dupont");
        await page.locator('input#email').fill("jean.dupont@example.com");
        await page.locator('input#phone').fill("0612345678");
        await page.locator('label:text("J’accepte que SBG Coaching traite mes données")').click();
        await page.locator('button:text("Envoyer la demande")').click();
        await checkA11y(page); // Accessibility check after step 5 and before submission

        // Verify submission success
        await expect(page.locator('h2:text("Votre demande a bien été envoyée !")')).toBeVisible();
    });
    test("Navigation clavier complète", async ({ page }) => {
        // Initial focus should be on the first interactive element (e.g., first radio button)
        await page.keyboard.press('Tab');
        await expect(page.locator('label:text("Particulier")')).toBeFocused();
        await page.keyboard.press('Space'); // Select "Particulier"
        await expect(page.locator('label:text("Particulier")')).toBeChecked();

        // Navigate to "Continuer" button and activate
        await page.keyboard.press('Tab');
        await expect(page.locator('button:text("Continuer")')).toBeFocused();
        await page.keyboard.press('Enter'); // Click "Continuer"

        // Step 2: Durée - Navigate radio buttons with arrow keys
        await page.keyboard.press('Tab'); // Focus on first radio button
        await expect(page.locator('label:text("3 mois")')).toBeFocused();
        await page.keyboard.press('ArrowRight'); // Move to "6 mois"
        await expect(page.locator('label:text("6 mois")')).toBeFocused();
        await page.keyboard.press('Space'); // Select "6 mois"
        await expect(page.locator('label:text("6 mois")')).toBeChecked();

        // Navigate to "Continuer" button and activate
        await page.keyboard.press('Tab');
        await expect(page.locator('button:text("Continuer")')).toBeFocused();
        await page.keyboard.press('Enter');

        // Step 3: Fragilité
        await page.keyboard.press('Tab'); // Focus on first radio button
        await expect(page.locator('label:text("Non")')).toBeFocused();
        await page.keyboard.press('Space'); // Select "Non"
        await expect(page.locator('label:text("Non")')).toBeChecked();

        // Navigate to "Continuer" button and activate
        await page.keyboard.press('Tab');
        await expect(page.locator('button:text("Continuer")')).toBeFocused();
        await page.keyboard.press('Enter');

        // Step 4: Objectif
        await page.keyboard.press('Tab'); // Focus on textarea
        await expect(page.locator('textarea#objective')).toBeFocused();
        await page.locator('textarea#objective').fill("Mon objectif est de devenir un meilleur coach via clavier.");

        // Navigate to "Continuer" button and activate
        await page.keyboard.press('Tab');
        await expect(page.locator('button:text("Continuer")')).toBeFocused();
        await page.keyboard.press('Enter');

        // Step 5: Coordonnées
        await page.keyboard.press('Tab'); // firstName
        await expect(page.locator('input#firstName')).toBeFocused();
        await page.locator('input#firstName').fill("Clavier");
        await page.keyboard.press('Tab'); // lastName
        await expect(page.locator('input#lastName')).toBeFocused();
        await page.locator('input#lastName').fill("Navigation");
        await page.keyboard.press('Tab'); // email
        await expect(page.locator('input#email')).toBeFocused();
        await page.locator('input#email').fill("clavier.navigation@example.com");
        await page.keyboard.press('Tab'); // phone
        await expect(page.locator('input#phone')).toBeFocused();
        await page.locator('input#phone').fill("0123456789");
        await page.keyboard.press('Tab'); // preferredSlot (select)
        await expect(page.locator('select#preferredSlot')).toBeFocused();
        await page.locator('select#preferredSlot').selectOption('Matin');
        await page.keyboard.press('Tab'); // message (textarea)
        await expect(page.locator('textarea#message')).toBeFocused();
        await page.locator('textarea#message').fill("Message via clavier.");
        await page.keyboard.press('Tab'); // consentRgpd (checkbox)
        await expect(page.locator('input#consentRgpd')).toBeFocused();
        await page.keyboard.press('Space'); // Check checkbox
        await expect(page.locator('input#consentRgpd')).toBeChecked();

        // Navigate to "Envoyer la demande" button and activate
        await page.keyboard.press('Tab');
        await expect(page.locator('button:text("Envoyer la demande")')).toBeFocused();
        await page.keyboard.press('Enter');

        // Verify submission success
        await expect(page.locator('h2:text("Votre demande a bien été envoyée !")')).toBeVisible();
    test("Validation errors and focus management", async ({ page }) => {
        await page.goto("/rdv"); // Ensure we start fresh

        // Attempt to continue without selecting type
        await page.locator('button:text("Continuer")').click();

        // Verify error message is visible and first radio button is aria-invalid
        await expect(page.locator('p#userType-error')).toBeVisible();
        await expect(page.locator('input#userType-particulier')).toHaveAttribute('aria-invalid', 'true');
        await expect(page.locator('input#userType-particulier')).toBeFocused(); // Verify focus management

        // Select a type to proceed
        await page.locator('label:text("Particulier")').click();
        await page.locator('button:text("Continuer")').click();

        // Step 2: Attempt to continue without selecting duration
        await page.locator('button:text("Continuer")').click();
        await expect(page.locator('p#durationKey-error')).toBeVisible();
        await expect(page.locator('input#duration-3m')).toHaveAttribute('aria-invalid', 'true');
        await expect(page.locator('input#duration-3m')).toBeFocused(); // Verify focus management

        // Select "Autre durée" and leave custom duration empty
        await page.locator('label:text("Autre durée")').click();
        await page.locator('button:text("Continuer")').click();
        await expect(page.locator('p#customDuration-error')).toBeVisible();
        await expect(page.locator('input#custom-duration-months')).toHaveAttribute('aria-invalid', 'true');
        await expect(page.locator('input#custom-duration-months')).toBeFocused(); // Verify focus management

        // Fill valid custom duration
        await page.locator('input#custom-duration-months').fill('12');
        await page.locator('button:text("Continuer")').click();

        // Step 3: Attempt to continue without selecting fragility
        await page.locator('button:text("Continuer")').click();
        await expect(page.locator('p#fragility-error')).toBeVisible();
        await expect(page.locator('input#fragility-non')).toHaveAttribute('aria-invalid', 'true');
        await expect(page.locator('input#fragility-non')).toBeFocused(); // Verify focus management

        // Select "Oui" and leave files empty
        await page.locator('label:text("Oui")').click();
        await page.locator('button:text("Continuer")').click();
        await expect(page.locator('p#files-error')).toBeVisible();
        // Focus should be on the uploader area or first interactive element within it
        await expect(page.locator('label#uploader-label')).toBeFocused(); // Assuming label is focusable or first element in uploader

        // Select "Non" to proceed
        await page.locator('label:text("Non")').click();
        await page.locator('button:text("Continuer")').click();

        // Step 4: Attempt to continue without objective
        await page.locator('button:text("Continuer")').click();
        await expect(page.locator('p#objective-error')).toBeVisible();
        await expect(page.locator('textarea#objective')).toHaveAttribute('aria-invalid', 'true');
        await expect(page.locator('textarea#objective')).toBeFocused(); // Verify focus management

        // Fill valid objective
        await page.locator('textarea#objective').fill('This is a valid objective.');
        await page.locator('button:text("Continuer")').click();

        // Step 5: Attempt to submit with invalid coord data
        await page.locator('button:text("Envoyer la demande")').click();
        await expect(page.locator('p#firstName-error')).toBeVisible();
        await expect(page.locator('input#firstName')).toHaveAttribute('aria-invalid', 'true');
        await expect(page.locator('input#firstName')).toBeFocused(); // Verify focus management

        // Fill some invalid data
        await page.locator('input#firstName').fill('J'); // Too short
        await page.locator('input#lastName').fill('D'); // Too short
        await page.locator('input#email').fill('invalid-email'); // Invalid email
        await page.locator('input#phone').fill('123'); // Too short
        await page.locator('button:text("Envoyer la demande")').click();

        // Verify multiple errors and focus on first
        await expect(page.locator('p#firstName-error')).toBeVisible();
        await expect(page.locator('p#lastName-error')).toBeVisible();
        await expect(page.locator('p#email-error')).toBeVisible();
        await expect(page.locator('p#phone-error')).toBeVisible();
        await expect(page.locator('input#firstName')).toBeFocused(); // Still focuses on the first error

        // Fill valid coord data
        await page.locator('input#firstName').fill('Valid');
        await page.locator('input#lastName').fill('Name');
        await page.locator('input#email').fill('valid@example.com');
        await page.locator('input#phone').fill('0123456789');
        await page.locator('label:text("J’accepte que SBG Coaching traite mes données")').click(); // Check consent
        await page.locator('button:text("Envoyer la demande")').click();

        // Verify submission success
        await expect(page.locator('h2:text("Votre demande a bien été envoyée !")')).toBeVisible();
    });
});