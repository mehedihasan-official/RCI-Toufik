"use client";

import { AuthContext } from "@/providers/AuthProvider";
import { useRouter } from "next/navigation";
import { useContext } from "react";
import { FaEnvelope, FaUser } from "react-icons/fa";

export default function ProfilePage() {
  const { user, loading } = useContext(AuthContext);
  const router = useRouter();

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-slate-300 border-t-[#037092]" />
      </div>
    );
  }

  if (!user) {
    router.push("/login");
    return null;
  }

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
                <p className="text-3xl font-bold text-[#037092]">0</p>
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
        </div>
      </div>
    </main>
  );
}
