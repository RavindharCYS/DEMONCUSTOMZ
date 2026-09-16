import { useEffect, useState } from 'react';

const EXTENSIONS = ['png', 'jpg', 'jpeg', 'webp'];

function probeImage(url) {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => resolve(url);
    img.onerror = () => resolve(null);
    img.src = url;
  });
}

/**
 * Looks for sequentially-numbered images inside a public folder, e.g.
 * dropping banner/1.png, banner/2.png, banner/3.png (any of png/jpg/jpeg/webp)
 * into /public/banner/ is picked up automatically — no code changes needed.
 *
 * Returns { images, checked }. `images` is the ordered list of URLs that
 * actually exist (empty until — and possibly after — the probe finishes).
 * `checked` flips to true once the probe has completed, so callers know
 * whether an empty result means "still loading" or "nothing found, use a
 * fallback".
 */
export default function useFolderImages(folder, { min = 1, max = 10 } = {}) {
  const [images, setImages] = useState([]);
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    let cancelled = false;

    async function run() {
      const found = [];
      for (let i = min; i <= max; i += 1) {
        // eslint-disable-next-line no-await-in-loop
        const hits = await Promise.all(
          EXTENSIONS.map((ext) => probeImage(`${folder}/${i}.${ext}`))
        );
        const hit = hits.find(Boolean);
        if (hit) found.push(hit);
      }
      if (!cancelled) {
        setImages(found);
        setChecked(true);
      }
    }

    run();
    return () => {
      cancelled = true;
    };
  }, [folder, min, max]);

  return { images, checked };
}
