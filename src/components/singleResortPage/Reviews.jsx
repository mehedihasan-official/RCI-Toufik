"use client";

export default function Reviews({ reviews_amount, rating }) {
  const metricRows = [
    { label: "Rooms" },
    { label: "Service" },
    { label: "Value" },
    { label: "Cleanliness" },
  ];

  return (
    <div className="rounded-[2rem] border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
      <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#037092]">
        Review Summary
      </p>
      <h2 className="mt-2 text-xl font-semibold text-slate-900">
        TripAdvisor Traveler Rating
      </h2>
      <div className="mt-5 rounded-[1.75rem] bg-slate-50 p-4 sm:p-5">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-4xl font-semibold text-slate-950">
              {rating ?? "N/A"}
            </p>
            <p className="mt-1 text-sm text-slate-500">
              Based on {reviews_amount ?? "N/A"} traveler reviews
            </p>
          </div>
          <img
            src="https://www.tripadvisor.com/img/cdsi/img2/ratings/traveler/4.5-32772-5.svg"
            alt="TripAdvisor rating"
            className="w-32"
          />
        </div>
      </div>

      <div className="my-6 border-t border-slate-200" />

      <div className="space-y-4 text-slate-700">
        {metricRows.map((item) => (
          <div
            key={item.label}
            className="flex items-center justify-between gap-5 rounded-3xl border border-slate-200 bg-white px-4 py-3"
          >
            <span className="font-medium">{item.label}</span>
            <img
              src="https://static.tacdn.com/img2/ratings/traveler/ss4.0.svg"
              alt="Star rating"
              className="w-24"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
