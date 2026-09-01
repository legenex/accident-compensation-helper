import React from "react";
import { Link } from "react-router-dom";
import { ClipboardCheck, Sparkles, UserCheck, ArrowRight } from "lucide-react";

const steps = [
  { n: "01", icon: ClipboardCheck, title: "Complete Our Free Eligibility Check", desc: "Answer a few quick questions about your accident. This service is 100% free with no obligations." },
  { n: "02", icon: Sparkles, title: "Get Your Results Instantly", desc: "Our tool analyzes your information to determine if you might qualify for compensation." },
  { n: "03", icon: UserCheck, title: "We Connect You to a Vetted Attorney", desc: "If eligible, we'll match you with a trusted attorney from our network who works on a no win, no fee basis." },
];

export default function Process() {
  return (
    <section id="how-it-works" className="mx-auto max-w-7xl px-6 py-24">
      <div className="text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">Your journey to justice</p>
        <h2 className="mt-4 font-heading text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl">
          Our simple 3-step process
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
          Getting help after an accident shouldn't be hard. Here's how Accident Compensation Helper works.
        </p>
      </div>

      <div className="relative mt-16 grid gap-6 lg:grid-cols-3">
        <div className="absolute left-0 right-0 top-12 hidden h-px bg-gradient-to-r from-transparent via-border to-transparent lg:block" />
        {steps.map((s) => (
          <div key={s.n} className="relative rounded-2xl border border-border bg-card p-8 shadow-lift">
            <div className="flex items-center justify-between">
              <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary text-white shadow-lift">
                <s.icon className="h-6 w-6" />
              </span>
              <span className="font-heading text-4xl font-extrabold text-border">{s.n}</span>
            </div>
            <h3 className="mt-6 font-heading text-xl font-bold text-foreground">{s.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.desc}</p>
          </div>
        ))}
      </div>

      <div className="mt-12 text-center">
        <Link
          to="/claim"
          className="group inline-flex items-center gap-2 rounded-full bg-primary px-7 py-4 text-base font-semibold text-white shadow-float transition-transform hover:scale-[1.02]"
        >
          Start Your Free Survey Now
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
        </Link>
      </div>
    </section>
  );
}