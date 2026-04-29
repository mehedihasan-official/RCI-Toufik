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
    <div className="mt-5 flex gap-3 overflow-x-auto pb-2 sm:grid sm:grid-cols-2 sm:overflow-visible lg:grid-cols-3">
      {amenities.map((item) => (
        <div
          key={item.label}
          className="min-w-[15rem] rounded-[1.6rem] border border-slate-200 bg-[linear-gradient(180deg,#ffffff_0%,#f8fcfd_100%)] p-4 shadow-sm sm:min-w-0"
        >
          <div className="flex items-start gap-3">
            <div className="rounded-2xl bg-[#e6f8fc] p-3">
              <img
                src={item.src}
                alt={item.label}
                className="h-10 w-10 object-contain"
              />
            </div>
            <div className="min-w-0">
              <span className="block font-semibold text-slate-900">
                {item.label}
              </span>
              <p className="mt-1 text-sm text-slate-500">
                Popular among members booking this destination.
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
