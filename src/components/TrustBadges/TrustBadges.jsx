import { FiBox, FiAward, FiLock, FiHeadphones } from 'react-icons/fi';
import './TrustBadges.css';

const BADGES = [
  {
    icon: <FiBox />,
    title: 'Pan India Shipping',
    body: 'Pan India Shipping with our best delivery channel partners',
  },
  {
    icon: <FiAward />,
    title: 'High Quality',
    body: 'Continuous attention to the smallest details to deliver the great product',
  },
  {
    icon: <FiLock />,
    title: 'Secure Payments',
    body: 'Pay With Most Secure and Famous Payment methods.',
  },
  {
    icon: <FiHeadphones />,
    title: 'Top-Notch Support',
    body: 'Non Stop 12/7 Customer Support.',
  },
];

export default function TrustBadges() {
  return (
    <section className="trust-strip" aria-label="Why shop with us">
      <div className="container trust-strip__grid">
        {BADGES.map((badge, i) => (
          <div className="trust-badge" key={badge.title} data-reveal data-reveal-delay={(i % 6) + 1}>
            <span className="trust-badge__icon">{badge.icon}</span>
            <div className="trust-badge__body">
              <h3>{badge.title}</h3>
              <p>{badge.body}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}