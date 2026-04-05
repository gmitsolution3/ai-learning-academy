"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { Headphones, Users, Filter, ArrowRight } from "lucide-react";

interface Section {
  id: string;
  title: string;
  icon: React.ElementType;
}

interface CourseNavigationProps {
  sections: Section[];
  activeSection: string;
  onSectionClick: (id: string) => void;
}

export default function CourseDetailNavigation({
  sections,
  activeSection,
  onSectionClick,
}: CourseNavigationProps) {
  return (
    <div className="lg:w-80 xl:w-96 flex-shrink-0">
      <div className="lg:sticky lg:top-24">
        <Card className="border-2 border-white/70 shadow-lg bg-[#03050A]">
          <CardHeader>
            <CardTitle className="text-xl font-bold bg-gradient-to-r from-secondary to-primary bg-clip-text text-transparent">
              কার্যক্রম পরিচিতি
            </CardTitle>
            <CardDescription className="text-white/70">
              বিষয় সূচী - ক্লিক করুন এবং সরাসরি ঐ অংশে যান
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-3 text-sm text-white/80">
              <Users className="h-4 w-4 text-secondary" />
              <span>৩০০+ শিক্ষার্থী নথিভুক্ত</span>
            </div>
            <div className="flex items-center gap-3 text-sm text-white/80">
              <Filter className="h-4 w-4 text-secondary" />
              <span>ফিল্টারযুক্ত কন্টেন্ট</span>
            </div>
            <div className="flex items-center gap-3 text-sm text-white/80">
              <Headphones className="h-4 w-4 text-secondary" />
              <span>২৪/৭ লাইভ সাপোর্ট</span>
            </div>

            <Separator className="my-4" />

            <nav className="space-y-2">
              {sections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => onSectionClick(section.id)}
                  className={`w-full text-left px-4 py-3 rounded-lg transition-all duration-200 flex items-center gap-2 ${
                    activeSection === section.id
                      ? "bg-gradient-to-r from-secondary/20 to-primary/20 border-l-4 border-secondary text-white font-medium"
                      : "text-white/70 hover:bg-white/5 hover:text-white"
                  }`}
                >
                  <section.icon size="18" />
                  {section.title}
                </button>
              ))}
            </nav>

            <Separator className="my-4" />

            {/* Enroll Now Button */}
            <Link
              href="/"
              className="bg-gradient-to-r from-secondary to-primary text-white px-3 sm:px-4 py-3 rounded-full text-[11px] sm:text-sm font-semibold flex items-center gap-1 sm:gap-2 hover:shadow-lg hover:shadow-secondary/25 transition-all w-full justify-center mt-5"
              aria-label={`purchase course course title`}
            >
              কোর্সটি কিনুন
              <ArrowRight className="size-3 sm:size-4" aria-hidden />
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
