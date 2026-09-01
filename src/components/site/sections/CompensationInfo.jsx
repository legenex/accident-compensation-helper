import React from "react";
import { Link } from "react-router-dom";
import { COMPENSATION_CATEGORIES } from "@/lib/siteContent";

export default function CompensationInfo() {
  return (
    <section className="bg-navy py-20 text-white">
      <div className="mx-auto max-w-[1280px] px-6">
        <div className="max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">Compensation</p>
          <h2 className="mt-4 font-heading text-3xl font-extrabold tracking-tight sm:text-4xl">
            What may be included in an accident claim?
          </h2>
          <p className="mt-4 text-lg text-white/70">
            Available damages depend on the facts, applicable law, insurance coverage, evidence, and other circumstances.
            Not every category applies to every situation.
          </p>
        </div>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {COMPENSATION_CATEGORIES.map((c) => (
            <div key={c.title} className="rounded-2xl bg-white/5 p-6 ring-1 ring-white/10">
              <h3 className="font-heading text-base font-bold text-white">{c.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-white/65">{c.desc}</p>
            </div>
          ))}
        </div>

        <p className="mt-10 max-w-3xl rounded-xl bg-white/5 p-5 text-sm text-white/70 ring-1 ring-white/10">
          Compensation is not guaranteed. A licensed attorney can advise you about your particular circumstances.
        </p>

        <Link to="/claim" className="mt-8 inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3.5 text-base font-semibold text-white shadow-float transition-transform hover:scale-[1.02]">
          Start the free claim check
        </Link>
      </div>
    </section>
  );
}