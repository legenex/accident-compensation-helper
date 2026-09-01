import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Mail, Send, ShieldCheck } from "lucide-react";
import { base44 } from "@/api/base44Client";
import PageHero from "@/components/site/PageHero";
import Meta from "@/components/site/Meta";
import { useSiteSettings, getAttribution, getSessionId, trackEvent } from "@/lib/useSite";

const CONSENT_VERSION = "2026-09";

export default function Contact() {
  const settings = useSiteSettings();
  const [form, setForm] = useState({ name: "", email: "", phone: "", subject: "", message: "", consentPhone: false, consentSms: false, consentEmail: false });
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState("");

  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));
  const anyConsent = form.consentPhone || form.consentSms || form.consentEmail;

  const submit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) { setError("Please complete the required fields."); return; }
    if (!anyConsent) { setError("Please select at least one way we may contact you."); return; }
    setSubmitting(true);
    setError("");
    try {
      await base44.entities.ContactMessage.create({
        name: form.name, email: form.email, phone: form.phone, subject: form.subject, message: form.message, status: "New",
      });
      const channels = [];
      if (form.consentPhone) channels.push("Phone");
      if (form.consentSms) channels.push("SMS");
      if (form.consentEmail) channels.push("Email");
      const attr = getAttribution();
      const consentText = "I consent to be contacted by phone, SMS, and/or email about my request.";
      await base44.entities.ConsentRecord.create({
        consent_text: consentText,
        consent_version: CONSENT_VERSION,
        consented_at: new Date().toISOString(),
        page_url: window.location.pathname,
        session_id: getSessionId(),
        channels,
        submission_source: "contact",
        utm_source: attr.utm_source, utm_medium: attr.utm_medium, utm_campaign: attr.utm_campaign,
        utm_content: attr.utm_content, utm_term: attr.utm_term, gclid: attr.gclid, fbclid: attr.fbclid, ttclid: attr.ttclid,
        referrer: attr.referrer,
      });
      trackEvent("contact_request", { source: "contact" });
      setDone(true);
    } catch (err) {
      setError("Something went wrong. Please try again.");
    }
    setSubmitting(false);
  };

  return (
    <>
      <Meta title="Contact | Accident Compensation Helper" description="Get in touch with Accident Compensation Helper. We are not a law firm and do not provide legal advice." canonical="/contact" />
      <PageHero eyebrow="Contact" title="Get in touch" subtitle="Send us a message and we will respond as we are able. For privacy requests, use our Privacy Choices page." crumbs={[{ label: "Home", to: "/" }, { label: "Contact" }]} />
      <section className="mx-auto max-w-3xl px-6 py-16">
        {done ? (
          <div className="rounded-2xl bg-card p-10 text-center shadow-lift ring-1 ring-softblue-border">
            <ShieldCheck className="mx-auto h-12 w-12 text-primary" />
            <h2 className="mt-4 font-heading text-2xl font-bold text-foreground">Thank you</h2>
            <p className="mt-2 text-muted-foreground">Your message has been received. We will respond as we are able.</p>
          </div>
        ) : (
          <form onSubmit={submit} className="rounded-2xl bg-card p-8 shadow-lift ring-1 ring-softblue-border">
            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label className="text-sm font-medium text-foreground">Name *</label>
                <input value={form.name} onChange={(e) => set("name", e.target.value)} className="mt-1.5 h-11 w-full rounded-xl border border-softblue-border bg-card px-4 text-sm outline-none focus:ring-2 focus:ring-primary" />
              </div>
              <div>
                <label className="text-sm font-medium text-foreground">Email *</label>
                <input type="email" value={form.email} onChange={(e) => set("email", e.target.value)} className="mt-1.5 h-11 w-full rounded-xl border border-softblue-border bg-card px-4 text-sm outline-none focus:ring-2 focus:ring-primary" />
              </div>
              <div>
                <label className="text-sm font-medium text-foreground">Phone</label>
                <input type="tel" value={form.phone} onChange={(e) => set("phone", e.target.value)} className="mt-1.5 h-11 w-full rounded-xl border border-softblue-border bg-card px-4 text-sm outline-none focus:ring-2 focus:ring-primary" />
              </div>
              <div>
                <label className="text-sm font-medium text-foreground">Subject</label>
                <input value={form.subject} onChange={(e) => set("subject", e.target.value)} className="mt-1.5 h-11 w-full rounded-xl border border-softblue-border bg-card px-4 text-sm outline-none focus:ring-2 focus:ring-primary" />
              </div>
            </div>
            <div className="mt-5">
              <label className="text-sm font-medium text-foreground">Message *</label>
              <textarea rows={5} value={form.message} onChange={(e) => set("message", e.target.value)} className="mt-1.5 w-full rounded-xl border border-softblue-border bg-card px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-primary" />
            </div>

            <div className="mt-6 rounded-xl bg-secondary/60 p-5">
              <p className="text-sm font-semibold text-foreground">How may we contact you?</p>
              <p className="mt-1 text-xs text-muted-foreground">Select at least one. Consent is not a condition of purchasing any service.</p>
              <div className="mt-3 space-y-2">
                <label className="flex items-start gap-3 text-sm text-foreground/90">
                  <input type="checkbox" checked={form.consentPhone} onChange={(e) => set("consentPhone", e.target.checked)} className="mt-0.5 h-4 w-4 rounded border-softblue-border text-primary focus:ring-primary" />
                  Phone calls
                </label>
                <label className="flex items-start gap-3 text-sm text-foreground/90">
                  <input type="checkbox" checked={form.consentSms} onChange={(e) => set("consentSms", e.target.checked)} className="mt-0.5 h-4 w-4 rounded border-softblue-border text-primary focus:ring-primary" />
                  SMS (message and data rates may apply; reply STOP to opt out)
                </label>
                <label className="flex items-start gap-3 text-sm text-foreground/90">
                  <input type="checkbox" checked={form.consentEmail} onChange={(e) => set("consentEmail", e.target.checked)} className="mt-0.5 h-4 w-4 rounded border-softblue-border text-primary focus:ring-primary" />
                  Email
                </label>
              </div>
              <p className="mt-3 text-xs text-muted-foreground">See our <Link to="/privacy" className="text-primary hover:underline">Privacy Policy</Link>, <Link to="/terms" className="text-primary hover:underline">Terms</Link>, <Link to="/communication-consent" className="text-primary hover:underline">Communication Consent</Link>, and <Link to="/sms-terms" className="text-primary hover:underline">SMS Terms</Link>.</p>
            </div>

            {error && <p className="mt-4 text-sm text-destructive">{error}</p>}
            <button type="submit" disabled={submitting} className="mt-6 inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3.5 text-base font-semibold text-white shadow-float transition-transform hover:scale-[1.02] disabled:opacity-50">
              {submitting ? "Sending..." : "Send message"} <Send className="h-4 w-4" />
            </button>
            {settings?.support_email && (
              <p className="mt-4 flex items-center gap-2 text-sm text-muted-foreground"><Mail className="h-4 w-4 text-primary" /> {settings.support_email}</p>
            )}
          </form>
        )}
      </section>
    </>
  );
}