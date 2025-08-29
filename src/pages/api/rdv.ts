import type { APIRoute } from "astro";
import nodemailer from "nodemailer";

export const POST: APIRoute = async ({ request }) => {
  try {
    const { data, meta } = await request.json();

    // whitelists
    const ALLOWED = new Set(["image/jpeg","image/png","application/pdf"]);
    const MAX_TOTAL = 10 * 1024 * 1024; // 10 Mo
    let total = 0;

    const attachments = (data.files||[])
      .map((f:any)=>{
        if(!f?.base64) return null;
        if(!ALLOWED.has(f.type)) throw new Error(`Type non autorisé: ${f.name}`);
        total += f.size||0; if (total>MAX_TOTAL) throw new Error("Taille totale > 10 Mo.");
        return {
          filename: f.name,
          content: String(f.base64).split(";base64,").pop(),
          encoding:"base64",
          contentType: f.type,
        };
      })
      .filter(Boolean) as any[];

    const transporter = nodemailer.createTransport({
      host: process.env.ZOHO_SMTP_HOST,
      port: Number(process.env.ZOHO_SMTP_PORT||465),
      secure: String(process.env.ZOHO_SMTP_SECURE||"true")==="true",
      auth: { user: process.env.ZOHO_SMTP_USER!, pass: process.env.ZOHO_SMTP_PASS! }
    });

    const html = `<h1>Nouveau RDV</h1><pre>${JSON.stringify(data,null,2)}</pre>`;
    await transporter.sendMail({
      from: process.env.ZOHO_SMTP_USER!,
      to: process.env.MAIL_TO || "info@sbgcoaching.be",
      subject: "SBG Coaching — Demande de RDV",
      html, text: JSON.stringify(data,null,2),
      attachments
    });

    return new Response(JSON.stringify({ ok:true }), { status: 200 });
  } catch (e:any) {
    return new Response(JSON.stringify({ ok:false, error: e?.message || "Erreur" }), { status: 400 });
  }
};