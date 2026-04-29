"use client";

import { AuthContext } from "@/providers/AuthProvider";
import { addDays } from "date-fns";
import { useRouter, useSearchParams } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import { DateRangePicker } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";

const baseUnitTypes = ["studio", "1 bedroom", "2 bedroom"];
const additionalUnitTypes = ["3 bedroom", "4 bedroom"];

const formatDate = (date) =>
  new Date(date).toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

export default function SingleAvailableUnitPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { user } = useContext(AuthContext);

  const [currentResort, setCurrentResort] = useState(null);
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [selectedUnit, setSelectedUnit] = useState(null);
  const [selectionRange, setSelectionRange] = useState({
    startDate: addDays(new Date(), 1),
    endDate: addDays(new Date(), 7),
    key: "selection",
  });

  const vacationType = searchParams.get("vacationType") || "rciPoints";
  const unitTypes =
    vacationType === "lastCall"
      ? baseUnitTypes
      : [...baseUnitTypes, ...additionalUnitTypes];

  useEffect(() => {
    if (typeof window === "undefined") return;
    const raw = localStorage.getItem("currentResort");
    if (!raw) return;
    try {
      setCurrentResort(JSON.parse(raw));
    } catch (error) {
      console.error("Invalid currentResort in localStorage", error);
    }
  }, []);

  const calculateNights = () => {
    const start = new Date(selectionRange.startDate);
    const end = new Date(selectionRange.endDate);
    return Math.ceil((end - start) / (1000 * 60 * 60 * 24));
  };

  const handleDateButtonClick = (unitType) => {
    setSelectedUnit(unitType);
    setIsCalendarOpen(true);
  };

  const handleShowUnits = () => {
    if (!selectedUnit) return;
    if (!user) {
      router.push("/login");
      return;
    }
    localStorage.setItem(
      "bookingDetails",
      JSON.stringify({
        resort: currentResort,
        startDate: selectionRange.startDate,
        endDate: selectionRange.endDate,
        unitType: selectedUnit,
        vacationType,
        nights: calculateNights(),
      }),
    );
    router.push("/available-booking");
  };

  const handleClearDates = () => {
    setSelectionRange({
      startDate: addDays(new Date(), 1),
      endDate: addDays(new Date(), 7),
      key: "selection",
    });
  };

  if (!currentResort) {
    return (
      <main className="min-h-screen bg-slate-50 px-6 py-20">
        <div className="mx-auto max-w-3xl rounded-3xl border border-slate-200 bg-white p-10 text-center shadow-sm">
          <h2 className="text-2xl font-semibold text-slate-900">
            Resort information not available
          </h2>
          <p className="mt-4 text-slate-600">
            Please return to a resort page and select a vacation option.
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50 px-6 py-10">
      <div className="mx-auto max-w-6xl space-y-8">
        <div className="rounded-3xl bg-[#e6f8fc] p-8 shadow-sm">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.2em] text-slate-600">
                {vacationType === "lastCall"
                  ? "Last Call Vacations"
                  : "Club Points Vacation"}
              </p>
              <h1 className="mt-2 text-3xl font-semibold text-[#037092]">
                {currentResort.place_name}
              </h1>
              <p className="mt-1 text-slate-600">{currentResort.location}</p>
            </div>
            <div className="rounded-3xl bg-white px-5 py-4 text-slate-700 shadow">
              <p className="text-sm font-semibold text-slate-500">
                Selected Unit
              </p>
              <p className="mt-2 text-xl font-semibold text-[#037092]">
                {selectedUnit || "Choose a unit"}
              </p>
            </div>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {unitTypes.map((unitType) => (
            <div
              key={unitType}
              className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"
            >
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-sm uppercase tracking-[0.2em] text-slate-500">
                    Unit Type
                  </p>
                  <h2 className="mt-2 text-2xl font-semibold text-slate-900">
                    {unitType}
                  </h2>
                </div>
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-3xl bg-[#037092] text-white">
                  {unitType.charAt(0).toUpperCase()}
                </div>
              </div>
              <p className="mt-4 text-slate-600">
                {vacationType === "lastCall"
                  ? "Fixed low rates available for last call stays."
                  : "Book using your RCI points for this unit type."}
              </p>
              <button
                type="button"
                onClick={() => handleDateButtonClick(unitType)}
                className="mt-6 inline-flex items-center justify-center rounded-full bg-[#ffc445] px-5 py-3 text-base font-semibold text-slate-900 transition hover:bg-[#ffcd59]"
              >
                Select Date
              </button>
              {selectedUnit === unitType && (
                <div className="mt-4 rounded-3xl bg-[#e6f8fc] p-4 text-slate-700">
                  <p className="text-sm font-semibold">Dates</p>
                  <p className="mt-2 text-sm">
                    {formatDate(selectionRange.startDate)} –{" "}
                    {formatDate(selectionRange.endDate)}
                  </p>
                  <p className="mt-1 text-xs text-slate-500">
                    {calculateNights()} nights selected
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="rounded-3xl bg-white p-8 shadow-sm">
          <h2 className="text-2xl font-semibold text-[#037092]">
            Reservation details
          </h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            <div className="rounded-3xl border border-slate-200 bg-[#f8fbfc] p-5">
              <p className="text-sm uppercase tracking-[0.2em] text-slate-500">
                Resort
              </p>
              <p className="mt-2 text-lg font-semibold text-slate-900">
                {currentResort.place_name}
              </p>
            </div>
            <div className="rounded-3xl border border-slate-200 bg-[#f8fbfc] p-5">
              <p className="text-sm uppercase tracking-[0.2em] text-slate-500">
                Vacation type
              </p>
              <p className="mt-2 text-lg font-semibold text-slate-900">
                {vacationType}
              </p>
            </div>
            <div className="rounded-3xl border border-slate-200 bg-[#f8fbfc] p-5">
              <p className="text-sm uppercase tracking-[0.2em] text-slate-500">
                Nights
              </p>
              <p className="mt-2 text-lg font-semibold text-slate-900">
                {calculateNights()}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={handleShowUnits}
            className="mt-8 w-full rounded-full bg-[#ffc445] px-6 py-4 text-base font-semibold text-slate-900 hover:bg-[#ffcd59]"
          >
            Show Available Units
          </button>
        </div>
      </div>

      {isCalendarOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-5xl rounded-3xl bg-white p-6 shadow-2xl">
            <div className="flex items-center justify-between gap-4">
              <div>
                <h2 className="text-2xl font-semibold text-slate-900">
                  Choose your dates
                </h2>
                <p className="mt-2 text-slate-600">
                  {selectedUnit || "Select a unit"} —{" "}
                  {vacationType === "lastCall" ? "Last Call" : "Points"}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setIsCalendarOpen(false)}
                className="rounded-full bg-slate-100 px-4 py-2 text-slate-700 hover:bg-slate-200"
              >
                Close
              </button>
            </div>

            <div className="mt-6 overflow-hidden rounded-3xl border border-slate-200">
              <DateRangePicker
                ranges={[selectionRange]}
                minDate={addDays(new Date(), 1)}
                rangeColors={["#037092"]}
                onChange={(ranges) =>
                  setSelectionRange((prev) => ({
                    ...prev,
                    startDate: ranges.selection.startDate,
                    endDate: ranges.selection.endDate,
                  }))
                }
              />
            </div>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-end">
              <button
                type="button"
                onClick={handleClearDates}
                className="rounded-full border border-slate-300 bg-white px-5 py-3 text-slate-700 hover:bg-slate-50"
              >
                Clear Date
              </button>
              <button
                type="button"
                onClick={handleShowUnits}
                className="rounded-full bg-[#ffc445] px-5 py-3 font-semibold text-slate-900 hover:bg-[#ffcd59]"
              >
                Show Available Units
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
