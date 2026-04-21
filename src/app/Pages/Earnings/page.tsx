"use client";

import React from "react";
import { Download, TrendingUp, DollarSign, Calendar } from "lucide-react";
import { 
  LineChart, 
  Line, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from "recharts";

const monthlyData = [
  { month: "Oct", earnings: 1850, bookings: 8 },
  { month: "Nov", earnings: 2200, bookings: 11 },
  { month: "Dec", earnings: 1950, bookings: 9 },
  { month: "Jan", earnings: 2450, bookings: 13 },
  { month: "Feb", earnings: 2100, bookings: 10 },
  { month: "Mar", earnings: 2800, bookings: 15 },
  { month: "Apr", earnings: 2840, bookings: 14 },
];

const transactions = [
  { id: 1, date: "Apr 4, 2026", item: "Canon EOS R5", renter: "Sarah Johnson", amount: 425, status: "completed", type: "rental" },
  { id: 2, date: "Apr 3, 2026", item: "DJI Mavic 3", renter: "Michael Chen", amount: 240, status: "completed", type: "rental" },
  { id: 3, date: "Apr 3, 2026", item: "Security Deposit", renter: "Alex Thompson", amount: 105, status: "held", type: "deposit" },
  { id: 4, date: "Apr 2, 2026", item: "MacBook Pro 16\"", renter: "Emily Davis", amount: 525, status: "completed", type: "rental" },
  { id: 5, date: "Apr 1, 2026", item: "Power Drill Set", renter: "Jessica Lee", amount: 135, status: "completed", type: "rental" },
  { id: 6, date: "Mar 30, 2026", item: "Canon EOS R5", renter: "David Park", amount: 595, status: "pending", type: "rental" },
  { id: 7, date: "Mar 29, 2026", item: "DJI Mavic 3", renter: "Lisa Wong", amount: 360, status: "completed", type: "rental" },
  { id: 8, date: "Mar 28, 2026", item: "Security Deposit Refund", renter: "Tom Harris", amount: -200, status: "completed", type: "refund" },
];

export default function Earnings() {
  const totalEarnings = transactions
    .filter((t) => t.status === "completed" && t.type !== "refund")
    .reduce((sum, t) => sum + t.amount, 0);

  const pendingEarnings = transactions
    .filter((t) => t.status === "pending")
    .reduce((sum, t) => sum + t.amount, 0);

  const rentalCount = transactions.filter((t) => t.type === "rental").length;
  const avgPerBooking = rentalCount > 0 ? Math.round(totalEarnings / rentalCount) : 0;

  return (
    <div className="max-w-7xl mx-auto space-y-6 p-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Earnings & Transactions</h1>
          <p className="text-gray-600 mt-2">Track your rental income and history</p>
        </div>
        <button className="bg-slate-900 text-white px-6 py-3 rounded-lg font-medium hover:bg-slate-800 inline-flex items-center gap-2 transition-colors">
          <Download className="w-5 h-5" />
          Export Report
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-blue-600 rounded-xl border border-emerald-700 p-6 text-white shadow-lg">
          <div className="p-3 bg-white/20 rounded-lg w-fit mb-4">
            <DollarSign className="w-6 h-6 text-white" />
          </div>
          <p className="text-sm text-emerald-50">Total Earnings</p>
          <p className="text-3xl font-bold text-white mt-1">${totalEarnings.toLocaleString()}</p>
          <p className="text-sm text-emerald-100 mt-2 flex items-center gap-1">
            <TrendingUp className="w-4 h-4" />
            +18.2% from last month
          </p>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
          <div className="p-3 bg-slate-50 rounded-lg w-fit mb-4">
            <Calendar className="w-6 h-6 text-slate-600" />
          </div>
          <p className="text-sm text-gray-600">This Month</p>
          <p className="text-3xl font-bold text-slate-900 mt-1">$2,840</p>
          <p className="text-sm text-gray-500 mt-2">From 14 bookings</p>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
          <div className="p-3 bg-orange-50 rounded-lg w-fit mb-4">
            <DollarSign className="w-6 h-6 text-orange-600" />
          </div>
          <p className="text-sm text-gray-600">Pending</p>
          <p className="text-3xl font-bold text-gray-900 mt-1">${pendingEarnings.toLocaleString()}</p>
          <p className="text-sm text-gray-500 mt-2">Awaiting completion</p>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
          <div className="p-3 bg-purple-50 rounded-lg w-fit mb-4">
            <TrendingUp className="w-6 h-6 text-purple-600" />
          </div>
          <p className="text-sm text-gray-600">Avg. per Booking</p>
          <p className="text-3xl font-bold text-gray-900 mt-1">${avgPerBooking}</p>
          <p className="text-sm text-gray-500 mt-2">Across all rentals</p>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Monthly Earnings</h2>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{fill: '#9ca3af'}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#9ca3af'}} />
                <Tooltip />
                <Line type="monotone" dataKey="earnings" stroke="#0083ef" strokeWidth={3} dot={{r: 4, fill: '#10b981'}} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Bookings per Month</h2>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{fill: '#9ca3af'}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#9ca3af'}} />
                <Tooltip cursor={{fill: '#f9fafb'}} />
                <Bar dataKey="bookings" fill="#0083ef" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Transactions Table */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-900">Recent Transactions</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                {["Date", "Item", "Renter", "Type", "Amount", "Status"].map((header) => (
                  <th key={header} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {transactions.map((transaction) => (
                <tr key={transaction.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{transaction.date}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">{transaction.item}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{transaction.renter}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 capitalize">{transaction.type}</td>
                  <td className={`px-6 py-4 whitespace-nowrap text-sm font-bold ${transaction.amount > 0 ? "text-emerald-600" : "text-red-600"}`}>
                    {transaction.amount > 0 ? "+" : ""}${Math.abs(transaction.amount)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium capitalize ${
                      transaction.status === "completed" ? "bg-green-100 text-green-700" :
                      transaction.status === "pending" ? "bg-orange-100 text-orange-700" :
                      "bg-blue-100 text-blue-700"
                    }`}>
                      {transaction.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}