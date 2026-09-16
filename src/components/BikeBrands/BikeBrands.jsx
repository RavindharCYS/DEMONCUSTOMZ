import bikeBrands from '../../data/bikeBrands.js';
import './BikeBrands.css';

export default function BikeBrands() {
  return (
    <section className="section" id="brands">
      <div className="container">
        <div className="section-head" data-reveal>
          <div>
            <span className="section-kicker">Brands we work with</span>
            <h2>Every major bike brand on Indian roads</h2>
          </div>
          <p style={{ maxWidth: 420 }}>
            Parts, styling and workshop support for the brands riders across Tamil Nadu trust most.
          </p>
        </div>

        <div className="brand-grid">
          {bikeBrands.map((brand, i) => (
            <article
              className="brand-card"
              key={brand.name}
              data-reveal
              data-reveal-delay={(i % 6) + 1}
              style={{ '--brand-accent': brand.accent }}
            >
              <div className="brand-card__image-wrap">
                {brand.logo ? (
                  <img
                    src={brand.logo}
                    alt={brand.name}
                    loading="lazy"
                    onError={(e) => {
                      if (brand.fallback && e.currentTarget.src !== window.location.origin + brand.fallback) {
                        e.currentTarget.onerror = null;
                        e.currentTarget.src = brand.fallback;
                      }
                    }}
                  />
                ) : (
                  <span className="brand-card__badge">{brand.initials}</span>
                )}
              </div>
              <h3 className="brand-card__name">{brand.name}</h3>
              <span className="brand-card__origin">{brand.origin}</span>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
