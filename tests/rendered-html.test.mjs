import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

async function render() {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);
  return worker.fetch(
    new Request("http://localhost/", { headers: { accept: "text/html", host: "localhost" } }),
    { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } },
    { waitUntil() {}, passThroughOnException() {} },
  );
}

test("server-renders the lunar LUNO PIENO concept", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);
  const html = await response.text();
  assert.match(html, /<title>LUNO PIENO — A Wardrobe for Every Phase<\/title>/i);
  assert.match(html, /A wardrobe/);
  assert.match(html, /The hours/);
  assert.match(html, /Essential/);
  assert.match(html, /Coordinates/);
  assert.match(html, /Between/);
  assert.match(html, /Stay in/);
  assert.match(html, /\/og\.png/);
  assert.doesNotMatch(html, /codex-preview|Your site is taking shape|react-loading-skeleton/i);
});

test("campaign and product imagery is complete and crop-safe", async () => {
  const [page, appCss, pagesHtml, pagesCss] = await Promise.all([
    readFile(new URL("../app/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/globals.css", import.meta.url), "utf8"),
    readFile(new URL("../index.html", import.meta.url), "utf8"),
    readFile(new URL("../github-pages.css", import.meta.url), "utf8"),
  ]);
  for (const css of [appCss, pagesCss]) {
    assert.ok((css.match(/object-fit:\s*cover/g) ?? []).length >= 5);
    assert.match(css, /\.opening-main img,[\s\S]*?\.opening-sunset img\s*\{[^}]*object-fit:\s*cover/);
    assert.match(css, /prefers-reduced-motion:\s*reduce/);
  }
  for (const asset of [
    "concept3-sunset-yacht.jpg",
    "concept3-vintage-fiat.jpg",
    "concept3-italian-harbor.jpg",
    "concept3-couple-boat.jpg",
    "concept3-packaging.jpg",
    "concept3-pattern-making.jpg",
    "concept3-cap.jpg",
    "product-essential-tees.jpg",
    "product-merino-forest.jpg",
    "hero-two-models-yacht.jpg",
  ]) {
    assert.match(page, new RegExp(asset.replace(".", "\\.")));
    assert.match(pagesHtml, new RegExp(asset.replace(".", "\\.")));
  }
});

test("lunar concept stays synchronized and responsive", async () => {
  const [appCss, pagesCss, pagesHtml] = await Promise.all([
    readFile(new URL("../app/globals.css", import.meta.url), "utf8"),
    readFile(new URL("../github-pages.css", import.meta.url), "utf8"),
    readFile(new URL("../index.html", import.meta.url), "utf8"),
  ]);
  assert.equal(appCss.replace('@import "tailwindcss";', "").trim(), pagesCss.trim());
  assert.match(pagesHtml, /github-pages\.css\?v=concept-03/);
  for (const css of [appCss, pagesCss]) {
    assert.match(css, /@media \(max-width: 1050px\)/);
    assert.match(css, /@media \(max-width: 720px\)/);
    assert.match(css, /@media \(max-width: 390px\)/);
    assert.match(css, /\.opening-hero\s*\{/);
    assert.match(css, /\.constellation-grid\s*\{/);
    assert.match(css, /\.coordinates\s*\{/);
    assert.match(css, /@media \(hover: none\), \(pointer: coarse\)/);
  }
});
