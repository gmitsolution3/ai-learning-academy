import { INavItem } from "@/types";

export const navItems: INavItem[] = [
  { label: "হোম", href: "/" },
  { label: "সকল কোর্স", href: "/courses" },
  { label: "শিক্ষার্থীদের অভিজ্ঞতা", href: "/student-reviews" },
  { label: "আমাদের টিম", href: "/our-team" },
  {
    label: "লাইভ সেশন",
    href: "/live-sessions",
  },
  {
    label: "অন্যান্য",
    items: [
      {
        label: "আমাদের সম্পর্কে",
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
