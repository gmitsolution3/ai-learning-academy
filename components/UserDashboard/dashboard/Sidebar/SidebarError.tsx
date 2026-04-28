import { Button } from "@/components/ui/button";
import { AlertCircle, ChevronLeft, RefreshCw } from "lucide-react";
import Link from "next/link";

export default function SidebarError({
  onRetry,
  courseId,
}: {
  onRetry: () => void;
  courseId: string;
}) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] p-6 text-center">
      {/* Error Icon */}
      <div className="relative mb-6">
        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-red-500/20 to-orange-500/20 blur-xl" />
        <div className="relative flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-red-500/20 to-orange-500/20 backdrop-blur-sm border border-red-500/30">
          <AlertCircle className="h-10 w-10 text-red-500" />
        </div>
      </div>

      {/* Error Title */}
      <h3 className="text-xl font-semibold text-white mb-2">
        Failed to Load Modules
      </h3>

      {/* Error Description */}
      <p className="text-white/50 text-sm mb-6 max-w-md">
        {
          "There was an error loading the course content. Please try again."
        }
      </p>

      {/* Retry Button */}
      <div className="space-y-3 w-full max-w-xs">
        <Button
          onClick={() => onRetry()}
          className="w-full bg-gradient-to-r from-secondary to-primary hover:opacity-90 text-white rounded-full shadow-lg transition-all duration-300 border-0"
        >
          <RefreshCw className="h-4 w-4 mr-2" />
          Try Again
        </Button>

        {/* Back to Course Button */}
        {courseId && (
          <Button
            asChild
            variant="outline"
            className="w-full border-white/20 bg-white/5 text-white hover:bg-white/10 rounded-full"
          >
            <Link href={`/courses/${courseId}`}>
              <ChevronLeft className="h-4 w-4 mr-2" />
              Back to Course Overview
            </Link>
          </Button>
        )}
      </div>
    </div>
  );
}
