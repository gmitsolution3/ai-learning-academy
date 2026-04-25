function CourseCardSkeleton() {
  return (
    <div className="group relative w-full overflow-hidden rounded-2xl border border-white/10 bg-transparent backdrop-blur-sm">
      <div className="relative flex flex-col md:flex-row gap-4 p-4 sm:p-5">
        {/* Left Side - Image Skeleton */}
        <div className="relative w-full md:w-48 lg:w-56 flex-shrink-0">
          <div className="relative aspect-video md:aspect-square overflow-hidden rounded-xl bg-gradient-to-br from-secondary/10 to-primary/10">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent animate-shimmer" />
          </div>
        </div>

        {/* Right Side - Content Skeleton */}
        <div className="flex-1 space-y-3">
          {/* Category Badge Skeleton */}
          <div className="flex items-center gap-2 flex-wrap">
            <div className="h-6 w-20 rounded-full bg-white/10 animate-pulse" />
            <div className="h-6 w-24 rounded-full bg-white/5 animate-pulse hidden md:inline-block" />
          </div>

          {/* Course Title Skeleton */}
          <div className="space-y-2">
            <div className="h-7 sm:h-8 md:h-9 w-full max-w-md bg-white/10 rounded-lg animate-pulse" />
            <div className="h-7 sm:h-8 md:h-9 w-3/4 max-w-sm bg-white/10 rounded-lg animate-pulse" />
          </div>

          {/* Instructor Info Skeleton */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5">
              <div className="h-3.5 w-3.5 rounded-full bg-secondary/30 animate-pulse" />
              <div className="h-4 w-24 bg-white/10 rounded animate-pulse" />
            </div>
            <div className="flex items-center gap-1.5">
              <div className="h-3.5 w-3.5 rounded-full bg-secondary/30 animate-pulse" />
              <div className="h-4 w-20 bg-white/10 rounded animate-pulse" />
            </div>
          </div>

          {/* Progress Section Skeleton */}
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <div className="h-4 w-28 bg-white/10 rounded animate-pulse" />
              <div className="h-4 w-20 bg-secondary/30 rounded animate-pulse" />
            </div>

            <div className="h-2 w-full rounded-full bg-white/10 animate-pulse">
              <div className="h-full w-1/3 rounded-full bg-gradient-to-r from-secondary/50 to-primary/50" />
            </div>

            <div className="h-3 w-32 bg-white/5 rounded animate-pulse" />
          </div>

          {/* Action Buttons Skeleton */}
          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <div className="flex-1 h-10 rounded-full bg-gradient-to-r from-secondary/50 to-primary/50 animate-pulse" />
            <div className="flex-1 h-10 rounded-full bg-white/10 animate-pulse" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default function DashboardLoader() {
  return (
    <section className="min-h-screen py-20 md:py-28 lg:py-32 bg-gradient-to-br from-[#05010F] via-[#0A0418] to-[#0F0720]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Welcome Header Skeleton */}
        <div className="mb-8 md:mb-12 text-center">
          <div className="inline-flex rounded-full p-[1px] bg-gradient-to-r from-secondary to-primary mb-4">
            <div className="inline-flex items-center gap-2 rounded-full bg-black/60 px-3 py-1.5">
              <div className="h-3 w-3 rounded-full bg-secondary/50 animate-pulse" />
              <div className="h-3 w-16 bg-white/20 rounded animate-pulse" />
            </div>
          </div>

          <div className="h-8 sm:h-10 md:h-12 w-64 sm:w-96 md:w-[500px] mx-auto bg-white/10 rounded-lg animate-pulse mb-2" />
          <div className="h-4 w-48 mx-auto bg-white/5 rounded animate-pulse" />
        </div>

        {/* Tabs Skeleton */}
        <div className="flex justify-end mb-8">
          <div className="inline-flex h-auto bg-transparent backdrop-blur border border-white/10 rounded-full py-2 px-2 gap-1">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="h-10 w-24 rounded-full bg-white/10 animate-pulse"
              />
            ))}
          </div>
        </div>

        {/* Course Cards Skeleton */}
        <div className="flex flex-col items-center justify-center gap-6 max-w-5xl mx-auto">
          {[1, 2, 3].map((i) => (
            <CourseCardSkeleton key={i} />
          ))}
        </div>

        {/* Footer Info Skeleton */}
        <div className="text-center mt-8">
          <div className="h-4 w-48 mx-auto bg-white/5 rounded animate-pulse" />
        </div>
      </div>
    </section>
  );
}