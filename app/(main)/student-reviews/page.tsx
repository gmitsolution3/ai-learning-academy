import GlobalBanner from "@/components/GlobalBanner";
import SectionHeading from "@/components/SectionHeading";
import TestimonialClient from "@/components/Home/Testimonial/TestimonialClient";

export default function Page() {
  return (
    <div className="relative min-h-screen">
      <GlobalBanner>
        <div className="max-w-2xl px-5 lg:px-0">
          <SectionHeading
            id="student-reviews-heading"
            title={"শিক্ষার্থীদের মতামত ও অভিজ্ঞতা"}
            description={
              "প্রতিটি কোর্স সাজানো হয়েছে সহজভাবে, যাতে আপনি আত্মবিশ্বাসের সঙ্গে UI/UX ডিজাইন শিখতে পারেন।"
            }
          />
        </div>
      </GlobalBanner>

      <div className="container mx-auto px-5 lg:px-0 relative z-10">
        <div className="relative">
          <div className="-mt-25 md:-mt-40 lg:-mt-70 pb-16 md:pb-20 lg:pb-24">
            <div>
              <TestimonialClient displayType="grid" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
