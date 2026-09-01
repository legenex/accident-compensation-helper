import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Search } from "lucide-react";
import PageHero from "@/components/site/PageHero";
import Meta from "@/components/site/Meta";
import { RESOURCES, RESOURCE_CATEGORIES } from "@/lib/siteContent";

export default function Resources() {
  const [query, setQuery] = useState("");
  const [cat, setCat] = useState("All");

  const filtered = useMemo(() => {
    return RESOURCES.filter((r) => {
      const matchesQ = !query || `${r.title} ${r.excerpt}`.toLowerCase().includes(query.toLowerCase());
      const matchesC = cat === "All" || r.category === cat;
      return matchesQ && matchesC;
    });
  }, [query, cat]);

  return (
    <>
      <Meta title="Resources | Accident Compensation Helper" description="Plain-language guides about what to do after an accident, how claims work, insurance, medical treatment, and attorney questions." canonical="/resources" />
      <PageHero eyebrow="Resources" title="Plain-language guides after an accident" subtitle="Practical information about what to do, how claims work, and what to expect, written in plain language." crumbs={[{ label: "Home", to: "/" }, { label: "Resources" }]} />
      <section className="mx-auto max-w-[1280px] px-6 py-16">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search guides..." className="h-11 w-full rounded-xl border border-softblue-border bg-card pl-10 pr-4 text-sm outline-none focus:ring-2 focus:ring-primary" />
          </div>
          <select value={cat} onChange={(e) => setCat(e.target.value)} className="h-11 rounded-xl border border-softblue-border bg-card px-4 text-sm outline-none focus:ring-2 focus:ring-primary">
            <option value="All">All categories</option>
            {RESOURCE_CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((r) => (
            <Link key={r.slug} to={`/resources/${r.slug}`} className="group rounded-2xl bg-card p-6 shadow-lift ring-1 ring-softblue-border transition-transform hover:-translate-y-1">
              <span className="inline-flex rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">{r.category}</span>
              <h3 className="mt-4 font-heading text-lg font-bold text-foreground">{r.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground line-clamp-3">{r.excerpt}</p>
              <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-primary">Read more <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" /></span>
            </Link>
          ))}
          {filtered.length === 0 && <p className="text-muted-foreground">No guides match your search.</p>}
        </div>
      </section>
    </>
  );
}