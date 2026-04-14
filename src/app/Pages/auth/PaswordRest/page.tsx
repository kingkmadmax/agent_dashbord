"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase"; // Ensure this import matches your project

export default function PasswordReset() {
  const router = useRouter();

  // State for form inputs
  const [formData, setFormData] = useState({
    tempPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Get the email from sessionStorage (saved during Sign Up)
  useEffect(() => {
    const savedEmail = sessionStorage.getItem("resetEmail");
    if (savedEmail) {
      setEmail(savedEmail);
    } else {
      // If no email is found, they shouldn't be here
      setError("No account session found. Please sign up again.");
    }
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (error) setError("");
  };

  const handleUpdatePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    // 1. Basic Validation
    if (formData.newPassword !== formData.confirmPassword) {
      setError("The new passwords do not match.");
      setLoading(false);
      return;
    }

    try {
      // 2. Log in with the Temporary Password sent to email
      const { error: loginError } = await supabase.auth.signInWithPassword({
        email: email,
        password: formData.tempPassword,
      });

      if (loginError) {
        setError("The temporary password from your email is incorrect.");
        setLoading(false);
        return;
      }

      // 3. Update to the New Permanent Password
      const { error: updateError } = await supabase.auth.updateUser({
        password: formData.newPassword,
      });

      if (updateError) {
        setError(updateError.message);
      } else {
        // 4. Success! Clear session storage and go to Login
        sessionStorage.removeItem("resetEmail");
        alert("Password updated successfully! Please log in.");
        router.push("/Pages/auth/LogIn");
      }
    } catch (err) {
      setError("An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  const isFormInvalid =
    !formData.tempPassword.trim() ||
    !formData.newPassword.trim() ||
    !formData.confirmPassword.trim() ||
    loading;

  return (
    <div className="flex min-h-screen items-center justify-center bg-white font-sans">
      <main className="relative w-full max-w-4xl py-16 px-8 bg-white dark:bg-black rounded-lg shadow-md">

        {/* Background Image Container */}
        <div className="absolute inset-0 h-[550px] bg-[#D0E6EB] rounded-lg overflow-hidden">
          <Image
            className="object-contain w-full h-full"
            src="/PhoneImage.png"
            alt="PhoneImage"
            width={400}
            height={500}
          />
        </div>

        <div className="relative z-10 flex items-center justify-center min-h-[400px]">
          <div className="border border-gray-400 p-8 rounded bg-white/95 backdrop-blur max-w-sm w-full space-y-5 shadow-xl">

            <div className="text-center">
              <h1 className="text-2xl font-semibold text-black">
                Set Permanent Password
              </h1>
              <p className="text-xs text-gray-500 mt-1">Check {email || 'your email'} for the code</p>
            </div>

            {/* ERROR DISPLAY */}
            {error && (
              <p className="text-red-500 text-xs font-bold text-center bg-red-50 p-2 rounded border border-red-200">
                {error}
              </p>
            )}

            <form onSubmit={handleUpdatePassword} className="space-y-5">
              <input
                type="password"
                name="tempPassword"
                value={formData.tempPassword}
                onChange={handleInputChange}
                placeholder="Temporary Password (from email)"
                className="w-full border-b border-gray-400 p-2 outline-none focus:border-black bg-transparent"
              />

              <input
                type="password"
                name="newPassword"
                value={formData.newPassword}
                onChange={handleInputChange}
                placeholder="Create New Password"
                className="w-full border-b border-gray-400 p-2 outline-none focus:border-black bg-transparent"
              />

              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                placeholder="Confirm New Password"
                className="w-full border-b border-gray-400 p-2 outline-none focus:border-black bg-transparent"
              />

              <button
                type="submit"
                disabled={isFormInvalid}
                className={`h-12 w-full rounded-md font-medium transition-all ${isFormInvalid
                    ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                    : "bg-blue-600 hover:bg-blue-700 text-white active:scale-95 shadow-lg"
                  }`}
              >
                {loading ? "Updating..." : "Update & Verify"}
              </button>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
}