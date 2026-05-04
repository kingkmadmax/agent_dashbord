"use client"

import { DollarSign, Package, Clock, TrendingUp, AlertCircle, ArrowUpRight } from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import Link from "next/link";
import { agentStats, recentActivity, listUsers, earningsData } from "@/data/data";

export default function DashboardContent() {
    return (
        <div className="max-w-7xl mx-auto space-y-10 py-4">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-4xl font-black text-gray-900 tracking-tight">Dashboard</h1>
                    <p className="text-gray-500 mt-1 text-lg font-medium">Welcome back! Here's your performance overview.</p>
                </div>
                <div className="flex items-center gap-3">
                    <div className="px-4 py-2 bg-white border border-gray-200 rounded-full text-sm font-semibold text-gray-700 shadow-sm">
                        Last 30 Days
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
                {agentStats.map((stat, idx) => (
                    <div key={stat.label} className="group relative bg-white rounded-2xl border border-gray-100 p-6 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden">
                        <div className={`absolute top-0 right-0 w-24 h-24 -mr-8 -mt-8 rounded-full opacity-5 transition-transform group-hover:scale-150 ${stat.bgColor}`}></div>
                        <div className="flex items-center justify-between">
                            <div className={`p-3 rounded-2xl ${stat.bgColor} shadow-inner`}>
                                <stat.icon className={`w-6 h-6 ${stat.color}`} />
                            </div>
                            <div className="flex items-center gap-1 px-2 py-1 rounded-full bg-emerald-50 text-emerald-600 text-xs font-bold">
                                <ArrowUpRight className="w-3 h-3" />
                                {stat.change}
                            </div>
                        </div>
                        <div className="mt-6">
                            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">{stat.label}</p>
                            <p className="text-2xl font-black text-gray-900 mt-1">{stat.value}</p>
                        </div>
                    </div>
                ))}
            </div>

            <div className="bg-white rounded-3xl border border-gray-100 p-8 shadow-sm relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500"></div>
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h2 className="text-2xl font-bold text-gray-900">Earnings Analytics</h2>
                        <p className="text-gray-500 font-medium">Monthly revenue progression</p>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="flex items-center gap-1.5">
                            <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                            <span className="text-sm font-semibold text-gray-600">Revenue</span>
                        </div>
                    </div>
                </div>
                <div className="h-[350px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={earningsData}>
                            <defs>
                                <linearGradient id="colorEarnings" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.2} />
                                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                            <XAxis
                                dataKey="month"
                                axisLine={false}
                                tickLine={false}
                                tick={{ fill: '#9ca3af', fontSize: 12, fontWeight: 600 }}
                                dy={10}
                            />
                            <YAxis
                                axisLine={false}
                                tickLine={false}
                                tick={{ fill: '#9ca3af', fontSize: 12, fontWeight: 600 }}
                            />
                            <Tooltip
                                cursor={{ stroke: '#3b82f6', strokeWidth: 2 }}
                                contentStyle={{
                                    backgroundColor: 'rgba(255, 255, 255, 0.9)',
                                    backdropFilter: 'blur(8px)',
                                    borderRadius: '16px',
                                    border: '1px solid #f3f4f6',
                                    boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)',
                                    padding: '12px 16px'
                                }}
                                itemStyle={{ fontWeight: 700, color: '#111827' }}
                                labelStyle={{ fontWeight: 600, color: '#6b7280', marginBottom: '4px' }}
                            />
                            <Area
                                type="monotone"
                                dataKey="earnings"
                                stroke="#3b82f6"
                                strokeWidth={4}
                                fillOpacity={1}
                                fill="url(#colorEarnings)"
                                animationDuration={2000}
                            />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 w-full">
                {/* Recent Activity */}
                <div className="bg-white rounded-3xl border border-gray-100 p-8 flex flex-col shadow-sm">
                    <div className="flex items-center justify-between mb-8">
                        <h2 className="text-2xl font-bold text-gray-900">Recent Activity</h2>
                        <Link href="/Pages/Booking_Request" className="text-sm font-bold text-blue-600 hover:text-blue-700 transition-colors">View All</Link>
                    </div>
                    <div className="space-y-6 flex-1">
                        {recentActivity.map((activity) => (
                            <div
                                key={activity.id}
                                className="group flex items-start gap-4 p-4 rounded-2xl hover:bg-gray-50 transition-all duration-300"
                            >
                                <div className="p-3 bg-gray-100 rounded-xl group-hover:bg-white group-hover:shadow-sm transition-all">
                                    <AlertCircle className="w-5 h-5 text-gray-600" />
                                </div>
                                <div className="flex-1">
                                    <p className="font-bold text-gray-900 group-hover:text-blue-600 transition-colors">{activity.action}</p>
                                    <p className="text-sm font-medium text-gray-500 mt-1">
                                        {activity.item}
                                        {activity.amount && <span className="text-emerald-600 ml-2 font-bold">{activity.amount}</span>}
                                        {activity.rating && <span className="ml-2 text-amber-500">{"⭐".repeat(activity.rating)}</span>}
                                    </p>
                                </div>
                                <span className="text-xs font-bold text-gray-400 bg-gray-50 px-3 py-1 rounded-full">{activity.time}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* User Directory */}
                <div className="bg-white rounded-3xl border border-gray-100 p-8 flex flex-col shadow-sm">
                    <div className="flex items-center justify-between mb-8">
                        <h2 className="text-2xl font-bold text-gray-900">Active Users</h2>
                        <Link href="/Pages/Analytics" className="text-sm font-bold text-blue-600 hover:text-blue-700 transition-colors">Manage</Link>
                    </div>
                    <div className="space-y-6 flex-1">
                        {listUsers.map((user) => (
                            <div
                                key={user.id}
                                className="group flex items-center gap-4 p-4 rounded-2xl hover:bg-gray-50 transition-all duration-300"
                            >
                                <div className="relative">
                                    <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-blue-100 to-indigo-100 flex items-center justify-center border-2 border-white shadow-sm overflow-hidden">
                                        <span className="text-lg font-bold text-blue-600">{user.name.charAt(0)}</span>
                                    </div>
                                    <div className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-emerald-500 border-2 border-white rounded-full"></div>
                                </div>
                                <div className="flex-1">
                                    <p className="font-bold text-gray-900 group-hover:text-blue-600 transition-colors">{user.name}</p>
                                    <p className="text-sm font-medium text-gray-500">
                                        {user.email || "active.member@example.com"}
                                    </p>
                                </div>
                                <div className="flex flex-col items-end gap-1">
                                    <span className="text-[10px] font-black uppercase tracking-tighter text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md">
                                        Online
                                    </span>
                                    <span className="text-[10px] font-bold text-gray-400">Agent</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
