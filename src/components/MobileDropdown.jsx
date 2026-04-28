"use client";

import { AuthContext } from "@/providers/AuthProvider";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import {
  FaBars,
  FaCalendar,
  FaHeart,
  FaInfoCircle,
  FaPhone,
  FaShieldAlt as FaShield,
  FaSignOutAlt,
  FaUser,
} from "react-icons/fa";
import { FaXmark } from "react-icons/fa6";
import { IoSearchSharp, IoSettings } from "react-icons/io5";
import { MdDashboard } from "react-icons/md";

export default function MobileDropdown() {
  const { user, role, signOut } = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "unset";

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const handleClose = () => setIsOpen(false);

  const handleSignOut = async () => {
    await signOut();
    handleClose();
  };

  const menuItems = user
    ? role === "admin"
      ? [
          {
            label: "Admin Panel",
            href: "/admin-panel/admin-overview",
            icon: FaShield,
          },
          { label: "Profile", href: "/profile", icon: FaUser },
          { label: "Security", href: "/profile", icon: IoSettings },
        ]
      : [
          {
            label: "Dashboard",
            href: "/dashboard/overview",
            icon: MdDashboard,
          },
          {
            label: "My Bookings",
            href: "/dashboard/overview",
            icon: FaCalendar,
          },
          { label: "My Favorites", href: "/profile", icon: FaHeart },
        ]
    : [];

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="flex h-11 w-11 items-center justify-center rounded-full border border-white/18 bg-white/12 text-white transition hover:bg-white/18"
        aria-label="Open menu"
      >
        <FaBars size={20} />
      </button>

      {isOpen && (
        <button
          type="button"
          aria-label="Close menu"
          onClick={handleClose}
          className="fixed inset-0 z-40 bg-[#041d26]/60 backdrop-blur-[2px]"
        />
      )}

      <div
        className={`fixed right-0 top-0 z-50 h-screen w-full max-w-sm bg-[#f8fbfc] shadow-2xl transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex h-full flex-col overflow-y-auto">
          <div className="border-b border-[#d6e5ea] bg-linear-to-r from-[#09303c] via-[#0b6177] to-[#0f8aa5] px-5 py-5 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.28em] text-white/70">
                  Navigation
                </p>
                <p className="mt-1 text-xl font-semibold">RCI Menu</p>
              </div>
              <button
                onClick={handleClose}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/18 bg-white/10 transition hover:bg-white/16"
                aria-label="Close menu"
              >
                <FaXmark size={20} />
              </button>
            </div>

            {user ? (
              <div className="mt-5 rounded-3xl border border-white/14 bg-white/10 p-4">
                <div className="flex items-center gap-3">
                  {user.photoURL ? (
                    <img
                      src={user.photoURL}
                      alt={user.name}
                      className="h-12 w-12 rounded-full border border-white/20 object-cover"
                    />
                  ) : (
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/14">
                      <FaUser size={24} className="text-white" />
                    </div>
                  )}
                  <div>
                    <p className="font-semibold text-white">{user.name}</p>
                    <p className="text-xs uppercase tracking-[0.18em] text-white/70">
                      {role} account
                    </p>
                  </div>
                </div>

                <div className="mt-4 grid grid-cols-3 gap-3 text-center text-xs">
                  <div className="rounded-2xl bg-white/10 px-2 py-3">
                    <p className="font-bold text-[#f4bc43]">0</p>
                    <p className="mt-1 text-white/75">Points</p>
                  </div>
                  <div className="rounded-2xl bg-white/10 px-2 py-3">
                    <p className="font-bold text-[#f4bc43]">0</p>
                    <p className="mt-1 text-white/75">Trips</p>
                  </div>
                  <div className="rounded-2xl bg-white/10 px-2 py-3">
                    <p className="font-bold text-[#f4bc43]">0</p>
                    <p className="mt-1 text-white/75">Favorites</p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="mt-5 rounded-3xl border border-white/14 bg-white/10 p-4">
                <p className="text-sm font-semibold text-white">
                  Welcome guest
                </p>
                <p className="mt-1 text-sm text-white/72">
                  Sign in to manage bookings and save favorites.
                </p>
                <div className="mt-4 flex gap-2">
                  <Link
                    href="/login"
                    onClick={handleClose}
                    className="flex-1 rounded-full border border-white/18 px-4 py-2 text-center text-sm font-semibold text-white transition hover:bg-white/10"
                  >
                    Log In
                  </Link>
                  <Link
                    href="/registration"
                    onClick={handleClose}
                    className="flex-1 rounded-full bg-[#f4bc43] px-4 py-2 text-center text-sm font-semibold text-[#072a34] transition hover:bg-[#ffd065]"
                  >
                    Sign Up
                  </Link>
                </div>
              </div>
            )}
          </div>

          {user && (
            <div className="border-b border-[#d6e5ea] px-5 py-5">
              <p className="mb-3 text-xs font-bold uppercase tracking-[0.22em] text-slate-400">
                My Account
              </p>
              <nav className="flex flex-col gap-2">
                {menuItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <Link
                      key={`${item.href}-${item.label}`}
                      href={item.href}
                      onClick={handleClose}
                      className="flex items-center gap-3 rounded-2xl px-3 py-3 text-slate-700 transition hover:bg-white hover:text-[#0b6177] hover:shadow-sm"
                    >
                      <Icon size={18} />
                      <span className="text-sm font-medium">{item.label}</span>
                    </Link>
                  );
                })}
              </nav>
            </div>
          )}

          <div className="border-b border-[#d6e5ea] px-5 py-5">
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.22em] text-slate-400">
              Explore
            </p>
            <nav className="flex flex-col gap-2">
              <Link
                href="/"
                onClick={handleClose}
                className="flex items-center gap-3 rounded-2xl px-3 py-3 text-slate-700 transition hover:bg-white hover:text-[#0b6177] hover:shadow-sm"
              >
                <IoSearchSharp size={18} />
                <span className="text-sm font-medium">Home</span>
              </Link>
              <Link
                href="/lastCallVacation"
                onClick={handleClose}
                className="flex items-center gap-3 rounded-2xl px-3 py-3 text-slate-700 transition hover:bg-white hover:text-[#0b6177] hover:shadow-sm"
              >
                <FaCalendar size={18} />
                <span className="text-sm font-medium">Book Vacation</span>
              </Link>
            </nav>
          </div>

          <div className="border-b border-[#d6e5ea] px-5 py-5">
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.22em] text-slate-400">
              Support
            </p>
            <nav className="flex flex-col gap-2">
              <Link
                href="/help"
                onClick={handleClose}
                className="flex items-center gap-3 rounded-2xl px-3 py-3 text-slate-700 transition hover:bg-white hover:text-[#0b6177] hover:shadow-sm"
              >
                <FaInfoCircle size={18} />
                <span className="text-sm font-medium">Help Center</span>
              </Link>
              <Link
                href="/contact"
                onClick={handleClose}
                className="flex items-center gap-3 rounded-2xl px-3 py-3 text-slate-700 transition hover:bg-white hover:text-[#0b6177] hover:shadow-sm"
              >
                <FaPhone size={18} />
                <span className="text-sm font-medium">Contact Us</span>
              </Link>
            </nav>
          </div>

          <div className="border-b border-[#d6e5ea] px-5 py-5">
            <nav className="flex flex-col gap-2">
              <Link
                href="/privacy"
                onClick={handleClose}
                className="text-xs text-slate-500 transition hover:text-[#0b6177]"
              >
                Privacy Policy
              </Link>
              <Link
                href="/terms"
                onClick={handleClose}
                className="text-xs text-slate-500 transition hover:text-[#0b6177]"
              >
                Terms of Service
              </Link>
              <Link
                href="/cookies"
                onClick={handleClose}
                className="text-xs text-slate-500 transition hover:text-[#0b6177]"
              >
                Cookie Policy
              </Link>
            </nav>
          </div>

          {user && (
            <div className="mt-auto px-5 py-5">
              <button
                onClick={handleSignOut}
                className="flex w-full items-center justify-center gap-2 rounded-full bg-red-50 px-4 py-3 font-semibold text-red-600 transition hover:bg-red-100"
              >
                <FaSignOutAlt size={18} />
                Sign Out
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
