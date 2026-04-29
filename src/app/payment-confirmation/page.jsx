'use client';

import { AuthContext } from '@/providers/AuthProvider';
import { useRouter } from 'next/navigation';
import { useContext, useEffect, useState } from 'react';

const formatAmount = (isPoints, amount) =>
  isPoints ? `${Number(amount || 0).toLocaleString()} RCI Points` : `$${Number(amount || 0).toFixed(2)} USD`;

export default function PaymentConfirmationPage() {
  const router = useRouter();
  const { user } = useContext(AuthContext);

  const [confirmationData, setConfirmationData] = useState(null);
  const [paymentData, setPaymentData] = useState(null);
  const [latestBooking, setLatestBooking] = useState(null);

  useEffect(() => {
    const confirmation = localStorage.getItem('confirmationData');
    const payment = localStorage.getItem('paymentData');

    if (confirmation) {
      setConfirmationData(JSON.parse(confirmation));
    }

    if (payment) {
      setPaymentData(JSON.parse(payment));
    }
  }, []);

  useEffect(() => {
    const fetchLatestBooking = async () => {
      if (!user?.email || !paymentData?.resort?.resort_ID) {
        return;
      }

      try {
        const response = await fetch(`/api/bookings?email=${encodeURIComponent(user.email)}`);
        if (!response.ok) {
          return;
        }

        const bookings = await response.json();
        const matchingBooking = bookings
          .filter((booking) => {
            const bookingResortId = booking.resort_ID || booking.resortId;
            return String(bookingResortId) === String(paymentData.resort.resort_ID);
          })
          .sort((a, b) => {
            const dateA = new Date(a.bookingDate || a.createdAt || 0).getTime();
            const dateB = new Date(b.bookingDate || b.createdAt || 0).getTime();
            return dateB - dateA;
          })[0];

        setLatestBooking(matchingBooking || null);
      } catch {
        setLatestBooking(null);
      }
    };

    fetchLatestBooking();
  }, [paymentData, user?.email]);

  if (!confirmationData || !paymentData) {
    return (
      <main className="min-h-screen bg-slate-50 px-4 py-10 md:px-6">
        <div className="mx-auto max-w-2xl rounded-2xl shadow-md p-6 bg-white text-center">
          <h1 className="text-2xl font-semibold text-slate-900">Confirmation unavailable</h1>
          <p className="mt-3 text-sm text-slate-600">
            Please complete the payment process first.
          </p>
        </div>
      </main>
    );
  }

  const billingInfo = paymentData.guestInfo
    ? { isGuest: true, ...paymentData.guestInfo }
    : paymentData.billingInfo;
  const isCash = confirmationData.paymentMethod === 'cash';
  const bookingReference = latestBooking?._id || 'Pending';
  const bookingDate = latestBooking?.bookingDate || latestBooking?.createdAt;

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-10 md:px-6">
      <div className="mx-auto max-w-4xl">
        <section className="rounded-2xl shadow-md p-6 bg-white text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-3xl text-green-600">
            OK
          </div>
          <h1 className="mt-4 text-3xl font-bold text-slate-900">Booking Confirmed!</h1>
          <p className="mt-2 text-sm font-semibold text-slate-600">
            {isCash ? 'Payment Confirmed' : 'Points Redeemed'}
          </p>
        </section>

        <section className="mt-6 rounded-2xl shadow-md p-4 bg-white">
          <h2 className="text-lg font-semibold text-slate-900">Billing Info</h2>
          <div className="mt-4 grid grid-cols-1 gap-3 md:grid-cols-2">
            {billingInfo ? (
              Object.entries(billingInfo)
                .filter(([key, value]) => !['agreeTerms', 'sendConfirmation', 'isGuest'].includes(key) && value)
                .map(([key, value]) => (
                  <div key={key} className="rounded-2xl border border-slate-200 p-4">
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">{key}</p>
                    <p className="mt-1 text-sm text-slate-700">{value}</p>
                  </div>
                ))
            ) : (
              <div className="rounded-2xl border border-slate-200 p-4 text-sm text-slate-600">
                Billing details were not provided.
              </div>
            )}
          </div>
        </section>

        {isCash && (
          <section className="mt-6 rounded-2xl shadow-md p-4 bg-white">
            <h2 className="text-lg font-semibold text-slate-900">Payment Info</h2>
            <div className="mt-4 rounded-2xl border border-slate-200 p-4">
              <p className="text-sm text-slate-500">Card ending in</p>
              <p className="mt-1 text-xl font-semibold text-slate-900">
                {paymentData.paymentDetails?.last4 || 'N/A'}
              </p>
            </div>
          </section>
        )}

        <section className="mt-6 rounded-2xl shadow-md p-4 bg-white">
          <h2 className="text-lg font-semibold text-slate-900">Booking Summary</h2>
          <div className="mt-4 space-y-3 text-sm text-slate-700">
            <div className="flex items-center justify-between gap-4">
              <span>Resort</span>
              <span className="text-right font-semibold text-slate-900">
                {confirmationData.resort?.place_name}
              </span>
            </div>
            <div className="flex items-center justify-between gap-4">
              <span>Email</span>
              <span className="text-right font-semibold text-slate-900">{user?.email || 'N/A'}</span>
            </div>
            <div className="flex items-center justify-between gap-4">
              <span>Amount</span>
              <span className="text-right font-semibold text-slate-900">
                {formatAmount(confirmationData.isPoints, confirmationData.amount)}
              </span>
            </div>
            <div className="flex items-center justify-between gap-4">
              <span>Payment method</span>
              <span className="text-right font-semibold capitalize text-slate-900">
                {confirmationData.paymentMethod}
              </span>
            </div>
            <div className="flex items-center justify-between gap-4">
              <span>Booking reference</span>
              <span className="text-right font-semibold text-slate-900">{bookingReference}</span>
            </div>
            {bookingDate && (
              <div className="flex items-center justify-between gap-4">
                <span>Booked on</span>
                <span className="text-right font-semibold text-slate-900">
                  {new Date(bookingDate).toLocaleDateString()}
                </span>
              </div>
            )}
          </div>
        </section>

        <div className="mt-6 flex flex-col gap-3 md:flex-row">
          <button
            type="button"
            onClick={() => router.push('/')}
            className="rounded-xl font-semibold py-3 px-6 transition-all duration-200 border border-slate-300 bg-white text-slate-900 hover:bg-slate-50"
          >
            Go to Homepage
          </button>
          <button
            type="button"
            onClick={() => router.push('/dashboard/overview')}
            className="rounded-xl font-semibold py-3 px-6 transition-all duration-200 bg-[#ffc445] text-slate-900 hover:bg-[#ffd166]"
          >
            View My Bookings
          </button>
        </div>
      </div>
    </main>
  );
}
