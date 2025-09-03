// src/env.d.ts — déclarations globales

/// <reference types="astro/client" />

declare global {
  interface Window {
    dataLayer: any[];
    gtag: (...args: any[]) => void;
  }
}

interface ImportMetaEnv {
  // SMTP / debug
  readonly SMTP_HOST: string;
  readonly SMTP_PORT: string;
  readonly SMTP_USER: string;
  readonly MAIL_SMTP_PASS: string;
  readonly DEBUG_ENV_TEST: string;

  // Variables Astro standard
  readonly PUBLIC_SITE_URL: string;
  readonly MODE: string;
  readonly BASE_URL: string;
  readonly PROD: boolean;
  readonly DEV: boolean;
  readonly SSR: boolean;

  // Variables perso SBG
  readonly GA_MEASUREMENT_ID?: string;
  readonly GOOGLE_SITE_VERIFICATION?: string;

  // Autres variables éventuelles
  readonly [key: string]: string | boolean | undefined;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

declare module 'web-vitals' {
  export function getCLS(cb: (m: any) => void): void;
  export function getFID(cb: (m: any) => void): void;
  export function getFCP(cb: (m: any) => void): void;
  export function getLCP(cb: (m: any) => void): void;
  export function getTTFB(cb: (m: any) => void): void;
}

export {};
