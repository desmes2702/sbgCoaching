import { c as createComponent, m as maybeRenderHead, r as renderTemplate } from './astro/server_DW3zcPNd.mjs';
import 'kleur/colors';
import 'clsx';

const $$Faq = createComponent(($$result, $$props, $$slots) => {
  const faq = [
    {
      question: "Combien de temps faudra-t-il pour voir des r\xE9sultats ?",
      answer: "La dur\xE9e n\xE9cessaire pour voir des r\xE9sultats d\xE9pend de plusieurs facteurs, notamment de votre niveau de forme physique actuel, de la fr\xE9quence et de l'intensit\xE9 de vos entra\xEEnements, ainsi que de votre alimentation. En g\xE9n\xE9ral, vous pouvez commencer \xE0 remarquer des am\xE9liorations en termes d'\xE9nergie, d'humeur et de condition physique apr\xE8s 2 \xE0 4 semaines d'entra\xEEnement r\xE9gulier."
    },
    {
      question: "Quel type de programme est adapt\xE9 \xE0 mes objectifs ?",
      answer: "Nos programmes sont personnalis\xE9s en fonction de vos besoins et objectifs sp\xE9cifiques, allant de la remise en forme \xE0 la performance sportive. Nous \xE9valuons votre condition physique et vos attentes afin de vous proposer un plan d'entra\xEEnement et de nutrition adapt\xE9."
    },
    {
      question: "Comment vais-je g\xE9rer la fatigue et les courbatures ?",
      answer: "Pour mieux g\xE9rer la fatigue et les courbatures, il est essentiel d\u2019inclure des p\xE9riodes de r\xE9cup\xE9ration dans votre routine d'entra\xEEnement. Assurez-vous de bien vous hydrater, de pratiquer des \xE9tirements apr\xE8s chaque s\xE9ance et d\u2019int\xE9grer des techniques comme le massage ou les bains chauds pour soulager les tensions musculaires. Une bonne qualit\xE9 de sommeil et une alimentation riche en prot\xE9ines et en nutriments essentiels contribuent \xE9galement \xE0 une meilleure r\xE9cup\xE9ration."
    },
    {
      question: "Que dois-je changer dans mon alimentation pour maximiser les r\xE9sultats ?",
      answer: "Pour optimiser vos r\xE9sultats, privil\xE9giez une alimentation \xE9quilibr\xE9e comprenant des prot\xE9ines de qualit\xE9 (viandes maigres, poissons, \u0153ufs, l\xE9gumineuses), des glucides complexes (riz complet, patates douces, quinoa) et des lipides sains (avocats, noix, huile d'olive). Pensez \xE9galement \xE0 bien vous hydrater et \xE0 ajuster votre apport calorique en fonction de votre niveau d'activit\xE9 physique. Les suppl\xE9ments comme la whey prot\xE9ine, les BCAA ou la cr\xE9atine peuvent aussi \xEAtre utiles selon vos objectifs."
    }
  ];
  return renderTemplate`${maybeRenderHead()}<div class="wrapper-982-black"> <section class="faq section-height90 " itemscope itemtype="https://schema.org/FAQPage"> <h2 class="faq__title subTitle">FAQ</h2> <h3 class="faq__subTitle title">Questions fréquentes</h3> <div class="faq__list"> ${faq.map((item) => renderTemplate`<article class="faq__item" itemscope itemprop="mainEntity" itemtype="https://schema.org/Question"> <div class="faq__question"> <h4 itemprop="name">${item.question}</h4> <button class="faq__btn-more" aria-expanded="false"></button> </div> <div class="faq__answer" itemscope itemprop="acceptedAnswer" itemtype="https://schema.org/Answer"> <p itemprop="text">${item.answer}</p> </div> </article>`)} </div> </section> </div>`;
}, "C:/client/SBG_Coaching - v2/src/partials/components/Faq.astro", void 0);

export { $$Faq as $ };
