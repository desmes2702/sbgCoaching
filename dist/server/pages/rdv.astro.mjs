import { c as createComponent, r as renderTemplate } from '../chunks/astro/server_DW3zcPNd.mjs';
import 'kleur/colors';
import 'clsx';
export { renderers } from '../renderers.mjs';

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(raw || cooked.slice()) }));
var _a;
const $$Rdv = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate(_a || (_a = __template([`<!-- ---
import Menu from '@partials/__menu.astro';
import Form from '../pages/rdv/__form.astro';

const base = '/pages/';
---

<!DOCTYPE html>
<html lang="fr">

<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<meta name="description" content="Coaching sportif professionnel, individuel et en groupe. D\xE9couvrez nos services adapt\xE9s \xE0 vos besoins et vos objectifs.">
	<title>Accueil | Coaching Sportif</title>
</head>

<body class="page__rdv" data-page="rdv" data-variant="" data-module="links">

	<div class="wrapper-1440-black">
		<Menu />
	</div>

	<main class="main ">
		<Form />
	</main>

	<script type="module" src="/src/js/main.ts"><\/script>

</body>

</html>
\`\`\` -->`], [`<!-- ---
import Menu from '@partials/__menu.astro';
import Form from '../pages/rdv/__form.astro';

const base = '/pages/';
---

<!DOCTYPE html>
<html lang="fr">

<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<meta name="description" content="Coaching sportif professionnel, individuel et en groupe. D\xE9couvrez nos services adapt\xE9s \xE0 vos besoins et vos objectifs.">
	<title>Accueil | Coaching Sportif</title>
</head>

<body class="page__rdv" data-page="rdv" data-variant="" data-module="links">

	<div class="wrapper-1440-black">
		<Menu />
	</div>

	<main class="main ">
		<Form />
	</main>

	<script type="module" src="/src/js/main.ts"><\/script>

</body>

</html>
\\\`\\\`\\\` -->`])));
}, "C:/client/SBG_Coaching - v2/src/pages/rdv.astro", void 0);

const $$file = "C:/client/SBG_Coaching - v2/src/pages/rdv.astro";
const $$url = "/rdv";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	default: $$Rdv,
	file: $$file,
	url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
