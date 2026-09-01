import { useEffect } from "react";

export default function Meta({ title, description, canonical, image, noindex }) {
  useEffect(() => {
    if (title) document.title = title;
    const upsert = (attr, key, content) => {
      if (!content) return;
      let el = document.querySelector(`meta[${attr}="${key}"]`);
      if (!el) {
        el = document.createElement("meta");
        el.setAttribute(attr, key);
        document.head.appendChild(el);
      }
      el.setAttribute("content", content);
    };
    upsert("name", "description", description);
    upsert("property", "og:title", title);
    upsert("property", "og:description", description);
    upsert("property", "og:image", image);
    upsert("property", "og:type", "website");
    upsert("name", "twitter:card", image ? "summary_large_image" : "summary");
    upsert("name", "twitter:title", title);
    upsert("name", "twitter:description", description);
    upsert("name", "twitter:image", image);

    let robots = document.querySelector('meta[name="robots"]');
    if (!robots) {
      robots = document.createElement("meta");
      robots.name = "robots";
      document.head.appendChild(robots);
    }
    robots.content = noindex ? "noindex,nofollow" : "index,follow";

    if (canonical) {
      let link = document.querySelector('link[rel="canonical"]');
      if (!link) {
        link = document.createElement("link");
        link.rel = "canonical";
        document.head.appendChild(link);
      }
      link.href = canonical;
    }
  }, [title, description, canonical, image, noindex]);
  return null;
}