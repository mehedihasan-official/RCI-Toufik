"use client";

import Link from "next/link";
import { BiSolidHomeHeart } from "react-icons/bi";
import { FcAdvertising } from "react-icons/fc";

export default function AvailableUnits({ currentResort }) {
  if (!currentResort) return null;

  const { place_name, location, resort_ID } = currentResort;

  const handleTransmission = (vacationType) => {
    const nextResort = { ...currentResort, vacationType };
    localStorage.setItem("currentResort", JSON.stringify(nextResort));
  };

  return (
    <div className="space-y-6 px-4 py-6">
      <p className="text-base text-gray-700">
        To view current RCI Points® and Rental availability for {place_name} at{" "}
        {location} (Resort Id: {resort_ID}) select one of the following
      </p>

      <div className="grid gap-6 lg:grid-cols-2">
        <Link
          href="/single-available-unit"
          onClick={() => handleTransmission("rciPoints")}
          className="group block overflow-hidden rounded-3xl border border-slate-200 bg-white p-6 shadow-gray-200 shadow-md transition hover:border-[#037092]"
        >
          <span className="inline-flex rounded-r-full bg-[#037092] px-4 py-2 text-sm font-semibold text-white">
            Rental
          </span>
          <div className="mt-5 flex items-center justify-between gap-4">
            <div>
              <h2 className="text-2xl font-semibold text-[#037092]">
                Club Points Vacations
              </h2>
              <p className="mt-3 text-sm text-slate-600">
                View available units by RCI points and redeem your membership
                benefits.
              </p>
            </div>
            <BiSolidHomeHeart className="text-6xl text-[#037092]" />
          </div>
        </Link>

        <Link
          href="/single-available-unit"
          onClick={() => handleTransmission("lastCall")}
          className="group block overflow-hidden rounded-3xl border border-slate-200 bg-white p-6 shadow-gray-200 shadow-md transition hover:border-[#037092]"
        >
          <span className="inline-flex rounded-r-full bg-[#037092] px-4 py-2 text-sm font-semibold text-white">
            Rental
          </span>
          <div className="mt-5 flex items-center justify-between gap-4">
            <div>
              <h2 className="text-2xl font-semibold text-[#037092]">
                Last Call Vacations
              </h2>
              <p className="mt-3 text-sm text-slate-600">
                Find discounted last-minute rentals and secure your stay before
                it is gone.
              </p>
            </div>
            <FcAdvertising className="text-6xl text-[#037092]" />
          </div>
        </Link>
      </div>
    </div>
  );
}
