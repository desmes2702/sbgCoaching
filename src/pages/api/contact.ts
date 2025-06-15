export const prerender = false;

import type { APIRoute } from "astro";
import nodemailer from "nodemailer";

// Variables d'environnement
const SMTP_USER = import.meta.env.SMTP_USER;
const SMTP_PASS = import.meta.env.SMTP_PASS;
const RECAPTCHA_SECRET_KEY = import.meta.env.RECAPTCHA_SECRET_KEY;

export const POST: APIRoute = async ({ request }) => {
  const body = await request.json();

  // 1️⃣ Vérification du token reCaptcha envoyé depuis le front
  const recaptchaToken = body.recaptchaToken;
  if (!recaptchaToken) {
    return new Response(JSON.stringify({ success: false, error: "reCaptcha manquant." }), { status: 400 });
  }

  // Appel à l’API Google pour vérifier le token
  const verifyUrl = `https://www.google.com/recaptcha/api/siteverify`;
  const params = new URLSearchParams();
  params.append("secret", RECAPTCHA_SECRET_KEY);
  params.append("response", recaptchaToken);

  const captchaRes = await fetch(verifyUrl, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: params,
  });

  const captchaData = await captchaRes.json();

  // 👁️ Logger utile pour debug (optionnel)
  console.log("reCAPTCHA v3", {
    score: captchaData.score,
    action: captchaData.action,
    hostname: captchaData.hostname,
  });

  // ✅ Vérifications agence++
  if (
    !captchaData.success ||
    (captchaData.score !== undefined && captchaData.score < 0.5) ||
    captchaData.action !== "submit" ||
    (captchaData.hostname && captchaData.hostname !== "sbgcoaching.be")
  ) {
    return new Response(JSON.stringify({ success: false, error: "Échec reCaptcha." }), { status: 403 });
  }

  // 2️⃣ Envoi du mail via Mailjet (SMTP)
  const transporter = nodemailer.createTransport({
    host: "in-v3.mailjet.com",
    port: 587,
    secure: false,
    auth: {
      user: SMTP_USER,
      pass: SMTP_PASS,
    },
  });

  const mailOptions = {
    from: '"SBG Coaching" <antoine.thiri@gmail.com>',
    to: "antoine.thiri@gmail.com",
    subject: "Nouveau message SBG Coaching",
    text: `Message de ${body.firstname} ${body.lastname} (${body.email}) :\n\n${body.message}`,
  };

  try {
    await transporter.sendMail(mailOptions);
    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (err) {
    console.error("Erreur d’envoi mail :", err);
    return new Response(JSON.stringify({ success: false, error: "Erreur lors de l'envoi de l'email." }), { status: 500 });
  }
};
