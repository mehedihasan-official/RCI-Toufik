"use client";

import { AuthContext } from "@/providers/AuthProvider";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useContext, useEffect } from "react";
import { FaCalendarAlt, FaEnvelope, FaUser } from "react-icons/fa";

export default function ProfilePage() {
  const { user, loading, bookingsData } = useContext(AuthContext);
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }
  }, [loading, router, user]);

  if (loading || !user) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-slate-300 border-t-[#037092]" />
      </div>
    );
  }

  const totalBookings = bookingsData?.length || 0;
  const recentBookings = [...(bookingsData || [])].slice(0, 3);

  return (
    <main className="min-h-screen bg-slate-50 px-6 py-12 sm:px-10">
      <div className="mx-auto max-w-3xl">
        {/* Header */}
        <h1 className="text-3xl font-bold text-gray-900">My Profile</h1>

        {/* Profile Card */}
        <div className="mt-8 rounded-lg border border-slate-200 bg-white p-8 shadow-sm">
          {/* Avatar Section */}
          <div className="flex flex-col items-center gap-4 mb-8 pb-8 border-b border-slate-200">
            {user.photoURL ? (
              <img
                src={user.photoURL}
                alt={user.name}
                className="h-24 w-24 rounded-full object-cover"
              />
            ) : (
              <div className="flex h-24 w-24 items-center justify-center rounded-full bg-[#037092]">
                <FaUser size={40} className="text-white" />
              </div>
            )}
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-900">{user.name}</h2>
              <p className="capitalize text-gray-600">
                {user.membership || "Bronze"} Member
              </p>
            </div>
          </div>

          {/* Info Grid */}
          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <label className="block text-sm font-semibold text-gray-700">
                Full Name
              </label>
              <p className="mt-2 rounded-lg bg-slate-50 px-4 py-2 text-gray-900">
                {user.name}
              </p>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700">
                Email Address
              </label>
              <div className="mt-2 flex items-center gap-2 rounded-lg bg-slate-50 px-4 py-2 text-gray-900">
                <FaEnvelope size={16} className="text-[#037092]" />
                {user.email}
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700">
                Membership Level
              </label>
              <p className="mt-2 rounded-lg bg-slate-50 px-4 py-2 text-gray-900">
                {user.membership || "Bronze"}
              </p>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700">
                Account Status
              </label>
              <p className="mt-2 flex items-center gap-2 rounded-lg bg-slate-50 px-4 py-2 text-gray-900">
                <span className="h-3 w-3 rounded-full bg-green-500" />
                Active
              </p>
            </div>
          </div>

          {/* Stats Section */}
          <div className="mt-8 border-t border-slate-200 pt-8">
            <h3 className="text-lg font-bold text-gray-900">Account Stats</h3>
            <div className="mt-4 grid gap-4 md:grid-cols-3">
              <div className="rounded-lg bg-blue-50 p-4 text-center">
                <p className="text-3xl font-bold text-[#037092]">
                  {totalBookings}
                </p>
                <p className="text-sm font-semibold text-gray-700">
                  Total Bookings
                </p>
              </div>
              <div className="rounded-lg bg-cyan-50 p-4 text-center">
                <p className="text-3xl font-bold text-[#037092]">0</p>
                <p className="text-sm font-semibold text-gray-700">
                  Favorite Resorts
                </p>
              </div>
              <div className="rounded-lg bg-green-50 p-4 text-center">
                <p className="text-3xl font-bold text-[#037092]">0</p>
                <p className="text-sm font-semibold text-gray-700">
                  RCI Points
                </p>
              </div>
            </div>
          </div>

          <div className="mt-8 border-t border-slate-200 pt-8">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h3 className="text-lg font-bold text-gray-900">
                  Recent Bookings
                </h3>
                <p className="mt-1 text-sm text-slate-600">
                  Your latest reservations appear here as soon as they are confirmed.
                </p>
              </div>
              <Link
                href="/dashboard/my-bookings"
                className="inline-flex items-center gap-2 rounded-lg bg-[#037092] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#025b76]"
              >
                <FaCalendarAlt className="text-sm" />
                View My Bookings
              </Link>
            </div>

            {recentBookings.length > 0 ? (
              <div className="mt-4 space-y-3">
                {recentBookings.map((booking) => (
                  <div
                    key={booking._id}
                    className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-4"
                  >
                    <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                      <div>
                        <p className="font-semibold text-slate-900">
                          {booking.resortName || "Booked Resort"}
                        </p>
                        <p className="text-sm text-slate-600">
                          {booking.checkIn} to {booking.checkOut}
                        </p>
                      </div>
                      <span className="inline-flex w-fit rounded-full bg-[#037092]/10 px-3 py-1 text-xs font-semibold capitalize text-[#037092]">
                        {booking.status || "confirmed"}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="mt-4 rounded-xl border border-dashed border-slate-300 bg-slate-50 px-4 py-6 text-sm text-slate-600">
                No bookings yet. Once you reserve a resort, it will show here immediately.
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
