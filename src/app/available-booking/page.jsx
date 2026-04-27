"use client";

import { addDays } from "date-fns";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function AvailableBookingPage() {
  const router = useRouter();
  const [bookingState, setBookingState] = useState(null);
  const [timeLeft, setTimeLeft] = useState(8 * 60);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const raw = localStorage.getItem("bookingState");
    if (!raw) {
      setBookingState(null);
      return;
    }

    try {
      const parsed = JSON.parse(raw);
      setBookingState({
        ...parsed,
        startDate: parsed.startDate ? new Date(parsed.startDate) : new Date(),
        endDate: parsed.endDate
          ? new Date(parsed.endDate)
          : addDays(new Date(), 6),
      });
    } catch {
      setBookingState(null);
    }
  }, []);

  useEffect(() => {
    if (timeLeft <= 0) {
      setIsModalOpen(true);
      return;
    }

    const timer = setTimeout(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [timeLeft]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remaining = seconds % 60;
    return `${minutes}:${remaining.toString().padStart(2, "0")}`;
  };

  const getPointsPerNight = (unitType) => {
    switch (unitType) {
      case "studio":
      case "1 bedroom":
        return 7000;
      case "2 bedroom":
        return 9000;
      case "3 bedroom":
        return 10500;
      case "4 bedroom":
        return 12500;
      default:
        return 0;
    }
  };

  const getFixedPrice = (unitType) => {
    switch (unitType) {
      case "studio":
        return 309;
      case "1 bedroom":
        return 339;
      case "2 bedroom":
      case "3 bedroom":
      case "4 bedroom":
        return 379;
      default:
        return 0;
    }
  };

  const calculatePoints = () => {
    if (!bookingState)
      return {
        basePoints: 0,
        weekendNights: 0,
        weekendSurcharge: 0,
        totalPoints: 0,
      };
    const { startDate, endDate, unitType } = bookingState;
    const pointsPerNight = getPointsPerNight(unitType);
    let weekendNights = 0;
    let current = new Date(startDate);

    while (current < endDate) {
      const day = current.getDay();
      if (day === 0 || day === 6) {
        weekendNights += 1;
      }
      current.setDate(current.getDate() + 1);
    }

    const nights =
      bookingState.nights ||
      Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24));
    const basePoints = nights * pointsPerNight;
    const weekendSurcharge = weekendNights * 500;
    const totalPoints = basePoints + weekendSurcharge;

    return { basePoints, weekendNights, weekendSurcharge, totalPoints };
  };

  const handleBookNow = () => {
    if (!bookingState) return;
    localStorage.setItem("checkoutState", JSON.stringify(bookingState));
    router.push("/checkout");
  };

  if (!bookingState) {
    return (
      <div className="min-h-screen bg-slate-50 px-6 py-10">
        <div className="mx-auto max-w-3xl rounded-3xl border border-slate-200 bg-white p-10 text-center shadow-sm">
          <h2 className="text-2xl font-semibold text-slate-900">
            No booking data available
          </h2>
          <p className="mt-3 text-slate-600">
            Please return to the resort page and select dates again.
          </p>
        </div>
      </div>
    );
  }

  const points = calculatePoints();
  const price =
    bookingState.vacationType === "lastCall"
      ? getFixedPrice(bookingState.unitType)
      : 0;
  const paymentMethod =
    bookingState.vacationType === "lastCall" ? "cash" : "points";

  return (
    <div className="min-h-screen bg-slate-50 px-6 py-10">
      <div className="mx-auto max-w-4xl space-y-8">
        <div className="rounded-3xl bg-white p-8 shadow-lg">
          <h1 className="text-3xl font-semibold text-[#037092]">
            {bookingState.vacationType === "rciPoints"
              ? "Available Unit (with Points)"
              : "Available Unit"}
          </h1>
          <p className="mt-2 text-slate-600">
            {bookingState.resort?.place_name}
          </p>

          <div className="mt-8 rounded-3xl border border-slate-200 bg-slate-50 p-6">
            <p className="text-xl font-semibold text-[#0370ad]">
              {bookingState.unitType}
            </p>
            {paymentMethod === "cash" ? (
              <div className="mt-6 space-y-4">
                <p className="text-lg text-slate-700">
                  {price.toFixed(2)} USD + tax
                </p>
                <p className="text-3xl font-semibold text-slate-900">
                  ${price.toFixed(2)}
                </p>
              </div>
            ) : (
              <div className="mt-6 space-y-4 text-slate-700">
                <p className="text-lg">
                  Points per night:{" "}
                  {getPointsPerNight(bookingState.unitType).toLocaleString()}
                </p>
                {points.weekendNights > 0 && (
                  <p>
                    Weekend nights: {points.weekendNights} × 500 = +
                    {points.weekendSurcharge.toLocaleString()} points
                  </p>
                )}
                <p>Base points: {points.basePoints.toLocaleString()}</p>
                <p className="text-3xl font-semibold text-slate-900">
                  Total Points: {points.totalPoints.toLocaleString()}
                </p>
              </div>
            )}
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <div className="rounded-3xl border border-slate-200 bg-white p-5">
              <p className="text-sm font-semibold text-slate-500">Check-in</p>
              <p className="mt-2 text-lg text-slate-900">
                {bookingState.startDate.toLocaleDateString()}
              </p>
            </div>
            <div className="rounded-3xl border border-slate-200 bg-white p-5">
              <p className="text-sm font-semibold text-slate-500">Check-out</p>
              <p className="mt-2 text-lg text-slate-900">
                {bookingState.endDate.toLocaleDateString()}
              </p>
            </div>
          </div>

          <button
            onClick={handleBookNow}
            className="mt-8 w-full rounded-full bg-[#ffc445] px-6 py-4 text-base font-semibold text-slate-900 hover:bg-[#ffbd42]"
          >
            {paymentMethod === "cash" ? "Book Now" : "Redeem Points"}
          </button>

          <p className="mt-4 text-sm text-gray-500">
            Time remaining: {formatTime(timeLeft)}
          </p>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4 py-10">
          <div className="max-w-xl rounded-3xl bg-white p-8 text-center shadow-2xl">
            <h2 className="text-2xl font-semibold text-slate-900">
              Booking Timer Expired
            </h2>
            <p className="mt-4 text-slate-600">
              The hold time on this reservation has expired. Please refresh and
              select dates again.
            </p>
            <button
              onClick={() => setIsModalOpen(false)}
              className="mt-6 rounded-full bg-[#037092] px-6 py-3 text-white hover:bg-[#035c73]"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
