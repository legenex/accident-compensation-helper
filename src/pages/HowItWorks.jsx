import React from "react";
import { Link } from "react-router-dom";
import { Image } from "@/components/ui/image";
import PageHero from "@/components/site/PageHero";
import Meta from "@/components/site/Meta";
import { HOW_IT_WORKS, IMAGES } from "@/lib/siteContent";

export default function HowItWorks() {
  return (
    <>
      <Meta title="How It Works | Accident Compensation Helper" description="A clearer next step after an accident. Tell us what happened, review your claim-check result, choose whether to request contact, and speak with a participating attorney." canonical="/how-it-works" />
      <PageHero eyebrow="How It Works" title="A clearer next step after an accident" subtitle="The claim check is free, confidential, and takes about two minutes. You decide whether to request contact with a participating attorney." crumbs={[{ label: "Home", to: "/" }, { label: "How It Works" }]} />
      <section className="mx-auto max-w-[1280px] px-6 py-16">
        <div className="space-y-10">
          {HOW_IT_WORKS.map((s) => (
            <div key={s.step} className="flex gap-5">
              <div className="flex flex-col items-center">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary font-heading text-lg font-bold text-white shadow-float">{s.step}</span>
                <div className="mt-2 w-px flex-1 bg-softblue-border" />
              </div>
              <div className="pb-4">
                <h2 className="font-heading text-xl font-bold text-foreground">{s.title}</h2>
                <p className="mt-2 text-muted-foreground leading-relaxed">{s.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-14 grid items-center gap-10 rounded-2xl bg-secondary/50 p-8 lg:grid-cols-2 lg:p-12">
          <div>
            <h2 className="font-heading text-2xl font-bold text-foreground">See the claim check in action</h2>
            <p className="mt-3 text-muted-foreground">The claim check asks a short series of questions and provides an informational assessment. It is not a legal opinion or a guarantee of any outcome.</p>
            <Link to="/claim" className="mt-6 inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3.5 text-base font-semibold text-white shadow-float transition-transform hover:scale-[1.02]">Try the claim check</Link>
          </div>
          <div className="overflow-hidden rounded-xl shadow-lift">
            <Image src={IMAGES.claimCheck} alt="A person completing an accident claim questionnaire on a phone" className="block aspect-[4/3] w-full" fittingType="fill" focalPointX={0.5} focalPointY={0.4} />
          </div>
        </div>
      </section>
    </>
  );
}