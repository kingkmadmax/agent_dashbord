"use client";

import React, { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { ArrowLeft, Loader2, Save, Upload, X, ImageIcon } from "lucide-react";
import { supabase } from "@/lib/supabase";
import Image from "next/image";

export default function EditListing() {
  const router = useRouter();
  const params = useParams();
  const id = Array.isArray(params.id) ? params.id[0] : params.id;

  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // --- IMAGE STATE ---
  // existingUrls: URLs already in the database
  const [existingUrls, setExistingUrls] = useState<string[]>([]);
  // newFiles: New 'File' objects selected by the user to be uploaded
  const [newFiles, setNewFiles] = useState<File[]>([]);
  // newPreviews: Blob URLs used to show previews of the new files before uploading
  const [newPreviews, setNewPreviews] = useState<string[]>([]);
  // deletedUrls: Track which existing images the user wants to remove
  const [deletedUrls, setDeletedUrls] = useState<string[]>([]);

  // --- FORM STATE ---
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    price: 0,
    deposit: 0,
    status: "available",
    description: "",
  });

  // --- 1. FETCH INITIAL DATA & IMAGES ---
  useEffect(() => {
    async function getListing() {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from("rentals")
          .select("*")
          .eq("id", id)
          .single();

        if (error) throw error;

        if (data) {
          setFormData({
            name: data.name || "",
            category: data.category || "",
            price: data.price || 0,
            deposit: data.deposit || 0,
            status: data.status || "available",
            description: data.details?.description || "",
          });
          // Set the existing image URLs from the database array column
          setExistingUrls(data.image || []);
        }
      } catch (err: any) {
        console.error("Fetch error:", err.message);
        alert("Could not find this listing.");
        router.push("/Pages/My_Listings");
      } finally {
        setLoading(false);
      }
    }
    if (id) getListing();
  }, [id, router]);

  // --- 2. IMAGE HANDLERS ---

  // Handle adding new files via the input
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files);
      setNewFiles((prev) => [...prev, ...filesArray]);

      // Create temporary blob URLs for previewing the local files
      const newPreviewsArray = filesArray.map((file) =>
        URL.createObjectURL(file)
      );
      setNewPreviews((prev) => [...prev, ...newPreviewsArray]);
    }
  };

  // Remove an image that is already in the database (mark it for deletion)
  const removeExistingImage = (indexToRemove: number, urlToRemove: string) => {
    setExistingUrls((prev) => prev.filter((_, i) => i !== indexToRemove));
    setDeletedUrls((prev) => [...prev, urlToRemove]);
  };

  // Remove a new, not-yet-uploaded image (just clean up the state)
  const removeNewImage = (indexToRemove: number) => {
    setNewFiles((prev) => prev.filter((_, i) => i !== indexToRemove));
    setNewPreviews((prev) => prev.filter((_, i) => i !== indexToRemove));
  };

  // Handle standard text/input changes
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // --- 3. SUBMIT CHANGES (Database & Storage) ---
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Step A: Upload New Images to Storage (if any)
      const freshlyUploadedUrls: string[] = [];

      for (const file of newFiles) {
        const fileExt = file.name.split(".").pop();
        // Create a unique path for the new file
        const fileName = `${id}-${Math.random()}-${Date.now()}.${fileExt}`;
        const filePath = `listings/${fileName}`;

        const { error: uploadError } = await supabase.storage
          .from("rental-images")
          .upload(filePath, file);

        if (uploadError) throw uploadError;

        // Get the permanent URL for the newly uploaded file
        const { data: storageData } = supabase.storage
          .from("rental-images")
          .getPublicUrl(filePath);

        freshlyUploadedUrls.push(storageData.publicUrl);
      }

      // Step B: Calculate the final array of images for the DB
      // (Keep existing images - mark deleted ones + add newly uploaded ones)
      const finalImageArray = [...existingUrls, ...freshlyUploadedUrls];

      // Step C: Update the Database Row
      const { error: dbError } = await supabase
        .from("rentals")
        .update({
          name: formData.name,
          category: formData.category,
          price: parseFloat(formData.price.toString()),
          deposit: parseFloat(formData.deposit.toString()),
          status: formData.status,
          details: { description: formData.description },
          image: finalImageArray, // Update the DB with the final list of URLs
        })
        .eq("id", id);

      if (dbError) throw dbError;

      // Step D: (Optional but Recommended) Delete Old/Removed Files from Storage
      // In a production app, you don't want to leave abandoned files in your bucket.
      if (deletedUrls.length > 0) {
        // We need to extract the path (e.g., 'listings/image.jpg') from the full public URL
        const pathsToDelete = deletedUrls.map((url) => {
          const parts = url.split("/");
          return `listings/${parts[parts.length - 1]}`;
        });

        // Supabase storage delete function allows deleting multiple files at once
        await supabase.storage.from("rental-images").remove(pathsToDelete);
      }

      // Final Success Cleanup and Redirect
      // Revoke temporary blob URLs to free browser memory
      newPreviews.forEach((url) => URL.revokeObjectURL(url));

      alert("Listing and images updated successfully!");
      router.push("/Pages/My_Listings");
    } catch (err: any) {
      console.error("Update failed:", err.message);
      alert("Update failed: " + err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="animate-spin text-emerald-600" size={40} />
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <button
        onClick={() => router.push("/Pages/My_Listings")}
        className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to My Listings
      </button>

      <div className="mb-8 flex items-center gap-4">
        <div className="p-3 bg-emerald-50 rounded-xl text-emerald-600">
            <ImageIcon size={30} />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Edit Listing</h1>
          <p className="text-gray-600 mt-1">
            Updating details for: <span className="font-mono text-emerald-600">{formData.name}</span>
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        
        {/* --- IMAGE EDITING SECTION --- */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Manage Images</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Display current images with a 'Remove' button */}
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Current Images</label>
                {existingUrls.length === 0 ? (
                    <div className="text-center py-6 border-2 border-dashed border-gray-100 rounded-xl text-gray-400">
                        No current images.
                    </div>
                ) : (
                    <div className="grid grid-cols-3 gap-2">
                        {existingUrls.map((url, index) => (
                        <div key={url} className="relative group aspect-square rounded-lg border overflow-hidden bg-gray-50">
                            <Image src={url} alt="listing" fill className="object-cover" sizes="150px" />
                            <button 
                                type="button" 
                                onClick={() => removeExistingImage(index, url)}
                                className="absolute top-1 right-1 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow"
                            >
                                <X size={14} />
                            </button>
                        </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Uploader for New Images */}
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Add New Images</label>
                <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-xl bg-gray-50 cursor-pointer hover:bg-gray-100 transition-colors">
                    <div className="text-center">
                        <Upload className="w-6 h-6 text-gray-400 mx-auto mb-2" />
                        <p className="text-xs font-semibold text-gray-600">Upload new</p>
                    </div>
                    <input type="file" className="hidden" multiple accept="image/*" onChange={handleFileChange} />
                </label>
                
                {/* Previews of new files not yet uploaded */}
                <div className="grid grid-cols-4 gap-2 mt-3">
                    {newPreviews.map((url, index) => (
                    <div key={url} className="relative group aspect-square rounded-md border overflow-hidden">
                        <img src={url} alt="new-preview" className="w-full h-full object-cover" />
                        <button 
                            type="button"
                            onClick={() => removeNewImage(index)}
                            className="absolute top-0.5 right-0.5 p-0.5 bg-gray-700 text-white rounded-full opacity-80"
                        >
                            <X size={12} />
                        </button>
                    </div>
                    ))}
                </div>
            </div>
          </div>
        </div>

        {/* --- STANDARD DETAILS SECTION --- */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Product Details</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Daily Price ($)</label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-lg outline-none"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                <select 
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-lg outline-none"
                >
                  <option value="available">Available</option>
                  <option value="rented">Rented</option>
                  <option value="paused">Paused</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
              <textarea
                name="description"
                rows={4}
                value={formData.description}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg outline-none"
              />
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4 pt-4 border-t">
          <button
            type="submit"
            disabled={isSubmitting}
            className="flex-1 bg-emerald-600 text-white py-3 rounded-lg font-semibold hover:bg-emerald-700 flex items-center justify-center gap-2 disabled:opacity-50 transition-colors shadow-sm"
          >
            {isSubmitting ? <Loader2 className="animate-spin" /> : <Save size={20} />}
            {isSubmitting ? "Saving Changes..." : "Save Changes"}
          </button>
          <button
            type="button"
            onClick={() => router.back()}
            className="px-8 py-3 border border-gray-300 rounded-lg font-medium text-gray-700 hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}