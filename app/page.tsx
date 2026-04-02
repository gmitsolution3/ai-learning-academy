import Banner from "@/components/Home/Banner";
import Course from "@/components/Home/Course";
import Features from "@/components/Home/Features";
import Testimonial from "@/components/Home/Testimonial";
import ConnectWithUs from "@/components/Home/ConnectWithUs";
import LiveSession from "@/components/Home/LiveSession";

export default function Home() {
  return (
    <>
      <Banner />
      <Course />
      <Features />
      <Testimonial />
      <ConnectWithUs />
      <LiveSession />
    </>
  );
}
