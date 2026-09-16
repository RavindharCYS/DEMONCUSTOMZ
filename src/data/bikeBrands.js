// Popular two-wheeler brands sold/serviced in India and Tamil Nadu.
//
// `logo` -> /public/brands/<file> — the real brand logos, dropped in with
//   whatever filename/extension they came in (png/jpg/jpeg/svg).
// `fallback` -> /public/brands/<slug>.svg — shown automatically if the
//   logo above is missing or fails to load:
//     - honda, yamaha, suzuki, ktm, vespa  -> official brand marks (simple-icons, CC0)
//     - the rest                            -> original coin-style emblem badges,
//                                              crafted in each brand's real colour,
//                                              since official trademarked artwork
//                                              for these Indian brands isn't
//                                              available through simple-icons or
//                                              any source this environment can
//                                              reach.
const bikeBrands = [
  { name: 'Royal Enfield', slug: 'royal-enfield', origin: 'Chennai, TN', initials: 'RE', accent: '#c0392b', logo: '/brands/RoyalEnfield.png', fallback: '/brands/royal-enfield.svg' },
  { name: 'TVS Motor', slug: 'tvs', origin: 'Tamil Nadu', initials: 'TVS', accent: '#1f6f5c', logo: '/brands/TVS.png', fallback: '/brands/tvs.svg' },
  { name: 'Bajaj Auto', slug: 'bajaj', origin: 'India', initials: 'BA', accent: '#1b4f8c', logo: '/brands/Bajaj.png', fallback: '/brands/bajaj.svg' },
  { name: 'Hero MotoCorp', slug: 'hero', origin: 'India', initials: 'HM', accent: '#b8281f', logo: '/brands/Hero.png', fallback: '/brands/hero.svg' },
  { name: 'Honda', slug: 'honda', origin: 'Japan / India', initials: 'H', accent: '#c8102e', logo: '/brands/honda.svg', fallback: '/brands/honda.svg' },
  { name: 'Yamaha', slug: 'yamaha', origin: 'Japan / India', initials: 'Y', accent: '#1a1a1a', logo: '/brands/yamaha.svg', fallback: '/brands/yamaha.svg' },
  { name: 'Suzuki', slug: 'suzuki', origin: 'Japan / India', initials: 'S', accent: '#003399', logo: '/brands/suzuki.svg', fallback: '/brands/suzuki.svg' },
  { name: 'KTM', slug: 'ktm', origin: 'Austria / India', initials: 'KTM', accent: '#ff6600', logo: '/brands/ktm.svg', fallback: '/brands/ktm.svg' },
  { name: 'Jawa', slug: 'jawa', origin: 'India', initials: 'J', accent: '#2c3e50', logo: '/brands/JAWA.png', fallback: '/brands/jawa.svg' },
  { name: 'Yezdi', slug: 'yezdi', origin: 'India', initials: 'YZ', accent: '#8e2434', logo: '/brands/Yezdi.png', fallback: '/brands/yezdi.svg' },
  { name: 'Vespa', slug: 'vespa', origin: 'Italy / India', initials: 'V', accent: '#3d7a1f', logo: '/brands/vespa.svg', fallback: '/brands/vespa.svg' },
  { name: 'Triumph', slug: 'triumph', origin: 'UK / India', initials: 'TR', accent: '#111827', logo: '/brands/Triumph.png', fallback: '/brands/triumph.svg' },
];

export default bikeBrands;