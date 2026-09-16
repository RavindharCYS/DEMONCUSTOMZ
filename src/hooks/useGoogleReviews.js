import { useEffect, useState } from 'react';
import siteConfig from '../config/env.js';

// Google's Places API blocks browser CORS requests, so real reviews must be
// fetched through the /api/google-reviews serverless function (see /api),
// which holds the API key server-side. This hook calls that proxy.
export default function useGoogleReviews() {
  const [data, setData] = useState(null);
  const [status, setStatus] = useState('idle'); // idle | loading | ready | error | unconfigured

  useEffect(() => {
    if (!siteConfig.google.placeId) {
      setStatus('unconfigured');
      return;
    }

    let cancelled = false;
    setStatus('loading');

    fetch(`/api/google-reviews?placeId=${encodeURIComponent(siteConfig.google.placeId)}`)
      .then((res) => {
        if (!res.ok) throw new Error('Google reviews request failed');
        return res.json();
      })
      .then((json) => {
        if (!cancelled) {
          setData(json);
          setStatus('ready');
        }
      })
      .catch(() => {
        if (!cancelled) setStatus('error');
      });

    return () => { cancelled = true; };
  }, []);

  return { data, status };
}
