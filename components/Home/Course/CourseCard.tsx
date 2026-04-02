import Image from "next/image";
import Link from "next/link";
import { Users, Star, ArrowRight } from "lucide-react";

type Course = {
  title: string;
  slug: string;
  overview: string;
  description: string;
  category: string;
  difficultyLevel: "Beginner" | "Intermediate" | "Advanced";
  totalEnrolled: number;
  rating: number;
  price: number;
  discountPercent: number;
  image: string;
};

const difficultyColors: Record<Course["difficultyLevel"], string> = {
  Beginner: "bg-green-500/20 text-green-400 border-green-500/30",
  Intermediate:
    "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
  Advanced: "bg-red-500/20 text-red-400 border-red-500/30",
};

// move outside (no recreation)
function getDiscountedPrice(price: number, discount: number) {
  return price - (price * discount) / 100;
}

export default function CourseCard({ course }: { course: Course }) {
  const finalPrice =
    course.discountPercent > 0
      ? getDiscountedPrice(course.price, course.discountPercent)
      : course.price;

  return (
    <article className="group relative backdrop-blur-sm rounded-lg border border-white/10 overflow-hidden hover:border-secondary/50 transition-all duration-300 sm:hover:-translate-y-2">
      
      {/* Image */}
      <div className="relative h-40 sm:h-44 md:h-48 overflow-hidden">
        <Image
          src={course.image}
          alt={course.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
          className="object-cover group-hover:scale-110 transition-transform duration-500"
        />

        <div className="absolute bottom-2 left-2 sm:bottom-3 sm:left-3 bg-black/70 px-2 sm:px-3 py-1 rounded-full text-[10px] sm:text-xs text-white border border-white/20">
          {course.category}
        </div>
      </div>

      {/* Content */}
      <div className="p-4 sm:p-5">
        
        <h3 className="text-base sm:text-lg md:text-xl font-bold text-white mb-2 line-clamp-1 group-hover:text-secondary">
          {course.title}
        </h3>

        <p className="text-white text-xs sm:text-sm mb-2 line-clamp-2">
          {course.overview}
        </p>

        {/* Stats */}
        <div className="flex items-center justify-between gap-5 mb-3 sm:mb-4">
          
          <div
            className={`text-[10px] sm:text-xs px-2 py-1 rounded-full border w-full text-center ${
              difficultyColors[course.difficultyLevel]
            }`}
          >
            {course.difficultyLevel}
          </div>

          <div className="text-[10px] sm:text-xs px-2 py-1 rounded-full border bg-white/10 w-full">
            <div className="flex items-center justify-center gap-1 text-yellow-400">
              <Star className="size-3 fill-yellow-400" aria-hidden />
              {course.rating}
            </div>
          </div>

          <div className="text-[10px] sm:text-xs px-2 py-1 rounded-full border bg-white/10 w-full">
            <div className="flex items-center justify-center gap-1 text-white">
              <Users className="size-3" aria-hidden />
              {course.totalEnrolled.toLocaleString()} +
            </div>
          </div>
        </div>

        {/* Price */}
        <div className="pt-3 border-t border-white/10">
          {course.discountPercent > 0 ? (
            <div className="flex items-center justify-between">
              
              <div className="flex items-center gap-2">
                <span className="text-lg sm:text-xl md:text-2xl font-bold text-white">
                  ৳{finalPrice.toFixed(0)}
                </span>
                <span className="text-xs sm:text-sm text-gray-500 line-through">
                  ৳{course.price}
                </span>
              </div>

              <div className="text-[10px] sm:text-xs px-2 py-1 rounded-full border bg-white/10">
                <span className="text-secondary">
                  {course.discountPercent}% ছাড়
                </span>
              </div>
            </div>
          ) : (
            <span className="text-lg sm:text-xl md:text-2xl font-bold text-white">
              ৳{course.price}
            </span>
          )}
        </div>

        {/* CTA */}
        <Link
          href={`/courses/${course.slug}`}
          className="bg-gradient-to-r from-secondary to-primary text-white px-3 sm:px-4 py-3 rounded-full text-[11px] sm:text-sm font-semibold flex items-center gap-1 sm:gap-2 hover:shadow-lg hover:shadow-secondary/25 transition-all w-full justify-center mt-5"
          aria-label={`View details of ${course.title}`}
        >
          বিস্তারিত দেখুন
          <ArrowRight className="size-3 sm:size-4" aria-hidden />
        </Link>
      </div>
    </article>
  );
}