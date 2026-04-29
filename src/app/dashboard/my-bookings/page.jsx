"use client";

import { AuthContext } from "@/providers/AuthProvider";
import { useContext } from "react";
import { FaCalendarCheck } from "react-icons/fa";

export default function MyBookingsPage() {
  const { bookingsData } = useContext(AuthContext);

  return (
    <main className="space-y-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold text-slate-900">My Bookings</h1>
        <p className="text-sm text-slate-600">
          Confirmed reservations appear here right away after checkout.
        </p>
      </div>

      {bookingsData?.length ? (
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="overflow-x-auto">
            <table className="min-w-full text-left text-sm">
              <thead className="bg-slate-50">
                <tr className="border-b border-slate-200">
                  <th className="px-5 py-4 font-semibold text-slate-900">
                    Resort
                  </th>
                  <th className="px-5 py-4 font-semibold text-slate-900">
                    Check-in
                  </th>
                  <th className="px-5 py-4 font-semibold text-slate-900">
                    Check-out
                  </th>
                  <th className="px-5 py-4 font-semibold text-slate-900">
                    Price
                  </th>
                  <th className="px-5 py-4 font-semibold text-slate-900">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody>
                {bookingsData.map((booking) => (
                  <tr key={booking._id} className="border-b border-slate-100 last:border-b-0">
                    <td className="px-5 py-4 font-medium text-slate-900">
                      {booking.resortName || "Booked Resort"}
                    </td>
                    <td className="px-5 py-4 text-slate-600">{booking.checkIn}</td>
                    <td className="px-5 py-4 text-slate-600">{booking.checkOut}</td>
                    <td className="px-5 py-4 text-slate-600">
                      ${Number(booking.totalPrice || 0).toFixed(2)}
                    </td>
                    <td className="px-5 py-4">
                      <span className="inline-flex rounded-full bg-[#037092]/10 px-3 py-1 text-xs font-semibold capitalize text-[#037092]">
                        {booking.status || "confirmed"}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-10 text-center">
          <FaCalendarCheck className="mx-auto text-4xl text-[#037092]" />
          <h2 className="mt-4 text-xl font-semibold text-slate-900">
            No bookings yet
          </h2>
          <p className="mt-2 text-sm text-slate-600">
            Your next resort reservation will show up here automatically.
          </p>
        </div>
      )}
    </main>
  );
}
