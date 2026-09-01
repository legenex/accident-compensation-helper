import React from "react";
import { Link } from "react-router-dom";
import { Car, Truck, CarFront, HardHat, ArrowRight } from "lucide-react";

const services = [
  { icon: Car, title: "Auto Accidents", blurb: "Getting paid for your injury shouldn't be an accident." },
  { icon: Truck, title: "Commercial Accidents", blurb: "Get the compensation you deserve from commercial vehicle incidents." },
  { icon: CarFront, title: "Rideshare Accidents", blurb: "Don't let rideshare companies deny your rightful claim." },
  { icon: HardHat, title: "Workplace Accidents", blurb: "Filing an injury claim shouldn't feel like working another job." },
];

export default function Services() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-24">
      <div className="max-w-2xl">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">What we cover</p>
        <h2 className="mt-4 font-heading text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl">
          We're accident compensation specialists
        </h2>
        <p className="mt-4 text-lg text-muted-foreground">
          Every case is special. Our team is large and diverse, but our mission is singular: to deliver the best
          results for you and your family.
        </p>
      </div>

      <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {services.map((s) => (
          <Link
            key={s.title}
            to="/claim"
            className="group relative overflow-hidden rounded-2xl border border-border bg-card p-7 shadow-lift transition-all hover:-translate-y-1 hover:shadow-float"
          >
            <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-primary/10 opacity-0 blur-2xl transition-opacity group-hover:opacity-100" />
            <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <s.icon className="h-6 w-6" />
            </span>
            <h3 className="mt-5 font-heading text-xl font-bold text-foreground">{s.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.blurb}</p>
            <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-primary">
              Check Your Claim
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}