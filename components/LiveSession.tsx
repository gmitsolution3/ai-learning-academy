"use client";

import React, { useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import LiveSessionPreview from "./LiveSessionPreview";
import LiveSessionForm from "./LiveSessionForm";
import LiveSessionPreviewModal from "./modal/LiveSessionPreviewModal";

const videos = [
  {
    id: 1,
    title: "ডিজাইন শেখার শুরু",
    thumbnail:
      "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=300&fit=crop",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
  },
  {
    id: 2,
    title: "গ্রাফিক ডিজাইন টিউটোরিয়াল",
    thumbnail:
      "https://images.unsplash.com/photo-1626785774573-4b799315345d?w=400&h=300&fit=crop",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
  },
  {
    id: 3,
    title: "ইলাস্ট্রেটর মাস্টারক্লাস",
    thumbnail:
      "https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?w=400&h=300&fit=crop",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
  },
  {
    id: 4,
    title: "ফটোশপ টিপস এন্ড ট্রিকস",
    thumbnail:
      "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=400&h=300&fit=crop",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
  },
];

export default function LiveSession() {
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
            ফ্রি লাইভ সেশান
          </h2>

          <p className="max-w-xl mx-auto text-sm sm:text-base md:text-lg text-white leading-6 sm:leading-7">
            আমাদের যেকোনো কোর্স বা অনলাইনে ক্যারিয়ার গড়া সম্পর্কে
            পরামর্শ পেতে Google Meet-এ ফ্রি লাইভ সেশন করতে পারেন ফ্রি
            সেশন নিতে নিচের ফর্মটি পূরণ করুন।
          </p>
        </div>

        <div className="relative rounded-2xl sm:rounded-3xl border border-white/10 overflow-hidden p-5 sm:p-8 md:p-10 lg:p-14">
          {/* Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#0e0e12]/90 via-[#0a0a0f]/90 to-[#0e0e12]/90" />

          <div className="relative z-10">
            {/* Two Column Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
              {/* Left Section - Video Grid */}
              <div className="space-y-4">
                <h3 className="text-white text-xl sm:text-2xl font-semibold mb-4">
                  ভিডিও টিউটোরিয়াল
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {videos.map((video) => (
                    <LiveSessionPreview
                      key={video.id}
                      video={video}
                      handleVideoClick={handleVideoClick}
                    />
                  ))}
                </div>
              </div>

              {/* Right Section - Form */}
              <div className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 p-6 sm:p-8">
                <h3 className="text-white text-xl sm:text-2xl font-semibold mb-6">
                  যোগাযোগ করুন
                </h3>

                <div>
                  <LiveSessionForm />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <LiveSessionPreviewModal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        selectedVideo={selectedVideo}
      />
    </section>
  );
}
