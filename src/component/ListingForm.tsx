"use client";

import React, { useState } from 'react';
import { supabase } from "@/lib/supabase"
import { Package, MapPin, ListPlus, CheckCircle2, Loader2 } from 'lucide-react';

interface ListingFormProps {
  initialData?: any; // If editing, pass the existing item here
  onSuccess?: () => void; // What to do after saving
  buttonText?: string;
}

export default function ListingForm({ initialData, onSuccess, buttonText = "Publish Listing" }: ListingFormProps) {
  const [loading, setLoading] = useState(false);
  
  // Pre-fill state if initialData exists, otherwise use defaults
  const [formData, setFormData] = useState({
    name: initialData?.name || "",
    category: initialData?.category || "Vehicles",
    price: initialData?.price || "",
    location: initialData?.location || "",
    condition: initialData?.condition || "Brand New",
    // ... add other fields as needed
  });

  const handleSubmit = async () => {
    setLoading(true);
    const { error } = await supabase
      .from('rentals')
      .upsert({ ...formData, id: initialData?.id }); // Upsert handles both Insert and Update

    if (!error) {
      alert("Success!");
      if (onSuccess) onSuccess();
    }
    setLoading(false);
  };

  return (
    <div className="space-y-6">
      {/* Move your actual form JSX here (the inputs, the tabs, etc.) */}
      <input 
        value={formData.name} 
        onChange={(e) => setFormData({...formData, name: e.target.value})} 
        placeholder="Product Title"
        className="w-full p-4 border rounded-2xl"
      />
      
      <button 
        onClick={handleSubmit}
        className="bg-blue-600 text-white px-8 py-3 rounded-xl font-bold"
      >
        {loading ? <Loader2 className="animate-spin" /> : buttonText}
      </button>
    </div>
  );
}