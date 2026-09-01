import React, { useEffect, useState } from "react";
import { Users, Search, Trash2, Mail, Phone } from "lucide-react";
import { base44 } from "@/api/base44Client";
import { StatusPill, Loader, EmptyState, Drawer } from "@/components/admin/AdminShared";
import { formatCurrency } from "@/lib/claimEngine";

const STATUSES = ["New", "In Review", "Qualified", "Contacted", "Disqualified", "Closed"];

export default function Leads() {
  const [leads, setLeads] = useState(null);
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [active, setActive] = useState(null);
  const [notes, setNotes] = useState("");

  const load = () => {
    setLeads(null);
    base44.entities.Lead.list("-created_date", 500).then((r) => setLeads(r ?? [])).catch(() => setLeads([]));
  };
  useEffect(load, []);

  const filtered = (leads || []).filter((l) => {
    const matchesQ = !query || `${l.first_name} ${l.last_name} ${l.email} ${l.phone}`.toLowerCase().includes(query.toLowerCase());
    const matchesS = statusFilter === "All" || l.status === statusFilter;
    return matchesQ && matchesS;
  });

  const updateStatus = async (id, status) => {
    await base44.entities.Lead.update(id, { status });
    setLeads((prev) => (prev ?? []).map((l) => (l.id === id ? { ...l, status } : l)));
    if (active?.id === id) setActive((a) => ({ ...a, status }));
  };

  const saveNotes = async () => {
    if (!active) return;
    await base44.entities.Lead.update(active.id, { notes });
    setLeads((prev) => (prev ?? []).map((l) => (l.id === active.id ? { ...l, notes } : l)));
    setActive((a) => ({ ...a, notes }));
  };

  const remove = async (id) => {
    if (!confirm("Delete this lead? This cannot be undone.")) return;
    await base44.entities.Lead.delete(id);
    setLeads((prev) => (prev ?? []).filter((l) => l.id !== id));
    setActive(null);
  };

  if (leads === null) return <Loader />;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-heading text-3xl font-extrabold tracking-tight text-foreground">Leads</h1>
        <p className="mt-1 text-muted-foreground">Manage and qualify leads from the free claim check. Click a row for the X-Ray view.</p>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search name, email, phone..."
            className="h-11 w-full rounded-xl border border-input bg-card pl-10 pr-4 text-sm outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="h-11 rounded-xl border border-input bg-card px-4 text-sm outline-none focus:ring-2 focus:ring-primary"
        >
          <option value="All">All statuses</option>
          {STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
        </select>
      </div>

      {filtered.length === 0 ? (
        <EmptyState icon={Users} title="No leads found" desc={query || statusFilter !== "All" ? "Try adjusting your filters." : "Leads from the free claim check will appear here."} />
      ) : (
        <div className="overflow-x-auto rounded-2xl border border-border bg-card shadow-lift">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-secondary/40 text-left text-xs uppercase tracking-wider text-muted-foreground">
                <th className="px-5 py-3 font-medium">Name</th>
                <th className="px-5 py-3 font-medium">Accident</th>
                <th className="px-5 py-3 font-medium">State</th>
                <th className="px-5 py-3 font-medium">Tier</th>
                <th className="px-5 py-3 text-right font-medium">Est. range</th>
                <th className="px-5 py-3 font-medium">Status</th>
                <th className="px-5 py-3 font-medium">Created</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filtered.map((l) => (
                <tr
                  key={l.id}
                  onClick={() => { setActive(l); setNotes(l.notes || ""); }}
                  className="cursor-pointer transition-colors hover:bg-secondary/40"
                >
                  <td className="px-5 py-3.5">
                    <p className="font-medium text-foreground">{l.first_name} {l.last_name}</p>
                    <p className="text-xs text-muted-foreground">{l.email}</p>
                  </td>
                  <td className="px-5 py-3.5 text-muted-foreground">{l.accident_type || "-"}</td>
                  <td className="px-5 py-3.5 text-muted-foreground">{l.state || "-"}</td>
                  <td className="px-5 py-3.5"><span className="rounded-md bg-secondary px-2 py-0.5 text-xs font-medium text-muted-foreground">{l.qualification_tier || "-"}</span></td>
                  <td className="px-5 py-3.5 text-right tabular-nums text-foreground">{l.estimate_low && l.estimate_high ? `${formatCurrency(l.estimate_low)} - ${formatCurrency(l.estimate_high)}` : "-"}</td>
                  <td className="px-5 py-3.5"><StatusPill status={l.status} /></td>
                  <td className="px-5 py-3.5 text-muted-foreground">{new Date(l.created_date).toLocaleDateString("en-US")}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <Drawer open={!!active} onClose={() => setActive(null)} title={active ? `${active.first_name} ${active.last_name}` : ""}>
        {active && (
          <div className="space-y-6">
            <div className="flex items-center gap-2">
              <StatusPill status={active.status} />
              <span className="rounded-md bg-secondary px-2 py-0.5 text-xs font-medium text-muted-foreground">Tier {active.qualification_tier || "-"}</span>
            </div>

            <div className="grid gap-3 rounded-2xl bg-secondary/50 p-5">
              <div className="flex items-center gap-2 text-sm text-foreground"><Mail className="h-4 w-4 text-primary" /> {active.email || "-"}</div>
              <div className="flex items-center gap-2 text-sm text-foreground"><Phone className="h-4 w-4 text-primary" /> {active.phone || "-"}</div>
              <div className="flex items-center justify-between border-t border-border pt-3 text-sm">
                <span className="text-muted-foreground">Accident type</span>
                <span className="font-medium text-foreground">{active.accident_type || "-"}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">State</span>
                <span className="font-medium text-foreground">{active.state || "-"}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Estimate</span>
                <span className="font-medium text-foreground">{active.estimate_low && active.estimate_high ? `${formatCurrency(active.estimate_low)} - ${formatCurrency(active.estimate_high)}` : "-"}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Source</span>
                <span className="font-medium text-foreground">{active.source || "website"}</span>
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Update status</label>
              <div className="mt-2 flex flex-wrap gap-2">
                {STATUSES.map((s) => (
                  <button
                    key={s}
                    onClick={() => updateStatus(active.id, s)}
                    className={`rounded-full px-3.5 py-1.5 text-xs font-semibold transition-colors ${active.status === s ? "bg-primary text-white" : "bg-secondary text-muted-foreground hover:text-foreground"}`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Notes</label>
              <textarea
                rows={4}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Add internal notes about this lead..."
                className="mt-2 w-full rounded-xl border border-input bg-card px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-primary"
              />
              <button onClick={saveNotes} className="mt-2 rounded-lg bg-foreground px-4 py-2 text-sm font-semibold text-background hover:opacity-90">Save notes</button>
            </div>

            <button onClick={() => remove(active.id)} className="flex items-center gap-2 text-sm font-medium text-destructive hover:opacity-80">
              <Trash2 className="h-4 w-4" /> Delete lead
            </button>
          </div>
        )}
      </Drawer>
    </div>
  );
}