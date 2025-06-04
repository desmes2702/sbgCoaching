import type { APIRoute } from "astro";
export const POST: APIRoute = async ({ request }) => {
  return new Response(JSON.stringify({ success: true, msg: "API contact OK" }), { status: 200 });
};