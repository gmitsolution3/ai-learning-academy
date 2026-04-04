"use client";

import dynamic from "next/dynamic";

const TestimonialContent = dynamic(
  () => import("./TestimonialContent"),
  {
    ssr: false,
    loading: () => (
      <div className="text-center py-10 text-gray-400">
        Loading testimonials...
      </div>
    ),
  },
);

export default function TestimonialClient({
  displayType,
}: {
  displayType: string;
}) {
  return <TestimonialContent displayType={displayType} />;
}
