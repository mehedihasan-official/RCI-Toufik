"use client";

import { AuthContext } from "@/providers/AuthProvider";
import { addDays } from "date-fns";
import { useRouter, useSearchParams } from "next/navigation";
import { useContext, useState } from "react";
import { DateRangePicker } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { IoIosArrowDown } from "react-icons/io";

export default function SingleAvailableUnitPageClient() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { user } = useContext(AuthContext);
  const [currentResort] = useState(() => {
    if (typeof window === "undefined") {
      return null;
    }

    const savedResort = localStorage.getItem("currentResort");
    if (!savedResort) {
      return null;
    }

    try {
      return JSON.parse(savedResort);
    } catch {
      return null;
    }
  });
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [selectedUnit, setSelectedUnit] = useState(null);
  const [selectionRange, setSelectionRange] = useState({
    startDate: new Date(),
    endDate: addDays(new Date(), 6),
    key: "selection",
  });
  const vacationType =
    searchParams.get("vacationType") || currentResort?.vacationType || "";

  const handleSelect = (ranges) => {
    setSelectionRange(ranges.selection);
  };

  const handleDateButtonClick = (unitType) => {
    setSelectedUnit(unitType);
    setIsCalendarOpen(true);
  };

  const handleCloseCalendar = () => {
    setIsCalendarOpen(false);
  };

  const handleClearDate = () => {
    setSelectionRange({
      startDate: new Date(),
      endDate: addDays(new Date(), 6),
      key: "selection",
    });
    setIsCalendarOpen(false);
  };

  const calculateNights = () => {
    const { startDate, endDate } = selectionRange;
    const diff = Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24));
    return diff > 0 ? diff : 1;
  };

  const isUnitUnavailable = () => false;

  const baseUnitTypes = ["studio", "1 bedroom", "2 bedroom"];
  const additionalUnitTypes = ["3 bedroom", "4 bedroom"];
  const unitTypes =
    vacationType === "lastCall"
      ? baseUnitTypes
      : [...baseUnitTypes, ...additionalUnitTypes];

  const handleShowUnits = () => {
    if (!selectedUnit || !currentResort) return;
    const bookingState = {
      resort: currentResort,
      startDate: selectionRange.startDate.toISOString(),
      endDate: selectionRange.endDate.toISOString(),
      unitType: selectedUnit,
      vacationType,
      nights: calculateNights(),
    };
    localStorage.setItem("bookingState", JSON.stringify(bookingState));

    if (user) {
      router.push("/available-booking");
    } else {
      router.push("/login");
    }
  };

  if (!currentResort) {
    return (
      <div className="min-h-screen bg-slate-50 px-6 py-10">
        <div className="mx-auto max-w-3xl rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-sm">
          <h2 className="text-2xl font-semibold text-slate-900">
            No resort selected
          </h2>
          <p className="mt-3 text-slate-600">
            Please choose a resort before viewing available units.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 px-6 py-10">
      <div className="mx-auto max-w-6xl space-y-8">
        <div className="hidden rounded-3xl bg-[#037092] px-8 py-10 text-white md:block">
          <h1 className="text-4xl font-bold">Available Units</h1>
          <p className="mt-3 max-w-2xl text-lg text-slate-100">
            Review available unit types and select your travel dates to
            continue.
          </p>
        </div>

        <div className="rounded-3xl bg-[#037092] p-6 text-white md:hidden">
          <div className="rounded-3xl bg-[#e6f8fc] p-4 text-slate-900">
            <h2 className="text-lg font-semibold">TRAVEL DATES</h2>
            <button
              type="button"
              onClick={() => handleDateButtonClick("studio")}
              className="mt-4 inline-flex w-full items-center justify-between rounded-full bg-white px-4 py-3 text-sm font-semibold text-[#037092] shadow-sm"
            >
              <span>Select check-in</span>
              <IoIosArrowDown />
            </button>
          </div>
        </div>

        <div className="rounded-3xl bg-white p-8 shadow-sm">
          <h2 className="text-center text-xl font-semibold text-[#037092]">
            {vacationType === "lastCall"
              ? "Last Call Vacations"
              : "RCI Points Vacations"}
          </h2>

          <div className="mt-8 grid gap-6 md:grid-cols-2">
            {unitTypes.map((unitType) => {
              const unavailable = isUnitUnavailable(unitType);
              return (
                <div
                  key={unitType}
                  className="rounded-3xl border border-slate-200 shadow-sm"
                >
                  <div className="bg-[#e6f8fc] py-5 text-center text-3xl font-semibold text-[#0370ad]">
                    {unitType}
                  </div>
                  <div className="space-y-4 p-6">
                    <p className="text-slate-600">
                      Reserve a {unitType} unit for this resort.
                    </p>
                    <button
                      type="button"
                      onClick={() => handleDateButtonClick(unitType)}
                      disabled={unavailable}
                      className={`w-full rounded-full border px-5 py-3 text-sm font-semibold transition ${
                        unavailable
                          ? "cursor-not-allowed border-slate-300 bg-slate-100 text-slate-400"
                          : "border-[#0370ad] bg-white text-[#0370ad] hover:bg-[#0370ad] hover:text-white"
                      }`}
                    >
                      {unavailable ? "Unavailable" : "Select Date"}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {isCalendarOpen && (
          <div className="fixed inset-0 z-50 overflow-y-auto bg-black/50 px-4 py-10">
            <div className="mx-auto max-w-4xl overflow-hidden rounded-3xl bg-white shadow-2xl">
              <div className="flex items-center justify-between border-b border-slate-200 px-6 py-4">
                <div>
                  <h3 className="text-xl font-semibold text-slate-900">
                    Select Booking Dates
                  </h3>
                  <p className="text-sm text-slate-600">
                    Choose your stay range for the selected unit.
                  </p>
                </div>
                <button
                  onClick={handleCloseCalendar}
                  className="rounded-full bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-200"
                >
                  Close
                </button>
              </div>
              <div className="p-6">
                <DateRangePicker
                  ranges={[selectionRange]}
                  onChange={handleSelect}
                  minDate={new Date()}
                  maxDate={addDays(new Date(), 365)}
                  direction="vertical"
                  moveRangeOnFirstSelection={false}
                  rangeColors={["#0370ad"]}
                  months={1}
                />
              </div>
              <div className="flex flex-col gap-3 border-t border-slate-200 bg-slate-50 p-6 sm:flex-row sm:justify-between">
                <button
                  onClick={handleShowUnits}
                  className="w-full rounded-full bg-blue-500 px-6 py-3 text-white hover:bg-blue-600 sm:w-auto"
                >
                  Show Available Units
                </button>
                <button
                  onClick={handleClearDate}
                  className="w-full rounded-full bg-gray-500 px-6 py-3 text-white hover:bg-gray-600 sm:w-auto"
                >
                  Clear Date
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
