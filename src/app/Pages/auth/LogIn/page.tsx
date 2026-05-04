"use client";

import { useState } from 'react';
import Image from "next/image";
import { useRouter } from "next/navigation";
import { loginUser } from "@/app/Pages/auth/LogIn/auth";

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState<'success' | 'error' | ''>('');
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    setMessageType('');

    try {
      const formData = new FormData();
      formData.append('username', username);
      formData.append('password', password);

      // Step 1: Login with Keycloak
      const result = await loginUser(formData);

      if (!result.success) {
        setMessage(`❌ ${result.error || 'Login failed'}`);
        setMessageType('error');
        return;
      }

      // Step 2: Validate token with your Spring Boot Backend
      const backendRes = await fetch('http://localhost:9090/api/auth/login-sync', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${result.access_token}`,
          'Content-Type': 'application/json'
        },
      });

      if (backendRes.ok) {
        // Success!
        localStorage.setItem('access_token', result.access_token);
        localStorage.setItem('refresh_token', result.refresh_token || '');

        setMessage('✅ Login successful! Redirecting to home...');
        setMessageType('success');

        // Redirect after short delay
        setTimeout(() => {
          router.push('/');
        }, 1500);

      } else {
        const errorData = await backendRes.json().catch(() => ({}));
        setMessage(`❌ ${errorData.message || 'Backend validation failed'}`);
        setMessageType('error');
      }
    } catch (err) {
      console.error("Login error:", err);
      setMessage('❌ Network error. Please check if backend and Keycloak are running.');
      setMessageType('error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-white text-black">
      <main className="flex flex-row items-stretch justify-center min-h-screen w-full max-w-7xl py-32 px-16 bg-white gap-10">
        
        {/* Left Side - Login Form */}
        <div className="border-2 border-gray-300 shadow-lg p-8 rounded flex-1 flex flex-col justify-center max-w-md w-full space-y-12">
          <h1 className="text-3xl font-semibold text-center text-black">
            Login into Exclusive
          </h1>

          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-6">
              <input
                type="text"
                placeholder="Username or Email"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full p-3 border-0 border-b-2 border-gray-300 focus:border-blue-500 focus:outline-none transition-colors"
                required
              />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-3 border-0 border-b-2 border-gray-300 focus:border-blue-500 focus:outline-none transition-colors"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="bg-blue-600 hover:bg-blue-700 text-white h-12 w-full rounded-md font-medium transition-all disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </form>

          {/* Improved Message Notification */}
          {message && (
            <div className={`p-4 rounded-lg text-center font-medium border ${
              messageType === 'success' 
                ? 'bg-green-50 text-green-700 border-green-300' 
                : 'bg-red-50 text-red-700 border-red-300'
            }`}>
              {message}
            </div>
          )}

          <div className="flex flex-col sm:flex-row justify-between items-center text-sm gap-4">
            <a href="/forgot-password" className="text-blue-600 hover:underline">
              Forgot Password?
            </a>
            <p>
              Don’t have an account?{' '}
              <a href="/Pages/auth/SignUp" className="text-blue-600 font-semibold hover:underline">
                Sign Up
              </a>
            </p>
          </div>
        </div>

        {/* Right Side - Image */}
        <div className="bg-[#D0E6EB] rounded flex-1 hidden lg:flex items-center justify-center relative overflow-hidden">
          <Image
            className="object-contain p-12"
            src="/PhoneImage.png"
            alt="Phone Image"
            fill
            priority
          />
        </div>
      </main>
    </div>
  );
}