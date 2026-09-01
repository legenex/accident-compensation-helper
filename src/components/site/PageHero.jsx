import React from "react";
import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";

export default function PageHero({ eyebrow, title, subtitle, crumbs = [] }) {
  return (
    <section className="bg-navy pt-16">
      <div className="mx-auto max-w-[1280px] px-6 py-14 text-white lg:py-20">
        {crumbs.length > 0 && (
          <nav className="mb-5 flex flex-wrap items-center gap-1.5 text-sm text-white/50">
            {crumbs.map((c, i) => (
              <span key={i} className="flex items-center gap-1.5">
                {c.to ? <Link to={c.to} className="hover:text-white">{c.label}</Link> : <span className="text-white/80">{c.label}</span>}
                {i < crumbs.length - 1 && <ChevronRight className="h-3.5 w-3.5" />}
              </span>
            ))}
          </nav>
        )}
        {eyebrow && <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">{eyebrow}</p>}
        <h1 className="mt-4 font-heading text-4xl font-extrabold tracking-tight sm:text-5xl">{title}</h1>
        {subtitle && <p className="mt-4 max-w-2xl text-lg leading-relaxed text-white/70">{subtitle}</p>}
      </div>
    </section>
  );
}