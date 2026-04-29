'use client';

import { AuthContext } from '@/providers/AuthProvider';
import { useRouter } from 'next/navigation';
import { useContext, useEffect, useState } from 'react';

const formatCardNumber = (value) => {
  return value.replace(/\s/g, '').replace(/(.{4})/g, '$1 ').trim().slice(0, 19);
};

const formatDate = (value) =>
  new Date(value).toLocaleDateString(undefined, {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });

export default function PaymentPage() {
  const router = useRouter();
  const { user } = useContext(AuthContext);

  const [paymentData, setPaymentData] = useState(null);
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [billingInfo, setBillingInfo] = useState({
    firstName: '',
    lastName: '',
    address1: '',
    address2: '',
    country: '',
    city: '',
    state: '',
    postalCode: '',
    phoneNumber: '',
  });
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const data = localStorage.getItem('paymentData');
    if (data) {
      setPaymentData(JSON.parse(data));
    }
  }, []);

  const handleBillingChange = (event) => {
    const { name, value } = event.target;
    setBillingInfo((prev) => ({ ...prev, [name]: value }));
  };

  const handleExpiryChange = (value) => {
    const digits = value.replace(/\D/g, '').slice(0, 4);
    if (digits.length <= 2) {
      setExpiryDate(digits);
      return;
    }

    setExpiryDate(`${digits.slice(0, 2)}/${digits.slice(2)}`);
  };

  const handleSubmit = async () => {
    if (!paymentData) {
      return;
    }

    const { resort, paymentMethod, price, points, guestInfo, startDate, endDate, unitType, nights } =
      paymentData;

    if (!user?.email) {
      setErrorMessage('Please sign in before confirming your booking.');
      return;
    }

    if (paymentMethod === 'cash' && (!cardNumber || !expiryDate || !cvv)) {
      setErrorMessage('Please enter complete card details.');
      return;
    }

    if (!guestInfo) {
      const requiredBillingFields = [
        'firstName',
        'lastName',
        'address1',
        'country',
        'city',
        'state',
        'postalCode',
        'phoneNumber',
      ];

      const hasMissingField = requiredBillingFields.some((field) => !billingInfo[field]);
      if (hasMissingField) {
        setErrorMessage('Please complete the billing information before continuing.');
        return;
      }
    }

    setErrorMessage('');
    setLoading(true);

    const bookingInfo = {
      resort,
      email: user?.email,
      paymentMethod,
      price: paymentMethod === 'cash' ? price : 0,
      points: paymentMethod === 'points' ? points : 0,
      startDate,
      endDate,
      unitType,
      nights,
      billingInfo: guestInfo ? { isGuest: true, ...guestInfo } : billingInfo,
      paymentDetails: paymentMethod === 'cash' ? { cardNumber, expiryDate, cvv } : null,
      resortId: resort?.resort_ID || resort?._id || resort?.id || '',
      resortName: resort?.place_name || '',
      checkIn: startDate,
      checkOut: endDate,
      totalPrice: paymentMethod === 'cash' ? price : 0,
      status: 'confirmed',
      bookingDate: new Date().toISOString(),
    };

    try {
      const res = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bookingInfo),
      });

      if (res.ok) {
        localStorage.setItem(
          'paymentData',
          JSON.stringify({
            ...paymentData,
            billingInfo: guestInfo ? { isGuest: true, ...guestInfo } : billingInfo,
            paymentDetails:
              paymentMethod === 'cash'
                ? {
                    cardNumber,
                    expiryDate,
                    cvv,
                    last4: cardNumber.replace(/\s/g, '').slice(-4),
                  }
                : null,
          }),
        );

        localStorage.setItem(
          'confirmationData',
          JSON.stringify({
            resort,
            paymentMethod,
            amount: paymentMethod === 'cash' ? price : points,
            isPoints: paymentMethod === 'points',
          }),
        );
        router.push('/payment-confirmation');
        return;
      }

      setErrorMessage('Unable to confirm the booking right now. Please try again.');
    } catch {
      setErrorMessage('Unable to confirm the booking right now. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (!paymentData) {
    return (
      <main className="min-h-screen bg-slate-50 px-4 py-10 md:px-6">
        <div className="mx-auto max-w-2xl rounded-2xl shadow-md p-6 bg-white text-center">
          <h1 className="text-2xl font-semibold text-slate-900">Payment details unavailable</h1>
          <p className="mt-3 text-sm text-slate-600">
            Please return to checkout and continue again.
          </p>
        </div>
      </main>
    );
  }

  const { resort, startDate, endDate, unitType, paymentMethod, price, points, nights, guestInfo } =
    paymentData;

  const totalLabel =
    paymentMethod === 'cash'
      ? `$${Number(price || 0).toFixed(2)}`
      : `${Number(points || 0).toLocaleString()} pts`;

  const summaryFields = guestInfo
    ? [
        ['Guest', `${guestInfo.firstName} ${guestInfo.lastName}`.trim()],
        ['Email', guestInfo.email || 'N/A'],
        ['Phone', guestInfo.phoneNumber || 'N/A'],
        ['Address', `${guestInfo.address1 || ''} ${guestInfo.address2 || ''}`.trim() || 'N/A'],
      ]
    : [];

  return (
    <main className="min-h-screen bg-slate-50 pb-28">
      <div className="mx-auto max-w-5xl px-4 py-6 md:px-6 md:py-10">
        <h1 className="text-3xl font-bold text-slate-900">
          {paymentMethod === 'cash' ? 'Confirm Payment' : 'Confirm Points Redemption'}
        </h1>

        <section className="mt-6 rounded-2xl shadow-md p-4 bg-white">
          {paymentMethod === 'cash' ? (
            <>
              <h2 className="text-lg font-semibold text-slate-900">Card Details</h2>
              <div className="mt-4 rounded-2xl border border-slate-200 p-4">
                <label className="block text-sm font-medium text-slate-700">
                  Card Number
                  <input
                    type="text"
                    inputMode="numeric"
                    value={cardNumber}
                    onChange={(event) => setCardNumber(formatCardNumber(event.target.value))}
                    placeholder="XXXX XXXX XXXX XXXX"
                    className="mt-2 rounded-lg border border-gray-300 p-3 w-full focus:outline-none focus:ring-2 focus:ring-[#037092]"
                  />
                </label>
              </div>

              <div className="mt-4 grid grid-cols-2 gap-4">
                <label className="text-sm font-medium text-slate-700">
                  Expiry MM/YY
                  <input
                    type="text"
                    inputMode="numeric"
                    value={expiryDate}
                    onChange={(event) => handleExpiryChange(event.target.value)}
                    placeholder="MM/YY"
                    className="mt-2 rounded-lg border border-gray-300 p-3 w-full focus:outline-none focus:ring-2 focus:ring-[#037092]"
                  />
                </label>
                <label className="text-sm font-medium text-slate-700">
                  CVV
                  <input
                    type="password"
                    inputMode="numeric"
                    value={cvv}
                    onChange={(event) => setCvv(event.target.value.replace(/\D/g, '').slice(0, 4))}
                    placeholder="XXX"
                    className="mt-2 rounded-lg border border-gray-300 p-3 w-full focus:outline-none focus:ring-2 focus:ring-[#037092]"
                  />
                </label>
              </div>

              <div className="mt-4 flex flex-wrap gap-3">
                <span className="rounded-full border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700">
                  Visa
                </span>
                <span className="rounded-full border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700">
                  Mastercard
                </span>
              </div>
            </>
          ) : (
            <div className="rounded-2xl border border-[#037092]/20 bg-[#e6f8fc] p-5">
              <h2 className="text-lg font-semibold text-[#037092]">Points confirmation box</h2>
              <p className="mt-2 text-sm text-slate-700">
                You are redeeming {Number(points || 0).toLocaleString()} RCI Points.
              </p>
              <p className="mt-1 text-sm text-slate-600">No card fields are required for this flow.</p>
            </div>
          )}
        </section>

        {!guestInfo ? (
          <section className="mt-6 rounded-2xl shadow-md p-4 bg-white">
            <h2 className="text-lg font-semibold text-slate-900">Billing Info</h2>
            <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
              {[
                ['firstName', 'First Name'],
                ['lastName', 'Last Name'],
                ['address1', 'Address 1'],
                ['address2', 'Address 2'],
                ['country', 'Country'],
                ['city', 'City'],
                ['state', 'State'],
                ['postalCode', 'Postal Code'],
                ['phoneNumber', 'Phone Number'],
              ].map(([name, label]) => (
                <label key={name} className="text-sm font-medium text-slate-700">
                  {label}
                  <input
                    type="text"
                    name={name}
                    value={billingInfo[name]}
                    onChange={handleBillingChange}
                    className="mt-2 rounded-lg border border-gray-300 p-3 w-full focus:outline-none focus:ring-2 focus:ring-[#037092]"
                  />
                </label>
              ))}
            </div>
          </section>
        ) : (
          <section className="mt-6 rounded-2xl shadow-md p-4 bg-white">
            <h2 className="text-lg font-semibold text-slate-900">Billing Info</h2>
            <p className="mt-2 text-sm text-slate-600">
              Guest information from checkout will be used for billing and confirmation.
            </p>
            <div className="mt-4 grid grid-cols-1 gap-3 md:grid-cols-2">
              {summaryFields.map(([label, value]) => (
                <div key={label} className="rounded-2xl border border-slate-200 p-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">{label}</p>
                  <p className="mt-1 text-sm text-slate-700">{value}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        <section className="mt-6 rounded-2xl shadow-md p-4 bg-white">
          <h2 className="text-lg font-semibold text-slate-900">Booking Summary Box</h2>
          <div className="mt-4 space-y-3 text-sm text-slate-700">
            <div className="flex items-center justify-between gap-4">
              <span>Resort</span>
              <span className="text-right font-semibold text-slate-900">{resort?.place_name}</span>
            </div>
            <div className="flex items-center justify-between gap-4">
              <span>Unit</span>
              <span className="text-right font-semibold text-slate-900">{unitType}</span>
            </div>
            <div className="flex items-center justify-between gap-4">
              <span>Dates</span>
              <span className="text-right font-semibold text-slate-900">
                {formatDate(startDate)} - {formatDate(endDate)}
              </span>
            </div>
            <div className="flex items-center justify-between gap-4">
              <span>Nights</span>
              <span className="text-right font-semibold text-slate-900">{nights}</span>
            </div>
            <div className="flex items-center justify-between gap-4">
              <span>Total</span>
              <span className="text-right text-lg font-bold text-[#037092]">{totalLabel}</span>
            </div>
          </div>
        </section>

        {errorMessage && (
          <div className="mt-6 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {errorMessage}
          </div>
        )}
      </div>

      <div className="sticky bottom-0 z-20 border-t border-slate-200 bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-5xl flex-col gap-4 px-4 py-4 md:flex-row md:items-center md:justify-between md:px-6">
          <div>
            <p className="text-sm text-slate-500">Total</p>
            <p className="text-xl font-bold text-slate-900">{totalLabel}</p>
          </div>
          <button
            type="button"
            onClick={handleSubmit}
            disabled={loading}
            className="flex items-center justify-center gap-2 rounded-xl font-semibold py-3 px-6 transition-all duration-200 bg-[#ffc445] text-slate-900 hover:bg-[#ffd166] disabled:cursor-not-allowed disabled:opacity-70"
          >
            {loading && (
              <span className="h-4 w-4 animate-spin rounded-full border-2 border-slate-900 border-t-transparent" />
            )}
            {paymentMethod === 'cash' ? 'Confirm Payment' : 'Confirm Points Redemption'}
          </button>
        </div>
      </div>
    </main>
  );
}
