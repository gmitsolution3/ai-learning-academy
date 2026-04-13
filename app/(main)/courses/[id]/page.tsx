import CourseDetail from "@/components/CourseDetail/CourseDetail";
import CourseOverview from "@/components/CourseDetail/CourseOverview";
import GlobalBanner from "@/components/GlobalBanner";
import { getCourseById } from "@/services/course.service";

export default async function CourseDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const res = await getCourseById(id);

  const courseData = res?.data || {};

  return (
    <section className="relative min-h-screen">
      <GlobalBanner />

      <div className="container mx-auto px-5 lg:px-0 relative z-10">
        <div className="-mt-35 md:-mt-50 lg:-mt-[800px] pb-16 md:pb-20 lg:pb-24">
          <CourseOverview courseData={courseData} />
          <CourseDetail courseData={courseData} />
        </div>
      </div>
    </section>
  );
}
