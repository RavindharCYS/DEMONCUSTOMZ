import { useEffect, useState } from 'react';
import { FiPhoneCall, FiArrowUp } from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';
import siteConfig from '../../config/env.js';
import './FloatingButtons.css';

export default function FloatingButtons() {
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 480);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  const whatsappHref = `https://wa.me/${siteConfig.whatsappNumber.replace('+', '')}?text=${encodeURIComponent(
    siteConfig.whatsappMessage
  )}`;

  return (
    <>
      <div className="floating floating--left">
        <a
          href={whatsappHref}
          target="_blank"
          rel="noreferrer"
          className="floating__btn floating__btn--whatsapp"
          aria-label="Chat on WhatsApp"
        >
          <FaWhatsapp />
          <span className="floating__tooltip">WhatsApp us</span>
        </a>
        <a
          href={`tel:${siteConfig.phoneHref}`}
          className="floating__btn floating__btn--call"
          aria-label="Call us"
        >
          <FiPhoneCall />
          <span className="floating__tooltip">Call {siteConfig.phone}</span>
        </a>
      </div>

      <div className={`floating floating--right ${showTop ? 'floating--visible' : ''}`}>
        <button className="floating__btn floating__btn--top" onClick={scrollTop} aria-label="Back to top">
          <FiArrowUp />
        </button>
      </div>
    </>
  );
}
