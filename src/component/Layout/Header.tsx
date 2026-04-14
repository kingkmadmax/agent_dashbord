"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { useAuthStore } from "@/Store/useAuthStore";

import { Menu, User } from "lucide-react";

type Location = { value: string; label: string };

const locations: Location[] = [
  { value: "Addis Ababa", label: "Addis Ababa" },
  { value: "Bahir Dar", label: "Bahir Dar" },
  { value: "Dire Dawa", label: "Dire Dawa" },
  { value: "Mekelle", label: "Mekelle" },
  { value: "Gondar", label: "Gondar" },
  { value: "Hawassa", label: "Hawassa" },
];

export default function Header() {
  const pathname = usePathname();
  const router = useRouter();

  // --- STATE ---
  const [selectedLocation, setSelectedLocation] = useState("Addis Ababa");
  const [isOpen, setIsOpen] = useState(false); // Location dropdown
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // User dropdown
  const [inputValue, setInputValue] = useState("");

  // --- REFS ---
  const userDropdownRef = useRef<HTMLDivElement>(null);
  const locationDropdownRef = useRef<HTMLDivElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  // --- CLICK OUTSIDE ---
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      if (userDropdownRef.current && !userDropdownRef.current.contains(target)) setIsDropdownOpen(false);
      if (locationDropdownRef.current && !locationDropdownRef.current.contains(target)) setIsOpen(false);
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(target)) setMobileMenuOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // --- DATA ---
  const currentLocation = locations.find((loc) => loc.value === selectedLocation) || locations[0];

  const user = useAuthStore((state: any) => state.user);

  // --- ROUTE HIDING ---
  const hideHeaderRoutes = [
    "/pages/auth/signup",
    "/pages/auth/login",
    "/pages/auth/passwordrest",
  ];

  if (hideHeaderRoutes.includes(pathname?.toLowerCase())) {
    return null;
  }

  const handleLogout = async () => {
    // Import supabase to sign out properly
    const { supabase } = await import("@/lib/supabase");
    await supabase.auth.signOut();
    router.push("/Pages/auth/LogIn");
    setIsDropdownOpen(false);
  };

  const menuItems = user ? [
    { label: "Profile", action: () => { router.push("/profile"); setIsDropdownOpen(false); } },
    { label: "Settings", action: () => { router.push("/settings"); setIsDropdownOpen(false); } },
    { label: "Logout", action: handleLogout },
  ] : [
    { label: "Login", action: () => { router.push("/Pages/auth/LogIn"); setIsDropdownOpen(false); } },
    { label: "Sign Up", action: () => { router.push("/Pages/auth/SignUp"); setIsDropdownOpen(false); } },
  ];

  const handleSearch = () => {
    if (!inputValue.trim()) return;
    router.push(`/search?query=${encodeURIComponent(inputValue)}&location=${selectedLocation}`);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white/95 backdrop-blur">
      <div className="w-full px-2 sm:px-4">
        <div className="flex items-center justify-between gap-2 py-2 max-w-[1400px] mx-auto">

          {/* LEFT: Menu + Logo */}
          <div className="flex items-center gap-2 shrink-0">
            <div ref={mobileMenuRef} className="lg:hidden">
              <button className="p-1" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
                <Menu className="h-6 w-6" />
              </button>
            </div>
            <Link href="/" className="flex items-center gap-1">
              <span className="text-2xl sm:text-3xl font-extrabold text-blue-600">Et</span>
              <span className="text-2xl sm:text-3xl font-extrabold text-black">Rent</span>
            </Link>
          </div>


          {/* RIGHT: Nav + Account */}
          <div className="flex items-center gap-1 sm:gap-3 shrink-0">
            <nav className="hidden xl:flex items-center gap-6">
              <Link href="/HeaderEliment/about" className="text-xs font-medium hover:text-blue-600">About</Link>
              <Link href="/HeaderEliment/Fax" className="text-xs font-medium hover:text-blue-600">FAQs</Link>

            </nav>

            <div ref={userDropdownRef} className="relative">
              <button onClick={() => setIsDropdownOpen(!isDropdownOpen)} className="p-1.5 hover:bg-gray-100 rounded-full">
                <User className="h-6 w-6 text-gray-700" />
              </button>
              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-40 bg-white rounded-xl shadow-lg border py-2 z-50">
                  {menuItems.map((item, i) => (
                    <button
                      key={i}
                      onClick={() => { item.action(); setIsDropdownOpen(false); }}
                      className="w-full text-left px-4 py-2 hover:bg-gray-100 text-xs text-gray-700"
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* MOBILE MENU CONTENT */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t py-2 bg-white flex flex-col px-4 text-sm gap-2">
            <Link href="/HeaderEliment/about" onClick={() => setMobileMenuOpen(false)}>About</Link>

            <Link href="/HeaderEliment/Fax" onClick={() => setMobileMenuOpen(false)}>FAQs</Link>
          </div>
        )}
      </div>
    </header>
  );
}