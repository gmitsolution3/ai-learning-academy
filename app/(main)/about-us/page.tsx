import GlobalBanner from "@/components/GlobalBanner";
import SectionHeading from "@/components/SectionHeading";
import AboutUsContainer from '@/components/AboutUs/AboutUsContainer';

export default function AboutUsPage() {
  return (
    <section className="relative min-h-screen">
      <GlobalBanner>
        <div className="max-w-2xl px-5 lg:px-0">
          <SectionHeading
            id="student-reviews-heading"
            title={"আমাদের বিস্তারিত"}
            description={
              "২ডি অ্যানিমেশন ইন্ডাস্ট্রি বা 100 Days 2d Animation Master Program সম্পর্কে জানতে অথবা অ্যানিমেশন সম্পর্কে নতুন কিছু শিখতে যুক্ত হতে পারেন আমাদের ফ্রি সেমিনারে। যুক্ত হতে নিচের ফর্মটি পুরণ করুন।"
            }
          />
        </div>
      </GlobalBanner>

      <div className="container mx-auto px-5 lg:px-0 relative z-10">
        <div className="-mt-35 md:-mt-50 lg:-mt-70 pb-16 md:pb-20 lg:pb-24">
          <AboutUsContainer />
        </div>
      </div>
    </section>
  );
}
