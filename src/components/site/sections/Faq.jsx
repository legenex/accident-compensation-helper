import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ChevronDown } from "lucide-react";

const faqs = [
  { q: "How does Accident Compensation Helper help me find a personal injury lawyer?", a: "If you're searching for a personal injury lawyer after an accident, we help you start with a quick eligibility check instead of calling random firms. If your case looks like a fit, we connect you with a vetted attorney for a review. We are not a law firm and do not provide legal advice." },
  { q: "What is the difference between a personal injury attorney and a personal injury lawyer?", a: "The terms are used interchangeably. Both refer to a licensed legal professional who represents injured parties. What matters is their experience with cases like yours and their willingness to work on contingency." },
  { q: "When should I talk to an injury lawyer after an accident?", a: "As soon as possible. Evidence can disappear, memories fade, and deadlines (statutes of limitation) apply. A free claim check takes minutes and helps you understand whether a conversation makes sense." },
  { q: "Do I need a lawyer to file a motor vehicle accident claim?", a: "You can file a claim yourself, but insurance adjusters are trained to minimize payouts. An attorney helps value your full damages, including future medical costs and pain and suffering, and levels the playing field." },
  { q: "Do I qualify if I was partly at fault?", a: "Possibly. Many states follow comparative negligence rules, meaning you can still recover compensation reduced by your share of fault. The claim check asks about fault to estimate this." },
  { q: "What should I ask before hiring a car accident injury lawyer?", a: "Ask about their experience with similar cases, their fee structure (most work on contingency), who will actually handle your case, and how they communicate updates." },
];

export default function Faq() {
  const [open, setOpen] = useState(0);
  return (
    <section id="faq" className="mx-auto max-w-4xl px-6 py-24">
      <div className="text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">FAQ</p>
        <h2 className="mt-4 font-heading text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl">
          Frequently asked questions
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-lg text-muted-foreground">Got questions? We've got answers.</p>
      </div>

      <div className="mt-12 space-y-3">
        {faqs.map((f, i) => (
          <div key={f.q} className="overflow-hidden rounded-2xl border border-border bg-card shadow-lift">
            <button
              onClick={() => setOpen(open === i ? -1 : i)}
              className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
            >
              <span className="font-heading text-base font-bold text-foreground">{f.q}</span>
              <ChevronDown className={`h-5 w-5 shrink-0 text-primary transition-transform ${open === i ? "rotate-180" : ""}`} />
            </button>
            <div className={`grid transition-all duration-300 ${open === i ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}>
              <div className="overflow-hidden">
                <p className="px-6 pb-6 text-sm leading-relaxed text-muted-foreground">{f.a}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-12 text-center">
        <p className="text-muted-foreground">Still have questions? Start your free claim check now.</p>
        <Link to="/claim" className="mt-5 inline-flex items-center gap-2 rounded-full bg-primary px-7 py-4 text-base font-semibold text-white shadow-float transition-transform hover:scale-[1.02]">
          Get Started Now
        </Link>
      </div>
    </section>
  );
}