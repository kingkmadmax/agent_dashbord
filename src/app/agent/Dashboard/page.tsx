"use client"

import { DollarSign, Package, Clock, TrendingUp, AlertCircle } from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

import {agentStats,recentActivity,listUsers,earningsData} from "@/data/data"
import Table from "@/component/Table"

interface ChartProps {
  title: string;
  data: any[];
  dataKey: string;
  xAxisKey: string;
  color?: string; // The '?' means it is optional
}

export  default function Dashboard({}) {
    return (
        <div  className="max-w-7xl mx-auto space-y-8">
            <div>
                <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
                <p className="text-gray-600 mt-2">Welcome back! Here's what's happening with your rentals.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
                {agentStats.map((stat) => (
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
            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              
              {/* Chart 1 */}
              <div className="w-full">
                <Table
                  title="Total Overview"
                  data={earningsData}
                  dataKey="earnings"
                  xAxisKey="month"
                  color="#000936"
                />
              </div>

              {/* Chart 2 */}
              <div className="w-full">
                <Table
                  title="Profit Overview"
                  data={earningsData}
                  dataKey="earnings"
                  xAxisKey="month"
                  color="#0058e5"
                />
              </div>

            </div>

          </div>
         <div className="flex">
          
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 w-full">
  
  {/* Card 1: Recent Activity */}
  <div className="bg-white rounded-xl border border-gray-200 p-6 flex flex-col shadow-sm">
    <h2 className="text-xl font-bold text-gray-900 mb-6">Recent Activity</h2>
    <div className="space-y-4 flex-1">
      {recentActivity.map((activity) => (
        <div 
          key={activity.id} 
          className="flex items-start gap-4 pb-4 border-b border-gray-100 last:border-0 last:pb-0"
        >
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

  {/* Card 2: List of Users */}
  <div className="bg-white rounded-xl border border-gray-200 p-6 flex flex-col shadow-sm">
    <h2 className="text-xl font-bold text-gray-900 mb-6">User Directory</h2>
    <div className="space-y-4 flex-1">
      {listUsers.map((user) => (
        <div 
          key={user.id} 
          className="flex items-start gap-4 pb-4 border-b border-gray-100 last:border-0 last:pb-0"
        >
          <div className="p-2 bg-blue-50 rounded-lg mt-1">
            {/* Swapped to a slightly different color to distinguish the two lists */}
            <AlertCircle className="w-4 h-4 text-blue-600" />
          </div>
          <div className="flex-1">
            <p className="font-medium text-gray-900">{user.name}</p>
            <p className="text-sm text-gray-500 mt-1">
              {user.email || "Active Member"}
            </p>
          </div>
          <span className="text-xs font-medium px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 self-center">
            Online
          </span>
        </div>
      ))}
    </div>
  </div>

</div>

         </div>
    


        </div>
        
    )

}