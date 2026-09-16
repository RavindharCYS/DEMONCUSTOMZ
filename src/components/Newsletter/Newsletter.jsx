import { useState } from 'react';
import { FiSend, FiCheckCircle, FiAlertCircle, FiBell, FiZap, FiGift, FiTool } from 'react-icons/fi';
import './Newsletter.css';

const PERKS = [
  { icon: <FiZap />, label: 'Launch-day pricing' },
  { icon: <FiTool />, label: 'Priority workshop slots' },
  { icon: <FiGift />, label: 'Free first delivery' },
];

export default function Newsletter() {
  const [email, setEmail] = useState('');
  const [state, setState] = useState('idle'); // idle | loading | success | error
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email.trim()) return;

    setState('loading');
    setMessage('');

    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      const data = await res.json().catch(() => ({}));

      if (!res.ok) throw new Error(data.error || 'Something went wrong');

      setState('success');
      setMessage('You are on the list — we will email you at launch.');
      setEmail('');
    } catch (err) {
      setState('error');
      setMessage(err.message || 'Could not subscribe right now. Please try again.');
    }
  };

  return (
    <section className="section section--alt" id="subscribe">
      <div className="container">
        <div className="newsletter" data-reveal>
          <div className="newsletter__pattern" aria-hidden="true" />

          <div className="newsletter__copy">
            <span className="newsletter__icon"><FiBell /></span>
            <span className="section-kicker">Get notified</span>
            <h2>Be the first to know when we launch</h2>
            <p>No spam — just launch news, opening offers and workshop slot openings.</p>

            <ul className="newsletter__perks">
              {PERKS.map((perk) => (
                <li key={perk.label}>
                  <span className="newsletter__perk-icon">{perk.icon}</span>
                  {perk.label}
                </li>
              ))}
            </ul>
          </div>

          <div className="newsletter__panel">
            <form className="newsletter__form" onSubmit={handleSubmit}>
              <label htmlFor="newsletter-email" className="newsletter__label">
                Email address
              </label>
              <div className="newsletter__field">
                <input
                  id="newsletter-email"
                  type="email"
                  required
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={state === 'loading'}
                />
                <button type="submit" className="btn btn--primary" disabled={state === 'loading'}>
                  {state === 'loading' ? 'Sending…' : (<><FiSend /> Notify me</>)}
                </button>
              </div>

              {message && (
                <p className={`newsletter__message newsletter__message--${state}`}>
                  {state === 'success' ? <FiCheckCircle /> : <FiAlertCircle />} {message}
                </p>
              )}

              <span className="newsletter__fineprint">
                By subscribing you agree to receive occasional launch emails. Unsubscribe anytime.
              </span>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
