"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import { db } from "@/lib/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

const initialState = {
  name: "",
  organization: "",
  phone: "",
  queryType: "",
  numberOfFarmers: "",
  district: "",
  state: "",
  feedstockType: "",
};

export default function RegisterIntent() {
  const [form, setForm] = useState(initialState);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Only validate phone number if entered
  const validateForm = () => {
    if (form.phone && !/^\d{10}$/.test(form.phone)) {
      return "Phone number must contain exactly 10 digits.";
    }
    return "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess(false);

    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    setLoading(true);

    try {
      await addDoc(collection(db, "Intents"), {
        ...form,
        phone: form.phone ? `+91${form.phone}` : "",
        platform: "web",
        createdAt: serverTimestamp(),
      });

      setSuccess(true);

      // Optional: forward one field to another website after success
      const forwardUrl = process.env.NEXT_PUBLIC_FORWARD_URL;
      const forwardParam = process.env.NEXT_PUBLIC_FORWARD_PARAM; // e.g. "phone" or "name"
      if (forwardUrl && forwardParam) {
        const valueToSend =
          forwardParam === "phone"
            ? (form.phone ? `+91${form.phone}` : "")
            : (form[forwardParam] ?? "");
        const url = new URL(forwardUrl);
        if (valueToSend) url.searchParams.set(forwardParam, valueToSend);
        window.location.href = url.toString();
        return;
      }

      // Clear form after 2 seconds
      setTimeout(() => {
        setForm(initialState);
        setSuccess(false);
      }, 2000);

    } catch (err) {
      console.error("Firestore error:", err);
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-green-100">
      <Navbar />

      <div className="max-w-3xl mx-auto px-4 py-16">
        <div className="bg-white rounded-3xl shadow-xl p-8 md:p-10">

          {/* ===== HEADER (CENTERED) ===== */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
              Registration of Intent
            </h1>

            <div className="w-20 h-1 bg-emerald-600 mx-auto my-4 rounded-full" />

            <p className="text-gray-700 max-w-2xl mx-auto leading-relaxed">
              Partner with{" "}
              <span className="font-semibold text-emerald-700">
                KriSHE Carbon
              </span>{" "}
              to enable sustainable livelihoods, verified carbon credits, and
              climate-positive agriculture.
            </p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-6 rounded-xl bg-red-50 text-red-700 px-4 py-3 text-sm font-medium">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">

            <Input
              label="Full Name"
              placeholder="Your name"
              name="name"
              value={form.name}
              onChange={handleChange}
            />

            <Input
              label="Organisation / FPO"
              placeholder="Organisation or FPO name"
              name="organization"
              value={form.organization}
              onChange={handleChange}
            />

            {/* Phone Number */}
            <div>
              <label className="block text-gray-800 font-semibold mb-1">
                Phone Number <span className="text-red-500">*</span>
              </label>
              <div className="flex">
                <span className="inline-flex items-center px-4 rounded-l-xl border border-r-0 border-gray-200 bg-gray-100 text-gray-700 font-medium">
                  +91
                </span>
                <input
                  type="tel"
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  maxLength={10}
                  placeholder="10-digit mobile number"
                  className="w-full rounded-r-xl border border-gray-200 bg-white text-black px-4 py-3 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                />
              </div>
            </div>

            {/* Query */}
            <div>
              <label className="block text-gray-800 font-semibold mb-1">
                Query Related To <span className="text-red-500">*</span>
              </label>
              <select
                name="queryType"
                value={form.queryType}
                onChange={handleChange}
                className="w-full rounded-xl border border-gray-200 bg-white text-black px-4 py-3 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              >
                <option value="">Select an option</option>
                <option>Partner for biochar production</option>
                <option>Info on carbon credits</option>
                <option>Sell credits</option>
                <option>Others</option>
              </select>
            </div>

            <Input
              label="Number of Farmers Associated"
              placeholder="Approximate number"
              name="numberOfFarmers"
              value={form.numberOfFarmers}
              onChange={handleChange}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="District"
                placeholder="District"
                name="district"
                value={form.district}
                onChange={handleChange}
              />
              <Input
                label="State"
                placeholder="State"
                name="state"
                value={form.state}
                onChange={handleChange}
              />
            </div>

            <Input
              label="Remarks"
              placeholder="Eg: Rice husk, sugarcane residue"
              name="feedstockType"
              value={form.feedstockType}
              onChange={handleChange}
            />

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className={`w-full rounded-xl py-4 text-lg font-semibold transition-all ${
                loading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-emerald-600 hover:bg-emerald-700 text-white"
              }`}
            >
              {loading ? "Submitting..." : "Submit Registration"}
            </button>

            {/* Success Message */}
            {success && (
              <div className="mt-4 rounded-xl bg-emerald-50 text-emerald-700 px-4 py-3 text-center font-medium">
                ✅ Registered successfully! We’ll reach out to you soon.
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}

/* ===== Reusable Input Component ===== */
function Input({ label, placeholder, name, value, onChange }) {
  return (
    <div>
      <label className="block text-gray-800 font-semibold mb-1">
        {label} <span className="text-red-500">*</span>
      </label>
      <input
        type="text"
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full rounded-xl border border-gray-200 bg-white text-black px-4 py-3 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
      />
    </div>
  );
}
