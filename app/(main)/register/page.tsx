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

import { authClient } from "@/lib/auth-client";
import { notify } from "@/utils/notify";
import { useRouter } from "next/navigation";

// Define validation schema with Zod
const registerSchema = z
  .object({
    name: z
      .string()
      .min(1, "নাম প্রয়োজন")
      .min(2, "নাম কমপক্ষে ২ অক্ষরের হতে হবে")
      .max(50, "নাম সর্বোচ্চ ৫০ অক্ষরের হতে পারে"),
    email: z
      .string()
      .min(1, "ইমেইল প্রয়োজন")
      .email("সঠিক ইমেইল ফরম্যাট দিন (উদাহরণ: name@example.com)"),
    phone: z
      .string()
      .min(1, "মোবাইল নাম্বার প্রয়োজন")
      .min(8, "পাসওয়ার্ড কমপক্ষে ১১ অক্ষরের হতে হবে")
      .max(11, "পাসওয়ার্ড সর্বচ্চ ১১ অক্ষরের হতে হবে")
      .regex(
        /^(01)[3-9]\d{8}$/,
        "সঠিক মোবাইল নাম্বার দিন (উদাহরণ: 01XXXXXXXXX)",
      ),
    password: z
      .string()
      .min(1, "পাসওয়ার্ড প্রয়োজন")
      .min(8, "পাসওয়ার্ড কমপক্ষে ৮ অক্ষরের হতে হবে")
      .regex(
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@#$%^&*!.])[A-Za-z\d@#$%^&*!.]{8,}$/,
        "পাসওয়ার্ডে কমপক্ষে ১টি সংখ্যা ও ১টি বিশেষ অক্ষর (@#$%^&*.) থাকতে হবে",
      ),
    cpassword: z.string().min(1, "পাসওয়ার্ড নিশ্চিত করুন"),
  })
  .refine((data) => data.password === data.cpassword, {
    message: "পাসওয়ার্ড দুটি মিলছে না",
    path: ["cpassword"],
  });

type RegisterFormData = z.infer<typeof registerSchema>;

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showCPassword, setShowCPassword] = useState(false);

  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      password: "",
      cpassword: "",
    },
  });

  // Watch password field for real-time validation feedback
  const password = watch("password");

  const onSubmit = async (data: RegisterFormData) => {
    const { cpassword, ...submitData } = data;

    const res = await authClient.signUp.email(submitData);

    if (res.data) {
      notify.success("Registration successfull! Login to continue.");

      router.push("/login");
    } else {
      notify.error(res?.error?.message as string);
    }
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
                  নিবন্ধন করুন
                </h2>
                <p className="text-white/60 text-sm mt-2">
                  একটি নতুন একাউন্ট তৈরি করুন
                </p>
              </div>

              <form
                onSubmit={handleSubmit(onSubmit)}
                className="space-y-5"
              >
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
                    type="text"
                    placeholder="আপনার নাম লিখুন"
                    className={`bg-white/10 border-white/20 text-white placeholder:text-white/40 focus:border-[#C994FF] focus:ring-[#C994FF]/20 !p-5 ${
                      errors.name
                        ? "border-red-500 focus:border-red-500"
                        : ""
                    }`}
                    {...register("name")}
                    aria-invalid={errors.name ? "true" : "false"}
                  />
                  {errors.name && (
                    <p
                      className="text-red-400 text-xs mt-1"
                      role="alert"
                    >
                      {errors.name.message}
                    </p>
                  )}
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
                    type="tel"
                    placeholder="০১XXXXXXXXX"
                    className={`bg-white/10 border-white/20 text-white placeholder:text-white/40 focus:border-[#C994FF] focus:ring-[#C994FF]/20 !p-5 ${
                      errors.phone
                        ? "border-red-500 focus:border-red-500"
                        : ""
                    }`}
                    {...register("phone")}
                    aria-invalid={errors.phone ? "true" : "false"}
                  />
                  {errors.phone && (
                    <p
                      className="text-red-400 text-xs mt-1"
                      role="alert"
                    >
                      {errors.phone.message}
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
                    পাসওয়ার্ডে কমপক্ষে ৮ অক্ষর, ১টি সংখ্যা ও ১টি
                    বিশেষ অক্ষর (@#$%^&*.) ব্যবহার করুন
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
                      type={showCPassword ? "text" : "password"}
                      placeholder="আবার পাসওয়ার্ড দিন"
                      className={`bg-white/10 border-white/20 text-white placeholder:text-white/40 focus:border-[#C994FF] focus:ring-[#C994FF]/20 !p-5 pr-12 ${
                        errors.cpassword
                          ? "border-red-500 focus:border-red-500"
                          : ""
                      }`}
                      {...register("cpassword")}
                      aria-invalid={
                        errors.cpassword ? "true" : "false"
                      }
                    />
                    <button
                      type="button"
                      onClick={() => setShowCPassword(!showCPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-white/60 hover:text-white transition-colors"
                      aria-label={
                        showCPassword
                          ? "Hide password"
                          : "Show password"
                      }
                    >
                      {showCPassword ? (
                        <EyeOff size={20} />
                      ) : (
                        <Eye size={20} />
                      )}
                    </button>
                  </div>
                  {errors.cpassword && (
                    <p
                      className="text-red-400 text-xs mt-1"
                      role="alert"
                    >
                      {errors.cpassword.message}
                    </p>
                  )}

                  {/* Password strength indicator (optional) */}
                  {password &&
                    password.length > 0 &&
                    !errors.password && (
                      <p className="text-green-400 text-xs mt-1">
                        ✓ পাসওয়ার্ড শক্তিশালী
                      </p>
                    )}
                </div>

                {/* Register Button */}
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-secondary to-primary text-black font-semibold py-6 hover:opacity-90 transition-opacity rounded-full text-white border-2 border-white/70 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting
                    ? "নিবন্ধন হচ্ছে..."
                    : "নিবন্ধন করুন →"}
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
