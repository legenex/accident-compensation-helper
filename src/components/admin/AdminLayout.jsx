import React, { useState } from "react";
import { NavLink, Link, Outlet, useNavigate } from "react-router-dom";
import {
  LayoutDashboard, Users, FileText, Mail, Star, Scale,
  Settings, ShieldCheck, FileCheck, LogOut, ExternalLink, Menu, X,
} from "lucide-react";
import { useAuth } from "@/lib/AuthContext";
import { cn } from "@/lib/utils";
import Logo from "@/components/site/Logo";

const groups = [
  {
    label: "Overview",
    items: [{ to: "/admin", label: "Dashboard", icon: LayoutDashboard, end: true }],
  },
  {
    label: "Intake",
    items: [
      { to: "/admin/leads", label: "Leads", icon: Users },
      { to: "/admin/claims", label: "Claim Estimates", icon: FileText },
      { to: "/admin/messages", label: "Messages", icon: Mail },
    ],
  },
  {
    label: "Content",
    items: [
      { to: "/admin/testimonials", label: "Testimonials", icon: Star },
      { to: "/admin/attorneys", label: "Attorneys", icon: Scale },
    ],
  },
  {
    label: "Compliance",
    items: [
      { to: "/admin/privacy-requests", label: "Privacy Requests", icon: ShieldCheck },
      { to: "/admin/consent-records", label: "Consent Records", icon: FileCheck },
    ],
  },
  {
    label: "Configuration",
    items: [{ to: "/admin/settings", label: "Site Settings", icon: Settings }],
  },
];

export default function AdminLayout() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);

  if (user && user.role && user.role !== "admin") {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-background px-6 text-center">
        <h1 className="font-heading text-3xl font-bold text-foreground">Access restricted</h1>
        <p className="mt-3 max-w-md text-muted-foreground">This area is for administrators only. Your account does not have admin access.</p>
        <Link to="/" className="mt-8 rounded-full bg-primary px-6 py-3 font-semibold text-white">Back to site</Link>
      </div>
    );
  }

  const SidebarContent = () => (
    <div className="flex h-full flex-col bg-navy text-white">
      <div className="flex h-16 items-center px-5">
        <Link to="/admin" onClick={() => setMobileOpen(false)}>
          <Logo variant="light" />
        </Link>
      </div>
      <nav className="flex-1 overflow-y-auto px-3 pb-6">
        {groups.map((g) => (
          <div key={g.label} className="mb-5">
            <p className="px-3 pb-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-white/35">{g.label}</p>
            <div className="space-y-0.5">
              {g.items.map((n) => (
                <NavLink
                  key={n.to}
                  to={n.to}
                  end={n.end}
                  onClick={() => setMobileOpen(false)}
                  className={({ isActive }) =>
                    cn(
                      "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                      isActive ? "bg-primary text-white" : "text-white/65 hover:bg-white/10 hover:text-white"
                    )
                  }
                >
                  <n.icon className="h-4 w-4 shrink-0" />
                  {n.label}
                </NavLink>
              ))}
            </div>
          </div>
        ))}
      </nav>
      <div className="border-t border-white/10 p-3">
        <Link
          to="/"
          className="flex items-center gap-2 rounded-lg px-3 py-2.5 text-sm font-medium text-white/60 transition-colors hover:bg-white/10 hover:text-white"
        >
          <ExternalLink className="h-4 w-4" /> View public site
        </Link>
      </div>
    </div>
  );

  return (
    <div className="flex min-h-screen bg-secondary/30">
      {/* Desktop sidebar */}
      <aside className="fixed inset-y-0 left-0 z-40 hidden w-64 lg:block">
        <SidebarContent />
      </aside>

      {/* Mobile sidebar */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black/50" onClick={() => setMobileOpen(false)} />
          <div className="absolute inset-y-0 left-0 w-64">
            <SidebarContent />
          </div>
          <button
            onClick={() => setMobileOpen(false)}
            className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-lg text-white/70 hover:bg-white/10"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
      )}

      {/* Main */}
      <div className="flex flex-1 flex-col lg:pl-64">
        <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-border bg-card/90 px-5 backdrop-blur sm:px-8">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileOpen(true)}
              className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground hover:bg-secondary lg:hidden"
            >
              <Menu className="h-5 w-5" />
            </button>
            <p className="font-heading text-sm font-bold text-foreground">Admin Panel</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="hidden text-right sm:block">
              <p className="text-sm font-medium text-foreground">{user?.full_name || user?.email || "Admin"}</p>
              <p className="text-xs text-muted-foreground capitalize">{user?.role || "admin"}</p>
            </div>
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-primary">
              {(user?.full_name || user?.email || "A").charAt(0).toUpperCase()}
            </div>
            <button
              onClick={() => { logout(); navigate("/login"); }}
              className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground hover:bg-secondary hover:text-foreground"
              aria-label="Log out"
            >
              <LogOut className="h-4 w-4" />
            </button>
          </div>
        </header>
        <main className="flex-1 px-5 py-8 sm:px-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}