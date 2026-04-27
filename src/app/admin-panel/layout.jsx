"use client";

import { AuthContext } from "@/providers/AuthProvider";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useContext } from "react";
import { FaCalendar, FaChartBar, FaPlusCircle, FaUsers } from "react-icons/fa";

export default function AdminPanelLayout({ children }) {
  const { user, role, loading } = useContext(AuthContext);
  const router = useRouter();

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-slate-300 border-t-[#037092]" />
      </div>
    );
  }

  if (!user || role !== "admin") {
    router.push("/login?from=/admin-panel/admin-overview");
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
          Admin
        </h2>
        <nav className="space-y-2">
          <Link
            href="/admin-panel/admin-overview"
            className="flex items-center gap-3 rounded-lg px-4 py-2 text-gray-700 hover:bg-slate-100"
          >
            <FaChartBar size={18} />
            Overview
          </Link>
          <Link
            href="/admin-panel/user-control"
            className="flex items-center gap-3 rounded-lg px-4 py-2 text-gray-700 hover:bg-slate-100"
          >
            <FaUsers size={18} />
            User Control
          </Link>
          <Link
            href="/admin-panel/resort-input-form"
            className="flex items-center gap-3 rounded-lg px-4 py-2 text-gray-700 hover:bg-slate-100"
          >
            <FaPlusCircle size={18} />
            Add Resort
          </Link>
          <Link
            href="/admin-panel/users-bookings"
            className="flex items-center gap-3 rounded-lg px-4 py-2 text-gray-700 hover:bg-slate-100"
          >
            <FaCalendar size={18} />
            All Bookings
          </Link>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 px-6 py-10 sm:px-10">
        <div className="mx-auto max-w-7xl">{children}</div>
      </main>
    </div>
  );
}
