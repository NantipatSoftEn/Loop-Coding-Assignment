import { a as createComponent, r as renderTemplate, d as renderComponent, m as maybeRenderHead } from '../chunks/astro/server_CuaXarcR.mjs';
import 'kleur/colors';
import { $ as $$TemplateRestaurants } from '../chunks/templateRestaurants_3OU0meZ_.mjs';
export { renderers } from '../renderers.mjs';

const $$Signup = createComponent(async ($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Layout", $$TemplateRestaurants, {}, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="container"> <div class="row justify-content-center"> <div class="col-lg-5"> <div class="card shadow-lg border-0 rounded-lg mt-5"> <div class="card-header"> <h3 class="text-center font-weight-light my-4">Sign Up</h3> </div> <div class="card-body"> <p id="form-error"></p> <form method="post" action="api/signup"> <div class="form-floating mb-3"> <input class="form-control" id="inputName" type="text" placeholder="Full Name" name="fullname"> <label for="inputName">Full Name</label> </div> <div class="form-floating mb-3"> <input class="form-control" id="inputEmail" type="text" placeholder="" name="username"> <label for="inputUsername">Username</label> </div> <div class="form-floating mb-3"> <input class="form-control" id="inputPassword" type="password" placeholder="Password" name="password"> <label for="inputPassword">Password</label> </div> <div class="form-floating mb-3"> <input class="form-control" id="inputConfirmPassword" type="password" placeholder="Confirm Password" name="confirmpassword"> <label for="inputConfirmPassword">Confirm Password</label> </div> <div class="d-flex align-items-center justify-content-between mt-4 mb-0"> <a class="small" href="/signin">Already have an account? Login</a> <button class="btn btn-primary" type="submit">Sign Up</button> </div> </form> </div> </div> </div> </div> </div> ` })} `;
}, "C:/code/Loop-Coding-Assignment/src/pages/signup.astro", void 0);

const $$file = "C:/code/Loop-Coding-Assignment/src/pages/signup.astro";
const $$url = "/signup";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Signup,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
