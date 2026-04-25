import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useFetchById } from "@/hooks/swr/useFetchById";
import { ILesson, IModule } from "@/types";
import {
  CheckCircle,
  ChevronLeft,
  ListVideo,
  Play,
  Lock
} from "lucide-react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

// Skeleton Loader Component
const LessonSkeleton = () => {
  return (
    <div className="px-4 py-3 animate-pulse">
      <div className="flex items-start gap-3">
        <div className="flex-shrink-0 mt-0.5">
          <div className="h-4 w-4 rounded-full bg-white/10" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="h-4 bg-white/10 rounded w-3/4 mb-2" />
          <div className="h-3 bg-white/10 rounded w-1/4" />
        </div>
      </div>
    </div>
  );
};

export default function SidebarContent({
  modules,
}: {
  modules: IModule[];
}) {
  const { courseId, moduleId, lessonSlug } = useParams();
  const router = useRouter();
  const [expandedModule, setExpandedModule] = useState<string | null>(
    null,
  );

  // Set initial expanded module based on URL moduleId
  useEffect(() => {
    if (moduleId) {
      setExpandedModule(moduleId as string);
    } else if (modules.length > 0) {
      setExpandedModule(modules[0]._id);
    }
  }, [moduleId, modules]);

  const {
    data: lessonData,
    isLoading: lessonIsLoading,
    isError: lessonIsError,
  } = useFetchById(
    "/lessons/get-lesson-by-module-id",
    expandedModule as string,
    { dedupingInterval: 60000 },
  );

  const onModuleClick = (moduleId: string) => {
    setExpandedModule(moduleId);
    // Update URL with the selected module
    router.push(
      `/dashboard/course/${courseId}/module/${moduleId}/lesson/${lessonSlug || ""}`,
    );
  };

  const onLessonClick = (
    courseId: string,
    moduleId: string,
    lessonSlug: string,
  ) => {
    router.push(
      `/dashboard/course/${courseId}/module/${moduleId}/lesson/${lessonSlug}`,
    );
  };

  const lessonList = lessonData?.data?.lessons || [];

  return (
    <div className="h-full flex flex-col">
      <div className="p-4 border-b border-white/10">
        <div className="flex items-center gap-2">
          <ListVideo className="h-5 w-5 text-secondary" />
          <h2 className="font-semibold text-white">Course Content</h2>
        </div>
        <p className="text-xs text-white/40 mt-1">
          total course content count will go here
        </p>
      </div>

      <ScrollArea className="flex-1">
        <div className="pb-4">
          <Accordion
            type="single"
            value={expandedModule || undefined}
            onValueChange={(value) => value && onModuleClick(value)}
            className="space-y-2"
          >
            {modules.map((module: IModule, moduleIndex: number) => (
              <AccordionItem
                key={module._id}
                value={module._id}
                className=""
              >
                <AccordionTrigger className="px-4 py-3 transition-colors [&[data-state=open]>div>svg]:rotate-180">
                  <div className="flex items-center justify-between w-full pr-4">
                    <div className="flex-1 text-left">
                      <h3 className="font-medium text-white text-sm">
                        Module {moduleIndex + 1}: {module.title}
                      </h3>
                      <p className="text-xs text-white/40 mt-1">
                        {/* lessons count will go here */}
                        {lessonList?.length || 0} lessons
                      </p>
                    </div>
                    <span className="text-xs text-white/40">
                      {/* {module.duration} */} module duration will
                      go here
                    </span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="p-0 data-[state=open]:animate-accordion-down data-[state=closed]:animate-accordion-up overflow-hidden">
                  {lessonIsLoading &&
                  expandedModule === module._id ? (
                    // Skeleton Loader
                    <div className="divide-y divide-white/5">
                      {[1, 2, 3].map((index) => (
                        <LessonSkeleton key={index} />
                      ))}
                    </div>
                  ) : lessonIsError &&
                    expandedModule === module._id ? (
                    <div className="p-4 text-center text-red-400">
                      Error loading lessons
                    </div>
                  ) : (
                    <div className="divide-y divide-white/5">
                      {lessonList?.length > 0 ? (
                        lessonList?.map(
                          (lesson: ILesson, lessonIndex: number) => {
                            const isActive = lesson.slug === lessonSlug;
                            return (
                              <button
                                key={lesson.slug}
                                onClick={() =>
                                  onLessonClick(
                                    courseId as string,
                                    module._id,
                                    lesson.slug,
                                  )
                                }
                                className={`w-full text-left px-4 py-3 transition-all duration-200 group ${
                                  isActive
                                    ? "bg-gradient-to-r from-secondary/20 to-primary/20 border-l-2 border-secondary"
                                    : "hover:bg-white/5"
                                }`}
                              >
                                <div className="flex items-start gap-3">
                                  <div className="flex-shrink-0 mt-0.5">
                                    {lesson.is_completed ? (
                                      <CheckCircle className="h-4 w-4 text-emerald-500" />
                                    ) : isActive ? (
                                      <Play className="h-4 w-4 text-secondary" />
                                    ) : (
                                      <Lock className="h-4 w-4 text-red-500" />
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
                                      {lessonIndex + 1}.{" "}
                                      {lesson.title}
                                    </p>
                                    <p className="text-xs text-white/40 mt-0.5">
                                      {lesson.duration}
                                    </p>
                                  </div>
                                </div>
                              </button>
                            );
                          },
                        )
                      ) : (
                        <div className="p-4 text-center text-white/40">
                          No lessons available
                        </div>
                      )}
                    </div>
                  )}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </ScrollArea>

      <div className="p-4 border-t border-white/10">
        <Button
          asChild
          variant="outline"
          className="w-full border-white/20 bg-white/5 text-white hover:bg-white/10 rounded-full"
        >
          <Link href={`/course/${courseId}`}>
            <ChevronLeft className="h-4 w-4 mr-2" />
            Back to Course Overview
          </Link>
        </Button>
      </div>
    </div>
  );
}
