"use client";
import React, { useRef } from 'react';

export default function RenterRegistration() {
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(formRef.current!);
    const data = Object.fromEntries(formData.entries());

    // SEND DATA TO ADMIN API
    const res = await fetch('http://localhost:8080/api/onboarding/apply', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    if (res.ok) alert("Request sent to Admin!");
  };

  return (
    <form ref={formRef} onSubmit={handleSubmit}>
      <input name="fullName" placeholder="Full Name" required />
      <input name="email" type="email" placeholder="Email" required />
      <input name="phone" placeholder="Phone" required />
      <button type="submit">Submit Request</button>
    </form>
  );
}