import { c as createAstro, a as createComponent, r as renderTemplate, d as renderComponent, e as renderHead } from '../chunks/astro/server_CuaXarcR.mjs';
import 'kleur/colors';
import { $ as $$BaseHead, a as $$Header, b as $$Footer } from '../chunks/Footer_6QUTYlJ9.mjs';
import { S as SITE_TITLE, a as SITE_DESCRIPTION } from '../chunks/consts_D_LzBB4M.mjs';
import { A as ADMIN } from '../chunks/db_B47EA56_.mjs';
export { renderers } from '../renderers.mjs';

const $$Astro = createAstro("https://example.com");
const $$Index = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Index;
  const user = Astro2.locals.user;
  user?.username === ADMIN;
  return renderTemplate`<html lang="en"> <head>${renderComponent($$result, "BaseHead", $$BaseHead, { "title": SITE_TITLE, "description": SITE_DESCRIPTION })}${renderHead()}</head> <body> ${renderComponent($$result, "Header", $$Header, {})} <main> <h1>🍽️ ${SITE_TITLE} 🍽️</h1> <p>
Welcome to the ${SITE_TITLE} ระบบจองร้านอาหารเป็นโปรแกรมที่ช่วยให้ลูกค้าสามารถจองโต๊ะในร้านอาหารล่วงหน้าได้ ระบบนี้ช่วยเพิ่มความสะดวกสบายให้กับลูกค้าและช่วยให้ร้านอาหารสามารถจัดการกับการจองโต๊ะได้อย่างมีประสิทธิภาพ
</p> <button type="button" class="btn btn-primary" onclick="window.location.href='/signin'">เข้าสู่ระบบ</button> </main> ${renderComponent($$result, "Footer", $$Footer, {})} </body></html>`;
}, "C:/code/Loop-Coding-Assignment/src/pages/index.astro", void 0);

const $$file = "C:/code/Loop-Coding-Assignment/src/pages/index.astro";
const $$url = "";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
