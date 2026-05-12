"use client"; // This allows us to use useEffect and Zustand

import { useEffect } from "react";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

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
          <Drawer />
          <main className="flex-1 lg:pl-64">
          {children}
          </main>
        </div>

       <Footer />
      </body>
    </html>
  );
}