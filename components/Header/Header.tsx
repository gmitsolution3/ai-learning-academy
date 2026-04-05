"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { CircleUser, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { usePathname } from "next/navigation";
import { INavItem } from "@/types";
import { renderNavItem } from "./renderNavItem";
import { navItems } from "./navItems";

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdowns, setOpenDropdowns] = useState<{
    [key: string]: boolean;
  }>({});
  const [mobileOpenDropdowns, setMobileOpenDropdowns] = useState<{
    [key: string]: boolean;
  }>({});

  const pathname = usePathname();

  const updateDropdown = (
    label: string,
    type: "toggle" | "open" | "close",
    isMobile = false,
  ) => {
    const setter = isMobile
      ? setMobileOpenDropdowns
      : setOpenDropdowns;

    setter((prev) => ({
      ...prev,
      [label]: type === "toggle" ? !prev[label] : type === "open",
    }));
  };

  const isDropdownActive = (item: INavItem): boolean =>
    item.items?.some((sub) => pathname === sub.href) ?? false;

  return (
    <header
      className="max-w-7xl mx-auto fixed left-0 right-0 top-4 z-20 px-5 lg:px-5"
      role="banner"
    >
      {/* Main bar */}
      <div className="flex items-center justify-between rounded-full border border-white/10 bg-white/5 px-3 py-2 shadow-[0_12px_40px_rgba(0,0,0,0.35)] backdrop-blur-xl sm:px-5">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3">
          <Image
            src="/logo.png"
            alt="Website logo"
            width={200}
            height={200}
            priority
            className="w-12"
          />
        </Link>

        {/* Desktop nav */}
        <nav
          className="hidden items-center gap-1 p-1 lg:flex"
          aria-label="Main navigation"
        >
          {navItems.map((item) => {
            const hasDropdown = Boolean(item.items);

            const isOpen = openDropdowns[item.label];
            const isActive = hasDropdown
              ? isDropdownActive(item)
              : item.href
                ? pathname === item.href
                : false;

            return renderNavItem({
              item,
              isMobile: false,
              pathname,
              isOpen,
              isActive,
              onToggle: () => updateDropdown(item.label, "toggle"),
              onOpen: () => updateDropdown(item.label, "open"),
              onClose: () => updateDropdown(item.label, "close"),
              closeMobileMenu: () => setMobileOpen(false),
              resetMobileDropdowns: () => setMobileOpenDropdowns({}),
            });
          })}
        </nav>

        {/* Right side */}
        <div className="flex items-center gap-2">
          {/* Desktop login */}
          <Button
            asChild
            className="hidden rounded-full bg-gradient-to-r from-secondary to-primary p-5 text-primary-foreground shadow-lg shadow-primary/25 hover:opacity-90 lg:inline-flex"
          >
            <Link href="/login" aria-label="Login or sign up">
              <CircleUser aria-hidden className="mr-1" />
              লগইন/সাইনআপ
            </Link>
          </Button>

          {/* Mobile toggle */}
          <button
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-label="Toggle menu"
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
            className="flex size-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white transition hover:bg-white/10 lg:hidden"
          >
            {mobileOpen ? (
              <X className="size-5" aria-hidden />
            ) : (
              <Menu className="size-5" aria-hidden />
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div
          id="mobile-menu"
          className="mx-2 mt-2 rounded-2xl border border-white/10 bg-black/60 p-3 shadow-[0_12px_40px_rgba(0,0,0,0.4)] backdrop-blur-xl lg:hidden"
        >
          <nav
            className="flex flex-col gap-1"
            aria-label="Mobile navigation"
          >
            {navItems.map((item) => {
              const hasDropdown = Boolean(item.items);

              const isOpen = mobileOpenDropdowns[item.label];
              const isActive = hasDropdown
                ? isDropdownActive(item)
                : item.href
                  ? pathname === item.href
                  : false;

              return renderNavItem({
                item,
                isMobile: true,
                pathname,
                isOpen,
                isActive,
                onToggle: () =>
                  updateDropdown(item.label, "toggle", true),
                onOpen: () =>
                  updateDropdown(item.label, "open", true),
                onClose: () =>
                  updateDropdown(item.label, "close", true),
                closeMobileMenu: () => setMobileOpen(false),
                resetMobileDropdowns: () =>
                  setMobileOpenDropdowns({}),
              });
            })}
          </nav>

          <div className="mt-3 border-t border-white/10 pt-3">
            <Button
              asChild
              className="w-full rounded-full bg-gradient-to-r from-secondary to-primary text-primary-foreground shadow-lg shadow-primary/25 hover:opacity-90"
            >
              <Link
                href="/login"
                onClick={() => setMobileOpen(false)}
                aria-label="Login or sign up"
              >
                <CircleUser aria-hidden className="mr-1" />
                লগইন/সাইনআপ
              </Link>
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}
