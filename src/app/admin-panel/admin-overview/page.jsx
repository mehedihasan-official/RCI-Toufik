"use client";

import { AuthContext } from "@/providers/AuthProvider";
import { useContext } from "react";
import { FaBox, FaCalendar, FaUsers } from "react-icons/fa";

export default function AdminOverviewPage() {
  const { allUsersData, allResortData, allBookingsData } =
    useContext(AuthContext);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold text-gray-900">Admin Dashboard</h1>
        <p className="mt-2 text-gray-600">
          Manage users, resorts, and bookings
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-6 md:grid-cols-3">
        <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold text-gray-600">Total Users</p>
              <p className="mt-2 text-3xl font-bold text-gray-900">
                {allUsersData?.length || 0}
              </p>
            </div>
            <FaUsers size={32} className="text-[#037092]" />
          </div>
        </div>

        <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold text-gray-600">
                Total Resorts
              </p>
              <p className="mt-2 text-3xl font-bold text-gray-900">
                {allResortData?.length || 0}
              </p>
            </div>
            <FaBox size={32} className="text-[#037092]" />
          </div>
        </div>

        <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold text-gray-600">
                Total Bookings
              </p>
              <p className="mt-2 text-3xl font-bold text-gray-900">
                {allBookingsData?.length || 0}
              </p>
            </div>
            <FaCalendar size={32} className="text-[#037092]" />
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="mb-4 text-2xl font-bold text-gray-900">Quick Actions</h2>
        <div className="flex flex-col gap-3 sm:flex-row">
          <a
            href="/admin-panel/user-control"
            className="rounded-lg bg-[#037092] px-6 py-2 font-semibold text-white hover:bg-blue-700"
          >
            Manage Users
          </a>
          <a
            href="/admin-panel/resort-input-form"
            className="rounded-lg border border-[#037092] px-6 py-2 font-semibold text-[#037092] hover:bg-blue-50"
          >
            Add Resort
          </a>
          <a
            href="/admin-panel/users-bookings"
            className="rounded-lg border border-slate-300 px-6 py-2 font-semibold text-gray-700 hover:bg-slate-50"
          >
            View Bookings
          </a>
        </div>
      </div>
    </div>
  );
}
