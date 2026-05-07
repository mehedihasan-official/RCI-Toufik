"use client";

export default function AreaInfo({ place_name, location }) {
  return (
    <div className="space-y-6 rounded-[2rem] border border-slate-200 bg-white p-5 sm:p-6">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#037092]">
          Location
        </p>
        <h2 className="mt-3 text-2xl font-semibold text-slate-900">
          {place_name}
        </h2>
        <p className="mt-3 text-base leading-7 text-slate-700">{location}</p>
      </div>

      <div className="border-t border-slate-200 pt-5">
        <h3 className="text-xl font-bold text-slate-900">About this area</h3>
        <p className="mt-4 text-sm leading-6 text-slate-600">
          This destination offers a wonderful mix of attractions, dining, and
          entertainment options. Whether you're looking for relaxation or
          adventure, you'll find plenty to explore in the surrounding area.
        </p>
      </div>

      <div className="border-t border-slate-200 pt-5">
        <h3 className="text-xl font-bold text-slate-900">Getting around</h3>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          <div className="rounded-3xl border border-slate-200 bg-slate-50 p-4">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
              Distance to center
            </p>
            <p className="mt-2 font-semibold text-slate-900">
              Check with resort
            </p>
          </div>
          <div className="rounded-3xl border border-slate-200 bg-slate-50 p-4">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
              Local transportation
            </p>
            <p className="mt-2 font-semibold text-slate-900">Available</p>
          </div>
        </div>
      </div>
    </div>
  );
}
