import GlobalBanner from "@/components/GlobalBanner";
import CourseOverviewDetail from "@/components/CourseDetail/CourseOverviewDetail";

export default function CourseDetailPage() {
  return (
    <div className="relative min-h-screen">
      <GlobalBanner />

      <div className="container mx-auto px-5 lg:px-0 relative z-10">
        <div className="relative">
          <div className="-mt-35 md:-mt-50 lg:-mt-80 pb-16 md:pb-20 lg:pb-24">
            <CourseOverviewDetail />
          </div>
        </div>
      </div>
    </div>
  );
}
