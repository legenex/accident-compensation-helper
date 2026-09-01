import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Image } from "@/components/ui/image";
import { ACCIDENT_TYPES } from "@/lib/siteContent";

export default function AccidentTypes() {
  return (
    <section className="mx-auto max-w-[1280px] px-6 py-20">
      <div className="max-w-2xl">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">What happened?</p>
        <h2 className="mt-4 font-heading text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
          Different accidents raise different questions
        </h2>
        <p className="mt-4 text-lg text-muted-foreground">
          Different accidents create different insurance, evidence, and injury questions. Choose the situation that
          best matches what happened to you.
        </p>
      </div>

      <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {ACCIDENT_TYPES.map((t) => (
          <Link
            key={t.slug}
            to={`/accident-types/${t.slug}`}
            className="group relative flex h-64 flex-col justify-end overflow-hidden rounded-2xl shadow-lift transition-transform hover:-translate-y-1"
          >
            <Image src={t.image} alt={t.label} className="absolute inset-0 block h-full w-full transition-transform duration-500 group-hover:scale-105" fittingType="fill" focalPointX={0.5} focalPointY={0.5} />
            <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/55 to-transparent" />
            <div className="relative z-10 p-5 text-white">
              <h3 className="font-heading text-lg font-bold">{t.label}</h3>
              <p className="mt-1 text-sm text-white/75 line-clamp-2">{t.short}</p>
              <span className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-primary">
                Learn more <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </span>
            </div>
          </Link>
        ))}
      </div>

      <div className="mt-10 flex justify-center">
        <Link to="/claim" className="inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3.5 text-base font-semibold text-white shadow-float transition-transform hover:scale-[1.02]">
          Check my claim
        </Link>
      </div>
    </section>
  );
}