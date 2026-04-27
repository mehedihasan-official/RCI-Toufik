"use client";

import { FaAngleDown, FaBed, FaDoorOpen, FaShower } from "react-icons/fa";
import { RiFridgeFill } from "react-icons/ri";

export default function RoomDetails({ room_details = {} }) {
  const {
    bath,
    kitchen,
    privacy_room_amount,
    sleeps_room,
    room_Description,
    studio_sleeps_room,
    studio_privacy_room_amount,
    studio_kitchen,
    studio_bath,
    hotel_room,
    hotel_privacy_room_amount,
    hotel_kitchen,
    hotel_bath,
  } = room_details;

  const isNotEmpty = (value) =>
    value !== null && value !== undefined && value !== "";

  return (
    <div className="space-y-10 px-4 py-6">
      {isNotEmpty(sleeps_room) && (
        <section className="rounded-3xl border border-slate-200 bg-white shadow-sm">
          <div className="px-5 py-6 text-center">
            <h2 className="text-2xl font-semibold">Bedroom</h2>
            <div className="divider divider-info my-4" />
            <p className="text-sm text-slate-600">Features at a glance</p>
          </div>
          <div className="space-y-3 bg-[#f4f4f4] px-5 py-3">
            <div className="flex items-center gap-3">
              <FaBed className="text-xl text-[#037092]" />
              <span className="text-xl font-semibold text-[#037092]">
                Sleeps: {sleeps_room}
              </span>
            </div>
            <div className="flex items-center gap-3">
              <FaDoorOpen className="text-xl text-[#037092]" />
              <span>Privacy: {privacy_room_amount}</span>
            </div>
            <div className="flex items-center gap-3">
              <RiFridgeFill className="text-xl text-[#037092]" />
              <span>Kitchen: {kitchen}</span>
            </div>
            <div className="flex items-center gap-3">
              <FaShower className="text-xl text-[#037092]" />
              <span>Bath: {bath}</span>
            </div>
          </div>
          <div className="flex items-center justify-center gap-2 py-4 text-[#037092]">
            <span>More room features</span>
            <FaAngleDown />
          </div>
        </section>
      )}

      {isNotEmpty(studio_sleeps_room) && (
        <section className="rounded-3xl border border-slate-200 bg-white shadow-sm">
          <div className="px-5 py-6 text-center">
            <h2 className="text-2xl font-semibold">Studio</h2>
            <div className="divider divider-info my-4" />
            <p className="text-sm text-slate-600">Features at a glance</p>
          </div>
          <div className="space-y-3 bg-[#f4f4f4] px-5 py-3">
            <div className="flex items-center gap-3">
              <FaBed className="text-xl text-[#037092]" />
              <span className="text-xl font-semibold text-[#037092]">
                Sleeps: {studio_sleeps_room}
              </span>
            </div>
            <div className="flex items-center gap-3">
              <FaDoorOpen className="text-xl text-[#037092]" />
              <span>Privacy: {studio_privacy_room_amount}</span>
            </div>
            <div className="flex items-center gap-3">
              <RiFridgeFill className="text-xl text-[#037092]" />
              <span>Kitchen: {studio_kitchen}</span>
            </div>
            <div className="flex items-center gap-3">
              <FaShower className="text-xl text-[#037092]" />
              <span>Bath: {studio_bath}</span>
            </div>
          </div>
          <div className="flex items-center justify-center gap-2 py-4 text-[#037092]">
            <span>More room features</span>
            <FaAngleDown />
          </div>
        </section>
      )}

      {isNotEmpty(hotel_room) && (
        <section className="rounded-3xl border border-slate-200 bg-white shadow-sm">
          <div className="px-5 py-6 text-center">
            <h2 className="text-2xl font-semibold">Hotel</h2>
            <div className="divider divider-info my-4" />
            <p className="text-sm text-slate-600">Features at a glance</p>
          </div>
          <div className="space-y-3 bg-[#f4f4f4] px-5 py-3">
            <div className="flex items-center gap-3">
              <FaBed className="text-xl text-[#037092]" />
              <span className="text-xl font-semibold text-[#037092]">
                Sleeps: {hotel_room}
              </span>
            </div>
            <div className="flex items-center gap-3">
              <FaDoorOpen className="text-xl text-[#037092]" />
              <span>Privacy: {hotel_privacy_room_amount}</span>
            </div>
            <div className="flex items-center gap-3">
              <RiFridgeFill className="text-xl text-[#037092]" />
              <span>Kitchen: {hotel_kitchen}</span>
            </div>
            <div className="flex items-center gap-3">
              <FaShower className="text-xl text-[#037092]" />
              <span>Bath: {hotel_bath}</span>
            </div>
          </div>
          <div className="flex items-center justify-center gap-2 py-4 text-[#037092]">
            <span>More room features</span>
            <FaAngleDown />
          </div>
        </section>
      )}

      {isNotEmpty(room_Description) && (
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-2xl font-semibold">Room Overview</h2>
          <p className="mt-4 text-slate-600">{room_Description}</p>
        </div>
      )}
    </div>
  );
}
