import { useEffect, useState } from "react";
import { base44 } from "@/api/base44Client";

let settingsCache = { loaded: false, value: null };

export function useSiteSettings() {
  const [settings, setSettings] = useState(settingsCache.loaded ? settingsCache.value : null);
  useEffect(() => {
    if (settingsCache.loaded) return;
    base44.entities.SiteSettings.list()
      .then((r) => {
        const s = (r && r[0]) || null;
        settingsCache = { loaded: true, value: s };
        setSettings(s);
      })
      .catch(() => { settingsCache = { loaded: true, value: null }; setSettings(null); });
  }, []);
  return settings;
}

export function getAttribution() {
  const p = new URLSearchParams(window.location.search);
  return {
    utm_source: p.get("utm_source") || "",
    utm_medium: p.get("utm_medium") || "",
    utm_campaign: p.get("utm_campaign") || "",
    utm_content: p.get("utm_content") || "",
    utm_term: p.get("utm_term") || "",
    gclid: p.get("gclid") || "",
    gbraid: p.get("gbraid") || "",
    wbraid: p.get("wbraid") || "",
    fbclid: p.get("fbclid") || "",
    ttclid: p.get("ttclid") || "",
    msclkid: p.get("msclkid") || "",
    event_id: p.get("event_id") || "",
    landing_url: window.location.pathname,
    referrer: document.referrer || "",
  };
}

export function getSessionId() {
  let id = sessionStorage.getItem("ach_session_id");
  if (!id) {
    id = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
    sessionStorage.setItem("ach_session_id", id);
  }
  return id;
}

export function trackEvent(name, props = {}) {
  try {
    if (window.dataLayer) window.dataLayer.push({ event: name, ...props });
  } catch {}
}