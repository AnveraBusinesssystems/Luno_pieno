import type { CSSProperties } from "react";

type MediaAsset = {
  type: "image" | "video";
  src: string;
  alt: string;
  poster?: string;
  position?: string;
};

type PlaceholderProps = {
  className?: string;
  number: string;
  title: string;
  note: string;
  dark?: boolean;
  media?: MediaAsset;
};

function CoverMedia({
  media,
  priority = false,
}: {
  media?: MediaAsset;
  priority?: boolean;
}) {
  if (!media?.src) {
    return null;
  }

  const style = {
    "--media-position": media.position ?? "50% 50%",
  } as CSSProperties;

  if (media.type === "video") {
    return (
      <video
        className="media-fill"
        style={style}
        autoPlay
        muted
        loop
        playsInline
        preload={priority ? "auto" : "metadata"}
        poster={media.poster || undefined}
        aria-label={media.alt}
        disablePictureInPicture
      >
        <source src={media.src} />
      </video>
    );
  }

  return (
    <img
      className="media-fill"
      style={style}
      src={media.src}
      alt={media.alt}
      loading={priority ? "eager" : "lazy"}
    />
  );
}

function MediaPlaceholder({
  className = "",
  number,
  title,
  note,
  dark = false,
  media,
}: PlaceholderProps) {
  const hasMedia = Boolean(media?.src);

  return (
    <div
      className={`media-placeholder ${dark ? "media-placeholder--dark" : ""} ${hasMedia ? "media-placeholder--has-media" : ""} ${className}`}
      aria-label={hasMedia ? undefined : `${title}. ${note}`}
    >
      <CoverMedia media={media} />
      {!hasMedia && (
        <>
          <span className="placeholder-number">{number}</span>
          <span className="placeholder-cross" aria-hidden="true" />
          <div className="placeholder-copy">
            <span>{title}</span>
            <small>{note}</small>
          </div>
        </>
      )}
    </div>
  );
}

// Add final media paths here. Every slot crops to its frame, stays centered by
// default, and can use a custom focal point such as "50% 30%".
const mediaSlots = {
  hero: {
    type: "image",
    src: "/media/hero-two-models-yacht.jpg",
    alt: "Two models wearing LUNO PIENO essentials on a yacht at golden hour",
    position: "50% 68%",
  },
  products: [
    { type: "image", src: "", alt: "The Essential Tee", position: "50% 50%" },
    { type: "image", src: "", alt: "The Cotton Polo", position: "50% 50%" },
    { type: "image", src: "", alt: "The Merino Sweater", position: "50% 50%" },
  ],
  craft: {
    type: "video",
    src: "",
    poster: "",
    alt: "LUNO PIENO garment construction and finishing",
    position: "50% 50%",
  },
  editorialMain: {
    type: "image",
    src: "",
    alt: "LUNO PIENO editorial story in an Italian town",
    position: "50% 50%",
  },
  editorialSmall: {
    type: "image",
    src: "",
    alt: "LUNO PIENO evening courtyard story",
    position: "50% 50%",
  },
  communityOne: {
    type: "image",
    src: "",
    alt: "Community member wearing a white LUNO PIENO tee",
    position: "50% 50%",
  },
  communityTwo: {
    type: "image",
    src: "",
    alt: "Community member wearing navy LUNO PIENO merino",
    position: "50% 50%",
  },
} satisfies {
  hero: MediaAsset;
  products: MediaAsset[];
  craft: MediaAsset;
  editorialMain: MediaAsset;
  editorialSmall: MediaAsset;
  communityOne: MediaAsset;
  communityTwo: MediaAsset;
};

const products = [
  { name: "The Essential Tee", detail: "White · Premium cotton", tone: "chalk" },
  { name: "The Cotton Polo", detail: "Sand · Made in Portugal", tone: "sand" },
  { name: "The Merino Sweater", detail: "Forest · Made in Switzerland", tone: "forest" },
];

