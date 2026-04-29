"use client";

import { AuthContext } from "@/providers/AuthProvider";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import { AiOutlineUsergroupAdd } from "react-icons/ai";
import { FaHome, FaWpforms } from "react-icons/fa";
import { HiBars3BottomRight, HiMiniSparkles, HiXMark } from "react-icons/hi2";
import { MdLibraryBooks, MdViewQuilt } from "react-icons/md";
import { RiAdminLine, RiLogoutBoxRLine } from "react-icons/ri";

const adminLinks = [
  {
    label: "Admin Overview",
    href: "/admin-panel/admin-overview",
    icon: MdViewQuilt,
  },
  {
    label: "Users Bookings",
    href: "/admin-panel/users-bookings",
    icon: MdLibraryBooks,
  },
  {
    label: "User Control",
    href: "/admin-panel/user-control",
    icon: AiOutlineUsergroupAdd,
  },
  {
    label: "Admin Control",
    href: "/admin-panel/admin-control",
    icon: RiAdminLine,
  },
  {
    label: "Resort Input Form",
    href: "/admin-panel/resort-input-form",
    icon: FaWpforms,
  },
];

const secondaryLinks = [
  {
    label: "Home",
    href: "/",
    icon: FaHome,
  },
];

const getInitials = (name = "Admin User") =>
  name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("");

