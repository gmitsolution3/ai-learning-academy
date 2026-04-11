import { Sparkles } from "lucide-react";
import CourseTabs from "./CourseTabs";

export default function Course() {
  return (
    <section
      className="relative py-14 sm:py-16 md:py-20"
      aria-labelledby="course-heading"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(227,185,138,0.14),transparent_28%)] -z-10" />

      <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-0">
        {/* Header */}
        <div className="text-center">
          <div className="inline-flex rounded-full p-[1px] bg-gradient-to-r from-secondary to-primary">
            <div className="inline-flex items-center gap-2 rounded-full bg-black px-3 sm:px-5 py-1.5 sm:py-2 text-xs sm:text-sm text-white backdrop-blur">
              <Sparkles
                className="size-4 text-secondary"
                aria-hidden
              />
              <span>আমাদের কোর্স সমুহ</span>
            </div>
          </div>

          <div className="space-y-3 sm:space-y-4 mt-4">
            <h2
              id="course-heading"
              className="bg-gradient-to-r from-[#F9D49B] to-[#C994FF] bg-clip-text text-transparent text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black leading-tight lg:py-5"
            >
              আপনার স্বপ্নের ডিজাইন ক্যারিয়ার <br /> এখন হাতের মুঠোয়
            </h2>

            <p className="max-w-xl mx-auto text-sm sm:text-base md:text-lg text-white leading-6 sm:leading-7">
              প্রতিটি কোর্স সাজানো হয়েছে সহজভাবে, যাতে আপনি
              আত্মবিশ্বাসের সঙ্গে UI/UX ডিজাইন শিখতে পারেন।
            </p>
          </div>
        </div>

        {/* Client Component */}
        <CourseTabs />
      </div>
    </section>
  );
}
