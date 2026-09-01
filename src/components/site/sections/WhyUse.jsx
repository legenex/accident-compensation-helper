import React from "react";
import { Link } from "react-router-dom";
import { Check } from "lucide-react";
import { WHY_USE } from "@/lib/siteContent";

export default function WhyUse() {
  return (
    <section className="mx-auto max-w-[1280px] px-6 py-20">
      <div className="grid gap-12 lg:grid-cols-2 lg:items-start">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">Why use us</p>
          <h2 className="mt-4 font-heading text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
            A simple place to start
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Accident Compensation Helper is a free, confidential way to understand whether your situation may be worth
            reviewing further, before you decide whether to speak with a participating attorney.
          </p>
          <Link to="/claim" className="mt-8 inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3.5 text-base font-semibold text-white shadow-float transition-transform hover:scale-[1.02]">
            Start the free claim check
          </Link>
        </div>
        <ul className="grid gap-3 sm:grid-cols-2">
          {WHY_USE.map((w) => (
            <li key={w} className="flex items-start gap-3 rounded-xl bg-card p-4 ring-1 ring-softblue-border">
              <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/15 text-primary">
                <Check className="h-3.5 w-3.5" />
              </span>
              <span className="text-sm font-medium text-foreground/90">{w}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}