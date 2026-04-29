"use client";

import { useEffect, useState } from "react";

export default function GuestInfo({ onGuestInfoChange }) {
  const [guestData, setGuestData] = useState({
    firstName: "",
    lastName: "",
    address1: "",
    address2: "",
    country: "",
    city: "",
    postalCode: "",
    email: "",
    phoneNumber: "",
    workPhone: "",
    sendConfirmation: false,
    agreeTerms: false,
  });

  useEffect(() => {
    onGuestInfoChange?.(guestData);
  }, [guestData, onGuestInfoChange]);

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    setGuestData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="space-y-2 text-sm text-slate-600">
          First name
          <input
            name="firstName"
            value={guestData.firstName}
            onChange={handleChange}
            className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none focus:border-[#037092]"
          />
        </label>
        <label className="space-y-2 text-sm text-slate-600">
          Last name
          <input
            name="lastName"
            value={guestData.lastName}
            onChange={handleChange}
            className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none focus:border-[#037092]"
          />
        </label>
      </div>

      <label className="space-y-2 text-sm text-slate-600">
        Address 1
        <input
          name="address1"
          value={guestData.address1}
          onChange={handleChange}
          className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none focus:border-[#037092]"
        />
      </label>
      <label className="space-y-2 text-sm text-slate-600">
        Address 2
        <input
          name="address2"
          value={guestData.address2}
          onChange={handleChange}
          className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none focus:border-[#037092]"
        />
      </label>

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="space-y-2 text-sm text-slate-600">
          Country
          <input
            name="country"
            value={guestData.country}
            onChange={handleChange}
            className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none focus:border-[#037092]"
          />
        </label>
        <label className="space-y-2 text-sm text-slate-600">
          City
          <input
            name="city"
            value={guestData.city}
            onChange={handleChange}
            className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none focus:border-[#037092]"
          />
        </label>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="space-y-2 text-sm text-slate-600">
          Postal code
          <input
            name="postalCode"
            value={guestData.postalCode}
            onChange={handleChange}
            className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none focus:border-[#037092]"
          />
        </label>
        <label className="space-y-2 text-sm text-slate-600">
          Email
          <input
            name="email"
            value={guestData.email}
            onChange={handleChange}
            className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none focus:border-[#037092]"
          />
        </label>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="space-y-2 text-sm text-slate-600">
          Phone number
          <input
            name="phoneNumber"
            value={guestData.phoneNumber}
            onChange={handleChange}
            className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none focus:border-[#037092]"
          />
        </label>
        <label className="space-y-2 text-sm text-slate-600">
          Work phone
          <input
            name="workPhone"
            value={guestData.workPhone}
            onChange={handleChange}
            className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none focus:border-[#037092]"
          />
        </label>
      </div>

      <div className="space-y-3 rounded-3xl border border-slate-200 bg-[#f8fbfc] p-5">
        <label className="flex items-center gap-3 text-sm text-slate-700">
          <input
            type="checkbox"
            name="sendConfirmation"
            checked={guestData.sendConfirmation}
            onChange={handleChange}
            className="h-4 w-4 rounded border-slate-300 text-[#037092] focus:ring-[#037092]"
          />
          Send confirmation email to guest
        </label>
        <label className="flex items-center gap-3 text-sm text-slate-700">
          <input
            type="checkbox"
            name="agreeTerms"
            checked={guestData.agreeTerms}
            onChange={handleChange}
            className="h-4 w-4 rounded border-slate-300 text-[#037092] focus:ring-[#037092]"
          />
          Guest agrees to terms and conditions
        </label>
      </div>
    </div>
  );
}
