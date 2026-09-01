import React, { useEffect, useState } from "react";
import { base44 } from "@/api/base44Client";
import { Star } from "lucide-react";

export default function Testimonials() {
  const [items, setItems] = useState(null);
  useEffect(() => {
    base44.entities.Testimonial.list("sort_order", 50)
      .then((r) => setItems((r ?? []).filter((t) => t.active)))
      .catch(() => setItems([]));
  }, []);

  return (
    <section className="bg-secondary/40 py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">Real stories</p>
          <h2 className="mt-4 font-heading text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl">
            Real stories, real results
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Don't just take our word for it. Hear from real people who used Accident Compensation Helper to get the
            compensation they deserved.
          </p>
        </div>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {!items ? (
            Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="h-56 animate-pulse rounded-2xl border border-border bg-card/60" />
            ))
          ) : items.length === 0 ? (
            <div className="col-span-full rounded-2xl border border-dashed border-border bg-card/40 p-12 text-center text-muted-foreground">
              Success stories will appear here once published.
            </div>
          ) : (
            items.map((t) => (
              <div key={t.id} className="flex flex-col rounded-2xl border border-border bg-card p-6 shadow-lift">
                <div className="flex items-center gap-3">
                  <span className="flex h-11 w-11 items-center justify-center rounded-full bg-primary/10 font-heading text-sm font-bold text-primary">
                    {t.author_initials || (t.author_name || "").slice(0, 2).toUpperCase()}
                  </span>
                  <div>
                    <p className="font-heading text-sm font-bold text-foreground">{t.author_name}</p>
                    <p className="text-xs text-muted-foreground">{t.time_ago}{t.author_location ? ` - ${t.author_location}` : ""}</p>
                  </div>
                </div>
                <div className="mt-3 flex gap-0.5">
                  {Array.from({ length: t.rating || 5 }).map((_, i) => (
                    <Star key={i} className="h-3.5 w-3.5 fill-primary text-primary" />
                  ))}
                </div>
                <p className="mt-3 text-sm leading-relaxed text-foreground/80">{t.quote}</p>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
}