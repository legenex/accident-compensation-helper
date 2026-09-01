import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, ArrowRight, Check, ShieldCheck, Lock } from "lucide-react";
import { ACCIDENT_TYPES } from "@/lib/claimEngine";
import { trackEvent } from "@/lib/useSite";

const STATES = ["AL","AK","AZ","AR","CA","CO","CT","DE","FL","GA","HI","ID","IL","IN","IA","KS","KY","LA","ME","MD","MA","MI","MN","MS","MO","MT","NE","NV","NH","NJ","NM","NY","NC","ND","OH","OK","OR","PA","RI","SC","SD","TN","TX","UT","VT","VA","WA","WV","WI","WY"];

const FAULT = [
  { id: "Not at fault", label: "Not at fault", desc: "The other party was responsible" },
  { id: "Partly at fault", label: "Partly at fault", desc: "Shared responsibility" },
  { id: "At fault", label: "At fault", desc: "I was responsible" },
  { id: "Unsure", label: "Unsure", desc: "Not certain yet" },
];

const HERO_STEPS = [
  { key: "accident_type", title: "What type of accident were you involved in?", sub: "Select the option that best describes what happened." },
  { key: "accident_date", title: "When did it happen?", sub: "An estimate is fine. Most states have a time limit to file." },
  { key: "at_fault", title: "Who was primarily at fault?", sub: "This helps us understand whether further review may be useful." },
  { key: "state", title: "What state did the accident happen in?", sub: "This helps us understand the rules that may apply." },
];

export default function HeroClaimCard() {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({ accident_type: "", accident_date: "", at_fault: "", state: "" });

  const current = HERO_STEPS[step];
  const canProceed = answers[current.key] !== "";

  const setField = (k, v) => setAnswers((a) => ({ ...a, [k]: v }));

  const next = () => {
    if (!canProceed) return;
    trackEvent("claim_step_complete", { step: current.key });
    if (step < HERO_STEPS.length - 1) setStep(step + 1);
    else {
      trackEvent("claim_check_start", { source: "hero" });
      navigate("/claim", { state: { prefill: answers } });
    }
  };
  const back = () => step > 0 && setStep(step - 1);

  const progress = ((step + 1) / HERO_STEPS.length) * 100;

  return (
    <div className="rounded-2xl bg-card p-6 shadow-float ring-1 ring-softblue-border sm:p-7">
      <div className="flex items-center justify-between">
        <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
          <ShieldCheck className="h-3.5 w-3.5" /> Free claim check
        </span>
        <span className="text-xs font-medium text-muted-foreground">Step {step + 1} of {HERO_STEPS.length}</span>
      </div>
      <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-secondary">
        <div className="h-full rounded-full bg-primary transition-all duration-300" style={{ width: `${progress}%` }} />
      </div>

      <div key={step} className="mt-5 animate-fade-rise">
        <h3 className="font-heading text-xl font-bold text-foreground">{current.title}</h3>
        <p className="mt-1.5 text-sm text-muted-foreground">{current.sub}</p>

        <div className="mt-5">
          {current.key === "accident_type" && (
            <div className="grid grid-cols-2 gap-2.5">
              {ACCIDENT_TYPES.map((t) => (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => setField("accident_type", t.id)}
                  className={`flex items-center gap-2 rounded-xl border p-3 text-left text-sm font-medium transition-all ${
                    answers.accident_type === t.id
                      ? "border-primary bg-primary/10 text-primary"
                      : "border-softblue-border bg-card text-foreground hover:border-primary/40"
                  }`}
                >
                  <span className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border ${answers.accident_type === t.id ? "border-primary bg-primary text-white" : "border-border"}`}>
                    {answers.accident_type === t.id && <Check className="h-3 w-3" />}
                  </span>
                  <span className="leading-tight">{t.label}</span>
                </button>
              ))}
              <button
                type="button"
                onClick={() => setField("accident_type", "Other")}
                className={`flex items-center gap-2 rounded-xl border p-3 text-left text-sm font-medium transition-all col-span-2 ${
                  answers.accident_type === "Other" ? "border-primary bg-primary/10 text-primary" : "border-softblue-border bg-card hover:border-primary/40"
                }`}
              >
                <span className={`flex h-5 w-5 items-center justify-center rounded-full border ${answers.accident_type === "Other" ? "border-primary bg-primary text-white" : "border-border"}`}>
                  {answers.accident_type === "Other" && <Check className="h-3 w-3" />}
                </span>
                Other
              </button>
            </div>
          )}

          {current.key === "accident_date" && (
            <input
              type="date"
              max={new Date().toISOString().slice(0, 10)}
              value={answers.accident_date}
              onChange={(e) => setField("accident_date", e.target.value)}
              className="h-12 w-full rounded-xl border border-softblue-border bg-card px-4 text-base outline-none focus:ring-2 focus:ring-primary"
            />
          )}

          {current.key === "at_fault" && (
            <div className="grid gap-2.5 sm:grid-cols-2">
              {FAULT.map((f) => (
                <button
                  key={f.id}
                  type="button"
                  onClick={() => setField("at_fault", f.id)}
                  className={`rounded-xl border p-4 text-left transition-all ${answers.at_fault === f.id ? "border-primary bg-primary/10" : "border-softblue-border hover:border-primary/40"}`}
                >
                  <p className="text-sm font-semibold text-foreground">{f.label}</p>
                  <p className="mt-0.5 text-xs text-muted-foreground">{f.desc}</p>
                </button>
              ))}
            </div>
          )}

          {current.key === "state" && (
            <select
              value={answers.state}
              onChange={(e) => setField("state", e.target.value)}
              className="h-12 w-full rounded-xl border border-softblue-border bg-card px-4 text-base text-foreground outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="">Select your state</option>
              {STATES.map((s) => <option key={s} value={s}>{s}</option>)}
            </select>
          )}
        </div>
      </div>

      <div className="mt-6 flex items-center justify-between">
        <button
          type="button"
          onClick={back}
          disabled={step === 0}
          className="inline-flex items-center gap-1.5 rounded-full px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground disabled:opacity-0"
        >
          <ArrowLeft className="h-4 w-4" /> Back
        </button>
        <button
          type="button"
          onClick={next}
          disabled={!canProceed}
          className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white shadow-lift transition-transform hover:scale-[1.02] disabled:opacity-40"
        >
          {step < HERO_STEPS.length - 1 ? "Continue" : "Continue full check"}
          <ArrowRight className="h-4 w-4" />
        </button>
      </div>

      <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-1 border-t border-softblue-border pt-4 text-xs text-muted-foreground">
        <span className="inline-flex items-center gap-1.5"><Lock className="h-3.5 w-3.5 text-primary" /> Secure</span>
        <span>Takes about 2 minutes</span>
        <span>Free to use</span>
        <span>No obligation</span>
      </div>
    </div>
  );
}