import React from "react";
import { Link } from "react-router-dom";
import { ShieldCheck, Lock, Clock, ArrowRight } from "lucide-react";
import HeroClaimCard from "@/components/site/HeroClaimCard";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-navy pt-16">
      {/* subtle background accent */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -right-40 top-0 h-[600px] w-[600px] rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute -left-20 bottom-0 h-[400px] w-[400px] rounded-full bg-primary/5 blur-3xl" />
      </div>

      <div className="relative mx-auto grid max-w-[1280px] lg:grid-cols-2 lg:gap-12">
        {/* Left: content */}
        <div className="flex flex-col justify-center px-6 py-16 text-white lg:py-24 lg:pr-6">
          <span className="inline-flex w-fit items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-xs font-semibold text-white">
            <span className="h-1.5 w-1.5 rounded-full bg-primary" />
            Free and confidential claim check
          </span>
          <h1 className="mt-6 font-heading text-4xl font-extrabold leading-[1.05] tracking-tight sm:text-5xl lg:text-[3.5rem]">
            Injured in an accident?
          </h1>
          <p className="mt-4 font-heading text-xl font-semibold text-white/90 sm:text-2xl">
            Find out if you may qualify for compensation.
          </p>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-white/65">
            Answer a few questions about what happened. We will help you understand whether your situation may be worth
            discussing with a participating personal injury attorney. The claim check is free and takes about two minutes.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2.5 text-sm text-white/55">
            <span className="inline-flex items-center gap-2"><Clock className="h-4 w-4 text-primary" /> Takes about 2 minutes</span>
            <span className="inline-flex items-center gap-2"><ShieldCheck className="h-4 w-4 text-primary" /> Free to use</span>
            <span className="inline-flex items-center gap-2"><Lock className="h-4 w-4 text-primary" /> Handled securely</span>
          </div>
          <Link
            to="/claim"
            className="mt-9 inline-flex w-fit items-center gap-2 rounded-full bg-primary px-7 py-4 text-base font-semibold text-white shadow-float transition-transform hover:scale-[1.02] lg:hidden"
          >
            Start the claim check <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {/* Right: interactive card */}
        <div className="flex items-center justify-center px-6 pb-16 lg:py-24 lg:pl-6">
          <div className="w-full max-w-md">
            <HeroClaimCard />
          </div>
        </div>
      </div>
    </section>
  );
}