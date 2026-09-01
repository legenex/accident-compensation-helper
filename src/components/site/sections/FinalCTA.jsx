import React from "react";
import { Link } from "react-router-dom";
import { Image } from "@/components/ui/image";
import { IMAGES } from "@/lib/siteContent";

export default function FinalCTA() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0">
        <Image src={IMAGES.hero} alt="A person beside a damaged vehicle after an accident" className="block h-full w-full" fittingType="fill" focalPointX={0.5} focalPointY={0.5} />
        <div className="absolute inset-0 bg-navy/80" />
      </div>
      <div className="relative z-10 mx-auto max-w-[1280px] px-6 py-24 text-center text-white">
        <h2 className="mx-auto max-w-3xl font-heading text-3xl font-extrabold tracking-tight sm:text-5xl">
          Take the free claim check and understand your next step.
        </h2>
        <p className="mx-auto mt-5 max-w-xl text-lg text-white/75">
          It takes about two minutes, is free to use, and there is no obligation. You decide whether to request contact
          with a participating attorney.
        </p>
        <Link to="/claim" className="mt-9 inline-flex items-center gap-2 rounded-full bg-primary px-8 py-4 text-base font-semibold text-white shadow-float transition-transform hover:scale-[1.02]">
          Start the free claim check
        </Link>
      </div>
    </section>
  );
}