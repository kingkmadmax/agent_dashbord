"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { supabase } from "@/lib/supabase";

export default function SignUP() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "", // Switched back to email
    password: ""
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (error) setError("");
  };

const handleSignUp = async (e: React.FormEvent) => {
  e.preventDefault();
  setLoading(true);
  setError("");

  // 1. Sign up the user
  const { data: authData, error: authError } = await supabase.auth.signUp({
    email: formData.email,
    password: formData.password,
  });

  if (authError) {
    setError(authError.message);
    setLoading(false);
    return;
  }

  // 2. Create profile
  if (authData?.user) {
    const { error: profileError } = await supabase
      .from('profiles')
      .insert({
        id: authData.user.id,
        first_name: formData.firstName.trim(),
        last_name: formData.lastName.trim(),
        email: formData.email,
      });

    if (profileError) {
      console.error("Profile error:", profileError.message);
      // If it's a duplicate email error, show friendly message
      if (profileError.message.includes("duplicate") || profileError.code === "23505") {
        setError("This email is already registered. Please login instead.");
      } else {
        setError("Account created, but failed to save profile details.");
      }
    }
  }

  alert("✅ Account created successfully!\nYou can now go to the Login page.");
  router.push("/Pages/auth/LogIn");
  setLoading(false);
};

  const isFormIncomplete = !formData.firstName || !formData.email || !formData.password;

  return (
    <div className="flex min-h-screen items-center justify-center bg-white font-sans">
      <main className="flex flex-row items-stretch justify-center min-h-screen w-full max-w-7xl py-32 px-16 bg-white dark:bg-black gap-10">
        
        <div className="bg-[#D0E6EB] rounded flex-1 flex items-center justify-center">
          <Image
            className="dark:invert object-contain h-full"
            src="/next.svg"
            alt="App Preview"
            width={750}
            height={701}
            priority
          />
        </div>

        <div className="border-2 border-gray-300 p-8 rounded flex-1 flex flex-col justify-center max-w-md w-full space-y-6 shadow-lg">
          <h1 className="text-3xl font-semibold text-center text-black dark:text-zinc-50">
            Create an Account
          </h1>

          <form onSubmit={handleSignUp} className="space-y-4">
            <input
              type="text"
              name="firstName"
              placeholder="First Name"
              className="w-full border-b border-gray-400 p-2 outline-none focus:border-black text-black"
              value={formData.firstName}
              onChange={handleInputChange}
            />
            <input
              type="text"
              name="lastName"
              placeholder="Last Name"
              className="w-full border-b border-gray-400 p-2 outline-none focus:border-black text-black"
              value={formData.lastName}
              onChange={handleInputChange}
            />
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              className="w-full border-b border-gray-400 p-2 outline-none focus:border-black text-black"
              value={formData.email}
              onChange={handleInputChange}
            />
            <input
              type="password"  
              name="password"
              placeholder="Password"
              className="w-full border-b border-gray-400 p-2 outline-none focus:border-black text-black"
              value={formData.password}
              onChange={handleInputChange}
            />

            {error && <p className="text-red-500 text-sm text-center font-medium mt-2">{error}</p>}

            <button
              type="submit"
              disabled={loading || isFormIncomplete}
              className={`h-11 w-full rounded-md font-medium transition-all mt-4 ${
                (loading || isFormIncomplete)
                  ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700 text-white active:scale-95"
              }`}
            >
              {loading ? "Saving Profile..." : "Sign up"}
            </button>
          </form>

          <p className="text-center text-sm text-gray-600">
            Already have an account?{" "}
            <a href="/Pages/auth/LogIn" className="text-blue-600 font-semibold hover:underline">
              Login
            </a>
          </p>
        </div>
      </main>
    </div>
  );
}