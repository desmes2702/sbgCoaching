/* // ✅ __links.ts
export function initLinks(): void {
  const links = document.querySelectorAll<HTMLAnchorElement>(".social__link");

  const socialLinks: Record<string, { url: string }> = {
    linkedin: {
      url: "https://www.linkedin.com/company/sbg-leadership-coaching-and-consulting/",
    },
    facebook: {
      url: "https://www.facebook.com/samuelbillagarciacoaching",
    },
    instagram: {
      url: "https://www.instagram.com/sambillagarcia/",
    },
  };

  links.forEach((link) => {
    const platform = link.dataset.social as string;
    const variant = link.dataset.variant || "white";
    const data = socialLinks[platform];

    if (data) {
      link.href = data.url;

      const img = link.querySelector("img");
      if (img) {
        img.src = `img/icon__${platform}-${variant}.svg`;
        img.alt = platform.charAt(0).toUpperCase() + platform.slice(1);
      }

      link.setAttribute("aria-label", platform.charAt(0).toUpperCase() + platform.slice(1));
    }
  });
}
 */
