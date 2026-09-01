import React, { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import { Phone, ArrowRight, Check, ShieldCheck } from "lucide-react";
import { formatCurrency } from "@/lib/claimEngine";
import PublicNav from "@/components/site/PublicNav";

function Gauge({ low, high }) {
  const [val, setVal] = useState(0);
  const target = high;
  useEffect(() => {
    let raf;
    const start = performance.now();
    const dur = 1400;
    const tick = (now) => {
      const p = Math.min((now - start) / dur, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setVal(Math.round(target * eased));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target]);

  const pct = 78; // visual fill
  const r = 130;
  const c = 2 * Math.PI * r;
  return (
    <div className="relative flex h-72 w-72 items-center justify-center">
      <svg className="absolute inset-0 -rotate-90" viewBox="0 0 300 300">
        <circle cx="150" cy="150" r={r} fill="none" stroke="hsl(var(--border))" strokeWidth="16" />
        <circle
          cx="150"
          cy="150"
          r={r}
          fill="none"
          stroke="hsl(var(--primary))"
          strokeWidth="16"
          strokeLinecap="round"
          strokeDasharray={c}
          strokeDashoffset={c - (c * pct) / 100}
          style={{ transition: "stroke-dashoffset 1.4s cubic-bezier(0.22,1,0.36,1)" }}
        />
      </svg>
      <div className="text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">Estimated range</p>
        <p className="mt-1 font-heading text-4xl font-extrabold text-foreground">{formatCurrency(val)}</p>
        <p className="mt-1 text-sm text-muted-foreground">{formatCurrency(low)} - {formatCurrency(high)}</p>
      </div>
    </div>
  );
}

const timeline = [
  { title: "We review your claim", desc: "Our team reviews your answers and confirms eligibility within 24 hours." },
  { title: "Matched with an attorney", desc: "We connect you with a vetted attorney suited to your case, at no upfront cost." },
  { title: "Your attorney takes over", desc: "Your attorney handles the insurance companies and fights for your full compensation." },
];

export default function ClaimResult() {
  const { state } = useLocation();
  const [data, setData] = useState(state);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!data) {
    return (
      <div className="min-h-screen pt-16">
        <PublicNav />
        <div className="mx-auto max-w-2xl px-6 py-32 text-center">
          <h1 className="font-heading text-3xl font-bold">No result found</h1>
          <p className="mt-3 text-muted-foreground">Please complete the free claim check to see your estimate.</p>
          <Link to="/claim" className="mt-8 inline-flex items-center gap-2 rounded-full bg-primary px-7 py-4 font-semibold text-white shadow-float">
            Start Your Free Claim Check <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    );
  }

  const est = data.estimate || data;
  const answers = data.answers || {};
  const tier = data.tier || (data.status === "Disqualified" ? "DQ" : "T3");
  const qualified = tier !== "DQ";
  const low = est.range_low;
  const high = est.range_high;
  const representedLow = est.represented_low;
  const representedHigh = est.represented_high;

  return (
    <div className="min-h-screen bg-gradient-to-b from-secondary/40 via-background to-background pt-16">
      <PublicNav />
      <div className="mx-auto max-w-5xl px-6 py-20">
        <div className="text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">Your result</p>
          <h1 className="mt-4 font-heading text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl">
            {qualified ? "You may qualify for compensation" : "Your case needs a closer look"}
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-lg text-muted-foreground">
            {qualified
              ? "Based on your answers, here is an estimated compensation range. An attorney can often recover more."
              : "Some answers suggest this may not qualify right now, but an attorney can still review your options."}
          </p>
        </div>

        <div className="mt-14 grid items-center gap-10 lg:grid-cols-2">
          <div className="flex justify-center">
            <Gauge low={low} high={high} />
          </div>

          <div>
            <div className="rounded-3xl border border-border bg-card p-8 shadow-float">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Unrepresented estimate</p>
                  <p className="font-heading text-2xl font-extrabold text-foreground">{formatCurrency(low)} - {formatCurrency(high)}</p>
                </div>
                <span className="rounded-full bg-secondary px-3 py-1 text-xs font-medium text-muted-foreground">Self-filing</span>
              </div>
              <div className="my-6 h-px bg-border" />
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-primary">With a vetted attorney</p>
                  <p className="font-heading text-3xl font-extrabold text-primary">{formatCurrency(representedLow)} - {formatCurrency(representedHigh)}</p>
                </div>
                <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">Often higher</span>
              </div>
              <p className="mt-5 text-sm text-muted-foreground">
                This is an estimate based on your answers and typical outcomes, not legal advice or a guarantee.
              </p>
            </div>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <a
                href="tel:18002534243"
                className="animate-soft-pulse inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-primary px-7 py-4 text-base font-semibold text-white shadow-float transition-transform hover:scale-[1.02]"
              >
                <Phone className="h-5 w-5" />
                Call a Legal Expert Now
              </a>
              <Link
                to="/contact"
                className="inline-flex flex-1 items-center justify-center gap-2 rounded-full border border-border bg-card px-7 py-4 text-base font-semibold text-foreground transition-colors hover:bg-secondary"
              >
                Get a Call Back
              </Link>
            </div>
          </div>
        </div>

        {/* timeline */}
        <div className="mt-20">
          <h2 className="text-center font-heading text-3xl font-extrabold tracking-tight">What happens next</h2>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {timeline.map((t, i) => (
              <div key={t.title} className="relative rounded-2xl border border-border bg-card p-7 shadow-lift">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-white font-heading font-bold">{i + 1}</span>
                <h3 className="mt-5 font-heading text-lg font-bold text-foreground">{t.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{t.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* summary */}
        <div className="mt-16 rounded-3xl border border-border bg-card p-8 shadow-lift">
          <h3 className="font-heading text-xl font-bold text-foreground">Your claim summary</h3>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[
              ["Accident type", answers.accident_type],
              ["When it happened", answers.accident_date],
              ["Who was at fault", answers.at_fault],
              ["Medical treatment", answers.sought_treatment],
              ["Injury severity", answers.injury_tier],
              ["State", answers.state],
            ].filter(([, v]) => v).map(([k, v]) => (
              <div key={k} className="flex items-start gap-2.5">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                <div>
                  <p className="text-xs text-muted-foreground">{k}</p>
                  <p className="text-sm font-medium text-foreground">{v}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-12 flex items-center justify-center gap-2 text-sm text-muted-foreground">
          <ShieldCheck className="h-4 w-4 text-primary" />
          100% free. No obligation. No win, no fee.
        </div>
      </div>
    </div>
  );
}