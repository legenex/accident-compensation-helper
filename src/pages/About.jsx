import React from "react";
import { Link } from "react-router-dom";
import { Users, Scale, BadgeDollarSign, HeartHandshake, ShieldCheck } from "lucide-react";

const stats = [
  { icon: Users, value: "10,000+", label: "People helped" },
  { icon: Scale, value: "500+", label: "Vetted attorneys" },
  { icon: BadgeDollarSign, value: "$0", label: "Upfront cost" },
  { icon: HeartHandshake, value: "100%", label: "Commitment" },
];

export default function About() {
  return (
    <div className="pt-16">
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-secondary/60 to-background" />
        <div className="mx-auto max-w-4xl px-6 py-24 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">About us</p>
          <h1 className="mt-5 font-heading text-5xl font-extrabold tracking-tight text-foreground sm:text-6xl">
            We fight for the compensation you deserve
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
            Accident Compensation Helper was built to remove the confusion from the claims process. We give accident
            victims a fast, free way to understand whether they have a case, and connect them with vetted attorneys who
            work on a no win, no fee basis.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label} className="rounded-2xl border border-border bg-card p-7 text-center shadow-lift">
              <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <s.icon className="h-6 w-6" />
              </span>
              <p className="mt-4 font-heading text-3xl font-extrabold text-foreground">{s.value}</p>
              <p className="mt-1 text-sm text-muted-foreground">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-6 py-16">
        <div className="rounded-3xl border border-border bg-card p-10 shadow-lift">
          <h2 className="font-heading text-3xl font-extrabold tracking-tight">Our mission</h2>
          <p className="mt-5 text-lg text-muted-foreground">
            After an accident, victims face mounting medical bills, lost income, and confusing insurance offers. We
            believe everyone deserves clarity. Our free claim check gives you an honest estimate in minutes, and our
            network of attorneys only gets paid when you win.
          </p>
          <div className="mt-8 flex items-center gap-2 text-sm text-muted-foreground">
            <ShieldCheck className="h-4 w-4 text-primary" />
            No win, no fee. No upfront costs. No obligation.
          </div>
          <Link to="/claim" className="mt-8 inline-flex items-center gap-2 rounded-full bg-primary px-7 py-4 text-base font-semibold text-white shadow-float transition-transform hover:scale-[1.02]">
            Start Your Free Claim Check
          </Link>
        </div>
      </section>
    </div>
  );
}