"use client";

import Link from "next/link";
import {
  FaFacebook,
  FaInstagram,
  FaPinterest,
  FaTwitter,
  FaYoutube,
} from "react-icons/fa";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#edebef] px-6 py-12 text-gray-700">
      <div className="mx-auto max-w-7xl">
        {/* Footer Content Grid */}
        <div className="mb-8 grid gap-8 md:grid-cols-4">
          {/* Column 1 */}
          <div>
            <h3 className="mb-4 font-bold text-gray-900">Explore RCI</h3>
            <nav className="flex flex-col gap-2">
              <Link href="/about" className="text-sm hover:text-[#037092]">
                About RCI
              </Link>
              <Link href="/resorts" className="text-sm hover:text-[#037092]">
                Resort Directory
              </Link>
              <Link href="/magazine" className="text-sm hover:text-[#037092]">
                RCI Magazine
              </Link>
            </nav>
          </div>

          {/* Column 2 */}
          <div>
            <h3 className="mb-4 font-bold text-gray-900">Support</h3>
            <nav className="flex flex-col gap-2">
              <Link href="/help" className="text-sm hover:text-[#037092]">
                Help Center
              </Link>
              <Link href="/contact" className="text-sm hover:text-[#037092]">
                Contact Us
              </Link>
              <Link href="/faq" className="text-sm hover:text-[#037092]">
                FAQs
              </Link>
            </nav>
          </div>

          {/* Column 3 */}
          <div>
            <h3 className="mb-4 font-bold text-gray-900">Legal</h3>
            <nav className="flex flex-col gap-2">
              <Link href="/privacy" className="text-sm hover:text-[#037092]">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-sm hover:text-[#037092]">
                Terms of Service
              </Link>
              <Link href="/cookies" className="text-sm hover:text-[#037092]">
                Cookie Policy
              </Link>
            </nav>
          </div>

          {/* Column 4 - Social */}
          <div>
            <h3 className="mb-4 font-bold text-gray-900">Follow Us</h3>
            <div className="flex gap-4">
              <a
                href="https://facebook.com"
                className="text-gray-700 transition hover:text-[#037092]"
              >
                <FaFacebook size={24} />
              </a>
              <a
                href="https://instagram.com"
                className="text-gray-700 transition hover:text-[#037092]"
              >
                <FaInstagram size={24} />
              </a>
              <a
                href="https://twitter.com"
                className="text-gray-700 transition hover:text-[#037092]"
              >
                <FaTwitter size={24} />
              </a>
              <a
                href="https://pinterest.com"
                className="text-gray-700 transition hover:text-[#037092]"
              >
                <FaPinterest size={24} />
              </a>
              <a
                href="https://youtube.com"
                className="text-gray-700 transition hover:text-[#037092]"
              >
                <FaYoutube size={24} />
              </a>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="mb-6 border-t border-gray-300" />

        {/* Copyright */}
        <div className="text-center text-sm text-gray-600">
          <p>© {currentYear} RCI Vacations. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
