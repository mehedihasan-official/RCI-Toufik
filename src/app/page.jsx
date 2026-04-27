"use client";

import Link from "next/link";
import { FaArrowRight } from "react-icons/fa";
import { IoCalendar, IoCard, IoGlobe, IoStar } from "react-icons/io5";

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative min-h-screen overflow-hidden bg-gradient-to-br from-blue-900 via-blue-800 to-cyan-700 px-6 py-20">
        {/* Animated Background Circles */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -right-32 -top-32 h-96 w-96 rounded-full bg-cyan-500 opacity-10 blur-3xl animation-pulse" />
          <div className="absolute -left-32 bottom-32 h-96 w-96 rounded-full bg-blue-400 opacity-10 blur-3xl animation-pulse" />
        </div>

        {/* Content */}
        <div className="relative mx-auto flex min-h-screen max-w-6xl flex-col items-center justify-center text-center">
          {/* Badge */}
          <div className="mb-8 inline-block rounded-full bg-white/20 px-6 py-2 text-sm font-semibold text-white backdrop-blur">
            ✨ WORLD'S LARGEST VACATION EXCHANGE
          </div>

          {/* Main Heading */}
          <h1 className="mb-6 max-w-3xl text-5xl font-bold leading-tight text-white md:text-6xl">
            Your Passport to Extraordinary
            <span className="block bg-gradient-to-r from-cyan-300 to-white bg-clip-text text-transparent">
              Vacations
            </span>
          </h1>

          {/* Subtitle */}
          <p className="mb-8 max-w-2xl text-lg text-cyan-100">
            Discover world-class resorts in 110+ countries with our exclusive
            vacation exchange program.
          </p>

          {/* Search / CTA */}
          <div className="mb-12 flex flex-col gap-4 sm:flex-row">
            <input
              type="text"
              placeholder="Search destinations..."
              className="rounded-lg border border-white/30 bg-white/10 px-6 py-3 text-white placeholder-white/60 backdrop-blur transition hover:bg-white/20 focus:border-white/60 focus:bg-white/20 focus:outline-none"
            />
            <Link
              href="/lastCallVacation"
              className="rounded-lg bg-white px-8 py-3 font-semibold text-[#037092] hover:bg-cyan-50"
            >
              Explore Now
            </Link>
          </div>

          {/* Stats Row */}
          <div className="grid w-full max-w-3xl grid-cols-2 gap-6 md:grid-cols-4">
            <div className="text-center">
              <p className="text-3xl font-bold text-white">4,300+</p>
              <p className="text-sm text-cyan-100">Resorts</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-white">110+</p>
              <p className="text-sm text-cyan-100">Countries</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-white">7M+</p>
              <p className="text-sm text-cyan-100">Members</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-white">45+</p>
              <p className="text-sm text-cyan-100">Years</p>
            </div>
          </div>
        </div>
      </section>

      {/* Account Status Alert */}
      <section className="border-b border-slate-200 bg-white px-6 py-12">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-8 md:grid-cols-3">
            {/* Alert Card */}
            <div className="rounded-lg border-2 border-red-200 bg-red-50 p-6">
              <p className="text-sm font-semibold text-red-600">
                RCI POINTS BALANCE
              </p>
              <p className="mt-2 text-3xl font-bold text-red-700">0</p>
              <p className="mt-2 text-sm text-red-600">
                Deposit your RCI points to start booking vacations at our
                partner resorts worldwide.
              </p>
            </div>

            {/* Ready to Travel */}
            <div className="rounded-lg bg-gradient-to-br from-blue-50 to-cyan-50 p-6">
              <h3 className="text-lg font-bold text-gray-900">
                Ready to Travel?
              </h3>
              <button className="mt-4 w-full rounded-lg bg-[#037092] px-6 py-3 font-semibold text-white hover:bg-blue-700">
                Deposit My Points
              </button>
              <p className="mt-3 text-xs text-gray-600">
                💡 Pro Tip: RCI members enjoy world-class resorts with premium
                amenities.
              </p>
            </div>

            {/* Spacer / Info */}
            <div className="rounded-lg bg-blue-50 p-6">
              <h3 className="text-lg font-bold text-gray-900">
                Member Benefits
              </h3>
              <ul className="mt-3 space-y-1 text-sm text-gray-700">
                <li>✓ Exchange privileges</li>
                <li>✓ Exclusive offers</li>
                <li>✓ Priority booking</li>
                <li>✓ Travel rewards</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-white px-6 py-16">
        <div className="mx-auto max-w-6xl">
          <h2 className="mb-12 text-center text-4xl font-bold text-gray-900">
            Why Choose RCI?
          </h2>

          <div className="grid gap-8 md:grid-cols-4">
            <div className="rounded-lg border border-slate-200 p-6 text-center">
              <div className="mb-4 flex justify-center">
                <div className="rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 p-4">
                  <IoGlobe size={32} className="text-white" />
                </div>
              </div>
              <h3 className="mb-2 font-bold text-gray-900">Global Network</h3>
              <p className="text-sm text-gray-600">
                Access resorts in 110+ countries worldwide
              </p>
            </div>

            <div className="rounded-lg border border-slate-200 p-6 text-center">
              <div className="mb-4 flex justify-center">
                <div className="rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 p-4">
                  <IoCalendar size={32} className="text-white" />
                </div>
              </div>
              <h3 className="mb-2 font-bold text-gray-900">Flexible Booking</h3>
              <p className="text-sm text-gray-600">
                Book your vacation on your schedule
              </p>
            </div>

            <div className="rounded-lg border border-slate-200 p-6 text-center">
              <div className="mb-4 flex justify-center">
                <div className="rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 p-4">
                  <IoStar size={32} className="text-white" />
                </div>
              </div>
              <h3 className="mb-2 font-bold text-gray-900">Premium Quality</h3>
              <p className="text-sm text-gray-600">
                Hand-selected resorts with world-class amenities
              </p>
            </div>

            <div className="rounded-lg border border-slate-200 p-6 text-center">
              <div className="mb-4 flex justify-center">
                <div className="rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 p-4">
                  <IoCard size={32} className="text-white" />
                </div>
              </div>
              <h3 className="mb-2 font-bold text-gray-900">Value Protection</h3>
              <p className="text-sm text-gray-600">
                Guaranteed lowest prices and member protections
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Magazine Section */}
      <section className="bg-slate-50 px-6 py-16">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-12 md:grid-cols-2">
            {/* Image */}
            <div className="flex items-center">
              <img
                src="https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=500&h=600&fit=crop"
                alt="RCI Magazine"
                className="rounded-lg shadow-lg"
              />
            </div>

            {/* Content */}
            <div className="flex flex-col justify-center">
              <h2 className="mb-4 text-4xl font-bold text-gray-900">
                RCI Magazine®
              </h2>
              <p className="mb-6 text-gray-700">
                Discover inspiring travel stories, destination guides, and
                insider tips from our community. Your monthly source for
                vacation inspiration and expert advice.
              </p>
              <div className="mb-6 flex items-center gap-2">
                <span className="text-2xl">★★★★★</span>
                <span className="text-sm text-gray-600">5-star rating</span>
              </div>
              <button className="w-fit rounded-lg bg-[#037092] px-8 py-3 font-semibold text-white hover:bg-blue-700">
                Explore Latest Issue
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Destinations */}
      <section className="bg-white px-6 py-16">
        <div className="mx-auto max-w-6xl">
          <h2 className="mb-12 text-center text-4xl font-bold text-gray-900">
            Featured Destinations
          </h2>

          <div className="mb-8 grid gap-6 md:grid-cols-4">
            {[
              {
                name: "Hawaii",
                image:
                  "https://images.unsplash.com/photo-1542259009477-d625272157b7?w=400&h=300&fit=crop",
                count: "340",
              },
              {
                name: "Caribbean",
                image:
                  "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop",
                count: "280",
              },
              {
                name: "Europe",
                image:
                  "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=400&h=300&fit=crop",
                count: "620",
              },
              {
                name: "Asia",
                image:
                  "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=400&h=300&fit=crop",
                count: "450",
              },
            ].map((dest) => (
              <div
                key={dest.name}
                className="group relative overflow-hidden rounded-lg shadow-lg"
              >
                <img
                  src={dest.image}
                  alt={dest.name}
                  className="h-64 w-full object-cover transition group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <h3 className="text-2xl font-bold">{dest.name}</h3>
                  <p className="text-sm">{dest.count} Resorts</p>
                  <FaArrowRight className="mt-2 transition group-hover:translate-x-2" />
                </div>
              </div>
            ))}
          </div>

          <div className="text-center">
            <Link
              href="/lastCallVacation"
              className="text-[#037092] font-semibold hover:underline"
            >
              View All Destinations →
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="bg-gradient-to-r from-blue-900 to-cyan-700 px-6 py-16 text-center text-white">
        <h2 className="mb-4 text-4xl font-bold">
          Ready for Your Next Adventure?
        </h2>
        <p className="mb-8 text-lg">
          Join millions of members exploring extraordinary vacation destinations
        </p>
        <div className="flex flex-col justify-center gap-4 sm:flex-row">
          <Link
            href="/lastCallVacation"
            className="rounded-lg bg-white px-8 py-3 font-semibold text-[#037092] hover:bg-cyan-50"
          >
            Start Booking
          </Link>
          <button className="rounded-lg border-2 border-white px-8 py-3 font-semibold hover:bg-white/10">
            Contact Member Services
          </button>
        </div>
      </section>
    </>
  );
}
