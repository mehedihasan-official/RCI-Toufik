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
    <div className="space-y-6 rounded-[2rem] border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
      <div className="rounded-[1.75rem] bg-[#f4fbfd] p-5">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#037092]">
          Availability
        </p>
        <h2 className="mt-3 text-2xl font-semibold text-slate-950">
          Choose how you want to book this stay
        </h2>
        <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-600 sm:text-base">
          To view current RCI Points and rental availability for {place_name} in{" "}
          {location} (Resort ID: {resort_ID}), select one of the options below.
        </p>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <Link
          href="/single-available-unit"
          onClick={() => handleTransmission("rciPoints")}
          className="group block overflow-hidden rounded-[2rem] border border-slate-200 bg-[linear-gradient(180deg,#ffffff_0%,#f8fcfd_100%)] p-6 shadow-sm transition hover:-translate-y-0.5 hover:border-[#037092] hover:shadow-lg"
        >
          <span className="inline-flex rounded-full bg-[#037092] px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-white">
            Member Favorite
          </span>
          <div className="mt-5 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-2xl font-semibold text-[#037092]">
                Club Points Vacations
              </h2>
              <p className="mt-3 text-sm leading-6 text-slate-600">
                View available units by RCI points and redeem your membership
                benefits.
              </p>
            </div>
            <div className="flex h-16 w-16 items-center justify-center rounded-3xl bg-[#e6f8fc] text-[#037092]">
              <BiSolidHomeHeart className="text-5xl" />
            </div>
          </div>
        </Link>

        <Link
          href="/single-available-unit"
          onClick={() => handleTransmission("lastCall")}
          className="group block overflow-hidden rounded-[2rem] border border-slate-200 bg-[linear-gradient(180deg,#ffffff_0%,#fffaf2_100%)] p-6 shadow-sm transition hover:-translate-y-0.5 hover:border-[#037092] hover:shadow-lg"
        >
          <span className="inline-flex rounded-full bg-[#f4bc43] px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-[#072a34]">
            Last Minute
          </span>
          <div className="mt-5 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-2xl font-semibold text-[#037092]">
                Last Call Vacations
              </h2>
              <p className="mt-3 text-sm leading-6 text-slate-600">
                Find discounted last-minute rentals and secure your stay before
                it is gone.
              </p>
            </div>
            <div className="flex h-16 w-16 items-center justify-center rounded-3xl bg-[#fff3cf] text-[#037092]">
              <FcAdvertising className="text-5xl" />
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
}
