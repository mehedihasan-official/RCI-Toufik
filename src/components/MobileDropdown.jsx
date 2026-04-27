"use client";

import { AuthContext } from "@/providers/AuthProvider";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import { MdDashboard } from "react-icons/md";
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

export default function MobileDropdown() {
  const { user, role, signOut } = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(false);

  // Lock body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
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
      {/* Hamburger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="text-[#037092]"
        aria-label="Toggle menu"
      >
        {isOpen ? <FaXmark size={28} /> : <FaBars size={28} />}
      </button>

      {/* Backdrop */}
      {isOpen && (
        <div
          onClick={handleClose}
          className="fixed inset-0 top-[88px] z-30 bg-black/50"
        />
      )}

      {/* Slide-in Menu */}
      <div
        className={`fixed right-0 top-[88px] z-40 h-screen w-80 bg-white shadow-lg transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex h-full flex-col overflow-y-auto">
          {/* User Profile Section */}
          {user ? (
            <div className="border-b border-slate-200 bg-gradient-to-r from-blue-50 to-cyan-50 px-6 py-6">
              <div className="flex items-center gap-3">
                {user.photoURL ? (
                  <img
                    src={user.photoURL}
                    alt={user.name}
                    className="h-12 w-12 rounded-full"
                  />
                ) : (
                  <FaUser size={32} className="text-[#037092]" />
                )}
                <div>
                  <p className="font-semibold text-gray-900">{user.name}</p>
                  <p className="text-xs capitalize text-gray-500">
                    {role} Account
                  </p>
                </div>
              </div>
              {/* Stats Grid */}
              <div className="mt-4 grid grid-cols-3 gap-4 text-center text-xs">
                <div>
                  <p className="font-bold text-[#037092]">0</p>
                  <p className="text-gray-600">Points</p>
                </div>
                <div>
                  <p className="font-bold text-[#037092]">0</p>
                  <p className="text-gray-600">Trips</p>
                </div>
                <div>
                  <p className="font-bold text-[#037092]">0</p>
                  <p className="text-gray-600">Favorites</p>
                </div>
              </div>
            </div>
          ) : (
            <div className="border-b border-slate-200 bg-gradient-to-r from-blue-50 to-cyan-50 px-6 py-6">
              <p className="mb-4 text-sm font-semibold text-gray-900">
                Welcome Guest
              </p>
              <div className="flex flex-col gap-2">
                <Link
                  href="/login"
                  onClick={handleClose}
                  className="rounded-lg bg-[#037092] px-4 py-2 text-center font-semibold text-white hover:bg-blue-700"
                >
                  Log In
                </Link>
                <Link
                  href="/registration"
                  onClick={handleClose}
                  className="rounded-lg border border-[#037092] px-4 py-2 text-center font-semibold text-[#037092] hover:bg-blue-50"
                >
                  Join Free
                </Link>
              </div>
            </div>
          )}

          {/* Main Menu */}
          {user && (
            <div className="border-b border-slate-200 px-6 py-4">
              <p className="mb-3 text-xs font-bold uppercase text-gray-500">
                My Account
              </p>
              <nav className="flex flex-col gap-2">
                {menuItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={handleClose}
                      className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-700 hover:bg-slate-100"
                    >
                      <Icon size={18} />
                      <span className="text-sm font-medium">{item.label}</span>
                    </Link>
                  );
                })}
              </nav>
            </div>
          )}

          {/* Main Navigation */}
          <div className="border-b border-slate-200 px-6 py-4">
            <p className="mb-3 text-xs font-bold uppercase text-gray-500">
              Explore
            </p>
            <nav className="flex flex-col gap-2">
              <Link
                href="/lastCallVacation"
                onClick={handleClose}
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-700 hover:bg-slate-100"
              >
                <IoSearchSharp size={18} />
                <span className="text-sm font-medium">Search Vacations</span>
              </Link>
              <Link
                href="/lastCallVacation"
                onClick={handleClose}
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-700 hover:bg-slate-100"
              >
                <FaCalendar size={18} />
                <span className="text-sm font-medium">Book Vacation</span>
              </Link>
            </nav>
          </div>

          {/* Support Section */}
          <div className="border-b border-slate-200 px-6 py-4">
            <p className="mb-3 text-xs font-bold uppercase text-gray-500">
              Support
            </p>
            <nav className="flex flex-col gap-2">
              <Link
                href="/help"
                onClick={handleClose}
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-700 hover:bg-slate-100"
              >
                <FaInfoCircle size={18} />
                <span className="text-sm font-medium">Help Center</span>
              </Link>
              <Link
                href="/contact"
                onClick={handleClose}
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-700 hover:bg-slate-100"
              >
                <FaPhone size={18} />
                <span className="text-sm font-medium">Contact Us</span>
              </Link>
            </nav>
          </div>

          {/* Legal Links */}
          <div className="border-b border-slate-200 px-6 py-4">
            <nav className="flex flex-col gap-2">
              <Link
                href="/privacy"
                onClick={handleClose}
                className="text-xs text-gray-600 hover:text-[#037092]"
              >
                Privacy Policy
              </Link>
              <Link
                href="/terms"
                onClick={handleClose}
                className="text-xs text-gray-600 hover:text-[#037092]"
              >
                Terms of Service
              </Link>
              <Link
                href="/cookies"
                onClick={handleClose}
                className="text-xs text-gray-600 hover:text-[#037092]"
              >
                Cookie Policy
              </Link>
            </nav>
          </div>

          {/* Sign Out Button */}
          {user && (
            <div className="mt-auto border-t border-slate-200 px-6 py-4">
              <button
                onClick={handleSignOut}
                className="flex w-full items-center justify-center gap-2 rounded-lg bg-red-50 px-4 py-2 font-semibold text-red-600 hover:bg-red-100"
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
