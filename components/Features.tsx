import React from "react";

const features = [
  {
    title: "Super Live Class",
    description:
      "ইউটিউবে ইতিমধ্যে ৪,০০০+ শিক্ষার্থী আমার সাথে ডিজাইন শেখার পথে যুক্ত হয়েছেন আপনিও হতে পারেন তাদের একজন",
    image: "/feature_one.png",
  },
  {
    title: "Super Live Class",
    description:
      "ইউটিউবে ইতিমধ্যে ৪,০০০+ শিক্ষার্থী আমার সাথে ডিজাইন শেখার পথে যুক্ত হয়েছেন আপনিও হতে পারেন তাদের একজন",
    image: "/feature_two.png",
  },
  {
    title: "Super Live Class",
    description:
      "ইউটিউবে ইতিমধ্যে ৪,০০০+ শিক্ষার্থী আমার সাথে ডিজাইন শেখার পথে যুক্ত হয়েছেন আপনিও হতে পারেন তাদের একজন",
    image: "/feature_three.png",
  },
];

export default function Features() {
  return (
    <section className="relative py-20 overflow-hidden">
      <div className="container mx-auto px-5 lg:px-0">
        {/* ── Giant outer card ── */}
        <div className="relative rounded-3xl border border-white/10 overflow-hidden p-8 lg:p-14 lg:pt-18">
          {/* Layered backgrounds */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#0e0e12] via-[#0a0a0f] to-[#0e0e12]" />

          {/* Content */}
          <div className="relative z-10">
            {/* Header */}
            <div className="space-y-4 text-center mb-8">
              <h1 className="bg-gradient-to-r from-[#F9D49B] to-[#C994FF] bg-clip-text text-transparent text-4xl font-black lg:text-5xl py-2 leading-17">
                আমরা ৪,০০০+ শিক্ষার্থীর পরিবার
              </h1>
              <p className="max-w-xl text-base leading-7 text-white sm:text-lg mx-auto">
                ইউটিউবে ইতিমধ্যে ৪,০০০+ শিক্ষার্থী আমার সাথে ডিজাইন
                শেখার পথে যুক্ত হয়েছেন আপনিও হতে পারেন তাদের একজন।
              </p>
            </div>

            {/* ── Three inner cards ── */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="group backdrop-blur-sm rounded-2xl transition-all duration-300 hover:-translate-y-1 w-[80%]"
                >
                  {/* Thumbnail */}
                  <div className="relative overflow-hidden rounded-2xl">
                    <img
                      src={feature.image}
                      alt={feature.title}
                      className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500 rounded-2xl"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                  </div>

                  {/* Text */}
                  <div className="p-5">
                    <h3 className="text-2xl font-bold mb-2">
                      <span className="bg-gradient-to-r from-[#F9D49B] to-[#C994FF] bg-clip-text text-transparent">Super </span>
                      <span className="text-white">Live Class</span>
                    </h3>
                    <p className="text-white text-sm leading-6">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
