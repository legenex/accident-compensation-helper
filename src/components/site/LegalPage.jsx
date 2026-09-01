import React from "react";
import PageHero from "./PageHero";

export default function LegalPage({ title, subtitle, updated, sections, crumbs }) {
  return (
    <>
      <PageHero title={title} subtitle={subtitle} crumbs={crumbs} />
      <section className="mx-auto max-w-3xl px-6 py-16">
        {updated && <p className="text-sm font-medium text-muted-foreground">Last updated: {updated}</p>}
        <div className="mt-8 prose-legal">
          {sections.map((s, i) => (
            <div key={i}>
              {s.heading && <h2>{s.heading}</h2>}
              {s.body && <p>{s.body}</p>}
              {s.paragraphs && s.paragraphs.map((p, j) => <p key={j}>{p}</p>)}
              {s.list && (
                <ul>
                  {s.list.map((li, j) => <li key={j}>{li}</li>)}
                </ul>
              )}
            </div>
          ))}
        </div>
        <div className="mt-12 rounded-xl bg-secondary/60 p-5 text-sm text-muted-foreground ring-1 ring-softblue-border">
          This content is provided for general information and is not legal advice. Legal content should be reviewed by
          qualified counsel before launch.
        </div>
      </section>
    </>
  );
}