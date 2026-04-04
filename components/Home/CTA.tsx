import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import SectionHeading from "./../SectionHeading";

export default function CTASection() {
  return (
    <section
      className="relative py-14 sm:py-16 md:py-20 overflow-hidden"
      aria-labelledby="cta-heading"
    >
      <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-0">
        <div className="bg-gradient-to-br from-secondary/10 via-transparent to-primary/10 rounded-2xl border border-white/10 shadow-2xl p-8 md:p-12">
          <div className="text-center">
            <SectionHeading
              id={"cta-heading"}
              title={"এখনি শুরু করুন আপনার শেখার যাত্রা"}
              description={
                "আজকের শেখা থেকেই শুরু হোক আপনার আধুনিক ক্যারিয়ার—লাইভ ক্লাস, প্রজেক্ট, আর মেন্টরশিপসহ এক প্ল্যাটফর্মে।"
              }
            />

            {/* Button */}
            <div className="inline-block border-2 border-white/40 p-1 rounded-full">
              <Button
                asChild
                className="rounded-full bg-gradient-to-r from-secondary to-primary p-5 text-primary-foreground shadow-lg shadow-primary/25 hover:opacity-90 lg:inline-flex"
              >
                <Link href="/courses" aria-label="View all courses">
                  আমাদের সকল কোর্স দেখুন
                  <ArrowRight className="ml-1" aria-hidden />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
