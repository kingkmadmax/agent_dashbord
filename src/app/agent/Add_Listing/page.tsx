"use client";

import React, { useState } from 'react';
import { 
  Package, MapPin, ListPlus,
  Upload, X, CheckCircle2, Loader2, ImageIcon
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import { supabase } from "@/lib/supabase";   // Keep for now (we'll remove later)

type TabType = "identity" | "terms" | "specs";

export default function CreateRentalPage() {
  const router = useRouter();
  const [selectedTab, setSelectedTab] = useState<TabType>("identity");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Image states
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);

  // Form state
  const [formData, setFormData] = useState({
    name: "",
    category: "Vehicles",
    customCategory: "",
    price: "",
    location: "",
    condition: "Brand New",
    deposit: "",
    description: "",
  });

  const [specs, setSpecs] = useState([
    { label: "Brand", value: "" },
    { label: "Model", value: "" },
    { label: "Year", value: "" }
  ]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files);
      setImageFiles(prev => [...prev, ...filesArray]);

      const newPreviews = filesArray.map(file => URL.createObjectURL(file));
      setPreviewUrls(prev => [...prev, ...newPreviews]);
    }
  };

  const removeImage = (index: number) => {
    URL.revokeObjectURL(previewUrls[index]);
    setImageFiles(prev => prev.filter((_, i) => i !== index));
    setPreviewUrls(prev => prev.filter((_, i) => i !== index));
  };

  const addSpec = () => {
    setSpecs([...specs, { label: "", value: "" }]);
  };

  const updateSpec = (index: number, field: 'label' | 'value', val: string) => {
    const newSpecs = [...specs];
    newSpecs[index][field] = val;
    setSpecs(newSpecs);
  };

  const removeSpec = (index: number) => {
    setSpecs(prev => prev.filter((_, i) => i !== index));
  };

  // ==================== PUBLISH FUNCTION - NO ACCOUNT REQUIRED ====================
  const handlePublish = async () => {
    if (!formData.name.trim() || !formData.price || !formData.location.trim()) {
      alert("Please fill in Title, Price, and Location");
      return;
    }

    setIsSubmitting(true);

    try {
      let finalImageUrls: string[] = [];

      // Upload images if any (using public bucket for now)
      if (imageFiles.length > 0) {
        for (const file of imageFiles) {
          const fileExt = file.name.split('.').pop();
          const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
          
          const { error: uploadError } = await supabase.storage
            .from('rental-images')
            .upload(fileName, file, { upsert: true });

          if (uploadError) {
            console.error("Image upload failed:", uploadError.message);
            continue;
          }

          const { data: { publicUrl } } = supabase.storage
            .from('rental-images')
            .getPublicUrl(fileName);

          finalImageUrls.push(publicUrl);
        }
      }

      const payload = {
        name: formData.name.trim(),
        category: formData.category === "Other" ? formData.customCategory.trim() : formData.category,
        price: parseFloat(formData.price) || 0,
        location: formData.location.trim(),
        condition: formData.condition,
        deposit: parseFloat(formData.deposit) || 0,
        description: formData.description.trim(),
        images: finalImageUrls,
        specifications: specs.filter(s => s.label.trim() !== "" && s.value.trim() !== ""),
        status: "available",
        created_at: new Date().toISOString(),
      };

      const { error } = await supabase
        .from('rentals')
        .insert([payload]);

      if (error) {
        console.error("Insert error:", error);
        alert("Failed to publish listing: " + error.message);
      } else {
        alert("✅ Listing published successfully!");
        router.push('/Pages/My_Listings');
      }
    } catch (err: any) {
      console.error(err);
      alert("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const tabs = [
    { id: "identity" as TabType, name: "1. Identity", icon: Package },
    { id: "terms" as TabType, name: "2. Terms & Location", icon: MapPin },
    { id: "specs" as TabType, name: "3. Specifications", icon: ListPlus },
  ];

  return (
    <div className="max-w-5xl mx-auto p-6 md:p-12 bg-white min-h-screen">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 border-b pb-6">
        <div>
          <h1 className="text-3xl font-black text-gray-900">List New Equipment</h1>
          <p className="text-gray-500 mt-1">Publish your gear to the EthiRent marketplace.</p>
        </div>

        <button
          onClick={handlePublish}
          disabled={isSubmitting}
          className="bg-blue-600 text-white px-8 py-3 rounded-xl font-bold shadow-lg hover:bg-blue-700 transition-all flex items-center gap-2 disabled:opacity-50"
        >
          {isSubmitting ? <Loader2 className="animate-spin" size={20} /> : <CheckCircle2 size={20} />}
          {isSubmitting ? "Publishing..." : "Publish Listing"}
        </button>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap border-b border-gray-100 mb-8 gap-2 md:gap-8">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setSelectedTab(tab.id)}
            className={`pb-4 px-2 flex items-center gap-2 text-sm font-bold uppercase transition-all border-b-2 
              ${selectedTab === tab.id 
                ? "border-blue-600 text-blue-600" 
                : "border-transparent text-gray-400 hover:text-gray-600"
              }`}
          >
            <tab.icon size={18} />
            {tab.name}
          </button>
        ))}
      </div>

      {/* Tab Contents */}
      <div className="min-h-[450px]">
        {selectedTab === "identity" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Identity Fields */}
            <div className="bg-white p-8 rounded-3xl shadow-sm border space-y-6">
              <div>
                <label className="block text-sm font-semibold mb-2 text-gray-700">Product Title</label>
                <input 
                  type="text" 
                  name="name" 
                  value={formData.name} 
                  onChange={handleInputChange} 
                  placeholder="e.g. Sony A7III Camera" 
                  className="w-full p-4 bg-gray-50 border rounded-2xl outline-none focus:ring-2 focus:ring-blue-500" 
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold mb-2 text-gray-700">Daily Rate ($)</label>
                  <input 
                    type="number" 
                    name="price" 
                    value={formData.price} 
                    onChange={handleInputChange} 
                    placeholder="0.00" 
                    className="w-full p-4 bg-gray-50 border rounded-2xl outline-none" 
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2 text-gray-700">Category</label>
                  <select 
                    name="category" 
                    value={formData.category} 
                    onChange={handleInputChange} 
                    className="w-full p-4 bg-gray-50 border rounded-2xl outline-none"
                  >
                    <option value="Vehicles">Vehicles</option>
                    <option value="Electronics">Electronics</option>
                    <option value="Cameras">Cameras</option>
                    <option value="Tools">Construction Tools</option>
                    <option value="Other">Other...</option>
                  </select>
                </div>
              </div>

              {formData.category === "Other" && (
                <input 
                  type="text" 
                  name="customCategory" 
                  value={formData.customCategory} 
                  onChange={handleInputChange} 
                  placeholder="Enter custom category" 
                  className="w-full p-4 bg-gray-50 border rounded-2xl" 
                />
              )}

              <div>
                <label className="block text-sm font-semibold mb-2 text-gray-700">Description</label>
                <textarea 
                  name="description" 
                  value={formData.description} 
                  onChange={handleInputChange} 
                  rows={4} 
                  placeholder="Describe your item..." 
                  className="w-full p-4 bg-gray-50 border rounded-2xl outline-none" 
                />
              </div>
            </div>

            {/* Image Upload */}
            <div className="bg-white p-6 rounded-3xl shadow-sm border border-dashed">
              <label className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed border-gray-200 rounded-2xl bg-gray-50 cursor-pointer hover:bg-gray-100">
                <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                <p className="text-sm font-bold text-gray-600">Upload Product Images</p>
                <p className="text-xs text-gray-400">PNG, JPG up to 10MB each</p>
                <input type="file" className="hidden" multiple accept="image/*" onChange={handleFileChange} />
              </label>

              <div className="grid grid-cols-3 gap-3 mt-6 max-h-[300px] overflow-y-auto p-2">
                {previewUrls.map((url, index) => (
                  <div key={index} className="relative group aspect-square">
                    <img src={url} alt="preview" className="w-full h-full object-cover rounded-xl border" />
                    <button
                      onClick={() => removeImage(index)}
                      className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 shadow-lg opacity-0 group-hover:opacity-100"
                    >
                      <X size={14} />
                    </button>
                  </div>
                ))}
                {previewUrls.length === 0 && (
                  <div className="col-span-3 py-10 text-center text-gray-300">
                    <ImageIcon size={40} className="mx-auto mb-2" />
                    <p>No images selected yet</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Terms Tab */}
        {selectedTab === "terms" && (
          <div className="max-w-2xl mx-auto bg-white p-8 rounded-3xl shadow-sm border space-y-6">
            <div>
              <label className="block text-sm font-semibold mb-2 text-gray-700">Location</label>
              <div className="relative">
                <MapPin className="absolute left-4 top-4 text-gray-400" size={20} />
                <input 
                  type="text" 
                  name="location" 
                  value={formData.location} 
                  onChange={handleInputChange} 
                  placeholder="Addis Ababa, Bole" 
                  className="w-full pl-12 p-4 bg-gray-50 border rounded-2xl outline-none" 
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold mb-2 text-gray-700">Condition</label>
                <select name="condition" value={formData.condition} onChange={handleInputChange} className="w-full p-4 bg-gray-50 border rounded-2xl outline-none">
                  <option>Brand New</option>
                  <option>Like New</option>
                  <option>Excellent</option>
                  <option>Good</option>
                  <option>Fair</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2 text-gray-700">Security Deposit ($)</label>
                <input 
                  type="number" 
                  name="deposit" 
                  value={formData.deposit} 
                  onChange={handleInputChange} 
                  placeholder="0.00" 
                  className="w-full p-4 bg-gray-50 border rounded-2xl outline-none" 
                />
              </div>
            </div>
          </div>
        )}

        {/* Specs Tab */}
        {selectedTab === "specs" && (
          <div className="max-w-3xl mx-auto bg-white p-8 rounded-3xl shadow-sm border space-y-6">
            <div className="flex justify-between items-center border-b pb-4">
              <h3 className="font-bold text-gray-900 flex items-center gap-2">
                <ListPlus size={20} className="text-blue-600" />
                Technical Specifications
              </h3>
              <button type="button" onClick={addSpec} className="text-blue-600 text-sm font-bold hover:underline">+ Add Field</button>
            </div>

            <div className="space-y-3">
              {specs.map((spec, i) => (
                <div key={i} className="flex gap-3 items-center group">
                  <input 
                    type="text" 
                    value={spec.label} 
                    onChange={(e) => updateSpec(i, 'label', e.target.value)} 
                    placeholder="Label (e.g. Weight)" 
                    className="flex-1 p-3 bg-gray-50 border rounded-xl outline-none" 
                  />
                  <input 
                    type="text" 
                    value={spec.value} 
                    onChange={(e) => updateSpec(i, 'value', e.target.value)} 
                    placeholder="Value (e.g. 2.5kg)" 
                    className="flex-1 p-3 bg-gray-50 border rounded-xl outline-none" 
                  />
                  <button onClick={() => removeSpec(i)} className="text-red-400 hover:text-red-600">
                    <X size={20} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Bottom Navigation */}
      <div className="mt-12 flex justify-between items-center bg-white p-4 rounded-2xl border shadow-sm">
        <button
          type="button"
          disabled={selectedTab === "identity"}
          onClick={() => {
            if (selectedTab === "terms") setSelectedTab("identity");
            if (selectedTab === "specs") setSelectedTab("terms");
          }}
          className="px-6 py-2 text-gray-500 font-bold disabled:opacity-30"
        >
          ← Back
        </button>

        <button
          type="button"
          onClick={() => {
            if (selectedTab === "identity") setSelectedTab("terms");
            else if (selectedTab === "terms") setSelectedTab("specs");
            else handlePublish();
          }}
          className="bg-blue-600 text-white px-10 py-3 rounded-xl font-bold hover:bg-blue-700"
        >
          {selectedTab === "specs" ? (isSubmitting ? "Publishing..." : "Finish & Publish") : "Continue →"}
        </button>
      </div>
    </div>
  );
}