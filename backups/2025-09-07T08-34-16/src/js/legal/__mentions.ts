// ✅ __mentions.ts (anciennement __mentions.js)

import { companyInfos } from "@/js/data/CompanyData.ts";

export function injectLegalContent(): void {
  const container = document.getElementById("legal-dynamic-content");
  if (!container) return;

  const { schemaOrg, email, phone, address, social } = companyInfos;

  container.innerHTML = `
    <h1 class="title">Mentions légales</h1>

    <h2 class="subTitle">Éditeur du site</h2>
    <p><strong>SBG Coaching</strong><br>
    ${address}<br>
    TVA : BE 0717.915.212<br>
    Tél : ${phone}<br>
    Contact : <a href="mailto:${email}">${email}</a></p>

    <h2 class="subTitle">Responsable de la publication</h2>
    <p>SBG Coaching</p>

    <h2 class="subTitle">Hébergement</h2>
    <p>Ce site est hébergé par :<br>
    <strong>OVH</strong> – <a href="https://www.ovhcloud.com" target="_blank" rel="noopener">https://www.ovhcloud.com</a></p>

    <h2 class="subTitle">Propriété intellectuelle</h2>
    <p>Tous les contenus (textes, images, vidéos, logo, structure, code source, etc.) présents sur ce site sont protégés par le droit d’auteur et sont la propriété exclusive de SBG Coaching, sauf mention contraire.
    Toute reproduction, représentation, adaptation ou diffusion, totale ou partielle, est interdite sans autorisation écrite préalable.</p>

    <h2 class="subTitle">Protection des données personnelles (RGPD)</h2>
    <p>Les données transmises via le formulaire de contact sont utilisées uniquement pour répondre à votre demande.
    Elles ne sont ni transmises à des tiers, ni utilisées à d'autres fins.
    Vous pouvez demander leur modification ou leur suppression à tout moment en écrivant à <a href="mailto:${email}">${email}</a>.</p>

    <h2 class="subTitle">Données sensibles (santé, âge, condition physique)</h2>
    <p>SBG Coaching peut être amené à collecter certaines données sensibles, notamment en lien avec votre santé, votre âge ou votre condition physique,
    dans le cadre d’un accompagnement sportif personnalisé. Ces données sont traitées avec le plus haut niveau de confidentialité.</p>

    <p>Leur traitement repose sur votre <strong>consentement explicite</strong> recueilli lors de la prise de contact ou via les formulaires dédiés.
    Ces données ne sont <strong>jamais partagées</strong> avec des tiers, et ne sont conservées que pour la durée strictement nécessaire à l’accompagnement.</p>

    <p>Vous disposez d’un droit d’accès, de rectification ou de suppression de ces données.
    Pour exercer vos droits, vous pouvez nous contacter à tout moment via <a href="mailto:${email}">${email}</a>.</p>

    <h2 class="subTitle">Cookies</h2>
    <p>Le site peut utiliser des cookies techniques ou de mesure d’audience. Vous pouvez les désactiver via les paramètres de votre navigateur.</p>

    <h2 class="subTitle">Limitation de responsabilité</h2>
    <p>SBG Coaching ne saurait être tenu responsable des dommages directs ou indirects liés à l’utilisation du site ou à l’impossibilité d’y accéder.</p>

    <h2 class="subTitle">Loi applicable</h2>
    <p>Le site est soumis au droit belge. En cas de litige, les tribunaux de Namur sont compétents.</p>

    <h2 class="subTitle">Réseaux sociaux officiels</h2>
    <ul>
      <li><a href="${social.linkedin}" target="_blank" rel="noopener">LinkedIn</a></li>
      <li><a href="${social.facebook}" target="_blank" rel="noopener">Facebook</a></li>
      <li><a href="${social.instagram}" target="_blank" rel="noopener">Instagram</a></li>
    </ul>
  `;
}
