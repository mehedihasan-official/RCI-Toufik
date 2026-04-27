"use client";

import { AuthContext } from "@/providers/AuthProvider";
import { useContext } from "react";
import { FaCalendar, FaCoins, FaUser } from "react-icons/fa";

export default function DashboardOverviewPage() {
  const { user, bookingsData } = useContext(AuthContext);

  const memberSinceDate = new Date(
    user?.createdAt || Date.now(),
  ).toLocaleDateString("en-US", { year: "numeric", month: "long" });

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold text-gray-900">
          Welcome, {user?.name}
        </h1>
        <p className="mt-2 text-gray-600">Member since {memberSinceDate}</p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-6 md:grid-cols-3">
        <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold text-gray-600">
                Total Bookings
              </p>
              <p className="mt-2 text-3xl font-bold text-gray-900">
                {bookingsData?.length || 0}
              </p>
            </div>
            <FaCalendar size={32} className="text-[#037092]" />
          </div>
        </div>

        <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold text-gray-600">RCI Points</p>
              <p className="mt-2 text-3xl font-bold text-gray-900">0</p>
            </div>
            <FaCoins size={32} className="text-[#037092]" />
          </div>
        </div>

        <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold text-gray-600">
                Membership Level
              </p>
              <p className="mt-2 text-3xl font-bold text-gray-900">
                {user?.membership || "Bronze"}
              </p>
            </div>
            <FaUser size={32} className="text-[#037092]" />
          </div>
        </div>
      </div>

      {/* Recent Bookings */}
      <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="mb-4 text-2xl font-bold text-gray-900">
          Recent Bookings
        </h2>
        {bookingsData && bookingsData.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-slate-200">
                  <th className="px-4 py-2 font-semibold text-gray-900">
                    Resort
                  </th>
                  <th className="px-4 py-2 font-semibold text-gray-900">
                    Check-in
                  </th>
                  <th className="px-4 py-2 font-semibold text-gray-900">
                    Check-out
                  </th>
                  <th className="px-4 py-2 font-semibold text-gray-900">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody>
                {bookingsData.map((booking) => (
                  <tr key={booking._id} className="border-b border-slate-200">
                    <td className="px-4 py-2">{booking.resortName}</td>
                    <td className="px-4 py-2">{booking.checkIn}</td>
                    <td className="px-4 py-2">{booking.checkOut}</td>
                    <td className="px-4 py-2">
                      <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700 capitalize">
                        {booking.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-gray-600">
            No bookings yet. Start exploring our resorts!
          </p>
        )}
      </div>
    </div>
  );
}
