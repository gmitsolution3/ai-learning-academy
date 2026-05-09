import { Button } from "@/components/ui/button";
import { GraduationCap, Home, Sparkles } from "lucide-react";
import Link from "next/link";

export default function SelectLesson() {
  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-[#05010F] via-[#0A0418] to-[#0F0720] flex items-center justify-center p-4">
      <div className="text-center space-y-6 max-w-md mx-auto">
        {/* Selection Badge */}
        <div className="inline-flex rounded-full p-[1px] bg-gradient-to-r from-secondary to-primary">
          <div className="inline-flex items-center gap-2 rounded-full bg-black/80 px-4 py-2 text-sm text-white">
            <Sparkles className="h-4 w-4 text-primary" />
            <span>Ready to Learn</span>
          </div>
        </div>

        {/* Icon */}
        <div className="relative">
          <div className="relative flex h-20 w-20 mx-auto items-center justify-center rounded-full bg-gradient-to-br from-secondary/20 to-primary/20 backdrop-blur-sm border border-primary/30">
            <GraduationCap className="h-10 w-10 text-primary" />
          </div>
        </div>

        {/* Title */}
        <h3 className="text-xl font-semibold text-white">
          Select a Lesson to Start
        </h3>

        {/* Message */}
        <p className="text-white/60 text-sm">
          Choose a lesson from the list below to begin your learning
          journey.
        </p>

        {/* Buttons */}
        <div className="space-y-3 pt-4">
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
