import GlobalBanner from "@/components/GlobalBanner";
import SectionHeading from "@/components/SectionHeading";
import LiveSession from "@/components/Home/LiveSession/LiveSession";

export default function LiveSessionPage() {
  return (
    <div className="relative min-h-screen">
      <GlobalBanner>
        <div className="max-w-xl px-5 lg:px-0">
          <SectionHeading
            id="free-live-session"
            title={"ফ্রি লাইভ সেশান"}
            description={
              "আমাদের যেকোনো কোর্স বা অনলাইনে ক্যারিয়ার গড়া সম্পর্কে পরামর্শ পেতে Google Meet-এ ফ্রি লাইভ সেশন করতে পারেন ফ্রি সেশন নিতে নিচের ফর্মটি পূরণ করুন।"
            }
          />
        </div>
      </GlobalBanner>

      <div className="container mx-auto px-5 lg:px-0 relative z-10">
        <div className="relative">
          <div className="-mt-25 md:-mt-40 lg:-mt-70 pb-16 md:pb-20 lg:pb-24">
            <LiveSession />
          </div>
        </div>
      </div>
    </div>
  );
}
