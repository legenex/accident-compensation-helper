import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { RESOURCES } from "@/lib/siteContent";

export default function ResourcesPreview() {
  const featured = RESOURCES.slice(0, 6);
  return (
    <section className="bg-secondary/50">
      <div className="mx-auto max-w-[1280px] px-6 py-20">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">Resources</p>
            <h2 className="mt-4 font-heading text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
              Plain-language guides after an accident
            </h2>
            <p className="mt-4 text-muted-foreground">
              Practical information about what to do, how claims work, and what to expect, written in plain language.
            </p>
          </div>
          <Link to="/resources" className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:gap-2.5">
            Browse all resources <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((r) => (
            <Link key={r.slug} to={`/resources/${r.slug}`} className="group rounded-2xl bg-card p-6 shadow-lift ring-1 ring-softblue-border transition-transform hover:-translate-y-1">
              <span className="inline-flex rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">{r.category}</span>
              <h3 className="mt-4 font-heading text-lg font-bold text-foreground">{r.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground line-clamp-3">{r.excerpt}</p>
              <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-primary">
                Read more <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}