'use client';

import Link from 'next/link';
import { AuthContext } from '@/providers/AuthProvider';
import { useParams, useRouter } from 'next/navigation';
import { useContext, useEffect, useState } from 'react';
import { BiSolidHomeHeart } from 'react-icons/bi';
import { FcAdvertising } from 'react-icons/fc';
import { GiStarsStack } from 'react-icons/gi';
import { IoIosArrowBack } from 'react-icons/io';

const topAmenities = [
  'Beach Access',
  'Family Friendly',
  'Golf Nearby',
  'Spa Services',
  'Pools',
  'Dining Options',
];

const formatValue = (value, fallback) => {
  if (value === null || value === undefined || value === '') {
    return fallback;
  }

  return value;
};

const tabNames = ['Overview', 'Room Details', 'Resort Details', 'Reviews'];

export default function SingleResortPage() {
  const { id } = useParams();
  const router = useRouter();
  const { allResortData = [] } = useContext(AuthContext);

  const [currentResort, setCurrentResort] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [additionalImages, setAdditionalImages] = useState([]);
  const [touchStartX, setTouchStartX] = useState(null);
  const [mouseStartX, setMouseStartX] = useState(null);
  const [activeTab, setActiveTab] = useState('Overview');

  const cleanPlaceName = (name) =>
    String(name || '')
      .replace(/\d+\s*Nights/g, '')
      .trim();

  useEffect(() => {
    if (!id || !allResortData.length) {
      return;
    }

    const matchedResort = allResortData.find((item) => {
      const candidates = [item?._id, item?.id, item?.resort_ID].filter(Boolean);
      return candidates.some((candidate) => String(candidate) === String(id));
    });

    if (!matchedResort) {
      setCurrentResort(null);
      return;
    }

    setCurrentResort({
      ...matchedResort,
      place_name: cleanPlaceName(matchedResort.place_name),
    });
  }, [allResortData, id]);

  useEffect(() => {
    if (!currentResort) {
      setAdditionalImages([]);
      return;
    }

    const images = Object.keys(currentResort)
      .filter((key) => key.startsWith('img'))
      .map((key) => currentResort[key])
      .filter(Boolean);

    setAdditionalImages(images.length ? images : [currentResort.img].filter(Boolean));
  }, [currentResort]);

  useEffect(() => {
    setCurrentIndex(0);
  }, [additionalImages]);

  useEffect(() => {
    if (additionalImages.length <= 1) {
      return undefined;
    }

    const sliderInterval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % additionalImages.length);
    }, 5000);

    return () => clearInterval(sliderInterval);
  }, [additionalImages.length]);

  const handleSwipe = (direction) => {
    if (!additionalImages.length) {
      return;
    }

    setCurrentIndex((prevIndex) => {
      if (direction === 'left') {
        return (prevIndex + 1) % additionalImages.length;
      }

      return (prevIndex - 1 + additionalImages.length) % additionalImages.length;
    });
  };

  const handleTouchStart = (event) => {
    setTouchStartX(event.touches[0]?.clientX ?? null);
  };

  const handleTouchMove = (event) => {
    if (touchStartX === null) {
      return;
    }

    const deltaX = (event.touches[0]?.clientX ?? 0) - touchStartX;

    if (Math.abs(deltaX) > 50) {
      handleSwipe(deltaX < 0 ? 'left' : 'right');
      setTouchStartX(null);
    }
  };

  const handleMouseDown = (event) => {
    setMouseStartX(event.clientX);
  };

  const handleMouseMove = (event) => {
    if (mouseStartX === null) {
      return;
    }

    const deltaX = event.clientX - mouseStartX;

    if (Math.abs(deltaX) > 50) {
      handleSwipe(deltaX < 0 ? 'left' : 'right');
      setMouseStartX(null);
    }
  };

  const handleMouseUp = () => {
    setMouseStartX(null);
  };

  const handleTransmission = (vacationType) => {
    if (!currentResort) {
      return;
    }

    localStorage.setItem(
      'currentResort',
      JSON.stringify({ ...currentResort, vacationType }),
    );
    router.push('/single-available-unit');
  };

  if (!currentResort && !allResortData.length) {
    return (
      <main className="min-h-screen bg-slate-50 px-4 py-10 md:px-6">
        <div className="mx-auto max-w-3xl rounded-2xl shadow-md p-6 bg-white text-center">
          <h1 className="text-2xl font-semibold text-slate-900">Loading resort details</h1>
          <p className="mt-3 text-sm text-slate-600">Please wait while we load this resort.</p>
        </div>
      </main>
    );
  }

  if (!currentResort) {
    return (
      <main className="min-h-screen bg-slate-50 px-4 py-10 md:px-6">
        <div className="mx-auto max-w-3xl rounded-2xl shadow-md p-6 bg-white text-center">
          <h1 className="text-2xl font-semibold text-slate-900">Resort not available</h1>
          <p className="mt-3 text-sm text-slate-600">
            We could not find that resort. Please return to the resort list and try again.
          </p>
          <Link
            href="/"
            className="mt-6 inline-flex rounded-xl bg-[#037092] px-6 py-3 font-semibold text-white transition-all duration-200 hover:bg-[#025a74]"
          >
            Browse Resorts
          </Link>
        </div>
      </main>
    );
  }

  const isWyndham = String(currentResort.place_name || '').toLowerCase().includes('wyndham');
  const rating = formatValue(currentResort.rating, '4.5');
  const reviewCount = formatValue(currentResort.reviews_amount, 0);
  const activeImage = additionalImages[currentIndex];
  const overviewText =
    currentResort.overview ||
    currentResort.description ||
    'Explore a polished resort stay with family-friendly amenities and flexible RCI booking options.';
  const roomDetails = currentResort.room_details || 'Room details will be shared at booking time.';
  const resortDetails =
    currentResort.resort_details ||
    'Enjoy on-site amenities, convenient access to the local area, and a strong member experience.';
  const reviewsText = `Travelers rate this resort ${rating}/5 across ${reviewCount} reviews.`;

  return (
    <main className="min-h-screen bg-slate-50 pb-14">
      <div className="mx-auto max-w-6xl px-4 py-5 md:px-6 lg:px-8">
        <button
          type="button"
          onClick={() => router.back()}
          className="inline-flex items-center gap-2 rounded-full border border-[#037092] bg-white px-4 py-2 text-sm font-semibold text-[#037092] shadow-sm transition-all duration-200 hover:bg-[#e6f8fc]"
        >
          <IoIosArrowBack className="text-base" />
          Back
        </button>

        <section className="mt-5 overflow-hidden rounded-3xl bg-white shadow-md">
          <div
            className="relative h-64 w-full bg-slate-200 md:h-96"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
          >
            {activeImage ? (
              <img
                src={activeImage}
                alt={currentResort.place_name}
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="flex h-full items-center justify-center bg-[#e6f8fc] text-[#037092]">
                Resort image unavailable
              </div>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-black/10 to-transparent" />
          </div>

          <div className="flex items-center justify-center gap-2 px-4 py-4">
            {(additionalImages.length ? additionalImages : [currentResort.img]).map((image, index) => (
              <button
                key={`${image || 'fallback'}-${index}`}
                type="button"
                onClick={() => setCurrentIndex(index)}
                className={`h-2.5 rounded-full transition-all duration-200 ${
                  currentIndex === index ? 'w-8 bg-[#037092]' : 'w-2.5 bg-slate-300'
                }`}
                aria-label={`View image ${index + 1}`}
              />
            ))}
          </div>
        </section>

        <section className="mt-6 rounded-2xl shadow-md p-5 bg-white">
          <p className="text-sm text-gray-500">{currentResort.location || 'Location unavailable'}</p>
          <p className="mt-2 text-xs font-medium uppercase tracking-[0.2em] text-slate-400">
            Resort ID {formatValue(currentResort.resort_ID, 'N/A')}
          </p>
          <h1 className="mt-3 text-3xl font-bold text-slate-900">{currentResort.place_name}</h1>
          {isWyndham && (
            <div className="mt-4 inline-flex items-center gap-2 rounded-full bg-[#e6f8fc] px-4 py-2 text-sm font-semibold text-[#037092]">
              <GiStarsStack className="text-lg" />
              Wyndham badge
            </div>
          )}
        </section>

        <section className="mt-4 rounded-2xl shadow-md p-4 bg-white">
          <div className="flex items-center gap-3">
            <div className="rounded-full bg-[#e6f8fc] p-3 text-[#037092]">
              <GiStarsStack className="text-2xl" />
            </div>
            <div>
              <p className="text-lg font-semibold text-slate-900">RCI Gold Crown</p>
              <p className="text-sm text-slate-600">
                Member-favorite resort with a {rating} traveler rating.
              </p>
            </div>
          </div>
        </section>

        <section className="mt-4 rounded-2xl shadow-md p-4 bg-white">
          <h2 className="text-lg font-semibold text-slate-900">Top Amenities</h2>
          <div className="mt-4 flex gap-3 overflow-x-auto pb-2">
            {topAmenities.map((amenity) => (
              <div
                key={amenity}
                className="min-w-[150px] rounded-2xl border border-slate-200 bg-[#f8fcfd] px-4 py-4 text-sm font-medium text-slate-700"
              >
                {amenity}
              </div>
            ))}
          </div>
        </section>

        <section className="mt-4 rounded-2xl shadow-md p-4 bg-white">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-sm font-semibold text-slate-900">TripAdvisor row</p>
              <p className="mt-1 text-sm text-slate-600">
                Based on {reviewCount} traveler reviews for this resort.
              </p>
            </div>
            <div className="flex items-center gap-3">
              <div className="rounded-full bg-[#e6f8fc] px-4 py-2 text-sm font-semibold text-[#037092]">
                Rating {rating}
              </div>
              <img
                src="https://www.tripadvisor.com/img/cdsi/img2/ratings/traveler/4.5-32772-5.svg"
                alt="TripAdvisor"
                className="h-10 w-28 object-contain"
              />
            </div>
          </div>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
          <div
            onClick={() => handleTransmission('rciPoints')}
            className="rounded-2xl shadow-md p-5 cursor-pointer hover:shadow-xl transition-all border border-[#037092] bg-white"
            role="button"
            tabIndex={0}
            onKeyDown={(event) => {
              if (event.key === 'Enter' || event.key === ' ') {
                handleTransmission('rciPoints');
              }
            }}
          >
            <div className="rounded-xl bg-[#037092] px-4 py-4 text-white">
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <BiSolidHomeHeart className="text-2xl" />
                  <span className="text-lg font-semibold">Club Points Vacation</span>
                </div>
                <span className="rounded-full bg-white/15 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em]">
                  Pay with RCI Points
                </span>
              </div>
            </div>
            <div className="pt-4">
              <p className="text-sm text-slate-600">
                Use RCI Club Points only for this booking flow. No money and no card required.
              </p>
            </div>
          </div>

          <div
            onClick={() => handleTransmission('lastCall')}
            className="rounded-2xl shadow-md p-5 cursor-pointer hover:shadow-xl transition-all border border-[#f59e0b] bg-white"
            role="button"
            tabIndex={0}
            onKeyDown={(event) => {
              if (event.key === 'Enter' || event.key === ' ') {
                handleTransmission('lastCall');
              }
            }}
          >
            <div className="rounded-xl bg-[#f59e0b] px-4 py-4 text-white">
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <FcAdvertising className="text-2xl" />
                  <span className="text-lg font-semibold">Last Call Vacation</span>
                </div>
                <span className="rounded-full bg-white/15 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em]">
                  Pay with USD $
                </span>
              </div>
            </div>
            <div className="pt-4">
              <p className="text-sm text-slate-600">
                Book this stay with real money in USD. Card payment will be required later.
              </p>
            </div>
          </div>
        </section>

        <section className="rounded-2xl shadow-md p-4 bg-white">
          <div className="overflow-x-auto">
            <div className="flex min-w-max gap-2">
              {tabNames.map((tabName) => (
                <button
                  key={tabName}
                  type="button"
                  onClick={() => setActiveTab(tabName)}
                  className={`rounded-full px-4 py-2 text-sm font-semibold transition-all duration-200 ${
                    activeTab === tabName
                      ? 'bg-[#037092] text-white'
                      : 'bg-slate-100 text-slate-700 hover:bg-[#e6f8fc] hover:text-[#037092]'
                  }`}
                >
                  {tabName}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-5 rounded-2xl border border-slate-200 p-4">
            {activeTab === 'Overview' && (
              <div className="space-y-3 text-sm leading-7 text-slate-700">
                <p>{overviewText}</p>
                <p>
                  Check-in: {formatValue(currentResort.check_in_time, 'Standard resort check-in')}
                </p>
                <p>
                  Check-out: {formatValue(currentResort.check_out_time, 'Standard resort check-out')}
                </p>
              </div>
            )}

            {activeTab === 'Room Details' && (
              <p className="text-sm leading-7 text-slate-700">{roomDetails}</p>
            )}

            {activeTab === 'Resort Details' && (
              <p className="text-sm leading-7 text-slate-700">{resortDetails}</p>
            )}

            {activeTab === 'Reviews' && (
              <div className="space-y-3 text-sm leading-7 text-slate-700">
                <p>{reviewsText}</p>
                <p>TripAdvisor rating shown above reflects recent traveler feedback for this property.</p>
              </div>
            )}
          </div>
        </section>
      </div>
    </main>
  );
}
