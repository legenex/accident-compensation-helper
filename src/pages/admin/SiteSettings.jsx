import React, { useEffect, useState } from "react";
import { Settings, Save } from "lucide-react";
import { base44 } from "@/api/base44Client";
import { Loader } from "@/components/admin/AdminShared";

const FIELDS = [
  { key: "legal_business_name", label: "Legal business name" },
  { key: "brand_name", label: "Brand name" },
  { key: "support_email", label: "Support email" },
  { key: "support_phone", label: "Support phone" },
  { key: "business_address", label: "Business address" },
  { key: "service_hours", label: "Service hours" },
  { key: "states_served", label: "States served" },
  { key: "contact_response_expectation", label: "Contact response expectation" },
  { key: "privacy_contact", label: "Privacy contact" },
  { key: "legal_contact", label: "Legal contact" },
];

const empty = { brand_name: "Accident Compensation Helper", phone_enabled: false, is_24_hour: false };

export default function SiteSettingsAdmin() {
  const [record, setRecord] = useState(null);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState(empty);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    base44.entities.SiteSettings.list().then((r) => {
      const rec = (r && r[0]) || null;
      setRecord(rec);
      setForm({ ...empty, ...(rec || {}) });
    }).catch(() => { setRecord(null); setForm(empty); })
      .finally(() => setLoading(false));
  }, []);

  const set = (k, v) => { setForm((f) => ({ ...f, [k]: v })); setSaved(false); };

  const save = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      if (record?.id) await base44.entities.SiteSettings.update(record.id, form);
      else { const created = await base44.entities.SiteSettings.create(form); setRecord(created); }
      setSaved(true);
    } catch {}
    setSaving(false);
  };

  if (loading) return <Loader />;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-heading text-3xl font-extrabold tracking-tight text-foreground">Site Settings</h1>
        <p className="mt-1 text-muted-foreground">Centrally managed business and contact information. If phone is not enabled, phone call-to-actions are hidden on the public site.</p>
      </div>
      <form onSubmit={save} className="rounded-2xl border border-border bg-card p-6 shadow-lift">
        <div className="grid gap-4 sm:grid-cols-2">
          {FIELDS.map((f) => (
            <div key={f.key}>
              <label className="text-xs font-medium text-muted-foreground">{f.label}</label>
              <input value={form[f.key] || ""} onChange={(e) => set(f.key, e.target.value)} className="mt-1.5 h-11 w-full rounded-xl border border-input bg-card px-3 text-sm outline-none focus:ring-2 focus:ring-primary" />
            </div>
          ))}
        </div>
        <div className="mt-5 flex flex-wrap gap-6">
          <label className="flex items-center gap-2 text-sm text-foreground">
            <input type="checkbox" checked={!!form.phone_enabled} onChange={(e) => set("phone_enabled", e.target.checked)} className="h-4 w-4 rounded border-input text-primary focus:ring-primary" />
            Phone support enabled (show phone call-to-actions)
          </label>
          <label className="flex items-center gap-2 text-sm text-foreground">
            <input type="checkbox" checked={!!form.is_24_hour} onChange={(e) => set("is_24_hour", e.target.checked)} className="h-4 w-4 rounded border-input text-primary focus:ring-primary" />
            24-hour availability
          </label>
        </div>
        <div className="mt-6 flex items-center gap-3">
          <button type="submit" disabled={saving} className="inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-white hover:bg-primary/90 disabled:opacity-50">
            <Save className="h-4 w-4" /> {saving ? "Saving..." : "Save settings"}
          </button>
          {saved && <span className="text-sm font-medium text-success">Saved</span>}
        </div>
      </form>
    </div>
  );
}