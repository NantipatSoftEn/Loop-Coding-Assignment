import 'cookie';
import { bold, red, yellow, dim, blue } from 'kleur/colors';
import { D as DEFAULT_404_COMPONENT } from './astro/server_CuaXarcR.mjs';
import 'clsx';
import { escape } from 'html-escaper';
import { compile } from 'path-to-regexp';

const dateTimeFormat = new Intl.DateTimeFormat([], {
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
  hour12: false
});
const levels = {
  debug: 20,
  info: 30,
  warn: 40,
  error: 50,
  silent: 90
};
function log(opts, level, label, message, newLine = true) {
  const logLevel = opts.level;
  const dest = opts.dest;
  const event = {
    label,
    level,
    message,
    newLine
  };
  if (!isLogLevelEnabled(logLevel, level)) {
    return;
  }
  dest.write(event);
}
function isLogLevelEnabled(configuredLogLevel, level) {
  return levels[configuredLogLevel] <= levels[level];
}
function info(opts, label, message, newLine = true) {
  return log(opts, "info", label, message, newLine);
}
function warn(opts, label, message, newLine = true) {
  return log(opts, "warn", label, message, newLine);
}
function error(opts, label, message, newLine = true) {
  return log(opts, "error", label, message, newLine);
}
function debug(...args) {
  if ("_astroGlobalDebug" in globalThis) {
    globalThis._astroGlobalDebug(...args);
  }
}
function getEventPrefix({ level, label }) {
  const timestamp = `${dateTimeFormat.format(/* @__PURE__ */ new Date())}`;
  const prefix = [];
  if (level === "error" || level === "warn") {
    prefix.push(bold(timestamp));
    prefix.push(`[${level.toUpperCase()}]`);
  } else {
    prefix.push(timestamp);
  }
  if (label) {
    prefix.push(`[${label}]`);
  }
  if (level === "error") {
    return red(prefix.join(" "));
  }
  if (level === "warn") {
    return yellow(prefix.join(" "));
  }
  if (prefix.length === 1) {
    return dim(prefix[0]);
  }
  return dim(prefix[0]) + " " + blue(prefix.splice(1).join(" "));
}
if (typeof process !== "undefined") {
  let proc = process;
  if ("argv" in proc && Array.isArray(proc.argv)) {
    if (proc.argv.includes("--verbose")) ; else if (proc.argv.includes("--silent")) ; else ;
  }
}
class Logger {
  options;
  constructor(options) {
    this.options = options;
  }
  info(label, message, newLine = true) {
    info(this.options, label, message, newLine);
  }
  warn(label, message, newLine = true) {
    warn(this.options, label, message, newLine);
  }
  error(label, message, newLine = true) {
    error(this.options, label, message, newLine);
  }
  debug(label, ...messages) {
    debug(label, ...messages);
  }
  level() {
    return this.options.level;
  }
  forkIntegrationLogger(label) {
    return new AstroIntegrationLogger(this.options, label);
  }
}
class AstroIntegrationLogger {
  options;
  label;
  constructor(logging, label) {
    this.options = logging;
    this.label = label;
  }
  /**
   * Creates a new logger instance with a new label, but the same log options.
   */
  fork(label) {
    return new AstroIntegrationLogger(this.options, label);
  }
  info(message) {
    info(this.options, this.label, message);
  }
  warn(message) {
    warn(this.options, this.label, message);
  }
  error(message) {
    error(this.options, this.label, message);
  }
  debug(message) {
    debug(this.label, message);
  }
}

function template({
  title,
  pathname,
  statusCode = 404,
  tabTitle,
  body
}) {
  return `<!doctype html>
<html lang="en">
	<head>
		<meta charset="UTF-8">
		<title>${tabTitle}</title>
		<style>
			:root {
				--gray-10: hsl(258, 7%, 10%);
				--gray-20: hsl(258, 7%, 20%);
				--gray-30: hsl(258, 7%, 30%);
				--gray-40: hsl(258, 7%, 40%);
				--gray-50: hsl(258, 7%, 50%);
				--gray-60: hsl(258, 7%, 60%);
				--gray-70: hsl(258, 7%, 70%);
				--gray-80: hsl(258, 7%, 80%);
				--gray-90: hsl(258, 7%, 90%);
				--black: #13151A;
				--accent-light: #E0CCFA;
			}

			* {
				box-sizing: border-box;
			}

			html {
				background: var(--black);
				color-scheme: dark;
				accent-color: var(--accent-light);
			}

			body {
				background-color: var(--gray-10);
				color: var(--gray-80);
				font-family: ui-monospace, Menlo, Monaco, "Cascadia Mono", "Segoe UI Mono", "Roboto Mono", "Oxygen Mono", "Ubuntu Monospace", "Source Code Pro", "Fira Mono", "Droid Sans Mono", "Courier New", monospace;
				line-height: 1.5;
				margin: 0;
			}

			a {
				color: var(--accent-light);
			}

			.center {
				display: flex;
				flex-direction: column;
				justify-content: center;
				align-items: center;
				height: 100vh;
				width: 100vw;
			}

			h1 {
				margin-bottom: 8px;
				color: white;
				font-family: system-ui, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
				font-weight: 700;
				margin-top: 1rem;
				margin-bottom: 0;
			}

			.statusCode {
				color: var(--accent-light);
			}

			.astro-icon {
				height: 124px;
				width: 124px;
			}

			pre, code {
				padding: 2px 8px;
				background: rgba(0,0,0, 0.25);
				border: 1px solid rgba(255,255,255, 0.25);
				border-radius: 4px;
				font-size: 1.2em;
				margin-top: 0;
				max-width: 60em;
			}
		</style>
	</head>
	<body>
		<main class="center">
			<svg class="astro-icon" xmlns="http://www.w3.org/2000/svg" width="64" height="80" viewBox="0 0 64 80" fill="none"> <path d="M20.5253 67.6322C16.9291 64.3531 15.8793 57.4632 17.3776 52.4717C19.9755 55.6188 23.575 56.6157 27.3035 57.1784C33.0594 58.0468 38.7122 57.722 44.0592 55.0977C44.6709 54.7972 45.2362 54.3978 45.9045 53.9931C46.4062 55.4451 46.5368 56.9109 46.3616 58.4028C45.9355 62.0362 44.1228 64.8429 41.2397 66.9705C40.0868 67.8215 38.8669 68.5822 37.6762 69.3846C34.0181 71.8508 33.0285 74.7426 34.403 78.9491C34.4357 79.0516 34.4649 79.1541 34.5388 79.4042C32.6711 78.5705 31.3069 77.3565 30.2674 75.7604C29.1694 74.0757 28.6471 72.2121 28.6196 70.1957C28.6059 69.2144 28.6059 68.2244 28.4736 67.257C28.1506 64.8985 27.0406 63.8425 24.9496 63.7817C22.8036 63.7192 21.106 65.0426 20.6559 67.1268C20.6215 67.2865 20.5717 67.4446 20.5218 67.6304L20.5253 67.6322Z" fill="white"/> <path d="M20.5253 67.6322C16.9291 64.3531 15.8793 57.4632 17.3776 52.4717C19.9755 55.6188 23.575 56.6157 27.3035 57.1784C33.0594 58.0468 38.7122 57.722 44.0592 55.0977C44.6709 54.7972 45.2362 54.3978 45.9045 53.9931C46.4062 55.4451 46.5368 56.9109 46.3616 58.4028C45.9355 62.0362 44.1228 64.8429 41.2397 66.9705C40.0868 67.8215 38.8669 68.5822 37.6762 69.3846C34.0181 71.8508 33.0285 74.7426 34.403 78.9491C34.4357 79.0516 34.4649 79.1541 34.5388 79.4042C32.6711 78.5705 31.3069 77.3565 30.2674 75.7604C29.1694 74.0757 28.6471 72.2121 28.6196 70.1957C28.6059 69.2144 28.6059 68.2244 28.4736 67.257C28.1506 64.8985 27.0406 63.8425 24.9496 63.7817C22.8036 63.7192 21.106 65.0426 20.6559 67.1268C20.6215 67.2865 20.5717 67.4446 20.5218 67.6304L20.5253 67.6322Z" fill="url(#paint0_linear_738_686)"/> <path d="M0 51.6401C0 51.6401 10.6488 46.4654 21.3274 46.4654L29.3786 21.6102C29.6801 20.4082 30.5602 19.5913 31.5538 19.5913C32.5474 19.5913 33.4275 20.4082 33.7289 21.6102L41.7802 46.4654C54.4274 46.4654 63.1076 51.6401 63.1076 51.6401C63.1076 51.6401 45.0197 2.48776 44.9843 2.38914C44.4652 0.935933 43.5888 0 42.4073 0H20.7022C19.5206 0 18.6796 0.935933 18.1251 2.38914C18.086 2.4859 0 51.6401 0 51.6401Z" fill="white"/> <defs> <linearGradient id="paint0_linear_738_686" x1="31.554" y1="75.4423" x2="39.7462" y2="48.376" gradientUnits="userSpaceOnUse"> <stop stop-color="#D83333"/> <stop offset="1" stop-color="#F041FF"/> </linearGradient> </defs> </svg>
			<h1>${statusCode ? `<span class="statusCode">${statusCode}: </span> ` : ""}<span class="statusMessage">${title}</span></h1>
			${body || `
				<pre>Path: ${escape(pathname)}</pre>
			`}
			</main>
	</body>
</html>`;
}

