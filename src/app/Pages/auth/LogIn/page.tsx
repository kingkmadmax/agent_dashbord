"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function Login() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      setErrorMsg("Please enter both email and password");
      return;
    }

    setLoading(true);
    setErrorMsg("");

    try {
      // 1. Query the 'profiles' table
      const { data: user, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('email', email.trim())
        .eq('password', password)
        .single();

      if (error || !user) {
        setErrorMsg("Invalid email or password.");
        setLoading(false);
        return;
      }

      // 2. SAVE THE SESSION
      // We save the ID specifically so the Create Rental page can find it
      localStorage.setItem("userId", user.id);
      localStorage.setItem("user_session", JSON.stringify(user));

      // 3. Redirect
      alert(`Welcome back, ${user.first_name || 'User'}!`);
      router.push("/Pages/Dashboard");

    } catch (err) {
      setErrorMsg("An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 p-4">
      <main className="flex flex-row items-stretch justify-center w-full max-w-7xl bg-white shadow-xl rounded-2xl overflow-hidden min-h-[600px]">
        
        {/* Form Section */}
        <div className="p-12 flex-1 flex flex-col justify-center max-w-md w-full space-y-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Login to EthiRent</h1>
            <p className="text-gray-500 mt-2">Enter your credentials to manage your gear</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-4">
              <input
                type="email"
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border-b border-gray-300 p-2 outline-none focus:border-blue-600 transition-colors"
                required
              />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border-b border-gray-300 p-2 outline-none focus:border-blue-600 transition-colors"
                required
              />
            </div>

            {errorMsg && <p className="text-red-500 text-sm">{errorMsg}</p>}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 text-white h-12 rounded-xl font-bold hover:bg-blue-700 transition-all disabled:bg-gray-400"
            >
              {loading ? "Verifying..." : "Login"}
            </button>
          </form>

          <p className="text-center text-sm text-gray-600">
            Don’t have an account? <a href="/Pages/auth/SignUp" className="text-blue-600 font-bold hover:underline">Sign Up</a>
          </p>
        </div>

        {/* Visual Section */}
        <div className="hidden lg:flex bg-blue-50 flex-1 items-center justify-center relative">
           <div className="p-20 text-center">
              <h2 className="text-2xl font-black text-blue-900 mb-4">Rent Professional Gear in Addis</h2>
              <p className="text-blue-700">The most trusted P2P rental marketplace in Ethiopia.</p>
           </div>
        </div>
      </main>
    </div>
  );
}