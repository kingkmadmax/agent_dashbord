"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronRight, ChevronLeft } from "lucide-react";

interface NavItem {
  label: string;
  path: string;
}

export const Drawer: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const pathname = usePathname();

  const navigation: NavItem[] = [
    { label: 'Dashboard', path: '/Pages/Dashboard' }, 
    { label: 'Add Listing', path: '/Pages/Add_Listing' },
    { label: 'My Listings', path: '/Pages/My_Listings' },
    { label: 'Booking Request', path: '/Pages/Booking_Request' },
    { label: 'Earnings', path: '/Pages/Earnings' },
    { label: 'Payout', path: '/Pages/Payout' },
    { label: 'Reviews', path: '/Pages/Reviews' },
    { label: 'Messages', path: '/Pages/Messages' },
    { label: 'Analytics', path: '/Pages/Analytics' },
  ];

  return (
    <>
      {/* 1. Backdrop (Closes drawer when clicking outside) */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[100]"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* 2. MAIN BUTTON - This stays "Fixed" to the screen edge */}
      {/* It toggles between Menu and ChevronLeft icons */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className={`
          fixed left-0 top-1/2 -translate-y-1/2 z-[120] 
          p-2 bg-blue-600 text-white 
          w-10 h-14 flex items-center 
          rounded-r-xl shadow-2xl transition-all duration-300
          hover:bg-blue-700
          ${isOpen ? 'translate-x-64' : 'translate-x-0'}
        `}
      >
        {isOpen ? <ChevronLeft className='' size={20} /> : <ChevronRight size={20} />}
      </button>

      {/* 3. SIDEBAR PANEL */}
      <aside className={`
        fixed inset-y-0 h-full left-0 z-[110] w-64 
        bg-white border-r border-gray-200 
        transform transition-transform duration-300 ease-in-out shadow-2xl
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        
        <div className="flex flex-col h-full">
          {/* Header */}
       
          
          {/* Navigation Links */}
          <nav className="flex-1 p-4 space-y-1">
            {navigation.map((item) => {
              const isActive = pathname === item.path;
              return (
                <Link
                  key={item.path}
                  href={item.path}
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center px-4 py-3 rounded-xl transition-all ${
                    isActive 
                      ? 'bg-blue-50 text-blue-700 font-semibold' 
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* Footer */}
          <div className="p-4 border-t bg-gray-50 text-center">
            <span className="text-[10px] text-gray-400 font-mono italic">V 1.0.4</span>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Drawer;