import React from "react";
import { Link } from "react-router-dom";
import { Image } from "@/components/ui/image";
import PageHero from "@/components/site/PageHero";
import Meta from "@/components/site/Meta";
import { IMAGES } from "@/lib/siteContent";

export default function About() {
  return (
    <>
      <Meta title="About | Accident Compensation Helper" description="Accident Compensation Helper provides a free, confidential claim check and, if you choose, can help you request contact with a participating attorney. We are not a law firm." canonical="/about" />
      <PageHero eyebrow="About" title="A simple place to start after an accident" subtitle="We help people understand whether their situation may be worth discussing with a participating personal injury attorney." crumbs={[{ label: "Home", to: "/" }, { label: "About" }]} />
      <section className="mx-auto max-w-[1280px] px-6 py-16">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div className="overflow-hidden rounded-2xl shadow-float">
            <Image src={IMAGES.attorneyConsultation} alt="A claims support professional speaking with a person in a modern office" className="block aspect-[4/3] w-full" fittingType="fill" focalPointX={0.5} focalPointY={0.4} />
          </div>
          <div>
            <h2 className="font-heading text-2xl font-bold text-foreground">What we do</h2>
            <p className="mt-4 text-muted-foreground leading-relaxed">Accident Compensation Helper offers a free, confidential claim check that asks about your accident, injuries, treatment, and location. We use your answers to provide an informational assessment of whether your situation may warrant further review.</p>
            <p className="mt-4 text-muted-foreground leading-relaxed">If your answers suggest a conversation may be useful, you can choose to request contact. Your information may then be shared with participating attorneys or legal service providers who may review your situation.</p>
          </div>
        </div>

        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          <div className="rounded-2xl bg-card p-7 shadow-lift ring-1 ring-softblue-border">
            <h3 className="font-heading text-lg font-bold text-foreground">Not a law firm</h3>
            <p className="mt-2 text-sm text-muted-foreground leading-relaxed">Accident Compensation Helper is not a law firm and does not provide legal advice. Using this website does not create an attorney-client relationship.</p>
          </div>
          <div className="rounded-2xl bg-card p-7 shadow-lift ring-1 ring-softblue-border">
            <h3 className="font-heading text-lg font-bold text-foreground">Your choice</h3>
            <p className="mt-2 text-sm text-muted-foreground leading-relaxed">You are never obligated to request contact or to hire an attorney. The claim check is free, and there is no obligation.</p>
          </div>
          <div className="rounded-2xl bg-card p-7 shadow-lift ring-1 ring-softblue-border">
            <h3 className="font-heading text-lg font-bold text-foreground">Clear disclosures</h3>
            <p className="mt-2 text-sm text-muted-foreground leading-relaxed">We provide clear disclosures before you submit information, including how your information may be shared and how we may be compensated.</p>
          </div>
        </div>

        <div className="mt-14 rounded-2xl bg-navy p-8 text-center text-white lg:p-12">
          <h2 className="font-heading text-2xl font-bold sm:text-3xl">Ready to understand your next step?</h2>
          <p className="mx-auto mt-3 max-w-xl text-white/70">Take the free claim check. It takes about two minutes and there is no obligation.</p>
          <Link to="/claim" className="mt-6 inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3.5 text-base font-semibold text-white shadow-float transition-transform hover:scale-[1.02]">Start the free claim check</Link>
        </div>
      </section>
    </>
  );
}