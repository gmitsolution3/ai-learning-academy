import SocialCard from "../SocialCard";
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
  { name: "Instagram", url: "https://instagram.com", icon: Instagram },
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
        <div className="space-y-3 sm:space-y-4 text-center mb-6 sm:mb-8">
          <h2
            id="connect-heading"
            className="bg-gradient-to-r from-[#F9D49B] to-[#C994FF] bg-clip-text text-transparent text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black leading-tight lg:py-5"
          >
            আমাদের সাথে যুক্ত হোন
          </h2>

          <p className="max-w-xl mx-auto text-sm sm:text-base md:text-lg text-white leading-6 sm:leading-7">
            আমাদের কমিউনিটি প্ল্যাটফর্মে আমাদের সাথে যুক্ত হয়ে
            সর্বশেষ আপডেট এবং শিক্ষামূলক কন্টেন্ট পান।
          </p>
        </div>

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