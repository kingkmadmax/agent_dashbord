"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Package,
  Edit,
  Eye,
  MoreVertical,
  TrendingUp,
  Loader2
} from "lucide-react";
import { supabase } from "@/lib/supabase"; // Ensure your supabase client is imported

// 1. Define the Interface to match your Database columns
interface Listing {
  id: number;
  name: string;      // Changed from 'title' to 'name' to match your previous DB setup
  category: string;
  price: number;
  status: 'active' | 'rented' | 'available';
  images: string[];   // Changed to array since we set the DB to text[]
  // If you don't have views/bookings in DB yet, we can default them to 0
  views?: number;
  bookings?: number;
}

export default function MyListings() {
  const [listings, setListings] = useState<Listing[]>([]);
  const [loading, setLoading] = useState(true);

  // --- FETCH DATA FROM SUPABASE ---
  useEffect(() => {
    async function fetchListings() {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from('rentals')
          .select('*')
          .order('created_at', { ascending: false });

        if (error) throw error;
        if (data) setListings(data);
      } catch (error: any) {
        console.error("Error fetching listings:", error.message);
      } finally {
        setLoading(false);
      }
    }

    fetchListings();
  }, []);

 

  return (
    <div className="bg-white min-h-screen p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">My Listings</h1>
            <p className="text-gray-600 mt-1">Manage your rental listings</p>
          </div>
          <Link
            href="/Pages/agent/Add_Listing"
            className="bg-emerald-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-emerald-700 transition-colors inline-flex items-center gap-2"
          >
            <Package className="w-5 h-5" />
            Add New Listing
          </Link>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          <StatCard title="Total Listings" value={listings.length} />
          <StatCard
            title="Active"
            value={listings.filter((l) => l.status === "available" || l.status === "active").length}
            color="text-emerald-600"
          />
          <StatCard
            title="Currently Rented"
            value={listings.filter((l) => l.status === "rented").length}
            color="text-orange-600"
          />
          <StatCard
            title="Total Bookings"
            value={listings.reduce((sum, l) => sum + (l.bookings || 0), 0)}
          />
        </div>

        {/* Listings Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {listings.length === 0 ? (
            <div className="col-span-full py-20 text-center bg-white rounded-xl border border-dashed border-gray-300">
              <Package className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900">No listings found</h3>
              <p className="text-gray-500">Click "Add New Listing" to get started.</p>
            </div>
          ) : (
            listings.map((listing) => (
              <div
                key={listing.id}
                className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-md transition-shadow"
              >
                <div className="flex flex-col sm:flex-row">
                  <div className="relative w-full sm:w-48 h-48 bg-gray-100">
                    <Image
                      // We take the first image from the array, or a placeholder if empty
                      src={listing.images && listing.images.length > 0 ? listing.images[0] : "/placeholder.png"}
                      alt={listing.name}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 200px"
                    />
                  </div>

                  <div className="flex-1 p-6 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="text-lg font-bold text-gray-900 leading-tight">
                            {listing.name}
                          </h3>
                          <p className="text-sm text-gray-500">{listing.category}</p>
                        </div>
                        <span
                          className={`px-2.5 py-0.5 rounded-full text-xs font-semibold uppercase ${listing.status === "available" || listing.status === "active"
                              ? "bg-green-100 text-green-700"
                              : "bg-orange-100 text-orange-700"
                            }`}
                        >
                          {listing.status}
                        </span>
                      </div>

                      <div className="flex items-baseline gap-1 mb-4">
                        <span className="text-xl font-bold text-gray-900">${listing.price}</span>
                        <span className="text-xs text-gray-500">/ day</span>
                      </div>

                      <div className="flex items-center gap-4 mb-4 text-sm text-gray-600">
                        <div className="flex items-center gap-1">
                          <Eye className="w-4 h-4" />
                          <span>{listing.views || 0}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <TrendingUp className="w-4 h-4" />
                          <span>{listing.bookings || 0}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Link
                        href={`/Pages/edit-listing/${listing.id}`}
                        className="flex-1 px-4 py-2 bg-slate-900 text-white rounded-lg text-sm font-medium hover:bg-slate-800 flex items-center justify-center gap-2 transition-colors"
                      >
                        <Edit className="w-4 h-4" />
                        Edit
                      </Link>
                      <button className="px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                        <MoreVertical className="w-4 h-4 text-gray-600" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

function StatCard({ title, value, color = "text-gray-900" }: { title: string, value: number, color?: string }) {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm">
      <p className="text-sm font-medium text-gray-500">{title}</p>
      <p className={`text-2xl font-bold mt-1 ${color}`}>{value}</p>
    </div>
  );
}