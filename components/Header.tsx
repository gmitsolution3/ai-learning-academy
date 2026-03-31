import Link from "next/link";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { CircleUser } from "lucide-react";

const navItems = [
  "হোম",
  "সকল কোর্স",
  "লাইভ সেশন",
  "শিক্ষার্থীদের অভিজ্ঞতা",
  "ফ্রি রিসোর্স",
];

export default function Header() {
  return (
    <header className="max-w-7xl mx-auto fixed left-0 right-0 top-4 z-20">
      <div className="flex items-center justify-between rounded-full border border-white/10 bg-white/5 px-3 py-2 shadow-[0_12px_40px_rgba(0,0,0,0.35)] backdrop-blur-xl sm:px-5">
        <Link href="/" className="flex items-center gap-3">
          <Image
            src="/logo.png"
            alt="Logo"
            width={200}
            height={200}
            className="w-12"
          />
        </Link>

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

        <div className="flex items-center gap-2">
          <Button
            asChild
            className="rounded-full bg-gradient-to-r from-secondary to-primary p-5 text-primary-foreground shadow-lg shadow-primary/25 hover:opacity-90"
          >
            <Link href="#">
              {" "}
              <span>
                <CircleUser />
              </span>{" "}
              লগইন/সাইনআপ
            </Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
