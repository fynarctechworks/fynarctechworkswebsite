import { Hero } from "@/components/sections/Hero";
import { Pitch } from "@/components/sections/Pitch";
import { WhyChooseUs } from "@/components/sections/WhyChooseUs";
import { Process } from "@/components/sections/Process";
import { ServicesPreview } from "@/components/sections/ServicesPreview";
import { Testimonials } from "@/components/sections/Testimonials";
import { FAQ } from "@/components/sections/FAQ";
import { FinalCTA } from "@/components/sections/FinalCTA";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Pitch />
      <WhyChooseUs />
      <Process />
      <ServicesPreview />
      <Testimonials />
      <FAQ />
      <FinalCTA />
    </>
  );
}
