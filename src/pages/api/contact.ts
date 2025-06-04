export const prerender = false;

import type { APIRoute } from "astro";
import nodemailer from "nodemailer";

export const POST: APIRoute = async ({ request }) => {
  // Récupère les données du formulaire (JSON)
  const body = await request.json();
  // Crée le transporteur SMTP avec tes identifiants Mailjet
  const transporter = nodemailer.createTransport({
    host: "in-v3.mailjet.com",
    port: 587,
    secure: false,
    auth: {
      user: "98dc9e41f440e8336dc5b210b2952100", // ta clé API
      pass: "562d9990e186671ec6d735ce03212f46", // ta clé secrète
    },
  });

  // Paramètres de l’email
  const mailOptions = {
    from: '"SBG Coaching" <antoine.thiri@gmail.com>', // adresse d’expéditeur
    to: "antoine.thiri@gmail.com", // adresse de destination
    subject: "Nouveau message SBG Coaching",
    text: `Message de ${body.firstname} ${body.lastname} (${body.email}) :\n\n${body.message}`,
  };

  try {
    // Envoie l’email
    await transporter.sendMail(mailOptions);
    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (err) {
    console.error("Erreur d’envoi mail :", err);
    return new Response(JSON.stringify({ success: false, error: "Erreur lors de l'envoi de l'email." }), { status: 500 });
  }
};
