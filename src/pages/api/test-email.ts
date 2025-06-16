import type { APIRoute } from "astro";
import nodemailer from "nodemailer";

export const POST: APIRoute = async () => {
  try {
    const transporter = nodemailer.createTransport({
      host: import.meta.env.SMTP_HOST,
      port: Number(import.meta.env.SMTP_PORT),
      auth: {
        user: import.meta.env.SMTP_USER,
        pass: import.meta.env.SMTP_PASS,
      },
    });

    await transporter.sendMail({
      from: "test@sbgcoaching.be",
      to: "test@sbgcoaching.be",
      subject: "✅ Test Email via Mailtrap",
      text: "Ce mail confirme que votre configuration SMTP est fonctionnelle.",
    });

    return new Response(JSON.stringify({ success: true }));
  } catch (err: any) {
    console.error("❌ Erreur test-email :", err);
    return new Response(JSON.stringify({ success: false, error: err.message }), { status: 500 });
  }
};
