import { Users, Star, ShoppingCart } from "lucide-react";

const difficultyColors: { [key: string]: string } = {
  Beginner: "bg-green-500/20 text-green-400 border-green-500/30",
  Intermediate:
    "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
  Advanced: "bg-red-500/20 text-red-400 border-red-500/30",
};

const getDiscountedPrice = (
  price: number,
  discountPercent: number,
) => {
  return price - (price * discountPercent) / 100;
};

export default function CourseCard({ course }: { course: any }) {
  return (
    <div className="group relative  backdrop-blur-sm rounded-lg border border-white/10 overflow-hidden hover:border-secondary/50 transition-all duration-300 sm:hover:-translate-y-2">
      {/* Image */}
      <div className="relative h-40 sm:h-44 md:h-48 overflow-hidden">
        <img
          src={course.image}
          alt={course.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
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
            className={`text-[10px] sm:text-xs px-2 py-1 rounded-full border w-full text-center ${difficultyColors[course.difficultyLevel]}`}
          >
            {course.difficultyLevel}
          </div>

          <div
            className={`text-[10px] sm:text-xs px-2 py-1 rounded-full border bg-white/10 w-full`}
          >
            <div className="flex items-center justify-center gap-1 text-yellow-400">
              <Star className="size-3 fill-yellow-400" />
              {course.rating}
            </div>
          </div>

          <div
            className={`text-[10px] sm:text-xs px-2 py-1 rounded-full border bg-white/10 w-full`}
          >
            <div className="flex items-center justify-center gap-1 text-white">
              <Users className="size-3" />
              {course.totalEnrolled.toLocaleString()} +
            </div>
          </div>
        </div>

        {/* Price */}
        <div className="pt-3 border-t border-white/10">
          <div>
            {course.discountPercent > 0 ? (
              <>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-lg sm:text-xl md:text-2xl font-bold text-white">
                      ৳
                      {getDiscountedPrice(
                        course.price,
                        course.discountPercent,
                      ).toFixed(0)}
                    </span>
                    <span className="text-xs sm:text-sm text-gray-500 line-through">
                      ৳{course.price}
                    </span>
                  </div>

                  <div>
                    <div
                      className={`text-[10px] sm:text-xs px-2 py-1 rounded-full border bg-white/10 w-full`}
                    >
                      <div className="flex items-center justify-center gap-1 text-secondary">
                        {course.discountPercent}% ছাড়
                      </div>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <span className="text-lg sm:text-xl md:text-2xl font-bold text-white">
                ৳{course.price}
              </span>
            )}
          </div>
        </div>

        <button className="bg-gradient-to-r from-secondary to-primary text-white px-3 sm:px-4 py-3 rounded-full text-[11px] sm:text-sm font-semibold flex items-center gap-1 sm:gap-2 hover:shadow-lg hover:shadow-secondary/25 transition-all w-full text-center justify-center mt-5">
          <ShoppingCart className="size-3 sm:size-4" />
          বিস্তারিত দেখুন
        </button>
      </div>
    </div>
  );
}
