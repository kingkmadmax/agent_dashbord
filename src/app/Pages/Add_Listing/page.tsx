"use client";

import React, { useState } from 'react';
import { Loader2, CheckCircle2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
// Using jwt-decode to get the userId from the token
import { jwtDecode } from 'jwt-decode'; 

export default function SimpleCreateRentalPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);

  const [formData, setFormData] = useState({
    name: "",
    category: "Electronics",
    price: "",
    deposit: "0",
    condition: "Good",
    location: "",
    description: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const uploadToCloudinary = async (file: File): Promise<string> => {
    const cloudName = "dwji7p5ms"; 
    const uploadPreset = "qgrdbcjn"; 
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", uploadPreset);

    const response = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
      method: "POST",
      body: data
    });

    if (!response.ok) throw new Error("Cloudinary upload failed");
    const result = await response.json();
    return result.secure_url;
  };

 const handlePublish = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const token = localStorage.getItem("access_token");
      if (!token) throw new Error("Please log in first.");

      // Extract userId
      const decoded: any = jwtDecode(token);
      const userId = decoded.sub; 

      // Upload Image
      let finalImageUrl = "";
      if (imageFile) {
        finalImageUrl = await uploadToCloudinary(imageFile);
      }

      const payload = {
        imageUrl: finalImageUrl,
        name: formData.name.trim(),
        category: formData.category,
        price: parseFloat(formData.price) || 0.0,
        deposit: parseFloat(formData.deposit) || 0.0,
        condition: formData.condition,
        location: formData.location.trim(),
        description: formData.description.trim(),
        userId: userId 
      };

      console.log("🚀 Sending Payload:", payload);

      const response = await fetch("http://localhost:9090/api/products/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        // THIS PART IS CRITICAL: Get the actual error message from Java
        const errorText = await response.text(); 
        console.error("❌ BACKEND REJECTED REQUEST:");
        console.error("Status:", response.status);
        console.error("Server Message:", errorText);
        
        throw new Error(`Backend Error (${response.status}): ${errorText || 'Check Console'}`);
      }

      alert("Listing Published Successfully!");
      router.push('/Pages/My_Listings');

    } catch (err: any) {
      console.error("🛑 Submit Error:", err);
      alert(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-8 bg-white border rounded-xl shadow-sm my-10">
      <h1 className="text-xl font-bold mb-6 text-gray-800">Add New Product</h1>
      
      <form onSubmit={handlePublish} className="space-y-4">
        {/* Product Name */}
        <div>
          <label className="block text-xs font-bold uppercase text-gray-500 mb-1">Product Name</label>
          <input required name="name" onChange={handleInputChange} className="w-full p-3 bg-gray-50 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" placeholder="e.g. Sony A7III" />
        </div>

        {/* Price & Deposit */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold uppercase text-gray-500 mb-1">Price/Day ($)</label>
            <input required type="number" step="0.01" name="price" onChange={handleInputChange} className="w-full p-3 bg-gray-50 border rounded-lg" placeholder="50.00" />
          </div>
          <div>
            <label className="block text-xs font-bold uppercase text-gray-500 mb-1">Deposit ($)</label>
            <input required type="number" step="0.01" name="deposit" onChange={handleInputChange} className="w-full p-3 bg-gray-50 border rounded-lg" placeholder="200.00" />
          </div>
        </div>

        {/* Category & Condition */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold uppercase text-gray-500 mb-1">Category</label>
            <select name="category" onChange={handleInputChange} className="w-full p-3 bg-gray-50 border rounded-lg">
              <option>Electronics</option>
              <option>Cameras</option>
              <option>Vehicles</option>
              <option>Tools</option>
              <option>House</option>
              <option>Cars</option>
            </select>
          </div>
          <div>
            <label className="block text-xs font-bold uppercase text-gray-500 mb-1">Condition</label>
            <select name="condition" onChange={handleInputChange} className="w-full p-3 bg-gray-50 border rounded-lg">
              <option>Brand New</option>
              <option>Like New</option>
              <option>Good</option>
              <option>Fair</option>
            </select>
          </div>
        </div>

        {/* Location */}
        <div>
          <label className="block text-xs font-bold uppercase text-gray-500 mb-1">Location</label>
          <input required name="location" onChange={handleInputChange} className="w-full p-3 bg-gray-50 border rounded-lg" placeholder="e.g. Bole, Addis Ababa" />
        </div>

        {/* Image Upload */}
        <div>
          <label className="block text-xs font-bold uppercase text-gray-500 mb-1">Image</label>
          <input type="file" required onChange={(e) => setImageFile(e.target.files?.[0] || null)} className="w-full text-sm text-gray-500" />
        </div>

        {/* Description */}
        <div>
          <label className="block text-xs font-bold uppercase text-gray-500 mb-1">Description</label>
          <textarea name="description" onChange={handleInputChange} className="w-full p-3 bg-gray-50 border rounded-lg" rows={3} placeholder="Tell us about the item..." />
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-black text-white p-4 rounded-lg font-bold flex justify-center items-center gap-2 hover:bg-gray-800 transition-colors disabled:bg-gray-400"
        >
          {isSubmitting ? <Loader2 className="animate-spin" size={20} /> : <CheckCircle2 size={20} />}
          {isSubmitting ? "Publishing..." : "Add Product"}
        </button>
      </form>
    </div>
  );
}