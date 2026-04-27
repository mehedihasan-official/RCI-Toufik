"use client";

export default function TopAmenities() {
  const amenities = [
    {
      label: "Beach",
      src: "https://clubs.rci.com/static/media/beach.e95fa969.svg",
    },
    {
      label: "Family Vacations",
      src: "https://clubs.rci.com/static/media/family_friendly.5efe64b9.svg",
    },
    {
      label: "Golf",
      src: "https://clubs.rci.com/static/media/golf.2a7cd669.svg",
    },
    {
      label: "Spa",
      src: "https://clubs.rci.com/static/media/spa.9c9f4019.svg",
    },
    {
      label: "Scuba & Water Sports",
      src: "https://clubs.rci.com/static/media/scuba.e1995118.svg",
    },
    {
      label: "Casinos",
      src: "https://clubs.rci.com/static/media/casino.9d6871be.svg",
    },
  ];

  return (
    <div className="carousel w-full space-x-5 overflow-x-auto pb-4">
      {amenities.map((item) => (
        <div
          key={item.label}
          className="carousel-item relative min-w-42.5 rounded-3xl border border-slate-200 bg-white p-4 shadow-sm"
        >
          <div className="flex items-center gap-3">
            <img
              src={item.src}
              alt={item.label}
              className="h-12 w-12 object-contain"
            />
            <span className="font-semibold text-slate-900">{item.label}</span>
          </div>
        </div>
      ))}
    </div>
  );
}
