"use client";

import React, { useEffect, useState } from "react";

export default function BookingRequests() {
  const [bookings, setBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");   // Change if your token key is different

    if (!token) {
      setError("No token found in localStorage");
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
      .then(res => {
        if (!res.ok) throw new Error("Failed to fetch");
        return res.json();
      })
      .then(data => {
        console.log("✅ Data received:", data);
        setBookings(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <p className="text-center py-10">Loading...</p>;
  if (error) return <p className="text-center py-10 text-red-600">Error: {error}</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Booking Requests</h1>
      <p className="mb-4">Total Bookings: {bookings.length}</p>

      {bookings.map((b: any) => (
        <div key={b.id} className="border p-4 mb-4 rounded-lg bg-white">
          <h3 className="font-bold">{b.product?.name}</h3>
          <p>Customer: {b.customerName}</p>
          <p>Status: <strong>{b.status}</strong></p>
          <p>Dates: {b.receiveDate?.split("T")[0]} → {b.returnDate?.split("T")[0]}</p>
        </div>
      ))}

      {bookings.length === 0 && <p>No bookings found.</p>}
    </div>
  );
}