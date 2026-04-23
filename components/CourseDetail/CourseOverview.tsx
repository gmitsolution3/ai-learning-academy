import {
  Access,
  Calander,
  Lesson,
  Level,
  Module,
  Projects,
  RecordHours,
} from "@/components/icons";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ICourseDetail } from "@/types";
import { formatDuration, formatPrice } from "@/utils";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

// Dynamic highlights based on batch data
const getHighlights = (courseData: ICourseDetail) => {
  const highlights = [];

  if (courseData.batch?.total_module) {
    highlights.push({
      icon: Module,
      label: `${courseData.batch.total_module}+ মডিউলস`,
    });
  }

  if (courseData.total_duration) {
    highlights.push({
      icon: RecordHours,
      label: `${formatDuration(courseData.total_duration)}`,
    });
  }

  // You can add more dynamic highlights here based on your data structure
  highlights.push({ icon: Lesson, label: "80+ লেসন" });
  highlights.push({ icon: Projects, label: "6+ প্রজেক্ট" });

  return highlights;
};

export default function CourseOverview({
  courseData,
}: {
  courseData: ICourseDetail;
}) {
  // Get batch enrollment info
  const onlineBatch = courseData?.batch?.enrolled_type?.find(
    (type) => type.type === "Online",
  );
  const offlineBatch = courseData?.batch?.enrolled_type?.find(
    (type) => type.type === "Offline",
  );

  const totalEnrolled =
    (onlineBatch?.enrolled || 0) + (offlineBatch?.enrolled || 0);
  const totalCapacity =
    (onlineBatch?.max_student || 0) +
    (offlineBatch?.max_student || 0);

  // Calculate available seats
  const availableSeats = totalCapacity - totalEnrolled;

  const highlights = getHighlights(courseData);

  const disablePurchase =
    availableSeats === 0 ||
    new Date(courseData?.batch?.batch_ending_date) < new Date() ||
    courseData?.batch?.batch_status !== "ongoing";

  return (
    <section
      aria-labelledby="course-overview-heading"
      className="relative"
    >
      <div className="relative z-10">
        <Card
          style={{
            backgroundImage: `url('${courseData.thumbnail}')`,
          }}
          className="w-full max-w-7xl mx-auto border-2 border-white/70 shadow-lg bg-[#03050A] p-5 pr-8 bg-opacity-90 bg-cover bg-center bg-no-repeat relative"
        >
          <div className="absolute inset-0 bg-black/60" />

          <div className="relative z-10">
            <div className="flex flex-col items-center lg:flex-row">
              {/* Left */}
              <div className="w-full md:flex-1 p-6 md:p-8">
                <CardHeader className="p-0 pb-4">
                  <p className="text-sm md:text-base">
                    আজকের শেখা থেকেই শুরু হোক আপনার
                  </p>

                  <CardTitle
                    id="course-overview-heading"
                    className="text-2xl sm:text-2xl md:text-4xl font-bold tracking-tight mt-3 bg-gradient-to-r from-secondary to-primary bg-clip-text text-transparent"
                  >
                    {courseData.title}
                  </CardTitle>

                  {/* Batch Name */}
                  {courseData?.batch?.batch_name && (
                    <div className="mt-2">
                      <Badge className="bg-secondary/20 text-secondary border-secondary/30 text-xs sm:text-sm">
                        {courseData.batch.batch_name}
                      </Badge>
                    </div>
                  )}

                  <CardDescription className="mt-3 text-sm sm:text-base text-white leading-relaxed">
                    {courseData.full_description}
                  </CardDescription>
                </CardHeader>
              </div>

              {/* Right */}
              <div className="w-full lg:max-w-xs p-6 md:p-8 bg-[#191B22] rounded-xl">
                {/* Batch Status */}
                {courseData?.batch?.batch_status && (
                  <div className="mb-4">
                    <Badge
                      className={`w-full justify-center text-xs sm:text-sm py-2 ${
                        courseData.batch.batch_status === "ongoing"
                          ? "bg-green-500/20 text-green-400 border-green-500/30"
                          : courseData.batch.batch_status ===
                              "upcoming"
                            ? "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
                            : "bg-red-500/20 text-red-400 border-red-500/30"
                      }`}
                    >
                      {courseData.batch.batch_status === "ongoing"
                        ? "চলমান"
                        : courseData.batch.batch_status === "upcoming"
                          ? "আসন্ন"
                          : "সমাপ্ত"}
                    </Badge>
                  </div>
                )}

                {/* Pricing */}
                <div className="space-y-2">
                  <div className="flex items-baseline gap-2 justify-between">
                    {courseData?.discount_price > 0 &&
                    courseData?.discount_price <
                      courseData?.regular_price ? (
                      <>
                        <div className="flex items-center gap-x-3">
                          <span className="text-2xl sm:text-3xl font-bold text-green-500">
                            {formatPrice(courseData.discount_price)}
                          </span>
                          <span className="text-base sm:text-lg text-gray-500 line-through">
                            {formatPrice(courseData.regular_price)}
                          </span>
                        </div>

                        <Badge className="text-[10px] sm:text-xs px-2 py-1 rounded-full border bg-white/10 text-secondary">
                          {Math.round(
                            ((courseData?.regular_price -
                              courseData?.discount_price) /
                              courseData?.regular_price) *
                              100,
                          )}
                          % ছাড়
                        </Badge>
                      </>
                    ) : (
                      <div className="flex items-center gap-x-3">
                        <span className="text-2xl sm:text-3xl font-bold">
                          {formatPrice(courseData.regular_price)}
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Available Seats Alert */}
                {availableSeats > 0 && availableSeats <= 10 && (
                  <div className="mt-3 p-2 bg-red-500/10 border border-red-500/30 rounded-lg">
                    <p className="text-red-400 text-xs text-center">
                      ⚠️ শুধুমাত্র {availableSeats} টি আসন বাকি!
                    </p>
                  </div>
                )}

                {/* CTA */}
                {disablePurchase ? (
                  <Button disabled aria-label="Purchase course"
                    className="bg-gradient-to-r from-secondary to-primary text-white px-3 sm:px-4 py-3 rounded-full text-[11px] sm:text-sm font-semibold flex items-center gap-1 sm:gap-2 hover:shadow-lg hover:shadow-secondary/25 transition-all w-full justify-center mt-5">
                      ক্রয় করা সম্ভব নয়
                    </Button>
                ) : (
                  <Link
                    href={`/purchase-course/${courseData._id}`}
                    aria-label="Purchase course"
                    className="bg-gradient-to-r from-secondary to-primary text-white px-3 sm:px-4 py-3 rounded-full text-[11px] sm:text-sm font-semibold flex items-center gap-1 sm:gap-2 hover:shadow-lg hover:shadow-secondary/25 transition-all w-full justify-center mt-5"
                  >
                    কোর্সটি কিনুন
                    <ArrowRight
                      className="size-3 sm:size-4"
                      aria-hidden
                    />
                  </Link>
                )}

                <Separator className="my-4" />

                {/* Highlights */}
                <div className="space-y-3">
                  <h3 className="text-base sm:text-lg font-medium">
                    কোর্স হাইলাইটস
                  </h3>

                  {highlights.map((item, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <item.icon aria-hidden />
                      <span className="font-medium text-xs sm:text-sm">
                        {item.label}
                      </span>
                    </div>
                  ))}

                  <div className="flex items-center gap-2">
                    <Level aria-hidden />
                    <Badge
                      variant="outline"
                      className="font-normal text-xs sm:text-sm capitalize"
                    >
                      {courseData.course_level}
                    </Badge>
                  </div>

                  {/* Language */}
                  {courseData.language && (
                    <div className="flex items-center gap-2">
                      <span className="text-xs sm:text-sm font-medium">
                        ভাষা:
                      </span>
                      <Badge
                        variant="outline"
                        className="font-normal text-xs sm:text-sm capitalize"
                      >
                        {courseData.language === "bangla"
                          ? "বাংলা"
                          : courseData.language === "english"
                            ? "ইংরেজি"
                            : courseData.language}
                      </Badge>
                    </div>
                  )}
                </div>

                <Separator className="my-4" />

                {/* Benefits */}
                <div className="space-y-2 text-sm">
                  <h3 className="text-base sm:text-lg font-medium mb-2">
                    কোর্স বেনিফিট
                  </h3>

                  <div className="flex items-center gap-2">
                    <Access aria-hidden />
                    <span className="text-xs sm:text-sm">
                      লাইফটাইম এক্সেস এবং ফ্রি আপডেট
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <Calander aria-hidden />
                    <span className="text-xs sm:text-sm">
                      সর্বশেষ আপডেট:{" "}
                      {new Date(
                        courseData.updated_at,
                      ).toLocaleDateString("bn-GB", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })}
                    </span>
                  </div>

                  {/* Certificate Info */}
                  <div className="flex items-center gap-2 mt-2">
                    <span className="text-xs sm:text-sm">🎓</span>
                    <span className="text-xs sm:text-sm">
                      সমাপনীতে সার্টিফিকেট প্রদান করা হবে
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
}
