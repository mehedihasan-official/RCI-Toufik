"use client";

import AreaInfo from "@/components/singleResortPage/AreaInfo";
import AvailableUnits from "@/components/singleResortPage/AvailableUnits";
import ResortDetails from "@/components/singleResortPage/ResortDetails";
import Reviews from "@/components/singleResortPage/Reviews";
import RoomDetails from "@/components/singleResortPage/RoomDetails";
import { useEffect, useRef, useState } from "react";

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
  const filterMenuRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!filterMenuRef.current) return;
      if (window.pageYOffset > filterMenuRef.current.offsetTop) {
        filterMenuRef.current.classList.add(
          "fixed",
          "top-0",
          "w-full",
          "z-10",
          "bg-white",
          "shadow-md",
        );
      } else {
        filterMenuRef.current.classList.remove(
          "fixed",
          "top-0",
          "w-full",
          "z-10",
          "bg-white",
          "shadow-md",
        );
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
    "Area info": <AreaInfo place_name={place_name} location={location} />,
    Reviews: <Reviews reviews_amount={reviews_amount} rating={rating} />,
  };

  return (
    <div className="overflow-x-hidden">
      <div ref={filterMenuRef} className="carousel bg-transparent py-3">
        <ul className="carousel-item flex space-x-5 overflow-x-auto pl-3 text-xl font-semibold my-5">
          {Object.keys(menuContent).map((menu) => (
            <li key={menu}>
              <button
                type="button"
                onClick={() => setActiveMenu(menu)}
                className={`rounded-full px-4 py-2 transition ${
                  activeMenu === menu
                    ? "active underline text-[#037092]"
                    : "text-slate-600 hover:text-[#037092]"
                }`}
              >
                {menu}
              </button>
            </li>
          ))}
        </ul>
      </div>
      <div>{menuContent[activeMenu]}</div>
    </div>
  );
}
