// ✅ __footer.ts
export function hideFooterForm(): void {
  const footerForm = document.getElementById("footer-contact-form");
  if (footerForm) {
    footerForm.remove();
    console.log("🧼 Formulaire footer masqué sur la page RDV");
  }
}
