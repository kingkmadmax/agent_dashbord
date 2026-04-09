import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google"; // 1. Import the font functions
import "./globals.css";
import Drawer from "@/component/Layout/Drower"; // Double check your spelling (Drawer vs Drower)
import Header from "@/component/Layout/Header";
import Footer from "@/component/Layout/Footer";

// 2. YOU MUST INITIALIZE THEM HERE (Outside the function)
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "EthiRent | Agent Dashboard",
  description: "Manage your professional equipment rentals",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-gray-50">
        <Header />
        
        {/* Main layout wrapper */}
        <div className="flex flex-1">
          <Drawer />
          <main className="flex-1 p-6">
            {children}
          </main>
        </div>

        <Footer />
      </body>
    </html>
  );
}