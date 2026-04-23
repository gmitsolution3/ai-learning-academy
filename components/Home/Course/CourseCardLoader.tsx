export default function CourseCardLoader() {
  return (
    <>
      {Array.from({ length: 4 }).map((_, index) => (
        <article key={index} className="group relative backdrop-blur-sm rounded-lg border border-white/10 overflow-hidden animate-pulse">
          {/* Image Skeleton */}
          <div className="relative h-40 sm:h-44 md:h-48 overflow-hidden bg-gradient-to-br from-gray-700 to-gray-800">
            <div className="absolute bottom-2 left-2 sm:bottom-3 sm:left-3 bg-black/50 px-2 sm:px-3 py-1 rounded-full w-20 h-5"></div>
          </div>

          {/* Content Skeleton */}
          <div className="p-4 sm:p-5">
            {/* Title Skeleton */}
            <div className="h-5 sm:h-6 md:h-7 bg-white/10 rounded-lg mb-2 w-3/4"></div>

            {/* Description Skeleton */}
            <div className="space-y-1 mb-2">
              <div className="h-3 sm:h-4 bg-white/10 rounded w-full"></div>
              <div className="h-3 sm:h-4 bg-white/10 rounded w-5/6"></div>
            </div>

            {/* Stats Skeleton */}
            <div className="flex items-center justify-between gap-5 mb-3 sm:mb-4">
              {/* Level Badge Skeleton */}
              <div className="h-5 sm:h-6 bg-white/10 rounded-full w-16"></div>

              {/* Duration Skeleton */}
              <div className="h-5 sm:h-6 bg-white/10 rounded-full w-full"></div>

              {/* Language Skeleton */}
              <div className="h-5 sm:h-6 bg-white/10 rounded-full w-full"></div>
            </div>

            {/* Price Skeleton */}
            <div className="pt-3 border-t border-white/10">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="h-6 sm:h-7 md:h-8 bg-white/10 rounded w-20"></div>
                  <div className="h-4 sm:h-5 bg-white/10 rounded w-12"></div>
                </div>
                <div className="h-5 sm:h-6 bg-white/10 rounded-full w-16"></div>
              </div>
            </div>

            {/* CTA Button Skeleton */}
            <div className="mt-5 w-full">
              <div className="bg-white/10 rounded-full h-10 sm:h-11 w-full"></div>
            </div>
          </div>
        </article>
      ))}
    </>
  );
}
