import React, { useEffect, useState } from "react";
import { Scale, Plus, Trash2 } from "lucide-react";
import { base44 } from "@/api/base44Client";
import { Loader, EmptyState } from "@/components/admin/AdminShared";

const empty = { name: "", firm: "", state: "", specialty: "", phone: "", email: "", rating: 5, cases_won: 0, active: true, sort_order: 0 };

export default function Attorneys() {
  const [items, setItems] = useState(null);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(empty);

  const load = () => {
    setItems(null);
    base44.entities.Attorney.list("sort_order", 100).then((r) => setItems(r ?? [])).catch(() => setItems([]));
  };
  useEffect(load, []);

  const startNew = () => { setForm(empty); setEditing("new"); };
  const startEdit = (a) => { setForm({ ...a }); setEditing(a.id); };
  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  const save = async (e) => {
    e.preventDefault();
    const payload = { ...form, rating: Number(form.rating) || 5, cases_won: Number(form.cases_won) || 0, sort_order: Number(form.sort_order) || 0 };
    if (editing === "new") await base44.entities.Attorney.create(payload);
    else await base44.entities.Attorney.update(editing, payload);
    setEditing(null);
    load();
  };

  const toggle = async (a) => {
    await base44.entities.Attorney.update(a.id, { active: !a.active });
    setItems((prev) => (prev ?? []).map((x) => (x.id === a.id ? { ...x, active: !x.active } : x)));
  };

  const remove = async (id) => {
    if (!confirm("Remove this attorney?")) return;
    await base44.entities.Attorney.delete(id);
    setItems((prev) => (prev ?? []).filter((x) => x.id !== id));
  };

  if (items === null) return <Loader />;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-heading text-3xl font-extrabold tracking-tight text-foreground">Attorneys</h1>
          <p className="mt-1 text-muted-foreground">Manage your vetted attorney network.</p>
        </div>
        <button onClick={startNew} className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-white shadow-lift hover:bg-primary/90">
          <Plus className="h-4 w-4" /> Add attorney
        </button>
      </div>

      {editing !== null && (
        <form onSubmit={save} className="rounded-2xl border border-border bg-card p-6 shadow-lift">
          <h2 className="font-heading text-lg font-bold text-foreground">{editing === "new" ? "New attorney" : "Edit attorney"}</h2>
          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            <div>
              <label className="text-xs font-medium text-muted-foreground">Name</label>
              <input required value={form.name} onChange={(e) => set("name", e.target.value)} className="mt-1.5 h-11 w-full rounded-xl border border-input bg-card px-3 text-sm outline-none focus:ring-2 focus:ring-primary" />
            </div>
            <div>
              <label className="text-xs font-medium text-muted-foreground">Firm</label>
              <input value={form.firm} onChange={(e) => set("firm", e.target.value)} className="mt-1.5 h-11 w-full rounded-xl border border-input bg-card px-3 text-sm outline-none focus:ring-2 focus:ring-primary" />
            </div>
            <div>
              <label className="text-xs font-medium text-muted-foreground">State</label>
              <input value={form.state} onChange={(e) => set("state", e.target.value)} className="mt-1.5 h-11 w-full rounded-xl border border-input bg-card px-3 text-sm outline-none focus:ring-2 focus:ring-primary" />
            </div>
            <div>
              <label className="text-xs font-medium text-muted-foreground">Specialty</label>
              <input value={form.specialty} onChange={(e) => set("specialty", e.target.value)} className="mt-1.5 h-11 w-full rounded-xl border border-input bg-card px-3 text-sm outline-none focus:ring-2 focus:ring-primary" />
            </div>
            <div>
              <label className="text-xs font-medium text-muted-foreground">Phone</label>
              <input value={form.phone} onChange={(e) => set("phone", e.target.value)} className="mt-1.5 h-11 w-full rounded-xl border border-input bg-card px-3 text-sm outline-none focus:ring-2 focus:ring-primary" />
            </div>
            <div>
              <label className="text-xs font-medium text-muted-foreground">Email</label>
              <input type="email" value={form.email} onChange={(e) => set("email", e.target.value)} className="mt-1.5 h-11 w-full rounded-xl border border-input bg-card px-3 text-sm outline-none focus:ring-2 focus:ring-primary" />
            </div>
            <div>
              <label className="text-xs font-medium text-muted-foreground">Rating (1-5)</label>
              <input type="number" min="1" max="5" value={form.rating} onChange={(e) => set("rating", e.target.value)} className="mt-1.5 h-11 w-full rounded-xl border border-input bg-card px-3 text-sm outline-none focus:ring-2 focus:ring-primary" />
            </div>
            <div>
              <label className="text-xs font-medium text-muted-foreground">Cases won</label>
              <input type="number" value={form.cases_won} onChange={(e) => set("cases_won", e.target.value)} className="mt-1.5 h-11 w-full rounded-xl border border-input bg-card px-3 text-sm outline-none focus:ring-2 focus:ring-primary" />
            </div>
          </div>
          <div className="mt-5 flex gap-2">
            <button type="submit" className="rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-white hover:bg-primary/90">Save</button>
            <button type="button" onClick={() => setEditing(null)} className="rounded-lg bg-secondary px-5 py-2.5 text-sm font-medium text-muted-foreground hover:text-foreground">Cancel</button>
          </div>
        </form>
      )}

      {items.length === 0 && editing === null ? (
        <EmptyState icon={Scale} title="No attorneys yet" desc="Add attorneys to your vetted network." action={<button onClick={startNew} className="rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-white">Add the first one</button>} />
      ) : (
        <div className="overflow-x-auto rounded-2xl border border-border bg-card shadow-lift">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-secondary/40 text-left text-xs uppercase tracking-wider text-muted-foreground">
                <th className="px-5 py-3 font-medium">Attorney</th>
                <th className="px-5 py-3 font-medium">Firm</th>
                <th className="px-5 py-3 font-medium">State</th>
                <th className="px-5 py-3 font-medium">Specialty</th>
                <th className="px-5 py-3 text-right font-medium">Cases won</th>
                <th className="px-5 py-3 font-medium">Status</th>
                <th className="px-5 py-3"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {items.map((a) => (
                <tr key={a.id} className="transition-colors hover:bg-secondary/40">
                  <td className="px-5 py-3.5 font-medium text-foreground">{a.name}</td>
                  <td className="px-5 py-3.5 text-muted-foreground">{a.firm || "-"}</td>
                  <td className="px-5 py-3.5 text-muted-foreground">{a.state || "-"}</td>
                  <td className="px-5 py-3.5 text-muted-foreground">{a.specialty || "-"}</td>
                  <td className="px-5 py-3.5 text-right tabular-nums text-foreground">{a.cases_won || 0}</td>
                  <td className="px-5 py-3.5">
                    <button onClick={() => toggle(a)} className={`rounded-full px-3 py-1 text-xs font-semibold ${a.active ? "bg-primary/10 text-primary" : "bg-secondary text-muted-foreground"}`}>{a.active ? "Active" : "Inactive"}</button>
                  </td>
                  <td className="px-5 py-3.5 text-right">
                    <button onClick={() => startEdit(a)} className="rounded-lg px-2.5 py-1 text-xs font-medium text-muted-foreground hover:bg-secondary hover:text-foreground">Edit</button>
                    <button onClick={() => remove(a.id)} className="ml-1 inline-flex items-center rounded-lg px-2.5 py-1 text-xs font-medium text-destructive hover:opacity-80"><Trash2 className="h-3.5 w-3.5" /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}