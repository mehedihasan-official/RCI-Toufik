"use client";

import { useState, useEffect } from "react";
import { getFallbackImage } from "@/lib/resortFallbackImages";

/**
 * SafeImage — drops in wherever a resort image is shown.
 * • Tries to load `src`
 * • If it fails (broken URL, 404, CORS, etc.) it swaps to a curated
 *   fallback chosen deterministically from the seed (resort ID / name).
 * • While loading, shows a lightweight shimmer placeholder.
 *
 * Props:
 *   src        - original image URL from the database
 *   alt        - accessible alt text
 *   seed       - resort._id or place_name — used to pick a stable fallback
 *   className  - CSS classes forwarded to the <img>
 *   style      - inline styles forwarded to the <img>
 */
export default function SafeImage({
  src,
  alt = "Resort image",
  seed = "",
  className = "h-full w-full object-cover",
  style,
}) {
  const fallback = getFallbackImage(seed || alt);

  // Resolve initial URL: if src is clearly empty/null, skip straight to fallback
  const initialSrc = src && src.trim() ? src : fallback;

  const [imgSrc, setImgSrc] = useState(initialSrc);
  const [loaded, setLoaded] = useState(false);

  // When the `src` prop changes (e.g. slider advances), reset state
  useEffect(() => {
    const next = src && src.trim() ? src : fallback;
    setImgSrc(next);
    setLoaded(false);
  }, [src]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleError = () => {
    if (imgSrc !== fallback) {
      setImgSrc(fallback);
    }
  };

  const handleLoad = () => {
    setLoaded(true);
  };

  return (
    <div className="relative h-full w-full overflow-hidden bg-slate-100">
      {/* Shimmer shown while image is loading */}
      {!loaded && (
        <div className="absolute inset-0 animate-pulse bg-gradient-to-r from-slate-200 via-slate-100 to-slate-200" />
      )}
      <img
        src={imgSrc}
        alt={alt}
        className={`${className} transition-opacity duration-300 ${loaded ? "opacity-100" : "opacity-0"}`}
        style={style}
        onError={handleError}
        onLoad={handleLoad}
      />
    </div>
  );
}