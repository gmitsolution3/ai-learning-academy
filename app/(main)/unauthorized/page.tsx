import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  ShieldX,
  Home,
  Mail,
  AlertCircle,
  Lock,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function UnAuthorizedPage() {
  return (
    <section
      className="relative min-h-screen w-full overflow-hidden py-20"
      aria-label="Unauthorized access page"
    >
      {/* Background Image with same styling as banner */}
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

      {/* Content */}
      <div className="relative z-10 mx-auto flex min-h-screen w-full items-center justify-center px-4 sm:px-6 md:px-10 lg:px-14">
        <div className="max-w-3xl space-y-6 text-center">
          {/* Decorative top line - matching banner */}
          <div className="relative">
            <div
              aria-hidden
              className="absolute -top-8 left-1/2 h-[3px] w-32 -translate-x-1/2 bg-gradient-to-r from-transparent via-secondary to-transparent"
            />
          </div>

          {/* Animated Lock/Shield Icon */}
          <div className="flex justify-center">
            <div className="relative">
              <div className="absolute inset-0 animate-ping rounded-full bg-secondary/20 blur-xl" />
              <div className="relative flex h-32 w-32 items-center justify-center rounded-full bg-gradient-to-br from-secondary/20 to-primary/20 backdrop-blur-sm border border-white/10">
                <ShieldX className="h-16 w-16 text-secondary animate-pulse" />
              </div>
            </div>
          </div>

          {/* Status Badge - matching banner style */}
          <div className="flex justify-center">
            <div className="inline-flex rounded-full p-[1px] bg-gradient-to-r from-secondary to-primary">
              <div className="inline-flex items-center gap-2 rounded-full bg-black/80 px-4 py-2 text-sm text-white shadow-lg shadow-secondary/10 backdrop-blur">
                <Lock className="h-4 w-4 text-secondary" />
                <span className="font-medium">
                  403 - অননুমোদিত অ্যাক্সেস
                </span>
              </div>
            </div>
          </div>

          {/* Main Content - matching banner typography */}
          <div className="space-y-4">
            <h1 className="bg-gradient-to-r from-[#F9D49B] to-[#C994FF] bg-clip-text text-transparent text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black leading-tight">
              অ্যাক্সেস denied
            </h1>

            <p className="text-lg sm:text-xl text-white/80 max-w-2xl mx-auto">
              আপনার এই পৃষ্ঠাটি দেখার অনুমতি নেই।
            </p>

            <div className="h-1 w-20 bg-gradient-to-r from-secondary to-primary mx-auto rounded-full" />

            <p className="text-sm sm:text-base text-white/60 max-w-md mx-auto">
              অনুগ্রহ করে সঠিক অ্যাকাউন্ট দিয়ে লগইন করুন অথবা
              প্রয়োজনীয় অনুমতি নিন।
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
              <Link href="/login">
                লগইন পৃষ্ঠায় যান
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>

          {/* Help Section */}
          <div className="pt-8">
            <div className="inline-flex items-center gap-2 text-sm text-white/50">
              <AlertCircle className="h-4 w-4" />
              <span>প্রয়োজনীয় সহায়তা?</span>
              <Button
                variant="link"
                className="h-auto p-0 text-secondary hover:text-secondary/80"
                asChild
              >
                <Link href="/contact">
                  <Mail className="mr-1 h-3 w-3" />
                  সাপোর্ট টিমকে জানান
                </Link>
              </Button>
            </div>
          </div>

          {/* Decorative bottom line */}
          <div
            aria-hidden
            className="absolute bottom-8 left-0 h-[3px] w-1/2 bg-gradient-to-r from-secondary to-transparent"
          />
          <div
            aria-hidden
            className="absolute bottom-8 right-0 h-[3px] w-1/2 bg-gradient-to-l from-secondary to-transparent"
          />
        </div>
      </div>
    </section>
  );
}
