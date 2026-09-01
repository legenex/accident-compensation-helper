import React from "react";
import { cn } from "@/lib/utils";

export default function Logo({ className, variant = "dark", mark = false }) {
  const textColor = variant === "dark" ? "text-foreground" : "text-white";
  const accent = "text-primary";
  return (
    <div className={cn("flex items-center gap-2.5 select-none", className)}>
      <span className="relative flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-white shadow-lift">
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 2 3 7v6c0 5 4 8 9 9 5-1 9-4 9-9V7l-9-5Z" />
          <path d="m9 12 2 2 4-4" />
        </svg>
      </span>
      {!mark && (
        <span className={cn("font-heading text-[17px] font-extrabold leading-none tracking-tight", textColor)}>
          Accident<span className={accent}>Compensation</span>
          <span className={cn("ml-1 text-[11px] font-medium uppercase tracking-[0.18em]", variant === "dark" ? "text-muted-foreground" : "text-white/60")}>Helper</span>
        </span>
      )}
    </div>
  );
}