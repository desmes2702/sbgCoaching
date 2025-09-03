/**
 * Formate une chaîne de texte : première lettre en majuscule, le reste en minuscule
 */
export function formatText(text: string | undefined): string {
  if (!text) return "-";
  return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
}

/**
 * Formate un numéro de téléphone (Belgique/France)
 */
export function formatNumber(value: string | undefined): string {
  if (!value) return "-";
  const cleaned = value.replace(/\D/g, "");
  if (cleaned.length < 8) return value;

  return cleaned.replace(/(\d{2})(?=\d)/g, "$1 ").trim();
}

/**
 * Formate une adresse email (masque partiellement le nom d’utilisateur)
 */
export function formatEmail(value: string | undefined): string {
  if (!value) return "-";
  const [user, domain] = value.split("@");
  if (!user || !domain) return value;

  const maskedUser =
    user.length > 2
      ? user.slice(0, 2) + "*".repeat(Math.min(3, user.length - 2))
      : user;

  return `${maskedUser}@${domain}`;
}
