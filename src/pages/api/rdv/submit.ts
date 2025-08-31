// FILE: src/pages/api/rdv/submit.ts
/**
 * @file Astro API route to handle appointment form submission.
 * Sends an email using Nodemailer and Zoho SMTP.
 * Vercel runtime is configured to Node.js in astro.config.ts if needed.
 */
import type { APIRoute } from "astro";
import nodemailer from "nodemailer";
import type { RdvData } from "../../../js/forms/rdv/types/rdvTypes.ts";
import { DURATION_LABELS } from "../../../js/data/rdv/duration.ts";
// Removed file-related imports
// import { MAX_FILE_SIZE_BYTES, ALLOWED_FILE_TYPES } from "../../../js/forms/rdv/utils/validation.ts";

// Vercel KV for Rate Limiting
import { kv } from '@vercel/kv';
// DOMPurify for sanitization (Note: For server-side, consider a Node.js-compatible sanitization library)
import DOMPurify from 'dompurify';

// Environment variables (should be set in Vercel)
const {
  ZOHO_SMTP_HOST,
  ZOHO_SMTP_PORT,
  ZOHO_SMTP_SECURE,
  ZOHO_SMTP_USER,
  ZOHO_SMTP_PASS,
  MAIL_TO,
} = import.meta.env;

// Removed MAX_TOTAL_ATTACHMENT_SIZE_BYTES

// Basic check for required environment variables
const areEnvVarsConfigured = () => {
    return ZOHO_SMTP_HOST && ZOHO_SMTP_PORT && ZOHO_SMTP_USER && ZOHO_SMTP_PASS && MAIL_TO;
}

// Helper to escape HTML to prevent XSS
const escapeHtml = (str: string | null | undefined): string => {
  if (str === null || str === undefined) return '';
  return str.replace(/[&<"'>]/g, function (s) {
    switch (s) {
      case '&': return '&amp;';
      case '<': return '&lt;';
      case '"': return '&quot;';
      case "'": return '&#039;';
      default: return s;
    }
  });
};

// Function to generate a clean HTML body for the email
const createHtmlBody = (data: RdvData): string => {
  const FRAGILITY_LABELS = { oui: "Oui", non: "Non", "ne-precise-pas": "Non précisé" };

  const durationValue = data.durationKey === "autre"
      ? `${escapeHtml(String(data.customDurationMonths))} mois` 
      : data.durationKey ? DURATION_LABELS[data.durationKey] : "Non renseigné";

  // Removed filesList
  // const filesList = data.files.length > 0 
  //   ? data.files.map(f => escapeHtml(f.name)).join(', ')
  //   : 'Aucun';

  return `
    <div style="font-family: sans-serif; line-height: 1.6;">
      <h1 style="color: #333;">Nouvelle demande de RDV</h1>
      <p>Une nouvelle demande de rendez-vous a été soumise via le site web.</p>
      <hr>
      <h2 style="color: #555;">Détails de la demande</h2>
      <table style="width: 100%; border-collapse: collapse;">
        <tr style="border-bottom: 1px solid #eee;"><td style="padding: 8px; font-weight: bold;">Type de client:</td><td style="padding: 8px;">${escapeHtml(data.userType || 'Non renseigné')}</td></tr>
        <tr style="border-bottom: 1px solid #eee;"><td style="padding: 8px; font-weight: bold;">Durée souhaitée:</td><td style="padding: 8px;">${durationValue}</td></tr>
        <tr style="border-bottom: 1px solid #eee;"><td style="padding: 8px; font-weight: bold;">Fragilité/Pathologie:</td><td style="padding: 8px;">${escapeHtml(data.fragility ? FRAGILITY_LABELS[data.fragility] : 'Non renseigné')}</td></tr>
        <!-- Removed files row -->
        <!-- <tr style="border-bottom: 1px solid #eee;"><td style="padding: 8px; font-weight: bold;">Fichiers joints:</td><td style="padding: 8px;">${filesList}</td></tr> -->
      </table>
      <h3 style="color: #555; margin-top: 20px;">Objectif du client:</h3>
      <div style="background-color: #f9f9f9; padding: 15px; border-radius: 5px; border: 1px solid #eee;">
        <p style="margin: 0;">${escapeHtml(data.objective || 'Non renseigné')}</p>
      </div>
    </div>
  `;
};

