import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import Logo from "./Logo";
import { cn } from "@/lib/utils";

const links = [
  { label: "Home", to: "/" },
  { label: "How It Works", to: "/#how-it-works" },
  { label: "About", to: "/about" },
  { label: "FAQ", to: "/#faq" },
  { label: "Contact", to: "/contact" },
];

export default function PublicNav() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50">
        <div className="glass border-b border-border/60">
          <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 sm:px-8">
            <Link to="/" className="flex items-center" aria-label="Accident Compensation Helper home">
              <Logo />
            </Link>
            <nav className="hidden items-center gap-1 md:flex">
              {links.map((l) => (
                <NavLink
                  key={l.label}
                  to={l.to}
                  end={l.to === "/"}
                  className={({ isActive }) =>
                    cn(
                      "rounded-lg px-3.5 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground",
                      isActive && "text-foreground"
                    )
                  }
                >
                  {l.label}
                </NavLink>
              ))}
            </nav>
            <div className="hidden md:block">
              <Button asChild className="rounded-full bg-primary px-5 text-sm font-semibold shadow-lift hover:bg-primary/90">
                <Link to="/claim">Start Your Free Claim Check</Link>
              </Button>
            </div>
            <button
              className="flex h-10 w-10 items-center justify-center rounded-lg text-foreground md:hidden"
              onClick={() => setOpen(true)}
              aria-label="Open menu"
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </div>
      </header>

      {open && (
        <div className="fixed inset-0 z-[70] md:hidden">
          <div className="absolute inset-0 bg-background/80 backdrop-blur-2xl" onClick={() => setOpen(false)} />
          <div className="relative flex h-full flex-col px-6 pt-8">
            <div className="flex items-center justify-between">
              <Logo />
              <button onClick={() => setOpen(false)} className="flex h-10 w-10 items-center justify-center rounded-lg" aria-label="Close menu">
                <X className="h-5 w-5" />
              </button>
            </div>
            <nav className="mt-16 flex flex-col gap-2">
              {links.map((l, i) => (
                <Link
                  key={l.label}
                  to={l.to}
                  onClick={() => setOpen(false)}
                  className="font-heading text-5xl font-extrabold tracking-tight text-foreground/80 transition-colors hover:text-primary"
                  style={{ animationDelay: `${i * 40}ms` }}
                >
                  {l.label}
                </Link>
              ))}
            </nav>
            <div className="mt-auto pb-12">
              <Button asChild className="w-full rounded-full bg-primary py-6 text-base font-semibold shadow-lift">
                <Link to="/claim" onClick={() => setOpen(false)}>Start Your Free Claim Check</Link>
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}