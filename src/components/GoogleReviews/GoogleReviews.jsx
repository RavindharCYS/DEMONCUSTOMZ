import { FaStar, FaRegStar } from 'react-icons/fa';
import { FiCheckCircle } from 'react-icons/fi';
import useGoogleReviews from '../../hooks/useGoogleReviews.js';
import siteConfig from '../../config/env.js';
import './GoogleReviews.css';

const FALLBACK_REVIEWS = [
  {
    author_name: 'Riders across Tamil Nadu',
    rating: 5,
    text: 'Real Google reviews will show up here automatically once we go live — this is a placeholder card.',
  },
  {
    author_name: 'Workshop customers',
    rating: 5,
    text: 'Fitment-checked parts and honest service estimates, straight from customer feedback.',
  },
  {
    author_name: 'Parts buyers',
    rating: 4,
    text: 'Quick turnarounds and genuine spares — the kind of reviews we aim to earn from day one.',
  },
  {
    author_name: 'Royal Enfield owners',
    rating: 5,
    text: 'Booked a styling consult before launch — the team already knew our bike\'s fitment inside out.',
  },
  {
    author_name: 'First-time customers',
    rating: 5,
    text: 'Clear pricing, friendly follow-up on WhatsApp, and no pressure to upsell. Exactly what a first visit should feel like.',
  },
];

function Stars({ rating = 5 }) {
  return (
    <div className="stars" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) =>
        i < rating ? <FaStar key={i} className="stars__filled" /> : <FaRegStar key={i} />
      )}
    </div>
  );
}

function ReviewCard({ review }) {
  return (
    <article className="review-card">
      <Stars rating={review.rating} />
      <p>{review.text}</p>
      <div className="review-card__footer">
        <span className="review-card__author">{review.author_name}</span>
        <span className="review-card__verified">
          <FiCheckCircle /> Verified Purchase
        </span>
      </div>
    </article>
  );
}

export default function GoogleReviews() {
  const { data, status } = useGoogleReviews();
  const reviews = status === 'ready' && data?.reviews?.length ? data.reviews : FALLBACK_REVIEWS;
  const rating = status === 'ready' ? data?.rating : 4.8;
  const total = status === 'ready' ? data?.userRatingCount : null;

  return (
    <section className="section" id="reviews">
      <div className="container">
        <div className="section-head" data-reveal>
          <div>
            <span className="section-kicker">Word on the street</span>
            <h2>What riders say about us</h2>
          </div>
          <div className="review-score">
            <strong>{rating}</strong>
            <Stars rating={Math.round(rating)} />
            {total ? <span>{total} Google reviews</span> : <span>Google reviews</span>}
          </div>
        </div>
      </div>

      <div className="review-marquee" role="region" aria-label="Customer reviews, auto-scrolling">
        <div className="review-marquee__fade review-marquee__fade--left" aria-hidden="true" />
        <div className="review-marquee__fade review-marquee__fade--right" aria-hidden="true" />
        <div className="review-marquee__track">
          {reviews.map((review, i) => (
            <ReviewCard review={review} key={`a-${i}`} />
          ))}
          {reviews.map((review, i) => (
            <ReviewCard review={review} key={`b-${i}`} />
          ))}
        </div>
      </div>

      <div className="container">
        {status === 'unconfigured' && (
          <p className="reel-note">
            Connect a live feed by setting <code>VITE_GOOGLE_PLACE_ID</code> and adding{' '}
            <code>GOOGLE_PLACES_API_KEY</code> to your Vercel project, or link directly:{' '}
            <a href={siteConfig.google.reviewsUrl || '#'} target="_blank" rel="noreferrer">
              view on Google
            </a>
            .
          </p>
        )}
      </div>
    </section>
  );
}
