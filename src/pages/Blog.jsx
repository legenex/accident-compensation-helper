import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import PageHero from "@/components/site/PageHero";
import Meta from "@/components/site/Meta";
import { RESOURCES, RESOURCE_CATEGORIES } from "@/lib/siteContent";

export default function Blog() {
  return (
    <>
      <Meta title="Blog & Articles | Accident Compensation Helper" description="Articles and updates about accident claims, insurance, medical treatment, and working with an attorney." canonical="/blog" />
      <PageHero eyebrow="Blog" title="Articles & updates" subtitle="Information and updates to help you understand accident claims and your options." crumbs={[{ label: "Home", to: "/" }, { label: "Blog" }]} />
      <section className="mx-auto max-w-[1280px] px-6 py-16">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {RESOURCES.map((r) => (
            <Link key={r.slug} to={`/blog/${r.slug}`} className="group rounded-2xl bg-card p-6 shadow-lift ring-1 ring-softblue-border transition-transform hover:-translate-y-1">
              <span className="inline-flex rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">{r.category}</span>
              <h3 className="mt-4 font-heading text-lg font-bold text-foreground">{r.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground line-clamp-3">{r.excerpt}</p>
              <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-primary">Read more <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" /></span>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}