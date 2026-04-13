import { ICourse } from "@/types";
import { formatDuration, formatPrice } from "@/utils";
import { CourseLevelBadge } from "@/utils/course.utils";
import { ArrowRight, Clock } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function CourseCard({ course }: { course: ICourse }) {
  const finalPrice =
    course?.discount_price > 0
      ? course?.discount_price
      : course?.regular_price;

  return (
    <article className="group relative backdrop-blur-sm rounded-lg border border-white/10 overflow-hidden hover:border-secondary/50 transition-all duration-300 sm:hover:-translate-y-2">
      {/* Image - Using placeholder since thumbnail is empty */}
      <div className="relative h-40 sm:h-44 md:h-48 overflow-hidden bg-gradient-to-br from-purple-600 to-blue-600">
        {course?.thumbnail ? (
          <Image
            src={course?.thumbnail}
            alt={course?.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
            className="object-cover group-hover:scale-110 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-white/50 text-sm">
            No image
          </div>
        )}

        <div className="absolute bottom-2 left-2 sm:bottom-3 sm:left-3 bg-black/70 px-2 sm:px-3 py-1 rounded-full text-[10px] sm:text-xs text-white border border-white/20">
          {course?.category?.name || "Uncategorized"}
        </div>
      </div>

      {/* Content */}
      <div className="p-4 sm:p-5">
        <h3 className="text-base sm:text-lg md:text-xl font-bold text-white mb-2 line-clamp-1 group-hover:text-secondary">
          {course?.title}
        </h3>

        <p className="text-white text-xs sm:text-sm mb-2 line-clamp-2">
          {course?.short_description ||
            course?.full_description?.substring(0, 100)}
        </p>

        {/* Stats */}
        <div className="flex items-center justify-between gap-5 mb-3 sm:mb-4">
          <CourseLevelBadge level={course.course_level} />

          <div className="text-[10px] sm:text-xs px-2 py-1 rounded-full border bg-white/10 w-full">
            <div className="flex items-center justify-center gap-1 text-white">
              <Clock className="size-3" aria-hidden />
              {formatDuration(course?.total_duration || 0)}
            </div>
          </div>

          <div className="text-[10px] sm:text-xs px-2 py-1 rounded-full border bg-white/10 w-full">
            <div className="flex items-center justify-center gap-1 text-white capitalize">
              {course?.language || "English"}
            </div>
          </div>
        </div>

        {/* Price */}
        <div className="pt-3 border-t border-white/10">
          {course?.discount_price > 0 &&
          course?.discount_price < course?.regular_price ? (
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-lg sm:text-xl md:text-2xl font-bold text-green-600">
                  {formatPrice(parseInt(finalPrice.toFixed(0)))}
                </span>
                <span className="text-xs sm:text-sm text-gray-500 line-through">
                  {formatPrice(course.regular_price)}
                </span>
              </div>

              <div className="text-[10px] sm:text-xs px-2 py-1 rounded-full border bg-white/10">
                <span className="text-secondary">
                  {Math.round(
                    ((course?.regular_price -
                      course?.discount_price) /
                      course?.regular_price) *
                      100,
                  )}
                  % ছাড়
                </span>
              </div>
            </div>
          ) : (
            <span className="text-lg sm:text-xl md:text-2xl font-bold text-white">
              {formatPrice(course.regular_price)}
            </span>
          )}
        </div>

        {/* CTA */}
        <Link
          href={`/courses/${course?._id}`}
          className="bg-gradient-to-r from-secondary to-primary text-white px-3 sm:px-4 py-3 rounded-full text-[11px] sm:text-sm font-semibold flex items-center gap-1 sm:gap-2 hover:shadow-lg hover:shadow-secondary/25 transition-all w-full justify-center mt-5"
          aria-label={`View details of ${course?.title}`}
        >
          বিস্তারিত দেখুন
          <ArrowRight className="size-3 sm:size-4" aria-hidden />
        </Link>
      </div>
    </article>
  );
}
