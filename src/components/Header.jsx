"use client";

import { AuthContext } from "@/providers/AuthProvider";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useContext, useState } from "react";
import { FaBell, FaUserCircle } from "react-icons/fa";
import logo from "../../public/rci-logo-white.png";
import MobileDropdown from "./MobileDropdown";
import SearchBarMobile from "./SearchBarMobile";

export default function Header() {
  const { user, role, signOut } = useContext(AuthContext);
  const pathname = usePathname();
  const [showUserMenu, setShowUserMenu] = useState(false);

  const isActive = (path) => pathname === path;

  const navLinks = [
    { label: "Home", href: "/" },
    { label: "Book Vacation", href: "/lastCallVacation" },
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
      <div className="hidden bg-[#0d4556] px-6 py-2 text-xs text-white/80 lg:block">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <div className="flex gap-6">
            <span>Global | EN</span>
            <span>1-800-RCI-CLUB</span>
          </div>
          <div className="flex gap-6">
            <span>Member Since 1974</span>
            <Link href="/help" className="transition hover:text-white">
              Help Center
            </Link>
            <Link href="/contact" className="transition hover:text-white">
              Contact Us
            </Link>
          </div>
        </div>
      </div>

      <header className="sticky top-0 z-40 border-b border-[#0f4b5d] bg-[#037092]  text-white shadow-[0_16px_38px_rgba(5,32,43,0.24)]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="flex items-center gap-3 py-4">
            <Link
              href="/"
              className="flex shrink-0 items-center gap-3 text-white"
            >
              <img src={logo.src} alt="RCI" className="h-10 w-10" />
              
            </Link>

            <nav className="hidden items-center gap-2 lg:flex lg:ml-10">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                    isActive(link.href)
                      ? "bg-[#f4bc43] text-[#072a34] shadow-sm"
                      : "text-white/78 hover:bg-white/10 hover:text-white"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            <div className="ml-auto hidden items-center gap-3 lg:flex">
              {user ? (
                <>
                  <button className="relative rounded-full border border-white/15 bg-white/10 p-3 text-white transition hover:bg-white/16">
                    <FaBell size={18} />
                    <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-[#f4bc43] text-[10px] font-bold text-[#072a34]">
                      1
                    </span>
                  </button>

                  <div className="relative">
                    <button
                      onClick={() => setShowUserMenu((value) => !value)}
                      className="flex items-center gap-3 rounded-full border border-white/15 bg-white/10 px-3 py-2 text-left transition hover:bg-white/16"
                    >
                      {user.photoURL ? (
                        <img
                          src={user.photoURL}
                          alt={user.name}
                          className="h-10 w-10 rounded-full border border-white/20 object-cover"
                        />
                      ) : (
                        <FaUserCircle size={28} className="text-white" />
                      )}
                      <span className="min-w-0">
                        <span className="block truncate text-sm font-semibold text-white">
                          {user.name}
                        </span>
                        <span className="block text-xs uppercase tracking-[0.18em] text-white/65">
                          {role}
                        </span>
                      </span>
                    </button>

                    {showUserMenu && (
                      <div className="absolute right-0 z-50 mt-3 w-56 overflow-hidden rounded-2xl border border-slate-200 bg-white text-slate-900 shadow-2xl">
                        <div className="border-b border-slate-200 bg-slate-50 px-4 py-3">
                          <p className="font-semibold">{user.name}</p>
                          <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
                            {role} account
                          </p>
                        </div>
                        <nav className="flex flex-col py-2 z-50">
                          {userMenuLinks.map((link) => (
                            <Link
                              key={`${link.href}-${link.label}`}
                              href={link.href}
                              className="px-4 py-2.5  text-sm transition hover:bg-slate-50"
                              onClick={() => setShowUserMenu(false)}
                            >
                              {link.label}
                            </Link>
                          ))}
                        </nav>
                        <button
                          onClick={handleSignOut}
                          className="w-full border-t border-slate-200 px-4 py-3 text-left text-sm font-semibold text-red-600 transition hover:bg-red-50"
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
                    className="rounded-full border border-white/18 px-4 py-2 text-sm font-semibold text-white transition hover:bg-white/10"
                  >
                    Log In
                  </Link>
                  <Link
                    href="/registration"
                    className="rounded-full bg-[#f4bc43] px-5 py-2 text-sm font-semibold text-[#072a34] transition hover:bg-[#ffd065]"
                  >
                    Sign Up
                  </Link>
                </>
              )}
            </div>

            <div className="ml-auto flex items-center gap-2 lg:hidden">
              {user ? (
                <Link
                  href="/profile"
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-white/18 bg-white/12 transition hover:bg-white/18"
                  aria-label="Open profile"
                >
                  {user.photoURL ? (
                    <img
                      src={user.photoURL}
                      alt={user.name}
                      className="h-9 w-9 rounded-full border border-white/20 object-cover"
                    />
                  ) : (
                    <FaUserCircle size={28} className="text-white" />
                  )}
                </Link>
              ) : (
                <>
                  <Link
                    href="/login"
                    className="rounded-full border border-white/18 px-3 py-2 text-xs font-semibold text-white transition hover:bg-white/10 sm:px-4 sm:text-sm"
                  >
                    Log In
                  </Link>
                  <Link
                    href="/registration"
                    className="rounded-full bg-[#f4bc43] px-3 py-2 text-xs font-semibold text-[#072a34] transition hover:bg-[#ffd065] sm:px-4 sm:text-sm"
                  >
                    Sign Up
                  </Link>
                </>
              )}

              <MobileDropdown />
            </div>
          </div>

          <div className="border-t border-white/12 pb-4  pt-1">
            <SearchBarMobile />
          </div>
        </div>
      </header>
    </>
  );
}
