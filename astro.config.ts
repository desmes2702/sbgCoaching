import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import vercel from "@astrojs/vercel/serverless";
import sitemap from "@astrojs/sitemap";
import viteCfg from "./vite.config.ts";

export default defineConfig({
  site: "https://www.sbg-coaching.be",
  base: "/",
  trailingSlash: "never",
  prefetch: true,
  compressHTML: true,
  output: "server",
  adapter: vercel({}),
  integrations: [
    react(),
    sitemap(), // génération auto sitemap
  ],
  vite: viteCfg as any,
});
