import React, { useState } from "react";
import { Phone, Mail, MapPin, Send, Check } from "lucide-react";
import { base44 } from "@/api/base44Client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";

export default function Contact() {
  const { toast } = useToast();
  const [form, setForm] = useState({ name: "", email: "", phone: "", subject: "", message: "" });
  const [saving, setSaving] = useState(false);
  const [done, setDone] = useState(false);

  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  const submit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await base44.entities.ContactMessage.create(form);
      setDone(true);
      toast({ title: "Message sent", description: "We'll be in touch shortly." });
    } catch {
      toast({ title: "Something went wrong", description: "Please try again.", variant: "destructive" });
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="pt-16">
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-secondary/60 to-background" />
        <div className="mx-auto max-w-4xl px-6 py-24 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">Contact</p>
          <h1 className="mt-5 font-heading text-5xl font-extrabold tracking-tight text-foreground sm:text-6xl">
            We're here to help
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
            Have a question or want to talk through your situation? Reach out and our team will get back to you.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-12">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.4fr]">
          <div className="space-y-4">
            {[
              { icon: Phone, label: "Call us", value: "1-800-CLAIM-HELP", href: "tel:18002534243" },
              { icon: Mail, label: "Email us", value: "help@accidentcompensationhelper.com", href: "mailto:help@accidentcompensationhelper.com" },
              { icon: MapPin, label: "Availability", value: "Available nationwide" },
            ].map((c) => (
              <a
                key={c.label}
                href={c.href || undefined}
                className="flex items-center gap-4 rounded-2xl border border-border bg-card p-5 shadow-lift transition-transform hover:-translate-y-0.5"
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <c.icon className="h-5 w-5" />
                </span>
                <div>
                  <p className="text-xs text-muted-foreground">{c.label}</p>
                  <p className="font-heading text-base font-bold text-foreground">{c.value}</p>
                </div>
              </a>
            ))}
          </div>

          <div className="rounded-3xl border border-border bg-card p-8 shadow-float">
            {done ? (
              <div className="flex h-full flex-col items-center justify-center py-12 text-center">
                <span className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <Check className="h-8 w-8" />
                </span>
                <h2 className="mt-6 font-heading text-2xl font-bold">Message sent</h2>
                <p className="mt-2 text-muted-foreground">Thank you. Our team will reach out shortly.</p>
              </div>
            ) : (
              <form onSubmit={submit} className="space-y-5">
                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <Label className="text-muted-foreground">Name</Label>
                    <Input required value={form.name} onChange={(e) => set("name", e.target.value)} className="mt-2 h-12 rounded-xl" />
                  </div>
                  <div>
                    <Label className="text-muted-foreground">Email</Label>
                    <Input required type="email" value={form.email} onChange={(e) => set("email", e.target.value)} className="mt-2 h-12 rounded-xl" />
                  </div>
                </div>
                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <Label className="text-muted-foreground">Phone</Label>
                    <Input type="tel" value={form.phone} onChange={(e) => set("phone", e.target.value)} className="mt-2 h-12 rounded-xl" />
                  </div>
                  <div>
                    <Label className="text-muted-foreground">Subject</Label>
                    <Input value={form.subject} onChange={(e) => set("subject", e.target.value)} className="mt-2 h-12 rounded-xl" />
                  </div>
                </div>
                <div>
                  <Label className="text-muted-foreground">Message</Label>
                  <textarea
                    required
                    rows={5}
                    value={form.message}
                    onChange={(e) => set("message", e.target.value)}
                    className="mt-2 w-full rounded-xl border border-input bg-card px-4 py-3 text-foreground outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
                <Button type="submit" disabled={saving} className="w-full gap-2 rounded-full bg-primary py-6 text-base font-semibold shadow-float hover:bg-primary/90">
                  {saving ? "Sending..." : "Send Message"}
                  <Send className="h-4 w-4" />
                </Button>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}