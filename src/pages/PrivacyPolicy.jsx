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

export default function PrivacyPolicy() {
  return (
    <LegalShell
      title="Privacy Policy"
      updated="September 2026"
      sections={[
        { h: "Overview", p: "Accident Compensation Helper respects your privacy. This policy explains what information we collect when you use our free claim check, how we use it, and the choices you have." },
        { h: "Information we collect", p: "We collect the information you provide through the claim check, including your name, email, phone number, and details about your accident. We also collect usage data such as referral source and device type." },
        { h: "How we use your information", p: "We use your information to estimate your potential compensation, to connect you with vetted attorneys in our network, and to communicate with you about your claim. We never charge you for this service." },
        { h: "Sharing your information", p: "We share your information with attorneys in our network who may contact you about your case. We do not sell your personal information. We may share anonymized, aggregated data for analytics." },
        { h: "Data retention", p: "We retain your information for as long as necessary to provide our services and comply with legal obligations. You may request deletion of your data at any time." },
        { h: "Your rights", p: "You can request access to, correction of, or deletion of your personal information. To exercise these rights, contact us at help@accidentcompensationhelper.com." },
        { h: "Contact", p: "If you have questions about this policy, please contact us at help@accidentcompensationhelper.com." },
      ]}
    />
  );
}