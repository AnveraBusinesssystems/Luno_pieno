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
    {
      ASSETS: {
        fetch: async () => new Response("Not found", { status: 404 }),
      },
    },
    {
      waitUntil() {},
      passThroughOnException() {},
    },
  );
}

test("server-renders the LUNO PIENO homepage", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /<title>LUNO PIENO — Swiss Essentials<\/title>/i);
  assert.match(html, /The art of living/);
  assert.match(html, /Essential by design/);
  assert.match(html, /Made in Switzerland/);
  assert.match(html, /Crafted in Portugal/);
  assert.match(html, /Greek yacht/);
  assert.match(html, /Worn by the community/);
  assert.match(html, /\/og\.png/);
  assert.doesNotMatch(html, /codex-preview|Your site is taking shape|react-loading-skeleton/i);
});

test("media slots use centered, crop-safe image and video framing", async () => {
  const [page, appCss, pagesHtml, pagesCss] = await Promise.all([
    readFile(new URL("../app/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/globals.css", import.meta.url), "utf8"),
    readFile(new URL("../index.html", import.meta.url), "utf8"),
    readFile(new URL("../github-pages.css", import.meta.url), "utf8"),
  ]);

  for (const css of [appCss, pagesCss]) {
    assert.match(css, /\.media-fill\s*\{[^}]*object-fit:\s*cover;/s);
    assert.match(css, /object-position:\s*var\(--media-position,\s*50% 50%\)/);
    assert.match(css, /\.hero--dynamic-fallback \.hero-sun/);
    assert.match(css, /prefers-reduced-motion:\s*reduce/);
  }

  assert.match(page, /<video[\s\S]*autoPlay[\s\S]*muted[\s\S]*loop[\s\S]*playsInline/);
  assert.match(page, /position:\s*"50% 50%"/);
  assert.match(pagesHtml, /data-media-slot="hero" data-media-type="image"/);
  assert.match(pagesHtml, /hero--has-media/);
  assert.match(pagesHtml, /class="media-fill"[^>]*hero-two-models-yacht\.jpg/);
  assert.equal((pagesHtml.match(/class="media-fill"/g) ?? []).length, 9);

  for (const asset of [
    "product-essential-tees.jpg",
    "product-merino-navy.jpg",
    "product-merino-forest.jpg",
    "craft-sewing-detail.jpg",
    "editorial-riviera-scooter.jpg",
    "editorial-sunset-terrace.jpg",
    "community-white-tee.jpg",
    "community-navy-knit.jpg",
  ]) {
    assert.match(pagesHtml, new RegExp(asset.replace(".", "\\.")));
  }
});
