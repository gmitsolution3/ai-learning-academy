import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import {
  ChevronLeft,
  Play,
  CheckCircle,
  ListVideo,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function SidebarContent({
  modules,
  currentLessonId,
  courseSlug,
  onLessonClick,
}: {
  modules: any;
  currentLessonId: string;
  courseSlug: string;
  onLessonClick: () => void;
}) {
  const router = useRouter();

  return (
    <div className="h-full flex flex-col">
      <div className="p-4 border-b border-white/10">
        <div className="flex items-center gap-2">
          <ListVideo className="h-5 w-5 text-secondary" />
          <h2 className="font-semibold text-white">Course Content</h2>
        </div>
        <p className="text-xs text-white/40 mt-1">
          {modules.flatMap((m: any) => m.lessons).length} lessons • Total
          duration: 4.5 hours
        </p>
      </div>

      <ScrollArea className="flex-1">
        <div className="pb-4">
          {modules.map((module: any, moduleIndex: number) => (
            <div key={module.id} className="border-b border-white/5">
              <div className="p-4 bg-white/5">
                <div className="flex items-center justify-between mb-1">
                  <h3 className="font-medium text-white text-sm">
                    Module {moduleIndex + 1}: {module.title}
                  </h3>
                  <span className="text-xs text-white/40">
                    {module.duration}
                  </span>
                </div>
                <p className="text-xs text-white/40">
                  {module.lessons.length} lessons
                </p>
              </div>

              <div className="divide-y divide-white/5">
                {module.lessons.map((lesson: any, lessonIndex: number) => {
                  const isActive = lesson.id === currentLessonId;
                  return (
                    <button
                      key={lesson.id}
                      onClick={() => {
                        router.push(
                          `/course/${courseSlug}/lesson/${lesson.id}`,
                        );
                        onLessonClick();
                      }}
                      className={`w-full text-left px-4 py-3 transition-all duration-200 group ${
                        isActive
                          ? "bg-gradient-to-r from-secondary/20 to-primary/20 border-l-2 border-secondary"
                          : "hover:bg-white/5"
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <div className="flex-shrink-0 mt-0.5">
                          {lesson.isCompleted ? (
                            <CheckCircle className="h-4 w-4 text-emerald-500" />
                          ) : isActive ? (
                            <Play className="h-4 w-4 text-secondary" />
                          ) : (
                            <div className="h-4 w-4 rounded-full border border-white/30" />
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p
                            className={`text-sm truncate ${
                              isActive
                                ? "text-secondary font-medium"
                                : "text-white/70 group-hover:text-white"
                            }`}
                          >
                            {lessonIndex + 1}. {lesson.title}
                          </p>
                          <p className="text-xs text-white/40 mt-0.5">
                            {lesson.duration}
                          </p>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>

      <div className="p-4 border-t border-white/10">
        <Button
          asChild
          variant="outline"
          className="w-full border-white/20 bg-white/5 text-white hover:bg-white/10 rounded-full"
        >
          <Link href={`/course/${courseSlug}`}>
            <ChevronLeft className="h-4 w-4 mr-2" />
            Back to Course Overview
          </Link>
        </Button>
      </div>
    </div>
  );
}
