import type { APIRoute } from "astro";

export const POST: APIRoute = async ({ request }) => {
  try {
    const { data } = await request.json();
    console.log("RDV reçu:", data);
    return new Response(JSON.stringify({ ok: true }), { status: 200 });
  } catch {
    return new Response(JSON.stringify({ ok: false }), { status: 400 });
  }
};
