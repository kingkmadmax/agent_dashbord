"use client";
import Image from "next/image";
import { Check, X, Clock, Calendar, User, Trash2, RotateCcw } from "lucide-react";
import React, { useEffect, useState } from "react";

interface RentalProduct {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
  category: string;
}
interface Booking {
  id: number;
  customerName: string;
  status: string;
  receiveDate: string;
  returnDate: string;
  rentalDays: number;
  createdAt: string;
  product: RentalProduct; 
}
const formatTimeAgo = (dateString: string) => {
  const now = new Date();
  const past = new Date(dateString);
  const diffInSeconds = Math.floor((now.getTime() - past.getTime()) / 1000);

  // Define time intervals in seconds
  const intervals = {
    year: 31536000,
    month: 2592000,
    week: 604800,
    day: 86400,
    hour: 3600,
    minute: 60,
    second: 1
  };

  if (diffInSeconds < 5) return "just now";

  for (const [unit, seconds] of Object.entries(intervals)) {
    const value = Math.floor(diffInSeconds / seconds);
    if (value >= 1) {
      return `${value} ${unit}${value > 1 ? 's' : ''} ago`;
    }
  }
  return dateString; // Fallback to original date
};
export default function BookingRequests() {
  const [bookings, setBookings] = useState<Booking[]>([]); // Typed as Booking array
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
   useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setError("No token found. Please log in.");
      setLoading(false);
      return;
    }
    fetch("http://localhost:9090/api/bookings/owner/me", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch bookings");
        return res.json();
      })
      .then((data) => {
        setBookings(data);
        setLoading(false);
     })
      .catch((err) => {
       setError(err.message);
        setLoading(false);
      });
  }, []);
  if (loading) return <p className="text-center py-10">Loading...</p>;
  if (error) return <p className="text-center py-10 text-red-600">Error: {error}</p>;
  
  const handleAccept = async (id:number) => {
  const token = localStorage.getItem("token");
  
  // Notice the URL ends in /accept to match the Controller above
  const res = await fetch(`http://localhost:9090/api/bookings/${id}/accept`, {
    method: "PUT",
    headers: {
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json"
    }
  });

  if (res.ok) {
    // Update your local state so the UI shows "ACCEPTED" immediately
    setBookings(prev => 
      prev.map(b => b.id === id ? { ...b, status: "ACCEPTED" } : b)
    );
  }
};
const getStatusStyles = (status: string) => {
  switch (status.toUpperCase()) {
    case "ACCEPTED":
      return "bg-green-100 text-green-700 border-green-200";
    case "DECLINED":
      return "bg-red-100 text-red-700 border-red-200";
    case "PENDING":
      return "bg-orange-100 text-orange-700 border-orange-200";
    default:
      return "bg-gray-100 text-gray-700 border-gray-200";
  }
};
  
  const handleDecline = async (id: number) => {
    const token = localStorage.getItem("token");
    const res = await fetch(`http://localhost:9090/api/bookings/${id}/decline`, {
      method: "PUT",
       headers: {
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json"
    }
    });

    if (res.ok) {
      
      setBookings(prev => 
        prev.map(b => b.id === id ? { ...b, status: "DECLINED" } : b)
      );
    }
  };

  // 2. Delete (Remove from list and DB)
  const handleDelete = async (id: number) => {
    if (!confirm("Permanently delete this request?")) return;

    const token = localStorage.getItem("token");
    const res = await fetch(`http://localhost:9090/api/bookings/${id}`, {
      method: "DELETE",
      headers: {
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json"
    },
    });

    if (res.ok) {
      // Update UI state: remove from list
      setBookings(prev => prev.filter(b => b.id !== id));
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Booking Requests</h1>
        <p className="text-gray-600 mt-2">Review and manage incoming booking requests</p>

      </div>
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-orange-50 rounded-lg">
              <Clock className="w-5 h-5 text-orange-600" />
            </div>
           <div>
              <p className="text-sm text-gray-600">Pending Requests</p>
              <p className="text-2xl font-bold text-gray-900">
                {/* Filter the list to find only 'PENDING' then count them */}
                {bookings.filter(b => b.status === "PENDING").length}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-green-50 rounded-lg">
              <Check className="w-5 h-5 text-green-600" />
            </div>
           <div>
              <p className="text-sm text-gray-600">Accepted Requests</p>
              <p className="text-2xl font-bold text-gray-900">
                {/* Filter the list to find only 'ACCEPTED' then count them */}
                {bookings.filter(b => b.status === "ACCEPTED").length}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-50 rounded-lg">
              <Calendar className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Potential Earnings</p>
              <p className="text-2xl font-bold text-gray-900">
               ${bookings.reduce((sum, b) => sum + (b.product?.price * (b.rentalDays || 1)), 0)}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="space-y-4">
        {bookings.map((request) => (
          <div key={request.id} className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex flex-col lg:flex-row gap-6">
              {/* Item Image Container */}
              <div className="relative w-full lg:w-32 h-32 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                <Image
                  src={request.product.imageUrl }
                  alt={request.product.name}
                  fill
                  className="object-contain p-4"
                />
              </div>
              {/* Request Details */}
              <div className="flex-1 space-y-4">
                <div>
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">{request.product.name}</h3>
                      <div className="flex items-center gap-2 mt-1">
                        <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white text-sm font-medium">
                           {request.customerName.charAt(0)}
                        </div>
                        <span className="font-medium text-gray-900">{request.customerName}</span>
                        <span className="text-sm text-gray-500">• {request.createdAt}</span>
                      </div>
                    </div>
                   <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getStatusStyles(request.status)}`}>
                      {request.status}
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-4 text-sm text-gray-600 mt-3">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      <span>
                         {request.receiveDate?.split("T")[0]} to {request.returnDate?.split("T")[0]}
                      </span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      • {formatTimeAgo(request.createdAt)} 
                    </div>
                    <div className="font-medium text-gray-900">
                     Total: ${request.product?.price * request.rentalDays}
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">       
                </div>
                {/* Actions */}
                <div className="flex flex-col sm:flex-row gap-3 min-h-[46px]">
                  {request.status === "PENDING" ? (
                    /* --- SHOW ORIGINAL BUTTONS --- */
                    <>
                      <button 
                        onClick={() => handleAccept(request.id)} 
                        className="flex-1 bg-emerald-600 text-white py-2.5 rounded-lg font-medium hover:bg-emerald-700 flex items-center justify-center gap-2"
                      >
                        <Check className="w-4 h-4" /> Accept Request
                      </button>
                      
                      <button 
                        onClick={() => handleDecline(request.id)} 
                        className="flex-1 bg-white border border-gray-300 text-gray-700 py-2.5 rounded-lg font-medium hover:bg-gray-50 flex items-center justify-center gap-2"
                      >
                        <X className="w-4 h-4" /> Decline
                      </button>

                      <button 
                        onClick={() => handleDelete(request.id)}
                        className="px-3 py-2 border border-red-200 text-red-500 rounded-lg hover:bg-red-50"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </>
                  ) : (
                    /* --- SHOW STATUS BAR + INLINE UNDO --- */
                    <div className="flex-1 flex gap-2">
                      <div className={`flex-1 flex items-center justify-center py-2.5 rounded-lg font-bold text-xs uppercase tracking-widest border-2 ${
                        request.status === "ACCEPTED" 
                          ? "bg-emerald-50 text-emerald-700 border-emerald-200" 
                          : "bg-red-50 text-red-700 border-red-200"
                      }`}>
                        {request.status === "ACCEPTED" ? "Accepted" : "Declined"}
                      </div>

                      {/* Direct State Update: Reverses the UI to the small buttons */}
                      <button 
                        onClick={() => setBookings(prev => prev.map(b => b.id === request.id ? { ...b, status: 'PENDING' } : b))}
                        className="px-4 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition-all flex items-center gap-2 text-xs font-bold uppercase border border-gray-200"
                      >
                        <RotateCcw className="w-4 h-4" />
                        Undo
                      </button>
                    </div>
                  )}
</div>
              </div>
            </div>
          </div>
        ))}
      </div>
      {bookings.length === 0 && (
        <div className="bg-white rounded-xl border border-gray-200 p-12 text-center shadow-sm">
          <Clock className="w-16 h-16 text-gray-300 mx-auto mb-4" />
        <h3 className="text-xl font-bold text-gray-900 mb-2">No Pending Requests</h3>
          <p className="text-gray-600">You're all caught up! New booking requests will appear here.</p>
        </div>
      )}
    </div>
  );
}