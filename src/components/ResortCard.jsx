"use client";

import { FaRegHeart } from "react-icons/fa";
import { GiStarsStack } from "react-icons/gi";

export default function ResortCard({ resort }) {
  const { img, place_name, reviews_amount, location, ownerExclusive } = resort;

  // Clean place_name by removing "X Nights" text
  const cleanedPlaceName =
    place_name?.replace(/\d+\s*Nights/g, "").trim() || "";
  const isWyndham = cleanedPlaceName.toLowerCase().includes("wyndham");

  return (
    <article className="group overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm transition hover:shadow-lg">
      {/* Image Container */}
      <div className="relative h-48 w-full overflow-hidden bg-slate-200">
        {img ? (
          <img
            src={img}
            alt={cleanedPlaceName}
            className="h-full w-full object-cover transition group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-gray-400">
            No Image
          </div>
        )}
        <button className="absolute right-3 top-3 rounded-full bg-white p-2 shadow-md transition hover:bg-red-50">
          <FaRegHeart className="text-gray-600 hover:text-red-600" size={18} />
        </button>
      </div>

      {/* Content Container */}
      <div className="p-4">
        {/* Location */}
        <p className="text-sm text-gray-500">{location}</p>

        {/* Title with Wyndham Badge */}
        <div className="mt-2 flex items-start justify-between gap-2">
          <h3 className="flex-1 font-semibold text-gray-900">
            {cleanedPlaceName}
          </h3>
          {isWyndham && (
            <span className="inline-block whitespace-nowrap rounded-full bg-yellow-50 px-2 py-1 text-xs font-bold text-yellow-700">
              🏨 Wyndham
            </span>
          )}
        </div>

        {/* Owner Exclusive Badge */}
        {ownerExclusive && (
          <p className="mt-1 text-xs font-semibold text-[#037092]">
            {ownerExclusive}
          </p>
        )}

        {/* Rating & Reviews */}
        <div className="mt-3 flex items-center gap-2">
          <div className="flex items-center gap-1 text-yellow-400">
            <GiStarsStack size={16} />
            <span className="text-xs font-bold">Gold Crown</span>
          </div>
          {reviews_amount && (
            <span className="text-xs text-gray-500">
              ({reviews_amount} reviews)
            </span>
          )}
        </div>
      </div>
    </article>
  );
}
