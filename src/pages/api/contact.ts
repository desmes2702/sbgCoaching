export const prerender = false;
console.log("📨 Nouvelle requête POST /api/contact");

import type { APIRoute } from "astro";
import nodemailer from "nodemailer";

// 🌐 Variables d’environnement
const SMTP_HOST = import.meta.env.SMTP_HOST;
const SMTP_PORT = import.meta.env.SMTP_PORT;
const SMTP_USER = import.meta.env.SMTP_USER;
const SMTP_PASS = import.meta.env.SMTP_PASS;

export const POST: APIRoute = async ({ request }) => {
  let body;
  try {
    body = await request.json();
  } catch (err) {
    console.error("❌ Erreur de parsing JSON :", err);
    return new Response(JSON.stringify({ success: false, error: "Format invalide." }), { status: 400 });
  }

  // ✅ Log de sécurité
  console.log("🔐 Requête reçue avec données :", {
    ...body,
  });

  // 🔐 Vérification des variables SMTP
  if (!SMTP_HOST || !SMTP_PORT || !SMTP_USER || !SMTP_PASS) {
    console.error("❌ Variables SMTP manquantes :", {
      SMTP_HOST,
      SMTP_PORT,
      SMTP_USER,
      SMTP_PASS: SMTP_PASS?.substring(0, 4) + "***",
    });
    return new Response(
      JSON.stringify({ success: false, error: "Configuration SMTP incomplète." }),
      { status: 500 }
    );
  }

  // ✉️ Création du transporteur
  const transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port: Number(SMTP_PORT),
    secure: false,
    auth: {
      user: SMTP_USER,
      pass: SMTP_PASS,
    },
    logger: true,
    debug: true,
  });

  console.log("🔌 Configuration SMTP :", {
    host: SMTP_HOST,
    port: SMTP_PORT,
    user: SMTP_USER,
    pass: SMTP_PASS?.substring(0, 4) + "***",
  });

  // 🧪 Test de connexion SMTP
  try {
    await transporter.verify();
    console.log("✅ Connexion SMTP valide.");
  } catch (verifyError: any) {
    console.error("❌ Échec de connexion SMTP :", verifyError);
    return new Response(
      JSON.stringify({ success: false, error: "Connexion SMTP échouée." }),
      { status: 500 }
    );
  }

  // 📤 Envoi du mail
  const mailOptions = {
    from: '"SBG Coaching" <antoine.thiri@gmail.com>',
    to: "antoine.thiri@gmail.com",
    subject: "Nouveau message SBG Coaching",
    text: `Message de ${body.firstname} ${body.lastname} (${body.email}) :\n\n${body.message}`,
  };

  try {
    console.log("📨 Tentative d’envoi via SMTP...");
    await transporter.sendMail(mailOptions);
    console.log("✅ Mail envoyé avec succès !");
    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (err) {
    console.error("❌ Erreur d’envoi mail :", err);
    return new Response(
      JSON.stringify({ success: false, error: "Erreur lors de l'envoi de l'email." }),
      { status: 500 }
    );
  }
};
