import React, { useEffect, useState } from "react";
import { FileCheck } from "lucide-react";
import { base44 } from "@/api/base44Client";
import { Loader, EmptyState } from "@/components/admin/AdminShared";

export default function ConsentRecords() {
  const [items, setItems] = useState(null);
  useEffect(() => {
    base44.entities.ConsentRecord.list("-created_date", 200).then((r) => setItems(r ?? [])).catch(() => setItems([]));
  }, []);
  if (items === null) return <Loader />;
  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-heading text-3xl font-extrabold tracking-tight text-foreground">Consent Records</h1>
        <p className="mt-1 text-muted-foreground">A record of each consent submitted through the claim check and contact form.</p>
      </div>
      {items.length === 0 ? (
        <EmptyState icon={FileCheck} title="No consent records yet" desc="Consent records will appear here as users submit forms." />
      ) : (
        <div className="overflow-x-auto rounded-2xl border border-border bg-card shadow-lift">
          <table className="w-full text-sm">
            <thead><tr className="border-b border-border bg-secondary/40 text-left text-xs uppercase tracking-wider text-muted-foreground">
              <th className="px-5 py-3 font-medium">Source</th>
              <th className="px-5 py-3 font-medium">Channels</th>
              <th className="px-5 py-3 font-medium">Version</th>
              <th className="px-5 py-3 font-medium">Page</th>
              <th className="px-5 py-3 font-medium">UTM source</th>
              <th className="px-5 py-3 font-medium">Timestamp</th>
            </tr></thead>
            <tbody className="divide-y divide-border">
              {items.map((m) => (
                <tr key={m.id} className="transition-colors hover:bg-secondary/40">
                  <td className="px-5 py-3.5 font-medium text-foreground">{m.submission_source || "—"}</td>
                  <td className="px-5 py-3.5 text-muted-foreground">{(m.channels || []).join(", ") || "—"}</td>
                  <td className="px-5 py-3.5 text-muted-foreground">{m.consent_version || "—"}</td>
                  <td className="px-5 py-3.5 text-muted-foreground">{m.page_url || "—"}</td>
                  <td className="px-5 py-3.5 text-muted-foreground">{m.utm_source || "—"}</td>
                  <td className="px-5 py-3.5 text-muted-foreground">{m.consented_at ? new Date(m.consented_at).toLocaleString("en-US") : "—"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}