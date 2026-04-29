// app/course/[courseId]/lesson/[lessonId]/page.tsx
"use client";

import { ChevronLeft, Menu } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useState } from "react";

import { Button } from "@/components/ui/button";

import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import VideoPlayer from "@/components/UserDashboard/dashboard/VideoPlayer/VideoPlayer";
import VideoPlayerLoader from "@/components/UserDashboard/dashboard/VideoPlayer/VideoPlayerLoader";
import { useFetch } from "@/hooks/swr/useFetch";
import { useFetchById } from "@/hooks/swr/useFetchById";
import { usePost } from "@/hooks/swr/usePost";
import { useSession } from "@/lib/auth-context";
import { ILesson } from "@/types";
import { notify } from "@/utils/notify";
import { mutate } from "swr";
import SidebarContent from "./SidebarContent";

export default function PlayerPage() {
  const params = useParams();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { session } = useSession();

  const courseId = params.courseId as string;
  const lessonSlug = params.lessonSlug as string;
  const moduleId = params.moduleId as string;

  const user = session?.user;

  const { data: userData, isLoading: userDetailIsLoading } =
    useFetchById("/enrolled/get-user-enrolled-data", user?.email);

  const userDetail = userData?.data || {};

  const {
    data: moduleData,
    isLoading: moduleIsLoading,
    isError: moduleIsError,
    refetch: moduleRefetch,
  } = useFetch(`/modules/user-track/all-modules/${courseId}`, {
    params: {
      email: decodeURIComponent(user?.email),
      batch_id: userDetail?.batch?._id,
    },
  });

  const moduleList = moduleData?.data?.modules || [];
  const moduleMeta = moduleData?.data?.user_track || {};

  console.log({ moduleMeta });

  const {
    data: lessonDetail,
    isLoading: lessonDetailIsLoading,
    isError: lessonDetailIsError,
    refetch: lessonRefetch,
  } = useFetch(`/lessons/get-single-lesson/${lessonSlug}`, {
    params: {
      module_id: moduleId,
    },
  });

  const {
    mutate: unlockNextModule,
    isLoading: unlockNextModuleIsLoading,
  } = usePost("/tracking/track/updated-user-data", {
    revalidateKey: [
      `/modules/get-modules-with-lessons/${user?.email}`,
    ],
  });

  const currentLesson: ILesson = lessonDetail?.data;

  const overallProgress =
    (moduleMeta?.completed_module / (moduleList?.length - 1)) * 100;

  const onUnlockNextModule = async () => {
    const payload = {
      user_email: user?.email,
      batch: userDetail?.batch?._id,
      course_id: courseId,
      module_id: moduleId,
    };

    const res = await unlockNextModule(payload);

    if (res.success) {
      notify.success("Next module unlocked!");

      mutate(
        (key) => {
          // SWR cache keys with params are often arrays
          if (Array.isArray(key)) {
            return (
              typeof key[0] === "string" &&
              key[0].startsWith("/modules")
            );
          }
          return (
            typeof key === "string" && key.startsWith("/modules")
          );
        },
        undefined,
        { revalidate: true },
      );
    }
  };

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
                  <SidebarContent
                    modules={moduleList}
                    completedModules={moduleMeta.completed_modules}
                    moduleIsLoading={moduleIsLoading}
                    moduleIsError={moduleIsError}
                    onRetry={moduleRefetch}
                  />
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
            </div>
          </div>
        </div>

        <div className="flex">
          {/* Left: Video Player Area */}
          {lessonDetailIsLoading || userDetailIsLoading ? (
            <VideoPlayerLoader />
          ) : (
            <VideoPlayer
              currentLesson={currentLesson}
              overallProgress={overallProgress}
              lessonDetailIsError={lessonDetailIsError}
              onRetry={lessonRefetch}
              onUnlockNextModule={onUnlockNextModule}
              unlockNextModuleIsLoading={unlockNextModuleIsLoading}
            />
          )}

          {/* Right: Desktop Sidebar */}
          <div className="hidden lg:block w-96 border-l border-white/10 bg-black/30 backdrop-blur-sm">
            <SidebarContent
              modules={moduleList}
              completedModules={moduleMeta.completed_modules}
              moduleIsLoading={moduleIsLoading}
              moduleIsError={moduleIsError}
              onRetry={moduleRefetch}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
