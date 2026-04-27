import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ILesson, IModuleList } from "@/types";
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
}: {
  modules: IModuleList[];
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
    } else if (modules?.length > 0) {
      setExpandedModule(modules[0]._id);
    }
  }, [moduleId, modules]);

  const onLessonClick = (
    courseId: string,
    moduleId: string,
    lessonSlug: string,
  ) => {
    router.push(
      `/dashboard/course/${courseId}/module/${moduleId}/lesson/${lessonSlug}`,
    );
  };

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
            collapsible
            value={expandedModule ?? ""}
            onValueChange={(val) => setExpandedModule(val)}
            className="space-y-2"
          >
            {modules.map(
              (module: IModuleList, moduleIndex: number) => (
                <AccordionItem
                  key={module.module_id}
                  value={module.module_id}
                >
                  <AccordionTrigger className="px-4 py-3 transition-colors ">
                    <div className="flex items-center justify-between w-full pr-4">
                      <div className="flex-1 text-left">
                        <h3 className="font-medium text-white text-sm">
                          Module {moduleIndex + 1}: {module.title}
                        </h3>
                        <p className="text-xs text-white/40 mt-1">
                          {module.lessons?.length || 0} lessons
                        </p>
                      </div>
                      <span className="text-xs text-white/40">
                        module duration will go here
                      </span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="p-0 data-[state=open]:animate-accordion-down data-[state=closed]:animate-accordion-up overflow-hidden">
                    <div className="divide-y divide-white/5">
                      {module.lessons && module.lessons.length > 0 ? (
                        module.lessons.map(
                          (lesson: ILesson, lessonIndex: number) => {
                            const isActive =
                              lesson.slug === lessonSlug;
                            return (
                              <button
                                key={lesson.slug}
                                onClick={() =>
                                  onLessonClick(
                                    courseId as string,
                                    module.module_id,
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
                                      {lesson.duration} min
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
                  </AccordionContent>
                </AccordionItem>
              ),
            )}
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
