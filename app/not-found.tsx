import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  Home,
  Search,
  Compass,
  AlertCircle,
} from "lucide-react";

import { Button } from "@/components/ui/button";

function HelpfulLink({
  href,
  label,
}: {
  href: string;
  label: string;
}) {
  return (
    <Link
      href={href}
      className="text-sm text-white/60 hover:text-secondary transition-colors duration-200 px-3 py-1 rounded-full border border-white/10 hover:border-secondary/30 bg-white/5 hover:bg-white/10"
    >
      {label}
    </Link>
  );
}

export default function NotFoundPage() {
  return (
    <section
      className="relative min-h-screen w-full overflow-hidden"
      aria-label="404 - Page not found"
    >
      {/* Background Image - same as banner */}
      <Image
        src="/hero-background.png"
        alt="Background image with abstract shapes and gradients"
        fill
        priority
        sizes="100vw"
        className="object-cover object-top"
        style={{
          maskImage:
            "linear-gradient(to bottom, black 0%, black 60%, transparent 100%)",
          WebkitMaskImage:
            "linear-gradient(to bottom, black 0%, black 60%, transparent 100%)",
        }}
      />

      {/* Overlays - matching banner exactly */}
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(5,1,15,0.94)_0%,rgba(5,1,15,0.82)_42%,rgba(5,1,15,0.58)_100%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(92,20,167,0.35),transparent_30%),radial-gradient(circle_at_bottom_right,rgba(227,185,138,0.14),transparent_26%)]" />

      {/* Floating decorative elements */}
      <div className="absolute top-20 left-10 animate-bounce opacity-20 duration-150">
        <Compass className="h-16 w-16 text-secondary" />
      </div>
      <div className="absolute top-20 right-10 animate-bounce opacity-20">
        <Search className="h-12 w-12 text-primary" />
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto flex min-h-screen w-full items-center justify-center px-4 sm:px-6 md:px-10 lg:px-14">
        <div className="max-w-4xl space-y-8 text-center">
          {/* Decorative top line - matching banner */}
          <div className="relative">
            <div
              aria-hidden
              className="absolute -top-8 left-1/2 h-[3px] w-32 -translate-x-1/2 bg-gradient-to-r from-transparent via-secondary to-transparent"
            />
          </div>

          {/* 404 Number with Animation */}
          <div className="space-y-2">
            <div className="flex justify-center">
              <div className="relative">
                <div className="absolute inset-0 animate-ping rounded-full bg-secondary/20 blur-2xl" />
                <div className="relative flex items-center justify-center">
                  <span className="text-[120px] sm:text-[160px] md:text-[200px] font-black bg-gradient-to-r from-[#F9D49B] via-secondary to-[#C994FF] bg-clip-text text-transparent animate-gradient">
                    404
                  </span>
                </div>
              </div>
            </div>

            {/* Decorative underline */}
            <div className="h-1 w-24 bg-gradient-to-r from-secondary to-primary mx-auto rounded-full" />
          </div>

          {/* Status Badge - matching banner style */}
          <div className="flex justify-center">
            <div className="inline-flex rounded-full p-[1px] bg-gradient-to-r from-secondary to-primary">
              <div className="inline-flex items-center gap-2 rounded-full bg-black/80 px-4 py-2 text-sm text-white shadow-lg shadow-secondary/10 backdrop-blur">
                <AlertCircle className="h-4 w-4 text-secondary" />
                <span className="font-medium">
                  পৃষ্ঠা পাওয়া যায়নি
                </span>
              </div>
            </div>
          </div>

          {/* Main Content - matching banner typography */}
          <div className="space-y-4">
            <h1 className="bg-gradient-to-r from-[#F9D49B] to-[#C994FF] bg-clip-text text-transparent text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black leading-tight">
              ওহ! আপনি হারিয়ে গেছেন?
            </h1>

            <p className="text-base sm:text-lg text-white/70 max-w-2xl mx-auto">
              আপনি যে পৃষ্ঠাটি খুঁজছেন সেটি সরানো হয়েছে, নাম পরিবর্তন
              করা হয়েছে অথবা সাময়িকভাবে অনুপলব্ধ।
            </p>
          </div>

          {/* Action Buttons - matching banner button styles */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Button
              asChild
              size="lg"
              className="h-12 rounded-full bg-gradient-to-r from-secondary to-primary px-8 text-primary-foreground shadow-[0_12px_40px_rgba(92,20,167,0.35)] hover:opacity-90 transition-all duration-300"
            >
              <Link href="/">
                <Home className="mr-2 h-4 w-4" />
                হোমপেজে ফিরে যান
              </Link>
            </Button>

            <Button
              asChild
              variant="outline"
              size="lg"
              className="h-12 rounded-full border-white/15 bg-black/25 px-8 text-white hover:bg-white/10 hover:text-white border-white transition-all duration-300"
            >
              <Link href="/courses">
                কোর্স ব্রাউজ করুন
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>

          {/* Helpful Links Section */}
          <div className="pt-8">
            <p className="text-sm text-white/50 mb-4">
              আপনি হয়তো খুঁজছেন:
            </p>
            <div className="flex flex-wrap gap-3 justify-center">
              <HelpfulLink href="/courses" label="সকল কোর্স" />
              <HelpfulLink href="/about" label="আমাদের সম্পর্কে" />
              <HelpfulLink href="/blog" label="ব্লগ" />
              <HelpfulLink href="/support" label="সাপোর্ট" />
              <HelpfulLink href="/contact" label="যোগাযোগ" />
            </div>
          </div>

          {/* Decorative bottom lines - matching banner */}
          <div
            aria-hidden
            className="absolute bottom-8 left-0 h-[3px] w-1/3 bg-gradient-to-r from-secondary to-transparent"
          />
          <div
            aria-hidden
            className="absolute bottom-8 right-0 h-[3px] w-1/3 bg-gradient-to-l from-secondary to-transparent"
          />
        </div>
      </div>
    </section>
  );
}
