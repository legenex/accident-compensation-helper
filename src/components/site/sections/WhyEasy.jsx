import React from "react";
import { Link } from "react-router-dom";
import { Zap, Handshake, BadgeDollarSign } from "lucide-react";

const features = [
  { icon: Zap, title: "Fast Eligibility Check", desc: "Get instant results in minutes. Simply answer a few quick questions about your accident to see if you may qualify for compensation." },
  { icon: Handshake, title: "Seamless Attorney Matching", desc: "If eligible, we connect you with the best-suited attorney from our vetted network. No endless searching or cold calling required." },
  { icon: BadgeDollarSign, title: "Always 100% Free", desc: "Our claim check service is completely free. We never charge you. Our job is simply to check eligibility and connect you with attorneys." },
];

export default function WhyEasy() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-24">
      <div className="max-w-2xl">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">Why choose us</p>
        <h2 className="mt-4 font-heading text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl">
          We make injury claims easy
        </h2>
        <p className="mt-4 text-lg text-muted-foreground">
          Navigating the legal process shouldn't be complicated. We've streamlined everything to get you the help you
          need, when you need it.
        </p>
      </div>

      <div className="mt-12 grid gap-6 md:grid-cols-3">
        {features.map((f) => (
          <div key={f.title} className="rounded-2xl border border-border bg-card p-8 shadow-lift transition-transform hover:-translate-y-1">
            <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <f.icon className="h-6 w-6" />
            </span>
            <h3 className="mt-5 font-heading text-xl font-bold text-foreground">{f.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{f.desc}</p>
          </div>
        ))}
      </div>

      <div className="mt-10 text-center">
        <Link to="/claim" className="inline-flex items-center gap-2 rounded-full bg-primary px-7 py-4 text-base font-semibold text-white shadow-float transition-transform hover:scale-[1.02]">
          Get Started Now
        </Link>
      </div>
    </section>
  );
}