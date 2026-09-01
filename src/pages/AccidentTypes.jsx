import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Image } from "@/components/ui/image";
import PageHero from "@/components/site/PageHero";
import Meta from "@/components/site/Meta";
import { ACCIDENT_TYPES } from "@/lib/siteContent";

export default function AccidentTypes() {
  return (
    <>
      <Meta title="Accident Types | Accident Compensation Helper" description="Browse accident types and learn what to know about each. Choose the situation that matches what happened to you and start a free claim check." canonical="/accident-types" />
      <PageHero
        eyebrow="Accident Types"
        title="What happened?"
        subtitle="Different accidents create different insurance, evidence, and injury questions. Choose the situation that best matches what happened to you."
        crumbs={[{ label: "Home", to: "/" }, { label: "Accident Types" }]}
      />
      <section className="mx-auto max-w-[1280px] px-6 py-16">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {ACCIDENT_TYPES.map((t) => (
            <Link key={t.slug} to={`/accident-types/${t.slug}`} className="group relative flex h-72 flex-col justify-end overflow-hidden rounded-2xl shadow-lift transition-transform hover:-translate-y-1">
              <Image src={t.image} alt={t.label} className="absolute inset-0 block h-full w-full transition-transform duration-500 group-hover:scale-105" fittingType="fill" />
              <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/55 to-transparent" />
              <div className="relative z-10 p-6 text-white">
                <h3 className="font-heading text-xl font-bold">{t.label}</h3>
                <p className="mt-1.5 text-sm text-white/75 line-clamp-2">{t.short}</p>
                <span className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-primary">
                  Learn more <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}