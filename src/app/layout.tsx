"use client"; // This allows us to use useEffect and Zustand

import { useEffect } from "react";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { supabase } from "@/lib/supabase";
import { useAuthStore } from "@/Store/useAuthStore";
import { usePathname } from "next/navigation";

// Components
import Drawer from "@/component/Layout/Drower";
import Header from "@/component/Layout/Header";
import Footer from "@/component/Layout/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const setUser = useAuthStore((state) => state.setUser);
  const fetchProfile = useAuthStore((state) => state.fetchProfile);
  const pathname = usePathname();

  useEffect(() => {
    // 1. Check current session on mount
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        setUser(session.user);
        fetchProfile(session.user.id);
      }
    });

    // 2. Listen for auth changes (login, logout, token refresh)
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      if (session?.user) {
        fetchProfile(session.user.id);
      }
    });

    return () => subscription.unsubscribe();
  }, [setUser, fetchProfile]);

  const isAuthPage = [
    "/pages/auth/signup",
    "/pages/auth/login",
    "/pages/auth/passwordrest",
  ].includes(pathname?.toLowerCase() || "");

  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        {/* Header has its own internal hide logic, but optionally you can hide it here too */}
        <Header />

        {/* Main layout wrapper */}
        <div className="flex flex-1">
          {!isAuthPage && <Drawer />}
          <main className={`flex-1 ${!isAuthPage ? 'p-6' : ''}`}>
            {children}
          </main>
        </div>

        {!isAuthPage && <Footer />}
      </body>
    </html>
  );
}