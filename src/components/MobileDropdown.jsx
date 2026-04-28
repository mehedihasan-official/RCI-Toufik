"use client";

import { AuthContext } from "@/providers/AuthProvider";
import Link from "next/link";
import { useContext, useEffect, useRef, useState } from "react";
import {
  FaBars,
  FaBell,
  FaCalendarAlt,
  FaCrown,
  FaEnvelope,
  FaGlobeAmericas,
  FaInfoCircle,
  FaQuestionCircle,
  FaRegHeart,
  FaSearch,
  FaShieldAlt,
  FaSignOutAlt,
  FaStar,
  FaTimes,
  FaUserCircle,
  FaWallet,
} from "react-icons/fa";
import { GiWorld } from "react-icons/gi";
import { MdDashboard, MdLocalOffer } from "react-icons/md";

export default function MobileDropdown() {
  const { user, role, signOut } = useContext(AuthContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null);

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        closeMenu();
      }
    };

    if (isMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.body.style.overflow = "unset";
    };
  }, [isMenuOpen]);

  const handleSignOut = async () => {
    await signOut();
    closeMenu();
  };

  const mainMenuItems = [
    {
      icon: <FaSearch className="text-xl" />,
      label: "Search Vacations",
      path: "/search",
      color: "text-blue-500",
      bgColor: "bg-blue-50",
    },
    {
      icon: <FaCalendarAlt className="text-xl" />,
      label: "Book Vacation",
      path: "/lastCallVacation",
      color: "text-emerald-500",
      bgColor: "bg-emerald-50",
    },
    {
      icon: <FaGlobeAmericas className="text-xl" />,
      label: "Destinations",
      path: "/search",
      color: "text-purple-500",
      bgColor: "bg-purple-50",
    },
    {
      icon: <MdLocalOffer className="text-xl" />,
      label: "Special Offers",
      path: "/",
      color: "text-amber-500",
      bgColor: "bg-amber-50",
    },
    {
      icon: <FaInfoCircle className="text-xl" />,
      label: "How It Works",
      path: "/",
      color: "text-cyan-500",
      bgColor: "bg-cyan-50",
    },
  ];

  const userMenuItems =
    role === "admin"
      ? [
          {
            icon: <FaCrown className="text-xl" />,
            label: "Admin Panel",
            path: "/admin-panel/admin-overview",
            color: "text-red-500",
          },
          {
            icon: <FaUserCircle className="text-xl" />,
            label: "Profile",
            path: "/profile",
            color: "text-blue-500",
          },
          {
            icon: <FaShieldAlt className="text-xl" />,
            label: "Security",
            path: "/profile",
            color: "text-green-500",
          },
        ]
      : [
          {
            icon: <MdDashboard className="text-xl" />,
            label: "Dashboard",
            path: "/dashboard/overview",
            color: "text-indigo-500",
          },
          {
            icon: <FaUserCircle className="text-xl" />,
            label: "My Profile",
            path: "/profile",
            color: "text-blue-500",
          },
          {
            icon: <FaWallet className="text-xl" />,
            label: "My Account",
            path: "/myAccount",
            color: "text-emerald-500",
          },
          {
            icon: <FaBell className="text-xl" />,
            label: "Notifications",
            path: "/notifications",
            color: "text-amber-500",
          },
          {
            icon: <FaRegHeart className="text-xl" />,
            label: "My Favorites",
            path: "/myFavorites",
            color: "text-pink-500",
          },
          {
            icon: <FaStar className="text-xl" />,
            label: "Points Balance",
            path: "/points",
            color: "text-yellow-500",
          },
        ];

  const supportMenuItems = [
    {
      icon: <FaQuestionCircle className="text-xl" />,
      label: "Help Center",
      path: "/help",
      color: "text-gray-500",
    },
    {
      icon: <FaEnvelope className="text-xl" />,
      label: "Contact Us",
      path: "/contact",
      color: "text-blue-500",
    },
    {
      icon: <GiWorld className="text-xl" />,
      label: "Global Support",
      path: "/",
      color: "text-green-500",
    },
  ];

  const UserProfileHeader = () => (
    <div className="p-4 bg-linear-to-r from-blue-600 to-cyan-500 text-white">
      <div className="flex items-center gap-3">
        {user?.photoURL ? (
          <img
            src={user.photoURL}
            alt={user.name || user.email}
            className="w-14 h-14 rounded-full border-4 border-white/30"
          />
        ) : (
          <div className="relative">
            <FaUserCircle className="w-14 h-14 text-white/90" />
            <div className="absolute bottom-0 right-0 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
          </div>
        )}
        <div className="flex-1">
          <h3 className="font-bold text-lg truncate">
            {user?.name || user?.email}
          </h3>
          <div className="flex items-center gap-2 mt-1">
            <span className="px-2 py-0.5 bg-white/20 rounded-full text-xs font-medium">
              {role === "admin" ? "Administrator" : "Premium Member"}
            </span>
            <span className="text-xs opacity-90">⭐ 4.8</span>
          </div>
        </div>
      </div>
      <div className="mt-3 grid grid-cols-3 gap-2 text-center">
        <div className="bg-white/10 rounded-lg p-2 backdrop-blur-sm">
          <div className="text-sm font-bold">125</div>
          <div className="text-xs opacity-90">Points</div>
        </div>
        <div className="bg-white/10 rounded-lg p-2 backdrop-blur-sm">
          <div className="text-sm font-bold">3</div>
          <div className="text-xs opacity-90">Trips</div>
        </div>
        <div className="bg-white/10 rounded-lg p-2 backdrop-blur-sm">
          <div className="text-sm font-bold">12</div>
          <div className="text-xs opacity-90">Favs</div>
        </div>
      </div>
    </div>
  );

  const GuestHeader = () => (
    <div className="p-4 bg-linear-to-r from-blue-600 to-cyan-500 text-white">
      <div className="flex items-center gap-3">
        <div className="relative">
          <FaUserCircle className="w-14 h-14 text-white/90" />
          <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-white rounded-full flex items-center justify-center">
            <span className="text-blue-600 text-xs font-bold">?</span>
          </div>
        </div>
        <div className="flex-1">
          <h3 className="font-bold text-lg">Guest User</h3>
          <p className="text-sm opacity-90 mt-1">
            Sign in to access member benefits
          </p>
        </div>
      </div>
    </div>
  );

  const MenuItem = ({
    icon,
    label,
    path,
    onClick,
    color = "text-gray-600",
    bgColor = "bg-gray-50",
  }) => (
    <Link
      href={path}
      onClick={() => {
        if (onClick) onClick();
        else closeMenu();
      }}
      className="flex items-center gap-3 p-3 hover:bg-gray-50 active:bg-gray-100 rounded-xl transition-colors duration-200"
    >
      <div className={`p-2.5 rounded-lg ${bgColor} ${color}`}>{icon}</div>
      <span className="font-medium text-gray-700">{label}</span>
      <div className="flex-1"></div>
      <div className="text-gray-400">
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5l7 7-7 7"
          />
        </svg>
      </div>
    </Link>
  );

  const MenuSection = ({ title, items }) => (
    <div className="mb-2">
      {title && (
        <div className="px-4 py-2">
          <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
            {title}
          </h4>
        </div>
      )}
      <div className="space-y-1">
        {items.map((item, index) => (
          <MenuItem key={index} {...item} />
        ))}
      </div>
    </div>
  );

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={toggleMenu}
        className="relative p-2 rounded-lg hover:bg-white/10 active:bg-white/20 transition-colors duration-200"
        aria-label="Toggle menu"
      >
        {isMenuOpen ? (
          <FaTimes className="h-6 w-6 text-white" />
        ) : (
          <FaBars className="h-6 w-6 text-white" />
        )}
        {user && !isMenuOpen && (
          <span className="absolute -top-1 -right-1 w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
        )}
      </button>

      {isMenuOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"></div>
      )}

      <div
        className={`fixed top-0 right-0 h-full w-[85vw] max-w-sm bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-out ${
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="sticky top-0 z-10 bg-white border-b border-gray-100">
          <div className="flex items-end justify-end px-4">
            <button
              onClick={closeMenu}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              aria-label="Close menu"
            >
              <FaTimes className="w-6 h-6 text-end text-gray-600" />
            </button>
          </div>
        </div>

        <div className="h-[calc(100vh-60px)] overflow-y-auto pb-24">
          {user ? <UserProfileHeader /> : <GuestHeader />}

          <div className="p-4">
            {!user && (
              <div className="grid grid-cols-2 gap-3 mb-6">
                <Link
                  href="/login"
                  onClick={closeMenu}
                  className="px-4 py-3 text-center font-semibold text-blue-600 border-2 border-blue-600 rounded-xl hover:bg-blue-50 transition-colors"
                >
                  Log In
                </Link>
                <Link
                  href="/registration"
                  onClick={closeMenu}
                  className="px-4 py-3 text-center font-semibold text-white bg-linear-to-r from-blue-600 to-cyan-500 rounded-xl hover:shadow-lg transition-all"
                >
                  Join Free
                </Link>
              </div>
            )}

            <MenuSection items={mainMenuItems} />

            <div className="my-6 px-4">
              <div className="h-px bg-linear-to-r from-transparent via-gray-200 to-transparent"></div>
            </div>

            {user && (
              <>
                <MenuSection title="My Account" items={userMenuItems} />
                <div className="my-6 px-4">
                  <div className="h-px bg-linear-to-r from-transparent via-gray-200 to-transparent"></div>
                </div>
              </>
            )}

            <MenuSection title="Support & Resources" items={supportMenuItems} />

            <div className="mt-8 px-4">
              <div className="p-4 bg-linear-to-br from-gray-50 to-white border border-gray-100 rounded-2xl">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 bg-linear-to-r from-amber-500 to-orange-400 rounded-lg">
                    <FaStar className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">
                      RCI Mobile App
                    </h4>
                    <p className="text-sm text-gray-600">Book on the go</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button className="flex-1 px-3 py-2 bg-black text-white text-sm font-medium rounded-lg hover:bg-gray-800 transition-colors">
                    App Store
                  </button>
                  <button className="flex-1 px-3 py-2 bg-green-600 text-white text-sm font-medium rounded-lg hover:bg-green-700 transition-colors">
                    Play Store
                  </button>
                </div>
              </div>
            </div>

            <div className="mt-6 px-4">
              <div className="flex flex-wrap gap-4">
                <Link
                  href="/privacy"
                  onClick={closeMenu}
                  className="text-xs text-gray-500 hover:text-blue-600 transition-colors"
                >
                  Privacy Policy
                </Link>
                <Link
                  href="/terms"
                  onClick={closeMenu}
                  className="text-xs text-gray-500 hover:text-blue-600 transition-colors"
                >
                  Terms of Service
                </Link>
                <Link
                  href="/cookies"
                  onClick={closeMenu}
                  className="text-xs text-gray-500 hover:text-blue-600 transition-colors"
                >
                  Cookie Policy
                </Link>
              </div>
              <p className="text-xs text-gray-400 mt-4">
                © {new Date().getFullYear()} RCI, LLC. All rights reserved.
              </p>
            </div>
          </div>
        </div>

        {user && (
          <div className="absolute bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-100 shadow-[0_-4px_12px_rgba(0,0,0,0.05)]">
            <button
              onClick={handleSignOut}
              className="w-full flex items-center justify-center gap-3 px-4 py-3 bg-linear-to-r from-gray-50 to-white border-2 border-gray-200 text-gray-700 font-semibold rounded-xl hover:bg-gray-50 hover:border-gray-300 active:scale-[0.98] transition-all duration-200"
            >
              <FaSignOutAlt className="text-lg text-gray-600" />
              <span>Sign Out</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
