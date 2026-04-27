"use client";

import { AuthContext } from "@/providers/AuthProvider";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useContext, useState } from "react";
import { FcGoogle } from "react-icons/fc";
import Swal from "sweetalert2";

export default function RegistrationPage() {
  const { createUser, googleLogin } = useContext(AuthContext);
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    membership: "Bronze",
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
      await createUser(
        formData.name,
        formData.email,
        formData.password,
        formData.membership,
      );
      Swal.fire({
        icon: "success",
        title: "Account Created!",
        text: "Welcome to RCI Vacations!",
        timer: 1500,
      });
      router.push("/");
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Registration Failed",
        text: error.message,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignup = async () => {
    setLoading(true);
    try {
      await googleLogin();
      Swal.fire({
        icon: "success",
        title: "Account Created!",
        text: "Welcome to RCI Vacations!",
        timer: 1500,
      });
      router.push("/");
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Google Signup Failed",
        text: error.message,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-50 to-cyan-50 px-6 py-12">
      <div className="w-full max-w-md">
        {/* Card */}
        <div className="rounded-lg border border-slate-200 bg-white p-8 shadow-lg">
          {/* Header */}
          <h1 className="text-3xl font-bold text-gray-900">Join RCI</h1>
          <p className="mt-2 text-gray-600">
            Create your account to start exploring
          </p>

          {/* Form */}
          <form onSubmit={handleSubmit} className="mt-8 space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700">
                Full Name
              </label>
              <input
                type="text"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                className="mt-2 w-full rounded-lg border border-slate-300 bg-white px-4 py-2 text-gray-900 focus:border-[#037092] focus:outline-none"
                placeholder="John Doe"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="mt-2 w-full rounded-lg border border-slate-300 bg-white px-4 py-2 text-gray-900 focus:border-[#037092] focus:outline-none"
                placeholder="you@example.com"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700">
                Password
              </label>
              <input
                type="password"
                name="password"
                required
                value={formData.password}
                onChange={handleChange}
                className="mt-2 w-full rounded-lg border border-slate-300 bg-white px-4 py-2 text-gray-900 focus:border-[#037092] focus:outline-none"
                placeholder="••••••••"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700">
                Membership Level
              </label>
              <select
                name="membership"
                value={formData.membership}
                onChange={handleChange}
                className="mt-2 w-full rounded-lg border border-slate-300 bg-white px-4 py-2 text-gray-900 focus:border-[#037092] focus:outline-none"
              >
                <option value="Bronze">Bronze</option>
                <option value="Silver">Silver</option>
                <option value="Gold">Gold</option>
                <option value="Platinum">Platinum</option>
              </select>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="mt-6 w-full rounded-lg bg-[#037092] px-4 py-2 font-semibold text-white hover:bg-blue-700 disabled:opacity-50"
            >
              {loading ? "Creating Account..." : "Create Account"}
            </button>
          </form>

          {/* Divider */}
          <div className="my-6 flex items-center gap-4">
            <div className="flex-1 border-t border-slate-300" />
            <span className="text-sm text-gray-500">Or sign up with</span>
            <div className="flex-1 border-t border-slate-300" />
          </div>

          {/* Google Button */}
          <button
            onClick={handleGoogleSignup}
            disabled={loading}
            className="flex w-full items-center justify-center gap-3 rounded-lg border border-slate-300 px-4 py-2 font-semibold text-gray-700 hover:bg-slate-50 disabled:opacity-50"
          >
            <FcGoogle size={24} />
            Sign up with Google
          </button>

          {/* Footer */}
          <p className="mt-6 text-center text-sm text-gray-600">
            Already have an account?{" "}
            <Link
              href="/login"
              className="font-semibold text-[#037092] hover:underline"
            >
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
