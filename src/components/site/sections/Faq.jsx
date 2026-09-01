import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ChevronDown } from "lucide-react";
import { HOME_FAQ } from "@/lib/siteContent";

export default function Faq() {
  const [open, setOpen] = useState(0);
  return (
    <section className="mx-auto max-w-[1280px] px-6 py-20">
      <div className="max-w-2xl">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">FAQ</p>
        <h2 className="mt-4 font-heading text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
          Frequently asked questions
        </h2>
      </div>
      <div className="mx-auto mt-10 max-w-3xl divide-y divide-softblue-border rounded-2xl bg-card shadow-lift ring-1 ring-softblue-border">
        {HOME_FAQ.map((f, i) => (
          <div key={f.q}>
            <button
              onClick={() => setOpen(open === i ? -1 : i)}
              className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
              aria-expanded={open === i}
            >
              <span className="font-heading text-base font-bold text-foreground">{f.q}</span>
              <ChevronDown className={`h-5 w-5 shrink-0 text-primary transition-transform ${open === i ? "rotate-180" : ""}`} />
            </button>
            {open === i && <p className="px-6 pb-5 text-muted-foreground leading-relaxed">{f.a}</p>}
          </div>
        ))}
      </div>
      <div className="mt-10 text-center">
        <Link to="/faq" className="inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3.5 text-base font-semibold text-white shadow-float transition-transform hover:scale-[1.02]">
          See more questions
        </Link>
      </div>
    </section>
  );
}