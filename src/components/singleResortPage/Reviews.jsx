"use client";

export default function Reviews({ reviews_amount, rating }) {
  const metricRows = [
    { label: "Rooms" },
    { label: "Service" },
    { label: "Value" },
    { label: "Cleanliness" },
  ];

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <h2 className="text-xl font-semibold text-slate-900">
        TripAdvisor Traveler Rating
      </h2>
      <div className="mt-4 flex items-center gap-4">
        <img
          src="https://www.tripadvisor.com/img/cdsi/img2/ratings/traveler/4.5-32772-5.svg"
          alt="TripAdvisor rating"
          className="w-32 -ml-2"
        />
        <div>
          <p className="font-semibold">Rating: {rating ?? "N/A"}</p>
          <p className="font-semibold">
            Total Reviews: {reviews_amount ?? "N/A"}
          </p>
        </div>
      </div>

      <div className="divider my-6" />

      <div className="space-y-4 text-xl text-slate-700">
        {metricRows.map((item) => (
          <div
            key={item.label}
            className="flex items-center justify-between gap-5"
          >
            <span>{item.label}</span>
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
