import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, ShieldCheck, BadgeDollarSign, Clock } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative overflow-hidden pt-16">
      {/* ambient background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-secondary/60 via-background to-background" />
        <div className="absolute -top-32 right-0 h-[480px] w-[480px] rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute top-40 -left-24 h-[360px] w-[360px] rounded-full bg-chart-4/10 blur-3xl" />
      </div>

      <div className="mx-auto grid max-w-7xl items-center gap-12 px-6 pb-24 pt-16 lg:grid-cols-2 lg:gap-8 lg:pt-24">
        {/* Left: headline */}
        <div className="animate-fade-rise">
          <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card/60 px-4 py-1.5 text-xs font-medium text-muted-foreground">
            <span className="h-1.5 w-1.5 rounded-full bg-primary" />
            100% Free. No win, no fee. Fast results.
          </span>
          <h1 className="mt-7 font-heading text-5xl font-extrabold leading-[1.04] tracking-tight text-foreground sm:text-6xl lg:text-7xl">
            Check your claim,
            <br />
            <span className="text-primary">get what you deserve.</span>
          </h1>
          <p className="mt-7 max-w-xl text-lg text-muted-foreground">
            Unsure if you have a case after an accident? Our tool instantly checks if you may qualify for
            compensation and matches you with the best-suited attorney, at no upfront cost.
          </p>
          <div className="mt-9 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
            <Link
              to="/claim"
              className="group inline-flex items-center gap-2 rounded-full bg-primary px-7 py-4 text-base font-semibold text-white shadow-float transition-transform hover:scale-[1.02]"
            >
              Start Your Free Claim Check
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
            <span className="text-sm text-muted-foreground">Takes less than 2 minutes</span>
          </div>

          <div className="mt-10 grid max-w-lg grid-cols-3 gap-3">
            {[
              { icon: ShieldCheck, label: "Vetted Attorneys Only" },
              { icon: BadgeDollarSign, label: "No Upfront Fees" },
              { icon: Clock, label: "Results in Minutes" },
            ].map((b) => (
              <div key={b.label} className="flex items-center gap-2.5 rounded-xl border border-border bg-card/50 px-3 py-3">
                <b.icon className="h-4 w-4 shrink-0 text-primary" />
                <span className="text-xs font-medium leading-tight text-foreground/80">{b.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right: floating Quick Check card */}
        <div className="relative lg:pl-8">
          <div className="glass relative overflow-hidden rounded-3xl border border-border/70 p-8 shadow-float animate-fade-rise" style={{ animationDelay: "120ms" }}>
            <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-primary/15 blur-2xl" />
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">Free Claim Check</p>
            <h3 className="mt-3 font-heading text-2xl font-bold text-foreground">Find out in minutes if you may qualify</h3>
            <p className="mt-2 text-sm text-muted-foreground">Answer a few quick questions. No obligation.</p>

            <div className="mt-6 grid grid-cols-2 gap-2">
              {["Auto", "Slip & Fall", "Work", "Medical"].map((t) => (
                <span key={t} className="rounded-xl border border-border bg-card/70 px-4 py-3 text-center text-sm font-medium text-foreground/80">
                  {t}
                </span>
              ))}
            </div>

            <div className="mt-6 flex items-end justify-between rounded-2xl bg-foreground px-5 py-5 text-white">
              <div>
                <p className="text-xs text-white/60">Upfront cost</p>
                <p className="font-heading text-3xl font-extrabold">$0</p>
              </div>
              <Link to="/claim" className="rounded-full bg-primary px-5 py-2.5 text-sm font-semibold transition-transform hover:scale-[1.03]">
                Check Now
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}