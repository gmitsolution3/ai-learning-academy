import ConsultationForm from "@/components/Home/OnlineConsultation/ConsultationForm";
import { Button } from "@/components/ui/button";
import { headers } from "next/headers";
import Link from "next/link";
import ConsultationClient from "./ConsultationClient";

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

export default async function OnlineConsultation() {
  const headerList = await headers();

  const pathname = headerList.get("x-current-path");

  const isConsultationPage = pathname === "/online-consultation";

  return (
    <section
      className="relative py-14 sm:py-16 md:py-20 overflow-hidden"
      aria-labelledby="online-consultation"
    >
      <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-0">
        <div className="relative rounded-2xl sm:rounded-3xl border border-white/10 overflow-hidden p-5 sm:p-8 md:p-10 lg:p-14">
          <div
            aria-hidden
            className="absolute inset-0 bg-gradient-to-br from-[#0e0e12]/90 via-[#0a0a0f]/90 to-[#0e0e12]/90"
          />

          <div className="relative z-10">
            {isConsultationPage ? (
              /* Only Form - Centered with max-w-4xl */
              <div className="flex justify-center items-center">
                <div className="w-full max-w-4xl mx-auto">
                  <div className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 p-6 sm:p-8">
                    <h3 className="text-white text-xl sm:text-2xl font-semibold mb-6 text-center sm:text-left">
                      সেশন বুক করুন
                    </h3>
                    <ConsultationForm />
                  </div>
                </div>
              </div>
            ) : (
              /* Grid Layout with Videos and Form */
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
                <ConsultationClient videos={videos} />

                {/* Navigation area */}
                <div className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 p-6 sm:p-8 w-full flex items-start justify-center w-full">
                  <div className="space-y-6 lg:space-y-8 w-full">
                    <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold bg-gradient-to-r from-secondary to-primary bg-clip-text text-transparent py-5">
                      অনলাইন সেশন
                    </h3>

                    <div className="space-y-3 text-white/80 text-base sm:text-lg md:text-xl">
                      <p className="leading-relaxed">
                        অনলাইন সেশন বা কন্সাল্টেন্সি নিন{" "}
                        <span className="text-[#F9D49B] font-semibold">
                          ফ্রি তে
                        </span>
                      </p>
                      <p className="text-sm sm:text-base text-white/60">
                        এক্সপার্ট দের সাথে সরাসরি আলোচনা করুন, আপনার
                        ক্যারিয়ারকে দিন নতুন দিকে
                      </p>
                    </div>

                    <Button
                      asChild
                      className="bg-gradient-to-r from-secondary to-primary text-white py-6 px-8 rounded-full hover:scale-105 transition-transform duration-300 w-full"
                    >
                      <Link href="/online-consultation">বুক করুন</Link>
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
