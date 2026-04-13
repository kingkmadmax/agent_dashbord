"use client";

import React, { useState } from 'react';
import { 
  Package, MapPin, ListPlus, 
  Image as ImageIcon, Plus, 
  Settings, ClipboardList, CheckCircle2 
} from 'lucide-react';

type TabType = "identity" | "terms" | "specs";

export default function CreateRentalPage() {
  const [selectedTab, setSelectedTab] = useState<TabType>("identity");
  const [category, setCategory] = useState("Vehicles");
  const [customCategory, setCustomCategory] = useState("");
  const [specs, setSpecs] = useState([
    { label: "Brand", value: "Toyota" },
    { label: "Model", value: "Camry" },
    { label: "Year", value: "2022" }
  ]);

  const addSpec = () => setSpecs([...specs, { label: "", value: "" }]);

  const updateSpec = (index: number, field: 'label' | 'value', val: string) => {
    const newSpecs = [...specs];
    newSpecs[index][field] = val;
    setSpecs(newSpecs);
  };

  const tabs = [
    { id: "identity", name: "1. Identity", icon: Package },
    { id: "terms", name: "2. Terms & Location", icon: MapPin },
    { id: "specs", name: "3. Full Specifications", icon: ListPlus },
  ];

  return (
    <div className="max-w-5xl mx-auto p-6 md:p-12 bg-gray-50 min-h-screen">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 border-b pb-6">
        <div>
          <h1 className="text-3xl font-black text-gray-900">List New Equipment</h1>
          <p className="text-gray-500 mt-1">Fill in the details to publish your rental to the marketplace.</p>
        </div>
        <button className="bg-blue-600 text-white px-8 py-3 rounded-xl font-bold shadow-lg shadow-blue-200 hover:bg-blue-700 transition-all flex items-center gap-2">
          <CheckCircle2 size={20} />
          Publish Listing
        </button>
      </div>

      {/* --- STEP NAVIGATION --- */}
      <div className="flex flex-wrap border-b border-gray-200 mb-8 gap-2 md:gap-8">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setSelectedTab(tab.id as TabType)}
            className={`pb-4 px-2 flex items-center gap-2 text-sm font-bold uppercase tracking-wider transition-all border-b-2 ${
              selectedTab === tab.id
                ? "border-blue-600 text-blue-600"
                : "border-transparent text-gray-400 hover:text-gray-600"
            }`}
          >
            <tab.icon size={18} />
            {tab.name}
          </button>
        ))}
      </div>

      {/* --- FORM CONTENT --- */}
      <div className="min-h-[450px] transition-all duration-300 animate-in fade-in slide-in-from-bottom-2">
        
        {/* STEP 1: IDENTITY */}
        {selectedTab === "identity" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 space-y-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Product Title</label>
                <input type="text" placeholder="e.g. Toyota Camry 2022" className="w-full p-4 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:bg-white outline-none transition-all" />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Category</label>
                  <select 
                    value={category} 
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full p-4 bg-gray-50 border border-gray-200 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="Vehicles">Vehicles</option>
                    <option value="Electronics">Electronics</option>
                    <option value="Office">Office</option>
                    <option value="Other">Other...</option>
                  </select>
                </div>
                {category === "Other" && (
                  <div className="animate-in zoom-in-95 duration-200">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Specify Category</label>
                    <input 
                      type="text" 
                      value={customCategory}
                      onChange={(e) => setCustomCategory(e.target.value)}
                      placeholder="Enter type" 
                      className="w-full p-4 bg-blue-50 border border-blue-100 rounded-2xl outline-none" 
                    />
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Daily Price (USD)</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 font-bold">$</span>
                  <input type="number" placeholder="0.00" className="w-full p-4 pl-8 text-xl font-bold text-blue-600 bg-gray-50 border border-gray-200 rounded-2xl outline-none" />
                </div>
              </div>
            </div>

            <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 flex flex-col">
              <label className="block text-sm font-semibold text-gray-700 mb-4">Media Assets</label>
              <div className="flex-1 border-2 border-dashed border-gray-200 rounded-3xl flex flex-col items-center justify-center text-gray-400 hover:bg-gray-50 hover:border-blue-300 transition-all cursor-pointer group">
                <div className="p-4 bg-gray-100 rounded-full group-hover:bg-blue-100 group-hover:text-blue-600 transition-colors">
                  <ImageIcon size={40} />
                </div>
                <p className="mt-4 font-bold text-gray-600">Click to upload</p>
                <p className="text-xs">Supports JPG, PNG up to 10MB</p>
              </div>
            </div>
          </div>
        )}

        {/* STEP 2: TERMS */}
        {selectedTab === "terms" && (
          <div className="max-w-2xl mx-auto bg-white p-8 rounded-3xl shadow-sm border border-gray-100 space-y-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Location</label>
              <div className="relative">
                <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input type="text" placeholder="e.g. Addis Ababa, Ethiopia" className="w-full p-4 pl-12 bg-gray-50 border border-gray-200 rounded-2xl outline-none" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Condition</label>
                <select className="w-full p-4 bg-gray-50 border border-gray-200 rounded-2xl outline-none">
                  <option>Brand New</option>
                  <option>Like New</option>
                  <option>Lightly Used</option>
                  <option>Well Used</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Security Deposit</label>
                <input type="number" placeholder="$ 500" className="w-full p-4 bg-gray-50 border border-gray-200 rounded-2xl outline-none" />
              </div>
            </div>
          </div>
        )}

        {/* STEP 3: SPECS */}
        {selectedTab === "specs" && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 bg-white p-8 rounded-3xl shadow-sm border border-gray-100 space-y-6">
              <div className="flex justify-between items-center">
                <h3 className="font-bold text-gray-800 flex items-center gap-2">
                  <Settings size={18} className="text-blue-500" />
                  Technical Specifications
                </h3>
                <button 
                  onClick={addSpec}
                  className="flex items-center gap-1 text-sm bg-blue-50 text-blue-600 px-4 py-2 rounded-xl hover:bg-blue-100 transition-colors font-bold"
                >
                  <Plus size={16} /> Add Row
                </button>
              </div>
              
              <div className="space-y-3">
                {specs.map((spec, i) => (
                  <div key={i} className="flex gap-3 animate-in slide-in-from-left-2" style={{ animationDelay: `${i * 50}ms` }}>
                    <input 
                      type="text" 
                      placeholder="e.g. Color" 
                      value={spec.label}
                      onChange={(e) => updateSpec(i, 'label', e.target.value)}
                      className="flex-1 p-3 text-sm bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-blue-300" 
                    />
                    <input 
                      type="text" 
                      placeholder="e.g. Metallic Blue" 
                      value={spec.value}
                      onChange={(e) => updateSpec(i, 'value', e.target.value)}
                      className="flex-1 p-3 text-sm bg-gray-100 border border-gray-200 rounded-xl font-bold text-gray-700" 
                    />
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-blue-600 p-8 rounded-3xl text-white shadow-xl shadow-blue-100 space-y-6">
               <h3 className="font-bold flex items-center gap-2">
                 <ClipboardList size={18} />
                 Additional Details
               </h3>
               <div className="space-y-4">
                 <div>
                   <label className="text-xs font-bold uppercase opacity-70">Features</label>
                   <textarea className="w-full mt-1 p-3 bg-white/10 border border-white/20 rounded-xl text-sm placeholder:text-white/40 outline-none" placeholder="List key features..." rows={2} />
                 </div>
                 <div>
                   <label className="text-xs font-bold uppercase opacity-70">Insurance</label>
                   <textarea className="w-full mt-1 p-3 bg-white/10 border border-white/20 rounded-xl text-sm placeholder:text-white/40 outline-none" placeholder="Coverage details..." rows={2} />
                 </div>
               </div>
            </div>
          </div>
        )}
      </div>

      {/* --- FOOTER NAV --- */}
      <div className="mt-12 flex justify-between items-center bg-white p-4 rounded-2xl shadow-sm border border-gray-100">
        <button 
          disabled={selectedTab === "identity"}
          onClick={() => {
            if (selectedTab === "terms") setSelectedTab("identity");
            if (selectedTab === "specs") setSelectedTab("terms");
          }}
          className="px-6 py-2 text-gray-500 font-bold disabled:opacity-30"
        >
          Back
        </button>
        <button 
          onClick={() => {
            if (selectedTab === "identity") setSelectedTab("terms");
            else if (selectedTab === "terms") setSelectedTab("specs");
            else alert("Ready to publish!");
          }}
          className="bg-gray-900 text-white px-8 py-3 rounded-xl font-bold hover:bg-black transition-all"
        >
          {selectedTab === "specs" ? "Finish & Preview" : "Continue"}
        </button>
      </div>
    </div>
  );
}