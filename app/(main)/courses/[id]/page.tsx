import GlobalBanner from "@/components/GlobalBanner";
import CourseOverview from "@/components/CourseDetail/CourseOverview";
import CourseDetail from "@/components/CourseDetail/CourseDetail";

export default function CourseDetailPage() {
  return (
    <section className="relative min-h-screen">
      <GlobalBanner />

      <div className="container mx-auto px-5 lg:px-0 relative z-10">
        <div className="-mt-35 md:-mt-50 lg:-mt-[800px] pb-16 md:pb-20 lg:pb-24">
          <CourseOverview />
          <CourseDetail />
        </div>
      </div>
    </section>
  );
}
