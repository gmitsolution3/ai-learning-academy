// app/course/[courseId]/lesson/[lessonId]/page.tsx
"use client";

import { ChevronLeft, Menu } from "lucide-react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useRef, useState } from "react";

import { Button } from "@/components/ui/button";

import { Badge } from "@/components/ui/badge";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import VideoPlayer from "@/components/UserDashboard/dashboard/VideoPlayer";
import VideoPlayerLoader from "@/components/UserDashboard/dashboard/VideoPlayerLoader";
import { useFetch } from "@/hooks/swr/useFetch";
import { useSession } from "@/lib/auth-context";
import { ILesson } from "@/types";
import SidebarContent from "./SidebarContent";


export default function PlayerPage() {
  const params = useParams();
  const router = useRouter();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { session } = useSession();

  const playerRef = useRef<HTMLIFrameElement>(null);

  const courseId = params.courseId as string;
  const lessonSlug = params.lessonSlug as string;
  const moduleId = params.moduleId as string;

  const user = session?.user;

  const {
    data: moduleData,
    isLoading: moduleIsLoading,
    isError: moduleIsError,
  } = useFetch(`/modules/get-modules-with-lessons/${user?.email}`, {
    params: {
      course_id: courseId,
    },
  });

  const moduleList = moduleData?.data?.modules || [];
  const moduleMeta = moduleData?.data || {};
  console.log(moduleMeta);

  const {
    data: lessonDetail,
    isLoading: lessonDetailIsLoading,
    isError: lessonDetailIsError,
  } = useFetch(`/lessons/get-single-lesson/${lessonSlug}`, {
    params: {
      module_id: moduleId,
    },
  });

  const currentLesson: ILesson = lessonDetail?.data;

  const overallProgress =
    (moduleMeta?.completed_module / moduleMeta?.remaining_module) *
    100;

  return (
    <div className="bg-gradient-to-br from-[#05010F] via-[#0A0418] to-[#0F0720] py-[200px]">
      <div className="container mx-auto px-5 lg:px-5">
        {/* Top Navigation Bar */}
        <div className=" border-b border-white/10 bg-black/50 backdrop-blur-xl">
          <div className="flex items-center justify-between px-4 py-3">
            <div className="flex items-center gap-3">
              {/* Mobile Sidebar Trigger */}
              <Sheet
                open={isSidebarOpen}
                onOpenChange={setIsSidebarOpen}
              >
                <SheetTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="lg:hidden text-white hover:bg-white/10"
                  >
                    <Menu className="h-5 w-5" />
                  </Button>
                </SheetTrigger>
                <SheetContent
                  side="left"
                  className="w-80 p-0 bg-black/95 border-r border-white/10"
                >
                  <SidebarContent modules={moduleList} />
                </SheetContent>
              </Sheet>

              <Button
                variant="ghost"
                size="sm"
                asChild
                className="text-white/70 hover:text-white hover:bg-white/10"
              >
                <Link href={`/course/${courseId}`}>
                  <ChevronLeft className="h-4 w-4 mr-1" />
                  Back
                </Link>
              </Button>

              <div className="hidden sm:block h-6 w-px bg-white/20" />

              <div className="hidden sm:block">
                <Badge
                  variant="outline"
                  className="border-secondary/50 text-secondary text-xs"
                >
                  {/* {courseId.replace(/-/g, " ")} */}
                </Badge>
              </div>
            </div>
          </div>
        </div>

        <div className="flex">
          {/* Left: Video Player Area */}
          {lessonDetailIsLoading ? (
            <VideoPlayerLoader />
          ) : (
            <VideoPlayer
              currentLesson={currentLesson}
              overallProgress={overallProgress}
            />
          )}

          {/* Right: Desktop Sidebar */}
          <div className="hidden lg:block w-96 border-l border-white/10 bg-black/30 backdrop-blur-sm">
            <SidebarContent modules={moduleList} />
          </div>
        </div>
      </div>
    </div>
  );
}
