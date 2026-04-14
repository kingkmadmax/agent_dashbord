"use client"; // Add this if you use any interactivity later

import { PaperAirplaneIcon } from "@heroicons/react/24/outline";
import Link from "next/link"; // Use Next.js Link
import SocialCard from "@/component/SocialCard"; // Check if it's 'components' or 'component'

export default function Footer() {
  return (
    <footer className="bg-black text-gray-300 py-10 mt-10">
      {/* Container - changed gap and spacing for better layout */}
      <div className="max-w-[1400px] mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-10">

        {/* Section 1: Exclusive */}
        <div className="space-y-4">
          <h3 className="text-xl font-bold text-white">Exclusive</h3>
          <p className="text-sm font-medium">Subscription</p>
          <p className="text-xs">Get 10% off your first rental</p>

          <div className="relative w-full max-w-[200px]">
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full bg-transparent border border-gray-600 rounded-md p-2 pr-10 text-xs text-white outline-none focus:border-blue-500"
            />
            <PaperAirplaneIcon
              className="w-5 h-5 text-gray-400 absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer hover:text-white"
            />
          </div>
        </div>

        {/* Section 2: Support */}
        <div className="space-y-4">
          <h3 className="text-xl font-bold text-white">Support</h3>
          <p className="text-sm">Contact Us</p>
          <div className="text-xs space-y-2">
            <p>Phone: +251 123 456 789</p>
            <p>Email: EthioRent@gmail.com</p>
          </div>
        </div>

        {/* Section 3: Accounts */}
        <div className="space-y-4">
          <h3 className="text-xl font-bold text-white">Accounts</h3>
          <ul className="space-y-2 text-sm">
            <li><Link href="/pages/auth/login" className="hover:text-white transition">Login / Register</Link></li>
            <li><Link href="/cart" className="hover:text-white transition">Cart</Link></li>
          </ul>
        </div>

        {/* Section 4: Quick Links */}
        <div className="space-y-4">
          <h3 className="text-xl font-bold text-white">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li><Link href="/" className="hover:text-white transition">Privacy Policy</Link></li>
            <li><Link href="/about" className="hover:text-white transition">About</Link></li>
            <li><Link href="/faq" className="hover:text-white transition">FAQ</Link></li>
            <li><Link href="/contact" className="hover:text-white transition">Contact</Link></li>
          </ul>
        </div>

        {/* Section 5: Socials */}
        <div className="space-y-4">
          <h3 className="text-xl font-bold text-white">Our Socials</h3>
          <div className="flex gap-4">
            <SocialCard />
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800 mt-12 pt-6 text-center text-xs">
        <Link href="/terms" className="hover:text-white transition">
          © 2026 EthioRent. All rights reserved. Terms and Service
        </Link>
      </div>
    </footer>
  );
}