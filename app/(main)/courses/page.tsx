import GlobalBanner from "@/components/GlobalBanner";
import CourseTabs from "@/components/Home/Course/CourseTabs";
import SectionHeading from "@/components/SectionHeading";

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
          {/* Match negative margins to banner's min-height breakpoints */}
          <div
            className="
            -mt-24             
            md:-mt-32           
            lg:-mt-40       
            xl:-mt-56          
            2xl:-mt-80         
            pb-16 md:pb-20 lg:pb-24
          "
          >
            <CourseTabs showCTA={false} />
          </div>
        </div>
      </div>
    </div>
  );
}
