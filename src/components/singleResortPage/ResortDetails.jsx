"use client";

export default function ResortDetails({
  resort_details,
  check_in_time,
  check_out_time,
}) {
  return (
    <div className="space-y-6 rounded-[2rem] border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#037092]">
          Overview
        </p>
        <p className="mt-3 text-base leading-7 text-slate-700">
          {resort_details}
        </p>
      </div>

      <div className="border-t border-slate-200 pt-5">
        <h2 className="text-xl font-bold text-slate-900">Property info</h2>
        <div className="mt-4 grid gap-3 sm:grid-cols-3">
          <div className="rounded-3xl bg-slate-50 p-4">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
              Check-in time
            </p>
            <p className="mt-2 font-semibold text-slate-900">{check_in_time}</p>
          </div>
          <div className="rounded-3xl bg-slate-50 p-4">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
              Check-out time
            </p>
            <p className="mt-2 font-semibold text-slate-900">
              {check_out_time}
            </p>
          </div>
          <div className="rounded-3xl bg-slate-50 p-4">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
              Check-in days
            </p>
            <p className="mt-2 font-semibold text-slate-900">
              Sunday, Monday, Tuesday, Wednesday, Thursday, Friday, Saturday
            </p>
          </div>
        </div>
      </div>

      <div className="border-t border-slate-200 pt-5">
        <h2 className="text-2xl font-semibold text-slate-900">Amenities</h2>
        <div className="mt-4 flex flex-wrap gap-3">
          {["Bar/lounge", "Restaurant", "Fitness Center"].map((item) => (
            <span
              key={item}
              className="rounded-full border border-slate-200 bg-[#f8fbfc] px-4 py-2 text-sm font-medium text-slate-700"
            >
              {item}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
