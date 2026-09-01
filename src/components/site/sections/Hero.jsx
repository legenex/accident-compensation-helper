import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, ShieldCheck, BadgeDollarSign, Clock } from "lucide-react";
import { Image } from "@/components/ui/image";

const HERO_IMG = "https://media.base44.com/images/public/6a9667f0d469f05277f69ab4/f5d909a06_generated_image.png";

export default function Hero() {
  return (
    <section className="relative">
      {/* background photo */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <Image src={HERO_IMG} alt="Car accident scene on a suburban street" className="block h-full w-full" fittingType="fill" focalPointX={0.5} focalPointY={0.45} />
        <div className="absolute inset-0 bg-navy/45" />
      </div>

      <div className="mx-auto max-w-7xl px-6 pb-24 pt-32 lg:pb-32 lg:pt-44">
        <div className="max-w-2xl rounded-2xl bg-white/90 p-8 shadow-float backdrop-blur-md lg:p-12">
          <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-xs font-semibold text-primary">
            <span className="h-1.5 w-1.5 rounded-full bg-primary" />
            100% Free. No win, no fee. Fast results.
          </span>
          <h1 className="mt-6 font-heading text-4xl font-extrabold uppercase leading-[1.05] tracking-tight text-primary sm:text-5xl lg:text-6xl">
            Injured in an accident?
          </h1>
          <p className="mt-4 font-heading text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
            Get the compensation you deserve
          </p>
          <p className="mt-5 max-w-xl text-base text-muted-foreground">
            Unsure if you have a case after an accident? Our tool instantly checks if you may qualify for
            compensation and matches you with the best-suited attorney, at no upfront cost.
          </p>
          <div className="mt-8 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
            <Link
              to="/claim"
              className="group inline-flex items-center gap-2 rounded-full bg-primary px-7 py-4 text-base font-semibold text-white shadow-float transition-transform hover:scale-[1.02]"
            >
              Start Your Free Claim Check
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
            <span className="text-sm font-medium text-muted-foreground">Takes less than 2 minutes</span>
          </div>

          <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3">
            {[
              { icon: ShieldCheck, label: "Vetted Attorneys Only" },
              { icon: BadgeDollarSign, label: "No Upfront Fees" },
              { icon: Clock, label: "Results in Minutes" },
            ].map((b) => (
              <div key={b.label} className="flex items-center gap-2">
                <b.icon className="h-4 w-4 text-primary" />
                <span className="text-sm font-medium text-foreground/80">{b.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* soft cyan section divider */}
      <div className="h-1 w-full bg-accent" />
    </section>
  );
}