import { INavItem } from "@/types";

export const navItems: INavItem[] = [
  { label: "হোম", key: "home", href: "/" },
  { label: "সকল কোর্স", key: "courses", href: "/courses" },
  {
    label: "শিক্ষার্থীদের অভিজ্ঞতা",
    key: "student-review",
    href: "/student-reviews",
  },
  { label: "আমাদের টিম", key: "our-team", href: "/our-team" },
  {
    label: "লাইভ সেশন",
    href: "/live-sessions",
    key: "live-session",
  },
  {
    label: "অন্যান্য",
    key: "others",
    items: [
      {
        label: "আমাদের সম্পর্কে",
        key: "about-us",
        href: "/about-us",
      },
    ],
  },
  // You can add dropdowns like this:
  // {
  //   label: "রিসোর্সেস",
  //   items: [
  //     { label: "ব্লগ", href: "/blog" },
  //     { label: "টিউটোরিয়াল", href: "/tutorials" },
  //     { label: "FAQ", href: "/faq" },
  //   ]
  // },
];
