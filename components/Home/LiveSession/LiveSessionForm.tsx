"use client";

import { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

// Schema (unchanged)
const formSchema = z.object({
  name: z
    .string()
    .min(2, "নাম ২ অক্ষরের হতে হবে")
    .max(50, "নাম ৫০ অক্ষরের বেশি হতে পারবে না"),
  email: z
    .string()
    .email("বৈধ ইমেইল ঠিকানা প্রদান করুন"),
  phone: z
    .string()
    .min(11, "ফোন নম্বর ১১ ডিজিটের হতে হবে")
    .max(11, "ফোন নম্বর 11 ডিজিটের বেশি হতে পারবে না")
    .regex(/^[0-9+-\s]+$/, "শুধুমাত্র সংখ্যা ব্যবহার করুন"),
  detail: z
    .string()
    .min(50, "বিস্তারিত কমপক্ষে ৫০ অক্ষরের হতে হবে")
    .max(1000, "বিস্তারিত ১০০০ অক্ষরের বেশি হতে পারবে না"),
});

export type FormData = z.infer<typeof formSchema>;

export default function LiveSessionForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      detail: "",
    },
  });

  const onSubmit = useCallback(async (data: FormData) => {
    setIsSubmitting(true);
    try {
      console.log("Form submitted:", data);

      alert(
        "ফর্ম জমা দেওয়ার জন্য ধন্যবাদ! আমরা শীঘ্রই যোগাযোগ করবো।"
      );

      reset();
    } catch (error) {
      console.error("Form submission error:", error);
      alert("দুঃখিত, ফর্ম জমা দিতে সমস্যা হয়েছে। আবার চেষ্টা করুন।");
    } finally {
      setIsSubmitting(false);
    }
  }, [reset]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      
      {/* Name */}
      <div className="space-y-2">
        <Label htmlFor="name" className="text-white/80 text-sm">
          আপনার নাম <span className="text-[#F9D49B]">*</span>
        </Label>

        <Input
          id="name"
          type="text"
          autoComplete="name"
          aria-invalid={!!errors.name}
          aria-describedby="name-error"
          placeholder="আপনার নাম লিখুন"
          className={`bg-white/10 border-white/20 text-white placeholder:text-white/40 focus:border-[#C994FF] focus:ring-[#C994FF]/20 !p-5 ${
            errors.name ? "border-red-500 focus:border-red-500" : ""
          }`}
          {...register("name")}
        />

        {errors.name && (
          <p id="name-error" className="text-red-400 text-xs mt-1">
            {errors.name.message}
          </p>
        )}
      </div>

      {/* Email */}
      <div className="space-y-2">
        <Label htmlFor="email" className="text-white/80 text-sm">
          ইমেইল ঠিকানা <span className="text-[#F9D49B]">*</span>
        </Label>

        <Input
          id="email"
          type="email"
          autoComplete="email"
          aria-invalid={!!errors.email}
          aria-describedby="email-error"
          placeholder="you@example.com"
          className={`bg-white/10 border-white/20 text-white placeholder:text-white/40 focus:border-[#C994FF] focus:ring-[#C994FF]/20 !p-5 ${
            errors.email ? "border-red-500 focus:border-red-500" : ""
          }`}
          {...register("email")}
        />

        {errors.email && (
          <p id="email-error" className="text-red-400 text-xs mt-1">
            {errors.email.message}
          </p>
        )}
      </div>

      {/* Phone */}
      <div className="space-y-2">
        <Label htmlFor="phone" className="text-white/80 text-sm">
          ফোন নম্বর <span className="text-[#F9D49B]">*</span>
        </Label>

        <Input
          id="phone"
          type="tel"
          autoComplete="tel"
          aria-invalid={!!errors.phone}
          aria-describedby="phone-error"
          placeholder="০১XXXXXXXXX"
          className={`bg-white/10 border-white/20 text-white placeholder:text-white/40 focus:border-[#C994FF] focus:ring-[#C994FF]/20 !p-5 ${
            errors.phone ? "border-red-500 focus:border-red-500" : ""
          }`}
          {...register("phone")}
        />

        {errors.phone && (
          <p id="phone-error" className="text-red-400 text-xs mt-1">
            {errors.phone.message}
          </p>
        )}
      </div>

      {/* Detail */}
      <div className="space-y-2">
        <Label htmlFor="detail" className="text-white/80 text-sm">
          বিস্তারিত
        </Label>

        <Textarea
          id="detail"
          rows={8}
          aria-invalid={!!errors.detail}
          aria-describedby="detail-error"
          placeholder="আপনার প্রশ্ন বা মন্তব্য লিখুন..."
          className="bg-white/10 border-white/20 text-white placeholder:text-white/40 focus:border-[#C994FF] focus:ring-[#C994FF]/20 resize-none !p-5 h-[100px]"
          {...register("detail")}
        />

        {errors.detail && (
          <p id="detail-error" className="text-red-400 text-xs mt-1">
            {errors.detail.message}
          </p>
        )}
      </div>

      {/* Submit */}
      <Button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-gradient-to-r from-secondary to-primary text-white font-semibold py-3 hover:opacity-90 transition-opacity rounded-lg p-6 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isSubmitting ? "জমা হচ্ছে..." : "সাবমিট করুন →"}
      </Button>
    </form>
  );
}