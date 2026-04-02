"use client";

import dynamic from "next/dynamic";

const TestimonialCarousel = dynamic(
  () => import("./TestimonialCarousel"),
  {
    ssr: false,
    loading: () => (
      <div className="text-center py-10 text-gray-400">
        Loading testimonials...
      </div>
    ),
  },
);

export default function TestimonialClient() {
  return <TestimonialCarousel />;
}
