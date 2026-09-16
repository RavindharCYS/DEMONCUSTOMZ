import { useCallback, useEffect, useRef, useState } from 'react';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import siteConfig from '../../config/env.js';
import useFolderImages from '../../hooks/useFolderImages.js';
import './Banner.css';

// Bundled stock fallbacks — used until real photos are found. Drop your
// own images into /public/banner/ named 1.png, 2.png, 3.png (jpg/jpeg/webp
// also work) and they're picked up automatically, in that numeric order —
// any number of them, not just three.
const FALLBACK_IMAGES = [
  'https://images.unsplash.com/photo-1449426468159-d96dbf08f19f?auto=format&fit=crop&w=1600&q=80',
  'https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&w=1600&q=80',
  'https://images.unsplash.com/photo-1591637333184-19aa84b3e01f?auto=format&fit=crop&w=1600&q=80',
];

const AUTOPLAY_MS = 6500;

// Marketing copy only — no image field. If more banner photos are found
// than there are copy blocks, the copy repeats (cycles) to match.
const PROMO_TEXT = [
  {
    kicker: 'Opening Soon',
    title: 'Genuine parts for the bikes you actually ride',
    body: 'KTM, Royal Enfield, Bajaj, TVS and more — fitment-checked spares, styling kits and workshop service, all under one roof.',
    cta: 'Get notified on launch',
  },
  {
    kicker: 'Launch Offer',
    title: 'Early birds ride free on delivery',
    body: 'Pre-register now and your first order ships free, anywhere in Tamil Nadu.',
    cta: 'Reserve my offer',
  },
  {
    kicker: 'Workshop',
    title: 'Book your service slot before we open',
    body: 'Priority workshop scheduling for customers who sign up during our launch window.',
    cta: 'Join the waitlist',
  },
];

export default function Banner() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const progressRef = useRef(null);
  // Increments on every slide change (including repeats of the same
  // index) so the active slide's key changes and its Ken Burns zoom
  // animation restarts from scratch each time it comes back into view,
  // instead of only ever playing once at page load.
  const playCountRef = useRef(0);

  const { images: folderImages, checked } = useFolderImages('/banner', { min: 1, max: 10 });

  const envImages = siteConfig.bannerImages.filter(Boolean);
  const baseImages = envImages.length ? envImages : FALLBACK_IMAGES;
  const images = checked && folderImages.length > 0 ? folderImages : baseImages;
  const PROMOS = images.map((image, i) => ({ ...PROMO_TEXT[i % PROMO_TEXT.length], image }));

  // Keep the active index in range if the slide count changes (e.g. once
  // the /public/banner/ probe finishes and swaps in a different number
  // of real photos than the fallback set).
  useEffect(() => {
    if (index >= PROMOS.length) setIndex(0);
  }, [PROMOS.length, index]);

  const go = useCallback((dir) => {
    setIndex((i) => (i + dir + PROMOS.length) % PROMOS.length);
  }, [PROMOS.length]);

  const goTo = useCallback((i) => {
    setIndex(i);
  }, []);

  // Autoplay — restarts cleanly whenever the slide changes for any reason
  // (auto tick, arrow click, or dot click), so manual navigation doesn't
  // get cut off early by a stale timer.
  useEffect(() => {
    if (paused || PROMOS.length < 2) return undefined;
    const id = setTimeout(() => {
      setIndex((i) => (i + 1) % PROMOS.length);
    }, AUTOPLAY_MS);
    return () => clearTimeout(id);
  }, [paused, index, PROMOS.length]);

  useEffect(() => {
    playCountRef.current += 1;
  }, [index]);

  // Restart the CSS progress-bar animation cleanly whenever the slide or
  // pause state changes, instead of relying on a remounted key (which was
  // causing a visible flash between slides).
  useEffect(() => {
    const el = progressRef.current;
    if (!el) return;
    el.style.animation = 'none';
    // eslint-disable-next-line no-unused-expressions
    el.offsetHeight; // force reflow to restart the animation
    el.style.animation = paused
      ? 'none'
      : `banner-progress ${AUTOPLAY_MS}ms linear forwards`;
  }, [index, paused]);

  return (
    <section
      className="banner"
      aria-label="Promotions"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="banner__media">
        {PROMOS.map((promo, i) => (
          <div
            key={`slide-${i}`}
            className={`banner__slide ${i === index ? 'banner__slide--active' : ''}`}
            aria-hidden={i !== index}
          >
            <img
              key={i === index ? `active-${playCountRef.current}` : 'idle'}
              src={promo.image}
              alt=""
              aria-hidden="true"
              loading={i === 0 ? 'eager' : 'lazy'}
            />
          </div>
        ))}
        <div className="banner__scrim" />
        <div className="banner__grain" aria-hidden="true" />
      </div>

      <div className="banner__stripe" aria-hidden="true" />

      <div className="container banner__inner">
        <div className="banner__content" key={index}>
          <h1 className="banner__title">{PROMOS[index].title}</h1>
          <p className="banner__body">{PROMOS[index].body}</p>
          <a href="#subscribe" className="btn btn--primary">
            {PROMOS[index].cta}
          </a>
        </div>

        <div className="banner__controls">
          <button aria-label="Previous promotion" onClick={() => go(-1)}>
            <FiChevronLeft />
          </button>
          <div className="banner__dots">
            {PROMOS.map((p, i) => (
              <button
                key={`dot-${i}`}
                className={`banner__dot ${i === index ? 'banner__dot--active' : ''}`}
                aria-label={`Go to promotion ${i + 1}`}
                onClick={() => goTo(i)}
              >
                {i === index && <span ref={progressRef} className="banner__dot-progress" />}
              </button>
            ))}
          </div>
          <button aria-label="Next promotion" onClick={() => go(1)}>
            <FiChevronRight />
          </button>
        </div>
      </div>
    </section>
  );
}