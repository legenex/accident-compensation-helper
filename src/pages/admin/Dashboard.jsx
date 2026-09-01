import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Users, FileText, Mail, TrendingUp, DollarSign, Clock, ArrowRight } from "lucide-react";
import { base44 } from "@/api/base44Client";
import { StatTile, StatusPill, Loader, EmptyState } from "@/components/admin/AdminShared";
import { formatCurrency } from "@/lib/claimEngine";

export default function Dashboard() {
  const [leads, setLeads] = useState(null);
  const [claims, setClaims] = useState(null);
  const [messages, setMessages] = useState(null);

  useEffect(() => {
    base44.entities.Lead.list("-created_date", 200).then((r) => setLeads(r ?? [])).catch(() => setLeads([]));
    base44.entities.ClaimEstimate.list("-created_date", 200).then((r) => setClaims(r ?? [])).catch(() => setClaims([]));
    base44.entities.ContactMessage.list("-created_date", 50).then((r) => setMessages(r ?? [])).catch(() => setMessages([]));
  }, []);

  const loading = leads === null || claims === null || messages === null;
  if (loading) return <Loader />;

  const newLeads = leads.filter((l) => l.status === "New").length;
  const qualified = leads.filter((l) => l.status === "Qualified" || l.qualification_tier === "T1").length;
  const newMessages = messages.filter((m) => m.status === "New").length;
  const totalEstimated = claims.reduce((sum, c) => sum + (c.range_high || 0), 0);
  const avgEstimate = claims.length ? totalEstimated / claims.length : 0;
  const recentLeads = leads.slice(0, 6);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-heading text-3xl font-extrabold tracking-tight text-foreground">Dashboard</h1>
        <p className="mt-1 text-muted-foreground">Claim command center. Real-time view of leads, estimates, and pipeline value.</p>
      </div>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <StatTile icon={Users} label="Total leads" value={leads.length} sub={`${newLeads} new`} accent />
        <StatTile icon={TrendingUp} label="Qualified" value={qualified} sub="T1 + Qualified" />
        <StatTile icon={DollarSign} label="Pipeline value" value={formatCurrency(totalEstimated)} sub="est. high" accent />
        <StatTile icon={Mail} label="New messages" value={newMessages} sub="unread" />
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 rounded-2xl border border-border bg-card p-6 shadow-lift">
          <div className="flex items-center justify-between">
            <h2 className="font-heading text-lg font-bold text-foreground">Recent leads</h2>
            <Link to="/admin/leads" className="inline-flex items-center gap-1 text-sm font-semibold text-primary">
              View all <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          {recentLeads.length === 0 ? (
            <EmptyState icon={Users} title="No leads yet" desc="Leads from the free claim check will appear here." />
          ) : (
            <div className="mt-5 overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border text-left text-xs uppercase tracking-wider text-muted-foreground">
                    <th className="pb-3 font-medium">Name</th>
                    <th className="pb-3 font-medium">Type</th>
                    <th className="pb-3 font-medium">State</th>
                    <th className="pb-3 text-right font-medium">Est. high</th>
                    <th className="pb-3 font-medium">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {recentLeads.map((l) => (
                    <tr key={l.id} className="transition-colors hover:bg-secondary/50">
                      <td className="py-3 font-medium text-foreground">{l.first_name} {l.last_name}</td>
                      <td className="py-3 text-muted-foreground">{l.accident_type || "-"}</td>
                      <td className="py-3 text-muted-foreground">{l.state || "-"}</td>
                      <td className="py-3 text-right font-medium tabular-nums text-foreground">{l.estimate_high ? formatCurrency(l.estimate_high) : "-"}</td>
                      <td className="py-3"><StatusPill status={l.status} /></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        <div className="rounded-2xl border border-border bg-card p-6 shadow-lift">
          <h2 className="font-heading text-lg font-bold text-foreground">Pipeline snapshot</h2>
          <div className="mt-5 space-y-4">
            <div className="rounded-xl bg-secondary/60 p-4">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Avg. estimate</span>
                <span className="font-semibold text-foreground">{formatCurrency(avgEstimate)}</span>
              </div>
            </div>
            <div className="rounded-xl bg-secondary/60 p-4">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Claim estimates</span>
                <span className="font-semibold text-foreground">{claims.length}</span>
              </div>
            </div>
            <div className="rounded-xl bg-secondary/60 p-4">
              <div className="flex items-center justify-between text-sm">
                <span className="flex items-center gap-1.5 text-muted-foreground"><Clock className="h-3.5 w-3.5" /> Conversion</span>
                <span className="font-semibold text-foreground">{leads.length ? Math.round((qualified / leads.length) * 100) : 0}%</span>
              </div>
            </div>
            <Link to="/admin/claims" className="block rounded-xl bg-primary/10 p-4 text-sm font-semibold text-primary transition-colors hover:bg-primary/15">
              Review claim estimates <ArrowRight className="ml-1 inline h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}