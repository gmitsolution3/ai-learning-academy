import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import {
  Module,
  Lesson,
  Level,
  Projects,
  RecordHours,
  Access,
  Calander,
} from "@/components/icons";

export default function CourseOverview() {
  return (
    <Card className="w-full max-w-7xl mx-auto border-2 border-white/70 shadow-lg bg-[#03050A] p-5 pr-8">
      <div className="flex flex-col items-center lg:flex-row">
        {/* Left Column - Course Info */}
        <div className="w-full md:flex-1 p-6 md:p-8">
          <CardHeader className="p-0 pb-4">
            <p className="text-sm md:text-base">আজকের শেখা থেকেই শুরু হোক আপনার</p>

            <CardTitle className="text-2xl sm:text-2xl md:text-3xl md:text-4xl font-bold tracking-tight mt-3 bg-gradient-to-r from-secondary to-primary bg-clip-text text-transparent">
              Zero to Hero UI/UX Design – Level 1
            </CardTitle>
            <CardDescription className="mt-3 text-sm sm:text-base text-white leading-relaxed">
              Lorem ipsum is simply dummy text of the printing and
              typesetting industry. Lorem Ipsum has been the
              industry's standard dummy text ever since the 1500s,
              when an unknown printer took a galley of type and
              scrambled it to make a type specimen book. It has
              survived not only five centuries, but also the leap into
              electronic typesetting, remaining essentially unchanged.
              It was popularised in the 1960s with the release of
              Letraset sheets containing Lorem Ipsum passages.
            </CardDescription>
          </CardHeader>
        </div>

        {/* Right Column - Pricing & Insights Card */}
        <div className="w-full lg:w-80 p-6 md:p-8 bg-[#191B22] rounded-xl">
          {/* Pricing Section */}
          <div className="space-y-2">
            <div className="flex items-baseline gap-2 justify-between">
              <div className="flex items-center gap-x-3">
                <span className="text-2xl sm:text-3xl font-bold">৳690</span>
                <span className="text-base sm:text-lg text-gray-500 line-through">
                  ৳6,000
                </span>
              </div>

              <Badge className="text-[10px] sm:text-xs px-2 py-1 rounded-full border bg-white/10 text-secondary">
                91% ছাড়
              </Badge>
            </div>
          </div>

          {/* Enroll Button */}
          <Link
            href="/"
            className="bg-gradient-to-r from-secondary to-primary text-white px-3 sm:px-4 py-3 rounded-full text-[11px] sm:text-sm font-semibold flex items-center gap-1 sm:gap-2 hover:shadow-lg hover:shadow-secondary/25 transition-all w-full justify-center mt-5"
            aria-label={`purchase course course title`}
          >
            কোর্সটি কিনুন
            <ArrowRight className="size-3 sm:size-4" aria-hidden />
          </Link>

          <Separator className="my-4" />

          {/* Course Insights */}
          <div className="space-y-3">
            <h3 className="text-base sm:text-lg font-medium">কোর্স হাইলাইটস</h3>

            <div className="flex items-center justify-start text-sm gap-2">
              <Module />
              <span className="font-medium text-sm sm:text-base">14+ মডিউলস</span>
            </div>

            <div className="flex items-center justify-start text-sm gap-2">
              <Lesson />
              <span className="font-medium text-sm sm:text-base">80+ লেসন</span>
            </div>

            <div className="flex items-center justify-start text-sm gap-2">
              <RecordHours />
              <span className="font-medium text-sm sm:text-base">25+ ঘন্টা</span>
            </div>

            <div className="flex items-center justify-start text-sm gap-2">
              <Projects />
              <span className="font-medium text-sm sm:text-base">6+ প্রজেক্ট</span>
            </div>

            <div className="flex items-center justify-start text-sm gap-2">
              <Level />
              <Badge variant="outline" className="font-normal text-xs sm:text-sm">
                Beginner to Hero
              </Badge>
            </div>
          </div>

          <Separator className="my-4" />

          {/* Lifetime Access & Updates */}
          <div className="space-y-2 text-sm">
            <h3 className="text-base sm:text-lg font-medium mb-2">কোর্স বেনিফিট</h3>
            <div className="flex items-center gap-2">
              <Access />
              <span className="text-xs sm:text-sm">লাইফটাইম এক্সেস এবং ফ্রি আপডেট</span>
            </div>
            <div className="flex items-center gap-2">
              <Calander />
              <span className="text-xs sm:text-sm">সর্বশেষ আপডেত: ডিসেম্বর 2024</span>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}