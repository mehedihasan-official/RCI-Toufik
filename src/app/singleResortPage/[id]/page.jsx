"use client";

import { AuthContext } from "@/providers/AuthProvider";
import { useParams, useRouter } from "next/navigation";
import { useContext, useState } from "react";
import { FaArrowLeft, FaCheckCircle } from "react-icons/fa";

export default function SingleResortPage() {
  const params = useParams();
  const router = useRouter();
  const { allResortData } = useContext(AuthContext);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const resort = allResortData.find(
    (r) => r._id === params.id || r.id === params.id,
  );

  if (!resort) {
    return (
      <main className="min-h-screen bg-slate-50 px-6 py-12 sm:px-10">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="text-3xl font-bold text-gray-900">Resort Not Found</h1>
          <button
            onClick={() => router.push("/lastCallVacation")}
            className="mt-6 rounded-lg bg-[#037092] px-6 py-2 font-semibold text-white"
          >
            Back to Resorts
          </button>
        </div>
      </main>
    );
  }

  // Get all images
  const images = [resort.img, resort.img2, resort.img3].filter(Boolean);
  const displayedImage = images[currentImageIndex] || resort.img;

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const cleanedPlaceName =
    resort.place_name?.replace(/\d+\s*Nights/g, "").trim() || "";
  const isWyndham = cleanedPlaceName.toLowerCase().includes("wyndham");

  return (
    <main className="min-h-screen bg-slate-50">
      {/* Back Button */}
      <div className="sticky top-20 z-10 bg-white px-6 py-4 shadow-sm sm:px-10">
        <button
          onClick={() => router.back()}
          className="inline-flex items-center gap-2 text-[#037092] hover:underline"
        >
          <FaArrowLeft size={18} />
          Back
        </button>
      </div>

      <div className="mx-auto max-w-6xl px-6 py-10 sm:px-10">
        <div className="grid gap-8 lg:grid-cols-3">
          {/* Image Slider */}
          <div className="lg:col-span-2">
            <div className="relative overflow-hidden rounded-lg">
              <img
                src={displayedImage}
                alt={cleanedPlaceName}
                className="h-96 w-full object-cover"
              />

              {/* Slider Controls */}
              {images.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-white/80 p-2 hover:bg-white"
                  >
                    ←
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-white/80 p-2 hover:bg-white"
                  >
                    →
                  </button>
                </>
              )}

              {/* Dots */}
              <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2">
                {images.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentImageIndex(idx)}
                    className={`h-2 w-2 rounded-full transition ${
                      idx === currentImageIndex ? "bg-white" : "bg-white/50"
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Details Section */}
            <div className="mt-8 rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
              <div className="mb-4 flex items-start justify-between gap-4">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900">
                    {cleanedPlaceName}
                  </h1>
                  <p className="mt-2 text-gray-600">{resort.location}</p>
                </div>
                {isWyndham && (
                  <span className="rounded-full bg-yellow-50 px-4 py-2 text-sm font-bold text-yellow-700">
                    🏨 Wyndham
                  </span>
                )}
              </div>

              <div className="space-y-4">
                <div className="rounded-lg bg-blue-50 p-4">
                  <p className="text-sm text-gray-600">Resort ID</p>
                  <p className="font-semibold text-gray-900">
                    {resort.resort_ID}
                  </p>
                </div>

                {resort.ownerExclusive && (
                  <div className="rounded-lg bg-cyan-50 p-4">
                    <p className="text-sm text-gray-600">Exclusive Offer</p>
                    <p className="font-semibold text-gray-900">
                      {resort.ownerExclusive}
                    </p>
                  </div>
                )}

                {resort.reviews_amount && (
                  <div className="rounded-lg bg-green-50 p-4">
                    <p className="text-sm text-gray-600">Reviews</p>
                    <p className="font-semibold text-gray-900">
                      {resort.reviews_amount} reviews
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Booking Card */}
          <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-lg h-fit sticky top-32">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Ready to Book?
            </h2>

            <div className="space-y-4 mb-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700">
                  Check-in Date
                </label>
                <input
                  type="date"
                  className="mt-2 w-full rounded-lg border border-slate-300 bg-white px-4 py-2 text-gray-900 focus:border-[#037092] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700">
                  Check-out Date
                </label>
                <input
                  type="date"
                  className="mt-2 w-full rounded-lg border border-slate-300 bg-white px-4 py-2 text-gray-900 focus:border-[#037092] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700">
                  Number of Guests
                </label>
                <input
                  type="number"
                  min="1"
                  defaultValue="2"
                  className="mt-2 w-full rounded-lg border border-slate-300 bg-white px-4 py-2 text-gray-900 focus:border-[#037092] focus:outline-none"
                />
              </div>
            </div>

            <button className="w-full rounded-lg bg-[#037092] px-6 py-3 font-semibold text-white hover:bg-blue-700 mb-3">
              Add to Checkout
            </button>

            {/* Amenities */}
            <div className="border-t border-slate-200 pt-4 mt-4">
              <h3 className="font-semibold text-gray-900 mb-3">
                Key Amenities
              </h3>
              <div className="space-y-2 text-sm text-gray-700">
                <div className="flex items-center gap-2">
                  <FaCheckCircle className="text-green-500" />
                  Swimming Pool
                </div>
                <div className="flex items-center gap-2">
                  <FaCheckCircle className="text-green-500" />
                  Free WiFi
                </div>
                <div className="flex items-center gap-2">
                  <FaCheckCircle className="text-green-500" />
                  Parking
                </div>
                <div className="flex items-center gap-2">
                  <FaCheckCircle className="text-green-500" />
                  Restaurant
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
