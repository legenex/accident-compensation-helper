import React, { useEffect, useState } from "react";
import { Star } from "lucide-react";
import { base44 } from "@/api/base44Client";

export default function Testimonials() {
  const [items, setItems] = useState(null);
  useEffect(() => {
    base44.entities.Testimonial.filter({ active: true }, "sort_order", 12)
      .then((r) => setItems(r ?? []))
      .catch(() => setItems([]));
  }, []);

  if (items === null) return null;
  if (items.length === 0) return null;

  return (
    <section className="mx-auto max-w-[1280px] px-6 py-20">
      <div className="max-w-2xl">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">Experiences</p>
        <h2 className="mt-4 font-heading text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
          Experiences shared by people we have helped
        </h2>
        <p className="mt-4 text-muted-foreground">
          These experiences are shared with permission. Individual results vary and are not typical or guaranteed.
        </p>
      </div>
      <div className="mt-12 grid gap-5 lg:grid-cols-3">
        {items.map((t) => (
          <div key={t.id} className="rounded-2xl bg-card p-7 shadow-lift ring-1 ring-softblue-border">
            <div className="flex gap-0.5">
              {Array.from({ length: t.rating || 5 }).map((_, i) => (
                <Star key={i} className="h-4 w-4 fill-primary text-primary" />
              ))}
            </div>
            <p className="mt-4 text-foreground/90 leading-relaxed">"{t.quote}"</p>
            <div className="mt-5 flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary">
                {t.author_initials || (t.author_name || "").slice(0, 2).toUpperCase()}
              </span>
              <div>
                <p className="font-heading text-sm font-bold text-foreground">{t.author_name}</p>
                {t.author_location && <p className="text-xs text-muted-foreground">{t.author_location}</p>}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}