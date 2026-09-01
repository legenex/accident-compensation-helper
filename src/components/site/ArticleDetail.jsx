import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import { ArrowRight } from "lucide-react";
import PageHero from "@/components/site/PageHero";
import Meta from "@/components/site/Meta";
import { RESOURCES } from "@/lib/siteContent";

export default function ArticleDetail({ collection = "resources" }) {
  const { slug = "" } = useParams();
  useEffect(() => { window.scrollTo(0, 0); }, [slug]);
  const article = RESOURCES.find((r) => r.slug === slug);
  if (!article) return <PageHero title="Article not found" crumbs={[{ label: "Home", to: "/" }, { label: collection === "blog" ? "Blog" : "Resources", to: collection === "blog" ? "/blog" : "/resources" }]} />;

  const basePath = collection === "blog" ? "/blog" : "/resources";
  const articleJson = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.metaDescription,
    articleBody: article.body,
  };

  return (
    <>
      <Meta title={article.metaTitle} description={article.metaDescription} canonical={`${basePath}/${article.slug}`} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJson) }} />
      <PageHero eyebrow={article.category} title={article.title} subtitle={article.excerpt} crumbs={[{ label: "Home", to: "/" }, { label: collection === "blog" ? "Blog" : "Resources", to: basePath }, { label: article.title }]} />
      <section className="mx-auto max-w-3xl px-6 py-16">
        <div className="prose-legal">
          <ReactMarkdown>{article.body}</ReactMarkdown>
        </div>
        <div className="mt-12 rounded-2xl bg-secondary/60 p-7">
          <h2 className="font-heading text-xl font-bold text-foreground">Want to know if you may qualify?</h2>
          <p className="mt-2 text-muted-foreground">Take the free claim check. It takes about two minutes and there is no obligation.</p>
          <Link to="/claim" className="mt-5 inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3.5 text-base font-semibold text-white shadow-float transition-transform hover:scale-[1.02]">
            Start the free claim check <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <p className="mt-10 text-sm text-muted-foreground">
          This article is general information and is not legal advice. A licensed attorney can advise you about your
          particular circumstances.
        </p>
      </section>
    </>
  );
}