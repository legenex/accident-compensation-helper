import React, { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import { ArrowRight, Check, ShieldCheck, Lock } from "lucide-react";
import { formatCurrency } from "@/lib/claimEngine";
import PublicNav from "@/components/site/PublicNav";
import Meta from "@/components/site/Meta";
import { useSiteSettings, trackEvent } from "@/lib/useSite";

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

  const pct = 78;
  const r = 130;
  const c = 2 * Math.PI * r;
  return (
    <div className="relative flex h-72 w-72 items-center justify-center">
      <svg className="absolute inset-0 -rotate-90" viewBox="0 0 300 300">
        <circle cx="150" cy="150" r={r} fill="none" stroke="hsl(var(--border))" strokeWidth="16" />
        <circle cx="150" cy="150" r={r} fill="none" stroke="hsl(var(--primary))" strokeWidth="16" strokeLinecap="round" strokeDasharray={c} strokeDashoffset={c - (c * pct) / 100} style={{ transition: "stroke-dashoffset 1.4s cubic-bezier(0.22,1,0.36,1)" }} />
      </svg>
      <div className="text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">Informational estimate only</p>
        <p className="mt-1 font-heading text-4xl font-extrabold text-foreground">{formatCurrency(val)}</p>
        <p className="mt-1 text-sm text-muted-foreground">{formatCurrency(low)} - {formatCurrency(high)}</p>
      </div>
    </div>
  );
}

const timeline = [
  { title: "Review your result", desc: "Read the informational assessment based on the answers you provided. This is not a legal opinion or guarantee." },
  { title: "Choose whether to request contact", desc: "If you would like, you can consent to be contacted by Accident Compensation Helper and participating providers." },
  { title: "Speak with a participating attorney", desc: "Any legal advice, representation, or fee agreement is handled directly between you and the attorney." },
];

export default function ClaimResult() {
  const { state } = useLocation();
  const [data, setData] = useState(state);
  const settings = useSiteSettings();

  useEffect(() => {
    window.scrollTo(0, 0);
    trackEvent("claim_check_complete");
  }, []);

  if (!data) {
    return (
      <div className="min-h-screen pt-16">
        <PublicNav />
        <div className="mx-auto max-w-2xl px-6 py-32 text-center">
          <h1 className="font-heading text-3xl font-bold">No result found</h1>
          <p className="mt-3 text-muted-foreground">Please complete the free claim check to see your result.</p>
          <Link to="/claim" className="mt-8 inline-flex items-center gap-2 rounded-full bg-primary px-7 py-4 font-semibold text-white shadow-float">
            Start the claim check <ArrowRight className="h-4 w-4" />
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
  const phone = settings?.phone_enabled ? settings.support_phone : null;

  return (
    <div className="min-h-screen bg-gradient-to-b from-secondary/40 via-background to-background pt-16">
      <Meta title="Your Claim Check Result | Accident Compensation Helper" description="Your informational claim-check result. This is not legal advice or a guarantee of any outcome." canonical="/claim/result" noindex />
      <PublicNav />
      <div className="mx-auto max-w-5xl px-6 py-20">
        <div className="text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">Your result</p>
          <h1 className="mt-4 font-heading text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl">
            {qualified ? "Your situation may be worth reviewing further" : "Your case needs a closer look"}
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
            Based on the information you provided, your situation may be worth reviewing further. This is an
            informational estimate only and is not a settlement offer, legal advice, or a prediction of any outcome.
          </p>
        </div>

        {qualified && (
          <div className="mt-14 grid items-center gap-10 lg:grid-cols-2">
            <div className="flex justify-center">
              <Gauge low={low} high={high} />
            </div>
            <div>
              <div className="rounded-3xl border border-softblue-border bg-card p-8 shadow-float">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">Informational estimate only</p>
                <p className="mt-2 font-heading text-2xl font-extrabold text-foreground">{formatCurrency(low)} - {formatCurrency(high)}</p>
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                  This estimate is generated from limited user-provided information. It is not a settlement offer, legal
                  advice, or a guarantee. Applicable law, evidence, insurance coverage, injuries, treatment, and other
                  facts may materially change the result. A participating attorney must independently review your situation.
                </p>
              </div>
              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                {phone ? (
                  <a href={`tel:${phone.replace(/\D/g, "")}`} className="inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-primary px-7 py-4 text-base font-semibold text-white shadow-float transition-transform hover:scale-[1.02]">
                    Request an attorney review
                  </a>
                ) : (
                  <Link to="/contact" className="inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-primary px-7 py-4 text-base font-semibold text-white shadow-float transition-transform hover:scale-[1.02]">
                    Request an attorney review
                  </Link>
                )}
                <Link to="/contact" className="inline-flex flex-1 items-center justify-center gap-2 rounded-full border border-softblue-border bg-card px-7 py-4 text-base font-semibold text-foreground transition-colors hover:bg-secondary">
                  Request a callback
                </Link>
              </div>
            </div>
          </div>
        )}

        {!qualified && (
          <div className="mt-14 rounded-3xl border border-softblue-border bg-card p-8 shadow-float">
            <p className="text-foreground/90 leading-relaxed">
              Some of your answers suggest this may not qualify right now. This is not a legal opinion or a guarantee.
              A participating attorney can still review your options, as the facts of your situation may differ from
              what the claim check can assess.
            </p>
            <Link to="/contact" className="mt-6 inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3.5 text-base font-semibold text-white shadow-float transition-transform hover:scale-[1.02]">
              Request an attorney review
            </Link>
          </div>
        )}

        <div className="mt-20">
          <h2 className="text-center font-heading text-3xl font-extrabold tracking-tight">What happens next</h2>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {timeline.map((t, i) => (
              <div key={t.title} className="relative rounded-2xl border border-softblue-border bg-card p-7 shadow-lift">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-white font-heading font-bold">{i + 1}</span>
                <h3 className="mt-5 font-heading text-lg font-bold text-foreground">{t.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{t.desc}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-16 rounded-3xl border border-softblue-border bg-card p-8 shadow-lift">
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

        <div className="mt-12 rounded-2xl bg-secondary/60 p-6 text-sm text-muted-foreground">
          <p className="flex items-center gap-2"><Lock className="h-4 w-4 text-primary" /> Your information is handled securely. See our Privacy Policy for details.</p>
          <p className="mt-2">This result is an informational estimate only and is not legal advice. A licensed attorney can advise you about your particular circumstances.</p>
        </div>
      </div>
    </div>
  );
}