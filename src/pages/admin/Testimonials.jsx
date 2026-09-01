import React, { useEffect, useState } from "react";
import { Star, Plus, Trash2, GripVertical } from "lucide-react";
import { base44 } from "@/api/base44Client";
import { Loader, EmptyState } from "@/components/admin/AdminShared";

const empty = { author_name: "", author_initials: "", author_location: "", time_ago: "", quote: "", rating: 5, active: true, sort_order: 0 };

export default function Testimonials() {
  const [items, setItems] = useState(null);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(empty);

  const load = () => {
    setItems(null);
    base44.entities.Testimonial.list("sort_order", 100).then((r) => setItems(r ?? [])).catch(() => setItems([]));
  };
  useEffect(load, []);

  const startNew = () => { setForm(empty); setEditing("new"); };
  const startEdit = (t) => { setForm({ ...t }); setEditing(t.id); };
  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  const save = async (e) => {
    e.preventDefault();
    const payload = { ...form, rating: Number(form.rating) || 5, sort_order: Number(form.sort_order) || 0 };
    if (editing === "new") {
      await base44.entities.Testimonial.create(payload);
    } else {
      await base44.entities.Testimonial.update(editing, payload);
    }
    setEditing(null);
    load();
  };

  const toggle = async (t) => {
    await base44.entities.Testimonial.update(t.id, { active: !t.active });
    setItems((prev) => (prev ?? []).map((x) => (x.id === t.id ? { ...x, active: !x.active } : x)));
  };

  const remove = async (id) => {
    if (!confirm("Delete this testimonial?")) return;
    await base44.entities.Testimonial.delete(id);
    setItems((prev) => (prev ?? []).filter((x) => x.id !== id));
  };

  if (items === null) return <Loader />;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-heading text-3xl font-extrabold tracking-tight text-foreground">Testimonials</h1>
          <p className="mt-1 text-muted-foreground">Manage the success stories shown on the public site.</p>
        </div>
        <button onClick={startNew} className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-white shadow-lift hover:bg-primary/90">
          <Plus className="h-4 w-4" /> Add testimonial
        </button>
      </div>

      {editing !== null && (
        <form onSubmit={save} className="rounded-2xl border border-border bg-card p-6 shadow-lift">
          <h2 className="font-heading text-lg font-bold text-foreground">{editing === "new" ? "New testimonial" : "Edit testimonial"}</h2>
          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            <div>
              <label className="text-xs font-medium text-muted-foreground">Author name</label>
              <input required value={form.author_name} onChange={(e) => set("author_name", e.target.value)} className="mt-1.5 h-11 w-full rounded-xl border border-input bg-card px-3 text-sm outline-none focus:ring-2 focus:ring-primary" />
            </div>
            <div>
              <label className="text-xs font-medium text-muted-foreground">Initials</label>
              <input value={form.author_initials} onChange={(e) => set("author_initials", e.target.value)} placeholder="JL" className="mt-1.5 h-11 w-full rounded-xl border border-input bg-card px-3 text-sm outline-none focus:ring-2 focus:ring-primary" />
            </div>
            <div>
              <label className="text-xs font-medium text-muted-foreground">Location</label>
              <input value={form.author_location} onChange={(e) => set("author_location", e.target.value)} placeholder="Tampa, FL" className="mt-1.5 h-11 w-full rounded-xl border border-input bg-card px-3 text-sm outline-none focus:ring-2 focus:ring-primary" />
            </div>
            <div>
              <label className="text-xs font-medium text-muted-foreground">Time ago</label>
              <input value={form.time_ago} onChange={(e) => set("time_ago", e.target.value)} placeholder="2 weeks ago" className="mt-1.5 h-11 w-full rounded-xl border border-input bg-card px-3 text-sm outline-none focus:ring-2 focus:ring-primary" />
            </div>
            <div className="sm:col-span-2">
              <label className="text-xs font-medium text-muted-foreground">Quote</label>
              <textarea required rows={3} value={form.quote} onChange={(e) => set("quote", e.target.value)} className="mt-1.5 w-full rounded-xl border border-input bg-card px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary" />
            </div>
            <div>
              <label className="text-xs font-medium text-muted-foreground">Rating (1-5)</label>
              <input type="number" min="1" max="5" value={form.rating} onChange={(e) => set("rating", e.target.value)} className="mt-1.5 h-11 w-full rounded-xl border border-input bg-card px-3 text-sm outline-none focus:ring-2 focus:ring-primary" />
            </div>
            <div>
              <label className="text-xs font-medium text-muted-foreground">Sort order</label>
              <input type="number" value={form.sort_order} onChange={(e) => set("sort_order", e.target.value)} className="mt-1.5 h-11 w-full rounded-xl border border-input bg-card px-3 text-sm outline-none focus:ring-2 focus:ring-primary" />
            </div>
          </div>
          <div className="mt-5 flex gap-2">
            <button type="submit" className="rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-white hover:bg-primary/90">Save</button>
            <button type="button" onClick={() => setEditing(null)} className="rounded-lg bg-secondary px-5 py-2.5 text-sm font-medium text-muted-foreground hover:text-foreground">Cancel</button>
          </div>
        </form>
      )}

      {items.length === 0 && editing === null ? (
        <EmptyState icon={Star} title="No testimonials yet" desc="Add success stories to display on the public site." action={<button onClick={startNew} className="rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-white">Add the first one</button>} />
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((t) => (
            <div key={t.id} className="rounded-2xl border border-border bg-card p-5 shadow-lift">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-2.5">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary">{t.author_initials || (t.author_name || "").slice(0, 2).toUpperCase()}</span>
                  <div>
                    <p className="font-heading text-sm font-bold text-foreground">{t.author_name}</p>
                    <p className="text-xs text-muted-foreground">{t.time_ago}{t.author_location ? ` - ${t.author_location}` : ""}</p>
                  </div>
                </div>
                <GripVertical className="h-4 w-4 text-muted-foreground/50" />
              </div>
              <div className="mt-2 flex gap-0.5">
                {Array.from({ length: t.rating || 5 }).map((_, i) => <Star key={i} className="h-3 w-3 fill-primary text-primary" />)}
              </div>
              <p className="mt-2 text-sm leading-relaxed text-foreground/80 line-clamp-3">{t.quote}</p>
              <div className="mt-4 flex items-center gap-2">
                <button onClick={() => toggle(t)} className={`rounded-full px-3 py-1 text-xs font-semibold ${t.active ? "bg-primary/10 text-primary" : "bg-secondary text-muted-foreground"}`}>{t.active ? "Active" : "Hidden"}</button>
                <button onClick={() => startEdit(t)} className="rounded-full bg-secondary px-3 py-1 text-xs font-medium text-muted-foreground hover:text-foreground">Edit</button>
                <button onClick={() => remove(t.id)} className="ml-auto flex items-center gap-1 text-xs font-medium text-destructive hover:opacity-80"><Trash2 className="h-3.5 w-3.5" /></button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}