export default function Home() {
  const heroHasMedia = Boolean(mediaSlots.hero.src);

  return (
    <div className="site-shell">
      <div className="announcement">
        <span>Swiss essentials</span>
        <span>Chapter 02 — Dolce far niente</span>
        <span>CHF / EN</span>
      </div>

      <header className="site-header">
        <nav className="header-nav header-nav--left" aria-label="Primary navigation">
          <a href="#shop">Shop</a>
          <a href="#collection">Collections</a>
          <a href="#craft">Craft</a>
        </nav>

        <a className="wordmark" href="#top" aria-label="Luno Pieno home">
          LUNO PIENO
          <span className="moon-mark" aria-hidden="true" />
        </a>

        <nav className="header-nav header-nav--right" aria-label="Secondary navigation">
          <a href="#world">Our world</a>
          <a href="#about">About</a>
          <button type="button" aria-label="Search">Search</button>
          <button type="button" aria-label="Open shopping bag">Bag (0)</button>
        </nav>
      </header>

      <main id="top">
        <section
          className={`hero ${heroHasMedia ? "hero--has-media" : "hero--dynamic-fallback"}`}
          aria-labelledby="hero-title"
        >
          <CoverMedia media={mediaSlots.hero} priority />
          <div className="hero-art" aria-hidden="true">
            <span className="hero-sun" />
            <span className="hero-horizon" />
            <span className="hero-deck" />
            <span className="hero-figure hero-figure--one" />
            <span className="hero-figure hero-figure--two" />
          </div>

          <div className="hero-media-label">
            <span>Campaign image 01</span>
            <span>Greek yacht · golden hour · editorial crop</span>
          </div>

          <div className="hero-copy">
            <p className="eyebrow eyebrow--light">Luno Pieno · Switzerland</p>
            <h1 id="hero-title">The art of living,<br /><em>considered.</em></h1>
            <p className="hero-intro">
              Quiet essentials shaped by Swiss precision and the ease of the Mediterranean.
            </p>
            <a className="text-link text-link--light" href="#shop">Discover the collection</a>
          </div>

          <div className="hero-index" aria-hidden="true">01 / 05</div>
        </section>

        <section className="manifesto" id="about" aria-labelledby="manifesto-title">
          <p className="eyebrow">Dolce far niente</p>
          <h2 id="manifesto-title">
            Designed for the moments<br />that ask nothing of you.
          </h2>
          <p className="manifesto-copy">
            LUNO PIENO creates unisex wardrobe essentials with a quiet confidence—pieces made to travel,
            gather stories and become more personal with time.
          </p>
          <a className="text-link" href="#world">Enter our world</a>
        </section>

        <section className="collection" id="shop" aria-labelledby="collection-title">
          <div className="section-heading">
            <div>
              <p className="eyebrow">The permanent edit</p>
              <h2 id="collection-title">Essential by design.</h2>
            </div>
            <p>Three foundations.<br />Nothing unnecessary.</p>
            <a className="text-link" href="#collection">View all pieces</a>
          </div>

          <div className="product-grid" id="collection">
            {products.map((product, index) => (
              <article className="product" key={product.name}>
                <div className={`product-visual product-visual--${product.tone}`}>
                  <CoverMedia media={mediaSlots.products[index]} />
                  {!mediaSlots.products[index].src && (
                    <>
                      <span className="product-silhouette" aria-hidden="true" />
                      <div className="product-placeholder-label">
                        <span>Product image 0{index + 1}</span>
                        <small>Front view · transparent or tonal background · 4:5</small>
                      </div>
                    </>
                  )}
                  <button type="button" className="quick-add" aria-label={`Quick add ${product.name}`}>
                    Quick add
                  </button>
                </div>
                <div className="product-meta">
                  <div>
                    <h3>{product.name}</h3>
                    <p>{product.detail}</p>
                  </div>
                  <span>CHF —</span>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="craft" id="craft" aria-labelledby="craft-title">
          <MediaPlaceholder
            className="craft-media"
            number="04"
            title="Craft film / process image"
            note="Hands, merino texture, woven labels · horizontal 3:2"
            dark
            media={mediaSlots.craft}
          />
          <div className="craft-copy">
            <p className="eyebrow eyebrow--light">Two origins. One standard.</p>
            <h2 id="craft-title">Made with intention,<br /><em>close to home.</em></h2>

            <div className="origin-list">
              <article>
                <span>01</span>
                <div>
                  <h3>Made in Switzerland</h3>
                  <p>Merino knitwear developed with precision, patience and an uncompromising attention to touch.</p>
                </div>
              </article>
              <article>
                <span>02</span>
                <div>
                  <h3>Crafted in Portugal</h3>
                  <p>Premium cotton essentials cut and finished by experienced makers in northern Portugal.</p>
                </div>
              </article>
            </div>

            <a className="text-link text-link--light" href="#craft">Explore the making</a>
          </div>
        </section>

        <section className="world" id="world" aria-labelledby="world-title">
          <div className="world-heading">
            <p className="eyebrow">The Luno Pieno world</p>
            <h2 id="world-title">A life, fully lived.</h2>
            <p>Places, people and rituals that shape our point of view.</p>
          </div>

          <div className="editorial-grid">
            <MediaPlaceholder
              className="editorial-main"
              number="05"
              title="Italian town / cycling"
              note="Movement, warm stone, midday light · portrait 4:5"
              media={mediaSlots.editorialMain}
            />
            <div className="editorial-story editorial-story--moon">
              <span className="editorial-moon" aria-hidden="true" />
              <p className="eyebrow eyebrow--light">Field note 01</p>
              <h3>Moon over<br />St. Moritz</h3>
              <span>December 2024</span>
            </div>
            <MediaPlaceholder
              className="editorial-small"
              number="06"
              title="Courtyard / wine"
              note="Candlelight, texture, candid atmosphere · 4:3"
              dark
              media={mediaSlots.editorialSmall}
            />
          </div>
        </section>

        <section className="community" aria-labelledby="community-title">
          <div className="community-copy">
            <p className="eyebrow">Worn by the community</p>
            <h2 id="community-title">One wardrobe.<br />Many lives.</h2>
            <p>
              Unisex pieces styled instinctively—from the Swiss mountains to the Mediterranean coast.
            </p>
            <a className="text-link" href="#community">Meet the community</a>
          </div>
          <MediaPlaceholder
            className="community-media community-media--one"
            number="07"
            title="Community portrait"
            note="Woman in white tee · poolside · portrait 4:5"
            media={mediaSlots.communityOne}
          />
          <MediaPlaceholder
            className="community-media community-media--two"
            number="08"
            title="Community portrait"
            note="Navy merino · rocky coast · portrait 4:5"
            dark
            media={mediaSlots.communityTwo}
          />
        </section>

        <section className="newsletter" aria-labelledby="newsletter-title">
          <span className="newsletter-moon" aria-hidden="true" />
          <p className="eyebrow">Notes from a life fully lived</p>
          <h2 id="newsletter-title">Stories, new chapters and quiet arrivals.</h2>
          <form className="newsletter-form">
            <label className="sr-only" htmlFor="email">Email address</label>
            <input id="email" type="email" placeholder="Email address" />
            <button type="submit">Join the journal</button>
          </form>
        </section>
      </main>

      <footer className="site-footer">
        <div className="footer-brand">
          <div className="wordmark wordmark--footer">LUNO PIENO</div>
          <p>Swiss restraint.<br />Mediterranean spirit.</p>
        </div>
        <div className="footer-links">
          <div>
            <span>Client care</span>
            <a href="#contact">Contact</a>
            <a href="#shipping">Shipping & returns</a>
            <a href="#size">Size guide</a>
            <a href="#care">Care guide</a>
          </div>
          <div>
            <span>About</span>
            <a href="#about">Our story</a>
            <a href="#craft">Craft</a>
            <a href="#world">Journal</a>
            <a href="https://www.instagram.com/luno.pieno/">Instagram</a>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© 2026 LUNO PIENO</span>
          <span>Switzerland</span>
          <span>Privacy · Terms</span>
        </div>
      </footer>
    </div>
  );
}
