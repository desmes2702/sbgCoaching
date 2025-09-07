// /src/js/utils/strings.ts
export const digits = (s?: string) => (s || "").replace(/\D/g, "");
export const normalizeWS = (s?: string) => (s || "").replace(/\s+/g, " ").trim();
export const isEmail = (s?: string) => !!s && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s);