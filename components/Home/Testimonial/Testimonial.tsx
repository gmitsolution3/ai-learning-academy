import TestimonialClient from "./TestimonialClient";
import SectionHeading from "./../../SectionHeading";

export default function Testimonial() {
  return (
    <section
      className="relative py-14 sm:py-16 md:py-20 overflow-hidden"
      aria-labelledby="testimonial-heading"
    >
      <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-0">
        <SectionHeading
          id={"testimonial-heading"}
          title={"শিক্ষার্থীদের মতামত ও অভিজ্ঞতা"}
          description={
            "প্রতিটি কোর্স সাজানো হয়েছে সহজভাবে, যাতে আপনি আত্মবিশ্বাসের সঙ্গে UI/UX ডিজাইন শিখতে পারেন।"
          }
        />

        <TestimonialClient />
      </div>
    </section>
  );
}
