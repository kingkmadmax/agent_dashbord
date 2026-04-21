import React from "react";
import Image from "next/image";
import { Check, X, Clock, Calendar, User } from "lucide-react";

const requests = [
  {
    id: 1,
    user: "Sarah Johnson",
    userAvatar: "SJ",
    item: "Canon EOS R5 Camera",
    itemImage: "/next.svg",
    startDate: "Apr 10, 2026",
    endDate: "Apr 15, 2026",
    days: 5,
    total: 425,
    message: "Hi! I need this for a wedding shoot. I'm a professional photographer with 8 years of experience.",
    requestedAt: "2 hours ago",
    status: "pending",
  },
  {
    id: 2,
    user: "Michael Chen",
    userAvatar: "MC",
    item: "DJI Mavic 3 Drone",
    itemImage: "/next.svg",
    startDate: "Apr 8, 2026",
    endDate: "Apr 10, 2026",
    days: 2,
    total: 240,
    message: "Need this for aerial shots of a property. I have drone pilot certification.",
    requestedAt: "5 hours ago",
    status: "pending",
  },
  {
    id: 3,
    user: "Emily Davis",
    userAvatar: "ED",
    item: "MacBook Pro 16\"",
    itemImage: "/next.svg",
    startDate: "Apr 12, 2026",
    endDate: "Apr 19, 2026",
    days: 7,
    total: 525,
    message: "Traveling for work and need a reliable laptop for video editing.",
    requestedAt: "1 day ago",
    status: "pending",
  },
];

export default function BookingRequests() {
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
              <p className="text-2xl font-bold text-gray-900">{requests.length}</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-green-50 rounded-lg">
              <Check className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Accepted Today</p>
              <p className="text-2xl font-bold text-gray-900">5</p>
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
                ${requests.reduce((sum, r) => sum + r.total, 0)}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Requests List */}
      <div className="space-y-4">
        {requests.map((request) => (
          <div key={request.id} className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex flex-col lg:flex-row gap-6">
              {/* Item Image Container */}
              <div className="relative w-full lg:w-32 h-32 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                <Image
                  src={request.itemImage}
                  alt={request.item}
                  fill
                  className="object-contain p-4"
                />
              </div>

              {/* Request Details */}
              <div className="flex-1 space-y-4">
                <div>
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">{request.item}</h3>
                      <div className="flex items-center gap-2 mt-1">
                        <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white text-sm font-medium">
                          {request.userAvatar}
                        </div>
                        <span className="font-medium text-gray-900">{request.user}</span>
                        <span className="text-sm text-gray-500">• {request.requestedAt}</span>
                      </div>
                    </div>
                    <span className="px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-sm font-medium">
                      Pending
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-4 text-sm text-gray-600 mt-3">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      <span>
                        {request.startDate} - {request.endDate}
                      </span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      <span>{request.days} days</span>
                    </div>
                    <div className="font-medium text-gray-900">
                      Total: ${request.total}
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-sm font-medium text-gray-700 mb-1">Message from renter:</p>
                  <p className="text-gray-600 italic">"{request.message}"</p>
                </div>

                {/* Actions */}
                <div className="flex flex-col sm:flex-row gap-3">
                  <button className="flex-1 bg-emerald-600 text-white py-2.5 rounded-lg font-medium hover:bg-emerald-700 flex items-center justify-center gap-2 transition-colors">
                    <Check className="w-4 h-4" />
                    Accept Request
                  </button>
                  <button className="flex-1 bg-white border border-gray-300 text-gray-700 py-2.5 rounded-lg font-medium hover:bg-gray-50 flex items-center justify-center gap-2 transition-colors">
                    <X className="w-4 h-4" />
                    Decline
                  </button>
                  <button className="px-6 py-2.5 border border-gray-300 rounded-lg font-medium hover:bg-gray-50 flex items-center justify-center gap-2 transition-colors">
                    <User className="w-4 h-4" />
                    Profile
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {requests.length === 0 && (
        <div className="bg-white rounded-xl border border-gray-200 p-12 text-center shadow-sm">
          <Clock className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-gray-900 mb-2">No Pending Requests</h3>
          <p className="text-gray-600">You're all caught up! New booking requests will appear here.</p>
        </div>
      )}
    </div>
  );
}