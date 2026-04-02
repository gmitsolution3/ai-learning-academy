"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import PreviewVideoModal from "../modal/PreviewVideoModal";
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
  const [selectedVideo, setSelectedVideo] = useState<
    (typeof videos)[0] | null
  >(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleVideoClick = (video: (typeof videos)[0]) => {
    setSelectedVideo(video);
    setIsModalOpen(true);
  };

  return (
    <section className="relative py-14 sm:py-16 md:py-20 overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-0">
        <div className="space-y-3 sm:space-y-4 text-center mb-6 sm:mb-8">
          <h2 className="bg-gradient-to-r from-[#F9D49B] to-[#C994FF] bg-clip-text text-transparent text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black leading-tight lg:py-5">
            বাংলায় আনিমেশন শিখতে ১০০ দিনে
          </h2>

          <p className="max-w-xl mx-auto text-sm sm:text-base md:text-lg text-white leading-6 sm:leading-7">
            প্রতিটি কোর্স সাজানো হয়েছে সহজভাবে, যাতে আপনি
            আত্মবিশ্বাসের সঙ্গে UI/UX ডিজাইন শিখতে পারেন।
          </p>
        </div>

        <div className="mt-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
            <div className="relative">
              <div className="columns-1 sm:columns-2 gap-4 space-y-4">
                {videos.map((video) => (
                  <div
                    key={video.id}
                    onClick={() => handleVideoClick(video)}
                    className="break-inside-avoid cursor-pointer group rounded-xl overflow-hidden bg-white/5 border border-white/10 hover:border-[#C994FF]/50 transition-all duration-300 hover:-translate-y-1 mb-4"
                  >
                    <div className={`relative ${video.height}`}>
                      <img
                        src={video.thumbnail}
                        alt={video.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="w-14 h-14 rounded-full bg-gradient-to-r from-[#F9D49B] to-[#C994FF] flex items-center justify-center">
                          <svg
                            className="w-7 h-7 text-black ml-0.5"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path d="M8 5v14l11-7z" />
                          </svg>
                        </div>
                      </div>
                    </div>
                    <div className="p-4">
                      <p className="text-white text-sm font-medium line-clamp-2">
                        {video.title}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-6 lg:space-y-8 lg:sticky lg:top-24">
              <div className="space-y-4">
                <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold leading-tight bg-gradient-to-r from-secondary to-primary bg-clip-text text-transparent">
                  বাংলা ভাষায় অ্যানিমেশন ও ক্রিয়েটিভ ক্লাস শিখতে ১০০
                  দিনের কোর্স
                </h3>

                <div className="space-y-3 text-white/70 text-sm sm:text-base leading-relaxed">
                  <p>
                    বাংলা ভাষায় অ্যানিমেশন ও ক্রিয়েটিভ ক্লাস শিখতে ১০০
                    দিনের কোর্সফিট এডি অ্যানিমেশন সফরে
                    এগ্রাপ্তাস—একেবারে বেসিক থেকে অ্যাডভান্স
                    অ্যানিমেশন শেখা, ক্যারিয়ার গাইডলাইনসহ সব একসাথে
                  </p>
                  <p>
                    বাংলা ভাষায় অ্যানিমেশন ও ক্রিয়েটিভ ক্লাস শিখতে ১০০
                    দিনের কোর্সফিট এডি অ্যানিমেশন সফরে
                    এগ্রাপ্তাস—একেবারে বেসিক থেকে অ্যাডভান্স
                    অ্যানিমেশন শেখা, ক্যারিয়ার গাইডলাইনসহ সব একসাথে
                  </p>
                  <p>
                    বাংলা ভাষায় অ্যানিমেশন ও ক্রিয়েটিভ ক্লাস শিখতে ১০০
                    দিনের কোর্সফিট এডি অ্যানিমেশন সফরে
                    এগ্রাপ্তাস—একেবারে বেসিক থেকে অ্যাডভান্স
                    অ্যানিমেশন শেখা, ক্যারিয়ার গাইডলাইনসহ সব একসাথে
                    বাংলা ভাষায় অ্যানিমেশন ও ক্রিয়েটিভ ক্লাস শিখতে ১০০
                    দিনের কোর্সফিট এডি অ্যানিমেশন সফরে
                    এগ্রাপ্তাস—একেবারে বেসিক থেকে অ্যাডভান্স
                    অ্যানিমেশন শেখা, ক্যারিয়ার গাইডলাইনসহ সব একসাথে
                  </p>
                </div>
              </div>

              <Button className="bg-gradient-to-r from-secondary to-primary text-white font-medium py-6 px-8 rounded-full hover:opacity-90 transition-opacity text-base sm:text-lg cursor-pointer">
                আমাদের কিছু কাজ দেখুন <ArrowRight />
              </Button>
            </div>
          </div>
        </div>
      </div>

      <PreviewVideoModal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        selectedVideo={selectedVideo}
      />
    </section>
  );
}
