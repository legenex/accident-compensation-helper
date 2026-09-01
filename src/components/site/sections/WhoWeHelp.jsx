import React from "react";
import { Link } from "react-router-dom";
import { Check } from "lucide-react";

const people = [
  "Injured in a car, truck, or rideshare accident in the last 12 months",
  "Struggling with medical bills, lost wages, or ongoing pain after a crash",
  "Unsure if you have a valid claim or if insurance offered enough",
  "Looking for a trusted way to connect with an attorney at no upfront cost",
];

export default function WhoWeHelp() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-24">
      <div className="grid items-center gap-12 lg:grid-cols-2">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">Who we help</p>
          <h2 className="mt-4 font-heading text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl">
            Who can Accident Compensation Helper help?
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            If you've been in an accident, you might benefit from our free claim check. Here's who we're here for:
          </p>
          <ul className="mt-8 space-y-4">
            {people.map((p) => (
              <li key={p} className="flex items-start gap-3 text-foreground/90">
                <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/15 text-primary">
                  <Check className="h-3.5 w-3.5" />
                </span>
                {p}
              </li>
            ))}
          </ul>
          <Link to="/claim" className="mt-9 inline-flex items-center gap-2 rounded-full bg-primary px-7 py-4 text-base font-semibold text-white shadow-float transition-transform hover:scale-[1.02]">
            See If You Qualify Now
          </Link>
        </div>

        <div className="relative">
          <div className="absolute -inset-4 -z-10 rounded-[2rem] bg-gradient-to-tr from-primary/10 to-chart-4/10 blur-2xl" />
          <div className="overflow-hidden rounded-[2rem] border border-border bg-card shadow-float">
            <img
              src="https://images.unsplash.com/photo-1576091160550-2173dba9991f?auto=format&fit=crop&w=1200&q=80"
              alt="A person receiving supportive care after an accident"
              className="h-full w-full object-cover"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </section>
  );
}