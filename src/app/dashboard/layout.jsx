"use client";

import { AuthContext } from "@/providers/AuthProvider";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import { FaHome, FaUser, FaWpforms } from "react-icons/fa";
import {
  HiBars3BottomRight,
  HiOutlineHomeModern,
  HiXMark,
} from "react-icons/hi2";
import { RiLogoutBoxRLine } from "react-icons/ri";

const dashboardLinks = [
  {
    label: "Overview",
    href: "/dashboard/overview",
    icon: HiOutlineHomeModern,
  },
  {
    label: "My Bookings",
    href: "/dashboard/my-bookings",
    icon: FaWpforms,
  },
];

const accountLinks = [
  {
    label: "Home",
    href: "/",
    icon: FaHome,
  },
  {
    label: "Profile",
    href: "/profile",
    icon: FaUser,
  },
];

const getInitials = (name = "RCI User") =>
  name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("");

function DashboardNavLink({
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
          : "text-slate-700 hover:bg-[#037092]/8 hover:text-[#037092]"
      } ${mobile ? "w-full" : ""}`}
    >
      <Icon className="text-lg" />
      <span>{label}</span>
    </Link>
  );
}

export default function DashboardLayout({ children }) {
  const { user, role, loading, signOut } = useContext(AuthContext);
  const pathname = usePathname();
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }
  }, [loading, router, user]);

  const handleSignOut = async () => {
    await signOut();
    setIsMenuOpen(false);
    router.push("/login");
  };

  if (loading || !user) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-slate-200 border-t-[#037092]" />
      </div>
    );
  }

  const displayName = user.name || "RCI Member";
  const userInitials = getInitials(displayName);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="fixed top-0 z-50 w-full border-b border-slate-200 bg-white/95 backdrop-blur lg:hidden">
        <div className="flex items-center justify-between p-4">
          <Link href="/" className="text-lg font-bold tracking-tight text-[#037092]">
            RCI Resorts
          </Link>
          <div className="text-base font-semibold text-slate-900">Dashboard</div>
          <button
            type="button"
            onClick={() => setIsMenuOpen((current) => !current)}
            className="rounded-xl border border-slate-200 p-2 text-slate-700 transition hover:border-[#037092] hover:text-[#037092]"
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
          <div className="absolute top-full left-0 right-0 border-t border-slate-200 bg-white px-4 pb-4 shadow-lg">
            <div className="mb-4 mt-4 flex items-center gap-3 rounded-2xl bg-slate-50 p-3">
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
                  Welcome back,
                </p>
                <p className="text-sm font-semibold text-slate-900">
                  {displayName}
                </p>
                <p className="text-xs capitalize text-slate-500">{role}</p>
              </div>
            </div>

            <div className="space-y-2">
              {dashboardLinks.map(({ href, label, icon: Icon }) => (
                <DashboardNavLink
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

            <div className="my-4 h-px bg-slate-200" />

            <div className="space-y-2">
              {accountLinks.map(({ href, label, icon: Icon }) => (
                <DashboardNavLink
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

      <div className="hidden lg:fixed lg:left-0 lg:top-0 lg:flex lg:h-screen lg:w-64 lg:flex-shrink-0 lg:flex-col lg:border-r lg:border-slate-200 lg:bg-white lg:shadow-[0_20px_45px_rgba(15,23,42,0.06)]">
        <div className="border-b border-slate-200 px-6 py-8">
          <Link href="/" className="text-2xl font-bold tracking-tight text-[#037092]">
            RCI Resorts
          </Link>

          <div className="mt-8 flex items-center gap-4 rounded-2xl bg-slate-50 p-4">
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
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
                Welcome back,
              </p>
              <p className="truncate text-base font-semibold text-slate-900">
                {displayName}
              </p>
              <p className="text-sm text-slate-500">
                {user.email || "Signed in"}
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-1 flex-col overflow-hidden px-4 py-6">
          <nav className="flex-1 space-y-6 overflow-y-auto">
            <div className="space-y-2">
              {dashboardLinks.map(({ href, label, icon: Icon }) => (
                <DashboardNavLink
                  key={href}
                  href={href}
                  label={label}
                  Icon={Icon}
                  isActive={pathname === href}
                />
              ))}
            </div>

            <div className="h-px bg-slate-200" />

            <div className="space-y-2">
              {accountLinks.map(({ href, label, icon: Icon }) => (
                <DashboardNavLink
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
            className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200 px-4 py-3 text-sm font-semibold text-slate-700 transition hover:border-[#037092] hover:bg-[#037092]/8 hover:text-[#037092]"
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
