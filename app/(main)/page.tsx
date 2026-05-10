import Banner from "@/components/Home/Banner";
import Course from "@/components/Home/Course/Course";
import Features from "@/components/Home/Features";
import Testimonial from "@/components/Home/Testimonial/Testimonial";
import ConnectWithUs from "@/components/Home/ConnectWithUs/ConnectWithUs";
import Consultation from "@/components/Home/OnlineConsultation/Consultation";
import FAQ from "@/components/Home/FAQ/FAQ";
import CTA from "@/components/Home/CTA";
import WorkSample from "@/components/Home/WorkSample/WorkSample";

export default function Home() {
  return (
    <>
      <Banner />
      <Course />
      <Features />
      <Testimonial />
      <ConnectWithUs />
      <Consultation />
      <FAQ />
      <CTA />
      <WorkSample />
    </>
  );
}
