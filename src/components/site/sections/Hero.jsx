import React from "react";
import { Link } from "react-router-dom";
import { ShieldCheck, Lock, Clock } from "lucide-react";
import { Image } from "@/components/ui/image";
import HeroClaimCard from "@/components/site/HeroClaimCard";
import { IMAGES } from "@/lib/siteContent";

export default function Hero() {
  return (
    <section className="relative bg-navy pt-16">
      <div className="mx-auto grid max-w-[1280px] lg:grid-cols-2 lg:items-stretch">
        {/* Left: content */}
        <div className="relative z-10 flex flex-col justify-center px-6 py-14 text-white lg:py-20 lg:pr-10">
          <span className="inline-flex w-fit items-center gap-2 rounded-full bg-primary/20 px-4 py-1.5 text-xs font-semibold text-white">
            <span className="h-1.5 w-1.5 rounded-full bg-primary" />
            Free and confidential claim check
          </span>
          <h1 className="mt-6 font-heading text-4xl font-extrabold leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">
            Injured in an accident?
          </h1>
          <p className="mt-4 font-heading text-xl font-semibold text-white/90 sm:text-2xl">
            Find out if you may qualify for compensation.
          </p>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-white/70">
            Answer a few questions about what happened. We will help you understand whether your situation may be worth
            discussing with a participating personal injury attorney. The claim check is free and takes about two minutes.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-white/60">
            <span className="inline-flex items-center gap-2"><Clock className="h-4 w-4 text-primary" /> Takes about 2 minutes</span>
            <span className="inline-flex items-center gap-2"><ShieldCheck className="h-4 w-4 text-primary" /> Free to use</span>
            <span className="inline-flex items-center gap-2"><Lock className="h-4 w-4 text-primary" /> Your information is handled securely</span>
          </div>
          <Link to="/claim" className="mt-8 inline-flex w-fit items-center gap-2 rounded-full bg-primary px-7 py-4 text-base font-semibold text-white shadow-float transition-transform hover:scale-[1.02] lg:hidden">
            Start the claim check
          </Link>
        </div>

        {/* Right: photo + interactive card */}
        <div className="relative min-h-[420px] lg:min-h-[680px]">
          <div className="absolute inset-0">
            <Image src={IMAGES.hero} alt="A person standing beside a damaged vehicle after a road accident, speaking with a supportive companion" className="block h-full w-full" fittingType="fill" focalPointX={0.5} focalPointY={0.4} />
          </div>
          <div className="absolute inset-0 bg-gradient-to-r from-navy via-navy/40 to-navy/10 lg:from-navy/70 lg:via-navy/30" />
          <div className="relative z-10 flex h-full items-center justify-center p-5 sm:p-8 lg:p-10">
            <HeroClaimCard />
          </div>
        </div>
      </div>
    </section>
  );
}