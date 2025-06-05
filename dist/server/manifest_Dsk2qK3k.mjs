import 'kleur/colors';
import { d as decodeKey } from './chunks/astro/server_DW3zcPNd.mjs';
import 'clsx';
import { N as NOOP_MIDDLEWARE_FN } from './chunks/astro-designed-error-pages_DwmA5vTL.mjs';
import 'es-module-lexer';

function sanitizeParams(params) {
  return Object.fromEntries(
    Object.entries(params).map(([key, value]) => {
      if (typeof value === "string") {
        return [key, value.normalize().replace(/#/g, "%23").replace(/\?/g, "%3F")];
      }
      return [key, value];
    })
  );
}
function getParameter(part, params) {
  if (part.spread) {
    return params[part.content.slice(3)] || "";
  }
  if (part.dynamic) {
    if (!params[part.content]) {
      throw new TypeError(`Missing parameter: ${part.content}`);
    }
    return params[part.content];
  }
  return part.content.normalize().replace(/\?/g, "%3F").replace(/#/g, "%23").replace(/%5B/g, "[").replace(/%5D/g, "]");
}
function getSegment(segment, params) {
  const segmentPath = segment.map((part) => getParameter(part, params)).join("");
  return segmentPath ? "/" + segmentPath : "";
}
function getRouteGenerator(segments, addTrailingSlash) {
  return (params) => {
    const sanitizedParams = sanitizeParams(params);
    let trailing = "";
    if (addTrailingSlash === "always" && segments.length) {
      trailing = "/";
    }
    const path = segments.map((segment) => getSegment(segment, sanitizedParams)).join("") + trailing;
    return path || "/";
  };
}

function deserializeRouteData(rawRouteData) {
  return {
    route: rawRouteData.route,
    type: rawRouteData.type,
    pattern: new RegExp(rawRouteData.pattern),
    params: rawRouteData.params,
    component: rawRouteData.component,
    generate: getRouteGenerator(rawRouteData.segments, rawRouteData._meta.trailingSlash),
    pathname: rawRouteData.pathname || void 0,
    segments: rawRouteData.segments,
    prerender: rawRouteData.prerender,
    redirect: rawRouteData.redirect,
    redirectRoute: rawRouteData.redirectRoute ? deserializeRouteData(rawRouteData.redirectRoute) : void 0,
    fallbackRoutes: rawRouteData.fallbackRoutes.map((fallback) => {
      return deserializeRouteData(fallback);
    }),
    isIndex: rawRouteData.isIndex,
    origin: rawRouteData.origin
  };
}

function deserializeManifest(serializedManifest) {
  const routes = [];
  for (const serializedRoute of serializedManifest.routes) {
    routes.push({
      ...serializedRoute,
      routeData: deserializeRouteData(serializedRoute.routeData)
    });
    const route = serializedRoute;
    route.routeData = deserializeRouteData(serializedRoute.routeData);
  }
  const assets = new Set(serializedManifest.assets);
  const componentMetadata = new Map(serializedManifest.componentMetadata);
  const inlinedScripts = new Map(serializedManifest.inlinedScripts);
  const clientDirectives = new Map(serializedManifest.clientDirectives);
  const serverIslandNameMap = new Map(serializedManifest.serverIslandNameMap);
  const key = decodeKey(serializedManifest.key);
  return {
    // in case user middleware exists, this no-op middleware will be reassigned (see plugin-ssr.ts)
    middleware() {
      return { onRequest: NOOP_MIDDLEWARE_FN };
    },
    ...serializedManifest,
    assets,
    componentMetadata,
    inlinedScripts,
    clientDirectives,
    routes,
    serverIslandNameMap,
    key
  };
}

const manifest = deserializeManifest({"hrefRoot":"file:///C:/client/SBG_Coaching%20-%20v2/","cacheDir":"file:///C:/client/SBG_Coaching%20-%20v2/node_modules/.astro/","outDir":"file:///C:/client/SBG_Coaching%20-%20v2/dist/","srcDir":"file:///C:/client/SBG_Coaching%20-%20v2/src/","publicDir":"file:///C:/client/SBG_Coaching%20-%20v2/public/","buildClientDir":"file:///C:/client/SBG_Coaching%20-%20v2/dist/client/","buildServerDir":"file:///C:/client/SBG_Coaching%20-%20v2/dist/server/","adapterName":"@astrojs/node","routes":[{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"page","component":"_server-islands.astro","params":["name"],"segments":[[{"content":"_server-islands","dynamic":false,"spread":false}],[{"content":"name","dynamic":true,"spread":false}]],"pattern":"^\\/_server-islands\\/([^/]+?)\\/?$","prerender":false,"isIndex":false,"fallbackRoutes":[],"route":"/_server-islands/[name]","origin":"internal","_meta":{"trailingSlash":"ignore"}}},{"file":"about/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/about","isIndex":false,"type":"page","pattern":"^\\/about\\/?$","segments":[[{"content":"about","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/about.astro","pathname":"/about","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"contact/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/contact","isIndex":false,"type":"page","pattern":"^\\/contact\\/?$","segments":[[{"content":"contact","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/contact.astro","pathname":"/contact","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"entreprise/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/entreprise","isIndex":false,"type":"page","pattern":"^\\/entreprise\\/?$","segments":[[{"content":"entreprise","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/entreprise.astro","pathname":"/entreprise","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"general/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/general","isIndex":false,"type":"page","pattern":"^\\/general\\/?$","segments":[[{"content":"general","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/general.astro","pathname":"/general","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"LegalMentions/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/legalmentions","isIndex":false,"type":"page","pattern":"^\\/LegalMentions\\/?$","segments":[[{"content":"LegalMentions","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/LegalMentions.astro","pathname":"/LegalMentions","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"PrivacyPolicy/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/privacypolicy","isIndex":false,"type":"page","pattern":"^\\/PrivacyPolicy\\/?$","segments":[[{"content":"PrivacyPolicy","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/PrivacyPolicy.astro","pathname":"/PrivacyPolicy","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"program/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/program","isIndex":false,"type":"page","pattern":"^\\/program\\/?$","segments":[[{"content":"program","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/program.astro","pathname":"/program","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"rdv/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/rdv","isIndex":false,"type":"page","pattern":"^\\/rdv\\/?$","segments":[[{"content":"rdv","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/rdv.astro","pathname":"/rdv","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"testimonials/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/testimonials","isIndex":false,"type":"page","pattern":"^\\/testimonials\\/?$","segments":[[{"content":"testimonials","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/testimonials.astro","pathname":"/testimonials","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"thanks/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/thanks","isIndex":false,"type":"page","pattern":"^\\/thanks\\/?$","segments":[[{"content":"thanks","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/thanks.astro","pathname":"/thanks","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/","isIndex":true,"type":"page","pattern":"^\\/$","segments":[],"params":[],"component":"src/pages/index.astro","pathname":"/","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_image","pattern":"^\\/_image\\/?$","segments":[[{"content":"_image","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/astro/dist/assets/endpoint/node.js","pathname":"/_image","prerender":false,"fallbackRoutes":[],"origin":"internal","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/api/contact","isIndex":false,"type":"endpoint","pattern":"^\\/api\\/contact\\/?$","segments":[[{"content":"api","dynamic":false,"spread":false}],[{"content":"contact","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/api/contact.ts","pathname":"/api/contact","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}}],"base":"/","trailingSlash":"ignore","compressHTML":true,"componentMetadata":[["C:/client/SBG_Coaching - v2/src/pages/LegalMentions.astro",{"propagation":"none","containsHead":true}],["C:/client/SBG_Coaching - v2/src/pages/PrivacyPolicy.astro",{"propagation":"none","containsHead":true}],["C:/client/SBG_Coaching - v2/src/pages/about.astro",{"propagation":"none","containsHead":true}],["C:/client/SBG_Coaching - v2/src/pages/contact.astro",{"propagation":"none","containsHead":true}],["C:/client/SBG_Coaching - v2/src/pages/entreprise.astro",{"propagation":"none","containsHead":true}],["C:/client/SBG_Coaching - v2/src/pages/general.astro",{"propagation":"none","containsHead":true}],["C:/client/SBG_Coaching - v2/src/pages/index.astro",{"propagation":"none","containsHead":true}],["C:/client/SBG_Coaching - v2/src/pages/program.astro",{"propagation":"none","containsHead":true}],["C:/client/SBG_Coaching - v2/src/pages/testimonials.astro",{"propagation":"none","containsHead":true}],["C:/client/SBG_Coaching - v2/src/pages/thanks.astro",{"propagation":"none","containsHead":true}]],"renderers":[],"clientDirectives":[["idle","(()=>{var l=(n,t)=>{let i=async()=>{await(await n())()},e=typeof t.value==\"object\"?t.value:void 0,s={timeout:e==null?void 0:e.timeout};\"requestIdleCallback\"in window?window.requestIdleCallback(i,s):setTimeout(i,s.timeout||200)};(self.Astro||(self.Astro={})).idle=l;window.dispatchEvent(new Event(\"astro:idle\"));})();"],["load","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).load=e;window.dispatchEvent(new Event(\"astro:load\"));})();"],["media","(()=>{var n=(a,t)=>{let i=async()=>{await(await a())()};if(t.value){let e=matchMedia(t.value);e.matches?i():e.addEventListener(\"change\",i,{once:!0})}};(self.Astro||(self.Astro={})).media=n;window.dispatchEvent(new Event(\"astro:media\"));})();"],["only","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).only=e;window.dispatchEvent(new Event(\"astro:only\"));})();"],["visible","(()=>{var a=(s,i,o)=>{let r=async()=>{await(await s())()},t=typeof i.value==\"object\"?i.value:void 0,c={rootMargin:t==null?void 0:t.rootMargin},n=new IntersectionObserver(e=>{for(let l of e)if(l.isIntersecting){n.disconnect(),r();break}},c);for(let e of o.children)n.observe(e)};(self.Astro||(self.Astro={})).visible=a;window.dispatchEvent(new Event(\"astro:visible\"));})();"]],"entryModules":{"\u0000noop-middleware":"_noop-middleware.mjs","\u0000noop-actions":"_noop-actions.mjs","\u0000@astro-page:src/pages/api/contact@_@ts":"pages/api/contact.astro.mjs","\u0000@astro-page:src/pages/contact@_@astro":"pages/contact.astro.mjs","\u0000@astro-page:src/pages/LegalMentions@_@astro":"pages/legalmentions.astro.mjs","\u0000@astro-page:src/pages/PrivacyPolicy@_@astro":"pages/privacypolicy.astro.mjs","\u0000@astro-page:src/pages/program@_@astro":"pages/program.astro.mjs","\u0000@astro-page:src/pages/rdv@_@astro":"pages/rdv.astro.mjs","\u0000@astro-page:src/pages/thanks@_@astro":"pages/thanks.astro.mjs","\u0000@astrojs-ssr-virtual-entry":"entry.mjs","\u0000@astro-page:src/pages/entreprise@_@astro":"pages/entreprise.astro.mjs","\u0000@astro-page:src/pages/general@_@astro":"pages/general.astro.mjs","\u0000@astro-renderers":"renderers.mjs","\u0000@astro-page:src/pages/testimonials@_@astro":"pages/testimonials.astro.mjs","\u0000@astro-page:src/pages/about@_@astro":"pages/about.astro.mjs","\u0000@astro-page:src/pages/index@_@astro":"pages/index.astro.mjs","\u0000@astro-page:node_modules/astro/dist/assets/endpoint/node@_@js":"pages/_image.astro.mjs","\u0000@astrojs-ssr-adapter":"_@astrojs-ssr-adapter.mjs","C:/client/SBG_Coaching - v2/src/js/rdv/__sendForm.js":"chunks/__sendForm_l0sNRNKZ.mjs","C:/client/SBG_Coaching - v2/node_modules/astro/dist/assets/services/sharp.js":"chunks/sharp_CINY57aW.mjs","C:/client/SBG_Coaching - v2/src/js/about/__slogan.ts":"chunks/__slogan_DIO1oVQc.mjs","C:/client/SBG_Coaching - v2/src/js/global/initForm.ts":"chunks/initForm_D_TQFK68.mjs","C:/client/SBG_Coaching - v2/node_modules/unstorage/drivers/fs-lite.mjs":"chunks/fs-lite_COtHaKzy.mjs","\u0000@astrojs-manifest":"manifest_Dsk2qK3k.mjs","@partials/performance/LazyFadeIn":"_astro/LazyFadeIn.CqgMD_fh.js","@partials/components/ContactForm.tsx":"_astro/ContactForm.BaUeoAHf.js","@partials/components/CoachingHero.tsx":"_astro/CoachingHero.RYoa5SUX.js","@partials/entreprise/Performance":"_astro/Performance.CB-0dq_D.js","@partials/general/Type.tsx":"_astro/Type.CkN3mTh5.js","@partials/components/Menu":"_astro/Menu.BdyZf6vm.js","@astrojs/react/client.js":"_astro/client.BPIbHqJh.js","astro:scripts/before-hydration.js":""},"inlinedScripts":[],"assets":["/_astro/LegalMentions.iXv46i_q.css","/videos/rtlTvi.mp4","/_astro/client.BPIbHqJh.js","/_astro/CoachingHero.RYoa5SUX.js","/_astro/ContactForm.BaUeoAHf.js","/_astro/index.BVOCwoKb.js","/_astro/jsx-runtime.D_zvdyIk.js","/_astro/LazyFadeIn.CqgMD_fh.js","/_astro/Menu.BdyZf6vm.js","/_astro/Performance.CB-0dq_D.js","/_astro/Type.CkN3mTh5.js","/img/about__hero.png","/img/entreprise__graph.svg","/img/football.png","/img/growUp-mobile.svg","/img/hero__bck-320.png","/img/hero__bck-768.png","/img/home__arrow.svg","/img/home__training__card.svg","/img/home__training__graph.svg","/img/home__training__program.svg","/img/icon__back__rdv.svg","/img/icon__burger-black.svg","/img/icon__burger-white.svg","/img/icon__burger.svg","/img/icon__business.svg","/img/icon__button__arrow.svg","/img/icon__clock.svg","/img/icon__close.svg","/img/icon__disconnect.svg","/img/icon__download.svg","/img/icon__facebook-black.svg","/img/icon__facebook-white.svg","/img/icon__football.svg","/img/icon__form__check__rdv.svg","/img/icon__form__duree.svg","/img/icon__form__mail.svg","/img/icon__form__personal.svg","/img/icon__form__phone.svg","/img/icon__form__type.svg","/img/icon__googleForm.svg","/img/icon__group.svg","/img/icon__info.svg","/img/icon__instagram-black.svg","/img/icon__instagram-red.svg","/img/icon__instagram-white.svg","/img/icon__left.svg","/img/icon__linkedin-black.svg","/img/icon__linkedin-white.svg","/img/icon__mail-black.svg","/img/icon__mail-white.svg","/img/icon__map-black.svg","/img/icon__map-white.svg","/img/icon__next-3d.svg","/img/icon__next__rdv.svg","/img/icon__phone-black.svg","/img/icon__phone-white.svg","/img/icon__play-red.svg","/img/icon__prev-3d.svg","/img/icon__private.svg","/img/icon__profil.svg","/img/icon__right.svg","/img/icon__show.svg","/img/icon__temoignage.svg","/img/icon__testimonial.svg","/img/icon__type__index.svg","/img/icon__validation-black.svg","/img/icon__validation-white.svg","/img/index__testimonials-mobile.png","/img/index__testimonials-tablet.png","/img/logo-black.svg","/img/logo-white.svg","/img/logo.svg","/img/post-new.png","/img/post2.png","/img/post3.png","/img/program1.png","/img/program2.png","/img/signature-white.svg","/img/signature__vectorized.svg","/img/slogan__linear.svg","/img/testimonial1.jpg","/img/testimonial2.jpg","/img/testimonial3.jpg","/font/Nexa-Black.eot","/font/Nexa-Black.ttf","/font/Nexa-Black.woff","/font/Nexa-Black.woff2","/font/Nexa-BlackItalic.eot","/font/Nexa-BlackItalic.ttf","/font/Nexa-BlackItalic.woff","/font/Nexa-BlackItalic.woff2","/font/Nexa-Bold.eot","/font/Nexa-Bold.ttf","/font/Nexa-Bold.woff","/font/Nexa-Bold.woff2","/font/Nexa-BoldItalic.eot","/font/Nexa-BoldItalic.ttf","/font/Nexa-BoldItalic.woff","/font/Nexa-BoldItalic.woff2","/font/Nexa-Book.eot","/font/Nexa-Book.ttf","/font/Nexa-Book.woff","/font/Nexa-Book.woff2","/font/Nexa-BookItalic.eot","/font/Nexa-BookItalic.ttf","/font/Nexa-BookItalic.woff","/font/Nexa-BookItalic.woff2","/font/Nexa-Heavy.eot","/font/Nexa-Heavy.ttf","/font/Nexa-Heavy.woff","/font/Nexa-Heavy.woff2","/font/Nexa-HeavyItalic.eot","/font/Nexa-HeavyItalic.ttf","/font/Nexa-HeavyItalic.woff","/font/Nexa-HeavyItalic.woff2","/font/Nexa-Italic.eot","/font/Nexa-Italic.ttf","/font/Nexa-Italic.woff","/font/Nexa-Italic.woff2","/font/Nexa-Light.eot","/font/Nexa-Light.ttf","/font/Nexa-Light.woff","/font/Nexa-Light.woff2","/font/Nexa-LightItalic.eot","/font/Nexa-LightItalic.ttf","/font/Nexa-LightItalic.woff","/font/Nexa-LightItalic.woff2","/font/Nexa-Regular.eot","/font/Nexa-Regular.ttf","/font/Nexa-Regular.woff","/font/Nexa-Regular.woff2","/font/Nexa-Thin.eot","/font/Nexa-Thin.ttf","/font/Nexa-Thin.woff","/font/Nexa-Thin.woff2","/font/Nexa-ThinItalic.eot","/font/Nexa-ThinItalic.ttf","/font/Nexa-ThinItalic.woff","/font/Nexa-ThinItalic.woff2","/font/Nexa-XBold.eot","/font/Nexa-XBold.ttf","/font/Nexa-XBold.woff","/font/Nexa-XBold.woff2","/font/Nexa-XBoldItalic.eot","/font/Nexa-XBoldItalic.ttf","/font/Nexa-XBoldItalic.woff","/font/Nexa-XBoldItalic.woff2","/font/stylesheet.css","/style/css/index.css","/style/css/index.css.map","/style/css/main.css","/style/css/main.css.map","/style/min_css/index.min.css","/style/min_css/index.min.css.map","/style/min_css/main.min.css","/style/min_css/main.min.css.map","/img/entreprise/entreprise__post1-main.png","/img/entreprise/entreprise__post1-thumb.png","/img/entreprise/entreprise__post2-thumb.png","/img/entreprise/entreprise__post3-main-phone.png","/img/entreprise/entreprise__post3-main.png","/img/entreprise/entreprise__post3-thumb.png","/img/general/general__post1-thumb.png","/img/general/general__post1.png","/img/general/general__post2-thumb.png","/img/general/general__post3-thumb.png","/img/testimonials/testimonial__alice.png","/img/testimonials/testimonial__christian.png","/img/testimonials/testimonial__ducheneSa.png","/img/testimonials/testimonial__justin.png","/img/testimonials/testimonial__labeyeLallemend.png","/img/testimonials/testimonial__plenevauxNijs.png","/img/testimonials/testimonial__udhSprl.png","/about/index.html","/contact/index.html","/entreprise/index.html","/general/index.html","/LegalMentions/index.html","/PrivacyPolicy/index.html","/program/index.html","/rdv/index.html","/testimonials/index.html","/thanks/index.html","/index.html"],"buildFormat":"directory","checkOrigin":true,"serverIslandNameMap":[],"key":"Avak+wOosUMRKTXecZC8mh7SkP1J3dEDYZoJpW7c5dY=","sessionConfig":{"driver":"fs-lite","options":{"base":"C:\\client\\SBG_Coaching - v2\\node_modules\\.astro\\sessions"}}});
if (manifest.sessionConfig) manifest.sessionConfig.driverModule = () => import('./chunks/fs-lite_COtHaKzy.mjs');

export { manifest };
