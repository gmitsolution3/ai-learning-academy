"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff } from "lucide-react";
import Link from "next/link";

// Define validation schema with Zod
const loginSchema = z.object({
  email: z
    .string()
    .min(1, "ইমেইল প্রয়োজন")
    .email("সঠিক ইমেইল ফরম্যাট দিন (উদাহরণ: name@example.com)"),
  password: z
    .string()
    .min(1, "পাসওয়ার্ড প্রয়োজন")
    .min(8, "পাসওয়ার্ড কমপক্ষে ৮ অক্ষরের হতে হবে")
    .regex(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@#$%^&*])/,
      "পাসওয়ার্ডে কমপক্ষে ১টি সংখ্যা ও ১টি বিশেষ অক্ষর (@#$%^&*) থাকতে হবে",
    ),
});

type LoginFormData = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginFormData) => {
    // Simulate API call
    console.log("Login form submitted:", data);

    // You can add your actual login logic here
    // Example: await signIn('credentials', { ...data })

    alert("লগইন সফল! স্বাগতম।");
  };

  return (
    <section className="min-h-screen flex items-center justify-center relative py-30 overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-0">
        <div className="max-w-xl mx-auto">
          <div className="relative rounded-2xl sm:rounded-3xl border border-white/10 overflow-hidden p-5 sm:p-8 md:p-10">
            {/* Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#0e0e12]/90 via-[#0a0a0f]/90 to-[#0e0e12]/90" />

            <div className="relative z-10">
              {/* Header */}
              <div className="text-center mb-8">
                <h2 className="bg-gradient-to-r from-[#F9D49B] to-[#C994FF] bg-clip-text text-transparent text-2xl sm:text-3xl md:text-4xl font-black leading-tight">
                  লগইন করুন
                </h2>
                <p className="text-white/60 text-sm mt-2">
                  আপনার একাউন্টে লগইন করুন
                </p>
              </div>

              <form
                onSubmit={handleSubmit(onSubmit)}
                className="space-y-5"
              >
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
                    type="email"
                    placeholder="আপনার ইমেইল লিখুন"
                    className={`bg-white/10 border-white/20 text-white placeholder:text-white/40 focus:border-[#C994FF] focus:ring-[#C994FF]/20 !p-5 ${
                      errors.email
                        ? "border-red-500 focus:border-red-500"
                        : ""
                    }`}
                    {...register("email")}
                    aria-invalid={errors.email ? "true" : "false"}
                  />
                  {errors.email && (
                    <p
                      className="text-red-400 text-xs mt-1"
                      role="alert"
                    >
                      {errors.email.message}
                    </p>
                  )}
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
                      type={showPassword ? "text" : "password"}
                      placeholder="আপনার পাসওয়ার্ড দিন"
                      className={`bg-white/10 border-white/20 text-white placeholder:text-white/40 focus:border-[#C994FF] focus:ring-[#C994FF]/20 !p-5 pr-12 ${
                        errors.password
                          ? "border-red-500 focus:border-red-500"
                          : ""
                      }`}
                      {...register("password")}
                      aria-invalid={
                        errors.password ? "true" : "false"
                      }
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-white/60 hover:text-white transition-colors"
                      aria-label={
                        showPassword
                          ? "Hide password"
                          : "Show password"
                      }
                    >
                      {showPassword ? (
                        <EyeOff size={20} />
                      ) : (
                        <Eye size={20} />
                      )}
                    </button>
                  </div>
                  <p className="text-white/50 text-xs mt-1">
                    পাসওয়ার্ড ক্যাম্পের ৮ অক্ষর, ১টি সংখ্যা ও ১টি
                    বিশেষ অক্ষর (@#$%^&*) ব্যাবহার করুন
                  </p>
                  {errors.password && (
                    <p
                      className="text-red-400 text-xs mt-1"
                      role="alert"
                    >
                      {errors.password.message}
                    </p>
                  )}
                </div>

                {/* Login Button */}
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-secondary to-primary text-black font-semibold py-6 hover:opacity-90 transition-opacity rounded-full text-white border-2 border-white/70 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? "লগইন হচ্ছে..." : "লগইন করুন →"}
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

              {/* Google Login Button - Uncomment and use if needed */}
              {/* <Button
                onClick={() => {
                  console.log("Continue with Google");
                  alert("Google দিয়ে লগইন করুন");
                }}
                variant="outline"
                className="w-full bg-white/5 border-white/20 text-white hover:bg-white/10 hover:text-white transition-all duration-300 py-6 rounded-lg"
              >
                <Chrome className="w-5 h-5 mr-2" /> 
                Continue with Google
              </Button> */}

              {/* Registration Link */}
              <div className="text-center mt-6">
                <p className="text-white/60 text-sm">
                  একাউন্ট নেই?{" "}
                  <Link
                    href="/register"
                    className="text-[#C994FF] hover:underline transition-colors font-medium"
                  >
                    নতুন একাউন্ট তৈরি করুন
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
