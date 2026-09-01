import React from "react";
import { Link } from "react-router-dom";
import { ShieldCheck, Mail, Scale } from "lucide-react";
import Logo from "./Logo";
import { useSiteSettings } from "@/lib/useSite";

export default function PublicFooter() {
  const settings = useSiteSettings();
  const phone = settings?.phone_enabled ? settings.support_phone : null;
  const email = settings?.support_email || "support@accidentcompensationhelper.com";

  return (
    <footer className="bg-navy text-white">
      <div className="border-t border-white/10">
        <div className="mx-auto grid max-w-[1280px] gap-10 px-6 py-16 md:grid-cols-4">
          <div className="md:col-span-1">
            <Logo variant="light" />
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-white/60">
              Accident Compensation Helper provides a free, confidential claim check and, if you choose, can help you
              request contact with participating attorneys. We are not a law firm and do not provide legal advice.
            </p>
          </div>

          <div>
            <h3 className="text-xs font-semibold uppercase tracking-[0.18em] text-white/45">Explore</h3>
            <ul className="mt-5 space-y-3 text-sm text-white/70">
              <li><Link to="/" className="hover:text-white">Home</Link></li>
              <li><Link to="/how-it-works" className="hover:text-white">How It Works</Link></li>
              <li><Link to="/accident-types" className="hover:text-white">Accident Types</Link></li>
              <li><Link to="/resources" className="hover:text-white">Resources</Link></li>
              <li><Link to="/blog" className="hover:text-white">Blog</Link></li>
              <li><Link to="/about" className="hover:text-white">About</Link></li>
              <li><Link to="/contact" className="hover:text-white">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-semibold uppercase tracking-[0.18em] text-white/45">Legal &amp; Privacy</h3>
            <ul className="mt-5 space-y-3 text-sm text-white/70">
              <li><Link to="/privacy" className="hover:text-white">Privacy Policy</Link></li>
              <li><Link to="/terms" className="hover:text-white">Terms of Service</Link></li>
              <li><Link to="/advertising-disclosure" className="hover:text-white">Advertising Disclosure</Link></li>
              <li><Link to="/communication-consent" className="hover:text-white">Communication Consent</Link></li>
              <li><Link to="/sms-terms" className="hover:text-white">SMS Terms</Link></li>
              <li><Link to="/cookie-policy" className="hover:text-white">Cookie Policy</Link></li>
              <li><Link to="/privacy-choices" className="hover:text-white">Your Privacy Choices</Link></li>
              <li><Link to="/accessibility" className="hover:text-white">Accessibility</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-semibold uppercase tracking-[0.18em] text-white/45">Transparency</h3>
            <ul className="mt-5 space-y-3 text-sm text-white/70">
              <li><Link to="/how-we-match" className="hover:text-white">How We Match</Link></li>
              <li><Link to="/our-network" className="hover:text-white">Our Network</Link></li>
              <li><Link to="/partner-list" className="hover:text-white">Partner List</Link></li>
              <li><Link to="/editorial-policy" className="hover:text-white">Editorial Policy</Link></li>
              <li><Link to="/results-disclaimer" className="hover:text-white">Results Disclaimer</Link></li>
            </ul>
            <div className="mt-5 space-y-2 text-sm text-white/70">
              {phone && <p className="flex items-center gap-2"><Mail className="h-4 w-4 text-primary" /> {phone}</p>}
              <p className="flex items-center gap-2"><Mail className="h-4 w-4 text-primary" /> {email}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-[1280px] flex-col items-center justify-between gap-3 px-6 py-8 text-xs text-white/45 sm:flex-row">
          <p>© {new Date().getFullYear()} Accident Compensation Helper. All rights reserved.</p>
          <p className="flex items-center gap-2 text-center sm:text-right">
            <Scale className="h-3.5 w-3.5 shrink-0" />
            This website is not a law firm and does not provide legal advice. No attorney-client relationship is created by using this site.
          </p>
        </div>
      </div>
    </footer>
  );
}