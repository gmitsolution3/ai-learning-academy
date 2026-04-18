"use client";

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { USER } from "@/constants/role.constant";
import useLogout from "@/hooks/useLogout";
import { useSession } from "@/lib/auth-context";
import { INavItem } from "@/types";
import { getAvatarInitial } from "@/utils";
import { ROLE, ROLE_ROUTE } from "@/utils/roleRoute";
import {
  CircleUser,
  LayoutDashboard,
  LogOut,
  Menu,
  User,
  X,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { navItems } from "./navItems";
import { renderNavItem } from "./renderNavItem";

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdowns, setOpenDropdowns] = useState<{
    [key: string]: boolean;
  }>({});
  const [mobileOpenDropdowns, setMobileOpenDropdowns] = useState<{
    [key: string]: boolean;
  }>({});
  const [profileDropdownOpen, setProfileDropdownOpen] =
    useState(false);
  const profileDropdownRef = useRef<HTMLDivElement>(null);

  const pathname = usePathname();
  const { session } = useSession();
  const { handleLogout } = useLogout();
  const router = useRouter();

  // Close profile dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        profileDropdownRef.current &&
        !profileDropdownRef.current.contains(event.target as Node)
      ) {
        setProfileDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);

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

  const handleRedirect = () => {
    const user = session.user;
    router.push(ROLE_ROUTE[user.role as ROLE] || "/");
  };

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
          {/* Desktop auth section */}
          {session ? (
            <div
              className="relative hidden lg:block"
              ref={profileDropdownRef}
            >
              <button
                onClick={() =>
                  setProfileDropdownOpen(!profileDropdownOpen)
                }
                className="focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-full"
                aria-label="Profile menu"
              >
                <Avatar className="h-10 w-10 ring-2 ring-secondary/20">
                  <AvatarImage
                    src={session.user?.image || ""}
                    alt={session.user?.name || "User"}
                  />
                  <AvatarFallback className="bg-gradient-to-r from-secondary to-primary text-white">
                    {getAvatarInitial(session)}
                  </AvatarFallback>
                </Avatar>
              </button>

              {/* Profile Dropdown */}
              {profileDropdownOpen && (
                <div className="absolute right-0 mt-2 w-64 rounded-lg border border-white/10 bg-black/90 py-1 shadow-lg backdrop-blur-xl">
                  {/* User Info Section */}
                  <div className="border-b border-white/10 px-4 py-3">
                    <p className="text-sm font-medium text-white">
                      {session.user?.name || "User"}
                    </p>
                    <p className="text-xs text-white/60 mt-0.5">
                      {session.user?.email}
                    </p>
                  </div>

                  {/* Menu Items */}
                  <button
                    onClick={() => {
                      setProfileDropdownOpen(false);
                      handleRedirect();
                    }}
                    className="flex items-center gap-2 px-4 py-2 text-sm text-white transition-colors hover:bg-white/10 w-full"
                  >
                    <LayoutDashboard className="h-4 w-4" />
                    Dashboard
                  </button>
                  {session?.user?.role === USER && (
                    <button
                      onClick={() => {
                        setProfileDropdownOpen(false);
                        router.push("/dashboard/profile")
                      }}
                      className="flex items-center gap-2 px-4 py-2 text-sm text-white transition-colors hover:bg-white/10 w-full"
                    >
                      <User className="h-4 w-4" />
                      Profile
                    </button>
                  )}
                  <button
                    onClick={handleLogout}
                    className="flex w-full items-center gap-2 px-4 py-2 text-sm text-white transition-colors hover:bg-white/10"
                  >
                    <LogOut className="h-4 w-4" />
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Button
              asChild
              className="hidden rounded-full bg-gradient-to-r from-secondary to-primary p-5 text-primary-foreground shadow-lg shadow-primary/25 hover:opacity-90 lg:inline-flex"
            >
              <Link href="/login" aria-label="Login or sign up">
                <CircleUser aria-hidden className="mr-1" />
                লগইন/সাইনআপ
              </Link>
            </Button>
          )}

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
            {session ? (
              <div className="space-y-2">
                <div className="flex items-center gap-3 rounded-lg bg-white/5 p-3">
                  <Avatar className="h-10 w-10">
                    <AvatarImage
                      src={session.user?.image || ""}
                      alt={session.user?.name || "User"}
                    />
                    <AvatarFallback className="bg-gradient-to-r from-secondary to-primary text-white">
                      {getAvatarInitial(session)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-white">
                      {session.user?.name || "User"}
                    </p>
                    <p className="text-xs text-white/60">
                      {session.user?.email}
                    </p>
                  </div>
                </div>
                <Link
                  href="/dashboard"
                  onClick={() => setMobileOpen(false)}
                  className="flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-secondary to-primary px-4 py-2 text-sm font-medium text-white shadow-lg shadow-primary/25 transition hover:opacity-90"
                >
                  <LayoutDashboard className="h-4 w-4" />
                  Dashboard
                </Link>
                <button
                  onClick={handleLogout}
                  className="flex w-full items-center justify-center gap-2 rounded-full border border-white/20 bg-white/5 px-4 py-2 text-sm font-medium text-white transition hover:bg-white/10"
                >
                  <LogOut className="h-4 w-4" />
                  Logout
                </button>
              </div>
            ) : (
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
            )}
          </div>
        </div>
      )}
    </header>
  );
}
