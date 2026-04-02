import WorkSampleClient from "./WorkSampleClient";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const videos = [
  {
    id: 1,
    title: "ডিজাইন শেখার শুরু",
    thumbnail:
      "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=300&fit=crop",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    height: "h-64",
  },
  {
    id: 2,
    title: "গ্রাফিক ডিজাইন টিউটোরিয়াল",
    thumbnail:
      "https://images.unsplash.com/photo-1626785774573-4b799315345d?w=400&h=300&fit=crop",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    height: "h-80",
  },
  {
    id: 3,
    title: "ইলাস্ট্রেটর মাস্টারক্লাস",
    thumbnail:
      "https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?w=400&h=300&fit=crop",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    height: "h-72",
  },
  {
    id: 4,
    title: "ফটোশপ টিপস এন্ড ট্রিকস",
    thumbnail:
      "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=400&h=300&fit=crop",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    height: "h-96",
  },
];

export default function WorkSample() {
  return (
    <section
      className="relative py-14 sm:py-16 md:py-20 overflow-hidden"
      aria-labelledby="work-heading"
    >
      <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-0">
        {/* Header */}
        <div className="space-y-3 sm:space-y-4 text-center mb-6 sm:mb-8">
          <h2
            id="work-heading"
            className="bg-gradient-to-r from-[#F9D49B] to-[#C994FF] bg-clip-text text-transparent text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black"
          >
            বাংলায় আনিমেশন শিখতে ১০০ দিনে
          </h2>

          <p className="max-w-xl mx-auto text-sm sm:text-base md:text-lg text-white">
            প্রতিটি কোর্স সাজানো হয়েছে সহজভাবে, যাতে আপনি
            আত্মবিশ্বাসের সঙ্গে UI/UX ডিজাইন শিখতে পারেন।
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
          {/* Client Gallery */}
          <WorkSampleClient videos={videos} />

          {/* Right Content */}
          <div className="space-y-6 lg:space-y-8 lg:sticky lg:top-24">
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold bg-gradient-to-r from-secondary to-primary bg-clip-text text-transparent">
              বাংলা ভাষায় অ্যানিমেশন ও ক্রিয়েটিভ ক্লাস শিখতে ১০০ দিনের
              কোর্স
            </h3>

            <div className="space-y-3 text-white/70 text-sm sm:text-base">
              <p>
                বাংলা ভাষায় অ্যানিমেশন ও ক্রিয়েটিভ ক্লাস শিখতে ১০০
                দিনের কোর্সফিট এডি অ্যানিমেশন সফরে এগ্রাপ্তাস—একেবারে
                বেসিক থেকে অ্যাডভান্স অ্যানিমেশন শেখা, ক্যারিয়ার
                গাইডলাইনসহ সব একসাথে
              </p>
              <p>
                বাংলা ভাষায় অ্যানিমেশন ও ক্রিয়েটিভ ক্লাস শিখতে ১০০
                দিনের কোর্সফিট এডি অ্যানিমেশন সফরে এগ্রাপ্তাস—একেবারে
                বেসিক থেকে অ্যাডভান্স অ্যানিমেশন শেখা, ক্যারিয়ার
                গাইডলাইনসহ সব একসাথে
              </p>
              <p>
                বাংলা ভাষায় অ্যানিমেশন ও ক্রিয়েটিভ ক্লাস শিখতে ১০০
                দিনের কোর্সফিট এডি অ্যানিমেশন সফরে এগ্রাপ্তাস—একেবারে
                বেসিক থেকে অ্যাডভান্স অ্যানিমেশন শেখা, ক্যারিয়ার
                গাইডলাইনসহ সব একসাথে বাংলা ভাষায় অ্যানিমেশন ও
                ক্রিয়েটিভ ক্লাস শিখতে ১০০ দিনের কোর্সফিট এডি
                অ্যানিমেশন সফরে এগ্রাপ্তাস—একেবারে বেসিক থেকে
                অ্যাডভান্স অ্যানিমেশন শেখা, ক্যারিয়ার গাইডলাইনসহ সব
                একসাথে
              </p>
            </div>

            <Button className="bg-gradient-to-r from-secondary to-primary text-white py-6 px-8 rounded-full">
              আমাদের কিছু কাজ দেখুন
              <ArrowRight className="ml-1" aria-hidden />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
