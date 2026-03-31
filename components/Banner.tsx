import Link from "next/link";
import { ArrowRight, Play, Sparkles, Star } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";

const learners = [
  {
    initials: "MK",
    src: "https://randomuser.me/api/portraits/men/78.jpg",
  },
  {
    initials: "SA",
    src: "https://randomuser.me/api/portraits/men/78.jpg",
  },
  {
    initials: "AR",
    src: "https://randomuser.me/api/portraits/men/78.jpg",
  },
  {
    initials: "TN",
    src: "https://randomuser.me/api/portraits/men/78.jpg",
  },
  {
    initials: "FA",
    src: "https://randomuser.me/api/portraits/men/78.jpg",
  },
];

export default function Banner() {
  return (
    <section className="relative w-full overflow-hidden">
      {/* Background Image with bottom fade mask */}
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          backgroundImage: "url('/hero-background.png')",
          backgroundPosition: "top center",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          maskImage:
            "linear-gradient(to bottom, black 0%, black 60%, transparent 100%)",
          WebkitMaskImage:
            "linear-gradient(to bottom, black 0%, black 60%, transparent 100%)",
        }}
      />

      {/* Overlay gradients */}
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(5,1,15,0.94)_0%,rgba(5,1,15,0.82)_42%,rgba(5,1,15,0.58)_100%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(92,20,167,0.35),transparent_30%),radial-gradient(circle_at_bottom_right,rgba(227,185,138,0.14),transparent_26%)]" />

      {/* Content */}
      <div className="relative z-10 mx-auto flex min-h-[85vh] md:min-h-screen w-full container items-center px-4 sm:px-6 md:px-10 lg:px-14 py-30 md:py-20">
        <div className="max-w-5xl space-y-5 sm:space-y-6 relative p-4 sm:p-6 md:p-8">
          {/* Top border */}
          <div className="pointer-events-none absolute top-0 left-0 h-[3px] w-1/2 bg-gradient-to-r from-secondary to-transparent" />

          {/* Left border */}
          <div className="pointer-events-none absolute top-0 left-0 w-[3px] h-1/2 bg-gradient-to-b from-secondary to-transparent" />

          {/* Badge */}
          <div className="inline-flex rounded-full p-[1px] bg-gradient-to-r from-secondary to-primary">
            <div className="inline-flex items-center gap-2 rounded-full border border-transparent bg-black px-2 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm text-white shadow-lg shadow-secondary/10 backdrop-blur">
              <Sparkles className="size-4 text-secondary" />
              স্মার্ট স্কিল ডেভেলপমেন্ট প্ল্যাটফর্ম
            </div>
          </div>

          {/* Heading + Description */}
          <div className="space-y-4 max-w-2xl md:max-w-5xl">
            <h1 className="bg-gradient-to-r from-[#F9D49B] to-[#C994FF] bg-clip-text text-transparent text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black py-3 sm:py-5 leading-tight lg:leading-[1.2]">
              বাংলায় শিখুন ২১ শতকের <br /> ক্রিয়েটিভ স্কিল
            </h1>

            <p className="text-sm sm:text-base md:text-lg leading-6 sm:leading-7 text-white">
              আজকের শেখা থেকেই শুরু হোক আপনার আধুনিক ক্যারিয়ার—লাইভ
              ক্লাস, প্রজেক্ট, আর মেন্টরশিপসহ এক প্ল্যাটফর্মে।
            </p>
          </div>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row flex-wrap gap-3">
            <Button
              asChild
              size="lg"
              className="h-11 rounded-full bg-gradient-to-r from-secondary to-primary px-6 text-primary-foreground shadow-[0_12px_40px_rgba(92,20,167,0.35)] hover:opacity-90 border-white"
            >
              <Link href="#">
                কোর্সগুলো দেখুন <ArrowRight className="size-4 ml-1" />
              </Link>
            </Button>

            <Button
              asChild
              variant="outline"
              size="lg"
              className="h-11 rounded-full border-white/15 bg-black/25 px-6 text-white hover:bg-white/10 hover:text-white border-white"
            >
              <Link href="#">
                <Play className="size-4 mr-1" /> ফ্রি ক্লাস দেখুন
              </Link>
            </Button>
          </div>

          {/* Avatars + Stats */}
          <div className="flex flex-col gap-3 pt-2 sm:flex-row sm:items-center sm:gap-5">
            <div className="flex -space-x-2">
              {learners.map((learner) => (
                <Avatar
                  key={learner.initials}
                  className="size-8 sm:size-9 border-2 border-white/80"
                >
                  <AvatarImage
                    src={learner.src}
                    alt={learner.initials}
                  />
                  <AvatarFallback className="bg-gradient-to-br from-secondary to-primary text-xs font-semibold text-primary-foreground">
                    {learner.initials}
                  </AvatarFallback>
                </Avatar>
              ))}
            </div>

            <div className="text-xs sm:text-sm text-white/75 flex items-center flex-wrap">
              <span className="flex items-center me-2">
                {Array.from({ length: 5 }).map((_, i: number) => (
                  <Star className="size-4 sm:size-5 text-secondary" key={i} />
                ))}
              </span>
              <span className="font-semibold text-secondary">5.0</span>{" "}
              (21 Reviews) •{" "}
              <span className="font-semibold text-white">350+</span> Students
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}