"use client";

import { AuthContext } from "@/providers/AuthProvider";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useContext } from "react";
import { FaBox, FaCalendar } from "react-icons/fa";

export default function DashboardLayout({ children }) {
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
    <div className="flex min-h-screen bg-slate-50">
      {/* Sidebar */}
      <aside className="hidden w-64 border-r border-slate-200 bg-white p-6 md:block">
        <Link href="/" className="mb-8 block text-2xl font-bold text-[#037092]">
          RCI
        </Link>

        <h2 className="mb-4 text-sm font-semibold uppercase text-gray-500">
          Menu
        </h2>
        <nav className="space-y-2">
          <Link
            href="/dashboard/overview"
            className="flex items-center gap-3 rounded-lg px-4 py-2 text-gray-700 hover:bg-slate-100"
          >
            <FaBox size={18} />
            Overview
          </Link>
          <Link
            href="/dashboard/my-bookings"
            className="flex items-center gap-3 rounded-lg px-4 py-2 text-gray-700 hover:bg-slate-100"
          >
            <FaCalendar size={18} />
            My Bookings
          </Link>
        </nav>

        <h2 className="mb-4 mt-8 text-sm font-semibold uppercase text-gray-500">
          User
        </h2>
        <nav className="space-y-2">
          <Link
            href="/profile"
            className="flex items-center gap-3 rounded-lg px-4 py-2 text-gray-700 hover:bg-slate-100"
          >
            Profile
          </Link>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1">{children}</main>
    </div>
  );
}
