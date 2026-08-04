import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

async function render() {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request("http://localhost/", {
      headers: { accept: "text/html", host: "localhost" },
    }),
    { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } },
    { waitUntil() {}, passThroughOnException() {} },
  );
}

test("server-renders the alternate LUNO PIENO concept", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /<title>LUNO PIENO — Made for a Life in Motion<\/title>/i);
  assert.match(html, /Made for/);
  assert.match(html, /Three pieces/);
  assert.match(html, /The luxury/);
  assert.match(html, /Postcards from/);
  assert.match(html, /Precision/);
  assert.match(html, /\/og\.png/);
  assert.doesNotMatch(html, /codex-preview|Your site is taking shape|react-loading-skeleton/i);
});

test("the editorial image system is complete and crop-safe", async () => {
  const [page, appCss, pagesHtml, pagesCss] = await Promise.all([
    readFile(new URL("../app/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/globals.css", import.meta.url), "utf8"),
    readFile(new URL("../index.html", import.meta.url), "utf8"),
    readFile(new URL("../github-pages.css", import.meta.url), "utf8"),
  ]);

  for (const css of [appCss, pagesCss]) {
    assert.ok((css.match(/object-fit:\s*cover/g) ?? []).length >= 5);
    assert.match(css, /prefers-reduced-motion:\s*reduce/);
  }

  for (const asset of [
    "hero-two-models-yacht.jpg",
    "product-essential-tees.jpg",
    "product-merino-navy.jpg",
    "product-merino-forest.jpg",
    "craft-sewing-detail.jpg",
    "editorial-riviera-scooter.jpg",
    "editorial-sunset-terrace.jpg",
    "community-white-tee.jpg",
    "community-navy-knit.jpg",
  ]) {
    assert.match(page, new RegExp(asset.replace(".", "\\.")));
    assert.match(pagesHtml, new RegExp(asset.replace(".", "\\.")));
  }
});

test("the alternate concept stays synchronized and responsive", async () => {
  const [appCss, pagesCss, pagesHtml] = await Promise.all([
    readFile(new URL("../app/globals.css", import.meta.url), "utf8"),
    readFile(new URL("../github-pages.css", import.meta.url), "utf8"),
    readFile(new URL("../index.html", import.meta.url), "utf8"),
  ]);

  assert.equal(appCss.replace('@import "tailwindcss";', "").trim(), pagesCss.trim());
  assert.match(pagesHtml, /github-pages\.css\?v=concept-02-travertine/);

  for (const css of [appCss, pagesCss]) {
    assert.match(css, /@media \(max-width: 1050px\)/);
    assert.match(css, /@media \(max-width: 720px\)/);
    assert.match(css, /@media \(max-width: 390px\)/);
    assert.match(css, /\.cover\s*\{[^}]*grid-template-columns:/s);
    assert.match(css, /\.lookbook-grid\s*\{[^}]*grid-template-columns:/s);
    assert.match(css, /\.postcards\s*\{[^}]*grid-template-columns:/s);
    assert.match(css, /@media \(hover: none\), \(pointer: coarse\)/);
  }
});
