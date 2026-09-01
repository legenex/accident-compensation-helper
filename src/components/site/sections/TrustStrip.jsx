import React from "react";
import { ShieldCheck, Lock, BadgeDollarSign, Scale } from "lucide-react";
import { TRUST_STRIP } from "@/lib/siteContent";

const ICONS = [BadgeDollarSign, ShieldCheck, Lock, Scale, Scale];

export default function TrustStrip() {
  return (
    <section className="border-b border-softblue-border bg-secondary/60">
      <div className="mx-auto flex max-w-[1280px] flex-wrap items-center justify-center gap-x-8 gap-y-3 px-6 py-5 text-sm font-medium text-muted-foreground">
        {TRUST_STRIP.map((t, i) => {
          const Icon = ICONS[i % ICONS.length];
          return (
            <span key={t} className="inline-flex items-center gap-2">
              <Icon className="h-4 w-4 text-primary" />
              {t}
            </span>
          );
        })}
      </div>
    </section>
  );
}