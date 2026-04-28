import { Skeleton } from "@/components/ui/skeleton";
import { Progress } from "@/components/ui/progress";

export default function VideoPlayerLoader() {
  return (
    <div className="flex-1 min-w-0">
      <div className="sticky top-14 bg-black/90">
        {/* Video Player Skeleton */}
        <div className="relative aspect-video bg-black/50">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative">
              {/* Play button skeleton */}
              <div className="h-20 w-20 rounded-full bg-white/10 animate-pulse flex items-center justify-center">
                <div className="h-8 w-8 rounded-full bg-white/20" />
              </div>
              {/* Loading spinner effect */}
              <div className="absolute -inset-1 rounded-full border-2 border-white/20 border-t-secondary animate-spin" />
            </div>
          </div>

          {/* Video controls skeleton at bottom */}
          <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
            <div className="flex items-center gap-3">
              {/* Play/Pause button */}
              <Skeleton className="h-8 w-8 rounded-md bg-white/20" />

              {/* Progress bar */}
              <div className="flex-1">
                <Skeleton className="h-1 w-full rounded-full bg-white/20" />
                <div className="flex justify-between mt-1">
                  <Skeleton className="h-3 w-12 rounded-md bg-white/20" />
                  <Skeleton className="h-3 w-12 rounded-md bg-white/20" />
                </div>
              </div>

              {/* Volume button */}
              <Skeleton className="h-8 w-8 rounded-md bg-white/20" />

              {/* Settings button */}
              <Skeleton className="h-8 w-8 rounded-md bg-white/20" />

              {/* Fullscreen button */}
              <Skeleton className="h-8 w-8 rounded-md bg-white/20" />
            </div>
          </div>
        </div>

        {/* Video Info Skeleton */}
        <div className="p-4 md:p-6 space-y-4">
          <div className="flex items-start justify-between gap-4 flex-wrap">
            <div className="space-y-3 flex-1">
              {/* Badge skeleton */}
              <Skeleton className="h-6 w-32 rounded-full bg-white/10" />

              {/* Title skeleton */}
              <Skeleton className="h-8 w-3/4 rounded-md bg-white/10" />
              <Skeleton className="h-6 w-48 rounded-md bg-white/10" />

              {/* Duration skeleton */}
              <div className="flex gap-2">
                <Skeleton className="h-5 w-20 rounded-md bg-white/10" />
                <Skeleton className="h-5 w-24 rounded-md bg-white/10" />
              </div>
            </div>

            {/* Navigation Buttons Skeleton */}
            <div className="flex gap-2">
              <Skeleton className="h-9 w-24 rounded-full bg-white/10" />
              <Skeleton className="h-9 w-24 rounded-full bg-white/10" />
            </div>
          </div>

          {/* Course Progress Skeleton */}
          <div className="space-y-2">
            <div className="flex justify-between">
              <Skeleton className="h-4 w-28 rounded-md bg-white/10" />
              <Skeleton className="h-4 w-24 rounded-md bg-white/10" />
            </div>
            <Progress value={0} className="h-1.5 bg-white/10" />
          </div>
        </div>
      </div>
    </div>
  );
}
