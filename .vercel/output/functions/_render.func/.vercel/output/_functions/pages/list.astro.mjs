import { c as createAstro, a as createComponent, r as renderTemplate, m as maybeRenderHead, d as renderComponent, b as addAttribute } from '../chunks/astro/server_CuaXarcR.mjs';
import 'kleur/colors';
import { $ as $$HeaderLink } from '../chunks/HeaderLink_Cz8WijQJ.mjs';
import moment from 'moment';
import { g as getRestaurantStatus } from '../chunks/calculate_ChG6-Qjo.mjs';
/* empty css                                */
import { $ as $$TemplateRestaurants } from '../chunks/templateRestaurants_3OU0meZ_.mjs';
import { r as restaurants } from '../chunks/data_DgkmadTx.mjs';
import { A as ADMIN } from '../chunks/db_B47EA56_.mjs';
export { renderers } from '../renderers.mjs';

const $$Astro$1 = createAstro("https://example.com");
const $$Card = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$Card;
  const { restaurant, fix_date = "", fix_time = "" } = Astro2.props;
  moment().format("dddd");
  return renderTemplate`${maybeRenderHead()}<div class="col-md-4 mb-4" data-astro-cid-dohjnao5> ${renderComponent($$result, "HeaderLink", $$HeaderLink, { "href": `/restaurants/${restaurant.id}`, "data-astro-cid-dohjnao5": true }, { "default": ($$result2) => renderTemplate` <div class="card" data-astro-cid-dohjnao5> <div class="image-container" data-astro-cid-dohjnao5> <img${addAttribute(restaurant.image, "src")} class="card-img-top" alt="Labanoon Concert" data-astro-cid-dohjnao5> <div class="image-text" data-astro-cid-dohjnao5> <h5 class="card-title" data-astro-cid-dohjnao5> ${getRestaurantStatus(
    restaurant.day,
    restaurant.time.open,
    restaurant.time.close,
    fix_date,
    fix_time,
    true
  )} </h5> <!-- <p class="card-text">{restaurant.type}</p> --> </div> </div> <div class="card-body" data-astro-cid-dohjnao5> <h5 class="card-title" data-astro-cid-dohjnao5>${restaurant.name}</h5> <p class="card-text" data-astro-cid-dohjnao5>${restaurant.type}</p> <p class="card-text" data-astro-cid-dohjnao5> ${restaurant.time.open} - ${restaurant.time.close} </p> <p class="card-text" data-astro-cid-dohjnao5>${restaurant.day}</p> <!-- <a href="#" class="btn btn-primary">ดูเพิ่มเติม</a> --> </div> </div> ` })} </div> `;
}, "C:/code/Loop-Coding-Assignment/src/components/Card.astro", void 0);

const $$Astro = createAstro("https://example.com");
const $$List = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$List;
  const user = Astro2.locals.user;
  const isAdmin = user?.username === ADMIN;
  console.log("user", user);
  if (!user) {
    return Astro2.redirect("/signin");
  }
  let fix_date = "";
  let fix_time = "";
  if (Astro2.request.method === "POST") {
    try {
      const data = await Astro2.request.formData();
      fix_date = data.get("fix_date");
      fix_time = data.get("fix_time");
      console.log("fix_date", fix_date);
      console.log("fix_time", fix_time);
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message);
      }
    }
  }
  return renderTemplate`${renderComponent($$result, "Layout", $$TemplateRestaurants, {}, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="container mt-5"> <h1>Hi, ${user.username}!</h1> <p>Your user ID is ${user.id}.</p> <form method="post" action="/api/logout"> <button class="btn btn-danger">Sign out</button> </form> ${isAdmin && renderTemplate`<p>ตอนนี้เวลา ${fix_date}</p>`} ${fix_time} <div class="row mt-4"> ${restaurants.map((restaurant) => renderTemplate`${renderComponent($$result2, "Card", $$Card, { "restaurant": restaurant, "fix_date": fix_time, "fix_time": fix_time })}`)} </div> ${isAdmin && renderTemplate`<div class="row details-section"> <div class="col-6 alert alert-light"> <h5 class="text-center">Testing Time Tool</h5> <form id="reservation-form " method="POST"> <div class="mb-3"> <label for="fix_date" class="form-label">Select Day of the Week</label> <select class="form-select" id="fix_date" name="fix_date" required> <option value="" disabled selected>Select a day</option> <option value="monday">Monday</option> <option value="tuesday">Tuesday</option> <option value="wednesday">Wednesday</option> <option value="thursday">Thursday</option> <option value="friday">Friday</option> <option value="saturday">Saturday</option> <option value="sunday">Sunday</option> </select> </div> <div class="mb-3"> <label for="time" class="form-label">กำหนดเวลา</label> <input type="time" class="form-control" id="time" name="fix_time" required> </div> <button type="submit" class="btn btn-primary">Submit</button> </form> </div> </div>`} </div> ` })}`;
}, "C:/code/Loop-Coding-Assignment/src/pages/list.astro", void 0);

const $$file = "C:/code/Loop-Coding-Assignment/src/pages/list.astro";
const $$url = "/list";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$List,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