const DEFAULT_404_ROUTE = {
  component: DEFAULT_404_COMPONENT,
  generate: () => "",
  params: [],
  pattern: /\/404/,
  prerender: false,
  pathname: "/404",
  segments: [[{ content: "404", dynamic: false, spread: false }]],
  type: "page",
  route: "/404",
  fallbackRoutes: [],
  isIndex: false
};
function ensure404Route(manifest) {
  if (!manifest.routes.some((route) => route.route === "/404")) {
    manifest.routes.push(DEFAULT_404_ROUTE);
  }
  return manifest;
}
async function default404Page({ pathname }) {
  return new Response(
    template({
      statusCode: 404,
      title: "Not found",
      tabTitle: "404: Not Found",
      pathname
    }),
    { status: 404, headers: { "Content-Type": "text/html; charset=utf-8" } }
  );
}
default404Page.isAstroComponentFactory = true;
const default404Instance = {
  default: default404Page
};

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
function getRouteGenerator(segments, addTrailingSlash) {
  const template = segments.map((segment) => {
    return "/" + segment.map((part) => {
      if (part.spread) {
        return `:${part.content.slice(3)}(.*)?`;
      } else if (part.dynamic) {
        return `:${part.content}`;
      } else {
        return part.content.normalize().replace(/\?/g, "%3F").replace(/#/g, "%23").replace(/%5B/g, "[").replace(/%5D/g, "]").replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      }
    }).join("");
  }).join("");
  let trailing = "";
  if (addTrailingSlash === "always" && segments.length) {
    trailing = "/";
  }
  const toPath = compile(template + trailing);
  return (params) => {
    const sanitizedParams = sanitizeParams(params);
    const path = toPath(sanitizedParams);
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
    isIndex: rawRouteData.isIndex
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
  return {
    // in case user middleware exists, this no-op middleware will be reassigned (see plugin-ssr.ts)
    middleware(_, next) {
      return next();
    },
    ...serializedManifest,
    assets,
    componentMetadata,
    inlinedScripts,
    clientDirectives,
    routes,
    serverIslandNameMap
  };
}

const manifest = deserializeManifest({"hrefRoot":"file:///C:/code/Loop-Coding-Assignment/","adapterName":"@astrojs/vercel/serverless","routes":[{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_image","pattern":"^\\/_image$","segments":[[{"content":"_image","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/astro/dist/assets/endpoint/generic.js","pathname":"/_image","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"inline","content":"@import\"https://fonts.googleapis.com/css2?family=Bai+Jamjuree:ital,wght@0,200;0,300;0,400;0,500;0,600;0,700;1,200;1,300;1,400;1,500;1,600;1,700&family=Noto+Sans+Thai+Looped:wght@100;200;300;400;500;600;700;800;900&display=swap\";:root{--accent: #2337ff;--accent-dark: #000d8a;--black: 15, 18, 25;--gray: 96, 115, 159;--gray-light: 229, 233, 240;--gray-dark: 34, 41, 57;--gray-gradient: rgba(var(--gray-light), 50%), #fff;--box-shadow: 0 2px 6px rgba(var(--gray), 25%), 0 8px 24px rgba(var(--gray), 33%), 0 16px 32px rgba(var(--gray), 33%)}@font-face{font-family:Atkinson;src:url(/fonts/atkinson-regular.woff) format(\"woff\");font-weight:400;font-style:normal;font-display:swap}@font-face{font-family:Atkinson;src:url(/fonts/atkinson-bold.woff) format(\"woff\");font-weight:700;font-style:normal;font-display:swap}body{font-family:Noto Sans Thai Looped,Atkinson,sans-serif;margin:0;padding:0;text-align:left;background:linear-gradient(var(--gray-gradient)) no-repeat;background-size:100% 600px;word-wrap:break-word;overflow-wrap:break-word;color:rgb(var(--gray-dark));font-size:20px;line-height:1.7}main{width:720px;max-width:calc(100% - 2em);margin:auto;padding:3em 1em}h1,h2,h3,h4,h5,h6{margin:0 0 .5rem;color:rgb(var(--black));line-height:1.2}h1{font-size:3.052em}h2{font-size:2.441em}h3{font-size:1.953em}h4{font-size:1.563em}h5{font-size:1.25em}strong,b{font-weight:700}a,a:hover{color:var(--accent)}p{margin-bottom:1em}.prose p{margin-bottom:2em}textarea{width:100%;font-size:16px}input{font-size:16px}table{width:100%}img{max-width:100%;height:auto;border-radius:8px}code{padding:2px 5px;background-color:rgb(var(--gray-light));border-radius:2px}pre{padding:1.5em;border-radius:8px}pre>code{all:unset}blockquote{border-left:4px solid var(--accent);padding:0 0 0 20px;margin:0;font-size:1.333em}hr{border:none;border-top:1px solid rgb(var(--gray-light))}@media (max-width: 720px){body{font-size:18px}main{padding:1em}}.sr-only{border:0;padding:0;margin:0;position:absolute!important;height:1px;width:1px;overflow:hidden;clip:rect(1px 1px 1px 1px);clip:rect(1px,1px,1px,1px);clip-path:inset(50%);white-space:nowrap}header[data-astro-cid-3ef6ksr2]{margin:0;padding:0 1em;background:#fff;box-shadow:0 2px 8px rgba(var(--black),5%)}h2[data-astro-cid-3ef6ksr2]{margin:0;font-size:1em}h2[data-astro-cid-3ef6ksr2] a[data-astro-cid-3ef6ksr2],h2[data-astro-cid-3ef6ksr2] a[data-astro-cid-3ef6ksr2].active{text-decoration:none}nav[data-astro-cid-3ef6ksr2]{display:flex;align-items:center;justify-content:space-between}nav[data-astro-cid-3ef6ksr2] a[data-astro-cid-3ef6ksr2]{padding:1em .5em;color:var(--black);border-bottom:4px solid transparent;text-decoration:none}nav[data-astro-cid-3ef6ksr2] a[data-astro-cid-3ef6ksr2].active{text-decoration:none;border-bottom-color:var(--accent)}.social-links[data-astro-cid-3ef6ksr2],.social-links[data-astro-cid-3ef6ksr2] a[data-astro-cid-3ef6ksr2]{display:flex}@media (max-width: 720px){.social-links[data-astro-cid-3ef6ksr2]{display:none}}footer[data-astro-cid-sz7xmlte]{padding:2em 1em 6em;background:linear-gradient(var(--gray-gradient)) no-repeat;color:rgb(var(--gray));text-align:center}.social-links[data-astro-cid-sz7xmlte]{display:flex;justify-content:center;gap:1em;margin-top:1em}.social-links[data-astro-cid-sz7xmlte] a[data-astro-cid-sz7xmlte]{text-decoration:none;color:rgb(var(--gray))}.social-links[data-astro-cid-sz7xmlte] a[data-astro-cid-sz7xmlte]:hover{color:rgb(var(--gray-dark))}\na[data-astro-cid-eimmu3lg]{display:inline-block;text-decoration:none}a[data-astro-cid-eimmu3lg].active{font-weight:bolder;text-decoration:underline}\nmain[data-astro-cid-bvzihdzo]{width:calc(100% - 2em);max-width:100%;margin:0}.hero-image[data-astro-cid-bvzihdzo]{width:100%}.hero-image[data-astro-cid-bvzihdzo] img[data-astro-cid-bvzihdzo]{display:block;margin:0 auto;border-radius:12px;box-shadow:var(--box-shadow)}.prose[data-astro-cid-bvzihdzo]{width:720px;max-width:calc(100% - 2em);margin:auto;padding:1em;color:rgb(var(--gray-dark))}.title[data-astro-cid-bvzihdzo]{margin-bottom:1em;padding:1em 0;text-align:center;line-height:1}.title[data-astro-cid-bvzihdzo] h1[data-astro-cid-bvzihdzo]{margin:0 0 .5em}.date[data-astro-cid-bvzihdzo]{margin-bottom:.5em;color:rgb(var(--gray))}.last-updated-on[data-astro-cid-bvzihdzo]{font-style:italic}\n"}],"routeData":{"route":"/about","isIndex":false,"type":"page","pattern":"^\\/about\\/?$","segments":[[{"content":"about","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/about.astro","pathname":"/about","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/api/addcurrentfake","isIndex":false,"type":"endpoint","pattern":"^\\/api\\/addCurrentFake\\/?$","segments":[[{"content":"api","dynamic":false,"spread":false}],[{"content":"addCurrentFake","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/api/addCurrentFake.ts","pathname":"/api/addCurrentFake","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/api/booking","isIndex":false,"type":"endpoint","pattern":"^\\/api\\/booking\\/?$","segments":[[{"content":"api","dynamic":false,"spread":false}],[{"content":"booking","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/api/booking.ts","pathname":"/api/booking","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/api/calculate","isIndex":false,"type":"endpoint","pattern":"^\\/api\\/calculate\\/?$","segments":[[{"content":"api","dynamic":false,"spread":false}],[{"content":"calculate","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/api/calculate.ts","pathname":"/api/calculate","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/api/daysopen","isIndex":false,"type":"endpoint","pattern":"^\\/api\\/daysOpen\\/?$","segments":[[{"content":"api","dynamic":false,"spread":false}],[{"content":"daysOpen","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/api/daysOpen.ts","pathname":"/api/daysOpen","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/api/getbooking","isIndex":false,"type":"endpoint","pattern":"^\\/api\\/getbooking\\/?$","segments":[[{"content":"api","dynamic":false,"spread":false}],[{"content":"getbooking","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/api/getbooking.ts","pathname":"/api/getbooking","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/api/login","isIndex":false,"type":"endpoint","pattern":"^\\/api\\/login\\/?$","segments":[[{"content":"api","dynamic":false,"spread":false}],[{"content":"login","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/api/login.ts","pathname":"/api/login","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/api/logout","isIndex":false,"type":"endpoint","pattern":"^\\/api\\/logout\\/?$","segments":[[{"content":"api","dynamic":false,"spread":false}],[{"content":"logout","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/api/logout.ts","pathname":"/api/logout","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/api/signup","isIndex":false,"type":"endpoint","pattern":"^\\/api\\/signup\\/?$","segments":[[{"content":"api","dynamic":false,"spread":false}],[{"content":"signup","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/api/signup.ts","pathname":"/api/signup","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/api/time","isIndex":false,"type":"endpoint","pattern":"^\\/api\\/time\\/?$","segments":[[{"content":"api","dynamic":false,"spread":false}],[{"content":"time","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/api/time.ts","pathname":"/api/time","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"inline","content":"@import\"https://fonts.googleapis.com/css2?family=Bai+Jamjuree:ital,wght@0,200;0,300;0,400;0,500;0,600;0,700;1,200;1,300;1,400;1,500;1,600;1,700&family=Noto+Sans+Thai+Looped:wght@100;200;300;400;500;600;700;800;900&display=swap\";:root{--accent: #2337ff;--accent-dark: #000d8a;--black: 15, 18, 25;--gray: 96, 115, 159;--gray-light: 229, 233, 240;--gray-dark: 34, 41, 57;--gray-gradient: rgba(var(--gray-light), 50%), #fff;--box-shadow: 0 2px 6px rgba(var(--gray), 25%), 0 8px 24px rgba(var(--gray), 33%), 0 16px 32px rgba(var(--gray), 33%)}@font-face{font-family:Atkinson;src:url(/fonts/atkinson-regular.woff) format(\"woff\");font-weight:400;font-style:normal;font-display:swap}@font-face{font-family:Atkinson;src:url(/fonts/atkinson-bold.woff) format(\"woff\");font-weight:700;font-style:normal;font-display:swap}body{font-family:Noto Sans Thai Looped,Atkinson,sans-serif;margin:0;padding:0;text-align:left;background:linear-gradient(var(--gray-gradient)) no-repeat;background-size:100% 600px;word-wrap:break-word;overflow-wrap:break-word;color:rgb(var(--gray-dark));font-size:20px;line-height:1.7}main{width:720px;max-width:calc(100% - 2em);margin:auto;padding:3em 1em}h1,h2,h3,h4,h5,h6{margin:0 0 .5rem;color:rgb(var(--black));line-height:1.2}h1{font-size:3.052em}h2{font-size:2.441em}h3{font-size:1.953em}h4{font-size:1.563em}h5{font-size:1.25em}strong,b{font-weight:700}a,a:hover{color:var(--accent)}p{margin-bottom:1em}.prose p{margin-bottom:2em}textarea{width:100%;font-size:16px}input{font-size:16px}table{width:100%}img{max-width:100%;height:auto;border-radius:8px}code{padding:2px 5px;background-color:rgb(var(--gray-light));border-radius:2px}pre{padding:1.5em;border-radius:8px}pre>code{all:unset}blockquote{border-left:4px solid var(--accent);padding:0 0 0 20px;margin:0;font-size:1.333em}hr{border:none;border-top:1px solid rgb(var(--gray-light))}@media (max-width: 720px){body{font-size:18px}main{padding:1em}}.sr-only{border:0;padding:0;margin:0;position:absolute!important;height:1px;width:1px;overflow:hidden;clip:rect(1px 1px 1px 1px);clip:rect(1px,1px,1px,1px);clip-path:inset(50%);white-space:nowrap}header[data-astro-cid-3ef6ksr2]{margin:0;padding:0 1em;background:#fff;box-shadow:0 2px 8px rgba(var(--black),5%)}h2[data-astro-cid-3ef6ksr2]{margin:0;font-size:1em}h2[data-astro-cid-3ef6ksr2] a[data-astro-cid-3ef6ksr2],h2[data-astro-cid-3ef6ksr2] a[data-astro-cid-3ef6ksr2].active{text-decoration:none}nav[data-astro-cid-3ef6ksr2]{display:flex;align-items:center;justify-content:space-between}nav[data-astro-cid-3ef6ksr2] a[data-astro-cid-3ef6ksr2]{padding:1em .5em;color:var(--black);border-bottom:4px solid transparent;text-decoration:none}nav[data-astro-cid-3ef6ksr2] a[data-astro-cid-3ef6ksr2].active{text-decoration:none;border-bottom-color:var(--accent)}.social-links[data-astro-cid-3ef6ksr2],.social-links[data-astro-cid-3ef6ksr2] a[data-astro-cid-3ef6ksr2]{display:flex}@media (max-width: 720px){.social-links[data-astro-cid-3ef6ksr2]{display:none}}footer[data-astro-cid-sz7xmlte]{padding:2em 1em 6em;background:linear-gradient(var(--gray-gradient)) no-repeat;color:rgb(var(--gray));text-align:center}.social-links[data-astro-cid-sz7xmlte]{display:flex;justify-content:center;gap:1em;margin-top:1em}.social-links[data-astro-cid-sz7xmlte] a[data-astro-cid-sz7xmlte]{text-decoration:none;color:rgb(var(--gray))}.social-links[data-astro-cid-sz7xmlte] a[data-astro-cid-sz7xmlte]:hover{color:rgb(var(--gray-dark))}\na[data-astro-cid-eimmu3lg]{display:inline-block;text-decoration:none}a[data-astro-cid-eimmu3lg].active{font-weight:bolder;text-decoration:underline}\nmain[data-astro-cid-ytublttz]{width:calc(100% - 2em);max-width:100%;margin:0}.hero-image[data-astro-cid-ytublttz]{width:100%}.hero-image[data-astro-cid-ytublttz] img[data-astro-cid-ytublttz]{display:block;margin:0 auto;border-radius:12px;box-shadow:var(--box-shadow)}.prose[data-astro-cid-ytublttz]{width:720px;max-width:calc(100% - 2em);margin:auto;padding:1em;color:rgb(var(--gray-dark))}.title[data-astro-cid-ytublttz]{margin-bottom:1em;padding:1em 0;text-align:center;line-height:1}.title[data-astro-cid-ytublttz] h1[data-astro-cid-ytublttz]{margin:0 0 .5em}.date[data-astro-cid-ytublttz]{margin-bottom:.5em;color:rgb(var(--gray))}.last-updated-on[data-astro-cid-ytublttz]{font-style:italic}\n"}],"routeData":{"route":"/dashboard","isIndex":false,"type":"page","pattern":"^\\/dashboard\\/?$","segments":[[{"content":"dashboard","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/dashboard.astro","pathname":"/dashboard","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"type":"inline","value":"document.forms[0].addEventListener(\"submit\",async e=>{e.preventDefault();const t=e.target;await fetch(t.action,{method:t.method,body:new FormData(t)}),window.location.href=\"/signin\"});\n"}],"styles":[{"type":"inline","content":"a[data-astro-cid-eimmu3lg]{display:inline-block;text-decoration:none}a[data-astro-cid-eimmu3lg].active{font-weight:bolder;text-decoration:underline}\n@import\"https://fonts.googleapis.com/css2?family=Bai+Jamjuree:ital,wght@0,200;0,300;0,400;0,500;0,600;0,700;1,200;1,300;1,400;1,500;1,600;1,700&family=Noto+Sans+Thai+Looped:wght@100;200;300;400;500;600;700;800;900&display=swap\";:root{--accent: #2337ff;--accent-dark: #000d8a;--black: 15, 18, 25;--gray: 96, 115, 159;--gray-light: 229, 233, 240;--gray-dark: 34, 41, 57;--gray-gradient: rgba(var(--gray-light), 50%), #fff;--box-shadow: 0 2px 6px rgba(var(--gray), 25%), 0 8px 24px rgba(var(--gray), 33%), 0 16px 32px rgba(var(--gray), 33%)}@font-face{font-family:Atkinson;src:url(/fonts/atkinson-regular.woff) format(\"woff\");font-weight:400;font-style:normal;font-display:swap}@font-face{font-family:Atkinson;src:url(/fonts/atkinson-bold.woff) format(\"woff\");font-weight:700;font-style:normal;font-display:swap}body{font-family:Noto Sans Thai Looped,Atkinson,sans-serif;margin:0;padding:0;text-align:left;background:linear-gradient(var(--gray-gradient)) no-repeat;background-size:100% 600px;word-wrap:break-word;overflow-wrap:break-word;color:rgb(var(--gray-dark));font-size:20px;line-height:1.7}main{width:720px;max-width:calc(100% - 2em);margin:auto;padding:3em 1em}h1,h2,h3,h4,h5,h6{margin:0 0 .5rem;color:rgb(var(--black));line-height:1.2}h1{font-size:3.052em}h2{font-size:2.441em}h3{font-size:1.953em}h4{font-size:1.563em}h5{font-size:1.25em}strong,b{font-weight:700}a,a:hover{color:var(--accent)}p{margin-bottom:1em}.prose p{margin-bottom:2em}textarea{width:100%;font-size:16px}input{font-size:16px}table{width:100%}img{max-width:100%;height:auto;border-radius:8px}code{padding:2px 5px;background-color:rgb(var(--gray-light));border-radius:2px}pre{padding:1.5em;border-radius:8px}pre>code{all:unset}blockquote{border-left:4px solid var(--accent);padding:0 0 0 20px;margin:0;font-size:1.333em}hr{border:none;border-top:1px solid rgb(var(--gray-light))}@media (max-width: 720px){body{font-size:18px}main{padding:1em}}.sr-only{border:0;padding:0;margin:0;position:absolute!important;height:1px;width:1px;overflow:hidden;clip:rect(1px 1px 1px 1px);clip:rect(1px,1px,1px,1px);clip-path:inset(50%);white-space:nowrap}header[data-astro-cid-3ef6ksr2]{margin:0;padding:0 1em;background:#fff;box-shadow:0 2px 8px rgba(var(--black),5%)}h2[data-astro-cid-3ef6ksr2]{margin:0;font-size:1em}h2[data-astro-cid-3ef6ksr2] a[data-astro-cid-3ef6ksr2],h2[data-astro-cid-3ef6ksr2] a[data-astro-cid-3ef6ksr2].active{text-decoration:none}nav[data-astro-cid-3ef6ksr2]{display:flex;align-items:center;justify-content:space-between}nav[data-astro-cid-3ef6ksr2] a[data-astro-cid-3ef6ksr2]{padding:1em .5em;color:var(--black);border-bottom:4px solid transparent;text-decoration:none}nav[data-astro-cid-3ef6ksr2] a[data-astro-cid-3ef6ksr2].active{text-decoration:none;border-bottom-color:var(--accent)}.social-links[data-astro-cid-3ef6ksr2],.social-links[data-astro-cid-3ef6ksr2] a[data-astro-cid-3ef6ksr2]{display:flex}@media (max-width: 720px){.social-links[data-astro-cid-3ef6ksr2]{display:none}}footer[data-astro-cid-sz7xmlte]{padding:2em 1em 6em;background:linear-gradient(var(--gray-gradient)) no-repeat;color:rgb(var(--gray));text-align:center}.social-links[data-astro-cid-sz7xmlte]{display:flex;justify-content:center;gap:1em;margin-top:1em}.social-links[data-astro-cid-sz7xmlte] a[data-astro-cid-sz7xmlte]{text-decoration:none;color:rgb(var(--gray))}.social-links[data-astro-cid-sz7xmlte] a[data-astro-cid-sz7xmlte]:hover{color:rgb(var(--gray-dark))}\n.image-container[data-astro-cid-dohjnao5]{position:relative}.card-img-top[data-astro-cid-dohjnao5]{width:100%;height:auto}.image-text[data-astro-cid-dohjnao5]{position:absolute;bottom:10px;left:10px;color:#fff;background-color:#00000080;padding:5px;border-radius:5px}\nmain[data-astro-cid-ytublttz]{width:calc(100% - 2em);max-width:100%;margin:0}.hero-image[data-astro-cid-ytublttz]{width:100%}.hero-image[data-astro-cid-ytublttz] img[data-astro-cid-ytublttz]{display:block;margin:0 auto;border-radius:12px;box-shadow:var(--box-shadow)}.prose[data-astro-cid-ytublttz]{width:720px;max-width:calc(100% - 2em);margin:auto;padding:1em;color:rgb(var(--gray-dark))}.title[data-astro-cid-ytublttz]{margin-bottom:1em;padding:1em 0;text-align:center;line-height:1}.title[data-astro-cid-ytublttz] h1[data-astro-cid-ytublttz]{margin:0 0 .5em}.date[data-astro-cid-ytublttz]{margin-bottom:.5em;color:rgb(var(--gray))}.last-updated-on[data-astro-cid-ytublttz]{font-style:italic}\n"}],"routeData":{"route":"/list","isIndex":false,"type":"page","pattern":"^\\/list\\/?$","segments":[[{"content":"list","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/list.astro","pathname":"/list","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"type":"inline","value":"document.forms[0].addEventListener(\"submit\",async e=>{e.preventDefault();const t=e.target;await fetch(t.action,{method:t.method,body:new FormData(t)}),window.location.href=\"/dashboard\",alert(\"คุณจองโต๊ะสำเร็จแล้ว\")});\n"}],"styles":[{"type":"inline","content":"@import\"https://fonts.googleapis.com/css2?family=Bai+Jamjuree:ital,wght@0,200;0,300;0,400;0,500;0,600;0,700;1,200;1,300;1,400;1,500;1,600;1,700&family=Noto+Sans+Thai+Looped:wght@100;200;300;400;500;600;700;800;900&display=swap\";:root{--accent: #2337ff;--accent-dark: #000d8a;--black: 15, 18, 25;--gray: 96, 115, 159;--gray-light: 229, 233, 240;--gray-dark: 34, 41, 57;--gray-gradient: rgba(var(--gray-light), 50%), #fff;--box-shadow: 0 2px 6px rgba(var(--gray), 25%), 0 8px 24px rgba(var(--gray), 33%), 0 16px 32px rgba(var(--gray), 33%)}@font-face{font-family:Atkinson;src:url(/fonts/atkinson-regular.woff) format(\"woff\");font-weight:400;font-style:normal;font-display:swap}@font-face{font-family:Atkinson;src:url(/fonts/atkinson-bold.woff) format(\"woff\");font-weight:700;font-style:normal;font-display:swap}body{font-family:Noto Sans Thai Looped,Atkinson,sans-serif;margin:0;padding:0;text-align:left;background:linear-gradient(var(--gray-gradient)) no-repeat;background-size:100% 600px;word-wrap:break-word;overflow-wrap:break-word;color:rgb(var(--gray-dark));font-size:20px;line-height:1.7}main{width:720px;max-width:calc(100% - 2em);margin:auto;padding:3em 1em}h1,h2,h3,h4,h5,h6{margin:0 0 .5rem;color:rgb(var(--black));line-height:1.2}h1{font-size:3.052em}h2{font-size:2.441em}h3{font-size:1.953em}h4{font-size:1.563em}h5{font-size:1.25em}strong,b{font-weight:700}a,a:hover{color:var(--accent)}p{margin-bottom:1em}.prose p{margin-bottom:2em}textarea{width:100%;font-size:16px}input{font-size:16px}table{width:100%}img{max-width:100%;height:auto;border-radius:8px}code{padding:2px 5px;background-color:rgb(var(--gray-light));border-radius:2px}pre{padding:1.5em;border-radius:8px}pre>code{all:unset}blockquote{border-left:4px solid var(--accent);padding:0 0 0 20px;margin:0;font-size:1.333em}hr{border:none;border-top:1px solid rgb(var(--gray-light))}@media (max-width: 720px){body{font-size:18px}main{padding:1em}}.sr-only{border:0;padding:0;margin:0;position:absolute!important;height:1px;width:1px;overflow:hidden;clip:rect(1px 1px 1px 1px);clip:rect(1px,1px,1px,1px);clip-path:inset(50%);white-space:nowrap}header[data-astro-cid-3ef6ksr2]{margin:0;padding:0 1em;background:#fff;box-shadow:0 2px 8px rgba(var(--black),5%)}h2[data-astro-cid-3ef6ksr2]{margin:0;font-size:1em}h2[data-astro-cid-3ef6ksr2] a[data-astro-cid-3ef6ksr2],h2[data-astro-cid-3ef6ksr2] a[data-astro-cid-3ef6ksr2].active{text-decoration:none}nav[data-astro-cid-3ef6ksr2]{display:flex;align-items:center;justify-content:space-between}nav[data-astro-cid-3ef6ksr2] a[data-astro-cid-3ef6ksr2]{padding:1em .5em;color:var(--black);border-bottom:4px solid transparent;text-decoration:none}nav[data-astro-cid-3ef6ksr2] a[data-astro-cid-3ef6ksr2].active{text-decoration:none;border-bottom-color:var(--accent)}.social-links[data-astro-cid-3ef6ksr2],.social-links[data-astro-cid-3ef6ksr2] a[data-astro-cid-3ef6ksr2]{display:flex}@media (max-width: 720px){.social-links[data-astro-cid-3ef6ksr2]{display:none}}footer[data-astro-cid-sz7xmlte]{padding:2em 1em 6em;background:linear-gradient(var(--gray-gradient)) no-repeat;color:rgb(var(--gray));text-align:center}.social-links[data-astro-cid-sz7xmlte]{display:flex;justify-content:center;gap:1em;margin-top:1em}.social-links[data-astro-cid-sz7xmlte] a[data-astro-cid-sz7xmlte]{text-decoration:none;color:rgb(var(--gray))}.social-links[data-astro-cid-sz7xmlte] a[data-astro-cid-sz7xmlte]:hover{color:rgb(var(--gray-dark))}\n.header-image,.map-image{width:100%;height:auto}.details-section{margin-top:20px}.details-section h5{font-weight:700}.contact-info li{list-style:none}.note-section{font-weight:700}.image-container{position:relative;width:100%;max-width:600px}.header-image{width:100%;height:auto}.overlay-message{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);color:#fff;text-align:center;background-color:#00000080;padding:10px;border-radius:5px}\na[data-astro-cid-eimmu3lg]{display:inline-block;text-decoration:none}a[data-astro-cid-eimmu3lg].active{font-weight:bolder;text-decoration:underline}\nmain[data-astro-cid-ytublttz]{width:calc(100% - 2em);max-width:100%;margin:0}.hero-image[data-astro-cid-ytublttz]{width:100%}.hero-image[data-astro-cid-ytublttz] img[data-astro-cid-ytublttz]{display:block;margin:0 auto;border-radius:12px;box-shadow:var(--box-shadow)}.prose[data-astro-cid-ytublttz]{width:720px;max-width:calc(100% - 2em);margin:auto;padding:1em;color:rgb(var(--gray-dark))}.title[data-astro-cid-ytublttz]{margin-bottom:1em;padding:1em 0;text-align:center;line-height:1}.title[data-astro-cid-ytublttz] h1[data-astro-cid-ytublttz]{margin:0 0 .5em}.date[data-astro-cid-ytublttz]{margin-bottom:.5em;color:rgb(var(--gray))}.last-updated-on[data-astro-cid-ytublttz]{font-style:italic}\n"}],"routeData":{"route":"/restaurants/[id]","isIndex":false,"type":"page","pattern":"^\\/restaurants\\/([^/]+?)\\/?$","segments":[[{"content":"restaurants","dynamic":false,"spread":false}],[{"content":"id","dynamic":true,"spread":false}]],"params":["id"],"component":"src/pages/restaurants/[id].astro","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/rss.xml","isIndex":false,"type":"endpoint","pattern":"^\\/rss\\.xml\\/?$","segments":[[{"content":"rss.xml","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/rss.xml.js","pathname":"/rss.xml","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"type":"inline","value":"const o=document.getElementById(\"form-error\");document.forms[0].addEventListener(\"submit\",async t=>{t.preventDefault(),o.innerText=\"\";const e=t.target,n=await fetch(e.action,{method:e.method,body:new FormData(e)});n.ok?window.location.href=\"/list\":o.innerText=(await n.json()).error});\n"}],"styles":[{"type":"inline","content":"@import\"https://fonts.googleapis.com/css2?family=Bai+Jamjuree:ital,wght@0,200;0,300;0,400;0,500;0,600;0,700;1,200;1,300;1,400;1,500;1,600;1,700&family=Noto+Sans+Thai+Looped:wght@100;200;300;400;500;600;700;800;900&display=swap\";:root{--accent: #2337ff;--accent-dark: #000d8a;--black: 15, 18, 25;--gray: 96, 115, 159;--gray-light: 229, 233, 240;--gray-dark: 34, 41, 57;--gray-gradient: rgba(var(--gray-light), 50%), #fff;--box-shadow: 0 2px 6px rgba(var(--gray), 25%), 0 8px 24px rgba(var(--gray), 33%), 0 16px 32px rgba(var(--gray), 33%)}@font-face{font-family:Atkinson;src:url(/fonts/atkinson-regular.woff) format(\"woff\");font-weight:400;font-style:normal;font-display:swap}@font-face{font-family:Atkinson;src:url(/fonts/atkinson-bold.woff) format(\"woff\");font-weight:700;font-style:normal;font-display:swap}body{font-family:Noto Sans Thai Looped,Atkinson,sans-serif;margin:0;padding:0;text-align:left;background:linear-gradient(var(--gray-gradient)) no-repeat;background-size:100% 600px;word-wrap:break-word;overflow-wrap:break-word;color:rgb(var(--gray-dark));font-size:20px;line-height:1.7}main{width:720px;max-width:calc(100% - 2em);margin:auto;padding:3em 1em}h1,h2,h3,h4,h5,h6{margin:0 0 .5rem;color:rgb(var(--black));line-height:1.2}h1{font-size:3.052em}h2{font-size:2.441em}h3{font-size:1.953em}h4{font-size:1.563em}h5{font-size:1.25em}strong,b{font-weight:700}a,a:hover{color:var(--accent)}p{margin-bottom:1em}.prose p{margin-bottom:2em}textarea{width:100%;font-size:16px}input{font-size:16px}table{width:100%}img{max-width:100%;height:auto;border-radius:8px}code{padding:2px 5px;background-color:rgb(var(--gray-light));border-radius:2px}pre{padding:1.5em;border-radius:8px}pre>code{all:unset}blockquote{border-left:4px solid var(--accent);padding:0 0 0 20px;margin:0;font-size:1.333em}hr{border:none;border-top:1px solid rgb(var(--gray-light))}@media (max-width: 720px){body{font-size:18px}main{padding:1em}}.sr-only{border:0;padding:0;margin:0;position:absolute!important;height:1px;width:1px;overflow:hidden;clip:rect(1px 1px 1px 1px);clip:rect(1px,1px,1px,1px);clip-path:inset(50%);white-space:nowrap}header[data-astro-cid-3ef6ksr2]{margin:0;padding:0 1em;background:#fff;box-shadow:0 2px 8px rgba(var(--black),5%)}h2[data-astro-cid-3ef6ksr2]{margin:0;font-size:1em}h2[data-astro-cid-3ef6ksr2] a[data-astro-cid-3ef6ksr2],h2[data-astro-cid-3ef6ksr2] a[data-astro-cid-3ef6ksr2].active{text-decoration:none}nav[data-astro-cid-3ef6ksr2]{display:flex;align-items:center;justify-content:space-between}nav[data-astro-cid-3ef6ksr2] a[data-astro-cid-3ef6ksr2]{padding:1em .5em;color:var(--black);border-bottom:4px solid transparent;text-decoration:none}nav[data-astro-cid-3ef6ksr2] a[data-astro-cid-3ef6ksr2].active{text-decoration:none;border-bottom-color:var(--accent)}.social-links[data-astro-cid-3ef6ksr2],.social-links[data-astro-cid-3ef6ksr2] a[data-astro-cid-3ef6ksr2]{display:flex}@media (max-width: 720px){.social-links[data-astro-cid-3ef6ksr2]{display:none}}footer[data-astro-cid-sz7xmlte]{padding:2em 1em 6em;background:linear-gradient(var(--gray-gradient)) no-repeat;color:rgb(var(--gray));text-align:center}.social-links[data-astro-cid-sz7xmlte]{display:flex;justify-content:center;gap:1em;margin-top:1em}.social-links[data-astro-cid-sz7xmlte] a[data-astro-cid-sz7xmlte]{text-decoration:none;color:rgb(var(--gray))}.social-links[data-astro-cid-sz7xmlte] a[data-astro-cid-sz7xmlte]:hover{color:rgb(var(--gray-dark))}\na[data-astro-cid-eimmu3lg]{display:inline-block;text-decoration:none}a[data-astro-cid-eimmu3lg].active{font-weight:bolder;text-decoration:underline}\nmain[data-astro-cid-ytublttz]{width:calc(100% - 2em);max-width:100%;margin:0}.hero-image[data-astro-cid-ytublttz]{width:100%}.hero-image[data-astro-cid-ytublttz] img[data-astro-cid-ytublttz]{display:block;margin:0 auto;border-radius:12px;box-shadow:var(--box-shadow)}.prose[data-astro-cid-ytublttz]{width:720px;max-width:calc(100% - 2em);margin:auto;padding:1em;color:rgb(var(--gray-dark))}.title[data-astro-cid-ytublttz]{margin-bottom:1em;padding:1em 0;text-align:center;line-height:1}.title[data-astro-cid-ytublttz] h1[data-astro-cid-ytublttz]{margin:0 0 .5em}.date[data-astro-cid-ytublttz]{margin-bottom:.5em;color:rgb(var(--gray))}.last-updated-on[data-astro-cid-ytublttz]{font-style:italic}\n"}],"routeData":{"route":"/signin","isIndex":false,"type":"page","pattern":"^\\/signin\\/?$","segments":[[{"content":"signin","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/signin.astro","pathname":"/signin","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"type":"inline","value":"const o=document.getElementById(\"form-error\");document.forms[0].addEventListener(\"submit\",async t=>{t.preventDefault(),o.innerText=\"\";const e=t.target,n=await fetch(e.action,{method:e.method,body:new FormData(e)});n.ok?window.location.href=\"/signin\":o.innerText=(await n.json()).error});\n"}],"styles":[{"type":"inline","content":"@import\"https://fonts.googleapis.com/css2?family=Bai+Jamjuree:ital,wght@0,200;0,300;0,400;0,500;0,600;0,700;1,200;1,300;1,400;1,500;1,600;1,700&family=Noto+Sans+Thai+Looped:wght@100;200;300;400;500;600;700;800;900&display=swap\";:root{--accent: #2337ff;--accent-dark: #000d8a;--black: 15, 18, 25;--gray: 96, 115, 159;--gray-light: 229, 233, 240;--gray-dark: 34, 41, 57;--gray-gradient: rgba(var(--gray-light), 50%), #fff;--box-shadow: 0 2px 6px rgba(var(--gray), 25%), 0 8px 24px rgba(var(--gray), 33%), 0 16px 32px rgba(var(--gray), 33%)}@font-face{font-family:Atkinson;src:url(/fonts/atkinson-regular.woff) format(\"woff\");font-weight:400;font-style:normal;font-display:swap}@font-face{font-family:Atkinson;src:url(/fonts/atkinson-bold.woff) format(\"woff\");font-weight:700;font-style:normal;font-display:swap}body{font-family:Noto Sans Thai Looped,Atkinson,sans-serif;margin:0;padding:0;text-align:left;background:linear-gradient(var(--gray-gradient)) no-repeat;background-size:100% 600px;word-wrap:break-word;overflow-wrap:break-word;color:rgb(var(--gray-dark));font-size:20px;line-height:1.7}main{width:720px;max-width:calc(100% - 2em);margin:auto;padding:3em 1em}h1,h2,h3,h4,h5,h6{margin:0 0 .5rem;color:rgb(var(--black));line-height:1.2}h1{font-size:3.052em}h2{font-size:2.441em}h3{font-size:1.953em}h4{font-size:1.563em}h5{font-size:1.25em}strong,b{font-weight:700}a,a:hover{color:var(--accent)}p{margin-bottom:1em}.prose p{margin-bottom:2em}textarea{width:100%;font-size:16px}input{font-size:16px}table{width:100%}img{max-width:100%;height:auto;border-radius:8px}code{padding:2px 5px;background-color:rgb(var(--gray-light));border-radius:2px}pre{padding:1.5em;border-radius:8px}pre>code{all:unset}blockquote{border-left:4px solid var(--accent);padding:0 0 0 20px;margin:0;font-size:1.333em}hr{border:none;border-top:1px solid rgb(var(--gray-light))}@media (max-width: 720px){body{font-size:18px}main{padding:1em}}.sr-only{border:0;padding:0;margin:0;position:absolute!important;height:1px;width:1px;overflow:hidden;clip:rect(1px 1px 1px 1px);clip:rect(1px,1px,1px,1px);clip-path:inset(50%);white-space:nowrap}header[data-astro-cid-3ef6ksr2]{margin:0;padding:0 1em;background:#fff;box-shadow:0 2px 8px rgba(var(--black),5%)}h2[data-astro-cid-3ef6ksr2]{margin:0;font-size:1em}h2[data-astro-cid-3ef6ksr2] a[data-astro-cid-3ef6ksr2],h2[data-astro-cid-3ef6ksr2] a[data-astro-cid-3ef6ksr2].active{text-decoration:none}nav[data-astro-cid-3ef6ksr2]{display:flex;align-items:center;justify-content:space-between}nav[data-astro-cid-3ef6ksr2] a[data-astro-cid-3ef6ksr2]{padding:1em .5em;color:var(--black);border-bottom:4px solid transparent;text-decoration:none}nav[data-astro-cid-3ef6ksr2] a[data-astro-cid-3ef6ksr2].active{text-decoration:none;border-bottom-color:var(--accent)}.social-links[data-astro-cid-3ef6ksr2],.social-links[data-astro-cid-3ef6ksr2] a[data-astro-cid-3ef6ksr2]{display:flex}@media (max-width: 720px){.social-links[data-astro-cid-3ef6ksr2]{display:none}}footer[data-astro-cid-sz7xmlte]{padding:2em 1em 6em;background:linear-gradient(var(--gray-gradient)) no-repeat;color:rgb(var(--gray));text-align:center}.social-links[data-astro-cid-sz7xmlte]{display:flex;justify-content:center;gap:1em;margin-top:1em}.social-links[data-astro-cid-sz7xmlte] a[data-astro-cid-sz7xmlte]{text-decoration:none;color:rgb(var(--gray))}.social-links[data-astro-cid-sz7xmlte] a[data-astro-cid-sz7xmlte]:hover{color:rgb(var(--gray-dark))}\na[data-astro-cid-eimmu3lg]{display:inline-block;text-decoration:none}a[data-astro-cid-eimmu3lg].active{font-weight:bolder;text-decoration:underline}\nmain[data-astro-cid-ytublttz]{width:calc(100% - 2em);max-width:100%;margin:0}.hero-image[data-astro-cid-ytublttz]{width:100%}.hero-image[data-astro-cid-ytublttz] img[data-astro-cid-ytublttz]{display:block;margin:0 auto;border-radius:12px;box-shadow:var(--box-shadow)}.prose[data-astro-cid-ytublttz]{width:720px;max-width:calc(100% - 2em);margin:auto;padding:1em;color:rgb(var(--gray-dark))}.title[data-astro-cid-ytublttz]{margin-bottom:1em;padding:1em 0;text-align:center;line-height:1}.title[data-astro-cid-ytublttz] h1[data-astro-cid-ytublttz]{margin:0 0 .5em}.date[data-astro-cid-ytublttz]{margin-bottom:.5em;color:rgb(var(--gray))}.last-updated-on[data-astro-cid-ytublttz]{font-style:italic}\n"}],"routeData":{"route":"/signup","isIndex":false,"type":"page","pattern":"^\\/signup\\/?$","segments":[[{"content":"signup","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/signup.astro","pathname":"/signup","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"inline","content":"@import\"https://fonts.googleapis.com/css2?family=Bai+Jamjuree:ital,wght@0,200;0,300;0,400;0,500;0,600;0,700;1,200;1,300;1,400;1,500;1,600;1,700&family=Noto+Sans+Thai+Looped:wght@100;200;300;400;500;600;700;800;900&display=swap\";:root{--accent: #2337ff;--accent-dark: #000d8a;--black: 15, 18, 25;--gray: 96, 115, 159;--gray-light: 229, 233, 240;--gray-dark: 34, 41, 57;--gray-gradient: rgba(var(--gray-light), 50%), #fff;--box-shadow: 0 2px 6px rgba(var(--gray), 25%), 0 8px 24px rgba(var(--gray), 33%), 0 16px 32px rgba(var(--gray), 33%)}@font-face{font-family:Atkinson;src:url(/fonts/atkinson-regular.woff) format(\"woff\");font-weight:400;font-style:normal;font-display:swap}@font-face{font-family:Atkinson;src:url(/fonts/atkinson-bold.woff) format(\"woff\");font-weight:700;font-style:normal;font-display:swap}body{font-family:Noto Sans Thai Looped,Atkinson,sans-serif;margin:0;padding:0;text-align:left;background:linear-gradient(var(--gray-gradient)) no-repeat;background-size:100% 600px;word-wrap:break-word;overflow-wrap:break-word;color:rgb(var(--gray-dark));font-size:20px;line-height:1.7}main{width:720px;max-width:calc(100% - 2em);margin:auto;padding:3em 1em}h1,h2,h3,h4,h5,h6{margin:0 0 .5rem;color:rgb(var(--black));line-height:1.2}h1{font-size:3.052em}h2{font-size:2.441em}h3{font-size:1.953em}h4{font-size:1.563em}h5{font-size:1.25em}strong,b{font-weight:700}a,a:hover{color:var(--accent)}p{margin-bottom:1em}.prose p{margin-bottom:2em}textarea{width:100%;font-size:16px}input{font-size:16px}table{width:100%}img{max-width:100%;height:auto;border-radius:8px}code{padding:2px 5px;background-color:rgb(var(--gray-light));border-radius:2px}pre{padding:1.5em;border-radius:8px}pre>code{all:unset}blockquote{border-left:4px solid var(--accent);padding:0 0 0 20px;margin:0;font-size:1.333em}hr{border:none;border-top:1px solid rgb(var(--gray-light))}@media (max-width: 720px){body{font-size:18px}main{padding:1em}}.sr-only{border:0;padding:0;margin:0;position:absolute!important;height:1px;width:1px;overflow:hidden;clip:rect(1px 1px 1px 1px);clip:rect(1px,1px,1px,1px);clip-path:inset(50%);white-space:nowrap}header[data-astro-cid-3ef6ksr2]{margin:0;padding:0 1em;background:#fff;box-shadow:0 2px 8px rgba(var(--black),5%)}h2[data-astro-cid-3ef6ksr2]{margin:0;font-size:1em}h2[data-astro-cid-3ef6ksr2] a[data-astro-cid-3ef6ksr2],h2[data-astro-cid-3ef6ksr2] a[data-astro-cid-3ef6ksr2].active{text-decoration:none}nav[data-astro-cid-3ef6ksr2]{display:flex;align-items:center;justify-content:space-between}nav[data-astro-cid-3ef6ksr2] a[data-astro-cid-3ef6ksr2]{padding:1em .5em;color:var(--black);border-bottom:4px solid transparent;text-decoration:none}nav[data-astro-cid-3ef6ksr2] a[data-astro-cid-3ef6ksr2].active{text-decoration:none;border-bottom-color:var(--accent)}.social-links[data-astro-cid-3ef6ksr2],.social-links[data-astro-cid-3ef6ksr2] a[data-astro-cid-3ef6ksr2]{display:flex}@media (max-width: 720px){.social-links[data-astro-cid-3ef6ksr2]{display:none}}footer[data-astro-cid-sz7xmlte]{padding:2em 1em 6em;background:linear-gradient(var(--gray-gradient)) no-repeat;color:rgb(var(--gray));text-align:center}.social-links[data-astro-cid-sz7xmlte]{display:flex;justify-content:center;gap:1em;margin-top:1em}.social-links[data-astro-cid-sz7xmlte] a[data-astro-cid-sz7xmlte]{text-decoration:none;color:rgb(var(--gray))}.social-links[data-astro-cid-sz7xmlte] a[data-astro-cid-sz7xmlte]:hover{color:rgb(var(--gray-dark))}\na[data-astro-cid-eimmu3lg]{display:inline-block;text-decoration:none}a[data-astro-cid-eimmu3lg].active{font-weight:bolder;text-decoration:underline}\n"}],"routeData":{"route":"/","isIndex":true,"type":"page","pattern":"^\\/$","segments":[],"params":[],"component":"src/pages/index.astro","pathname":"/","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}}],"site":"https://example.com","base":"/","trailingSlash":"ignore","compressHTML":true,"componentMetadata":[["C:/code/Loop-Coding-Assignment/src/pages/about.astro",{"propagation":"none","containsHead":true}],["\u0000astro:content",{"propagation":"in-tree","containsHead":false}],["C:/code/Loop-Coding-Assignment/src/pages/rss.xml.js",{"propagation":"in-tree","containsHead":false}],["\u0000@astro-page:src/pages/rss.xml@_@js",{"propagation":"in-tree","containsHead":false}],["\u0000@astrojs-ssr-virtual-entry",{"propagation":"in-tree","containsHead":false}],["C:/code/Loop-Coding-Assignment/src/pages/index.astro",{"propagation":"none","containsHead":true}],["C:/code/Loop-Coding-Assignment/src/pages/dashboard.astro",{"propagation":"none","containsHead":true}],["C:/code/Loop-Coding-Assignment/src/pages/list.astro",{"propagation":"none","containsHead":true}],["C:/code/Loop-Coding-Assignment/src/pages/restaurants/[id].astro",{"propagation":"none","containsHead":true}],["C:/code/Loop-Coding-Assignment/src/pages/signin.astro",{"propagation":"none","containsHead":true}],["C:/code/Loop-Coding-Assignment/src/pages/signup.astro",{"propagation":"none","containsHead":true}]],"renderers":[],"clientDirectives":[["idle","(()=>{var i=t=>{let e=async()=>{await(await t())()};\"requestIdleCallback\"in window?window.requestIdleCallback(e):setTimeout(e,200)};(self.Astro||(self.Astro={})).idle=i;window.dispatchEvent(new Event(\"astro:idle\"));})();"],["load","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).load=e;window.dispatchEvent(new Event(\"astro:load\"));})();"],["media","(()=>{var s=(i,t)=>{let a=async()=>{await(await i())()};if(t.value){let e=matchMedia(t.value);e.matches?a():e.addEventListener(\"change\",a,{once:!0})}};(self.Astro||(self.Astro={})).media=s;window.dispatchEvent(new Event(\"astro:media\"));})();"],["only","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).only=e;window.dispatchEvent(new Event(\"astro:only\"));})();"],["visible","(()=>{var l=(s,i,o)=>{let r=async()=>{await(await s())()},t=typeof i.value==\"object\"?i.value:void 0,c={rootMargin:t==null?void 0:t.rootMargin},n=new IntersectionObserver(e=>{for(let a of e)if(a.isIntersecting){n.disconnect(),r();break}},c);for(let e of o.children)n.observe(e)};(self.Astro||(self.Astro={})).visible=l;window.dispatchEvent(new Event(\"astro:visible\"));})();"]],"entryModules":{"\u0000astro-internal:middleware":"_astro-internal_middleware.mjs","\u0000@astro-page:node_modules/astro/dist/assets/endpoint/generic@_@js":"pages/_image.astro.mjs","\u0000@astro-page:src/pages/about@_@astro":"pages/about.astro.mjs","\u0000@astro-page:src/pages/api/addCurrentFake@_@ts":"pages/api/addcurrentfake.astro.mjs","\u0000@astro-page:src/pages/api/booking@_@ts":"pages/api/booking.astro.mjs","\u0000@astro-page:src/pages/api/calculate@_@ts":"pages/api/calculate.astro.mjs","\u0000@astro-page:src/pages/api/daysOpen@_@ts":"pages/api/daysopen.astro.mjs","\u0000@astro-page:src/pages/api/getbooking@_@ts":"pages/api/getbooking.astro.mjs","\u0000@astro-page:src/pages/api/login@_@ts":"pages/api/login.astro.mjs","\u0000@astro-page:src/pages/api/logout@_@ts":"pages/api/logout.astro.mjs","\u0000@astro-page:src/pages/api/signup@_@ts":"pages/api/signup.astro.mjs","\u0000@astro-page:src/pages/api/time@_@ts":"pages/api/time.astro.mjs","\u0000@astro-page:src/pages/dashboard@_@astro":"pages/dashboard.astro.mjs","\u0000@astro-page:src/pages/list@_@astro":"pages/list.astro.mjs","\u0000@astro-page:src/pages/restaurants/[id]@_@astro":"pages/restaurants/_id_.astro.mjs","\u0000@astro-page:src/pages/rss.xml@_@js":"pages/rss.xml.astro.mjs","\u0000@astro-page:src/pages/signin@_@astro":"pages/signin.astro.mjs","\u0000@astro-page:src/pages/signup@_@astro":"pages/signup.astro.mjs","\u0000@astro-page:src/pages/index@_@astro":"pages/index.astro.mjs","\u0000@astrojs-ssr-virtual-entry":"entry.mjs","\u0000@astro-renderers":"renderers.mjs","C:/code/Loop-Coding-Assignment/node_modules/astro/dist/env/setup.js":"chunks/astro/env-setup_Cr6XTFvb.mjs","C:/code/Loop-Coding-Assignment/src/content/blog/first-post.md?astroContentCollectionEntry=true":"chunks/first-post_CbA_rJHe.mjs","C:/code/Loop-Coding-Assignment/src/content/blog/markdown-style-guide.md?astroContentCollectionEntry=true":"chunks/markdown-style-guide_DQoCHwwN.mjs","C:/code/Loop-Coding-Assignment/src/content/blog/second-post.md?astroContentCollectionEntry=true":"chunks/second-post_DEeM_7HG.mjs","C:/code/Loop-Coding-Assignment/src/content/blog/third-post.md?astroContentCollectionEntry=true":"chunks/third-post_DnHi27PH.mjs","C:/code/Loop-Coding-Assignment/src/content/blog/using-mdx.mdx?astroContentCollectionEntry=true":"chunks/using-mdx_Cl7CrJwR.mjs","C:/code/Loop-Coding-Assignment/src/content/blog/first-post.md?astroPropagatedAssets":"chunks/first-post_DY-_qDIX.mjs","C:/code/Loop-Coding-Assignment/src/content/blog/markdown-style-guide.md?astroPropagatedAssets":"chunks/markdown-style-guide_CwLaonEi.mjs","C:/code/Loop-Coding-Assignment/src/content/blog/second-post.md?astroPropagatedAssets":"chunks/second-post_DMR9OCm0.mjs","C:/code/Loop-Coding-Assignment/src/content/blog/third-post.md?astroPropagatedAssets":"chunks/third-post_WDQhKA6e.mjs","C:/code/Loop-Coding-Assignment/src/content/blog/using-mdx.mdx?astroPropagatedAssets":"chunks/using-mdx_BY2CPCuL.mjs","C:/code/Loop-Coding-Assignment/src/content/blog/first-post.md":"chunks/first-post_Cx_qbpX6.mjs","C:/code/Loop-Coding-Assignment/src/content/blog/markdown-style-guide.md":"chunks/markdown-style-guide_xmgtHoT9.mjs","C:/code/Loop-Coding-Assignment/src/content/blog/second-post.md":"chunks/second-post_CuYU231p.mjs","C:/code/Loop-Coding-Assignment/src/content/blog/third-post.md":"chunks/third-post_DeBgy1TR.mjs","C:/code/Loop-Coding-Assignment/src/content/blog/using-mdx.mdx":"chunks/using-mdx_eMP2OKHk.mjs","\u0000@astrojs-manifest":"manifest_BwIGuBSm.mjs","/astro/hoisted.js?q=0":"_astro/hoisted.Bi1Bj3hO.js","/astro/hoisted.js?q=2":"_astro/hoisted.Cr0B8zCg.js","/astro/hoisted.js?q=3":"_astro/hoisted.C6VkFsgH.js","/astro/hoisted.js?q=1":"_astro/hoisted.EOMzC03_.js","astro:scripts/before-hydration.js":""},"inlinedScripts":[],"assets":["/blog-placeholder-1.jpg","/blog-placeholder-2.jpg","/blog-placeholder-3.jpg","/blog-placeholder-4.jpg","/blog-placeholder-5.jpg","/blog-placeholder-about.jpg","/favicon.svg","/loupe.png","/fonts/atkinson-bold.woff","/fonts/atkinson-regular.woff"],"buildFormat":"directory","checkOrigin":false,"rewritingEnabled":false,"serverIslandNameMap":[],"experimentalEnvGetSecretEnabled":false});

export { AstroIntegrationLogger as A, DEFAULT_404_ROUTE as D, Logger as L, default404Instance as d, ensure404Route as e, getEventPrefix as g, levels as l, manifest as m };
