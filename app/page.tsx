const constellationProducts = [
  {
    number: "01",
    name: "Essential Tee",
    origin: "Portugal / Cotton",
    image: "/media/product-essential-tees.jpg",
    alt: "White and navy LUNO PIENO essential tees",
    shape: "constellation-product--moon",
  },
  {
    number: "02",
    name: "Merino Crew",
    origin: "Switzerland / Merino",
    image: "/media/product-merino-forest.jpg",
    alt: "Forest green LUNO PIENO merino crewneck",
    shape: "constellation-product--square",
  },
  {
    number: "03",
    name: "LP Cap",
    origin: "Portugal / Wool",
    image: "/media/concept3-cap.jpg",
    alt: "Charcoal LUNO PIENO embroidered cap",
    shape: "constellation-product--orbit",
  },
];

export default function Home() {
  return (
    <div className="orbit-shell" id="top">
      <aside className="time-rail" aria-label="Journey index">
        <a href="#top" aria-label="LUNO PIENO home">LP</a>
        <nav>
          <a href="#day">06</a>
          <a href="#collection">12</a>
          <a href="#craft">18</a>
          <a href="#night">24</a>
        </nav>
        <span>Scroll</span>
      </aside>

      <div className="orbit-page">
        <header className="orbit-header">
          <a className="orbit-wordmark" href="#top">LUNO PIENO <i aria-hidden="true" /></a>
          <nav aria-label="Primary navigation">
            <a href="#collection">Collection</a>
            <a href="#craft">Origins</a>
            <a href="#journal">Journal</a>
          </nav>
          <div><button type="button">Search</button><button type="button">Bag (0)</button></div>
        </header>

        <main>
          <section className="lunar-hero" aria-labelledby="lunar-title">
            <p className="lunar-hero-word lunar-hero-word--top" aria-hidden="true">FULL</p>
            <p className="lunar-hero-word lunar-hero-word--bottom" aria-hidden="true">LIFE.</p>
            <div className="lunar-copy">
              <p className="orbit-kicker">LUNO PIENO / Chapter 03</p>
              <h1 id="lunar-title">A wardrobe<br />for every <em>phase.</em></h1>
              <p>Swiss precision for Mediterranean days—and everything that happens after sunset.</p>
              <a className="orbit-link orbit-link--light" href="#collection">Enter the orbit <span>↗</span></a>
            </div>
            <div className="moon-stage" aria-label="Campaign at sunset">
              <div className="moon-image"><img src="/media/concept3-sunset-yacht.jpg" alt="LUNO PIENO at sunset on a yacht" /></div>
              <span className="phase phase--one" aria-hidden="true" />
              <span className="phase phase--two" aria-hidden="true" />
              <span className="phase phase--three" aria-hidden="true" />
            </div>
            <figure className="floating-card floating-card--tee">
              <img src="/media/product-essential-tees.jpg" alt="LUNO PIENO essential tees" />
              <figcaption>01 / Cotton</figcaption>
            </figure>
            <figure className="floating-card floating-card--cap">
              <img src="/media/concept3-cap.jpg" alt="LUNO PIENO embroidered cap" />
              <figcaption>03 / Wool</figcaption>
            </figure>
            <div className="lunar-meta"><span>46.8182° N</span><span>Swiss made / Mediterranean worn</span><span>2025—∞</span></div>
          </section>

          <div className="orbit-marquee" aria-hidden="true">
            <span>ALPINE MORNINGS</span><i>●</i><span>MEDITERRANEAN MIDNIGHTS</span><i>●</i><span>MADE CLOSE TO HOME</span><i>●</i><span>ALPINE MORNINGS</span>
          </div>

          <section className="daybook" id="day" aria-labelledby="daybook-title">
            <div className="daybook-heading">
              <p className="orbit-time">09:17 / Somewhere south</p>
              <h2 id="daybook-title">The hours<br /><em>we keep.</em></h2>
              <p>Not a collection built for occasions. A wardrobe shaped around the unplanned parts of a good life.</p>
            </div>
            <figure className="daybook-frame daybook-frame--fiat">
              <img src="/media/concept3-vintage-fiat.jpg" alt="LUNO PIENO couple beside a vintage Fiat" loading="lazy" />
              <figcaption>Stop 01 / Italy</figcaption>
            </figure>
            <figure className="daybook-frame daybook-frame--harbor">
              <img src="/media/concept3-italian-harbor.jpg" alt="Italian harbor viewed from the water" loading="lazy" />
              <figcaption>Stop 02 / The harbor</figcaption>
            </figure>
            <figure className="daybook-frame daybook-frame--boat">
              <img src="/media/concept3-couple-boat.jpg" alt="LUNO PIENO knitwear worn on a boat" loading="lazy" />
              <figcaption>Stop 03 / Offshore</figcaption>
            </figure>
            <blockquote>“Dress precisely.<br />Live spontaneously.”</blockquote>
          </section>

          <section className="constellation" id="collection" aria-labelledby="constellation-title">
            <div className="constellation-heading">
              <p className="orbit-time">12:00 / Permanent orbit</p>
              <h2 id="constellation-title">Essential<br /><em>by gravity.</em></h2>
              <p>Three foundations designed to circle through seasons, places and years.</p>
            </div>
            <div className="constellation-grid">
              {constellationProducts.map((product) => (
                <article className={`constellation-product ${product.shape}`} key={product.number}>
                  <div className="constellation-media">
                    <img src={product.image} alt={product.alt} loading="lazy" />
                    <button type="button">Quick add</button>
                  </div>
                  <div className="constellation-meta"><span>{product.number}</span><h3>{product.name}</h3><p>{product.origin}</p><strong>CHF —</strong></div>
                </article>
              ))}
            </div>
            <a className="orbit-link orbit-link--light constellation-link" href="#collection">View permanent collection <span>↗</span></a>
          </section>

          <section className="coordinates" id="craft" aria-labelledby="coordinates-title">
            <div className="coordinates-heading">
              <p className="orbit-time">18:00 / Two origins</p>
              <h2 id="coordinates-title">Coordinates<br />of <em>craft.</em></h2>
            </div>
            <div className="coordinate coordinate--swiss"><span>CH</span><strong>46.8182° N</strong><h3>Swiss knitwear</h3><p>Merino developed with patience, precision and a deep understanding of touch.</p></div>
            <div className="coordinate coordinate--portugal"><span>PT</span><strong>41.1579° N</strong><h3>Portuguese cotton</h3><p>Essential jersey cut, finished and packed by experienced makers in the north.</p></div>
            <figure className="craft-frame craft-frame--packaging"><img src="/media/concept3-packaging.jpg" alt="LUNO PIENO branded packaging" loading="lazy" /><figcaption>Final checks / 01</figcaption></figure>
            <figure className="craft-frame craft-frame--pattern"><img src="/media/concept3-pattern-making.jpg" alt="Digital garment pattern making" loading="lazy" /><figcaption>Pattern study / 02</figcaption></figure>
            <div className="coordinate-line" aria-hidden="true"><span /><i /><span /></div>
          </section>

          <section className="nightfall" id="night" aria-labelledby="nightfall-title">
            <img src="/media/hero-two-models-yacht.jpg" alt="Two LUNO PIENO models at sea" loading="lazy" />
            <div className="nightfall-shade" />
            <p className="orbit-time">24:00 / The day continues</p>
            <h2 id="nightfall-title">Between<br /><em>day & night.</em></h2>
            <div className="nightfall-copy"><p>Clothes that move easily between worlds. Nothing loud. Nothing unnecessary. Just pieces that feel right wherever the evening leads.</p><a className="orbit-link orbit-link--light" href="#journal">Read field note 03 <span>↗</span></a></div>
            <span className="night-moon" aria-hidden="true" />
          </section>

          <section className="orbit-journal" id="journal" aria-labelledby="journal-title">
            <div><p className="orbit-time">Field notes / Ongoing</p><h2 id="journal-title">Proof of<br /><em>a full life.</em></h2></div>
            <article><span>01</span><h3>The art of going nowhere</h3><p>Riviera / 4 min read</p></article>
            <article><span>02</span><h3>What we carry home</h3><p>Switzerland / 6 min read</p></article>
            <article><span>03</span><h3>After the last swim</h3><p>Mediterranean / 3 min read</p></article>
          </section>

          <section className="midnight-letter" aria-labelledby="letter-title">
            <span className="letter-moon" aria-hidden="true" />
            <p className="orbit-kicker">Occasional transmissions</p>
            <h2 id="letter-title">Stay in<br /><em>our orbit.</em></h2>
            <form><label className="sr-only" htmlFor="orbit-email">Email address</label><input id="orbit-email" type="email" placeholder="Email address" /><button type="submit">Join <span>↗</span></button></form>
          </section>
        </main>

        <footer className="orbit-footer">
          <a className="orbit-footer-wordmark" href="#top">LUNO PIENO</a>
          <div><span>Client care</span><a href="#contact">Contact</a><a href="#shipping">Shipping & returns</a><a href="#size">Size guide</a></div>
          <div><span>Follow the orbit</span><a href="#journal">Journal</a><a href="https://www.instagram.com/luno.pieno/">Instagram</a><a href="#craft">Origins</a></div>
          <p>Swiss precision.<br />Mediterranean spirit.</p>
          <small>© 2026 LUNO PIENO / Switzerland / Privacy / Terms</small>
        </footer>
      </div>
    </div>
  );
}
