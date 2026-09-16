import { useEffect, useState } from 'react';
import { FiPhoneCall, FiMenu, FiX } from 'react-icons/fi';
import siteConfig from '../../config/env.js';
import './Header.css';

const NAV_LINKS = [
  { label: 'Home', href: '#top' },
  { label: 'Brands', href: '#brands' },
  { label: 'Reviews', href: '#reviews' },
  { label: 'Contact', href: '#footer' },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  return (
    <header className={`header ${scrolled ? 'header--scrolled' : ''}`} id="top">
      <div className="header__bg" />

      <div className="container header__inner">
        <a href="#top" className="header__brand">
          <img
            src={siteConfig.logoUrl}
            alt={siteConfig.brandName}
            className="header__logo"
            onError={(e) => { e.currentTarget.style.display = 'none'; }}
          />
          <span className="header__brand-text">
            {siteConfig.brandName}
            <small>{siteConfig.tagline}</small>
          </span>
        </a>

        <div className={`header__overlay ${menuOpen ? 'header__overlay--visible' : ''}`}
          onClick={() => setMenuOpen(false)}
          aria-hidden="true"
        />

        <nav className={`header__nav ${menuOpen ? 'header__nav--open' : ''}`}>
          {NAV_LINKS.map((link) => (
            <a key={link.href} href={link.href} onClick={() => setMenuOpen(false)}>
              {link.label}
            </a>
          ))}
        </nav>

        <div className="header__actions">
          <a href={`tel:${siteConfig.phoneHref}`} className="btn btn--primary header__call">
            <FiPhoneCall /> <span>{siteConfig.phone}</span>
          </a>
          <button
            className="header__burger"
            aria-label="Toggle menu"
            onClick={() => setMenuOpen((v) => !v)}
          >
            {menuOpen ? <FiX /> : <FiMenu />}
          </button>
        </div>
      </div>
    </header>
  );
}