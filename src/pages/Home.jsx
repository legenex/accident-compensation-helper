import React from "react";
import Hero from "@/components/site/sections/Hero";
import TrustStrip from "@/components/site/sections/TrustStrip";
import AccidentTypes from "@/components/site/sections/AccidentTypes";
import ImmediateHelp from "@/components/site/sections/ImmediateHelp";
import HowItWorks from "@/components/site/sections/HowItWorks";
import CompensationInfo from "@/components/site/sections/CompensationInfo";
import WhyUse from "@/components/site/sections/WhyUse";
import AttorneyConnection from "@/components/site/sections/AttorneyConnection";
import Testimonials from "@/components/site/sections/Testimonials";
import ResourcesPreview from "@/components/site/sections/ResourcesPreview";
import Faq from "@/components/site/sections/Faq";
import FinalCTA from "@/components/site/sections/FinalCTA";
import Meta from "@/components/site/Meta";

export default function Home() {
  return (
    <>
      <Meta
        title="Accident Compensation Helper k in 2 Minutes"
        description="Answer a few questions about your accie, confidential, and no obligation. We are not a law firm."
        canonical="/"
        image="https://media.base44.com/images/public/6a9667f0d469f05277f6ab4/f5d909a06_generated_image.png"
      />
      <Hero />
      <TrustStrip />
      <AccidentTypes />
      <ImmediateHelp />
      <HowItWorks />
      <CompensationInfo />
      <WhyUse />
      <AttorneyConnection />
      <Testimonials />
      <ResourcesPreview />
      <Faq />
      <FinalCTA />
    </>
  );
}