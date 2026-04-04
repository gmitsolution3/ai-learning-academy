import LiveSessionClient from "./LiveSessionClient";
import LiveSessionForm from "@/components/Home/LiveSession/LiveSessionForm";
import SectionHeading from "./../../SectionHeading";

const videos = [
  {
    id: 1,
    title: "ডিজাইন শেখার শুরু",
    thumbnail:
      "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=300&fit=crop",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
  },
  {
    id: 2,
    title: "গ্রাফিক ডিজাইন টিউটোরিয়াল",
    thumbnail:
      "https://images.unsplash.com/photo-1626785774573-4b799315345d?w=400&h=300&fit=crop",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
  },
  {
    id: 3,
    title: "ইলাস্ট্রেটর মাস্টারক্লাস",
    thumbnail:
      "https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?w=400&h=300&fit=crop",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
  },
  {
    id: 4,
    title: "ফটোশপ টিপস এন্ড ট্রিকস",
    thumbnail:
      "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=400&h=300&fit=crop",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
  },
];

export default function LiveSession() {
  return (
    <section
      className="relative py-14 sm:py-16 md:py-20 overflow-hidden"
      aria-labelledby="live-session-heading"
    >
      <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-0">
        {/* Header */}
        <SectionHeading
          id={"live-session-heading"}
          title={"ফ্রি লাইভ সেশান"}
          description={
            "আমাদের যেকোনো কোর্স বা অনলাইনে ক্যারিয়ার গড়া সম্পর্কে পরামর্শ পেতে Google Meet-এ ফ্রি লাইভ সেশন করতে পারেন।"
          }
        />

        <div className="relative rounded-2xl sm:rounded-3xl border border-white/10 overflow-hidden p-5 sm:p-8 md:p-10 lg:p-14">
          <div
            aria-hidden
            className="absolute inset-0 bg-gradient-to-br from-[#0e0e12]/90 via-[#0a0a0f]/90 to-[#0e0e12]/90"
          />

          <div className="relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
              <LiveSessionClient videos={videos} />

              {/* Form (can remain server if no state) */}
              <div className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 p-6 sm:p-8">
                <h3 className="text-white text-xl sm:text-2xl font-semibold mb-6">
                  যোগাযোগ করুন
                </h3>

                <LiveSessionForm />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
