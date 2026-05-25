import { Hero } from "@/components/hero/hero";
import { BrandIntro } from "@/components/sections/brand-intro";
import { Solutions } from "@/components/sections/solutions";
import { Technology } from "@/components/sections/technology";
import { Process } from "@/components/sections/process";
import { Testimonials } from "@/components/sections/testimonials";
import { Faq } from "@/components/sections/faq";
import { Cta } from "@/components/sections/cta";
import { Footer } from "@/components/sections/footer";

export default function HomePage() {
  return (
    <>
      <Hero />
      <BrandIntro />
      <Solutions />
      <Technology />
      <Process />
      <Testimonials />
      <Faq />
      <Cta />
      <Footer />
    </>
  );
}
