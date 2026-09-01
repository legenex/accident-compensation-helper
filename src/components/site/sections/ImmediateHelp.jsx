import React from "react";
import { Link } from "react-router-dom";
import { Check } from "lucide-react";
import { Image } from "@/components/ui/image";
import { IMAGES } from "@/lib/siteContent";

const CHECKLIST = [
  "Seek appropriate medical attention",
  "Keep photographs and accident records",
  "Save receipts, bills, and treatment documents",
  "Avoid guessing when speaking about injuries or fault",
  "Be cautious about signing releases before understanding them",
  "Check the deadline that may apply in your state",
];

export default function ImmediateHelp() {
  return (
    <section className="bg-secondary/50">
      <div className="mx-auto grid max-w-[1280px] items-center gap-12 px-6 py-20 lg:grid-cols-2">
        <div className="relative order-2 lg:order-1">
          <div className="overflow-hidden rounded-2xl shadow-float">
            <Image src={IMAGES.recovery} alt="A person recovering with the support of a physical therapy program" className="block aspect-[4/3] w-full" fittingType="fill" focalPointX={0.5} focalPointY={0.45} />
          </div>
        </div>
        <div className="order-1 lg:order-2">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">Immediate help</p>
          <h2 className="mt-4 font-heading text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
            Not sure what to do after an accident?
          </h2>
          <p className="mt-5 text-lg text-muted-foreground">
            The days after an accident can feel confusing. You may be dealing with injuries, vehicle damage, medical
            appointments, missed work, and calls from insurance companies at the same time.
          </p>
          <p className="mt-4 text-muted-foreground">
            You do not need to know whether you have a legal claim before using Accident Compensation Helper. Our free
            claim check helps organise the important details and tells you whether speaking with a participating attorney
            may be worth considering.
          </p>
          <ul className="mt-7 space-y-3">
            {CHECKLIST.map((c) => (
              <li key={c} className="flex items-start gap-3">
                <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/15 text-primary">
                  <Check className="h-3.5 w-3.5" />
                </span>
                <span className="text-foreground/90">{c}</span>
              </li>
            ))}
          </ul>
          <p className="mt-6 rounded-xl bg-card p-4 text-sm text-muted-foreground ring-1 ring-softblue-border">
            This checklist is general information and is not legal advice. A licensed attorney can advise you about your
            particular circumstances.
          </p>
          <Link to="/claim" className="mt-7 inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3.5 text-base font-semibold text-white shadow-float transition-transform hover:scale-[1.02]">
            Start the free claim check
          </Link>
        </div>
      </div>
    </section>
  );
}