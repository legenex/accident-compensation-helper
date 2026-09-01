import React from "react";

function LegalShell({ title, updated, sections }) {
  return (
    <div className="mx-auto max-w-3xl px-6 py-24">
      <h1 className="font-heading text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl">{title}</h1>
      <p className="mt-3 text-sm text-muted-foreground">Last updated: {updated}</p>
      <div className="mt-12 space-y-10">
        {sections.map((s, i) => (
          <section key={i}>
            <h2 className="font-heading text-xl font-bold text-foreground">{s.h}</h2>
            <p className="mt-3 leading-relaxed text-muted-foreground">{s.p}</p>
          </section>
        ))}
      </div>
    </div>
  );
}

export default function AdvertisingDisclosure() {
  return (
    <LegalShell
      title="Advertising Disclosure"
      updated="September 2026"
      sections={[
        { h: "How we are compensated", p: "Accident Compensation Helper is a free service for consumers. We are compensated by attorneys in our network who pay to participate. This compensation may affect how or where attorneys appear." },
        { h: "Not a law firm", p: "We are not a law firm and do not provide legal advice. We do not endorse any particular attorney. The choice of attorney is yours." },
        { h: "No guarantee", p: "Estimates and outcomes shown on this site are illustrative. We make no guarantee of any result. Your case is unique and should be evaluated by a licensed attorney." },
        { h: "Attorney listings", p: "Attorney listings do not constitute a referral or endorsement by us. Attorneys are responsible for the information they provide about themselves." },
      ]}
    />
  );
}