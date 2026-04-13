import React from "react";
import Image from "next/image";
import Link from "next/link";
import { 
  Package, 
  Edit, 
  Eye, 
  MoreVertical, 
  TrendingUp 
} from "lucide-react";

// 1. Define the Interface for Type Safety
interface Listing {
  id: number;
  title: string;
  category: string;
  price: number;
  status: 'active' | 'rented';
  views: number;
  bookings: number;
  image: string;
}

const listings: Listing[] = [
  {
    id: 1,
    title: "Canon EOS R5 Camera",
    category: "Cameras & Photography",
    price: 85,
    status: "active",
    views: 234,
    bookings: 12,
    image: "/next.svg", // Replace with your actual image path
  },
  {
    id: 2,
    title: "DJI Mavic 3 Drone",
    category: "Electronics",
    price: 120,
    status: "active",
    views: 189,
    bookings: 8,
    image: "/next.svg",
  },
  {
    id: 3,
    title: "MacBook Pro 16\"",
    category: "Electronics",
    price: 75,
    status: "rented",
    views: 312,
    bookings: 15,
    image: "/next.svg",
  },
  {
    id: 4,
    title: "Professional Power Drill Set",
    category: "Tools & Equipment",
    price: 45,
    status: "active",
    views: 156,
    bookings: 22,
    image: "/next.svg",
  },
];

export default function MyListings() {
  return (
    <div className="bg-gray-50 min-h-screen p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">My Listings</h1>
            <p className="text-gray-600 mt-1">Manage your rental listings</p>
          </div>
          <Link
            href="/add-listing"
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
            value={listings.filter((l) => l.status === "active").length} 
            color="text-emerald-600" 
          />
          <StatCard 
            title="Currently Rented" 
            value={listings.filter((l) => l.status === "rented").length} 
            color="text-orange-600" 
          />
          <StatCard 
            title="Total Bookings" 
            value={listings.reduce((sum, l) => sum + l.bookings, 0)} 
          />
        </div>

        {/* Listings Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {listings.map((listing) => (
            <div 
              key={listing.id} 
              className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-md transition-shadow"
            >
              <div className="flex flex-col sm:flex-row">
                <div className="relative w-full sm:w-48 h-48 bg-gray-100">
                  <Image
                    src={listing.image}
                    alt={listing.title}
                    fill
                    className="object-contain p-4" // object-contain used because of next.svg
                    sizes="(max-width: 768px) 100vw, 200px"
                  />
                </div>

                <div className="flex-1 p-6 flex flex-col justify-between">
                  <div>
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="text-lg font-bold text-gray-900 leading-tight">
                          {listing.title}
                        </h3>
                        <p className="text-sm text-gray-500">{listing.category}</p>
                      </div>
                      <span
                        className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                          listing.status === "active"
                            ? "bg-green-100 text-green-700"
                            : "bg-orange-100 text-orange-700"
                        }`}
                      >
                        {listing.status === "active" ? "Active" : "Rented"}
                      </span>
                    </div>

                    <div className="flex items-baseline gap-1 mb-4">
                      <span className="text-xl font-bold text-gray-900">${listing.price}</span>
                      <span className="text-xs text-gray-500">/ day</span>
                    </div>

                    <div className="flex items-center gap-4 mb-4 text-sm text-gray-600">
                      <div className="flex items-center gap-1">
                        <Eye className="w-4 h-4" />
                        <span>{listing.views}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <TrendingUp className="w-4 h-4" />
                        <span>{listing.bookings}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    {/* THE CONNECTION: Dynamic route to the edit page */}
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
          ))}
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