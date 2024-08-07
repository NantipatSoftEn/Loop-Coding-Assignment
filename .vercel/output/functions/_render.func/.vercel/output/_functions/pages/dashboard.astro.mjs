import { c as createAstro, a as createComponent, r as renderTemplate, d as renderComponent, m as maybeRenderHead } from '../chunks/astro/server_CuaXarcR.mjs';
import 'kleur/colors';
import { $ as $$HeaderLink } from '../chunks/HeaderLink_Cz8WijQJ.mjs';
import { $ as $$TemplateRestaurants } from '../chunks/templateRestaurants_3OU0meZ_.mjs';
import { f as fetchBookings } from '../chunks/getbooking_hjAo57Fk.mjs';
export { renderers } from '../renderers.mjs';

const $$Astro = createAstro("https://example.com");
const $$Dashboard = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Dashboard;
  const user = Astro2.locals.user;
  if (!user) {
    return Astro2.redirect("/signin");
  }
  const bookings = await fetchBookings(user.username);
  return renderTemplate`${renderComponent($$result, "Layout", $$TemplateRestaurants, {}, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="container"> <h1 class="mb-4">Booking Dashboard</h1> ${renderComponent($$result2, "HeaderLink", $$HeaderLink, { "href": "/list" }, { "default": ($$result3) => renderTemplate`กลับหน้าหลัก` })} <table class="table table-striped"> <thead> <tr> <th scope="col">#</th> <th scope="col">Name</th> <th scope="col">restaurant</th> <th scope="col">Date</th> <th scope="col">Time</th> <th scope="col">Guests</th> <th scope="col">QRCODE</th> </tr> </thead> <tbody> ${bookings.map((booking) => renderTemplate`<tr> <th scope="row">${booking.id}</th> <td>${booking.username}</td> <td>${booking.restaurant}</td> <td>${booking.date}</td> <td>${booking.time}</td> <td>${booking.guests}</td> <td> <img src="https://upload.wikimedia.org/wikipedia/commons/d/d0/QR_code_for_mobile_English_Wikipedia.svg" width="128"> </td> </tr>`)} </tbody> </table> </div> ` })}`;
}, "C:/code/Loop-Coding-Assignment/src/pages/dashboard.astro", void 0);

const $$file = "C:/code/Loop-Coding-Assignment/src/pages/dashboard.astro";
const $$url = "/dashboard";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Dashboard,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
