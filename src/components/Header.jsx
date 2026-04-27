"use client";

import { AuthContext } from "@/providers/AuthProvider";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useContext, useState } from "react";
import { FaBell, FaUserCircle } from "react-icons/fa";
import logo from "../../public/Rci-vertical.png";
import MobileDropdown from "./MobileDropdown";
import SearchBarMobile from "./SearchBarMobile";

export default function Header() {
  const { user, role, signOut } = useContext(AuthContext);
  const pathname = usePathname();
  const [showUserMenu, setShowUserMenu] = useState(false);

  const isActive = (path) => pathname === path;

  const navLinks = [
    { label: "HOME", href: "/" },
    { label: "BOOK VACATION", href: "/lastCallVacation" },
  ];

  const userMenuLinks = user
    ? role === "admin"
      ? [
          { label: "Admin Panel", href: "/admin-panel/admin-overview" },
          { label: "Profile", href: "/profile" },
        ]
      : [
          { label: "Dashboard", href: "/dashboard/overview" },
          { label: "My Account", href: "/profile" },
          { label: "My Favorites", href: "/profile" },
        ]
    : [];

  const handleSignOut = async () => {
    await signOut();
    setShowUserMenu(false);
  };

  return (
    <>
      {/* Top Bar - Desktop Only */}
      <div className="hidden bg-linear-to-r from-blue-900 to-blue-800 px-6 py-2 text-xs text-white md:block">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <div className="flex gap-6">
            <span>Global | EN</span>
            <span>📞 1-800-RCI-CLUB</span>
          </div>
          <div className="flex gap-6">
            <span>Member Since 1974</span>
            <Link href="/help" className="hover:underline">
              Help Center
            </Link>
            <Link href="/contact" className="hover:underline">
              Contact Us
            </Link>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header className="sticky top-0 z-40 border-b border-[#035c73] bg-[#037092] text-white shadow-sm">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          {/* Logo */}
          <Link href="/" className="text-2xl font-bold text-white">
            <img src={logo.src} alt="RCI" className="h-10 w-10" />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden gap-8 md:flex">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`relative text-sm font-semibold transition ${
                  isActive(link.href)
                    ? "text-white"
                    : "text-white/80 hover:text-white"
                }`}
              >
                {link.label}
                {isActive(link.href) && (
                  <div className="absolute -bottom-1 left-0 right-0 h-1 bg-[#037092]" />
                )}
              </Link>
            ))}
          </nav>

          {/* Desktop User Actions */}
          <div className="hidden items-center gap-6 md:flex">
            {user ? (
              <>
                {/* Notification Bell */}
                <button className="relative text-white hover:text-slate-100">
                  <FaBell size={20} />
                  <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-xs font-bold text-white">
                    1
                  </span>
                </button>

                {/* User Menu */}
                <div className="relative">
                  <button
                    onClick={() => setShowUserMenu(!showUserMenu)}
                  className="flex items-center gap-2 rounded-full border border-white/30 px-4 py-2 transition hover:bg-white/10"
                >
                  {user.photoURL ? (
                    <img
                      src={user.photoURL}
                      alt={user.name}
                      className="h-8 w-8 rounded-full"
                    />
                  ) : (
                    <FaUserCircle size={24} className="text-white" />
                  )}
                  <span className="text-sm font-semibold text-white"/>
                  </button>

                  {showUserMenu && (
                    <div className="absolute right-0 mt-2 w-48 rounded-lg border border-slate-200 bg-white shadow-lg">
                      <div className="border-b border-slate-200 px-4 py-3">
                        <p className="font-semibold text-gray-900">
                          {user.name}
                        </p>
                        <p className="text-xs text-gray-500 capitalize">
                          {role} Account
                        </p>
                      </div>
                      <nav className="flex flex-col">
                        {userMenuLinks.map((link) => (
                          <Link
                            key={`${link.href}-${link.label}`}
                            href={link.href}
                            className="px-4 py-2 text-sm text-gray-700 hover:bg-slate-50"
                            onClick={() => setShowUserMenu(false)}
                          >
                            {link.label}
                          </Link>
                        ))}
                      </nav>
                      <button
                        onClick={handleSignOut}
                        className="w-full border-t border-slate-200 px-4 py-2 text-left text-sm font-semibold text-red-600 hover:bg-red-50"
                      >
                        Sign Out
                      </button>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  className="text-sm font-semibold text-white hover:underline"
                >
                  Log In
                </Link>
                <Link
                  href="/registration"
                  className="rounded-lg bg-white px-6 py-2 text-sm font-semibold text-[#037092] hover:bg-slate-100"
                >
                  Join Now
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <MobileDropdown />
          </div>
        </div>
        <div className="mx-auto max-w-7xl px-6 pb-4">
          <SearchBarMobile />
        </div>
      </header>
    </>
  );
}
