import React from "react";
import { Link } from "react-router-dom";
import { BUSINESS } from "../lib/business";

export default function Footer() {
  return (
    <footer className="bg-neutral-950 text-white pt-14 md:pt-20 pb-8" data-testid="site-footer">
      <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="md:col-span-2">
          <div className="flex items-center gap-3">
            <img src="/mb-logo.png" alt="Mahaveer Brothers" className="h-14 w-14 rounded-full object-contain bg-black border-2" style={{ borderColor: "#F5A623" }} />
            <div>
              <div className="font-heading font-bold text-lg" style={{ color: "#D92328" }}>Mahaveer Brothers</div>
              <div className="text-[11px] uppercase tracking-widest text-white/50">Trading & Service Co.</div>
            </div>
          </div>
          <p className="mt-5 text-sm text-white/60 leading-relaxed max-w-md">
            {BUSINESS.tagline}. Trusted by thousands of families across Deoria for premium laundry, drycleaning and steam ironing.
          </p>
          <div className="mt-5 text-xs text-white/40">GSTIN: {BUSINESS.gstin} · PAN: {BUSINESS.pan}</div>
        </div>

        <div>
          <div className="font-heading font-bold text-sm uppercase tracking-widest text-white/80">Services</div>
          <ul className="mt-4 space-y-2 text-sm text-white/60">
            <li><a href="#services" className="hover:text-white">Wash & Iron</a></li>
            <li><a href="#services" className="hover:text-white">Dry Cleaning</a></li>
            <li><a href="#services" className="hover:text-white">Steam Iron</a></li>
            <li><a href="#services" className="hover:text-white">Shoe Cleaning</a></li>
            <li><a href="#services" className="hover:text-white">Carpet Cleaning</a></li>
          </ul>
        </div>

        <div>
          <div className="font-heading font-bold text-sm uppercase tracking-widest text-white/80">Get in touch</div>
          <ul className="mt-4 space-y-2 text-sm text-white/60">
            <li><a href={`tel:+91${BUSINESS.phone}`} className="hover:text-white">+91 {BUSINESS.phone}</a></li>
            <li><a href={`mailto:${BUSINESS.email}`} className="hover:text-white break-all">{BUSINESS.email}</a></li>
            <li className="pt-2"><Link to="/admin/login" className="text-white/40 hover:text-white text-xs" data-testid="footer-admin-link">Admin</Link></li>
          </ul>
        </div>
      </div>

      <div className="mt-12 pt-6 border-t border-white/10 max-w-7xl mx-auto px-4 md:px-8 lg:px-12 flex flex-col md:flex-row md:items-center md:justify-between gap-3 text-xs text-white/40">
        <div>© {new Date().getFullYear()} Mahaveer Brothers Trading & Service Company. All rights reserved.</div>
        <div>Crafted with care in Deoria, UP</div>
      </div>
    </footer>
  );
}
