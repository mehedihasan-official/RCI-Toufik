'use client';

import { useEffect, useState } from 'react';

const inputClassName =
  'border border-gray-300 rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-[#037092]';

export default function GuestInfo({ onGuestInfoChange }) {
  const [guestInfo, setGuestInfo] = useState({
    firstName: '',
    lastName: '',
    address1: '',
    address2: '',
    country: '',
    city: '',
    postalCode: '',
    email: '',
    phoneNumber: '',
    workPhone: '',
    sendConfirmation: false,
    agreeTerms: false,
  });

  useEffect(() => {
    onGuestInfoChange?.(guestInfo);
  }, [guestInfo, onGuestInfoChange]);

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    const nextData = {
      ...guestInfo,
      [name]: type === 'checkbox' ? checked : value,
    };

    setGuestInfo(nextData);
    onGuestInfoChange?.(nextData);
  };

  return (
    <div className="grid grid-cols-1 gap-3">
      <label className="text-sm font-medium text-slate-700">
        First Name
        <input
          type="text"
          name="firstName"
          value={guestInfo.firstName}
          onChange={handleChange}
          className={inputClassName}
        />
      </label>

      <label className="text-sm font-medium text-slate-700">
        Last Name
        <input
          type="text"
          name="lastName"
          value={guestInfo.lastName}
          onChange={handleChange}
          className={inputClassName}
        />
      </label>

      <label className="text-sm font-medium text-slate-700">
        Address 1
        <input
          type="text"
          name="address1"
          value={guestInfo.address1}
          onChange={handleChange}
          className={inputClassName}
        />
      </label>

      <label className="text-sm font-medium text-slate-700">
        Address 2
        <input
          type="text"
          name="address2"
          value={guestInfo.address2}
          onChange={handleChange}
          className={inputClassName}
        />
      </label>

      <label className="text-sm font-medium text-slate-700">
        Country
        <input
          type="text"
          name="country"
          value={guestInfo.country}
          onChange={handleChange}
          className={inputClassName}
        />
      </label>

      <label className="text-sm font-medium text-slate-700">
        City
        <input
          type="text"
          name="city"
          value={guestInfo.city}
          onChange={handleChange}
          className={inputClassName}
        />
      </label>

      <label className="text-sm font-medium text-slate-700">
        Postal Code
        <input
          type="text"
          name="postalCode"
          value={guestInfo.postalCode}
          onChange={handleChange}
          className={inputClassName}
        />
      </label>

      <label className="text-sm font-medium text-slate-700">
        Email
        <input
          type="email"
          name="email"
          value={guestInfo.email}
          onChange={handleChange}
          className={inputClassName}
        />
      </label>

      <label className="text-sm font-medium text-slate-700">
        Phone Number
        <input
          type="text"
          name="phoneNumber"
          value={guestInfo.phoneNumber}
          onChange={handleChange}
          className={inputClassName}
        />
      </label>

      <label className="text-sm font-medium text-slate-700">
        Work Phone
        <input
          type="text"
          name="workPhone"
          value={guestInfo.workPhone}
          onChange={handleChange}
          className={inputClassName}
        />
      </label>

      <label className="flex items-center gap-3 rounded-2xl border border-slate-200 p-3 text-sm text-slate-700">
        <input
          type="checkbox"
          name="sendConfirmation"
          checked={guestInfo.sendConfirmation}
          onChange={handleChange}
          className="h-4 w-4 accent-[#037092]"
        />
        Send confirmation to guest
      </label>

      <label className="flex items-center gap-3 rounded-2xl border border-slate-200 p-3 text-sm text-slate-700">
        <input
          type="checkbox"
          name="agreeTerms"
          checked={guestInfo.agreeTerms}
          onChange={handleChange}
          className="h-4 w-4 accent-[#037092]"
        />
        Guest agrees to the terms
      </label>
    </div>
  );
}
