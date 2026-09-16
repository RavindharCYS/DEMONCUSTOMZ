# DemonCustomz — Temporary Launch Frontend

A temporary React frontend for **demoncustomz.in** to use while the full
platform (per `ExploitEye_Updated_Complete_Scope.docx`) is being built.
Meant to go live in ~10–15 days for the shop opening.

## Stack
- React 18 + Vite (fast build, easy Vercel deploy)
- react-icons (Feather + FontAwesome sets)
- Plain CSS with design tokens (no Tailwind, kept lightweight for a temp site)
- Vercel serverless functions (`/api`) for Resend mail + Google reviews proxy

## Structure
```
demoncustomz/
├── api/
│   ├── subscribe.js        # POST — Resend mail subscription
│   └── google-reviews.js   # GET  — Google Places reviews proxy
├── public/
│   ├── logo.png            # placeholder — replace with real logo
│   └── favicon.png
├── src/
│   ├── components/
│   │   ├── Header/
│   │   ├── Banner/          # rotating promo banner
│   │   ├── BikeBrands/      # vertical rounded brand cards
│   │   ├── InstagramFeed/   # reels grid (live or placeholder)
│   │   ├── GoogleReviews/   # reviews grid (live or placeholder)
│   │   ├── Newsletter/      # email subscribe → /api/subscribe
│   │   ├── Footer/
│   │   └── FloatingButtons/ # Call + WhatsApp (left), Back-to-top (right)
│   ├── config/env.js        # all site content sourced from env vars
│   ├── data/bikeBrands.js
│   ├── hooks/useInstagramFeed.js
│   ├── hooks/useGoogleReviews.js
│   ├── App.jsx
│   └── main.jsx
├── .env.example
├── vercel.json
└── package.json
```

## Design notes
- Background is a light-grey system (`--grey-50` → `--grey-300`) as requested,
  with navy (`--navy-900`) and lime (`--lime-400`) pulled from your existing
  "Coming Soon" page for brand continuity.
- Typography: Rajdhani (display/headings, motorsport feel) + Manrope (body).
- Motion is deliberate: one fade-rise per banner rotation, card hover-lifts,
  a pulsing WhatsApp button — nothing scattered or automatic beyond that.

## Local setup
```bash
npm install
cp .env.example .env.local   # fill in real values
npm run dev
```

## Everything is environment-driven
All contact details, socials, logo path, Instagram token, Google Place ID,
and Resend keys live in env vars — nothing is hardcoded. See `.env.example`
for the full list and where each key comes from.

**Important:** only variables prefixed `VITE_` are safe to expose to the
browser. `RESEND_API_KEY`, `GOOGLE_PLACES_API_KEY`, etc. have **no** `VITE_`
prefix on purpose — they're read only inside `/api` serverless functions and
never reach the client bundle.

## Mail subscription (Resend)
1. Create an account at resend.com, verify your sending domain (or use their
   test domain while developing).
2. Get an API key → set `RESEND_API_KEY` in Vercel.
3. Set `RESEND_FROM_EMAIL` to a verified sender and `NOTIFY_TO_EMAIL` to
   where you want new-subscriber alerts.
4. The Newsletter form posts to `/api/subscribe`, which sends a confirmation
   email to the subscriber and an alert to your team inbox.

## Instagram reels
Requires an Instagram **Business or Creator** account connected to a
Facebook Page, and a long-lived Graph API token (see comments in
`useInstagramFeed.js`). Until `VITE_INSTAGRAM_ACCESS_TOKEN` and
`VITE_INSTAGRAM_USER_ID` are set, the section shows styled placeholder
tiles instead of breaking.

## Google reviews
Requires a Google Cloud project with the **Places API** enabled and your
business's Place ID. Set `GOOGLE_PLACES_API_KEY` (server-side) and
`VITE_GOOGLE_PLACE_ID` (client-side, just the ID — not the key). Until then,
placeholder review cards are shown with a link to your Google listing.

## Deploying to Vercel
1. Push this folder to a GitHub repo (or `vercel` CLI directly from here).
2. Import the repo in Vercel → framework preset auto-detects Vite.
3. Add every variable from `.env.example` in Project Settings → Environment
   Variables (Production + Preview).
4. Point `demoncustomz.in` at the Vercel project (Domains tab).
5. Deploy. `vercel.json` already handles SPA routing + `/api` functions.

## Before going fully live
- Replace `public/logo.png` with your real logo (same filename, or update
  `VITE_LOGO_URL`).
- Swap the bike-brand images in `src/data/bikeBrands.js` — they currently use
  Clearbit's public logo API as a placeholder, not licensed brand photography.
- Fill in real Instagram token, Google Place ID, and Resend keys.
- Replace placeholder promo copy in `Banner.jsx` with your actual launch
  offers.

## Open questions for you
- Real phone/WhatsApp number, address, and email for `.env.local`?
- Do you have Instagram Business account + Facebook Page ready for the
  Graph API token, or should reels stay as placeholders at launch?
- Your Google Business Place ID (search "place id finder" + your business
  name, or send the Google Maps link and I'll help find it)?
- Exact list/order of bike brands you want featured, and do you have real
  product photography to swap in for the brand cards?
