"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff } from "lucide-react";
import Link from "next/link";

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showCPassword, setShowCPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    cpassword: "",
  });
  const [passwordError, setPasswordError] = useState("");

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear password match error when user types
    if (name === "password" || name === "cpassword") {
      setPasswordError("");
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Check if passwords match
    if (formData.password !== formData.cpassword) {
      setPasswordError("পাসওয়ার্ড দুটি মিলছে না");
      return;
    }

    // Check password strength
    const passwordRegex =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@#$%^&*!])[A-Za-z\d@#$%^&*!]{8,}$/;
    if (!passwordRegex.test(formData.password)) {
      setPasswordError(
        "পাসওয়ার্ডে কমপক্ষে ৮ অক্ষর, ১টি সংখ্যা ও ১টি বিশেষ অক্ষর থাকতে হবে",
      );
      return;
    }

    console.log("Registration form submitted:", formData);
    alert("নিবন্ধন সফল! এখন লগইন করুন।");
  };

  return (
    <section className="min-h-screen flex items-center justify-center relative py-40 overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-0">
        <div className="max-w-xl mx-auto">
          <div className="relative rounded-2xl sm:rounded-3xl border border-white/10 overflow-hidden p-5 sm:p-8 md:p-10">
            {/* Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#0e0e12]/90 via-[#0a0a0f]/90 to-[#0e0e12]/90" />

            <div className="relative z-10">
              {/* Header */}
              <div className="text-center mb-8">
                <h2 className="bg-gradient-to-r from-[#F9D49B] to-[#C994FF] bg-clip-text text-transparent text-2xl sm:text-3xl md:text-4xl font-black leading-tight">
                  নিবন্ধন করুন
                </h2>
                <p className="text-white/60 text-sm mt-2">
                  একটি নতুন একাউন্ট তৈরি করুন
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Name Field */}
                <div className="space-y-2">
                  <Label
                    htmlFor="name"
                    className="text-white/80 text-sm"
                  >
                    আপনার নাম{" "}
                    <span className="text-[#F9D49B]">*</span>
                  </Label>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    placeholder="আপনার নাম লিখুন"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="bg-white/10 border-white/20 text-white placeholder:text-white/40 focus:border-[#C994FF] focus:ring-[#C994FF]/20 !p-5"
                  />
                </div>

                {/* Email Field */}
                <div className="space-y-2">
                  <Label
                    htmlFor="email"
                    className="text-white/80 text-sm"
                  >
                    ইমেইল দিন{" "}
                    <span className="text-[#F9D49B]">*</span>
                  </Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="আপনার ইমেইল লিখুন"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="bg-white/10 border-white/20 text-white placeholder:text-white/40 focus:border-[#C994FF] focus:ring-[#C994FF]/20 !p-5"
                  />
                </div>

                {/* Phone Field */}
                <div className="space-y-2">
                  <Label
                    htmlFor="phone"
                    className="text-white/80 text-sm"
                  >
                    মোবাইল নাম্বার দিন{" "}
                    <span className="text-[#F9D49B]">*</span>
                  </Label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    placeholder="০১XXXXXXXXX"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                    className="bg-white/10 border-white/20 text-white placeholder:text-white/40 focus:border-[#C994FF] focus:ring-[#C994FF]/20 !p-5"
                  />
                </div>

                {/* Password Field */}
                <div className="space-y-2">
                  <Label
                    htmlFor="password"
                    className="text-white/80 text-sm"
                  >
                    পাসওয়ার্ড দিন{" "}
                    <span className="text-[#F9D49B]">*</span>
                  </Label>
                  <div className="relative">
                    <Input
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="আপনার পাসওয়ার্ড দিন"
                      value={formData.password}
                      onChange={handleInputChange}
                      required
                      className="bg-white/10 border-white/20 text-white placeholder:text-white/40 focus:border-[#C994FF] focus:ring-[#C994FF]/20 !p-5 pr-12"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-white/60 hover:text-white transition-colors"
                    >
                      {showPassword ? (
                        <EyeOff size={20} />
                      ) : (
                        <Eye size={20} />
                      )}
                    </button>
                  </div>
                  <p className="text-white/50 text-xs mt-1">
                    পাসওয়ার্ডে কমপক্ষে ৮ অক্ষর, ১টি সংখ্যা ও ১টি
                    বিশেষ অক্ষর (@#$%^&*) ব্যবহার করুন
                  </p>
                </div>

                {/* Confirm Password Field */}
                <div className="space-y-2">
                  <Label
                    htmlFor="cpassword"
                    className="text-white/80 text-sm"
                  >
                    পাসওয়ার্ড নিশ্চিত করুন{" "}
                    <span className="text-[#F9D49B]">*</span>
                  </Label>
                  <div className="relative">
                    <Input
                      id="cpassword"
                      name="cpassword"
                      type={showCPassword ? "text" : "password"}
                      placeholder="আবার পাসওয়ার্ড দিন"
                      value={formData.cpassword}
                      onChange={handleInputChange}
                      required
                      className="bg-white/10 border-white/20 text-white placeholder:text-white/40 focus:border-[#C994FF] focus:ring-[#C994FF]/20 !p-5 pr-12"
                    />
                    <button
                      type="button"
                      onClick={() => setShowCPassword(!showCPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-white/60 hover:text-white transition-colors"
                    >
                      {showCPassword ? (
                        <EyeOff size={20} />
                      ) : (
                        <Eye size={20} />
                      )}
                    </button>
                  </div>
                  {passwordError && (
                    <p className="text-red-400 text-xs mt-1">
                      {passwordError}
                    </p>
                  )}
                </div>

                {/* Register Button */}
                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-secondary to-primary text-black font-semibold py-6 hover:opacity-90 transition-opacity rounded-full text-white border-2 border-white/70 cursor-pointer"
                >
                  নিবন্ধন করুন →
                </Button>
              </form>

              {/* Divider */}
              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-white/10"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-transparent text-white/50">
                    অথবা
                  </span>
                </div>
              </div>

              {/* Login Link */}
              <div className="text-center mt-6">
                <p className="text-white/60 text-sm">
                  ইতিমধ্যে একটি একাউন্ট আছে?{" "}
                  <Link
                    href="/login"
                    className="text-[#C994FF] hover:underline transition-colors font-medium"
                  >
                    লগইন করুন
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
