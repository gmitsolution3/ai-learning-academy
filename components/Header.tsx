import Link from "next/link";
import { Button } from "@/components/ui/button";

const navItems = [
  "হোম",
  "সকল কোর্স",
  "লাইভ সেশন",
  "শিক্ষার্থীদের অভিজ্ঞতা",
  "ফ্রি রিসোর্স",
];

export default function Header() {
  return (
    <header className="container mx-auto fixed left-0 right-0 top-4 z-20">
      <div className="flex items-center justify-between rounded-full border border-white/10 bg-black/40 px-3 py-3 shadow-[0_12px_40px_rgba(0,0,0,0.35)] backdrop-blur-xl sm:px-5">
        <Link href="/" className="flex items-center gap-3">
          <div className="flex size-10 items-center justify-center rounded-full bg-gradient-to-br from-secondary to-primary text-sm font-bold text-primary-foreground shadow-lg shadow-primary/30">
            AI
          </div>
          <div>
            <p className="text-sm font-semibold tracking-[0.2em] text-white">
              GMI
            </p>
            <p className="text-[10px] uppercase tracking-[0.35em] text-white/55">
              Solution
            </p>
          </div>
        </Link>

        <nav className="hidden items-center gap-1 rounded-full border border-white/10 bg-white/5 p-1 lg:flex">
          {navItems.map((item, index) => (
            <Link
              key={item}
              href="#"
              className={`rounded-full px-4 py-2 text-sm transition ${
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
            variant="ghost"
            className="hidden rounded-full px-4 text-white/75 hover:bg-white/10 hover:text-white md:inline-flex"
          >
            যোগাযোগ
          </Button>
          <Button
            asChild
            className="rounded-full bg-gradient-to-r from-secondary to-primary px-5 text-primary-foreground shadow-lg shadow-primary/25 hover:opacity-90"
          >
            <Link href="#">লগইন/সাইনআপ</Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
