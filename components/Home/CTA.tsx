import React from "react";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function CTASection() {
  return (
    <section className="relative py-14 sm:py-16 md:py-20 overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-0">
        <div className="bg-gradient-to-br from-secondary/10 via-transparent to-primary/10 rounded-2xl border border-white/10 shadow-2xl p-8 md:p-12">
          <div className="text-center">
            <div className="space-y-3 sm:space-y-4 text-center mb-6 sm:mb-8">
              <h2 className="bg-gradient-to-r from-[#F9D49B] to-[#C994FF] bg-clip-text text-transparent text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black leading-tight lg:py-5">
                এখনি শুরু করুন আপনার শেখার যাত্রা
              </h2>

              <p className="max-w-xl mx-auto text-sm sm:text-base md:text-lg text-white leading-6 sm:leading-7">
                আজকের শেখা থেকেই শুরু হোক আপনার আধুনিক ক্যারিয়ার—লাইভ
                ক্লাস, প্রজেক্ট, আর মেন্টরশিপসহ এক প্ল্যাটফর্মে।
              </p>
            </div>

            {/* Button */}
            <div className="inline-block border-2 border-white/40 p-1 rounded-full">
              <Button
                asChild
                className="rounded-full bg-gradient-to-r from-secondary to-primary p-5 text-primary-foreground shadow-lg shadow-primary/25 hover:opacity-90 lg:inline-flex"
              >
                <Link href="/courses">
                  আমাদের সকল কোর্স দেখুন{" "}
                  <span>
                    <ArrowRight />
                  </span>
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
