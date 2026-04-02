import Link from "next/link";
import { Card } from "@/components/ui/card";

type Props = {
  name: string;
  url: string;
  Icon: React.ComponentType<{ className?: string }>;
};

export default function SocialCard({ name, url, Icon }: Props) {
  return (
    <Link
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Visit our ${name}`}
      className="block h-full"
    >
      <Card
        className="group cursor-pointer overflow-hidden bg-gradient-to-br from-[#171820] to-[#163F3333]/20 backdrop-blur-md rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 h-full flex flex-col border border-white/20 hover:border-white/40 hover:scale-[1.02]"
      >
        {/* Top Section */}
        <div className="relative flex items-center justify-start p-8 bg-gradient-to-br">
          
          {/* Animated border */}
          <div
            aria-hidden
            className="absolute inset-4 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          >
            <div className="absolute inset-0 rounded-full border-2 border-white/30 animate-ping"></div>
          </div>

          {/* Icon */}
          <div className="relative z-10 w-18 h-18 rounded-xl flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:rotate-6 border border-white/[3%] bg-white/[3%]">
            
            <div aria-hidden>
              <Icon />
            </div>
          </div>

          {/* Decorative line */}
          <div
            aria-hidden
            className="absolute bottom-3 left-4 right-4 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"
          />
        </div>

        {/* Bottom */}
        <div className="py-3 px-8 flex items-center justify-start">
          <h3 className="text-lg lg:text-2xl font-semibold tracking-wide bg-gradient-to-r from-[#D1D5DB] to-[#707275] bg-clip-text text-transparent">
            {name}
          </h3>
        </div>
      </Card>
    </Link>
  );
}