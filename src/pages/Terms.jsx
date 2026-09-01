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

export default function Terms() {
  return (
    <LegalShell
      title="Terms of Service"
      updated="September 2026"
      sections={[
        { h: "Acceptance of terms", p: "By using Accident Compensation Helper, you agree to these terms. If you do not agree, please do not use the service." },
        { h: "Our service", p: "We provide a free eligibility check and connect you with vetted attorneys. We are not a law firm and do not provide legal advice. Use of our service does not create an attorney-client relationship." },
        { h: "No guarantee of results", p: "Compensation estimates are provided for informational purposes only and are based on typical outcomes. They are not a guarantee of any result. Actual outcomes depend on the specifics of your case." },
        { h: "Attorney relationships", p: "Any attorney-client relationship is formed directly between you and the attorney, under their own engagement terms. We are not a party to that relationship." },
        { h: "No win, no fee", p: "Attorneys in our network work on a contingency basis, meaning they are paid only if you win your case. Specific fee arrangements are set by the attorney you engage." },
        { h: "Limitation of liability", p: "To the fullest extent permitted by law, Accident Compensation Helper is not liable for any damages arising from your use of the service or the outcome of any legal matter." },
        { h: "Changes to these terms", p: "We may update these terms from time to time. Continued use of the service after changes constitutes acceptance of the updated terms." },
      ]}
    />
  );
}