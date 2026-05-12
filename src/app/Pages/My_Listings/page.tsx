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
  Loader2,
  Trash2 // Added for the delete functionality
} from "lucide-react";

// 1. Updated Interface to match your Java Record/Entity exactly
interface Listing {
  id: number;
  name: string;
  category: string;
  price: number;
  deposit: number;
  condition: string;
  location: string;
  description: string;
  imageUrl: string; // Changed from 'images: string[]' to match your Spring Boot String field
  status?: 'active' | 'rented' | 'available'; // Optional if not in DB yet
  views?: number;
  bookings?: number;
}

export default function MyListings() {
  const [listings, setListings] = useState<Listing[]>([]);
  const [loading, setLoading] = useState(true);

  // --- FETCH DATA FROM SPRING BOOT BACKEND ---
  useEffect(() => {
    async function fetchListings() {
      try {
        setLoading(true);
        const token = localStorage.getItem("access_token");

        if (!token) {
          console.error("No access token found");
          return;
        }

        // Calling your Spring Boot "My Listings" endpoint
        const response = await fetch("http://localhost:9090/api/products/my-listings", {
          headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
          }
        });
        if (!response.ok) {
 
      const errorBody = await response.text();
      console.error("Backend Error Status:", response.status);
      console.error("Backend Error Body:", errorBody);
      throw new Error(`Failed: ${response.status} ${errorBody}`);
}

        

        const data = await response.json();
        setListings(data);
      } catch (error: any) {
        console.error("Error fetching listings:", error.message);
      } finally {
        setLoading(false);
      }
    }

    fetchListings();
  }, []);

  // --- DELETE FUNCTIONALITY ---
  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this listing?")) return;

    try {
      const token = localStorage.getItem("access_token");
      const response = await fetch(`http://localhost:9090/api/products/delete/${id}`, {
        method: "DELETE",
        headers: { "Authorization": `Bearer ${token}` }
      });

      if (response.ok) {
        setListings(prev => prev.filter(l => l.id !== id));
      } else {
        alert("Failed to delete product");
      }
    } catch (err) {
      console.error("Delete error:", err);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4">
        <Loader2 className="w-10 h-10 animate-spin text-emerald-600" />
        <p className="text-gray-500 font-medium">Loading your listings...</p>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">My Listings</h1>
            <p className="text-gray-600 mt-1">Manage your RentTrust equipment</p>
          </div>
          <Link
            href="/Pages/Add_Listing"
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
            value={listings.length} // Assuming all fetched are active for now
            color="text-emerald-600"
          />
          <StatCard title="Total Deposit Value" value={listings.reduce((sum, l) => sum + (l.deposit || 0), 0)} />
          <StatCard title="Total Views" value={0} />
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
                      src={listing.imageUrl || "/placeholder.png"}
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
                          <p className="text-sm text-gray-500">{listing.category} • {listing.condition}</p>
                        </div>
                        <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold uppercase bg-green-100 text-green-700">
                          {listing.location}
                        </span>
                      </div>

                      <div className="flex items-baseline gap-1 mb-4">
                        <span className="text-xl font-bold text-gray-900">${listing.price}</span>
                        <span className="text-xs text-gray-500">/ day</span>
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
                      <button 
                        onClick={() => handleDelete(listing.id)}
                        className="px-3 py-2 border border-red-200 text-red-500 rounded-lg hover:bg-red-50 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
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