import React from "react";
import { cn } from "@/lib/utils";

export function StatTile({ icon: Icon, label, value, sub, accent }) {
  return (
    <div className="rounded-2xl border border-border bg-card p-6 shadow-lift">
      <div className="flex items-center justify-between">
        <span className={cn("flex h-11 w-11 items-center justify-center rounded-xl", accent ? "bg-primary/10 text-primary" : "bg-secondary text-muted-foreground")}>
          {Icon && <Icon className="h-5 w-5" />}
        </span>
        {sub && <span className="text-xs font-medium text-muted-foreground">{sub}</span>}
      </div>
      <p className="mt-4 font-heading text-3xl font-extrabold text-foreground">{value}</p>
      <p className="mt-1 text-sm text-muted-foreground">{label}</p>
    </div>
  );
}

const STATUS_STYLES = {
  New: "bg-primary/10 text-primary",
  "In Review": "bg-amber-100 text-amber-700",
  Qualified: "bg-emerald-100 text-emerald-700",
  Contacted: "bg-sky-100 text-sky-700",
  Disqualified: "bg-rose-100 text-rose-700",
  Closed: "bg-secondary text-muted-foreground",
  Partial: "bg-amber-100 text-amber-700",
  Complete: "bg-emerald-100 text-emerald-700",
  Read: "bg-sky-100 text-sky-700",
  Responded: "bg-emerald-100 text-emerald-700",
  Archived: "bg-secondary text-muted-foreground",
};

export function StatusPill({ status }) {
  return (
    <span className={cn("inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold", STATUS_STYLES[status] || "bg-secondary text-muted-foreground")}>
      {status || "New"}
    </span>
  );
}

export function Loader() {
  return (
    <div className="flex items-center justify-center py-20">
      <div className="h-8 w-8 rounded-full border-4 border-secondary border-t-primary animate-spin" />
    </div>
  );
}

export function EmptyState({ icon: Icon, title, desc, action }) {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-border bg-card/40 py-16 text-center">
      {Icon && (
        <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-secondary text-muted-foreground">
          <Icon className="h-6 w-6" />
        </span>
      )}
      <p className="mt-5 font-heading text-lg font-bold text-foreground">{title}</p>
      {desc && <p className="mt-1 max-w-sm text-sm text-muted-foreground">{desc}</p>}
      {action && <div className="mt-6">{action}</div>}
    </div>
  );
}

export function Drawer({ open, onClose, title, children }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-[80]">
      <div className="absolute inset-0 bg-foreground/30 backdrop-blur-sm" onClick={onClose} />
      <div className="absolute right-0 top-0 h-full w-full max-w-md overflow-y-auto border-l border-border bg-card shadow-float animate-slide-in-right">
        <div className="sticky top-0 flex items-center justify-between border-b border-border bg-card/80 px-6 py-4 backdrop-blur">
          <h3 className="font-heading text-lg font-bold text-foreground">{title}</h3>
          <button onClick={onClose} className="rounded-lg px-3 py-1.5 text-sm text-muted-foreground hover:bg-secondary">Close</button>
        </div>
        <div className="px-6 py-6">{children}</div>
      </div>
    </div>
  );
}