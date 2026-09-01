import React from "react";
import { Link } from "react-router-dom";
import { ShieldCheck, Scale, Phone, Mail, MapPin } from "lucide-react";
import Logo from "./Logo";

export default function PublicFooter() {
  return (
    <footer className="bg-[#0F172A] text-white">
      {/* Final Call */}
      <div className="mx-auto max-w-7xl px-6 py-24 text-center">
        <p className="text-sm font-medium uppercase tracking-[0.2em] text-primary">Let's get what you deserve</p>
        <h2 className="mx-auto mt-6 max-w-4xl font-heading text-4xl font-extrabold leading-[1.05] tracking-tight sm:text-6xl">
          Your path to justice starts here.
        </h2>
        <p className="mx-auto mt-6 max-w-xl text-base text-white/70">
          Take the free claim check now. It takes less than two minutes, and there is no cost and no obligation.
        </p>
        <Link
          to="/claim"
          className="mt-10 inline-flex items-center justify-center rounded-full bg-primary px-8 py-4 text-base font-semibold text-white shadow-float transition-transform hover:scale-[1.02]"
        >
          Start Your Free Claim Check
        </Link>
        <p className="mt-6 text-sm text-white/50">100% Free. No obligation. Takes 2 minutes.</p>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto grid max-w-7xl gap-12 px-6 py-16 md:grid-cols-4">
          <div className="md:col-span-1">
            <Logo variant="light" />
            <p className="mt-5 max-w-xs text-sm text-white/60">
              Accident Compensation Helper connects accident victims with vetted attorneys on a no win, no fee basis.
            </p>
            <div className="mt-6 flex items-center gap-2 text-sm text-white/70">
              <ShieldCheck className="h-4 w-4 text-primary" />
              No win, no fee
            </div>
          </div>

          <div>
            <h3 className="text-xs font-semibold uppercase tracking-[0.18em] text-white/50">Explore</h3>
            <ul className="mt-5 space-y-3 text-sm text-white/70">
              <li><Link to="/" className="hover:text-white">Home</Link></li>
              <li><Link to="/claim" className="hover:text-white">Free Claim Check</Link></li>
              <li><Link to="/about" className="hover:text-white">About</Link></li>
              <li><Link to="/contact" className="hover:text-white">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-semibold uppercase tracking-[0.18em] text-white/50">Legal</h3>
            <ul className="mt-5 space-y-3 text-sm text-white/70">
              <li><Link to="/privacy" className="hover:text-white">Privacy Policy</Link></li>
              <li><Link to="/terms" className="hover:text-white">Terms of Service</Link></li>
              <li><Link to="/advertising" className="hover:text-white">Advertising Disclosure</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-semibold uppercase tracking-[0.18em] text-white/50">Contact</h3>
            <ul className="mt-5 space-y-3 text-sm text-white/70">
              <li className="flex items-center gap-2"><Phone className="h-4 w-4 text-primary" /> 1-800-CLAIM-HELP</li>
              <li className="flex items-center gap-2"><Mail className="h-4 w-4 text-primary" /> help@accidentcompensationhelper.com</li>
              <li className="flex items-center gap-2"><MapPin className="h-4 w-4 text-primary" /> Available nationwide</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-6 py-8 text-xs text-white/50 sm:flex-row">
          <p>© {new Date().getFullYear()} Accident Compensation Helper. All rights reserved.</p>
          <p className="flex items-center gap-2">
            <Scale className="h-3.5 w-3.5" />
            This is not a law firm and does not provide legal advice.
          </p>
        </div>
      </div>
    </footer>
  );
}