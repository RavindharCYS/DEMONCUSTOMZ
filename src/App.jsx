import Header from './components/Header/Header.jsx';
import Banner from './components/Banner/Banner.jsx';
import TrustBadges from './components/TrustBadges/TrustBadges.jsx';
import BikeBrands from './components/BikeBrands/BikeBrands.jsx';
import InstagramFeed from './components/InstagramFeed/InstagramFeed.jsx';
import GoogleReviews from './components/GoogleReviews/GoogleReviews.jsx';
import Newsletter from './components/Newsletter/Newsletter.jsx';
import Footer from './components/Footer/Footer.jsx';
import FloatingButtons from './components/FloatingButtons/FloatingButtons.jsx';
import useScrollReveal from './hooks/useScrollReveal.js';

export default function App() {
  useScrollReveal();

  return (
    <>
      <Header />
      <main>
        <Banner />
        <TrustBadges />
        <BikeBrands />
        <InstagramFeed />
        <GoogleReviews />
        <Newsletter />
      </main>
      <Footer />
      <FloatingButtons />
    </>
  );
}
