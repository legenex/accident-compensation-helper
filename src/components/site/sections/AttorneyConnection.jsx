import React from "react";
import { Link } from "react-router-dom";
import { Image } from "@/components/ui/image";
import { IMAGES } from "@/lib/siteContent";

export default function AttorneyConnection() {
  return (
    <section className="bg-secondary/50">
      <div className="mx-auto grid max-w-[1280px] items-center gap-12 px-6 py-20 lg:grid-cols-2">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">Attorney connection</p>
          <h2 className="mt-4 font-heading text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
            If appropriate, we can help you request an attorney review
          </h2>
          <p className="mt-5 text-lg text-muted-foreground">
            Accident Compensation Helper is not a law firm and does not provide legal advice. If you choose to request
            contact, your information may be shared with participating attorneys or legal service providers that may be
            able to review your situation.
          </p>
          <p className="mt-4 text-muted-foreground">
            An attorney decides independently whether to accept a matter. Any representation, contingency fee, costs,
            and attorney-client relationship are governed by a separate agreement between you and the attorney.
          </p>
          <p className="mt-4 text-muted-foreground">
            Many personal injury attorneys offer contingency-fee arrangements. Terms, fees, and responsibility for costs
            vary and must be confirmed directly with the attorney.
          </p>
          <Link to="/claim" className="mt-7 inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3.5 text-base font-semibold text-white shadow-float transition-transform hover:scale-[1.02]">
            Request an attorney review
          </Link>
        </div>
        <div className="overflow-hidden rounded-2xl shadow-float">
          <Image src={IMAGES.attorneyConsultation} alt="A claims support professional speaking with a person about their situation in a modern office" className="block aspect-[4/3] w-full" fittingType="fill" focalPointX={0.5} focalPointY={0.4} />
        </div>
      </div>
    </section>
  );
}