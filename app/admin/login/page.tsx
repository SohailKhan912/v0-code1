"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { authAPI } from "@/utils/api";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      console.log("🚀 Attempting login:", { email, password });

      const response = await authAPI.login(email, password);
      console.log("✅ API Success:", response);

      // ✅ Fix: Ensure token is directly from `response.token`
      const token = response?.token;

      if (!token) {
        console.warn("⚠️ No token received from backend");
        setError("Login failed — no token received from server");
        return;
      }

      // ✅ Save token properly
      localStorage.setItem("adminToken", token);
      console.log("🔐 Token stored:", token);

      // ✅ Redirect
      router.push("/admin/dashboard");
    } catch (err: any) {
      console.error("💥 Login Error:", err);
      setError(err.message || "Invalid credentials");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <form
        onSubmit={handleLogin}
        className="bg-white shadow-md rounded-lg p-8 w-96"
      >
        <h2 className="text-2xl font-bold mb-4 text-center">GlassVision Admin</h2>

        {error && (
          <p className="text-red-500 bg-red-100 border border-red-300 p-2 mb-3 rounded">
            {error}
          </p>
        )}

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border rounded p-2 w-full mb-3"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border rounded p-2 w-full mb-3"
          required
        />
        <button
          type="submit"
          className="bg-indigo-600 text-white px-4 py-2 rounded w-full hover:bg-indigo-700"
        >
          Sign In
        </button>
      </form>
    </div>
  );
}
