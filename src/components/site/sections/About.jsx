import React from "react";
import { Link } from "react-router-dom";
import { Users, Scale, BadgeDollarSign, HeartHandshake } from "lucide-react";
import { Image } from "@/components/ui/image";

const ABOUT_IMG = "https://media.base44.com/images/public/6a9667f0d469f05277f69ab4/d77e25e69_generated_image.png";

const stats = [
  { icon: Users, value: "10,000+", label: "People helped" },
  { icon: Scale, value: "500+", label: "Vetted attorneys" },
  { icon: BadgeDollarSign, value: "$0", label: "Upfront cost" },
  { icon: HeartHandshake, value: "100%", label: "Commitment" },
];

export default function About() {
  return (
    <section className="bg-secondary/40 py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div className="relative">
            <div className="absolute -inset-4 -z-10 rounded-[2rem] bg-gradient-to-tr from-primary/10 to-accent/30 blur-2xl" />
            <div className="overflow-hidden rounded-[2rem] border border-border bg-card shadow-float">
              <Image
                src={ABOUT_IMG}
                alt="A personal injury attorney consulting with a client"
                className="block aspect-[4/3] w-full"
                fittingType="fill"
                focalPointX={0.5}
                focalPointY={0.4}
              />
            </div>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">About us</p>
            <h2 className="mt-4 font-heading text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl">
              We're here to help accident victims
            </h2>
            <p className="mt-5 text-lg text-muted-foreground">
              At Accident Compensation Helper, our mission is simple: to empower those injured in accidents by providing
              a free, AI-powered claim check. We connect you with top attorneys who work on a no win, no fee basis, so you
              have nothing to lose.
            </p>
            <p className="mt-4 text-muted-foreground">
              With thousands helped nationwide, we're committed to fighting for the compensation you might deserve.
            </p>
            <Link to="/claim" className="mt-8 inline-flex items-center gap-2 rounded-full bg-primary px-7 py-4 text-base font-semibold text-white shadow-float transition-transform hover:scale-[1.02]">
              Get Your Free Claim Check
            </Link>
          </div>
        </div>

        <div className="mt-14 grid grid-cols-2 gap-5 lg:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label} className="rounded-2xl border border-border bg-card p-7 text-center shadow-lift">
              <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <s.icon className="h-6 w-6" />
              </span>
              <p className="mt-4 font-heading text-3xl font-extrabold text-foreground">{s.value}</p>
              <p className="mt-1 text-sm text-muted-foreground">{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}