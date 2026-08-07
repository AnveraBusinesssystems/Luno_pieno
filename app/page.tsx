const products = [
  {
    name: "The Merino Crew",
    detail: "Navy · Made in Switzerland",
    image: "/media/product-merino-navy.jpg",
    alt: "Navy LUNO PIENO merino sweater",
    className: "lookbook-product--lead",
  },
  {
    name: "The Essential Tee",
    detail: "White & navy · Premium cotton",
    image: "/media/product-essential-tees.jpg",
    alt: "White and navy LUNO PIENO essential tees",
    className: "lookbook-product--small",
  },
  {
    name: "The Merino Crew",
    detail: "Forest · Made in Switzerland",
    image: "/media/product-merino-forest.jpg",
    alt: "Forest green LUNO PIENO merino sweater",
    className: "lookbook-product--wide",
  },
];

export default function Home() {
  return (
    <div className="concept-shell" id="top">
      <div className="concept-note">
        <span>LUNO PIENO / Switzerland</span>
        <span>Complimentary Swiss delivery</span>
        <span>CHF / EN</span>
      </div>

      <header className="concept-header">
        <a className="concept-wordmark" href="#top" aria-label="LUNO PIENO home">
          LUNO PIENO<span aria-hidden="true">◐</span>
        </a>
        <nav className="concept-nav" aria-label="Primary navigation">
          <a href="#collection">Collection</a>
          <a href="#craft">Making</a>
          <a href="#journal">Journal</a>
        </nav>
        <div className="concept-tools">
          <button type="button">Search</button>
          <button type="button" aria-label="Open shopping bag">Bag <span>(0)</span></button>
        </div>
      </header>

      <main>
        <section className="cover" aria-labelledby="cover-title">
          <div className="cover-visual">
            <img className="cover-image" src="/media/hero-two-models-yacht.jpg" alt="Two models wearing LUNO PIENO essentials on a yacht" />
            <div className="cover-stamp">
              <span>01</span>
              <span>Mediterranean study</span>
            </div>
          </div>
          <div className="cover-copy">
            <div>
              <p className="concept-kicker">Permanent collection / 2025</p>
              <h1 id="cover-title">Made for<br />a life in <em>motion.</em></h1>
              <p className="cover-intro">Swiss-made essentials with a Mediterranean state of mind. Quietly precise, instinctively easy.</p>
              <div className="cover-actions">
                <a className="concept-button concept-button--dark" href="#collection">Shop the collection</a>
                <a className="concept-button" href="#journal">Explore the journal</a>
              </div>
            </div>
            <div className="cover-footnote">
              <span>Designed in Switzerland</span>
              <span>Made between Switzerland & Portugal</span>
            </div>
          </div>
        </section>

        <div className="principles" aria-label="Brand principles">
          <span>Swiss precision</span><i aria-hidden="true" />
          <span>Portuguese craft</span><i aria-hidden="true" />
          <span>Mediterranean spirit</span><i aria-hidden="true" />
          <span>Unisex by design</span>
        </div>

        <section className="lookbook" id="collection" aria-labelledby="lookbook-title">
          <div className="lookbook-heading">
            <p className="concept-kicker">Chapter I / The permanent edit</p>
            <h2 id="lookbook-title">Selected essentials.<br /><em>Made to go further.</em></h2>
            <p>A considered selection of tactile merino, weighty cotton and refined everyday pieces designed to travel easily.</p>
          </div>
          <div className="lookbook-grid">
            {products.map((product, index) => (
              <article className={`lookbook-product ${product.className}`} key={`${product.name}-${product.detail}`}>
                <div className="lookbook-media">
                  <img src={product.image} alt={product.alt} loading="lazy" />
                  <span className="lookbook-number">0{index + 1}</span>
                  <button type="button">Quick add</button>
                </div>
                <div className="lookbook-meta">
                  <div><h3>{product.name}</h3><p>{product.detail}</p></div>
                  <span>CHF —</span>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="atelier" id="craft" aria-labelledby="atelier-title">
          <div className="atelier-type" aria-hidden="true">L/P</div>
          <div className="atelier-copy">
            <p className="concept-kicker">Chapter II / Made close to home</p>
            <h2 id="atelier-title">The luxury<br />of knowing <em>how.</em></h2>
            <p>Fewer pieces. Better materials. Makers we know. Knitwear is developed in Switzerland; cotton essentials are cut and finished by experienced hands in northern Portugal.</p>
            <a className="concept-button concept-button--light" href="#craft">Discover our making</a>
          </div>
          <figure className="atelier-image">
            <img src="/media/craft-sewing-detail.jpg" alt="Close-up of a LUNO PIENO garment being sewn" loading="lazy" />
            <figcaption><span>Hands at work</span><span>Portugal / 2025</span></figcaption>
          </figure>
        </section>

        <section className="postcards" id="journal" aria-labelledby="postcards-title">
          <div className="postcards-heading">
            <p className="concept-kicker">Chapter III / Field notes</p>
            <h2 id="postcards-title">Postcards from<br /><em>elsewhere.</em></h2>
            <a className="concept-button" href="#journal">View all stories</a>
          </div>
          <article className="postcard postcard--main">
            <img src="/media/editorial-riviera-scooter.jpg" alt="LUNO PIENO on the Riviera beside a scooter" loading="lazy" />
            <div><span>01 / Riviera</span><h3>Days without plans.</h3></div>
          </article>
          <article className="postcard postcard--sunset">
            <img src="/media/editorial-sunset-terrace.jpg" alt="Sunset on the Mediterranean coast" loading="lazy" />
            <div><span>02 / After light</span><h3>The long way home.</h3></div>
          </article>
          <article className="postcard postcard--community">
            <img src="/media/community-white-tee.jpg" alt="Community member wearing the LUNO PIENO essential tee" loading="lazy" />
            <div><span>03 / Worn well</span><h3>One piece, her way.</h3></div>
          </article>
        </section>

        <section className="signature" aria-labelledby="signature-title">
          <div className="signature-image">
            <img src="/media/community-navy-knit.jpg" alt="Woman wearing navy LUNO PIENO knitwear on a boat" loading="lazy" />
          </div>
          <div className="signature-copy">
            <p className="concept-kicker">The LUNO PIENO point of view</p>
            <h2 id="signature-title">Precision,<br /><em>without stiffness.</em></h2>
            <p>Clothes should make room for living. Our pieces move between mountains and coastlines, dinners and departures, becoming more personal with every wear.</p>
            <a className="concept-button concept-button--dark" href="#top">Read our story</a>
          </div>
        </section>

        <section className="concept-newsletter" aria-labelledby="newsletter-title">
          <p className="concept-kicker">Notes from a life fully lived</p>
          <h2 id="newsletter-title">New chapters,<br /><em>occasionally.</em></h2>
          <form className="concept-form">
            <label className="sr-only" htmlFor="concept-email">Email address</label>
            <input id="concept-email" type="email" placeholder="Email address" />
            <button type="submit">Join the journal <span aria-hidden="true">↗</span></button>
          </form>
        </section>
      </main>

      <footer className="concept-footer">
        <div className="concept-footer-top">
          <a className="concept-wordmark concept-wordmark--footer" href="#top">LUNO PIENO<span aria-hidden="true">◐</span></a>
          <p>Swiss restraint.<br />Mediterranean spirit.</p>
        </div>
        <div className="concept-footer-links">
          <div><span>Client care</span><a href="#contact">Contact</a><a href="#shipping">Shipping & returns</a><a href="#size">Size guide</a></div>
          <div><span>Discover</span><a href="#craft">Making</a><a href="#journal">Journal</a><a href="https://www.instagram.com/luno.pieno/">Instagram</a></div>
        </div>
        <div className="concept-footer-bottom"><span>© 2026 LUNO PIENO</span><span>Switzerland</span><span>Privacy / Terms</span></div>
      </footer>
    </div>
  );
}
