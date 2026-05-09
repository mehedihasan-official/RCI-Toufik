'use client';

import GuestInfo from '@/components/GuestInfo';
import SafeImage from '@/components/SafeImage';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const getTaxInclusivePrice = (base) => ({ 309: 329.08, 339: 361.02, 379: 403.63 }[base] || base);

const getResortImage = (resort) => {
  if (!resort) {
    return '';
  }

  const imageKeys = Object.keys(resort).filter((key) => key.startsWith('img'));
  const image = imageKeys.map((key) => resort[key]).find(Boolean);
  return image || resort.img || '';
};

const formatDate = (value) =>
  new Date(value).toLocaleDateString(undefined, {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });

export default function CheckoutPage() {
  const router = useRouter();
  const [checkoutDetails, setCheckoutDetails] = useState(null);
  const [selectedOption, setSelectedOption] = useState('RCI Member');
  const [guestInfo, setGuestInfo] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const data = localStorage.getItem('checkoutDetails');
    if (data) {
      setCheckoutDetails(JSON.parse(data));
    }
  }, []);

  const handleContinue = () => {
    if (!checkoutDetails) {
      return;
    }

    if (selectedOption === 'A Guest') {
      const requiredFields = [
        'firstName',
        'lastName',
        'address1',
        'country',
        'city',
        'postalCode',
        'email',
        'phoneNumber',
        'agreeTerms',
      ];

      const hasMissingField = requiredFields.some((field) => !guestInfo?.[field]);
      if (hasMissingField) {
        setErrorMessage('Please complete the guest information form before continuing.');
        return;
      }
    }

    setErrorMessage('');

    const {
      resort,
      startDate,
      endDate,
      unitType,
      paymentMethod,
      price,
      points,
      nights,
      weekendSurcharge,
      basePoints,
      weekendNights,
    } = checkoutDetails;

    localStorage.setItem(
      'paymentData',
      JSON.stringify({
        resort,
        startDate,
        endDate,
        unitType,
        paymentMethod,
        price: paymentMethod === 'cash' ? price : 0,
        points: paymentMethod === 'points' ? points : 0,
        isGuest: selectedOption === 'A Guest' ? 'True' : 'False',
        guestInfo: selectedOption === 'A Guest' ? guestInfo : null,
        nights,
        weekendSurcharge,
        basePoints,
        weekendNights,
      }),
    );
    router.push('/payment');
  };

  if (!checkoutDetails) {
    return (
      <main className="min-h-screen bg-slate-50 px-4 py-10 md:px-6">
        <div className="mx-auto max-w-2xl rounded-2xl shadow-md p-6 bg-white text-center">
          <h1 className="text-2xl font-semibold text-slate-900">Checkout unavailable</h1>
          <p className="mt-3 text-sm text-slate-600">
            Please return to the booking page and try again.
          </p>
        </div>
      </main>
    );
  }

  const {
    resort,
    startDate,
    endDate,
    unitType,
    paymentMethod,
    price,
    points,
    nights,
    basePrice,
  } = checkoutDetails;

  const resortImage = getResortImage(resort);
  const totalCashPrice = paymentMethod === 'cash' ? getTaxInclusivePrice(basePrice || price) : 0;
  const totalLabel =
    paymentMethod === 'cash'
      ? `$${Number(totalCashPrice || price || 0).toFixed(2)} USD`
      : `${Number(points || 0).toLocaleString()} RCI Points`;

  return (
    <main className="min-h-screen bg-slate-50 pb-28">
      <div className="mx-auto max-w-5xl px-4 py-6 md:px-6 md:py-10">
        <h1 className="text-3xl font-bold text-slate-900">Checkout</h1>

        <section className="mt-6 rounded-2xl shadow-md p-4 bg-white">
          <div className="overflow-hidden rounded-2xl bg-slate-100 h-48">
            <SafeImage
              src={resortImage}
              alt={resort?.place_name || "Resort"}
              seed={resort?._id || resort?.resort_ID || resort?.place_name}
              className="h-full w-full object-cover"
            />
          </div>
          <div className="mt-4">
            <p className="text-sm text-slate-500">{resort?.location}</p>
            <h2 className="mt-1 text-2xl font-semibold text-slate-900">{resort?.place_name}</h2>
            <p className="mt-1 text-sm text-slate-500">Resort ID {resort?.resort_ID || 'N/A'}</p>
            <div className="mt-4 grid gap-3 md:grid-cols-3">
              <div className="rounded-2xl border border-slate-200 p-4">
                <p className="text-sm text-slate-500">Travel dates</p>
                <p className="mt-1 font-semibold text-slate-900">
                  {formatDate(startDate)} - {formatDate(endDate)}
                </p>
              </div>
              <div className="rounded-2xl border border-slate-200 p-4">
                <p className="text-sm text-slate-500">Check-in / Check-out</p>
                <p className="mt-1 font-semibold text-slate-900">
                  {formatDate(startDate)} / {formatDate(endDate)}
                </p>
              </div>
              <div className="rounded-2xl border border-slate-200 p-4">
                <p className="text-sm text-slate-500">Unit & stay</p>
                <p className="mt-1 font-semibold text-slate-900">
                  {unitType} - {nights} nights
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="mt-6 rounded-2xl shadow-md p-4 bg-white">
          <h2 className="text-lg font-semibold text-slate-900">Payment Method</h2>
          <div className="mt-4 rounded-2xl border border-slate-200 p-4">
            {paymentMethod === 'cash' ? (
              <>
                <p className="text-lg font-semibold text-[#f59e0b]">Cash Payment</p>
                <p className="mt-2 text-sm text-slate-600">
                  Total: ${Number(totalCashPrice || price || 0).toFixed(2)} USD (tax included)
                </p>
              </>
            ) : (
              <>
                <p className="text-lg font-semibold text-[#037092]">Points Payment</p>
                <p className="mt-2 text-sm text-slate-600">
                  Total: {Number(points || 0).toLocaleString()} RCI Points
                </p>
              </>
            )}
          </div>
        </section>

        <section className="mt-6 rounded-2xl shadow-md p-4 bg-white">
          <h2 className="text-lg font-semibold text-slate-900">Who&apos;s Checking In?</h2>
          <div className="mt-4 grid grid-cols-2 gap-4">
            {['RCI Member', 'A Guest'].map((option) => {
              const isSelected = selectedOption === option;
              return (
                <button
                  key={option}
                  type="button"
                  onClick={() => setSelectedOption(option)}
                  className={`rounded-2xl border p-4 text-left transition-all duration-200 ${
                    isSelected
                      ? 'border-[#037092] bg-[#e6f8fc]'
                      : 'border-slate-200 bg-white hover:border-[#037092]/50'
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-base font-semibold text-slate-900">{option}</p>
                      <p className="mt-1 text-sm text-slate-600">
                        {option === 'RCI Member'
                          ? 'Use the member account for check-in.'
                          : 'Enter separate guest details for this booking.'}
                      </p>
                    </div>
                    {isSelected && (
                      <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-[#037092] text-sm font-bold text-white">
                        OK
                      </span>
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </section>

        {selectedOption === 'A Guest' && (
          <section className="mt-6 rounded-2xl shadow-md p-4 bg-white">
            <GuestInfo onGuestInfoChange={setGuestInfo} />
          </section>
        )}

        {errorMessage && (
          <div className="mt-6 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {errorMessage}
          </div>
        )}
      </div>

      <div className="sticky bottom-0 z-20 border-t border-slate-200 bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-5xl flex-col gap-4 px-4 py-4 md:flex-row md:items-center md:justify-between md:px-6">
          <div>
            <p className="text-sm text-slate-500">Total amount</p>
            <p className="text-xl font-bold text-slate-900">{totalLabel}</p>
          </div>
          <button
            type="button"
            onClick={handleContinue}
            className="rounded-xl font-semibold py-3 px-6 transition-all duration-200 bg-[#ffc445] text-slate-900 hover:bg-[#ffd166]"
          >
            Continue
          </button>
        </div>
      </div>
    </main>
  );
}