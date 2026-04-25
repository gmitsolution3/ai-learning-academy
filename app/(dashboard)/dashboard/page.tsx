// app/user-dashboard/page.tsx
"use client";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CourseCard from "@/components/UserDashboard/CourseCard";
import { useFetchById } from "@/hooks/swr/useFetchById";
import { useSession } from "@/lib/auth-context";
import { BookOpen } from "lucide-react";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import DashboardLoader from "@/components/UserDashboard/dashboard/DashboardLoader";
import DashboardError from "@/components/UserDashboard/dashboard/DashboardError";
import {IEnrolledCourse, ITransformedCourse} from "@/types";
import { notify } from "@/utils/notify";


export default function UserDashboard() {
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const { session } = useSession();
  const router = useRouter();

  const user = session?.user;

  const { data, isLoading, isError, refetch } = useFetchById(
    "/tracking/get-user-track-data",
    user?.email,
  );

  const enrolledCourseData: IEnrolledCourse[] = data?.data || [];


  const transformedCourses: ITransformedCourse[] = useMemo(() => {
    return enrolledCourseData.map((enrolled) => {
      
      const instructorName =
        enrolled.course.instructor?.[0]?.name || "TBA";

      const batchName = enrolled.batch?.[0]?.batch_name || "No Batch";

      const totalModules = enrolled.batch?.[0]?.total_module || 0;
      const completedModules =
        Math.floor((enrolled.progress / 100) * totalModules) || 0;

      return {
        id: enrolled.course._id,
        title: enrolled.course.title,
        instructor: instructorName,
        category: enrolled.course.category?.name || "Uncategorized",
        batch: batchName,
        progress: enrolled.progress,
        totalModules: totalModules,
        completedModules: completedModules,
        image: enrolled.course.thumbnail,
        thumbnail: enrolled.course.thumbnail,
        lastAccessed: enrolled.last_accessed,
        slug: enrolled.course.slug,
      };
    });
  }, [enrolledCourseData]);

  const filteredCourses = useMemo(() => {
    return transformedCourses.filter((course) => {
      if (filterStatus === "completed") {
        return course.progress === 100;
      } else if (filterStatus === "in-progress") {
        return course.progress > 0 && course.progress < 100;
      } else if (filterStatus === "not-started") {
        return course.progress === 0;
      }
      return true; // "all" case
    });
  }, [transformedCourses, filterStatus]);

 
  const userName =
    user?.name || user?.email?.split("@")[0] || "Learner";

  const handleContinueCourse = (courseId: string) => {
    router.push(`/dashboard/course/69db51968b0c69dd761f4b27/module/69ec9a35d7a6777bdd276dcd/lesson/text-content-for-module`);
  };

  const handleViewOutline = (courseId: string, slug: string) => {
    notify.warning("coming soon");
    
  };

  if (isLoading) {
    return <DashboardLoader />
  }

  if (isError) {
    return (
      <DashboardError refetch={refetch} />
    );
  }

  return (
    <section className="min-h-screen py-20 md:py-28 lg:py-32 bg-gradient-to-br from-[#05010F] via-[#0A0418] to-[#0F0720]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Welcome Header */}
        <div className="mb-8 md:mb-12 text-center">
          <div className="inline-flex rounded-full p-[1px] bg-gradient-to-r from-secondary to-primary mb-4">
            <div className="inline-flex items-center gap-2 rounded-full bg-black/60 px-3 py-1.5 text-xs text-white backdrop-blur">
              <BookOpen className="h-3 w-3 text-secondary" />
              <span>ড্যাশবোর্ড</span>
            </div>
          </div>

          <h3 className="text-2xl sm:text-3xl md:text-4xl font-semibold bg-gradient-to-r from-[#D1D5DB] to-[#707275] bg-clip-text text-transparent">
            Welcome back{" "}
            <span className="bg-gradient-to-r from-secondary to-primary bg-clip-text text-transparent">
              {userName}
            </span>
            , ready for your next lesson?
          </h3>

          <p className="text-white/50 mt-2 text-sm">
            Continue your learning journey from where you left off
          </p>
        </div>

        {/* Search and Filters */}
        <div className="flex justify-end mb-8 space-y-4">
          {/* Status Tabs */}
          <Tabs
            defaultValue="all"
            value={filterStatus}
            onValueChange={setFilterStatus}
            className="w-auto"
          >
            <TabsList className="inline-flex h-auto bg-transparent backdrop-blur border border-white/10 rounded-full py-6 px-2">
              <TabsTrigger
                value="all"
                className="rounded-full data-[state=active]:bg-gradient-to-r data-[state=active]:from-secondary data-[state=active]:to-primary data-[state=active]:text-white p-4"
              >
                All Courses ({transformedCourses.length})
              </TabsTrigger>
              <TabsTrigger
                value="in-progress"
                className="rounded-full data-[state=active]:bg-gradient-to-r data-[state=active]:from-secondary data-[state=active]:to-primary data-[state=active]:text-white p-4"
              >
                In Progress (
                {
                  transformedCourses.filter(
                    (c) => c.progress > 0 && c.progress < 100,
                  ).length
                }
                )
              </TabsTrigger>
              <TabsTrigger
                value="completed"
                className="rounded-full data-[state=active]:bg-gradient-to-r data-[state=active]:from-secondary data-[state=active]:to-primary data-[state=active]:text-white p-4"
              >
                Completed (
                {
                  transformedCourses.filter((c) => c.progress === 100)
                    .length
                }
                )
              </TabsTrigger>
              <TabsTrigger
                value="not-started"
                className="rounded-full data-[state=active]:bg-gradient-to-r data-[state=active]:from-secondary data-[state=active]:to-primary data-[state=active]:text-white p-4"
              >
                Not Started (
                {
                  transformedCourses.filter((c) => c.progress === 0)
                    .length
                }
                )
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        {/* Courses Grid/Loop */}
        {filteredCourses.length > 0 ? (
          <div className="flex flex-col items-center justify-center gap-6 max-w-5xl mx-auto">
            {filteredCourses.map((course) => (
              <CourseCard
                key={course.id}
                course={course}
                onContinue={() =>
                  handleContinueCourse(course.id)
                }
                onOutline={() =>
                  handleViewOutline(course.id, course.slug)
                }
              />
            ))}
          </div>
        ) : (
          /* Empty State */
          <div className="flex flex-col items-center justify-center py-16 md:py-24 text-center max-w-md mx-auto">
            <div className="relative mb-6">
              <div className="absolute inset-0 animate-ping rounded-full bg-secondary/20 blur-xl" />
              <div className="relative flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-secondary/20 to-primary/20 backdrop-blur-sm border border-white/10">
                <BookOpen className="h-10 w-10 text-secondary" />
              </div>
            </div>

            <h4 className="text-xl font-semibold text-white mb-2">
              {filterStatus !== "all"
                ? `No ${filterStatus.replace("-", " ")} courses found`
                : "No courses found"}
            </h4>

            <p className="text-white/50 text-sm mb-6">
              {filterStatus !== "all"
                ? `You don't have any ${filterStatus.replace("-", " ")} courses.`
                : "You haven't enrolled in any courses yet. Start your learning journey today!"}
            </p>

            <Button
              asChild
              className="rounded-full bg-gradient-to-r from-secondary to-primary text-white shadow-lg shadow-secondary/25 p-5 border-0"
            >
              <a href="/courses">Browse Courses</a>
            </Button>
          </div>
        )}

        {/* Course Count Info */}
        {filteredCourses.length > 0 && (
          <div className="text-center mt-8 text-sm text-white/40">
            Showing {filteredCourses.length} of{" "}
            {transformedCourses.length} courses
          </div>
        )}
      </div>
    </section>
  );
}
