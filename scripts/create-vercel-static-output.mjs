import { access, cp, mkdir, readdir, rm, writeFile } from "node:fs/promises";
import path from "node:path";
import { pathToFileURL } from "node:url";

const root = process.cwd();
const vercelOutput = path.join(root, ".vercel", "output");
const staticDir = path.join(vercelOutput, "static");
const serverEntry = path.join(vercelOutput, "functions", "__server.func", "index.mjs");
const outputDir = path.join(root, "output");
const deploymentOrigin = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "https://sabiosita-properties324.vercel.app";

async function exists(filePath) {
  try {
    await access(filePath);
    return true;
  } catch {
    return false;
  }
}

async function renderHomePage() {
  const moduleUrl = pathToFileURL(serverEntry).href;
  const serverModule = await import(moduleUrl);
  const handler = serverModule.default ?? serverModule;
  const response = await handler.fetch(new Request(`${deploymentOrigin}/`), {
    waitUntil: () => undefined,
  });

  if (!response.ok) {
    throw new Error(`Unable to prerender home page: ${response.status}`);
  }

  return response.text();
}

async function fallbackHtml() {
  const assetsDir = path.join(outputDir, "assets");
  const assets = (await exists(assetsDir)) ? await readdir(assetsDir) : [];
  const css = assets.find((asset) => asset.startsWith("styles-") && asset.endsWith(".css"));
  const js = assets.find((asset) => asset.startsWith("index-") && asset.endsWith(".js"));

  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Sabiosita Properties</title>
    <meta name="description" content="Find verified homes, land, rentals, and investment properties with Sabiosita Properties." />
    ${css ? `<link rel="stylesheet" href="/assets/${css}" />` : ""}
  </head>
  <body>
    <div id="root"></div>
    ${js ? `<script type="module" src="/assets/${js}"></script>` : ""}
  </body>
</html>`;
}

await rm(outputDir, { recursive: true, force: true });
await mkdir(outputDir, { recursive: true });

if (!(await exists(staticDir))) {
  throw new Error("Expected Vercel static assets at .vercel/output/static after build.");
}

await cp(staticDir, outputDir, { recursive: true });

let html;
try {
  html = await renderHomePage();
} catch (error) {
  console.warn(error);
  html = await fallbackHtml();
}

await writeFile(path.join(outputDir, "index.html"), html);
await writeFile(path.join(outputDir, "404.html"), html);

console.log("Prepared Vercel static output in ./output");