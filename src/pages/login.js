"use client";

import { useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import { supabase } from "@/lib/supabase";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!form.email || !form.password) {
      setError("Please enter your email and password.");
      return;
    }

    setLoading(true);
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email: form.email,
        password: form.password,
      });

      if (error) throw error;

      window.location.href = "/";
    } catch (err) {
      console.error("Login error:", err);
      setError(err.message || "Invalid email or password.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-green-100">
      <Navbar />

      <div className="max-w-md mx-auto px-4 py-16">
        <div className="bg-white rounded-3xl shadow-xl p-8 md:p-10">
          <div className="text-center mb-10">
            <h1 className="text-4xl font-bold text-gray-900">Login</h1>
            <div className="w-20 h-1 bg-emerald-600 mx-auto my-4 rounded-full" />
            <p className="text-gray-700 leading-relaxed">
              Sign in to your{" "}
              <span className="font-semibold text-emerald-700">
                KriSHE Carbon
              </span>{" "}
              account.
            </p>
          </div>

          {error && (
            <div className="mb-6 rounded-xl bg-red-50 text-red-700 px-4 py-3 text-sm font-medium">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-gray-800 font-semibold mb-1">
                Email <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="you@example.com"
                required
                className="w-full rounded-xl border border-gray-200 bg-white text-black px-4 py-3 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-gray-800 font-semibold mb-1">
                Password <span className="text-red-500">*</span>
              </label>
              <input
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                placeholder="Your password"
                required
                className="w-full rounded-xl border border-gray-200 bg-white text-black px-4 py-3 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full rounded-xl py-4 text-lg font-semibold transition-all ${
                loading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-emerald-600 hover:bg-emerald-700 text-white"
              }`}
            >
              {loading ? "Signing in..." : "Login"}
            </button>
          </form>

          <p className="text-center text-gray-600 mt-8">
            Interested in partnering with us?{" "}
            <Link href="/roi" className="font-semibold text-emerald-700 hover:underline">
              Register your organization
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
