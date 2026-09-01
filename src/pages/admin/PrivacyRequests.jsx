import React, { useEffect, useState } from "react";
import { ShieldCheck, Trash2 } from "lucide-react";
import { base44 } from "@/api/base44Client";
import { StatusPill, Loader, EmptyState, Drawer } from "@/components/admin/AdminShared";

export default function PrivacyRequests() {
  const [items, setItems] = useState(null);
  const [active, setActive] = useState(null);

  const load = () => {
    setItems(null);
    base44.entities.PrivacyRequest.list("-created_date", 200).then((r) => setItems(r ?? [])).catch(() => setItems([]));
  };
  useEffect(load, []);

  const setStatus = async (id, status) => {
    await base44.entities.PrivacyRequest.update(id, { status });
    setItems((prev) => (prev ?? []).map((m) => (m.id === id ? { ...m, status } : m)));
    if (active?.id === id) setActive((a) => ({ ...a, status }));
  };
  const remove = async (id) => {
    if (!confirm("Delete this privacy request?")) return;
    await base44.entities.PrivacyRequest.delete(id);
    setItems((prev) => (prev ?? []).filter((m) => m.id !== id));
    setActive(null);
  };

  if (items === null) return <Loader />;
  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-heading text-3xl font-extrabold tracking-tight text-foreground">Privacy Requests</h1>
        <p className="mt-1 text-muted-foreground">Access, correction, deletion, and opt-out requests submitted by users.</p>
      </div>
      {items.length === 0 ? (
        <EmptyState icon={ShieldCheck} title="No privacy requests yet" desc="User privacy requests will appear here." />
      ) : (
        <div className="overflow-x-auto rounded-2xl border border-border bg-card shadow-lift">
          <table className="w-full text-sm">
            <thead><tr className="border-b border-border bg-secondary/40 text-left text-xs uppercase tracking-wider text-muted-foreground">
              <th className="px-5 py-3 font-medium">Request type</th>
              <th className="px-5 py-3 font-medium">Email</th>
              <th className="px-5 py-3 font-medium">Date</th>
              <th className="px-5 py-3 font-medium">Status</th>
            </tr></thead>
            <tbody className="divide-y divide-border">
              {items.map((m) => (
                <tr key={m.id} onClick={() => setActive(m)} className="cursor-pointer transition-colors hover:bg-secondary/40">
                  <td className="px-5 py-3.5 font-medium text-foreground">{m.request_type}</td>
                  <td className="px-5 py-3.5 text-muted-foreground">{m.email}</td>
                  <td className="px-5 py-3.5 text-muted-foreground">{new Date(m.created_date).toLocaleDateString("en-US")}</td>
                  <td className="px-5 py-3.5"><StatusPill status={m.status} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      <Drawer open={!!active} onClose={() => setActive(null)} title={active ? `${active.request_type} request` : ""}>
        {active && (
          <div className="space-y-5">
            <div className="rounded-2xl bg-secondary/50 p-5 text-sm">
              <p><span className="text-muted-foreground">From: </span><span className="font-medium text-foreground">{active.name || "—"}</span></p>
              <p className="mt-1"><span className="text-muted-foreground">Email: </span><span className="text-foreground">{active.email}</span></p>
              {active.phone && <p className="mt-1"><span className="text-muted-foreground">Phone: </span><span className="text-foreground">{active.phone}</span></p>}
              {active.state && <p className="mt-1"><span className="text-muted-foreground">State: </span><span className="text-foreground">{active.state}</span></p>}
            </div>
            {active.details && <div><p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Details</p><p className="mt-2 whitespace-pre-wrap leading-relaxed text-foreground">{active.details}</p></div>}
            <div className="flex flex-wrap gap-2">
              {["New", "In Review", "Completed", "Denied"].map((s) => (
                <button key={s} onClick={() => setStatus(active.id, s)} className={`rounded-full px-3.5 py-1.5 text-xs font-semibold transition-colors ${active.status === s ? "bg-primary text-white" : "bg-secondary text-muted-foreground hover:text-foreground"}`}>{s}</button>
              ))}
              <button onClick={() => remove(active.id)} className="ml-auto flex items-center gap-1.5 text-sm font-medium text-destructive hover:opacity-80"><Trash2 className="h-4 w-4" /> Delete</button>
            </div>
          </div>
        )}
      </Drawer>
    </div>
  );
}