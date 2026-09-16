import { useEffect, useState } from 'react';
import siteConfig from '../config/env.js';

// Requires an Instagram Business/Creator account connected to a Facebook Page,
// plus a long-lived access token from the Instagram Graph API. See:
// https://developers.facebook.com/docs/instagram-platform/instagram-graph-api
export default function useInstagramFeed(limit = 8) {
  const [posts, setPosts] = useState([]);
  const [status, setStatus] = useState('idle'); // idle | loading | ready | error | unconfigured

  useEffect(() => {
    const { accessToken, userId } = siteConfig.instagram;
    if (!accessToken || !userId) {
      setStatus('unconfigured');
      return;
    }

    let cancelled = false;
    setStatus('loading');

    const fields = 'id,caption,media_type,media_url,thumbnail_url,permalink,timestamp';
    const url = `https://graph.instagram.com/${userId}/media?fields=${fields}&access_token=${accessToken}&limit=${limit}`;

    fetch(url)
      .then((res) => {
        if (!res.ok) throw new Error('Instagram request failed');
        return res.json();
      })
      .then((data) => {
        if (cancelled) return;
        setPosts(data.data || []);
        setStatus('ready');
      })
      .catch(() => {
        if (!cancelled) setStatus('error');
      });

    return () => { cancelled = true; };
  }, [limit]);

  return { posts, status };
}
