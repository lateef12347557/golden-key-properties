// Vercel deployment config.
// The @lovable.dev/vite-tanstack-config preset adds the Cloudflare Vite plugin
// during builds by default, which produces a Worker bundle instead of Vercel's
// Build Output API. We disable it and set the TanStack Start target to "vercel"
// so `vite build` writes to .vercel/output/.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";

export default defineConfig({
  cloudflare: false,
  tanstackStart: {
    target: "vercel",
    server: { entry: "server" },
  },
});
