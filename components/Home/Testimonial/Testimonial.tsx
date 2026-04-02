import TestimonialClient from "./TestimonialClient";

export default function Testimonial() {
  return (
    <section
      className="relative py-14 sm:py-16 md:py-20 overflow-hidden"
      aria-labelledby="testimonial-heading"
    >
      <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-0">
        <div className="space-y-3 sm:space-y-4 text-center mb-6 sm:mb-8">
          <h2
            id="testimonial-heading"
            className="bg-gradient-to-r from-[#F9D49B] to-[#C994FF] bg-clip-text text-transparent text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black leading-tight lg:py-5"
          >
            শিক্ষার্থীদের মতামত ও অভিজ্ঞতা
          </h2>

          <p className="max-w-xl mx-auto text-sm sm:text-base md:text-lg text-white leading-6 sm:leading-7">
            প্রতিটি কোর্স সাজানো হয়েছে সহজভাবে, যাতে আপনি
            আত্মবিশ্বাসের সঙ্গে UI/UX ডিজাইন শিখতে পারেন।
          </p>
        </div>

        <TestimonialClient />
      </div>
    </section>
  );
}
