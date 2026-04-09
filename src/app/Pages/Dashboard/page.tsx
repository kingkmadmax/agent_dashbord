"use client"

import { DollarSign, Package, Clock, TrendingUp, AlertCircle } from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

import {stats,recentActivity,earningsData} from "@/data/data"

export  default function Dashboard() {
    return (
        <div  className="max-w-7xl mx-auto space-y-8">
            <div>
                <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
                <p className="text-gray-600 mt-2">Welcome back! Here's what's happening with your rentals.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat) => (
                    <div key={stat.label} className="bg-white rounded-xl border border-gray-200 p-6">
                        <div className="flex items-center justify-between">
                            <div className={`p-3 rounded-lg ${stat.bgColor}`}>
                                <stat.icon className={`w-6 h-6 ${stat.color}`} />
                            </div>
                            <span className="text-sm font-medium text-emerald-600">{stat.change}</span>
                        </div>
                        <div className="mt-4">
                            <p className="text-sm text-gray-600">{stat.label}</p>
                            <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
                        </div>
                    </div>
                ))}
            </div>
            <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-6">Earnings Overview</h2>
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={earningsData}>
            <defs>
              <linearGradient id="colorEarnings" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="month" stroke="#9ca3af" />
            <YAxis stroke="#9ca3af" />
            <Tooltip />
            <Area
              type="monotone"
              dataKey="earnings"
              stroke="#10b981"
              fillOpacity={1}
              fill="url(#colorEarnings)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-6">Recent Activity</h2>
        <div className="space-y-4">
          {recentActivity.map((activity) => (
            <div key={activity.id} className="flex items-start gap-4 pb-4 border-b border-gray-100 last:border-0 last:pb-0">
              <div className="p-2 bg-gray-100 rounded-lg mt-1">
                <AlertCircle className="w-4 h-4 text-gray-600" />
              </div>
              <div className="flex-1">
                <p className="font-medium text-gray-900">{activity.action}</p>
                <p className="text-sm text-gray-600 mt-1">
                  {activity.item}
                  {activity.amount && ` - ${activity.amount}`}
                  {activity.rating && ` - ${"⭐".repeat(activity.rating)}`}
                </p>
              </div>
              <span className="text-sm text-gray-500 whitespace-nowrap">{activity.time}</span>
            </div>
          ))}
        </div>
      </div>
    


        </div>
        
    )

}