export const POST: APIRoute = async ({ request }) => {
  if (!areEnvVarsConfigured()) {
    console.error("Missing SMTP environment variables. Cannot send email.");
    return new Response(JSON.stringify({ message: "Le serveur de messagerie n'est pas configuré." }), { status: 500 });
  }

  try {
    const body = await request.json();
    const { data, meta, captchaToken } = body; // Destructure captchaToken

    // --- Rate Limiting ---
    const clientIP = request.headers.get('x-forwarded-for') || 'unknown';
    const rateLimitKey = `rdv-rate-limit:${clientIP}`;
    
    const attempts = await kv.incr(rateLimitKey);
    if (attempts === 1) {
      await kv.expire(rateLimitKey, 300); // 5 minutes
    }
    if (attempts > 3) {
      return new Response(JSON.stringify({ error: 'Rate limit exceeded' }), { status: 429 });
    }

    // --- Anti-spam checks ---
    if (meta.honeypot) {
      return new Response(JSON.stringify({ error: 'Spam detected' }), { status: 400 });
    }
    // Basic time check (e.g., form submitted too quickly)
    if (Date.now() - (meta?.ts ? new Date(meta.ts).getTime() : 0) < 3000) {
        return new Response(JSON.stringify({ message: "Form submitted too quickly." }), { status: 400 });
    }

    // --- CAPTCHA Verification ---
    const CAPTCHA_SECRET_KEY = import.meta.env.CAPTCHA_SECRET_KEY; // Get secret key from env
    const CAPTCHA_ENABLED = import.meta.env.PUBLIC_CAPTCHA_ENABLED === 'true'; // Feature flag

    if (CAPTCHA_ENABLED && captchaToken) {
      const captchaVerificationUrl = `https://www.google.com/recaptcha/api/siteverify?secret=${CAPTCHA_SECRET_KEY}&response=${captchaToken}`;
      const captchaResponse = await fetch(captchaVerificationUrl, { method: 'POST' });
      const captchaData = await captchaResponse.json();

      if (!captchaData.success) {
        console.warn('CAPTCHA verification failed:', captchaData);
        return new Response(JSON.stringify({ error: 'CAPTCHA verification failed' }), { status: 400 });
      }
    } else if (CAPTCHA_ENABLED && !captchaToken) {
      // If CAPTCHA is enabled but no token is provided
      return new Response(JSON.stringify({ error: 'CAPTCHA token missing' }), { status: 400 });
    }

    // --- Sanitization with DOMPurify ---
    const sanitizedData = {
      ...data,
      objective: DOMPurify.sanitize(data.objective),
      coord: {
        ...data.coord,
        message: data.coord.message ? DOMPurify.sanitize(data.coord.message) : ''
      }
    };

    // Removed file validation

    // --- Nodemailer Transport ---
    const transporter = nodemailer.createTransport({
      host: ZOHO_SMTP_HOST,
      port: Number(ZOHO_SMTP_PORT),
      secure: ZOHO_SMTP_SECURE === 'true', // Convert string from .env to boolean
      auth: {
        user: ZOHO_SMTP_USER,
        pass: ZOHO_SMTP_PASS,
      },
    });

    // Removed attachments preparation

    // --- Mail Options ---
    const mailOptions = {
      from: `"Site Web SBG Coaching" <${ZOHO_SMTP_USER}>`,
      to: MAIL_TO,
      subject: `Nouvelle demande de RDV (${escapeHtml(sanitizedData.userType || 'Non renseigné')})`,
      html: createHtmlBody(sanitizedData),
      // Removed attachments
    };

    // --- Send Mail ---
    await transporter.sendMail(mailOptions);

    return new Response(JSON.stringify({ message: "Success" }), { status: 200 });

  } catch (error) {
    console.error("Error processing form submission:", error);
    const message = error instanceof Error ? error.message : "An unknown error occurred.";
    return new Response(JSON.stringify({ message: `Erreur du serveur: ${message}` }), { status: 500 });
  }
};