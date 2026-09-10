"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import { supabase } from "@/lib/supabase";

const INTEREST_OPTIONS = [
  "Partner for biochar production",
  "Buy Credits",
  "Info on carbon credits",
  "Sell credits",
  "Others",
];

const initialState = {
  name: "",
  organization: "",
  phone: "",
  interests: [],
  numberOfFarmers: "",
  district: "",
  state: "",
  message: "",
};

export default function RegisterIntent() {
  const [form, setForm] = useState(initialState);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const isBiocharPartner = form.interests.includes(
    "Partner for biochar production"
  );

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleInterestToggle = (option) => {
    setForm((prev) => {
      const already = prev.interests.includes(option);
      return {
        ...prev,
        interests: already
          ? prev.interests.filter((i) => i !== option)
          : [...prev.interests, option],
      };
    });
  };

  const validateForm = () => {
    if (
      !form.name ||
      !form.organization ||
      !form.phone ||
      form.interests.length === 0
    ) {
      return "Please fill all required fields.";
    }

    if (!/^\d{10}$/.test(form.phone)) {
      return "Phone number must contain exactly 10 digits.";
    }

    if (isBiocharPartner) {
      if (
        !form.numberOfFarmers ||
        !form.district ||
        !form.state
      ) {
        return "Please fill all biochar partner details.";
      }
    }

    return "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    setLoading(true);

    try {
      const payload = {
        full_name: form.name,
        organization_name: form.organization,
        phone: `+91${form.phone}`,
        query_type: form.interests.join(", "),
        more_details: form.message || null,
        platform: "web",
        status: "pending",
      };

      if (isBiocharPartner) {
        payload.number_of_farmers = Number(form.numberOfFarmers);
        payload.district = form.district;
        payload.state = form.state;
      }

      const { error } = await supabase
        .from("roi_intents")
        .insert([payload]);

      if (error) throw error;

      setSuccess(true);
      setForm(initialState);
    } catch (err) {
      console.error("Supabase insert error:", err);
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

          {/* HEADER */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
              Partner With Us
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

          {/* ERROR */}
          {error && (
            <div className="mb-6 rounded-xl bg-red-50 text-red-700 px-4 py-3 text-sm font-medium">
              {error}
            </div>
          )}

          {/* FORM */}
          {!success && (
            <form onSubmit={handleSubmit} className="space-y-6">

              <Input
                label="Full Name"
                placeholder="Your name"
                name="name"
                value={form.name}
                onChange={handleChange}
                required
              />

              <Input
                label="Organisation"
                placeholder="Organisation name"
                name="organization"
                value={form.organization}
                onChange={handleChange}
                required
              />

              {/* Phone */}
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
                    required
                  />
                </div>
              </div>

              {/* What kind of info are you looking for */}
              <div>
                <label className="block text-gray-800 font-semibold mb-2">
                  What kind of info are you looking for?{" "}
                  <span className="text-red-500">*</span>
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {INTEREST_OPTIONS.map((option) => (
                    <label
                      key={option}
                      className="flex items-center gap-3 rounded-xl border border-gray-200 bg-white px-4 py-3 cursor-pointer hover:border-emerald-300 transition-colors"
                    >
                      <input
                        type="checkbox"
                        checked={form.interests.includes(option)}
                        onChange={() => handleInterestToggle(option)}
                        className="w-4 h-4 accent-emerald-600"
                      />
                      <span className="text-gray-800">{option}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* CONDITIONAL BIOCHAR FIELDS */}
              {isBiocharPartner && (
                <>
                  <Input
                    label="Number of Farmers Associated"
                    placeholder="Approximate number"
                    name="numberOfFarmers"
                    value={form.numberOfFarmers}
                    onChange={handleChange}
                    required
                  />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input
                      label="District"
                      placeholder="District"
                      name="district"
                      value={form.district}
                      onChange={handleChange}
                      required
                    />
                    <Input
                      label="State"
                      placeholder="State"
                      name="state"
                      value={form.state}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </>
              )}

              {/* Message */}
              <div>
                <label className="block text-gray-800 font-semibold mb-1">
                  Message
                </label>
                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  placeholder="Anything else you'd like us to know (optional)"
                  rows={4}
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
                {loading ? "Submitting..." : "Submit"}
              </button>
            </form>
          )}

          {/* SUCCESS */}
          {success && (
            <div className="mt-10 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 px-6 py-8 text-center">
              <div className="text-2xl font-bold mb-2">
                ✅ Registration Successful
              </div>
              <p className="text-emerald-700">
                Thank you for your interest. Our team will reach out to you soon.
              </p>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}

/* Reusable Input */
function Input({ label, placeholder, name, value, onChange, required }) {
  return (
    <div>
      <label className="block text-gray-800 font-semibold mb-1">
        {label}
        {required && <span className="text-red-500"> *</span>}
      </label>
      <input
        type="text"
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        className="w-full rounded-xl border border-gray-200 bg-white text-black px-4 py-3 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
      />
    </div>
  );
}
