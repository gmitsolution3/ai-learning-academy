import { BookOpen } from "lucide-react";
import { Button } from "react-day-picker";

export default function DashboardError({
  refetch,
}: {
  refetch: () => void;
}) {
  return (
    <section className="min-h-screen py-20 md:py-28 lg:py-32 bg-gradient-to-br from-[#05010F] via-[#0A0418] to-[#0F0720]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-center min-h-[400px] text-center">
          <div className="relative mb-6">
            <div className="relative flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-red-500/20 to-red-600/20 backdrop-blur-sm border border-red-500/30">
              <BookOpen className="h-10 w-10 text-red-500" />
            </div>
          </div>
          <h4 className="text-xl font-semibold text-white mb-2">
            Failed to load courses
          </h4>
          <p className="text-white/50 text-sm mb-6">
            There was an error loading your enrolled courses. Please
            try again later.
          </p>
          <Button
            onClick={() => refetch()}
            className="rounded-full bg-gradient-to-r from-secondary to-primary text-white shadow-lg shadow-secondary/25 p-5 border-0"
          >
            Try Again
          </Button>
        </div>
      </div>
    </section>
  );
}
