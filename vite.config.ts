// Vercel deployment config.
// The @lovable.dev/vite-tanstack-config preset bundles Cloudflare by default
// (componentTagger, env injection, path aliases, etc.). We override the
// TanStack Start target to "vercel" so `vite build` outputs the standard
// Vercel build artifact (.vercel/output) instead of a Worker bundle.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";

export default defineConfig({
  tanstackStart: {
    target: "vercel",
    server: { entry: "server" },
  },
});
