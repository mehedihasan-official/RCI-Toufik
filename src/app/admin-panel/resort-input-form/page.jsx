"use client";

import { useState } from "react";
import Swal from "sweetalert2";

export default function ResortInputFormPage() {
  const [formData, setFormData] = useState({
    place_name: "",
    location: "",
    resort_ID: "",
    img: "",
    reviews_amount: "",
    ownerExclusive: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("/api/resorts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        Swal.fire({
          icon: "success",
          title: "Resort Added!",
          text: "The resort has been successfully added",
          timer: 1500,
        });
        setFormData({
          place_name: "",
          location: "",
          resort_ID: "",
          img: "",
          reviews_amount: "",
          ownerExclusive: "",
        });
      } else {
        throw new Error("Failed to add resort");
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error.message,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-gray-900">Add New Resort</h1>

      <div className="rounded-lg border border-slate-200 bg-white p-8 shadow-sm max-w-2xl">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700">
              Resort Name
            </label>
            <input
              type="text"
              name="place_name"
              required
              value={formData.place_name}
              onChange={handleChange}
              className="mt-2 w-full rounded-lg border border-slate-300 bg-white px-4 py-2 text-gray-900 focus:border-[#037092] focus:outline-none"
              placeholder="e.g., Wyndham Grand Resort"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700">
              Location
            </label>
            <input
              type="text"
              name="location"
              required
              value={formData.location}
              onChange={handleChange}
              className="mt-2 w-full rounded-lg border border-slate-300 bg-white px-4 py-2 text-gray-900 focus:border-[#037092] focus:outline-none"
              placeholder="e.g., Maui, Hawaii"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700">
              Resort ID
            </label>
            <input
              type="text"
              name="resort_ID"
              required
              value={formData.resort_ID}
              onChange={handleChange}
              className="mt-2 w-full rounded-lg border border-slate-300 bg-white px-4 py-2 text-gray-900 focus:border-[#037092] focus:outline-none"
              placeholder="e.g., RES-001"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700">
              Image URL
            </label>
            <input
              type="url"
              name="img"
              value={formData.img}
              onChange={handleChange}
              className="mt-2 w-full rounded-lg border border-slate-300 bg-white px-4 py-2 text-gray-900 focus:border-[#037092] focus:outline-none"
              placeholder="https://example.com/image.jpg"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700">
              Reviews Amount
            </label>
            <input
              type="text"
              name="reviews_amount"
              value={formData.reviews_amount}
              onChange={handleChange}
              className="mt-2 w-full rounded-lg border border-slate-300 bg-white px-4 py-2 text-gray-900 focus:border-[#037092] focus:outline-none"
              placeholder="e.g., 500"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700">
              Owner Exclusive Badge
            </label>
            <input
              type="text"
              name="ownerExclusive"
              value={formData.ownerExclusive}
              onChange={handleChange}
              className="mt-2 w-full rounded-lg border border-slate-300 bg-white px-4 py-2 text-gray-900 focus:border-[#037092] focus:outline-none"
              placeholder="e.g., Wyndham Exclusive"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-[#037092] px-6 py-3 font-semibold text-white hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? "Adding Resort..." : "Add Resort"}
          </button>
        </form>
      </div>
    </div>
  );
}
