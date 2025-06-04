// ✅ __faq.ts
export function initFAQ(): void {
  const buttons = document.querySelectorAll<HTMLButtonElement>(".faq__btn-more");

  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      const faqItem = button.closest(".faq__item") as HTMLElement;
      const answer = faqItem.querySelector(".faq__answer") as HTMLElement;
      const isOpen = faqItem.classList.contains("faq--active");

      document.querySelectorAll(".faq__item").forEach((item) => {
        item.classList.remove("faq--active");
        item.querySelector(".faq__answer")?.classList.remove("is-visible");
        item.querySelector(".faq__btn-more")?.setAttribute("aria-expanded", "false");
        item.querySelector(".faq__btn-more")?.classList.remove("rotated");
      });

      if (!isOpen) {
        faqItem.classList.add("faq--active");
        answer.classList.add("is-visible");
        button.setAttribute("aria-expanded", "true");
        button.classList.add("rotated");
      }
    });
  });
}
