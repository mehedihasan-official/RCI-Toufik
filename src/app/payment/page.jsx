"use client";

import { AuthContext } from "@/providers/AuthProvider";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";

export default function PaymentPage() {
  const router = useRouter();
  const { user } = useContext(AuthContext);

  const [paymentDetails, setPaymentDetails] = useState(null);
  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");
  const [billingInfo, setBillingInfo] = useState({
    fullName: "",
    address1: "",
    address2: "",
    country: "",
    city: "",
    postalCode: "",
    email: "",
    phoneNumber: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (typeof window === "undefined") return;
    const raw = localStorage.getItem("paymentDetails");
    if (!raw) return;

    try {
      const parsed = JSON.parse(raw);
      setPaymentDetails(parsed);
      if (!parsed.guestInfo) {
        setBillingInfo((prev) => ({
          ...prev,
          email: parsed.resort?.email || prev.email,
        }));
      }
    } catch (err) {
      console.error("Unable to parse payment details", err);
    }
  }, []);

  const handleBillingChange = (event) => {
    const { name, value } = event.target;
    setBillingInfo((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");

    if (!paymentDetails) {
      setError("Payment details are missing.");
      return;
    }

    const { resort, paymentMethod, price, points, guestInfo, nights } =
      paymentDetails;

    if (paymentMethod === "cash") {
      if (!cardNumber || !expiryDate || !cvv) {
        setError("Please complete payment card details.");
        return;
      }
    }

    if (!user?.email) {
      setError("Please sign in to complete your booking.");
      return;
    }

    setLoading(true);

    const bookingInfo = {
      email: user.email,
      resortId: resort?.resort_ID || resort?._id || resort?.id || "",
      resortName: resort?.place_name || resort?.name || "",
      checkIn: paymentDetails.startDate,
      checkOut: paymentDetails.endDate,
      totalPrice: paymentMethod === "cash" ? price : 0,
      status: "confirmed",
      bookingMeta: {
        paymentMethod,
        points: paymentMethod === "points" ? points : 0,
        nights,
        unitType: paymentDetails.unitType,
      },
    };

    try {
      const response = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bookingInfo),
      });

      if (!response.ok) {
        const message = await response.text();
        throw new Error(message || "Failed to save booking.");
      }

      localStorage.setItem(
        "confirmationDetails",
        JSON.stringify({
          resort,
          paymentMethod,
          amount: paymentMethod === "cash" ? price : points,
          isPoints: paymentMethod === "points",
          guestInfo: guestInfo || null,
          billingInfo: guestInfo
            ? { isGuest: true, ...guestInfo }
            : billingInfo,
        }),
      );

      router.push("/payment-confirmation");
    } catch (err) {
      console.error(err);
      setError("Unable to complete payment. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (!paymentDetails) {
    return (
      <main className="min-h-screen bg-slate-50 px-6 py-20">
        <div className="mx-auto max-w-3xl rounded-3xl border border-slate-200 bg-white p-10 text-center shadow-sm">
          <h2 className="text-2xl font-semibold text-slate-900">
            Missing payment details
          </h2>
          <p className="mt-4 text-slate-600">
            Please return to checkout to complete your booking.
          </p>
        </div>
      </main>
    );
  }

  const { resort, paymentMethod, price, points, guestInfo, totalPoints } =
    paymentDetails;

  return (
    <main className="min-h-screen bg-slate-50 px-6 py-10">
      <div className="mx-auto max-w-6xl space-y-8">
        <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="rounded-3xl bg-white p-8 shadow-sm">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-sm uppercase tracking-[0.2em] text-slate-500">
                  Payment details
                </p>
                <h1 className="mt-2 text-3xl font-semibold text-[#037092]">
                  Payment
                </h1>
              </div>
              <div className="rounded-3xl bg-[#e6f8fc] px-5 py-4 text-slate-700">
                <p className="text-sm">Method</p>
                <p className="mt-2 text-lg font-semibold text-[#037092]">
                  {paymentMethod === "cash" ? "Cash" : "Points"}
                </p>
              </div>
            </div>

            {paymentMethod === "cash" && (
              <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                <div className="grid gap-4 md:grid-cols-3">
                  <label className="space-y-2 text-sm text-slate-600">
                    Card number
                    <input
                      name="cardNumber"
                      value={cardNumber}
                      onChange={(event) => setCardNumber(event.target.value)}
                      className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none focus:border-[#037092]"
                      placeholder="1234 5678 9012 3456"
                    />
                  </label>
                  <label className="space-y-2 text-sm text-slate-600">
                    Expiry date
                    <input
                      name="expiryDate"
                      value={expiryDate}
                      onChange={(event) => setExpiryDate(event.target.value)}
                      className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none focus:border-[#037092]"
                      placeholder="MM/YY"
                    />
                  </label>
                  <label className="space-y-2 text-sm text-slate-600">
                    CVV
                    <input
                      name="cvv"
                      value={cvv}
                      onChange={(event) => setCvv(event.target.value)}
                      className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none focus:border-[#037092]"
                      placeholder="123"
                    />
                  </label>
                </div>
              </form>
            )}

            {!guestInfo && paymentMethod === "cash" && (
              <div className="mt-8 rounded-3xl border border-slate-200 bg-[#f8fbfc] p-6">
                <p className="text-sm uppercase tracking-[0.2em] text-slate-500">
                  Billing information
                </p>
                <div className="mt-4 grid gap-4 sm:grid-cols-2">
                  {Object.entries(billingInfo).map(([key, value]) => (
                    <div key={key} className="rounded-3xl bg-white p-4">
                      <p className="text-xs uppercase tracking-[0.2em] text-slate-400">
                        {key}
                      </p>
                      <p className="mt-2 text-sm text-slate-700">
                        {value || "—"}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {guestInfo && (
              <div className="mt-8 rounded-3xl border border-slate-200 bg-[#f8fbfc] p-6">
                <p className="text-sm uppercase tracking-[0.2em] text-slate-500">
                  Guest billing info
                </p>
                <div className="mt-4 grid gap-4 sm:grid-cols-2">
                  <div className="rounded-3xl bg-white p-4">
                    <p className="text-xs uppercase tracking-[0.2em] text-slate-400">
                      Name
                    </p>
                    <p className="mt-2 text-sm text-slate-700">
                      {guestInfo.firstName} {guestInfo.lastName}
                    </p>
                  </div>
                  <div className="rounded-3xl bg-white p-4">
                    <p className="text-xs uppercase tracking-[0.2em] text-slate-400">
                      Email
                    </p>
                    <p className="mt-2 text-sm text-slate-700">
                      {guestInfo.email}
                    </p>
                  </div>
                  <div className="rounded-3xl bg-white p-4 sm:col-span-2">
                    <p className="text-xs uppercase tracking-[0.2em] text-slate-400">
                      Address
                    </p>
                    <p className="mt-2 text-sm text-slate-700">
                      {guestInfo.address1}
                      {guestInfo.address2 ? `, ${guestInfo.address2}` : ""}
                    </p>
                    <p className="mt-2 text-sm text-slate-700">
                      {guestInfo.city}, {guestInfo.country}{" "}
                      {guestInfo.postalCode}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {error && (
              <div className="mt-6 rounded-3xl bg-red-50 p-4 text-sm text-red-700">
                {error}
              </div>
            )}
          </div>

          <aside className="space-y-6 rounded-3xl bg-white p-8 shadow-sm">
            <div className="rounded-3xl border border-slate-200 bg-[#f8fbfc] p-6">
              <p className="text-sm uppercase tracking-[0.2em] text-slate-500">
                Booking summary
              </p>
              <div className="mt-4 space-y-3 text-slate-700">
                <div className="flex items-center justify-between">
                  <span>Resort</span>
                  <span>{resort?.place_name}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Room</span>
                  <span>{paymentDetails.unitType}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Check-in</span>
                  <span>
                    {new Date(paymentDetails.startDate).toLocaleDateString()}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Check-out</span>
                  <span>
                    {new Date(paymentDetails.endDate).toLocaleDateString()}
                  </span>
                </div>
                {paymentMethod === "points" ? (
                  <div className="flex items-center justify-between font-semibold text-slate-900">
                    <span>Total points</span>
                    <span>{points?.toLocaleString()}</span>
                  </div>
                ) : (
                  <div className="flex items-center justify-between font-semibold text-slate-900">
                    <span>Total</span>
                    <span>${price?.toFixed(2)}</span>
                  </div>
                )}
              </div>
            </div>
          </aside>
        </div>

        <div className="sticky bottom-0 z-20 mx-auto max-w-6xl rounded-t-3xl bg-slate-50 px-6 py-5 shadow-inner sm:px-10">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm text-slate-600">Complete your payment</p>
              <p className="text-xl font-semibold text-slate-900">
                {paymentMethod === "cash"
                  ? `$${price?.toFixed(2)}`
                  : `${points?.toLocaleString()} points`}
              </p>
            </div>
            <button
              type="button"
              onClick={handleSubmit}
              disabled={loading}
              className="rounded-full bg-[#ffc445] px-8 py-4 text-base font-semibold text-slate-900 hover:bg-[#ffcd59] disabled:cursor-not-allowed disabled:opacity-70"
            >
              {loading ? "Processing…" : "Submit Payment"}
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
