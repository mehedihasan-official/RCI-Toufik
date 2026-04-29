'use client';

import { AuthContext } from '@/providers/AuthProvider';
import { addDays } from 'date-fns';
import { useRouter } from 'next/navigation';
import { useContext, useEffect, useState } from 'react';
import { DateRangePicker } from 'react-date-range';
import { IoIosArrowDown } from 'react-icons/io';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';

const baseUnitTypes = ['studio', '1 bedroom', '2 bedroom'];
const additionalUnitTypes = ['3 bedroom', '4 bedroom'];

const pointsPreview = {
  studio: 7000,
  '1 bedroom': 7000,
  '2 bedroom': 9000,
  '3 bedroom': 10500,
  '4 bedroom': 12500,
};

const pricePreview = {
  studio: '$309',
  '1 bedroom': '$339',
  '2 bedroom': '$379',
  '3 bedroom': '$379',
  '4 bedroom': '$379',
};

const formatDate = (value) =>
  new Date(value).toLocaleDateString(undefined, {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });

export default function SingleAvailableUnitPage() {
  const router = useRouter();
  const { user } = useContext(AuthContext);

  const [currentResort, setCurrentResort] = useState(null);
  const [selectionRange, setSelectionRange] = useState({
    startDate: new Date(),
    endDate: addDays(new Date(), 6),
    key: 'selection',
  });
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [selectedUnit, setSelectedUnit] = useState(null);
  const [selectionError, setSelectionError] = useState('');

  useEffect(() => {
    const data = localStorage.getItem('currentResort');
    if (data) {
      setCurrentResort(JSON.parse(data));
    }
  }, []);

  const vacationType = currentResort?.vacationType || 'rciPoints';
  const unitTypes =
    vacationType === 'lastCall'
      ? baseUnitTypes
      : [...baseUnitTypes, ...additionalUnitTypes];

  const calculateNights = () =>
    Math.ceil(
      (new Date(selectionRange.endDate) - new Date(selectionRange.startDate)) /
        (1000 * 60 * 60 * 24),
    );

  const displayLabel =
    vacationType === 'lastCall' ? 'Last Call Vacations' : 'RCI Points Vacations';

  const badgeClasses =
    vacationType === 'lastCall'
      ? 'bg-[#fff2dc] text-[#b45309]'
      : 'bg-[#e6f8fc] text-[#037092]';

  const openCalendar = (unitType) => {
    setSelectionError('');
    setSelectedUnit(unitType);
    setIsCalendarOpen(true);
  };

  const handleShowUnits = () => {
    if (!selectedUnit || !currentResort) {
      setSelectionError('Please choose a unit type before continuing.');
      return;
    }

    if (user) {
      localStorage.setItem(
        'bookingDetails',
        JSON.stringify({
          resort: currentResort,
          startDate: selectionRange.startDate.toISOString(),
          endDate: selectionRange.endDate.toISOString(),
          unitType: selectedUnit,
          vacationType,
          nights: calculateNights(),
        }),
      );
      router.push('/available-booking');
    } else {
      router.push('/login');
    }
  };

  const handleClearDate = () => {
    setSelectionRange({
      startDate: new Date(),
      endDate: addDays(new Date(), 6),
      key: 'selection',
    });
  };

  if (!currentResort) {
    return (
      <main className="min-h-screen bg-slate-50 px-4 py-10 md:px-6">
        <div className="mx-auto max-w-2xl rounded-2xl shadow-md p-6 bg-white text-center">
          <h1 className="text-2xl font-semibold text-slate-900">Available units unavailable</h1>
          <p className="mt-3 text-sm text-slate-600">
            Please go back to a resort page and choose a booking option first.
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-6 md:px-6 md:py-10">
      <div className="mx-auto max-w-5xl">
        <section className="rounded-2xl bg-[#037092] p-4 text-white shadow-md md:p-6">
          <div className="flex items-center justify-between gap-4">
            <h1 className="hidden text-3xl font-semibold md:block">Available Units</h1>
            <button
              type="button"
              onClick={() => openCalendar(selectedUnit || unitTypes[0])}
              className="flex w-full items-center justify-between rounded-xl bg-white/10 px-4 py-3 text-left text-base font-semibold backdrop-blur md:hidden"
            >
              <span>Select check-in</span>
              <IoIosArrowDown className="text-lg" />
            </button>
          </div>
          <p className="mt-3 text-sm text-white/85">{currentResort.place_name}</p>
        </section>

        <section className="mt-5 rounded-2xl shadow-md p-5 bg-white">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-sm text-slate-500">Vacation type label</p>
              <h2 className="mt-1 text-2xl font-semibold text-slate-900">{displayLabel}</h2>
            </div>
            <span className={`inline-flex w-fit rounded-full px-4 py-2 text-sm font-semibold ${badgeClasses}`}>
              {vacationType === 'lastCall' ? 'Cash booking' : 'Points booking'}
            </span>
          </div>
        </section>

        <section className="mt-5 space-y-4">
          {unitTypes.map((unitType) => (
            <div
              key={unitType}
              className={`rounded-2xl shadow-md p-4 bg-white transition-all ${
                selectedUnit === unitType ? 'ring-2 ring-[#037092]' : ''
              }`}
            >
              <div className="rounded-xl bg-[#e6f8fc] px-4 py-4">
                <h3 className="text-2xl font-semibold text-[#037092]">{unitType}</h3>
                <p className="mt-2 text-sm text-gray-600">
                  {vacationType === 'rciPoints'
                    ? `${pointsPreview[unitType]} pts/night`
                    : `From ${pricePreview[unitType]}/week`}
                </p>
              </div>

              <div className="mt-4 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div>
                  <p className="text-sm text-slate-600">
                    {vacationType === 'lastCall'
                      ? 'Secure a fixed-rate weekly stay with card payment later in checkout.'
                      : 'Redeem points only for this stay and continue without a cash payment.'}
                  </p>
                  {selectedUnit === unitType && (
                    <p className="mt-2 text-sm font-medium text-[#037092]">
                      {formatDate(selectionRange.startDate)} to {formatDate(selectionRange.endDate)} -{' '}
                      {calculateNights()} nights
                    </p>
                  )}
                </div>
                <button
                  type="button"
                  onClick={() => openCalendar(unitType)}
                  className="rounded-xl font-semibold py-3 px-6 transition-all duration-200 bg-[#ffc445] text-slate-900 hover:bg-[#ffd166]"
                >
                  Select Date
                </button>
              </div>
            </div>
          ))}
        </section>

        {selectionError && (
          <div className="mt-4 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {selectionError}
          </div>
        )}
      </div>

      {isCalendarOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 p-0 md:p-4">
          <div className="mx-auto flex h-full w-full max-w-4xl flex-col bg-white md:h-[92vh] md:rounded-3xl">
            <div className="sticky top-0 z-10 flex items-center justify-between border-b border-slate-200 bg-white px-4 py-4 md:px-6">
              <div>
                <h2 className="text-xl font-semibold text-slate-900">Select your dates</h2>
                <p className="mt-1 text-sm text-slate-500">
                  {selectedUnit || 'Choose a unit'} - {displayLabel}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setIsCalendarOpen(false)}
                className="rounded-xl border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 transition-all duration-200 hover:bg-slate-50"
              >
                Close
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-2 py-4 md:px-4">
              <DateRangePicker
                ranges={[selectionRange]}
                onChange={(ranges) => setSelectionRange(ranges.selection)}
                minDate={new Date()}
                direction="vertical"
                months={1}
                rangeColors={['#037092']}
              />
            </div>

            <div className="sticky bottom-0 z-10 border-t border-slate-200 bg-white px-4 py-4 md:px-6">
              <div className="mb-3 text-sm text-slate-600">
                {formatDate(selectionRange.startDate)} to {formatDate(selectionRange.endDate)} -{' '}
                {calculateNights()} nights
              </div>
              <div className="flex flex-col gap-3 md:flex-row md:justify-end">
                <button
                  type="button"
                  onClick={handleShowUnits}
                  className="rounded-xl font-semibold py-3 px-6 transition-all duration-200 bg-[#037092] text-white hover:bg-[#025a74]"
                >
                  Show Available Units
                </button>
                <button
                  type="button"
                  onClick={handleClearDate}
                  className="rounded-xl font-semibold py-3 px-6 transition-all duration-200 bg-gray-100 text-gray-700 hover:bg-gray-200"
                >
                  Clear Date
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
