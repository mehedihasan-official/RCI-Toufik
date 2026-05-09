/**
 * Curated collection of high-quality resort/hotel images from Unsplash
 * Used as fallbacks when resort database images fail to load.
 * All images are free to use (Unsplash license).
 */
export const RESORT_FALLBACK_IMAGES = [
  // Beach / Tropical Resorts
  "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&q=80",
  "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&q=80",
  "https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?w=800&q=80",
  "https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e?w=800&q=80",
  "https://images.unsplash.com/photo-1439130490301-25e322d88054?w=800&q=80",
  "https://images.unsplash.com/photo-1601918774946-25832a4be0d6?w=800&q=80",

  // Mountain / Nature Lodges
  "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80",
  "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800&q=80",
  "https://images.unsplash.com/photo-1445019980597-93fa8acb246c?w=800&q=80",
  "https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=800&q=80",

  // Pool / Luxury
  "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=800&q=80",
  "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80",
  "https://images.unsplash.com/photo-1615880484746-a134be9a6ecf?w=800&q=80",
  "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=800&q=80",

  // City / Urban Hotels
  "https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800&q=80",
  "https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=800&q=80",
  "https://images.unsplash.com/photo-1586611292717-f828b167408c?w=800&q=80",

  // Interior / Rooms
  "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&q=80",
  "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=800&q=80",
  "https://images.unsplash.com/photo-1584132967334-10e028bd69f7?w=800&q=80",
];

/**
 * Returns a deterministic fallback image for a given resort.
 * Using the resort ID or name ensures the same resort always gets
 * the same fallback image (stable, not random per render).
 *
 * @param {string|number} seed - resort._id, resort_ID, or place_name
 * @returns {string} fallback image URL
 */
export function getFallbackImage(seed = "") {
  const str = String(seed);
  // Simple hash: sum char codes
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = (hash + str.charCodeAt(i)) % RESORT_FALLBACK_IMAGES.length;
  }
  return RESORT_FALLBACK_IMAGES[hash];
}