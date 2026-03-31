"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { CircleUser, Menu, X } from "lucide-react";
import { useState } from "react";

const navItems = [
  "হোম",
  "সকল কোর্স",
  "লাইভ সেশন",
  "শিক্ষার্থীদের অভিজ্ঞতা",
  "ফ্রি রিসোর্স",
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="max-w-7xl mx-auto fixed left-0 right-0 top-4 z-20 px-5 lg:px-5">
      {/* Main bar */}
      <div className="flex items-center justify-between rounded-full border border-white/10 bg-white/5 px-3 py-2 shadow-[0_12px_40px_rgba(0,0,0,0.35)] backdrop-blur-xl sm:px-5">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3">
          <Image
            src="/logo.png"
            alt="Logo"
            width={200}
            height={200}
            className="w-12"
          />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-1 p-1 lg:flex">
          {navItems.map((item, index) => (
            <Link
              key={item}
              href="#"
              className={`rounded-full px-5 py-3 text-sm transition ${
                index === 0
                  ? "bg-white/10 text-white"
                  : "text-white/70 hover:bg-white/5 hover:text-white"
              }`}
            >
              {item}
            </Link>
          ))}
        </nav>

        {/* Right side */}
        <div className="flex items-center gap-2">
          {/* Desktop login button */}
          <Button
            asChild
            className="hidden rounded-full bg-gradient-to-r from-secondary to-primary p-5 text-primary-foreground shadow-lg shadow-primary/25 hover:opacity-90 lg:inline-flex"
          >
            <Link href="#">
              <span><CircleUser /></span>
              লগইন/সাইনআপ
            </Link>
          </Button>

          {/* Mobile hamburger */}
          <button
            className="flex size-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white transition hover:bg-white/10 lg:hidden"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      {/* Mobile dropdown */}
      {mobileOpen && (
        <div className="mx-2 mt-2 rounded-2xl border border-white/10 bg-black/60 p-3 shadow-[0_12px_40px_rgba(0,0,0,0.4)] backdrop-blur-xl lg:hidden">
          <nav className="flex flex-col gap-1">
            {navItems.map((item, index) => (
              <Link
                key={item}
                href="#"
                onClick={() => setMobileOpen(false)}
                className={`rounded-xl px-4 py-3 text-sm transition ${
                  index === 0
                    ? "bg-white/10 text-white"
                    : "text-white/70 hover:bg-white/5 hover:text-white"
                }`}
              >
                {item}
              </Link>
            ))}
          </nav>

          <div className="mt-3 border-t border-white/10 pt-3">
            <Button
              asChild
              className="w-full rounded-full bg-gradient-to-r from-secondary to-primary text-primary-foreground shadow-lg shadow-primary/25 hover:opacity-90"
            >
              <Link href="#" onClick={() => setMobileOpen(false)}>
                <span><CircleUser /></span>
                লগইন/সাইনআপ
              </Link>
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}