function AdminNavLink({
  href,
  label,
  Icon,
  isActive,
  onClick,
  mobile = false,
}) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all duration-200 ${
        isActive
          ? "bg-[#037092] text-white shadow-sm"
          : "text-slate-200 hover:bg-gray-800 hover:text-white"
      } ${mobile ? "w-full" : ""}`}
    >
      <Icon className="text-lg" />
      <span>{label}</span>
    </Link>
  );
}

export default function AdminPanelLayout({ children }) {
  const { user, role, loading, signOut } = useContext(AuthContext);
  const pathname = usePathname();
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
      return;
    }

    if (!loading && user && role !== "admin") {
      router.push("/");
    }
  }, [loading, role, router, user]);

  const handleSignOut = async () => {
    await signOut();
    setIsMenuOpen(false);
    router.push("/login");
  };

  if (loading || !user || role !== "admin") {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-950">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-slate-700 border-t-[#037092]" />
      </div>
    );
  }

  const displayName = user.name || "Administrator";
  const userInitials = getInitials(displayName);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="fixed top-0 z-50 w-full border-b border-gray-800 bg-gray-900/95 backdrop-blur lg:hidden">
        <div className="flex items-center justify-between p-4">
          <Link href="/" className="text-lg font-bold tracking-tight text-white">
            RCI Admin
          </Link>
          <div className="text-base font-semibold text-white">Admin Panel</div>
          <button
            type="button"
            onClick={() => setIsMenuOpen((current) => !current)}
            className="rounded-xl border border-gray-700 p-2 text-slate-200 transition hover:border-[#037092] hover:text-white"
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          >
            {isMenuOpen ? (
              <HiXMark className="text-2xl" />
            ) : (
              <HiBars3BottomRight className="text-2xl" />
            )}
          </button>
        </div>

        {isMenuOpen && (
          <div className="absolute top-full left-0 right-0 border-t border-gray-800 bg-gray-900 px-4 pb-4 shadow-2xl">
            <div className="mb-4 mt-4 flex items-center gap-3 rounded-2xl bg-gray-800 p-3">
              {user.photoURL ? (
                <img
                  src={user.photoURL}
                  alt={displayName}
                  className="h-12 w-12 rounded-full object-cover"
                />
              ) : (
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#037092] text-sm font-semibold text-white">
                  {userInitials}
                </div>
              )}
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
                  Admin access
                </p>
                <p className="text-sm font-semibold text-white">{displayName}</p>
                <p className="text-xs text-slate-400">{user.email}</p>
              </div>
            </div>

            <div className="space-y-2">
              {adminLinks.map(({ href, label, icon: Icon }) => (
                <AdminNavLink
                  key={href}
                  href={href}
                  label={label}
                  Icon={Icon}
                  isActive={pathname === href}
                  onClick={() => setIsMenuOpen(false)}
                  mobile
                />
              ))}
            </div>

            <div className="my-4 h-px bg-gray-800" />

            <div className="space-y-2">
              {secondaryLinks.map(({ href, label, icon: Icon }) => (
                <AdminNavLink
                  key={href}
                  href={href}
                  label={label}
                  Icon={Icon}
                  isActive={pathname === href}
                  onClick={() => setIsMenuOpen(false)}
                  mobile
                />
              ))}
            </div>

            <button
              type="button"
              onClick={handleSignOut}
              className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-[#037092] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[#025b76]"
            >
              <RiLogoutBoxRLine className="text-lg" />
              Sign Out
            </button>
          </div>
        )}
      </div>

      <div className="hidden lg:fixed lg:left-0 lg:top-0 lg:flex lg:h-screen lg:w-64 lg:flex-shrink-0 lg:flex-col lg:bg-gray-900 lg:text-white lg:shadow-[0_24px_60px_rgba(2,6,23,0.45)]">
        <div className="border-b border-gray-800 px-6 py-8">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#037092]/20 text-[#7dd3fc]">
              <HiMiniSparkles className="text-2xl" />
            </div>
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-500">
                RCI Admin
              </p>
              <h1 className="bg-gradient-to-r from-[#7dd3fc] via-white to-[#bae6fd] bg-clip-text text-xl font-bold text-transparent">
                Admin Panel
              </h1>
            </div>
          </div>

          <div className="mt-8 flex items-center gap-4 rounded-2xl bg-gray-800 p-4">
            {user.photoURL ? (
              <img
                src={user.photoURL}
                alt={displayName}
                className="h-14 w-14 rounded-full object-cover"
              />
            ) : (
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#037092] text-base font-semibold text-white">
                {userInitials}
              </div>
            )}

            <div className="min-w-0">
              <div className="flex items-center gap-2 text-amber-300">
                <HiMiniSparkles className="text-base" />
                <span className="text-xs font-semibold uppercase tracking-[0.2em]">
                  Admin Badge
                </span>
              </div>
              <p className="truncate text-base font-semibold text-white">
                {displayName}
              </p>
              <p className="truncate text-sm text-slate-400">{user.email}</p>
            </div>
          </div>
        </div>

        <div className="flex flex-1 flex-col overflow-hidden px-4 py-6">
          <nav className="flex-1 space-y-6 overflow-y-auto">
            <div className="space-y-2">
              {adminLinks.map(({ href, label, icon: Icon }) => (
                <AdminNavLink
                  key={href}
                  href={href}
                  label={label}
                  Icon={Icon}
                  isActive={pathname === href}
                />
              ))}
            </div>

            <div className="h-px bg-gray-800" />

            <div className="space-y-2">
              {secondaryLinks.map(({ href, label, icon: Icon }) => (
                <AdminNavLink
                  key={href}
                  href={href}
                  label={label}
                  Icon={Icon}
                  isActive={pathname === href}
                />
              ))}
            </div>
          </nav>

          <button
            type="button"
            onClick={handleSignOut}
            className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl border border-gray-700 px-4 py-3 text-sm font-semibold text-slate-200 transition hover:border-[#037092] hover:bg-gray-800 hover:text-white"
          >
            <RiLogoutBoxRLine className="text-lg" />
            Sign Out
          </button>
        </div>
      </div>

      <div className="lg:ml-64 min-h-screen bg-gray-50">
        <div className="h-16 lg:hidden" />
        <div className="px-4 py-6 sm:px-6 lg:px-10 lg:py-8">
          <div className="mx-auto max-w-7xl">
            <>{children}</>
          </div>
        </div>
      </div>
    </div>
  );
}
