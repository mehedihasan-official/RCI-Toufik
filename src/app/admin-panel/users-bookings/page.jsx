"use client";

import { AuthContext } from "@/providers/AuthProvider";
import { useContext } from "react";
import { FaFile } from "react-icons/fa";

export default function UsersBookingsPage() {
  const { allBookingsData } = useContext(AuthContext);

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-gray-900">All Bookings</h1>

      {allBookingsData && allBookingsData.length > 0 ? (
        <div className="overflow-x-auto rounded-lg border border-slate-200 bg-white shadow-sm">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-slate-200 bg-slate-50">
              <tr>
                <th className="px-6 py-3 font-semibold text-gray-900">
                  User Email
                </th>
                <th className="px-6 py-3 font-semibold text-gray-900">
                  Resort
                </th>
                <th className="px-6 py-3 font-semibold text-gray-900">
                  Check-in
                </th>
                <th className="px-6 py-3 font-semibold text-gray-900">
                  Check-out
                </th>
                <th className="px-6 py-3 font-semibold text-gray-900">
                  Total Price
                </th>
                <th className="px-6 py-3 font-semibold text-gray-900">
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              {allBookingsData.map((booking) => (
                <tr key={booking._id} className="border-b border-slate-200">
                  <td className="px-6 py-4">{booking.email}</td>
                  <td className="px-6 py-4">{booking.resortName}</td>
                  <td className="px-6 py-4">{booking.checkIn}</td>
                  <td className="px-6 py-4">{booking.checkOut}</td>
                  <td className="px-6 py-4">${booking.totalPrice || "0"}</td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-block rounded-full px-3 py-1 text-xs font-semibold ${
                        booking.status === "confirmed"
                          ? "bg-green-100 text-green-700"
                          : booking.status === "pending"
                            ? "bg-yellow-100 text-yellow-700"
                            : "bg-gray-100 text-gray-700"
                      }`}
                    >
                      {booking.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="rounded-lg border border-slate-200 bg-white p-6 text-center">
          <FaFile className="mx-auto mb-4 text-4xl text-gray-400" />
          <p className="text-gray-600">No bookings found</p>
        </div>
      )}
    </div>
  );
}
