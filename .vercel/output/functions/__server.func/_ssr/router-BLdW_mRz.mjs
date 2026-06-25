import { Q as QueryClient } from "../_libs/tanstack__query-core.mjs";
import { Q as QueryClientProvider } from "../_libs/tanstack__react-query.mjs";
import { c as createRouter, a as createRootRouteWithContext, u as useRouter, L as Link, O as Outlet, H as HeadContent, S as Scripts, b as createFileRoute, l as lazyRouteComponent } from "../_libs/tanstack__react-router.mjs";
import { j as jsxRuntimeExports } from "../_libs/react.mjs";
import "../_libs/tanstack__router-core.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/cookie-es.mjs";
import "../_libs/seroval.mjs";
import "../_libs/seroval-plugins.mjs";
import "node:stream/web";
import "node:stream";
import "../_libs/react-dom.mjs";
import "util";
import "crypto";
import "async_hooks";
import "stream";
import "../_libs/isbot.mjs";
const appCss = "/assets/styles-Cce0zYsd.css";
function NotFoundComponent() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex min-h-screen items-center justify-center bg-background px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-md text-center", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-7xl font-bold text-foreground", children: "404" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mt-4 text-xl font-semibold text-foreground", children: "Page not found" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm text-muted-foreground", children: "The page you're looking for doesn't exist or has been moved." }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      Link,
      {
        to: "/",
        className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
        children: "Go home"
      }
    ) })
  ] }) });
}
function ErrorComponent({ error, reset }) {
  console.error(error);
  const router = useRouter();
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex min-h-screen items-center justify-center bg-background px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-md text-center", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-xl font-semibold tracking-tight text-foreground", children: "This page didn't load" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm text-muted-foreground", children: "Something went wrong on our end. You can try refreshing or head back home." }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 flex flex-wrap justify-center gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          onClick: () => {
            router.invalidate();
            reset();
          },
          className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
          children: "Try again"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "a",
        {
          href: "/",
          className: "inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent",
          children: "Go home"
        }
      )
    ] })
  ] }) });
}
const Route$1 = createRootRouteWithContext()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Lovable App" },
      { name: "description", content: "Lovable Generated Project" },
      { name: "author", content: "Lovable" },
      { property: "og:title", content: "Lovable App" },
      { property: "og:description", content: "Lovable Generated Project" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "twitter:site", content: "@Lovable" }
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss
      }
    ]
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent
});
function RootShell({ children }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("html", { lang: "en", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("head", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(HeadContent, {}) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("body", { children: [
      children,
      /* @__PURE__ */ jsxRuntimeExports.jsx(Scripts, {})
    ] })
  ] });
}
function RootComponent() {
  const { queryClient } = Route$1.useRouteContext();
  return /* @__PURE__ */ jsxRuntimeExports.jsx(QueryClientProvider, { client: queryClient, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Outlet, {}) });
}
const $$splitComponentImporter = () => import("./index-CuzcPYhu.mjs");
const JSONLD = `
{
  "@context":"https://schema.org",
  "@type":"RealEstateAgent",
  "name":"Sabiosita Properties",
  "description":"Nigeria's trusted real estate firm offering sales, rentals, management and consultancy.",
  "url":"https://sabiositaproperties.com",
  "telephone":"+2349032299242",
  "address":{"@type":"PostalAddress","streetAddress":"24 Adeola Odeku Street","addressLocality":"Victoria Island, Lagos","addressRegion":"Lagos","postalCode":"101241","addressCountry":"NG"},
  "geo":{"@type":"GeoCoordinates","latitude":6.4281,"longitude":3.4219},
  "openingHours":"Mo-Fr 08:00-18:00",
  "sameAs":["https://facebook.com/sabiositaproperties","https://instagram.com/sabiositaproperties","https://linkedin.com/company/sabiositaproperties","https://twitter.com/sabiosita"]
}
`;
const Route = createFileRoute("/")({
  component: lazyRouteComponent($$splitComponentImporter, "component"),
  head: () => ({
    meta: [{
      title: "Sabiosita Properties | Buy, Sell & Rent Properties in Lagos, Abuja & Nigeria"
    }, {
      name: "description",
      content: "Nigeria's trusted real estate firm. Browse 500+ verified properties for sale and rent in Lagos, Abuja & Port Harcourt. Expert consultants, seamless transactions."
    }, {
      name: "theme-color",
      content: "#0D0D0D"
    }, {
      property: "og:site_name",
      content: "Sabiosita Properties"
    }, {
      property: "og:type",
      content: "website"
    }, {
      property: "og:title",
      content: "Sabiosita Properties | Buy, Sell & Rent Properties in Nigeria"
    }, {
      property: "og:description",
      content: "Nigeria's #1 real estate consultancy. 500+ verified listings across Lagos, Abuja & Port Harcourt."
    }, {
      property: "og:image",
      content: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&q=80&auto=format"
    }, {
      name: "twitter:card",
      content: "summary_large_image"
    }, {
      name: "twitter:title",
      content: "Sabiosita Properties"
    }, {
      name: "twitter:description",
      content: "Discover your perfect property in Nigeria."
    }, {
      name: "twitter:image",
      content: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&q=80&auto=format"
    }],
    links: [{
      rel: "canonical",
      href: "https://sabiositaproperties.com/"
    }, {
      rel: "preconnect",
      href: "https://fonts.googleapis.com"
    }, {
      rel: "preconnect",
      href: "https://fonts.gstatic.com",
      crossOrigin: ""
    }, {
      rel: "preconnect",
      href: "https://images.unsplash.com"
    }, {
      rel: "stylesheet",
      href: "https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,500;0,700;1,500;1,700&family=Outfit:wght@300;400;500;600;700&display=swap"
    }],
    scripts: [{
      type: "application/ld+json",
      children: JSONLD
    }]
  })
});
const IndexRoute = Route.update({
  id: "/",
  path: "/",
  getParentRoute: () => Route$1
});
const rootRouteChildren = {
  IndexRoute
};
const routeTree = Route$1._addFileChildren(rootRouteChildren)._addFileTypes();
const getRouter = () => {
  const queryClient = new QueryClient();
  const router = createRouter({
    routeTree,
    context: { queryClient },
    scrollRestoration: true,
    defaultPreloadStaleTime: 0
  });
  return router;
};
export {
  getRouter
};
