import { companyInfos } from "@/js/data/__data";

export function injectSchemaOrg(): void {
  if (!companyInfos.schemaOrg) return;

  const script = document.createElement("script");
  script.type = "application/ld+json";
  script.textContent = JSON.stringify(companyInfos.schemaOrg, null, 2);
  document.head.appendChild(script);
  console.log("✅ Schema.org injecté dynamiquement");
}
