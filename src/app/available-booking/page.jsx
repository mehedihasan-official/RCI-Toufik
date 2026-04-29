'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const getPointsPerNight = (unitType) =>
  ({
    studio: 7000,
    '1 bedroom': 7000,
    '2 bedroom': 9000,
    '3 bedroom': 10500,
    '4 bedroom': 12500,
  })[unitType] || 0;

const getFixedPrice = (unitType) =>
  ({
    studio: 309,
    '1 bedroom': 339,
    '2 bedroom': 379,
    '3 bedroom': 379,
    '4 bedroom': 379,
  })[unitType] || 0;

const getTaxPrice = (base) => ({ 309: 329.08, 339: 361.02, 379: 403.63 })[base] || base;

const formatDate = (value) =>
  new Date(value).toLocaleDateString(undefined, {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });

export default function AvailableBookingPage() {
  const router = useRouter();
  const [bookingData, setBookingData] = useState(null);
  const [timeLeft, setTimeLeft] = useState(8 * 60);
  const [isExpired, setIsExpired] = useState(false);

  useEffect(() => {
    const data = localStorage.getItem('bookingDetails');
    if (data) {
      setBookingData(JSON.parse(data));
    }
  }, []);

  useEffect(() => {
    if (timeLeft <= 0) {
      setIsExpired(true);
      return undefined;
    }

    const timer = setTimeout(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [timeLeft]);

  if (!bookingData) {
    return (
      <main className="min-h-screen bg-slate-50 px-4 py-10 md:px-6">
        <div className="mx-auto max-w-2xl rounded-2xl shadow-md p-6 bg-white text-center">
          <h1 className="text-2xl font-semibold text-slate-900">No booking selected</h1>
          <p className="mt-3 text-sm text-slate-600">
            Please go back and choose your resort dates again.
          </p>
        </div>
      </main>
    );
  }

  const { resort, startDate, endDate, unitType, vacationType, nights } = bookingData;

  const calculatePoints = () => {
    const basePointsPerNight = getPointsPerNight(unitType);
    let basePoints = 0;
    let weekendNights = 0;
    const cur = new Date(startDate);
    const end = new Date(endDate);

    while (cur < end) {
      if (cur.getDay() === 0 || cur.getDay() === 6) {
        weekendNights++;
      }
      basePoints += basePointsPerNight;
      cur.setDate(cur.getDate() + 1);
    }

    const weekendSurcharge = weekendNights * 500;
    return {
      basePoints,
      weekendNights,
      weekendSurcharge,
      totalPoints: basePoints + weekendSurcharge,
    };
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${String(remainingSeconds).padStart(2, '0')}`;
  };

  const isPoints = vacationType === 'rciPoints';
  const { totalPoints, basePoints, weekendSurcharge, weekendNights } = calculatePoints();
  const basePrice = getFixedPrice(unitType);
  const taxPrice = getTaxPrice(basePrice);

  const handleBookNow = () => {
    const { totalPoints: nextTotalPoints, basePoints: nextBasePoints, weekendSurcharge: nextWeekendSurcharge, weekendNights: nextWeekendNights } =
      calculatePoints();
    const nextBasePrice = getFixedPrice(unitType);
    const nextTaxPrice = getTaxPrice(nextBasePrice);

    localStorage.setItem(
      'checkoutDetails',
      JSON.stringify({
        resort,
        startDate,
        endDate,
        unitType,
        vacationType,
        paymentMethod: isPoints ? 'points' : 'cash',
        points: isPoints ? nextTotalPoints : 0,
        price: isPoints ? 0 : nextTaxPrice,
        basePrice: isPoints ? 0 : nextBasePrice,
        weekendSurcharge: isPoints ? nextWeekendSurcharge : 0,
        weekendNights: isPoints ? nextWeekendNights : 0,
        basePoints: isPoints ? nextBasePoints : 0,
        nights,
      }),
    );
    router.push('/checkout');
  };

  const titleColor = isPoints ? 'text-[#037092]' : 'text-[#f59e0b]';
  const badgeClasses = isPoints
    ? 'bg-[#e6f8fc] text-[#037092]'
    : 'bg-[#fff2dc] text-[#b45309]';

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-10 md:px-6">
      <div className="mx-auto max-w-3xl">
        <div className="text-center">
          <h1 className={`text-3xl font-bold ${titleColor}`}>
            {isPoints ? 'Club Points Booking' : 'Last Call Booking'}
          </h1>
        </div>

        <section className="mt-6 rounded-2xl shadow-md p-4 bg-white md:p-6">
          <h2 className="text-2xl font-semibold text-slate-900">{resort?.place_name}</h2>
          <p className="mt-2 text-2xl font-semibold text-[#037092]">{unitType}</p>

          <div className="mt-6 border-t border-slate-200 pt-6">
            <div className="flex items-center justify-between gap-3">
              <h3 className="text-lg font-semibold text-slate-900">Payment Section</h3>
              <span className={`rounded-full px-4 py-2 text-sm font-semibold ${badgeClasses}`}>
                {isPoints ? 'Points Payment' : 'Cash Payment'}
              </span>
            </div>

            {isPoints ? (
              <div className="mt-4 space-y-3 rounded-2xl bg-[#f8fcfd] p-4">
                <p className="text-sm text-slate-600">{getPointsPerNight(unitType)} pts/night</p>
                <p className="text-sm text-slate-700">
                  Weekend nights: {weekendNights} x 500
                </p>
                <p className="text-sm text-slate-700">
                  Base: {basePoints.toLocaleString()} + Weekend: {weekendSurcharge.toLocaleString()}
                </p>
                <p className="text-3xl font-bold text-[#037092]">
                  TOTAL: {totalPoints.toLocaleString()} pts
                </p>
              </div>
            ) : (
              <div className="mt-4 space-y-3 rounded-2xl bg-[#fffaf1] p-4">
                <p className="text-sm text-slate-700">Base price: ${basePrice}</p>
                <p className="text-sm text-slate-700">Tax included</p>
                <p className="text-3xl font-bold text-[#f59e0b]">
                  TOTAL: ${taxPrice.toFixed(2)}
                </p>
              </div>
            )}
          </div>

          <div className="mt-6 border-t border-slate-200 pt-6">
            <h3 className="text-lg font-semibold text-slate-900">Dates Section</h3>
            <div className="mt-4 grid gap-4 md:grid-cols-2">
              <div className="rounded-2xl border border-slate-200 p-4">
                <p className="text-sm text-slate-500">Check-in</p>
                <p className="mt-1 font-semibold text-slate-900">{formatDate(startDate)}</p>
              </div>
              <div className="rounded-2xl border border-slate-200 p-4">
                <p className="text-sm text-slate-500">Check-out</p>
                <p className="mt-1 font-semibold text-slate-900">{formatDate(endDate)}</p>
              </div>
            </div>
            <p className="mt-4 text-sm text-slate-700">Duration: {nights} nights</p>
          </div>

          <button
            type="button"
            onClick={handleBookNow}
            disabled={isExpired}
            className="mt-8 w-full rounded-xl font-semibold py-3 px-6 transition-all duration-200 bg-[#ffc445] text-slate-900 hover:bg-[#ffd166] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isPoints ? 'Redeem Points' : 'Book Now'}
          </button>

          <p className="mt-4 text-center text-sm text-slate-500">
            Time remaining: {formatTime(timeLeft)}
          </p>
        </section>
      </div>

      {isExpired && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 text-center shadow-xl">
            <h2 className="text-2xl font-semibold text-slate-900">Session expired</h2>
            <p className="mt-3 text-sm text-slate-600">
              Your booking hold has expired. Please start the availability search again.
            </p>
            <button
              type="button"
              onClick={() => router.push('/single-available-unit')}
              className="mt-6 rounded-xl font-semibold py-3 px-6 transition-all duration-200 bg-[#037092] text-white hover:bg-[#025a74]"
            >
              Choose Dates Again
            </button>
          </div>
        </div>
      )}
    </main>
  );
}
