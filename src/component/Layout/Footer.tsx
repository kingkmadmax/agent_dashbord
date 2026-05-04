"use client";

import { PaperAirplaneIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import SocialCard from "@/component/SocialCard";

export default function Footer() {
  return (
    <footer className="bg-black text-gray-400 py-12 mt-16 border-t border-gray-800">
      <div className="max-w-[1440px] mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-10">
        
        {/* 1. Brand & Subscription */}
        <div className="space-y-4">
          <h3 className="text-xl font-bold text-white tracking-tight">Exclusive</h3>
          <div className="space-y-2">
            <p className="text-sm font-medium text-gray-200">Subscribe</p>
            <p className="text-xs leading-relaxed">
              Get 10% off your first rental. Stay updated with new listings.
            </p>
          </div>

          <div className="relative group max-w-[220px]">
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full bg-transparent border border-gray-700 rounded-md p-2.5 pr-10 text-xs text-white placeholder:text-gray-600 outline-none focus:border-white transition-colors"
            />
            <button className="absolute right-3 top-1/2 -translate-y-1/2 hover:text-white transition-colors">
              <PaperAirplaneIcon className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* 2. Support */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-white">Support</h3>
          <div className="space-y-3 text-xs">
            <p className="hover:text-white cursor-pointer transition-colors">Contact Us</p>
            <p>
              <span className="block text-gray-600 mb-1 font-bold uppercase tracking-widest">Phone</span>
              +251 123 456 789
            </p>
            <p>
              <span className="block text-gray-600 mb-1 font-bold uppercase tracking-widest">Email</span>
              EthioRent@gmail.com
            </p>
          </div>
        </div>

        {/* 3. Accounts */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-white">Account</h3>
          <ul className="space-y-3 text-xs">
            <li><Link href="/Pages/auth/LogIn" className="hover:text-white transition-colors">Login / Register</Link></li>
            <li><Link href="/cart" className="hover:text-white transition-colors">Cart</Link></li>
            <li><Link href="/wishlist" className="hover:text-white transition-colors">Wishlist</Link></li>
            <li><Link href="/shop" className="hover:text-white transition-colors">Shop</Link></li>
          </ul>
        </div>

        {/* 4. Quick Links */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-white">Quick Links</h3>
          <ul className="space-y-3 text-xs">
            <li><Link href="/" className="hover:text-white transition-colors">Privacy Policy</Link></li>
            <li><Link href="/about" className="hover:text-white transition-colors">About Us</Link></li>
            <li><Link href="/HeaderEliment/Fax" className="hover:text-white transition-colors">FAQ</Link></li>
            <li><Link href="/HeaderEliment/contact" className="hover:text-white transition-colors">Contact</Link></li>
          </ul>
        </div>

        {/* 5. Socials */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-white">Follow Us</h3>
          <div className="flex flex-wrap gap-4">
             <SocialCard />
          </div>
        </div>
      </div>

      {/* Bottom Copyright Area */}
      <div className="border-t border-gray-900 mt-16 pt-8">
        <div className="max-w-[1440px] mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] uppercase tracking-widest text-gray-600">
          <p>© 2026 EthioRent. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
            <Link href="/cookies" className="hover:text-white transition-colors">Cookies Settings</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}