import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Send, ShieldCheck } from "lucide-react";
import { base44 } from "@/api/base44Client";
import PageHero from "@/components/site/PageHero";
import Meta from "@/components/site/Meta";
import { trackEvent } from "@/lib/useSite";

const TYPES = [
  { id: "Access", label: "Access request" },
  { id: "Correction", label: "Correction request" },
  { id: "Deletion", label: "Deletion request" },
  { id: "OptOutSaleSharing", label: "Opt out of sale or sharing" },
  { id: "OptOutTargetedAdvertising", label: "Opt out of targeted advertising" },
  { id: "Appeal", label: "Appeal a denial" },
];

export default function PrivacyChoices() {
  const [form, setForm] = useState({ request_type: "Access", name: "", email: "", phone: "", state: "", details: "" });
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState("");

  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  const submit = async (e) => {
    e.preventDefault();
    if (!form.email || !form.request_type) { setError("Please complete the required fields."); return; }
    setSubmitting(true);
    setError("");
    try {
      await base44.entities.PrivacyRequest.create({ ...form, status: "New" });
      trackEvent("privacy_request", { type: form.request_type });
      setDone(true);
    } catch {
      setError("Something went wrong. Please try again.");
    }
    setSubmitting(false);
  };

  return (
    <>
      <Meta title="Your Privacy Choices | Accident Compensation Helper" description="Submit a privacy request, including access, correction, deletion, and opt-out of sale or sharing and targeted advertising." canonical="/privacy-choices" noindex />
      <PageHero eyebrow="Privacy" title="Your Privacy Choices" subtitle="You may submit a request to access, correct, or delete your information, or to opt out of the sale or sharing of your personal information and targeted advertising." crumbs={[{ label: "Home", to: "/" }, { label: "Your Privacy Choices" }]} />
      <section className="mx-auto max-w-3xl px-6 py-16">
        {done ? (
          <div className="rounded-2xl bg-card p-10 text-center shadow-lift ring-1 ring-softblue-border">
            <ShieldCheck className="mx-auto h-12 w-12 text-primary" />
            <h2 className="mt-4 font-heading text-2xl font-bold text-foreground">Request received</h2>
            <p className="mt-2 text-muted-foreground">We have received your privacy request and will review it. You may be contacted to verify your identity.</p>
          </div>
        ) : (
          <form onSubmit={submit} className="rounded-2xl bg-card p-8 shadow-lift ring-1 ring-softblue-border">
            <div className="mb-5">
              <label className="text-sm font-medium text-foreground">Request type *</label>
              <select value={form.request_type} onChange={(e) => set("request_type", e.target.value)} className="mt-1.5 h-11 w-full rounded-xl border border-softblue-border bg-card px-4 text-sm outline-none focus:ring-2 focus:ring-primary">
                {TYPES.map((t) => <option key={t.id} value={t.id}>{t.label}</option>)}
              </select>
            </div>
            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label className="text-sm font-medium text-foreground">Name</label>
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
                <label className="text-sm font-medium text-foreground">State</label>
                <input value={form.state} onChange={(e) => set("state", e.target.value)} className="mt-1.5 h-11 w-full rounded-xl border border-softblue-border bg-card px-4 text-sm outline-none focus:ring-2 focus:ring-primary" />
              </div>
            </div>
            <div className="mt-5">
              <label className="text-sm font-medium text-foreground">Details</label>
              <textarea rows={4} value={form.details} onChange={(e) => set("details", e.target.value)} placeholder="Provide any details that help us process your request." className="mt-1.5 w-full rounded-xl border border-softblue-border bg-card px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-primary" />
            </div>
            {error && <p className="mt-4 text-sm text-destructive">{error}</p>}
            <button type="submit" disabled={submitting} className="mt-6 inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3.5 text-base font-semibold text-white shadow-float transition-transform hover:scale-[1.02] disabled:opacity-50">
              {submitting ? "Submitting..." : "Submit request"} <Send className="h-4 w-4" />
            </button>
            <p className="mt-4 text-xs text-muted-foreground">See our <Link to="/privacy" className="text-primary hover:underline">Privacy Policy</Link> for more information. We may need to verify your identity before processing a request.</p>
          </form>
        )}
      </section>
    </>
  );
}