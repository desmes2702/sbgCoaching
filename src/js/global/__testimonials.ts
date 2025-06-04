import { testimonials } from "@/js/data/testimonialsData"; // ✅ Correct path (vérifie bien que tsconfig `baseUrl` et `paths` sont OK)

export function initTestimonial(): void {
  const featured = testimonials.find((t) => t.featured === true);
  const lastTestimonials = testimonials.filter((t) => !t.featured);

  const imgContainer = document.querySelector(".testimonial-new__image") as HTMLElement | null;
  const contentContainer = document.querySelector(".testimonial-new__content") as HTMLElement | null;

  if (featured && imgContainer && contentContainer) {
    imgContainer.style.backgroundImage = `url('${featured.photo}')`;
    contentContainer.querySelector(".testimonial-new__name")!.textContent = featured.name;
    contentContainer.querySelector(".testimonial-new__job")!.textContent = featured.job || "";

    const quote = contentContainer.querySelector(".testimonial-new__quote");
    if (quote) {
      quote.innerHTML = featured.text.map((p: string) => `<p>${p}</p>`).join("");
    }
  }

  const lastSection = document.getElementById("testimonials-last");
  if (!lastSection) return;

  const wrapper = document.createElement("div");
  wrapper.className = "testimonials__wrapper";

  const col1 = document.createElement("div");
  col1.className = "testimonials__wrapper__col1";

  const col2 = document.createElement("div");
  col2.className = "testimonials__wrapper__col2";

  lastTestimonials.forEach((t: typeof testimonials[number], i: number) => {
    const item = document.createElement("div");
    item.className = "testimonial__item";

    const imageDiv = document.createElement("div");
    imageDiv.className = "testimonial__item__image";
    imageDiv.style.backgroundImage = `url('${t.photo}')`;

    const button = document.createElement("button");
    button.className = "testimonial__item__button";
    button.innerHTML = `Voir le témoignage <span class="testimonial__item__arrow"></span>`;

    const content = document.createElement("div");
    content.className = "testimonial__item__content";

    const header = `
      <header class="testimonial__item__header">
        <div>
          <h3 class="testimonial__item__name">${t.name}</h3>
        </div>
        ${t.job ? `<span>${t.job}</span>` : ""}
      </header>
    `;

    content.innerHTML = header + t.text.map((p: string) => `<p>${p}</p>`).join("");

    item.appendChild(imageDiv);
    item.appendChild(button);
    item.appendChild(content);

    if (i % 2 === 0) {
      col1.appendChild(item);
    } else {
      col2.appendChild(item);
    }
  });

  wrapper.appendChild(col1);
  wrapper.appendChild(col2);
  lastSection.appendChild(wrapper);

  document.querySelectorAll(".testimonial__item__button").forEach((btn) => {
    btn.addEventListener("click", () => {
      const parent = (btn as HTMLElement).closest(".testimonial__item") as HTMLElement;
      const content = parent.querySelector(".testimonial__item__content") as HTMLElement;
      const isActive = content.classList.contains("testimonial__item__content-active");

      document.querySelectorAll(".testimonial__item__content").forEach((el) =>
        el.classList.remove("testimonial__item__content-active")
      );
      document.querySelectorAll(".testimonial__item__button").forEach((el) =>
        el.classList.remove("testimonial__item__button-active")
      );

      if (!isActive) {
        content.classList.add("testimonial__item__content-active");
        btn.classList.add("testimonial__item__button-active");
      }
    });
  });
}
