import React from "react";
import Hero from "@/components/site/sections/Hero";
import Services from "@/components/site/sections/Services";
import Testimonials from "@/components/site/sections/Testimonials";
import WhoWeHelp from "@/components/site/sections/WhoWeHelp";
import BeforeAfter from "@/components/site/sections/BeforeAfter";
import Process from "@/components/site/sections/Process";
import WhyEasy from "@/components/site/sections/WhyEasy";
import Guarantee from "@/components/site/sections/Guarantee";
import About from "@/components/site/sections/About";
import Faq from "@/components/site/sections/Faq";

export default function Home() {
  return (
    <>
      <Hero />
      <Services />
      <Testimonials />
      <WhoWeHelp />
      <BeforeAfter />
      <Process />
      <WhyEasy />
      <Guarantee />
      <About />
      <Faq />
    </>
  );
}