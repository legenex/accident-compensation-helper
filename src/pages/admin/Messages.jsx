import React, { useEffect, useState } from "react";
import { Mail, Trash2 } from "lucide-react";
import { base44 } from "@/api/base44Client";
import { StatusPill, Loader, EmptyState, Drawer } from "@/components/admin/AdminShared";

export default function Messages() {
  const [items, setItems] = useState(null);
  const [active, setActive] = useState(null);

  const load = () => {
    setItems(null);
    base44.entities.ContactMessage.list("-created_date", 200).then((r) => setItems(r ?? [])).catch(() => setItems([]));
  };
  useEffect(load, []);

  const setStatus = async (id, status) => {
    await base44.entities.ContactMessage.update(id, { status });
    setItems((prev) => (prev ?? []).map((m) => (m.id === id ? { ...m, status } : m)));
    if (active?.id === id) setActive((a) => ({ ...a, status }));
  };

  const remove = async (id) => {
    if (!confirm("Delete this message?")) return;
    await base44.entities.ContactMessage.delete(id);
    setItems((prev) => (prev ?? []).filter((m) => m.id !== id));
    setActive(null);
  };

  if (items === null) return <Loader />;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-heading text-3xl font-extrabold tracking-tight text-foreground">Messages</h1>
        <p className="mt-1 text-muted-foreground">Contact form submissions from the website.</p>
      </div>

      {items.length === 0 ? (
        <EmptyState icon={Mail} title="No messages yet" desc="Contact form submissions will appear here." />
      ) : (
        <div className="overflow-x-auto rounded-2xl border border-border bg-card shadow-lift">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-secondary/40 text-left text-xs uppercase tracking-wider text-muted-foreground">
                <th className="px-5 py-3 font-medium">Name</th>
                <th className="px-5 py-3 font-medium">Subject</th>
                <th className="px-5 py-3 font-medium">Date</th>
                <th className="px-5 py-3 font-medium">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {items.map((m) => (
                <tr key={m.id} onClick={() => { setActive(m); if (m.status === "New") setStatus(m.id, "Read"); }} className="cursor-pointer transition-colors hover:bg-secondary/40">
                  <td className="px-5 py-3.5">
                    <p className="font-medium text-foreground">{m.name}</p>
                    <p className="text-xs text-muted-foreground">{m.email}</p>
                  </td>
                  <td className="px-5 py-3.5 text-muted-foreground">{m.subject || "(no subject)"}</td>
                  <td className="px-5 py-3.5 text-muted-foreground">{new Date(m.created_date).toLocaleDateString("en-US")}</td>
                  <td className="px-5 py-3.5"><StatusPill status={m.status} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <Drawer open={!!active} onClose={() => setActive(null)} title={active?.name || ""}>
        {active && (
          <div className="space-y-5">
            <div className="rounded-2xl bg-secondary/50 p-5 text-sm">
              <p><span className="text-muted-foreground">From: </span><span className="font-medium text-foreground">{active.name}</span></p>
              <p className="mt-1"><span className="text-muted-foreground">Email: </span><span className="text-foreground">{active.email}</span></p>
              {active.phone && <p className="mt-1"><span className="text-muted-foreground">Phone: </span><span className="text-foreground">{active.phone}</span></p>}
              {active.subject && <p className="mt-1"><span className="text-muted-foreground">Subject: </span><span className="text-foreground">{active.subject}</span></p>}
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Message</p>
              <p className="mt-2 whitespace-pre-wrap leading-relaxed text-foreground">{active.message}</p>
            </div>
            <div className="flex gap-2">
              <button onClick={() => setStatus(active.id, "Responded")} className="rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-white hover:bg-primary/90">Mark responded</button>
              <button onClick={() => setStatus(active.id, "Archived")} className="rounded-lg bg-secondary px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground">Archive</button>
              <button onClick={() => remove(active.id)} className="ml-auto flex items-center gap-1.5 text-sm font-medium text-destructive hover:opacity-80"><Trash2 className="h-4 w-4" /> Delete</button>
            </div>
          </div>
        )}
      </Drawer>
    </div>
  );
}