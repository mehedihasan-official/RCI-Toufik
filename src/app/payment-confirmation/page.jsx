"use client";

import { AuthContext } from "@/providers/AuthProvider";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";

export default function PaymentConfirmationPage() {
  const router = useRouter();
  const { user } = useContext(AuthContext);
  const [confirmationDetails, setConfirmationDetails] = useState(null);
  const [paymentDetails, setPaymentDetails] = useState(null);
  const [matchingBooking, setMatchingBooking] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const rawConfirmation = localStorage.getItem("confirmationDetails");
    const rawPayment = localStorage.getItem("paymentDetails");
    if (rawConfirmation) {
      try {
        setConfirmationDetails(JSON.parse(rawConfirmation));
      } catch (error) {
        console.error(error);
      }
    }
    if (rawPayment) {
      try {
        setPaymentDetails(JSON.parse(rawPayment));
      } catch (error) {
        console.error(error);
      }
    }
  }, []);

  useEffect(() => {
    const fetchBookings = async () => {
      if (!user?.email) {
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(
          `/api/bookings?email=${encodeURIComponent(user.email)}`,
        );
        if (!response.ok) {
          throw new Error("Unable to load bookings.");
        }

        const bookings = await response.json();
        const resortId =
          paymentDetails?.resort?.resort_ID ||
          paymentDetails?.resort?._id ||
          "";
        const matched = bookings
          .filter((booking) => booking.resortId === resortId)
          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

        setMatchingBooking(matched[0] || null);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    if (user?.email && paymentDetails) {
      fetchBookings();
    } else {
      setLoading(false);
    }
  }, [user?.email, paymentDetails]);

  const booking = matchingBooking || paymentDetails;

  if (!confirmationDetails || !paymentDetails) {
    return (
      <main className="min-h-screen bg-slate-50 px-6 py-20">
        <div className="mx-auto max-w-3xl rounded-3xl border border-slate-200 bg-white p-10 text-center shadow-sm">
          <h2 className="text-2xl font-semibold text-slate-900">
            Confirmation unavailable
          </h2>
          <p className="mt-4 text-slate-600">
            Please complete the payment process first.
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50 px-6 py-10">
      <div className="mx-auto max-w-6xl space-y-8">
        <div className="rounded-3xl bg-white p-10 shadow-sm">
          <p className="text-sm uppercase tracking-[0.2em] text-slate-500">
            Payment confirmed
          </p>
          <h1 className="mt-4 text-4xl font-semibold text-[#037092]">
            Booking confirmed
          </h1>
          <p className="mt-2 text-slate-600">
            Thank you for your reservation. Your travel details are below.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          <div className="rounded-3xl bg-white p-6 shadow-sm">
            <p className="text-sm uppercase tracking-[0.2em] text-slate-500">
              Resort
            </p>
            <h2 className="mt-3 text-2xl font-semibold text-slate-900">
              {paymentDetails.resort?.place_name}
            </h2>
            <p className="mt-2 text-slate-600">
              {paymentDetails.resort?.location}
            </p>
            <div className="mt-5 space-y-3 text-slate-700">
              <div className="flex items-center justify-between border-t border-slate-200 pt-3">
                <span>Unit type</span>
                <span>{paymentDetails.unitType}</span>
              </div>
              <div className="flex items-center justify-between border-t border-slate-200 pt-3">
                <span>Check-in</span>
                <span>
                  {new Date(paymentDetails.startDate).toLocaleDateString()}
                </span>
              </div>
              <div className="flex items-center justify-between border-t border-slate-200 pt-3">
                <span>Check-out</span>
                <span>
                  {new Date(paymentDetails.endDate).toLocaleDateString()}
                </span>
              </div>
            </div>
          </div>

          <div className="rounded-3xl bg-white p-6 shadow-sm">
            <p className="text-sm uppercase tracking-[0.2em] text-slate-500">
              Payment
            </p>
            <div className="mt-3 space-y-3 text-slate-700">
              <div className="flex items-center justify-between">
                <span>Method</span>
                <span className="font-semibold text-slate-900">
                  {confirmationDetails.paymentMethod}
                </span>
              </div>
              {confirmationDetails.isPoints ? (
                <div className="flex items-center justify-between">
                  <span>Points used</span>
                  <span className="font-semibold text-slate-900">
                    {confirmationDetails.amount?.toLocaleString()}
                  </span>
                </div>
              ) : (
                <div className="flex items-center justify-between">
                  <span>Amount charged</span>
                  <span className="font-semibold text-slate-900">
                    ${confirmationDetails.amount?.toFixed(2)}
                  </span>
                </div>
              )}
            </div>
          </div>

          <div className="rounded-3xl bg-white p-6 shadow-sm">
            <p className="text-sm uppercase tracking-[0.2em] text-slate-500">
              Guest details
            </p>
            <div className="mt-5 space-y-3 text-slate-700">
              {confirmationDetails.guestInfo ? (
                <>
                  <div>
                    <p className="font-semibold text-slate-900">
                      {confirmationDetails.guestInfo.firstName}{" "}
                      {confirmationDetails.guestInfo.lastName}
                    </p>
                    <p>{confirmationDetails.guestInfo.email}</p>
                    <p>{confirmationDetails.guestInfo.phoneNumber}</p>
                  </div>
                </>
              ) : (
                <p className="text-slate-600">Booked under your account.</p>
              )}
            </div>
          </div>
        </div>

        {booking && (
          <div className="rounded-3xl bg-white p-8 shadow-sm">
            <p className="text-sm uppercase tracking-[0.2em] text-slate-500">
              Booking reference
            </p>
            <div className="mt-4 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-lg font-semibold text-slate-900">
                  {booking._id || "—"}
                </p>
                <p className="mt-2 text-sm text-slate-600">
                  Latest matching reservation from your account.
                </p>
              </div>
              <div>
                <p className="text-sm text-slate-600">Booked on</p>
                <p className="text-lg font-semibold text-slate-900">
                  {booking.createdAt
                    ? new Date(booking.createdAt).toLocaleDateString()
                    : "—"}
                </p>
              </div>
            </div>
          </div>
        )}

        <div className="flex flex-col gap-4 sm:flex-row sm:justify-end">
          <button
            type="button"
            onClick={() => router.push("/")}
            className="rounded-full border border-slate-300 bg-white px-6 py-3 text-slate-700 hover:bg-slate-50"
          >
            Go to Homepage
          </button>
          <button
            type="button"
            onClick={() => router.push("/dashboard/overview")}
            className="rounded-full bg-[#ffc445] px-6 py-3 text-slate-900 hover:bg-[#ffcd59]"
          >
            View My Bookings
          </button>
        </div>
      </div>
    </main>
  );
}
