import { FiInstagram, FiPlay, FiEye } from 'react-icons/fi';
import useInstagramFeed from '../../hooks/useInstagramFeed.js';
import siteConfig from '../../config/env.js';
import './InstagramFeed.css';

const PLACEHOLDER_COUNT = 8;

// Deterministic-looking "coming soon" view counts so the strip doesn't
// look static/empty before real Instagram data is connected.
const SOON_VIEWS = ['2.1k', '3.4k', '1.8k', '4k', '2.6k', '3.1k', '2k'];

function formatViews(n) {
  if (n == null) return null;
  if (n >= 1000) return `${(n / 1000).toFixed(n % 1000 === 0 ? 0 : 1)}k`;
  return `${n}`;
}

// Shown while a real Instagram Graph API token isn't configured, or if the
// request fails — keeps the section on-brand instead of leaving a gap in
// the page.
function ComingSoonGrid({ handle }) {
  return (
    <div className="reel-track">
      <a
        className="reel-card reel-card--cta"
        href={`https://instagram.com/${handle}`}
        target="_blank"
        rel="noreferrer"
      >
        <FiInstagram className="reel-card__cta-icon" />
        <span className="reel-card__cta-title">Follow along</span>
        <span className="reel-card__cta-handle">@{handle}</span>
      </a>
      {Array.from({ length: PLACEHOLDER_COUNT - 1 }).map((_, i) => (
        <div className={`reel-card reel-card--placeholder reel-card--tone${(i % 4) + 1}`} key={i}>
          <span className="reel-card__views"><FiEye /> {SOON_VIEWS[i % SOON_VIEWS.length]}</span>
          <span className="reel-card__play-badge"><FiPlay /></span>
          <span className="reel-card__caption">Coming soon to Instagram</span>
        </div>
      ))}
    </div>
  );
}

function LoadingGrid() {
  return (
    <div className="reel-track">
      {Array.from({ length: PLACEHOLDER_COUNT }).map((_, i) => (
        <div className="reel-card reel-card--skeleton" key={i} />
      ))}
    </div>
  );
}

export default function InstagramFeed() {
  const { posts, status } = useInstagramFeed(PLACEHOLDER_COUNT);
  const handle = (siteConfig.social.instagram.split('/').filter(Boolean).pop()) || 'demoncustomz';

  return (
    <section className="section section--alt" id="reels">
      <div className="container">
        <div className="section-head" data-reveal>
          <div>
            <span className="section-kicker">From the workshop floor</span>
            <h2>Latest reels on Instagram</h2>
          </div>
          <a
            href={siteConfig.social.instagram}
            target="_blank"
            rel="noreferrer"
            className="btn btn--ghost"
          >
            <FiInstagram /> Follow us
          </a>
        </div>
      </div>

      <div className="reel-scroller">
        {status === 'loading' && <LoadingGrid />}

        {status === 'ready' && posts.length > 0 && (
          <div className="reel-track">
            {posts.map((post) => (
              <a
                key={post.id}
                className="reel-card"
                href={post.permalink}
                target="_blank"
                rel="noreferrer"
              >
                <img
                  src={post.thumbnail_url || post.media_url}
                  alt={post.caption?.slice(0, 80) || 'Instagram reel'}
                  loading="lazy"
                />
                <div className="reel-card__scrim" />
                {formatViews(post.view_count || post.play_count) && (
                  <span className="reel-card__views">
                    <FiEye /> {formatViews(post.view_count || post.play_count)}
                  </span>
                )}
                {post.media_type === 'VIDEO' && (
                  <span className="reel-card__play-badge"><FiPlay /></span>
                )}
                {post.caption && (
                  <span className="reel-card__caption">{post.caption.slice(0, 60)}</span>
                )}
              </a>
            ))}
          </div>
        )}

        {(status === 'idle' || status === 'unconfigured' || status === 'error' || (status === 'ready' && posts.length === 0)) && (
          <ComingSoonGrid handle={handle} />
        )}
      </div>
    </section>
  );
}
