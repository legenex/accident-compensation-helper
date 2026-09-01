import React from "react";
import { Link } from "react-router-dom";
import { ShieldCheck, Check } from "lucide-react";

const points = [
  "Free claim eligibility check, always 100% free",
  "Connected to attorneys who work on contingency",
  "Attorneys only get paid if you win your case",
  "No upfront costs or surprise bills from matched attorneys",
];

export default function Guarantee() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-24">
      <div className="overflow-hidden rounded-3xl border border-border bg-gradient-to-br from-foreground to-[#1e293b] p-10 text-white shadow-float sm:p-16">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">Our guarantee</p>
            <h2 className="mt-4 font-heading text-4xl font-extrabold tracking-tight sm:text-5xl">
              Our attorneys don't get paid unless you do
            </h2>
            <p className="mt-5 max-w-lg text-white/70">
              We connect you with vetted attorneys who work on a "no win, no fee" basis. This means the attorneys we
              match you with will not charge you a cent if they do not secure a positive outcome in your case.
            </p>
            <ul className="mt-8 space-y-3">
              {points.map((p) => (
                <li key={p} className="flex items-start gap-3 text-white/90">
                  <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/20 text-primary">
                    <Check className="h-3.5 w-3.5" />
                  </span>
                  {p}
                </li>
              ))}
            </ul>
            <Link to="/claim" className="mt-9 inline-flex items-center gap-2 rounded-full bg-primary px-7 py-4 text-base font-semibold text-white shadow-float transition-transform hover:scale-[1.02]">
              <ShieldCheck className="h-5 w-5" />
              Start Your Free Claim Check
            </Link>
          </div>

          <div className="relative">
            <div className="glass-dark rounded-3xl border border-white/10 p-8">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">You have nothing to lose</p>
              <div className="mt-6 grid grid-cols-2 gap-4">
                <div className="rounded-2xl bg-white/5 p-5">
                  <p className="text-xs text-white/60">Success rate</p>
                  <p className="mt-1 font-heading text-4xl font-extrabold">98%</p>
                </div>
                <div className="rounded-2xl bg-white/5 p-5">
                  <p className="text-xs text-white/60">Recovered</p>
                  <p className="mt-1 font-heading text-4xl font-extrabold">$50M+</p>
                </div>
                <div className="col-span-2 rounded-2xl bg-primary/15 p-5">
                  <p className="text-xs text-primary">Zero risk guarantee</p>
                  <p className="mt-1 font-heading text-2xl font-bold">100% Free</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}