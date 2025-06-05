import { renderers } from './renderers.mjs';
import { c as createExports, s as serverEntrypointModule } from './chunks/_@astrojs-ssr-adapter_ef4xOFId.mjs';
import { manifest } from './manifest_Dsk2qK3k.mjs';

const serverIslandMap = new Map();;

const _page0 = () => import('./pages/_image.astro.mjs');
const _page1 = () => import('./pages/about.astro.mjs');
const _page2 = () => import('./pages/api/contact.astro.mjs');
const _page3 = () => import('./pages/contact.astro.mjs');
const _page4 = () => import('./pages/entreprise.astro.mjs');
const _page5 = () => import('./pages/general.astro.mjs');
const _page6 = () => import('./pages/legalmentions.astro.mjs');
const _page7 = () => import('./pages/privacypolicy.astro.mjs');
const _page8 = () => import('./pages/program.astro.mjs');
const _page9 = () => import('./pages/rdv.astro.mjs');
const _page10 = () => import('./pages/testimonials.astro.mjs');
const _page11 = () => import('./pages/thanks.astro.mjs');
const _page12 = () => import('./pages/index.astro.mjs');
const pageMap = new Map([
    ["node_modules/astro/dist/assets/endpoint/node.js", _page0],
    ["src/pages/about.astro", _page1],
    ["src/pages/api/contact.ts", _page2],
    ["src/pages/contact.astro", _page3],
    ["src/pages/entreprise.astro", _page4],
    ["src/pages/general.astro", _page5],
    ["src/pages/LegalMentions.astro", _page6],
    ["src/pages/PrivacyPolicy.astro", _page7],
    ["src/pages/program.astro", _page8],
    ["src/pages/rdv.astro", _page9],
    ["src/pages/testimonials.astro", _page10],
    ["src/pages/thanks.astro", _page11],
    ["src/pages/index.astro", _page12]
]);

const _manifest = Object.assign(manifest, {
    pageMap,
    serverIslandMap,
    renderers,
    actions: () => import('./_noop-actions.mjs'),
    middleware: () => import('./_noop-middleware.mjs')
});
const _args = {
    "mode": "standalone",
    "client": "file:///C:/client/SBG_Coaching%20-%20v2/dist/client/",
    "server": "file:///C:/client/SBG_Coaching%20-%20v2/dist/server/",
    "host": false,
    "port": 4321,
    "assets": "_astro"
};
const _exports = createExports(_manifest, _args);
const handler = _exports['handler'];
const startServer = _exports['startServer'];
const options = _exports['options'];
const _start = 'start';
if (_start in serverEntrypointModule) {
	serverEntrypointModule[_start](_manifest, _args);
}

export { handler, options, pageMap, startServer };
