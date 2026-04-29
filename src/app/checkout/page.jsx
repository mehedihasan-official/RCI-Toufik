"use client";

import GuestInfo from "@/components/GuestInfo";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

const getTaxInclusivePrice = (basePrice) => {
  switch (basePrice) {
    case 309:
      return 329.08;
    case 339:
      return 361.02;
    case 379:
      return 403.63;
    default:
      return basePrice;
  }
};

const calculateNights = (startDate, endDate) =>
  Math.ceil((new Date(endDate) - new Date(startDate)) / (1000 * 60 * 60 * 24));

export default function CheckoutPage() {
  const router = useRouter();
  const [checkoutDetails, setCheckoutDetails] = useState(null);
  const [selectedOption, setSelectedOption] = useState(null);
  const [guestInfo, setGuestInfo] = useState(null);
  const [formError, setFormError] = useState("");

  useEffect(() => {
    if (typeof window === "undefined") return;
    const raw = localStorage.getItem("checkoutDetails");
    if (!raw) return;

    try {
      setCheckoutDetails(JSON.parse(raw));
    } catch (error) {
      console.error("Unable to parse checkout details", error);
    }
  }, []);

  useEffect(() => {
    if (selectedOption !== "A Guest") {
      setGuestInfo(null);
    }
  }, [selectedOption]);

  const nights = useMemo(() => {
    if (!checkoutDetails) return 0;
    return calculateNights(checkoutDetails.startDate, checkoutDetails.endDate);
  }, [checkoutDetails]);

  const taxInclusivePrice = useMemo(() => {
    if (!checkoutDetails) return 0;
    return getTaxInclusivePrice(checkoutDetails.price || 0);
  }, [checkoutDetails]);

  const handleContinue = () => {
    setFormError("");
    if (!selectedOption) {
      setFormError("Please choose who is checking in.");
      return;
    }

    if (selectedOption === "A Guest") {
      const requiredFields = [
        "firstName",
        "lastName",
        "address1",
        "country",
        "city",
        "postalCode",
        "email",
        "phoneNumber",
        "agreeTerms",
      ];

      const missing = requiredFields.some(
        (field) => !guestInfo?.[field] || guestInfo[field] === false,
      );

      if (missing) {
        setFormError("Please complete the guest information form.");
        return;
      }
    }

    const paymentDetails = {
      resort: checkoutDetails?.resort,
      startDate: checkoutDetails?.startDate,
      endDate: checkoutDetails?.endDate,
      unitType: checkoutDetails?.unitType,
      price:
        checkoutDetails?.vacationType === "lastCall" ? taxInclusivePrice : 0,
      points: checkoutDetails?.points || 0,
      paymentMethod:
        checkoutDetails?.vacationType === "lastCall" ? "cash" : "points",
      totalPoints: checkoutDetails?.points || 0,
      nights,
      pointsPerNight: checkoutDetails?.pointsPerNight || 0,
      weekendSurcharge: checkoutDetails?.weekendSurcharge || 0,
      isGuest: selectedOption === "A Guest" ? "True" : "False",
      guestInfo: selectedOption === "A Guest" ? guestInfo : null,
    };

    localStorage.setItem("paymentDetails", JSON.stringify(paymentDetails));
    router.push("/payment");
  };

  if (!checkoutDetails) {
    return (
      <main className="min-h-screen bg-slate-50 px-6 py-20">
        <div className="mx-auto max-w-3xl rounded-3xl border border-slate-200 bg-white p-10 text-center shadow-sm">
          <h2 className="text-2xl font-semibold text-slate-900">
            No checkout details found
          </h2>
          <p className="mt-4 text-slate-600">
            Please complete your booking selection before continuing.
          </p>
        </div>
      </main>
    );
  }

  const paymentMethod =
    checkoutDetails.vacationType === "lastCall" ? "cash" : "points";

  return (
    <main className="min-h-screen bg-slate-50 px-6 py-10">
      <div className="mx-auto max-w-6xl space-y-8">
        <div className="grid gap-6 lg:grid-cols-[1.25fr_0.85fr]">
          <div className="space-y-6 rounded-3xl bg-white p-8 shadow-sm">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-sm uppercase tracking-[0.2em] text-slate-500">
                  Reservation details
                </p>
                <h1 className="mt-2 text-3xl font-semibold text-[#037092]">
                  Checkout
                </h1>
              </div>
              <div className="rounded-3xl bg-[#e6f8fc] px-5 py-4 text-slate-700">
                <p className="text-sm">Payment method</p>
                <p className="mt-2 text-lg font-semibold text-[#037092]">
                  {paymentMethod === "cash" ? "Cash" : "Points"}
                </p>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-3xl border border-slate-200 bg-[#f8fbfc] p-6">
                <p className="text-sm uppercase tracking-[0.2em] text-slate-500">
                  Resort
                </p>
                <p className="mt-2 text-xl font-semibold text-slate-900">
                  {checkoutDetails.resort?.place_name}
                </p>
                <p className="mt-2 text-slate-600">
                  {checkoutDetails.resort?.location}
                </p>
              </div>
              <div className="rounded-3xl border border-slate-200 bg-[#f8fbfc] p-6">
                <p className="text-sm uppercase tracking-[0.2em] text-slate-500">
                  Unit
                </p>
                <p className="mt-2 text-xl font-semibold text-slate-900">
                  {checkoutDetails.unitType}
                </p>
                <p className="mt-2 text-slate-600">
                  {new Date(checkoutDetails.startDate).toLocaleDateString()} -{" "}
                  {new Date(checkoutDetails.endDate).toLocaleDateString()}
                </p>
                <p className="mt-3 text-sm text-slate-500">{nights} nights</p>
              </div>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-[#f8fbfc] p-6">
              <p className="text-sm uppercase tracking-[0.2em] text-slate-500">
                Who's Checking-in?
              </p>
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                {[
                  { label: "RCI Member", value: "RCI Member" },
                  { label: "A Guest", value: "A Guest" },
                ].map((option) => (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => setSelectedOption(option.value)}
                    className={`rounded-3xl border p-5 text-left transition ${
                      selectedOption === option.value
                        ? "border-[#037092] bg-[#e6f8fc]"
                        : "border-slate-200 bg-white"
                    }`}
                  >
                    <div className="flex items-center justify-between gap-4">
                      <div>
                        <p className="text-lg font-semibold text-slate-900">
                          {option.label}
                        </p>
                        <p className="mt-1 text-sm text-slate-600">
                          {option.value === "RCI Member"
                            ? "Your account will be used for booking."
                            : "Provide guest details to complete booking."}
                        </p>
                      </div>
                      {selectedOption === option.value && (
                        <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-[#037092] text-white">
                          ✓
                        </span>
                      )}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {selectedOption === "A Guest" && (
              <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                <GuestInfo onGuestInfoChange={setGuestInfo} />
              </div>
            )}
          </div>

          <aside className="space-y-6 rounded-3xl bg-white p-8 shadow-sm">
            <div className="rounded-3xl border border-slate-200 bg-[#f8fbfc] p-6">
              <p className="text-sm uppercase tracking-[0.2em] text-slate-500">
                Booking summary
              </p>
              <div className="mt-4 space-y-3">
                <div className="flex items-center justify-between text-slate-600">
                  <span>Base price</span>
                  <span>${checkoutDetails.price?.toFixed(2) || "0.00"}</span>
                </div>
                <div className="flex items-center justify-between text-slate-600">
                  <span>Tax inclusive</span>
                  <span>${taxInclusivePrice.toFixed(2)}</span>
                </div>
                {paymentMethod === "points" && (
                  <div className="flex items-center justify-between text-slate-600">
                    <span>Points total</span>
                    <span>{checkoutDetails.points?.toLocaleString() || 0}</span>
                  </div>
                )}
              </div>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-white p-6">
              <p className="text-sm uppercase tracking-[0.2em] text-slate-500">
                Total due
              </p>
              <p className="mt-3 text-3xl font-semibold text-slate-900">
                {paymentMethod === "cash"
                  ? `$${taxInclusivePrice.toFixed(2)}`
                  : `${checkoutDetails.points?.toLocaleString() || 0} points`}
              </p>
            </div>

            {formError && (
              <div className="rounded-3xl bg-red-50 p-4 text-sm text-red-700">
                {formError}
              </div>
            )}
          </aside>
        </div>

        <div className="sticky bottom-0 z-20 mx-auto max-w-6xl rounded-t-3xl bg-slate-50 px-6 py-5 shadow-inner sm:px-10">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm text-slate-600">Ready for payment</p>
              <p className="text-xl font-semibold text-slate-900">
                {paymentMethod === "cash"
                  ? `$${taxInclusivePrice.toFixed(2)}`
                  : `${checkoutDetails.points?.toLocaleString() || 0} points`}
              </p>
            </div>
            <button
              type="button"
              onClick={handleContinue}
              className="rounded-full bg-[#ffc445] px-8 py-4 text-base font-semibold text-slate-900 hover:bg-[#ffcd59]"
            >
              Continue to Payment
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
