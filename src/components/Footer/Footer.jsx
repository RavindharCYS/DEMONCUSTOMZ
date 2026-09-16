import { FiInstagram, FiFacebook, FiYoutube, FiTwitter, FiMapPin, FiMail, FiPhone } from 'react-icons/fi';
import siteConfig from '../../config/env.js';
import './Footer.css';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer" id="footer">
      <div className="container footer__grid">
        <div className="footer__brand" data-reveal>
          <img
            src={siteConfig.logoUrl}
            alt={siteConfig.brandName}
            className="footer__logo"
            onError={(e) => { e.currentTarget.style.display = 'none'; }}
          />
          <h3>{siteConfig.brandName}</h3>
          <p>{siteConfig.tagline}</p>
        </div>

        <div className="footer__col" data-reveal data-reveal-delay="1">
          <h4>Quick links</h4>
          <a href="#brands">Brands</a>
          <a href="#reels">Reels</a>
          <a href="#reviews">Reviews</a>
          <a href="#subscribe">Get notified</a>
        </div>

        <div className="footer__col" data-reveal data-reveal-delay="2">
          <h4>Contact</h4>
          <a href={`tel:${siteConfig.phoneHref}`}><span className="footer__icon"><FiPhone /></span> {siteConfig.phone}</a>
          <a href={`mailto:${siteConfig.email}`}><span className="footer__icon"><FiMail /></span> {siteConfig.email}</a>
          <span className="footer__address"><span className="footer__icon"><FiMapPin /></span> {siteConfig.address}</span>
        </div>

        <div className="footer__col" data-reveal data-reveal-delay="3">
          <h4>Follow us</h4>
          <div className="footer__socials">
            <a href={siteConfig.social.instagram} target="_blank" rel="noreferrer" aria-label="Instagram"><FiInstagram /></a>
            <a href={siteConfig.social.facebook} target="_blank" rel="noreferrer" aria-label="Facebook"><FiFacebook /></a>
            <a href={siteConfig.social.youtube} target="_blank" rel="noreferrer" aria-label="YouTube"><FiYoutube /></a>
            <a href={siteConfig.social.twitter} target="_blank" rel="noreferrer" aria-label="Twitter"><FiTwitter /></a>
          </div>
        </div>
      </div>

      <div className="footer__bottom">
        <div className="container footer__bottom-inner">
          <span>© {year} {siteConfig.brandName}. All rights reserved.</span>
          <nav className="footer__legal">
            <a href="#top">Terms &amp; Conditions</a>
            <a href="#top">Privacy Policy</a>
            <a href="#top">Shipping Policy</a>
          </nav>
        </div>
      </div>
    </footer>
  );
}