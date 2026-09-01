import React from "react";
import { Link } from "react-router-dom";
import { Check, X, ArrowRight } from "lucide-react";

export default function BeforeAfter() {
  return (
    <section className="bg-secondary/40 py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">From confusion to clarity</p>
          <h2 className="mt-4 font-heading text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl">
            See how we transform your experience
          </h2>
        </div>

        <div className="mt-14 grid gap-6 lg:grid-cols-2">
          <div className="rounded-3xl border border-border bg-card p-9 shadow-lift">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">Before</p>
            <h3 className="mt-3 font-heading text-2xl font-bold text-foreground">Without Accident Compensation Helper</h3>
            <ul className="mt-6 space-y-4">
              {["Stressed and unsure if you even have a case", "Buried in medical bills or lost income with no help", "Confused by insurance offers or legal steps"].map((t) => (
                <li key={t} className="flex items-start gap-3 text-foreground/80">
                  <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-destructive/10 text-destructive">
                    <X className="h-3.5 w-3.5" />
                  </span>
                  {t}
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-3xl border border-primary/30 bg-primary/[0.04] p-9 shadow-float">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">After</p>
            <h3 className="mt-3 font-heading text-2xl font-bold text-foreground">With Accident Compensation Helper</h3>
            <ul className="mt-6 space-y-4">
              {["Clear answers on whether you might qualify, in minutes", "Matched with a top attorney suited to your case, at no upfront cost", "Peace of mind knowing someone is fighting for what you deserve"].map((t) => (
                <li key={t} className="flex items-start gap-3 text-foreground/90">
                  <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/15 text-primary">
                    <Check className="h-3.5 w-3.5" />
                  </span>
                  {t}
                </li>
              ))}
            </ul>
            <Link to="/claim" className="group mt-8 inline-flex items-center gap-2 text-sm font-semibold text-primary">
              See if you qualify now
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}