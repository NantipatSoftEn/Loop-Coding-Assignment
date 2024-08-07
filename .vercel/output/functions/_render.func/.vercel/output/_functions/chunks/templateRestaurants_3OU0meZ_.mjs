import { a as createComponent, r as renderTemplate, d as renderComponent, e as renderHead, f as renderSlot } from './astro/server_CuaXarcR.mjs';
import 'kleur/colors';
import { $ as $$BaseHead, a as $$Header, b as $$Footer } from './Footer_6QUTYlJ9.mjs';
import { S as SITE_TITLE, a as SITE_DESCRIPTION } from './consts_D_LzBB4M.mjs';
/* empty css                             */

const $$TemplateRestaurants = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`<html lang="en" data-astro-cid-ytublttz> <head>${renderComponent($$result, "BaseHead", $$BaseHead, { "title": SITE_TITLE, "description": SITE_DESCRIPTION, "data-astro-cid-ytublttz": true })}${renderHead()}</head> <body data-astro-cid-ytublttz> ${renderComponent($$result, "Header", $$Header, { "data-astro-cid-ytublttz": true })} <main data-astro-cid-ytublttz> ${renderSlot($$result, $$slots["default"])} ${renderComponent($$result, "Footer", $$Footer, { "data-astro-cid-ytublttz": true })} </main> </body></html>`;
}, "C:/code/Loop-Coding-Assignment/src/layouts/templateRestaurants.astro", void 0);

export { $$TemplateRestaurants as $ };
