import React from "react";
import GlobalBanner from "@/components/GlobalBanner";

export default function page() {
  return (
    <>
      <GlobalBanner>
        <div className="space-y-3 sm:space-y-4 text-center mb-6 sm:mb-8">
          <h2
            id="testimonial-heading"
            className="bg-gradient-to-r from-[#F9D49B] to-[#C994FF] bg-clip-text text-transparent text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black leading-tight lg:py-5"
          >
            শিক্ষার্থীদের মতামত ও অভিজ্ঞতা
          </h2>

          <p className="max-w-xl mx-auto text-sm sm:text-base md:text-lg text-white leading-6 sm:leading-7">
            প্রতিটি কোর্স সাজানো হয়েছে সহজভাবে, যাতে আপনি
            আত্মবিশ্বাসের সঙ্গে UI/UX ডিজাইন শিখতে পারেন।
          </p>
        </div>
      </GlobalBanner>
    </>
  );
}
