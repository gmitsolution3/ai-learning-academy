"use client";

import { Card } from "@/components/ui/card";

interface ISocialCardProps {
  name: string;
  url: string;
  Icon: React.ElementType;
}

export default function SocialCard({
  name,
  url,
  Icon,
}: ISocialCardProps) {
  const handleClick = () => {
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <Card
      onClick={handleClick}
      className="group cursor-pointer overflow-hidden bg-gradient-to-br from-[#171820] to-[#163F3333]/20 backdrop-blur-md rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 h-full flex flex-col border border-white/20 hover:border-white/40 hover:scale-[1.02]"
    >
      {/* Top Section - Icon with Border and Gradient Background */}
      <div
        className={`relative flex items-center justify-start p-8 bg-gradient-to-br`}
      >
        {/* Rotating border effect on hover */}
        <div className="absolute inset-4 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          <div className="absolute inset-0 rounded-full border-2 border-white/30 animate-ping"></div>
        </div>

        {/* Icon Container with Border */}
        <div className="relative z-10 w-18 h-18 rounded-xl flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:rotate-6 border border-white/[3%] bg-white/[3%]">
          {/* Inner shadow effect */}
          <div className="absolute inset-0 rounded-2xl shadow-inner pointer-events-none"></div>

          {/* The SVG Icon */}
          <div>
            <Icon />
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute bottom-3 left-4 right-4 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
      </div>

      {/* Bottom Section - Social Media Name */}
      <div className="py-3 px-8 flex items-center justify-start text-center">
        <h3 className="text-lg lg:text-2xl font-semibold mb-1 tracking-wide bg-gradient-to-r from-[#D1D5DB] to-[#707275] bg-clip-text text-transparent">
          {name}
        </h3>
      </div>
    </Card>
  );
}
