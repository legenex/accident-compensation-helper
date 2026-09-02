import React, { useMemo, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { base44 } from "@/api/base44Client";
import { ArrowLeft, ArrowRight, Check, Lock, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import ProgressRibbon from "@/components/site/ProgressRibbon";
import Meta from "@/components/site/Meta";
import {
  ACCIT_TYPES,
  INJRY_TIERS,
  computeEstimate,
  qualificationTier,
  withinLastYears,
} from "@/lib/claimEngine";
import { getAttribution, getSessionId, trackEvent } from "@/lib/useSite";

const STATES = ["AL","AK","AZ","AR","CA","CO","CT","DE","FL","GA","HI","ID","IL","IN","IA","KS","KY","LA","ME","MD","MA","MI","MN","MS","MO","MT","NE","NV","NH","NJ","NM","NY","NC","ND","OH","OK","OR","PA","RI","SC","SD","TN","TX","UT","VT","VA","WA","WV","WI","WY"];

const FAULT = [
  { id: "Not at fault", label: "Not at fault", desc: "The other party was responsible" },
  { id: "Partly at fault", label: "Partly at fault", desc: "Shared responsibility" },
  { id: "At fault", label: "At fault", desc: "I was responsible" },
  { id: "Unsure", label: "Unsure", desc: "Not certain yet" },
];

const TREATMENT = [
  { id: "Yes, immediately", label: "Yes, immediately", desc: "Saw a doctor right after" },
  { id: "Yes, later", label: "Yes, later", desc: "Sought care later on" },
  { id: "Planning to", label: "Planning to", desc: "Haven't gone yet but intend to" },
  { id: "No", label: "No", desc: "Did not seek treatment" },
];

const COENT_VERSION = "2026-09";

function ChoCard({ value, selected, onClick, title, desc }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`group relative flex flex-col items-start rounded-2xl border p-6 text-left transition-all ${
        selected ? "border-primary bg-primary/[0.06] shadow-float" : "border-softblue-border bg-card hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-lift"
      }`}
    >
      <div className="flex w-full items-center justify-between">
        <span className="font-heading text-lg font-bold text-foreground">{title}</span>
        <span className={`flex h-6 w-6 items-center justify-center rounded-full border transition-colors ${selected ? "border-primary bg-primary text-white" : "border-border text-transparent"}`}>
          <Check className="h-3.5 w-3.5" />
        </span>
      </div>
      {desc && <p className="mt-1.5 text-sm text-muted-foreground">{desc}</p>}
    </button>
  );
}

