export function handleTestimonialClick(button) {
  const id = button.getAttribute("aria-controls");
  if (!id) return;

  const content = document.getElementById(id);
  if (!content) return;

  const allContents = document.querySelectorAll(".testimonial__item__content");
  const allButtons = document.querySelectorAll(".testimonial__item__button");

  const isOpen = content.classList.contains("testimonial__item__content-active");

  // Ferme tout d'abord
  allContents.forEach((el) => {
    el.classList.remove("testimonial__item__content-active");
    el.setAttribute('hidden', '');
  });
  allButtons.forEach((el) => {
    el.classList.remove("testimonial__item__button-active");
    el.setAttribute("aria-expanded", "false");
  });

  // Toggle (ouvre seulement si ce n'était PAS déjà ouvert)
  if (!isOpen) {
    content.classList.add("testimonial__item__content-active");
    content.removeAttribute('hidden');
    button.classList.add("testimonial__item__button-active");
    button.setAttribute("aria-expanded", "true");
    content.scrollIntoView({ behavior: "smooth", block: "start" });
  }
  // Si c'était déjà ouvert, tout reste fermé (pas besoin d'autre action)
}
