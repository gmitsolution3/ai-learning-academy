"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import { useState } from "react";
import "swiper/css";

import TestimonialVideoModal from "../modal/TestimonialVideoModal";

const testimonials = [
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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentVideo, setCurrentVideo] = useState(null);

  const openVideoModal = (videoUrl: any) => {
    setCurrentVideo(videoUrl);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentVideo(null);
  };

  return (
    <div>
      <div className="relative px-4 md:px-12">
        <Swiper
          modules={[Autoplay]}
          spaceBetween={20}
          slidesPerView={1}
          breakpoints={{
            640: {
              slidesPerView: 1,
              spaceBetween: 20,
            },
            768: {
              slidesPerView: 2,
              spaceBetween: 24,
            },
            1024: {
              slidesPerView: 5,
              spaceBetween: 30,
            },
          }}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          navigation={true}
          loop={true}
          className="testimonial-swiper"
        >
          {testimonials.map((item) => (
            <SwiperSlide>
              <div className="bg-white/10 backdrop-blur-md rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden h-full flex flex-col border border-white/20">
                {/* Top Section - Image with Video Button */}
                <div className="relative group">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-72 object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent group-hover:scale-105 duration-500"></div>

                  {/* Video Play Button */}
                  <button
                    onClick={() =>
                      openVideoModal(item.videoUrl)
                    }
                    className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 
                            w-12 h-12 bg-white/95 hover:bg-white rounded-full 
                            flex items-center justify-center shadow-2xl 
                            transition-all duration-300 hover:scale-110 group/btn"
                    aria-label="Play video"
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

                {/* Bottom Section - Name and Location */}
                <div className="p-6 h-[120px]">
                  <h3 className="text-xl font-bold text-white mb-2">
                    {item.name}
                  </h3>
                  <div className="flex text-sm items-center gap-2 text-gray-300">
                    <p>{item.location}</p>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <TestimonialVideoModal
        isModalOpen={isModalOpen}
        closeModal={closeModal}
        currentVideo={currentVideo}
      />
    </div>
  );
}
