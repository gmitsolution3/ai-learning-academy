import GlobalBanner from "@/components/GlobalBanner";
import Consultation from "@/components/Home/OnlineConsultation/Consultation";
import SectionHeading from "@/components/SectionHeading";
import { requireAuth } from "@/lib/requireAuth";

export default async function OnlineConsultationPage() {
  await requireAuth(["admin", "instructor", "user"]);

  return (
    <div className="relative min-h-screen">
      <GlobalBanner>
        <div className="max-w-xl px-5 lg:px-0">
          <SectionHeading
            id="free-live-session"
            title={"ফ্রি অনলাইন কন্সাল্টেশন"}
            description={
              "আমাদের যেকোনো কোর্স বা অনলাইনে ক্যারিয়ার গড়া সম্পর্কে পরামর্শ পেতে Google Meet-এ ফ্রি কন্সাল্টেশন সেশন করতে পারেন ফ্রি সেশন নিতে নিচের ফর্মটি পূরণ করুন।"
            }
          />
        </div>
      </GlobalBanner>

      <div className="container mx-auto px-5 lg:px-0 relative z-10">
        <div className="relative">
          <div
            className="
            -mt-24             
            md:-mt-32           
            lg:-mt-40       
            xl:-mt-60          
            pb-16 md:pb-20 lg:pb-24
          "
          >
            <Consultation />
          </div>
        </div>
      </div>
    </div>
  );
}
