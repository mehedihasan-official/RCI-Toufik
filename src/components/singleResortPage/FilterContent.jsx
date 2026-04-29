"use client";

import AreaInfo from "@/components/singleResortPage/AreaInfo";
import AvailableUnits from "@/components/singleResortPage/AvailableUnits";
import ResortDetails from "@/components/singleResortPage/ResortDetails";
import Reviews from "@/components/singleResortPage/Reviews";
import RoomDetails from "@/components/singleResortPage/RoomDetails";
import { useState } from "react";

export default function FilterContent({ currentResort }) {
  const {
    room_details,
    resort_details,
    check_in_time,
    check_out_time,
    place_name,
    location,
    reviews_amount,
    rating,
  } = currentResort || {};

  const [activeMenu, setActiveMenu] = useState("Available Units");

  const menuContent = {
    "Available Units": <AvailableUnits currentResort={currentResort} />,
    "Room Details": <RoomDetails room_details={room_details} />,
    "Resort Details": (
      <ResortDetails
        resort_details={resort_details}
        check_in_time={check_in_time}
        check_out_time={check_out_time}
      />
    ),
    "Area Info": <AreaInfo place_name={place_name} location={location} />,
    Reviews: <Reviews reviews_amount={reviews_amount} rating={rating} />,
  };

  return (
    <section className="space-y-5">
      <div className="sticky top-[7.25rem] z-20 -mx-4 px-4 sm:top-[8.5rem] sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
        <div className="overflow-x-auto rounded-full border border-slate-200 bg-white/92 p-2 shadow-[0_10px_28px_rgba(15,23,42,0.08)] backdrop-blur">
          <div className="flex min-w-max gap-2">
            {Object.keys(menuContent).map((menu) => (
              <button
                key={menu}
                type="button"
                onClick={() => setActiveMenu(menu)}
                className={`rounded-full px-4 py-2.5 text-sm font-semibold transition sm:text-base ${
                  activeMenu === menu
                    ? "bg-[#037092] text-white shadow-sm"
                    : "text-slate-600 hover:bg-[#e6f8fc] hover:text-[#037092]"
                }`}
              >
                {menu}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div>{menuContent[activeMenu]}</div>
    </section>
  );
}
