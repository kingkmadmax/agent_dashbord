import { DollarSign, Package, Clock, TrendingUp, AlertCircle } from "lucide-react";
export const stats = [
  { label: "Total Earnings", value: "$12,450", change: "+12.5%", icon: DollarSign, color: "text-emerald-600", bgColor: "bg-emerald-50" },
  { label: "Active Listings", value: "24", change: "+3", icon: Package, color: "text-slate-600", bgColor: "bg-slate-50" },
  { label: "Pending Requests", value: "8", change: "New", icon: Clock, color: "text-amber-600", bgColor: "bg-amber-50" },
  { label: "This Month", value: "$2,840", change: "+18.2%", icon: TrendingUp, color: "text-indigo-600", bgColor: "bg-indigo-50" },
];
export const agentStats = [
  { label: "Total Earnings", value: "$12,450", change: "+12.5%", icon: DollarSign, color: "text-emerald-600", bgColor: "bg-emerald-50" },
  { label: "Active Listings", value: "24", change: "+3", icon: Package, color: "text-slate-600", bgColor: "bg-slate-50" },
  { label: "Pending Requests", value: "8", change: "New", icon: Clock, color: "text-amber-600", bgColor: "bg-amber-50" },
  { label: "This Month", value: "$2,840", change: "+18.2%", icon: TrendingUp, color: "text-indigo-600", bgColor: "bg-indigo-50" },
  { label: "total renters", value: "renters$2,840", change: "+18.2%", icon: TrendingUp, color: "text-indigo-600", bgColor: "bg-indigo-50" },
];

export const earningsData = [
  { month: "Oct", earnings: 1800 },
  { month: "Nov", earnings: 2200 },
  { month: "Dec", earnings: 1900 },
  { month: "Jan", earnings: 2400 },
  { month: "Feb", earnings: 2100 },
  { month: "Mar", earnings: 2800 },
  { month: "Apr", earnings: 2840 },
];

export const recentActivity = [
  { id: 1, action: "New booking request", item: "Canon EOS R5", time: "2 hours ago", type: "request" },
  { id: 2, action: "Payment received", item: "Sony A7 III", amount: "$180", time: "5 hours ago", type: "payment" },
  { id: 3, action: "Rental completed", item: "DJI Mavic 3", time: "1 day ago", type: "completed" },
  { id: 4, action: "New review received", item: "GoPro Hero 11", rating: 5, time: "2 days ago", type: "review" },
  { id: 5, action: "Booking confirmed", item: "MacBook Pro 16", time: "3 days ago", type: "confirmed" },


];
export const listUsers = [
  { id: 1, Image: "/next.svg", email: "king@gmial.com", name: "slame mulu" },
  { id: 2, Image: "/next.svg", email: "babe@gmial.com", name: "kirubel Maushet" },
  { id: 3, Image: "/next.svg", email: "basetred@gmial.com", name: "sohiale astamrach" },
  { id: 4, Image: "/next.svg", email: "king@gmial.com", name: "sohiale astamrach" },
  { id: 5, Image: "/next.svg", email: "king@gmial.com", name: "weldu abbe" },
  { id: 6, Image: "/next.svg", email: "king@gmial.com", name: "weldu abbe" },


];
export const userGrowthData = [
  { month: "Jan", users: 120 },
  { month: "Feb", users: 210 },
  { month: "Mar", users: 450 },
  { month: "Apr", users: 800 },
  { month: "May", users: 1100 },
  { month: "Jun", users: 1600 },
  { month: "Jul", users: 2100 },
];