import React from "react";
import { Link } from "react-router-dom";
import { Image } from "@/components/ui/image";
import { HOW_IT_WORKS, IMAGES } from "@/lib/siteContent";

export default function HowItWorks() {
  return (
    <section className="mx-auto max-w-[1280px] px-6 py-20">
      <div className="max-w-2xl">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">How it works</p>
        <h2 className="mt-4 font-heading text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
          A clearer next step after an accident
        </h2>
      </div>

      {/* Desktop horizontal timeline */}
      <div className="mt-12 hidden lg:block">
        <div className="relative">
          <div className="absolute left-0 right-0 top-6 h-0.5 bg-softblue-border" />
          <div className="grid grid-cols-4 gap-6">
            {HOW_IT_WORKS.map((s) => (
              <div key={s.step} className="relative">
                <span className="relative z-10 flex h-12 w-12 items-center justify-center rounded-full bg-primary font-heading text-lg font-bold text-white shadow-float">
                  {s.step}
                </span>
                <h3 className="mt-5 font-heading text-lg font-bold text-foreground">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Mobile stacked timeline */}
      <div className="mt-10 space-y-6 lg:hidden">
        {HOW_IT_WORKS.map((s) => (
          <div key={s.step} className="flex gap-4">
            <div className="flex flex-col items-center">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary font-heading text-base font-bold text-white">{s.step}</span>
              <div className="mt-2 w-px flex-1 bg-softblue-border" />
            </div>
            <div className="pb-2">
              <h3 className="font-heading text-lg font-bold text-foreground">{s.title}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{s.desc}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-14 grid items-center gap-10 rounded-2xl bg-secondary/50 p-8 lg:grid-cols-2 lg:p-12">
        <div>
          <h3 className="font-heading text-2xl font-bold text-foreground">See the claim check in action</h3>
          <p className="mt-3 text-muted-foreground">
            The claim check asks a short series of questions and provides an informational assessment. It is not a
            legal opinion or a guarantee of any outcome. You choose whether to request contact with a participating
            attorney.
          </p>
          <Link to="/claim" className="mt-6 inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3.5 text-base font-semibold text-white shadow-float transition-transform hover:scale-[1.02]">
            Try the claim check
          </Link>
        </div>
        <div className="overflow-hidden rounded-xl shadow-lift">
          <Image src={IMAGES.claimCheck} alt="A person completing an accident claim questionnaire on a phone at home" className="block aspect-[4/3] w-full" fittingType="fill" focalPointX={0.5} focalPointY={0.4} />
        </div>
      </div>
    </section>
  );
}