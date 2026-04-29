import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import SidebarError from "@/components/UserDashboard/dashboard/Sidebar/SidebarError";
import SidebarLoader from "@/components/UserDashboard/dashboard/Sidebar/SidebarLoader";
import { ILesson, IModuleList } from "@/types";
import { formatDuration } from "@/utils";
import {
  CheckCircle,
  ChevronLeft,
  ListVideo,
  Lock,
  Play,
} from "lucide-react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function SidebarContent({
  modules,
  completedModules,
  moduleIsLoading,
  moduleIsError,
  onRetry,
}: {
  modules: IModuleList[];
  completedModules: { module_id: string; completed_at: string }[];
  moduleIsLoading: boolean;
  moduleIsError: boolean;
  onRetry: () => void;
}) {
  const { courseId, moduleId, lessonSlug } = useParams();
  const router = useRouter();
  const [expandedModule, setExpandedModule] = useState<string | null>(null);

  useEffect(() => {
    if (moduleId) {
      setExpandedModule(moduleId as string);
    } else if (modules?.length > 0) {
      setExpandedModule(modules[0]._id);
    }
  }, [moduleId, modules]);

  // --- Unlock logic ---
  const completedModuleIds = new Set(completedModules?.map((m) => m?.module_id));

  const unlockedModuleIds = new Set<string>();
  modules.forEach((module, index) => {
    if (completedModuleIds.has(module._id)) {
      // The completed module itself is unlocked
      unlockedModuleIds.add(module._id);
      // The immediate next module is also unlocked
      if (index + 1 < modules.length) {
        unlockedModuleIds.add(modules[index + 1]._id);
      }
    }
  });

  // If no module is completed yet, unlock only the first module
  if (completedModuleIds.size === 0 && modules.length > 0) {
    unlockedModuleIds.add(modules[0]._id);
  }

  const isModuleUnlocked = (moduleId: string) => unlockedModuleIds.has(moduleId);
  // ---

  const onLessonClick = (
    courseId: string,
    moduleId: string,
    lessonSlug: string,
  ) => {
    router.push(
      `/dashboard/course/${courseId}/module/${moduleId}/lesson/${lessonSlug}`,
    );
  };

  const totalLessons = modules.reduce(
    (total, module) =>
      total + (module.lesson_data?.[0]?.lessons?.length || 0),
    0,
  );

  return (
    <div className="h-full flex flex-col">
      <div className="p-4 border-b border-white/10">
        <div className="flex items-center gap-2">
          <ListVideo className="h-5 w-5 text-secondary" />
          <h2 className="font-semibold text-white">Course Content</h2>
        </div>
        <p className="text-xs text-white/40 mt-1">
          {modules.length} Modules • {totalLessons} Lessons
        </p>
      </div>

      <ScrollArea className="flex-1">
        {moduleIsLoading ? (
          <div className="pb-4 space-y-2">
            {[1, 2, 3, 4, 5].map((moduleIndex) => (
              <SidebarLoader key={moduleIndex} />
            ))}
          </div>
        ) : moduleIsError ? (
          <SidebarError onRetry={onRetry} courseId={courseId as string} />
        ) : (
          <div className="pb-4">
            <Accordion
              type="single"
              collapsible
              value={expandedModule ?? ""}
              onValueChange={(val) => setExpandedModule(val)}
              className="space-y-2"
            >
              {modules.map((module: IModuleList, moduleIndex: number) => {
                const lessonDataItem = module.lesson_data?.[0];
                const lessons = lessonDataItem?.lessons || [];
                const moduleUnlocked = isModuleUnlocked(module._id);
                const moduleCompleted = completedModuleIds.has(module._id);

                const moduleTotalDuration = lessons.reduce(
                  (acc, lesson) => acc + (lesson.duration || 0),
                  0,
                );

                return (
                  <AccordionItem key={module._id} value={module._id}>
                    <AccordionTrigger className="px-4 py-3 transition-colors">
                      <div className="flex items-center justify-between w-full pr-4">
                        <div className="flex-1 text-left">
                          <div className="flex items-center gap-2">
                            <h3 className="font-medium text-white text-sm">
                              Module {moduleIndex + 1}: {module.title}
                            </h3>
                            {moduleCompleted && (
                              <CheckCircle className="h-4 w-4 text-emerald-500 flex-shrink-0" />
                            )}
                            {!moduleUnlocked && (
                              <Lock className="h-4 w-4 text-red-500 flex-shrink-0" />
                            )}
                          </div>
                          <p className="text-xs text-white/40 mt-1">
                            {lessons.length} lessons
                          </p>
                        </div>
                        <span className="text-xs text-white/40">
                          {formatDuration(moduleTotalDuration)}
                        </span>
                      </div>
                    </AccordionTrigger>

                    <AccordionContent className="p-0 data-[state=open]:animate-accordion-down data-[state=closed]:animate-accordion-up overflow-hidden">
                      <div className="divide-y divide-white/5">
                        {lessons.length > 0 ? (
                          lessons.map((lesson: ILesson, lessonIndex: number) => {
                            const isActive = lesson.slug === lessonSlug;
                            const lessonLocked = !moduleUnlocked;

                            return (
                              <button
                                key={lesson.slug}
                                onClick={() => {
                                  if (lessonLocked) return;
                                  onLessonClick(
                                    courseId as string,
                                    module._id,
                                    lesson.slug,
                                  );
                                }}
                                disabled={lessonLocked}
                                className={`w-full text-left px-4 py-3 transition-all duration-200 group ${
                                  lessonLocked
                                    ? "cursor-not-allowed opacity-50"
                                    : isActive
                                      ? "bg-gradient-to-r from-secondary/20 to-primary/20 border-l-2 border-secondary"
                                      : "hover:bg-white/5"
                                }`}
                              >
                                <div className="flex items-start gap-3">
                                  <div className="flex-shrink-0 mt-0.5">
                                    {lessonLocked ? (
                                      <Lock className="h-4 w-4 text-red-500" />
                                    ) : lesson.is_completed ? (
                                      <CheckCircle className="h-4 w-4 text-emerald-500" />
                                    ) : isActive ? (
                                      <Play className="h-4 w-4 text-secondary" />
                                    ) : (
                                      <Play className="h-4 w-4 text-white/30" />
                                    )}
                                  </div>
                                  <div className="flex-1 min-w-0">
                                    <p
                                      className={`text-sm truncate ${
                                        lessonLocked
                                          ? "text-white/30"
                                          : isActive
                                            ? "text-secondary font-medium"
                                            : "text-white/70 group-hover:text-white"
                                      }`}
                                    >
                                      {lessonIndex + 1}. {lesson.title}
                                    </p>
                                    <p className="text-xs text-white/40 mt-0.5">
                                      {lesson.duration} min
                                    </p>
                                  </div>
                                </div>
                              </button>
                            );
                          })
                        ) : (
                          <div className="p-4 text-center text-white/40">
                            No lessons available
                          </div>
                        )}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                );
              })}
            </Accordion>
          </div>
        )}
      </ScrollArea>

      <div className="p-4 border-t border-white/10">
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
      </div>
    </div>
  );
}