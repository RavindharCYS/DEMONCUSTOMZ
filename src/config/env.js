// Centralized site configuration.
// All values are sourced from environment variables (Vite requires the
// VITE_ prefix for anything exposed to the browser bundle).
// Copy .env.example to .env.local and fill in real values before deploying.

const env = import.meta.env;

export const siteConfig = {
  brandName: env.VITE_BRAND_NAME || 'DemonCustomz',
  tagline: env.VITE_TAGLINE || 'Crafting Dreams on Two Wheels',
  logoUrl: env.VITE_LOGO_URL || '/logo.png',

  phone: env.VITE_PHONE || '+91 98765 43210',
  phoneHref: (env.VITE_PHONE || '+919876543210').replace(/[^\d+]/g, ''),
  whatsappNumber: (env.VITE_WHATSAPP_NUMBER || env.VITE_PHONE || '+919876543210').replace(/[^\d+]/g, ''),
  whatsappMessage: env.VITE_WHATSAPP_MESSAGE || "Hi DemonCustomz, I'd like to know more!",
  email: env.VITE_CONTACT_EMAIL || 'contact@demoncustomz.in',
  address: env.VITE_ADDRESS || 'Chennai, Tamil Nadu, India',

  social: {
    instagram: env.VITE_INSTAGRAM_URL || 'https://instagram.com/demoncustomz',
    facebook: env.VITE_FACEBOOK_URL || 'https://facebook.com/demoncustomz',
    youtube: env.VITE_YOUTUBE_URL || 'https://youtube.com/@demoncustomz',
    twitter: env.VITE_TWITTER_URL || 'https://twitter.com/demoncustomz',
  },

  // Instagram Graph API (Business/Creator account required).
  // Generate a long-lived token: https://developers.facebook.com/docs/instagram-basic-display-api
  instagram: {
    accessToken: env.VITE_INSTAGRAM_ACCESS_TOKEN || '',
    userId: env.VITE_INSTAGRAM_USER_ID || '',
  },

  // Google Places API — used to pull live review data.
  // Enable "Places API" in Google Cloud Console and restrict the key to your domain.
  google: {
    placesApiKey: env.VITE_GOOGLE_PLACES_API_KEY || '',
    placeId: env.VITE_GOOGLE_PLACE_ID || '',
    reviewsUrl: env.VITE_GOOGLE_REVIEWS_URL || '',
  },

  launchDate: env.VITE_LAUNCH_DATE || '',

  // Optional overrides for the three homepage banner images.
  // Falls back to bundled stock photography — swap in real workshop/bike
  // photography before going fully live.
  bannerImages: [
    env.VITE_BANNER_IMAGE_1 || '',
    env.VITE_BANNER_IMAGE_2 || '',
    env.VITE_BANNER_IMAGE_3 || '',
  ],
};

export default siteConfig;
