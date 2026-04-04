import SocialCard from "../SocialCard";
import SectionHeading from "./../../SectionHeading";
import {
  Facebook,
  Instagram,
  Linkedin,
  Twitter,
  Whatsapp,
  Youtube,
} from "@/components/icons";

type SocialItem = {
  name: string;
  url: string;
  icon: React.ComponentType<{ className?: string }>;
};

const socialData: SocialItem[] = [
  { name: "YouTube", url: "https://youtube.com", icon: Youtube },
  {
    name: "Instagram",
    url: "https://instagram.com",
    icon: Instagram,
  },
  { name: "Facebook", url: "https://facebook.com", icon: Facebook },
  { name: "Twitter", url: "https://twitter.com", icon: Twitter },
  { name: "LinkedIn", url: "https://linkedin.com", icon: Linkedin },
  { name: "WhatsApp", url: "https://whatsapp.com", icon: Whatsapp },
];

export default function ConnectWithUs() {
  return (
    <section
      className="relative py-14 sm:py-16 md:py-20 overflow-hidden"
      aria-labelledby="connect-heading"
    >
      <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-0">
        {/* Header */}
        <SectionHeading
          id={"connect-heading"}
          title={"আমাদের সাথে যুক্ত হোন"}
          description={
            "আমাদের কমিউনিটি প্ল্যাটফর্মে আমাদের সাথে যুক্ত হয়ে সর্বশেষ আপডেট এবং শিক্ষামূলক কন্টেন্ট পান।"
          }
        />

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {socialData.map((social) => (
            <SocialCard
              key={social.name}
              name={social.name}
              url={social.url}
              Icon={social.icon}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
