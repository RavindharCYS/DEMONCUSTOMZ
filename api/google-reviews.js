// GET /api/google-reviews?placeId=YOUR_PLACE_ID
//
// Proxies the Google Places "Place Details" endpoint so the API key stays
// server-side (Google Places blocks browser CORS requests anyway).
// Requires this environment variable in Vercel (server-side only):
//   GOOGLE_PLACES_API_KEY — from Google Cloud Console, with "Places API" enabled.
//
// Find your Place ID: https://developers.google.com/maps/documentation/places/web-service/place-id

export default async function handler(req, res) {
  const { placeId } = req.query;
  const apiKey = process.env.GOOGLE_PLACES_API_KEY;

  if (!placeId) {
    return res.status(400).json({ error: 'Missing placeId query parameter' });
  }
  if (!apiKey) {
    return res.status(500).json({ error: 'GOOGLE_PLACES_API_KEY is not configured' });
  }

  const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${encodeURIComponent(
    placeId
  )}&fields=rating,user_ratings_total,reviews&key=${apiKey}`;

  try {
    const response = await fetch(url);
    const json = await response.json();

    if (json.status !== 'OK') {
      return res.status(502).json({ error: json.status || 'Google Places error' });
    }

    return res.status(200).json({
      rating: json.result.rating,
      userRatingCount: json.result.user_ratings_total,
      reviews: json.result.reviews || [],
    });
  } catch (err) {
    console.error('Google Places error:', err);
    return res.status(502).json({ error: 'Could not fetch reviews right now.' });
  }
}
