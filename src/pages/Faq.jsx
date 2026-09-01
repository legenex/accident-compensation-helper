import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ChevronDown } from "lucide-react";
import PageHero from "@/components/site/PageHero";
import Meta from "@/components/site/Meta";
import { HOME_FAQ } from "@/lib/siteContent";

export default function Faq() {
  const [open, setOpen] = useState(0);
  const faqJson = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: HOME_FAQ.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
  };
  return (
    <>
      <Meta title="FAQ | Accident Compensation Helper" description="Answers to common questions about the claim check, how we work, attorney connection, and your privacy." canonical="/faq" />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJson) }} />
      <PageHero eyebrow="FAQ" title="Frequently asked questions" subtitle="Common questions about the claim check and how Accident Compensation Helper works." crumbs={[{ label: "Home", to: "/" }, { label: "FAQ" }]} />
      <section className="mx-auto max-w-3xl px-6 py-16">
        <div className="divide-y divide-softblue-border rounded-2xl bg-card shadow-lift ring-1 ring-softblue-border">
          {HOME_FAQ.map((f, i) => (
            <div key={i}>
              <button onClick={() => setOpen(open === i ? -1 : i)} className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left" aria-expanded={open === i}>
                <span className="font-heading text-base font-bold text-foreground">{f.q}</span>
                <ChevronDown className={`h-5 w-5 shrink-0 text-primary transition-transform ${open === i ? "rotate-180" : ""}`} />
              </button>
              {open === i && <p className="px-6 pb-5 text-muted-foreground leading-relaxed">{f.a}</p>}
            </div>
          ))}
        </div>
        <div className="mt-10 rounded-2xl bg-secondary/60 p-7 text-center">
          <h2 className="font-heading text-xl font-bold text-foreground">Still have questions?</h2>
          <p className="mt-2 text-muted-foreground">Try the free claim check or contact us.</p>
          <div className="mt-5 flex justify-center gap-3">
            <Link to="/claim" className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white shadow-float">Start the claim check</Link>
            <Link to="/contact" className="inline-flex items-center gap-2 rounded-full bg-card px-6 py-3 text-sm font-semibold text-foreground ring-1 ring-softblue-border">Contact us</Link>
          </div>
        </div>
      </section>
    </>
  );
}