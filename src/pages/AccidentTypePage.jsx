import React, { useState } from "react";
import { useParams, Link, Navigate } from "react-router-dom";
import { ChevronDown, Check, ArrowRight } from "lucide-react";
import { Image } from "@/components/ui/image";
import PageHero from "@/components/site/PageHero";
import Meta from "@/components/site/Meta";
import { ACCIDENT_TYPES } from "@/lib/siteContent";

function Section({ title, items }) {
  return (
    <div>
      <h2 className="font-heading text-xl font-bold text-foreground">{title}</h2>
      <ul className="mt-4 space-y-2.5">
        {items.map((it) => (
          <li key={it} className="flex items-start gap-3">
            <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/15 text-primary">
              <Check className="h-3.5 w-3.5" />
            </span>
            <span className="text-foreground/90">{it}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function AccidentTypePage() {
  const { slug } = useParams();
  const [faqOpen, setFaqOpen] = useState(0);
  const t = ACCIDENT_TYPES.find((a) => a.slug === slug);
  if (!t) return <Navigate to="/accident-types" replace />;

  const faqJson = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: t.faq.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <>
      <Meta title={t.metaTitle} description={t.metaDescription} canonical={`/accident-types/${t.slug}`} image={t.image} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJson) }} />
      <PageHero eyebrow="Accident Types" title={t.label} subtitle={t.short} crumbs={[{ label: "Home", to: "/" }, { label: "Accident Types", to: "/accident-types" }, { label: t.label }]} />

      <section className="mx-auto max-w-[1280px] px-6 py-16">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-start">
          <div className="overflow-hidden rounded-2xl shadow-float">
            <Image src={t.image} alt={t.label} className="block aspect-[4/3] w-full" fittingType="fill" focalPointX={0.5} focalPointY={0.45} />
          </div>
          <div>
            <p className="text-lg leading-relaxed text-muted-foreground">{t.intro}</p>
            <Link to="/claim" className="mt-7 inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3.5 text-base font-semibold text-white shadow-float transition-transform hover:scale-[1.02]">
              Check my claim <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>

        <div className="mt-14 grid gap-10 sm:grid-cols-2">
          <Section title="Common causes" items={t.causes} />
          <Section title="Common injuries" items={t.injuries} />
          <Section title="Evidence that may be useful" items={t.evidence} />
          <div>
            <h2 className="font-heading text-xl font-bold text-foreground">Potential insurance considerations</h2>
            <p className="mt-4 text-foreground/90 leading-relaxed">{t.insurance}</p>
          </div>
        </div>

        <div className="mt-14 rounded-2xl bg-secondary/60 p-8">
          <h2 className="font-heading text-xl font-bold text-foreground">General next steps</h2>
          <p className="mt-3 text-foreground/90">If this situation sounds like yours, the free claim check can help organize the important details and indicate whether speaking with a participating attorney may be useful.</p>
          <Link to="/claim" className="mt-5 inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3.5 text-base font-semibold text-white shadow-float transition-transform hover:scale-[1.02]">
            Start the free claim check
          </Link>
        </div>

        <div className="mt-14">
          <h2 className="font-heading text-2xl font-bold text-foreground">Frequently asked questions</h2>
          <div className="mt-6 divide-y divide-softblue-border rounded-2xl bg-card shadow-lift ring-1 ring-softblue-border">
            {t.faq.map((f, i) => (
              <div key={i}>
                <button onClick={() => setFaqOpen(faqOpen === i ? -1 : i)} className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left" aria-expanded={faqOpen === i}>
                  <span className="font-heading text-base font-bold text-foreground">{f.q}</span>
                  <ChevronDown className={`h-5 w-5 shrink-0 text-primary transition-transform ${faqOpen === i ? "rotate-180" : ""}`} />
                </button>
                {faqOpen === i && <p className="px-6 pb-5 text-muted-foreground leading-relaxed">{f.a}</p>}
              </div>
            ))}
          </div>
        </div>

        <p className="mt-12 rounded-xl bg-card p-5 text-sm text-muted-foreground ring-1 ring-softblue-border">
          This page provides general information and is not legal advice. A licensed attorney can advise you about your
          particular circumstances.
        </p>
      </section>
    </>
  );
}