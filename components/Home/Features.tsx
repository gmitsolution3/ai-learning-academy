import Image from "next/image";
import SectionHeading from "./../SectionHeading";

const features = [
  {
    title: "Super Live Class",
    description:
      "ইউটিউবে ইতিমধ্যে ৪,০০০+ শিক্ষার্থী আমার সাথে ডিজাইন শেখার পথে যুক্ত হয়েছেন আপনিও হতে পারেন তাদের একজন",
    image: "/feature_one.png",
  },
  {
    title: "Super Live Class",
    description:
      "ইউটিউবে ইতিমধ্যে ৪,০০০+ শিক্ষার্থী আমার সাথে ডিজাইন শেখার পথে যুক্ত হয়েছেন আপনিও হতে পারেন তাদের একজন",
    image: "/feature_two.png",
  },
  {
    title: "Super Live Class",
    description:
      "ইউটিউবে ইতিমধ্যে ৪,০০০+ শিক্ষার্থী আমার সাথে ডিজাইন শেখার পথে যুক্ত হয়েছেন আপনিও হতে পারেন তাদের একজন",
    image: "/feature_three.png",
  },
];

export default function Features() {
  return (
    <section
      className="relative py-14 sm:py-16 md:py-20 overflow-hidden"
      aria-labelledby="features-heading"
    >
      <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-0">
        {/* Outer Card */}
        <div className="relative rounded-2xl sm:rounded-3xl border border-white/10 overflow-hidden p-5 sm:p-8 md:p-10 lg:p-14 lg:pt-18">
          {/* Background */}
          <div
            aria-hidden
            className="absolute inset-0 bg-gradient-to-br from-[#0e0e12]/60 via-[#0a0a0f]/60 to-[#0e0e12]/60"
          />

          <div className="relative z-10">
            {/* Header */}
            <SectionHeading
              id={"features-heading"}
              title={"আমরা ৪,০০০+ শিক্ষার্থীর পরিবার"}
              description={
                "ইউটিউবে ইতিমধ্যে ৪,০০০+ শিক্ষার্থী আমার সাথে ডিজাইন শেখার পথে যুক্ত হয়েছেন আপনিও হতে পারেন তাদের একজন।"
              }
            />

            {/* Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
              {features.map((feature) => (
                <div
                  key={feature.image} // stable key
                  className="group w-full backdrop-blur-sm rounded-md transition-all duration-300 sm:hover:-translate-y-1"
                >
                  {/* Image */}
                  <div className="relative overflow-hidden rounded-md h-44 sm:h-48 md:h-52">
                    <Image
                      src={feature.image}
                      alt={feature.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div
                      aria-hidden
                      className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"
                    />
                  </div>

                  {/* Text */}
                  <div className="p-4 sm:p-5">
                    <h3 className="text-lg sm:text-xl md:text-2xl font-bold mb-2">
                      <span className="bg-gradient-to-r from-[#F9D49B] to-[#C994FF] bg-clip-text text-transparent">
                        {feature.title.split(" ")[0]}{" "}
                      </span>
                      <span className="text-white">
                        {feature.title.split(" ").slice(1).join(" ")}
                      </span>
                    </h3>

                    <p className="text-white text-xs sm:text-sm leading-5 sm:leading-6">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
