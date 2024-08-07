import { c as createAstro, a as createComponent, r as renderTemplate, m as maybeRenderHead, b as addAttribute, u as unescapeHTML, d as renderComponent } from '../../chunks/astro/server_CuaXarcR.mjs';
import 'kleur/colors';
import 'clsx';
import { c as convertTo24HourFormat } from '../../chunks/time_B3QHorHI.mjs';
import { r as restaurants } from '../../chunks/data_DgkmadTx.mjs';
/* empty css                                   */
import { $ as $$TemplateRestaurants } from '../../chunks/templateRestaurants_3OU0meZ_.mjs';
export { renderers } from '../../renderers.mjs';

const $$Astro$1 = createAstro("https://example.com");
const $$DetailRestaurant = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$DetailRestaurant;
  const user = Astro2.locals.user;
  if (!user) {
    return Astro2.redirect("/signin");
  }
  const { id } = Astro2.props;
  let data = {
    id: 0,
    name: "",
    type: "",
    phone: "",
    time: {
      open: "",
      close: ""
    },
    day: "",
    image: "",
    detail: ""
  };
  console.log("id", id);
  if (id == 1) {
    data = restaurants[0];
  } else if (id == 2) {
    data = restaurants[1];
  } else if (id == 3) {
    data = restaurants[2];
  }
  const today = (/* @__PURE__ */ new Date()).toISOString().split("T")[0];
  const maxDate = /* @__PURE__ */ new Date();
  maxDate.setMonth(maxDate.getMonth() + 1);
  const maxDateString = maxDate.toISOString().split("T")[0];
  console.log("maxDateString", maxDateString);
  const open = convertTo24HourFormat(data.time.open);
  console.log("open", open);
  const closed = convertTo24HourFormat(data.time.close);
  return renderTemplate`${maybeRenderHead()}<div class="container"> <!-- Header Image --> <div class="row"> <div class="col-12"> <div class="card text-bg-dark"> <img src="https://img-service-v3.hungryhub.com/pr:sharp/rs:fill:0:0:0/g:ce/aHR0cHM6Ly9pbWFnZXMuaHVuZ3J5aHViLmNvbS91cGxvYWRzL2Jhbm5lci9kZXNrdG9wX3JldGluYV92ZXJzaW9ucy8zNDMvaG9tZS1wYWdlLWRlc2t0b3BfMTdfYXByLmpwZw==.jpg" class="card-img" alt="..."> <div class="card-img-overlay"> <h1 class="card-title">
แอปจองมื้อพิเศษอันดับ 1 มากกว่า 1,500 ร้านอาหาร
</h1> <!-- <p class="card-text">จองเลย</p> --> <!-- <p class="card-text"><small>Last updated 3 mins ago</small></p> --> </div> </div> </div> </div> <!-- Information Section --> <div class="row details-section"> <div class="col-md-6"> <img${addAttribute(data.image, "src")} alt="Map" class="img-fluid map-image"> </div> <div class="col-md-6"> <div class="alert alert-light"> <h5>${data.name}</h5> <ul class="list-unstyled"> <li> <i class="bi bi-calendar"></i> เปิดบริการ: ${data.day} </li> <li> <i class="bi bi-clock"></i> เวลาเปิดตั้งแต่ ${data.time.open} - ${data.time.close} </li> </ul> <p>ร้านอาหาร: อิตาเลียน</p> </div> <div class="alert alert-light"> <h5 class="text-center">Restaurant Reservation</h5> ${renderTemplate`<form id="reservation-form" method="POST" action="/api/booking"> <div class="mb-3"> <label for="phone">Number of Guests</label> <input type="number" class="form-control" id="guests" name="guests" min="1" max="30" pattern="[0-9]{1}" required> </div> <div class="mb-3"> <label for="date" class="form-label">
Reservation Date
</label> <input type="date" class="form-control" id="date" name="date"${addAttribute(today, "min")}${addAttribute(maxDateString, "max")} required> </div> <div class="mb-3"> <label for="time" class="form-label">
Reservation Time
</label> <input type="time" class="form-control" id="time" name="time" required${addAttribute(open, "min")}${addAttribute(closed, "max")}> </div> <div class="mb-3"> <input type="hidden" class="form-control" id="username" name="username"${addAttribute(user.username, "value")} required> </div> <div class="mb-3"> <input type="hidden" class="form-control" id="restaurant" name="restaurant"${addAttribute(data.name, "value")} required> </div> <button type="submit" class="btn btn-primary">
Submit
</button> </form>`} </div> </div> </div> <!-- Details Section --> <div class="row details-section"> <div class="col-12 alert alert-light"> <h5>รายละเอียด</h5> <div>${unescapeHTML(data.detail)}</div> </div> </div> </div> `;
}, "C:/code/Loop-Coding-Assignment/src/components/DetailRestaurant.astro", void 0);

const $$Astro = createAstro("https://example.com");
const $$id = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$id;
  const { id } = Astro2.params;
  return renderTemplate`${renderComponent($$result, "Layout", $$TemplateRestaurants, {}, { "default": ($$result2) => renderTemplate`  ${renderComponent($$result2, "DetailRestaurant", $$DetailRestaurant, { "id": id })} ` })}`;
}, "C:/code/Loop-Coding-Assignment/src/pages/restaurants/[id].astro", void 0);

const $$file = "C:/code/Loop-Coding-Assignment/src/pages/restaurants/[id].astro";
const $$url = "/restaurants/[id]";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$id,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