export default function ClaimCheck() {
  const navigate = useNavigate();
  const location = useLocation();
  const prefill = location.state?.prefill || {};

  const [step, setStep] = useState(() => {
    if (!prefill.accident_type) return 0;
    if (!prefill.accident_date) return 1;
    if (!prefill.at_fault) return 2;
    return 3;
  });
  const [dir, setDir] = useState("next");
  const [answers, setAnswers] = useState({
    accident_type: "", accident_date: "", at_fault: "", sought_treatment: "", injury_tier: "",
    medical_bills: "", lost_wages: "", state: "", zip_code: "", first_name: "", last_name: "", email: "", phone: "",
    ...prefill,
  });
  const [consent, setConsent] = useState({ phone: false, sms: false, email: false });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const steps = useMemo(
    () => [
      { key: "a_", title: "What type of accident was it?", sub: "Select the option that best describes your incident." },
      { key: "accid", title: "When did the accident happen?", sub: "Most states have a time limit to file a claim." },
      { key: "at_t", title: "Who was at fault?", sub: "This helps us understand whether further review may be useful." },
      { key: "sougatment", title: "Did you seek medical treatment?", sub: "Treatment records can be relevant to a claim." },
      { key: "injurer", title: "How would you describe your injuries?", sub: "Choose the option that best fits your recovery." },
      { key: "dames", title: "Your medical bills and lost wages", sub: "Estimates are fine. These help provide an informational estimate." },
      { key: "locon", title: "Where did it happen?", sub: "State helps us understand the rules that may apply." },
      { key: "coct", title: "Where can we reach you?", sub: "We use this to provide your result and, if you consent, to help connect you with a participating attorney." },
    ],
    []
  );

  const progress = ((step + 1) / steps.length) * 100;
  const setField = (key, val) => setAnswers((a) => ({ ...a, [key]: val }));

  const canProceed = () => {
    const s = steps[step].key;
    if (s === "damages") return answers.medical_bills !== "" || answers.lost_wages !== "";
    if (s === "location") return answers.state !== "";
    if (s === "contact") return answers.first_name && answers.last_name && answers.email && answers.phone && (consent.phone || consent.sms || consent.email);
    return answers[s] !== "";
  };

  const next = () => {
    if (!canProceed()) return;
    setDir("next");
    trackEvent("claim_step_complete", { step: steps[step].key });
    if (step < steps.length - 1) setStep(step + 1);
  };
  const back = () => { setDir("back"); if (step > 0) setStep(step - 1); };

  const submit = async () => {
    if (!canProceed()) return;
    setSubmitting(true);
    setError("");
    try {
      const estimate = computeEstimate(answers);
      const tier = qualificationTier(answers);
      const sessionId = getSessionId();
      const attr = getAttribution();

      const payload = {
        session_id: sessionId,
        first_name: answers.first_name, last_name: answers.last_name, email: answers.email, phone: answers.phone,
        accident_type: answers.accident_type, accident_date: answers.accident_date, state: answers.state, zip_code: answers.zip_code,
        at_fault: answers.at_fault, sought_treatment: answers.sought_treatment, injury_tier: answers.injury_tier,
        medical_bills: Number(answers.medical_bills) || 0, lost_wages: Number(answers.lost_wages) || 0,
        economic_damages: estimate.economic_damages, non_econ_low: estimate.non_econ_low, non_econ_high: estimate.non_econ_high,
        range_low: estimate.range_low, range_high: estimate.range_high, represented_low: estimate.represented_low, represented_high: estimate.represented_high,
        is_opted_in: true, opted_in_at: new Date().toISOString(),
        status: tier === "DQ" ? "Disqualified" : "Qualified",
        utm_source: attr.utm_source, utm_medium: attr.utm_medium, utm_campaign: attr.utm_campaign,
      };
      const created = await base44.entities.ClaimEstimate.create(payload);

      const lead = await base44.entities.Lead.create({
        first_name: answers.first_name, last_name: answers.last_name, email: answers.email, phone: answers.phone,
        accident_type: answers.accident_type, state: answers.state,
        status: tier === "DQ" ? "Disqualified" : "New",
        estimate_low: estimate.range_low, estimate_high: estimate.range_high, qualification_tier: tier,
        source: "website", utm_source: attr.utm_source, utm_medium: attr.utm_medium, utm_campaign: attr.utm_campaign,
      });

      if (lead?.id && created?.id) {
        await base44.entities.ClaimEstimate.update(created.id, { lead_id: lead.id }).catch(() => {});
      }

      const channels = [];
      if (consent.phone) channels.push("Phone");
      if (consent.sms) channels.push("SMS");
      if (consent.email) channels.push("Email");
      const consentText = "I consent to be contacted by phone, SMS, and/or email about my claim and related services.";
      await base44.entities.ConsentRecord.create({
        consent_text: consentText, consent_version: CONSENT_VERSION, consented_at: new Date().toISOString(),
        page_url: window.location.pathname, session_id: sessionId, channels, submission_source: "claim_check",
        utm_source: attr.utm_source, utm_medium: attr.utm_medium, utm_campaign: attr.utm_campaign,
        utm_content: attr.utm_content, utm_term: attr.utm_term, gclid: attr.gclid, fbclid: attr.fbclid, ttclid: attr.ttclid,
        referrer: attr.referrer,
      });

      trackEvent(tier === "DQ" ? "disq_lead" : "quaed_lead", { tier });
      trackEvent("lead_submit", { source: "claim_check" });

      navigate("/claim/result", { state: { estimateId: created?.id, estimate, answers, tier } });
    } catch (e) {
      setError("Something went wrong saving your claim. Please try again.");
      setSubmitting(false);
    }
  };

  const s = steps[step].key;
  const slideClass = dir === "next" ? "animate-slide-in-right" : "animate-fade-rise";

  return (
    <div className="min-h-screen bg-gradient-to-b from-secondary/40 via-background to-background pt-16">
      <Meta title="Free Claim Check | Accident Compensation Helper" description="Answer a few questions about your accident to find out if you may qualify for compensation. Free, confidential, and no obligation." canonical="/claim" noindex />
      <ProgressRibbon value={progress} />
      <div className="mx-auto flex min-h-[calc(100vh-4rem)] max-w-3xl flex-col justify-center px-6 py-16">
        <div className="mb-10 flex items-center justify-center gap-1.5">
          {steps.map((_, i) => (
            <span key={i} className={`h-1.5 rounded-full transition-all ${i === step ? "w-8 bg-primary" : i < step ? "w-4 bg-primary/40" : "w-4 bg-softblue-border"}`} />
          ))}
        </div>

        <div key={step} className={slideClass}>
          <p className="text-center text-xs font-semibold uppercase tracking-[0.2em] text-primary">Step {step + 1} of {steps.length}</p>
          <h1 className="mx-auto mt-4 max-w-2xl text-center font-heading text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">{steps[step].title}</h1>
          <p className="mx-auto mt-3 max-w-xl text-center text-muted-foreground">{steps[step].sub}</p>

          <div className="mx-auto mt-10 max-w-2xl">
            {s === "accident_type" && (
              <div className="grid gap-4 sm:grid-cols-2">
                {ACCIDENT_TYPES.map((t) => (
                  <ChoiceCard key={t.id} title={t.label} desc={t.blurb} selected={answers.accident_type === t.id} onClick={() => setField("accident_type", t.id)} />
                ))}
              </div>
            )}

            {s === "accident_date" && (
              <div className="mx-auto max-w-sm">
                <Label htmlFor="accident_date" className="text-muted-foreground">Accident date</Label>
                <Input id="accident_date" type="date" max={new Date().toISOString().slice(0, 10)} value={answers.accident_date} onChange={(e) => setField("accident_date", e.target.value)} className="mt-2 h-14 rounded-xl text-lg" />
                {answers.accident_date && !withinLastYears(answers.accident_date, 2) && (
                  <p className="mt-3 rounded-lg bg-amber-50 px-4 py-3 text-sm text-amber-700">The incident may be outside the typical filing window. You can still continue, and an attorney can confirm your options.</p>
                )}
              </div>
            )}

            {s === "at_fault" && (
              <div className="grid gap-4 sm:grid-cols-2">
                {FAULT.map((f) => (<ChoiceCard key={f.id} title={f.label} desc={f.desc} selected={answers.at_fault === f.id} onClick={() => setField("at_fault", f.id)} />))}
              </div>
            )}

            {s === "sought_treatment" && (
              <div className="grid gap-4 sm:grid-cols-2">
                {TREATMENT.map((f) => (<ChoiceCard key={f.id} title={f.label} desc={f.desc} selected={answers.sought_treatment === f.id} onClick={() => setField("sought_treatment", f.id)} />))}
              </div>
            )}

            {s === "injury_tier" && (
              <div className="grid gap-4 sm:grid-cols-2">
                {INJURY_TIERS.map((f) => (<ChoiceCard key={f.id} title={f.label} desc={f.desc} selected={answers.injury_tier === f.id} onClick={() => setField("injury_tier", f.id)} />))}
              </div>
            )}

            {s === "damages" && (
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <Label className="text-muted-foreground">Medical bills (estimated)</Label>
                  <div className="relative mt-2">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
                    <Input type="number" min="0" inputMode="numeric" placeholder="0" value={answers.medical_bills} onChange={(e) => setField("medical_bills", e.target.value)} className="h-14 rounded-xl pl-8 text-lg" />
                  </div>
                </div>
                <div>
                  <Label className="text-muted-foreground">Lost wages (estimated)</Label>
                  <div className="relative mt-2">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
                    <Input type="number" min="0" inputMode="numeric" placeholder="0" value={answers.lost_wages} onChange={(e) => setField("lost_wages", e.target.value)} className="h-14 rounded-xl pl-8 text-lg" />
                  </div>
                </div>
                <p className="sm:col-span-2 text-sm text-muted-foreground">Enter 0 if not applicable. Estimates are fine.</p>
              </div>
            )}

            {s === "location" && (
              <div className="mx-auto grid max-w-md gap-5 sm:grid-cols-2">
                <div>
                  <Label className="text-muted-foreground">State</Label>
                  <select value={answers.state} onChange={(e) => setField("state", e.target.value)} className="mt-2 h-14 w-full rounded-xl border border-softblue-border bg-card px-4 text-lg text-foreground outline-none focus:ring-2 focus:ring-primary">
                    <option value="">Select</option>
                    {STATES.map((st) => <option key={st} value={st}>{st}</option>)}
                  </select>
                </div>
                <div>
                  <Label className="text-muted-foreground">ZIP code</Label>
                  <Input type="text" maxLength={5} inputMode="numeric" placeholder="00000" value={answers.zip_code} onChange={(e) => setField("zip_code", e.target.value.replace(/\D/g, ""))} className="mt-2 h-14 rounded-xl text-lg" />
                </div>
              </div>
            )}

            {s === "contact" && (
              <div className="mx-auto grid max-w-md gap-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-muted-foreground">First name</Label>
                    <Input value={answers.first_name} onChange={(e) => setField("first_name", e.target.value)} className="mt-2 h-12 rounded-xl" />
                  </div>
                  <div>
                    <Label className="text-muted-foreground">Last name</Label>
                    <Input value={answers.last_name} onChange={(e) => setField("last_name", e.target.value)} className="mt-2 h-12 rounded-xl" />
                  </div>
                </div>
                <div>
                  <Label className="text-muted-foreground">Email</Label>
                  <Input type="email" value={answers.email} onChange={(e) => setField("email", e.target.value)} className="mt-2 h-12 rounded-xl" />
                </div>
                <div>
                  <Label className="text-muted-foreground">Cell number</Label>
                  <Input type="tel" value={answers.phone} onChange={(e) => setField("phone", e.target.value)} className="mt-2 h-12 rounded-xl" placeholder="(555) 123-4567" />
                </div>
                <div className="rounded-xl bg-secondary/60 p-4">
                  <p className="text-sm font-semibold text-foreground">How may we contact you?</p>
                  <p className="mt-1 text-xs text-muted-foreground">Select at least one. Consent is not a condition of purchasing any service.</p>
                  <div className="mt-3 space-y-2">
                    <label className="flex items-start gap-3 text-sm text-foreground/90">
                      <input type="checkbox" checked={consent.phone} onChange={(e) => setConsent((c) => ({ ...c, phone: e.target.checked }))} className="mt-0.5 h-4 w-4 rounded border-softblue-border text-primary focus:ring-primary" />
                      Phone calls
                    </label>
                    <label className="flex items-start gap-3 text-sm text-foreground/90">
                      <input type="checkbox" checked={consent.sms} onChange={(e) => setConsent((c) => ({ ...c, sms: e.target.checked }))} className="mt-0.5 h-4 w-4 rounded border-softblue-border text-primary focus:ring-primary" />
                      SMS (message and data rates may apply; reply STOP to opt out)
                    </label>
                    <label className="flex items-start gap-3 text-sm text-foreground/90">
                      <input type="checkbox" checked={consent.email} onChange={(e) => setConsent((c) => ({ ...c, email: e.target.checked }))} className="mt-0.5 h-4 w-4 rounded border-softblue-border text-primary focus:ring-primary" />
                      Email
                    </label>
                  </div>
                  <p className="mt-3 text-xs text-muted-foreground">By continuing, you agree to our <a href="/privacy" className="text-primary hover:underline">Privacy Policy</a>, <a href="/terms" className="text-primary hover:underline">Terms</a>, <a href="/communication-consent" className="text-primary hover:underline">Communication Consent</a>, and <a href="/sms-terms" className="text-primary hover:underline">SMS Terms</a>.</p>
                </div>
              </div>
            )}

            {error && <p className="mt-6 text-center text-sm text-destructive">{error}</p>}
          </div>
        </div>

        <div className="mx-auto mt-12 flex w-full max-w-2xl items-center justify-between">
          <Button variant="ghost" onClick={back} disabled={step === 0} className="gap-2 rounded-full px-5 text-muted-foreground disabled:opacity-0">
            <ArrowLeft className="h-4 w-4" /> Back
          </Button>
          {step < steps.length - 1 ? (
            <Button onClick={next} disabled={!canProceed()} className="gap-2 rounded-full bg-primary px-8 py-6 text-base font-semibold shadow-float hover:bg-primary/90 disabled:opacity-40">
              Continue <ArrowRight className="h-4 w-4" />
            </Button>
          ) : (
            <Button onClick={submit} disabled={!canProceed() || submitting} className="gap-2 rounded-full bg-primary px-8 py-6 text-base font-semibold shadow-float hover:bg-primary/90 disabled:opacity-40">
              {submitting ? "Saving..." : "See my result"} <ArrowRight className="h-4 w-4" />
            </Button>
          )}
        </div>

        <div className="mx-auto mt-10 flex max-w-2xl flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-muted-foreground">
          <span className="inline-flex items-center gap-1.5"><ShieldCheck className="h-4 w-4 text-primary" /> Free to use</span>
          <span className="inline-flex items-center gap-1.5"><Lock className="h-4 w-4 text-primary" /> Secure</span>
          <span>No obligation</span>
          <span>Takes about 2 minutes</span>
        </div>
      </div>
    </div>
  );
}