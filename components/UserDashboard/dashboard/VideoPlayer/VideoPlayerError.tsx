import { Button } from "@/components/ui/button";
import { AlertCircle, BookOpen, Home, RefreshCw } from "lucide-react";
import Link from "next/link";

export default function VideoPlayerError({
  onRetry,
  courseId,
}: {
  onRetry: () => void;
  courseId?: string;
}) {
  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-[#05010F] via-[#0A0418] to-[#0F0720] flex items-center justify-center p-4">
      <div className="text-center space-y-6 max-w-md mx-auto">
        {/* Error Badge */}
        <div className="inline-flex rounded-full p-[1px] bg-gradient-to-r from-red-500 to-orange-500">
          <div className="inline-flex items-center gap-2 rounded-full bg-black/80 px-4 py-2 text-sm text-white">
            <AlertCircle className="h-4 w-4 text-red-500" />
            <span>Error Loading Lesson</span>
          </div>
        </div>

        {/* Icon */}
        <div className="relative">
          <div className="relative flex h-20 w-20 mx-auto items-center justify-center rounded-full bg-gradient-to-br from-red-500/20 to-orange-500/20 backdrop-blur-sm border border-red-500/30">
            <AlertCircle className="h-10 w-10 text-red-500" />
          </div>
        </div>

        {/* Title */}
        <h3 className="text-xl font-semibold text-white">
          Failed to Load Lesson
        </h3>

        {/* Error Message */}
        <p className="text-white/60 text-sm">
          {
            "Something went wrong while loading the lesson content. Please try again."
          }
        </p>

        {/* Buttons */}
        <div className="space-y-3 pt-4">
          {onRetry && (
            <Button
              onClick={onRetry}
              className="w-full rounded-full bg-gradient-to-r from-secondary to-primary text-white shadow-lg hover:opacity-90 transition-all duration-300 border-0 p-5"
            >
              <RefreshCw className="h-4 w-4 mr-2" />
              Try Again
            </Button>
          )}

          {courseId && (
            <Button
              asChild
              variant="outline"
              className="w-full rounded-full border-white/20 bg-white/5 text-white hover:bg-white/10 transition-all duration-300"
            >
              <Link href={`/courses/${courseId}`}>
                <BookOpen className="h-4 w-4 mr-2" />
                Back to Course
              </Link>
            </Button>
          )}

          <Button
            asChild
            variant="ghost"
            className="w-full rounded-full text-white/60 hover:text-white hover:bg-white/10"
          >
            <Link href="/dashboard">
              <Home className="h-4 w-4 mr-2" />
              Back to Dashboard
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
