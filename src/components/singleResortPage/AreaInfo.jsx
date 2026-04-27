"use client";

export default function AreaInfo({ place_name, location }) {
  return (
    <div className="rounded-3xl bg-[#e6f8fc] p-6 shadow-sm">
      <h2 className="text-4xl font-semibold text-slate-900">
        Area Information
      </h2>
      <div className="mt-6 space-y-3">
        <p className="text-xl font-semibold text-slate-900">Getting There</p>
        <p className="text-base text-slate-700">{place_name}</p>
        <p className="text-base font-semibold text-slate-900">{location}</p>
      </div>
    </div>
  );
}
