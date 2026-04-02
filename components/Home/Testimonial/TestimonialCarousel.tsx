"use client";

import { useState } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";

import TestimonialVideoModal from "@/components/modal/TestimonialVideoModal";

type Testimonial = {
  id: number;
  name: string;
  location: string;
  image: string;
  videoUrl: string;
  thumbnail: string;
};

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "সাবিহা লুবাৰা তাসফিয়া",
    location: "চট্টগ্রাম মোত্তিকান কলেজ হাসপাতাল",
    image:
      "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=500&h=600&fit=crop",
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
    thumbnail:
      "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=500&h=600&fit=crop",
  },
  {
    id: 123213,
    name: "সাবিহা লুবাৰা তাসফিয়া",
    location: "চট্টগ্রাম মোত্তিকান কলেজ হাসপাতাল",
    image:
      "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=500&h=600&fit=crop",
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
    thumbnail:
      "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=500&h=600&fit=crop",
  },
  {
    id: 214,
    name: "সাবিহা লুবাৰা তাসফিয়া",
    location: "চট্টগ্রাম মোত্তিকান কলেজ হাসপাতাল",
    image:
      "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=500&h=600&fit=crop",
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
    thumbnail:
      "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=500&h=600&fit=crop",
  },
  {
    id: 5674,
    name: "সাবিহা লুবাৰা তাসফিয়া",
    location: "চট্টগ্রাম মোত্তিকান কলেজ হাসপাতাল",
    image:
      "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=500&h=600&fit=crop",
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
    thumbnail:
      "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=500&h=600&fit=crop",
  },
  {
    id: 4254,
    name: "সাবিহা লুবাৰা তাসফিয়া",
    location: "চট্টগ্রাম মোত্তিকান কলেজ হাসপাতাল",
    image:
      "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=500&h=600&fit=crop",
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
    thumbnail:
      "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=500&h=600&fit=crop",
  },
  {
    id: 244,
    name: "মোঃ রাকিবুল হাসান",
    location: "ঢাকা মেডিকেল কলেজ হাসপাতাল",
    image:
      "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=500&h=600&fit=crop",
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
    thumbnail:
      "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=500&h=600&fit=crop",
  },
  {
    id: 3,
    name: "নাজমা আক্তার",
    location: "সিলেট এমএজি ওসমানী মেডিকেল কলেজ",
    image:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=500&h=600&fit=crop",
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
    thumbnail:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=500&h=600&fit=crop",
  },
  {
    id: 4,
    name: "আব্দুর রহমান",
    location: "রাজশাহী মেডিকেল কলেজ হাসপাতাল",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&h=600&fit=crop",
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
    thumbnail:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&h=600&fit=crop",
  },
  {
    id: 5,
    name: "ফাতেমা বেগম",
    location: "খুলনা মেডিকেল কলেজ হাসপাতাল",
    image:
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=500&h=600&fit=crop",
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
    thumbnail:
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=500&h=600&fit=crop",
  },
];

export default function TestimonialCarousel() {
  const [currentVideo, setCurrentVideo] = useState<string | null>(
    null,
  );

  const closeModal = () => setCurrentVideo(null);

  return (
    <div className="relative px-4 md:px-12">
      <Swiper
        modules={[Autoplay]}
        spaceBetween={20}
        slidesPerView={1}
        breakpoints={{
          640: { slidesPerView: 1 },
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 5 },
        }}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        loop
      >
        {testimonials.map((item) => (
          <SwiperSlide key={item.id}>
            <div className="bg-white/10 backdrop-blur-md rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden h-full flex flex-col border border-white/20">
              {/* Image */}
              <div className="relative group">
                <Image
                  src={item.image}
                  alt={item.name}
                  width={500}
                  height={600}
                  className="w-full h-72 object-cover group-hover:scale-105 transition-transform duration-500"
                />

                <div
                  aria-hidden
                  className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"
                />

                {/* Play Button */}
                <button
                  onClick={() => setCurrentVideo(item.videoUrl)}
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 
                  w-12 h-12 bg-white/95 hover:bg-white rounded-full 
                  flex items-center justify-center shadow-2xl 
                  transition-all duration-300 hover:scale-110"
                  aria-label={`Play video of ${item.name}`}
                >
                  <svg
                    className="w-8 h-8 text-primary ml-1"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </button>
              </div>

              {/* Text */}
              <div className="p-6 h-[120px]">
                <h3 className="text-xl font-bold text-white mb-2">
                  {item.name}
                </h3>
                <p className="text-sm text-gray-300">
                  {item.location}
                </p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Modal only when needed */}
      {currentVideo && (
        <TestimonialVideoModal
          isModalOpen={true}
          closeModal={closeModal}
          currentVideo={currentVideo}
        />
      )}
    </div>
  );
}
