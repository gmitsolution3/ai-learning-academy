import GlobalBanner from "@/components/GlobalBanner";
import SectionHeading from "@/components/SectionHeading";
import CourseTabs from "@/components/Home/Course/CourseTabs";

export default function CoursesPage() {
  return (
    <div className="relative min-h-screen">
      <GlobalBanner>
        <div className="max-w-xl px-5 lg:px-0">
          <SectionHeading
            id="all-course-heading"
            title={"বাংলায় শিখুন ২১ শতকের ক্রিয়েটিভ স্কিল"}
            description={
              "আজকের শেখা থেকেই শুরু হোক আপনার আন্তর্জাতিক মানের ডিজাইন ক্যারিয়ার।"
            }
          />
        </div>
      </GlobalBanner>

      <div className="container mx-auto px-5 lg:px-0 relative z-10">
        <div className="relative">
          <div className="-mt-35 md:-mt-50 lg:-mt-80 pb-16 md:pb-20 lg:pb-24">
            <CourseTabs showCTA={false} />
          </div>
        </div>
      </div>
    </div>
  );
}
