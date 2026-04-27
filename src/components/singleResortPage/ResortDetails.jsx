"use client";

export default function ResortDetails({
  resort_details,
  check_in_time,
  check_out_time,
}) {
  return (
    <div className="space-y-6 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <div>
        <p className="text-base text-slate-700">{resort_details}</p>
      </div>

      <div className="border-t border-slate-200 pt-5">
        <h2 className="text-xl font-bold text-slate-900">Property info</h2>
        <div className="mt-4 space-y-3 text-sm text-slate-600">
          <div>
            <p className="font-semibold text-slate-900">Check-in time:</p>
            <p>{check_in_time}</p>
          </div>
          <div>
            <p className="font-semibold text-slate-900">Check-out time:</p>
            <p>{check_out_time}</p>
          </div>
          <div>
            <p className="font-semibold text-slate-900">
              Weeks Resort check-in days
            </p>
            <p>
              Sunday, Monday, Tuesday, Wednesday, Thursday, Friday, Saturday
            </p>
          </div>
        </div>
      </div>

      <div className="border-t border-slate-200 pt-5">
        <h2 className="text-2xl font-semibold text-slate-900">Amenities</h2>
        <p className="mt-4 text-xl font-semibold text-slate-800">Onsite</p>
        <ul className="mt-3 list-disc space-y-2 pl-5 text-slate-600">
          <li>Bar/lounge</li>
          <li>Restaurant</li>
          <li>Fitness Center</li>
        </ul>
      </div>
    </div>
  );
}
