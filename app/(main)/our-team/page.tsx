import GlobalBanner from "@/components/GlobalBanner";
import SectionHeading from "@/components/SectionHeading";

import OurTeamGrid from "@/components/OurTeam/OurTeamGrid";

const teamMembers = [
  {
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=500&fit=crop",
    name: "Sarah Johnson",
    designation: "Founder",
    facebook: "https://facebook.com/sarah.johnson",
    whatsapp: "https://wa.me/1234567890",
    linkedin: "https://linkedin.com/in/sarahjohnson",
  },
  {
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=500&fit=crop",
    name: "Michael Chen",
    designation: "Creative Director",
    facebook: "https://facebook.com/michael.chen",
    whatsapp: "https://wa.me/1234567891",
    linkedin: "https://linkedin.com/in/michaelchen",
  },
  {
    image:
      "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=400&h=500&fit=crop",
    name: "Emily Rodriguez",
    designation: "Lead Designer",
    facebook: "https://facebook.com/emily.rodriguez",
    whatsapp: "https://wa.me/1234567892",
    linkedin: "https://linkedin.com/in/emilyrodriguez",
  },
];

export default function OurTeamPage() {
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
          <div className="-mt-25 md:-mt-40 lg:-mt-70 pb-16 md:pb-20 lg:pb-24">
            <OurTeamGrid teamMembers={teamMembers} />
          </div>
        </div>
      </div>
    </div>
  );
}
