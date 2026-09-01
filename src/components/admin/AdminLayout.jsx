import React from "react";
import { NavLink, Link, Outlet, useNavigate } from "react-router-dom";
import { LayoutDashboard, Users, FileText, Mail, Star, Scale, Settings, ShieldCheck, FileCheck, LogOut, ExternalLink } from "lucide-react";
import { useAuth } from "@/lib/AuthContext";
import { cn } from "@/lib/utils";

const nav = [
  { to: "/admin", label: "Dashboard", icon: LayoutDashboard, end: true },
  { to: "/admin/leads", label: "Leads", icon: Users },
  { to: "/admin/claims", label: "Claim Estimates", icon: FileText },
  { to: "/admin/messages", label: "Messages", icon: Mail },
  { to: "/admin/testimonials", label: "Testimonials", icon: Star },
  { to: "/admin/attorneys", label: "Attorneys", icon: Scale },
  { to: "/admin/privacy-requests", label: "Privacy Requests", icon: ShieldCheck },
  { to: "/admin/consent-records", label: "Consent Records", icon: FileCheck },
  { to: "/admin/settings", label: "Site Settings", icon: Settings },
];

export default function AdminLayout() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  if (user && user.role && user.role !== "admin") {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-background px-6 text-center">
        <h1 className="font-heading text-3xl font-bold text-foreground">Access restricted</h1>
        <p className="mt-3 max-w-md text-muted-foreground">This area is for administrators only. Your account does not have admin access.</p>
        <Link to="/" className="mt-8 rounded-full bg-primary px-6 py-3 font-semibold text-white">Back to site</Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-secondary/30">
      {/* top nav */}
      <header className="sticky top-0 z-40 border-b border-border bg-card/80 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-[1400px] items-center justify-between px-5 sm:px-8">
          <div className="flex items-center gap-2">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-white">
              <Scale className="h-5 w-5" />
            </span>
            <div className="leading-none">
              <p className="font-heading text-sm font-extrabold text-foreground">Compensation Helper</p>
              <p className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground">Admin</p>
            </div>
          </div>

          <nav className="hidden items-center gap-1 md:flex">
            {nav.map((n) => (
              <NavLink
                key={n.to}
                to={n.to}
                end={n.end}
                className={({ isActive }) =>
                  cn(
                    "flex items-center gap-2 rounded-lg px-3.5 py-2 text-sm font-medium transition-colors",
                    isActive ? "bg-primary/10 text-primary" : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                  )
                }
              >
                <n.icon className="h-4 w-4" />
                {n.label}
              </NavLink>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <Link to="/" className="hidden items-center gap-1.5 rounded-lg px-3 py-2 text-sm text-muted-foreground hover:bg-secondary hover:text-foreground sm:flex">
              <ExternalLink className="h-4 w-4" /> View site
            </Link>
            <div className="hidden text-right sm:block">
              <p className="text-sm font-medium text-foreground">{user?.full_name || user?.email || "Admin"}</p>
              <p className="text-xs text-muted-foreground">{user?.role || "admin"}</p>
            </div>
            <button
              onClick={() => { logout(); navigate("/login"); }}
              className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground hover:bg-secondary hover:text-foreground"
              aria-label="Log out"
            >
              <LogOut className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* mobile nav */}
        <div className="flex gap-1 overflow-x-auto border-t border-border px-4 py-2 md:hidden">
          {nav.map((n) => (
            <NavLink
              key={n.to}
              to={n.to}
              end={n.end}
              className={({ isActive }) =>
                cn("flex shrink-0 items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium", isActive ? "bg-primary/10 text-primary" : "text-muted-foreground")
              }
            >
              <n.icon className="h-3.5 w-3.5" /> {n.label}
            </NavLink>
          ))}
        </div>
      </header>

      <main className="mx-auto max-w-[1400px] px-5 py-8 sm:px-8">
        <Outlet />
      </main>
    </div>
  );
}