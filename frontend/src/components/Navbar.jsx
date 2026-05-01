import React from "react";
import { Phone, MapPin, Mail } from "lucide-react";
import { Link } from "react-router-dom";
import { BUSINESS } from "../lib/business";

export default function Navbar() {
  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur border-b border-neutral-200" data-testid="site-navbar">
      {/* Top address bar */}
      <div className="bg-neutral-950 text-white text-[11px] md:text-xs">
        <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12 py-2 flex flex-col md:flex-row md:items-center md:justify-between gap-1">
          <div className="flex items-center gap-2 justify-center md:justify-start">
            <MapPin className="w-3.5 h-3.5 flex-shrink-0" style={{ color: "#F5A623" }} />
            <span className="tracking-wide text-center md:text-left" data-testid="topbar-address">{BUSINESS.address}</span>
          </div>
          <div className="hidden md:flex items-center gap-5">
            <a href={`tel:+91${BUSINESS.phone}`} className="inline-flex items-center gap-1.5 hover:text-amber-300" data-testid="topbar-phone">
              <Phone className="w-3.5 h-3.5" /> +91 {BUSINESS.phone}
            </a>
            <a href={`mailto:${BUSINESS.email}`} className="inline-flex items-center gap-1.5 hover:text-amber-300" data-testid="topbar-email">
              <Mail className="w-3.5 h-3.5" /> {BUSINESS.email}
            </a>
          </div>
        </div>
      </div>

      {/* Main nav */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12 h-20 md:h-24 flex items-center justify-between gap-4">
        <Link to="/" className="flex items-center gap-3" data-testid="navbar-logo">
          <img src="/mb-logo.png" alt="Mahaveer Brothers" className="h-14 w-14 md:h-16 md:w-16 rounded-full object-contain bg-black" />
          <div className="leading-tight">
            <div className="font-heading font-bold text-base md:text-xl tracking-tight" style={{ color: "#D92328" }}>Mahaveer Brothers</div>
            <div className="text-[10px] md:text-[11px] uppercase tracking-[0.2em] text-neutral-500">Trading &amp; Service Co.</div>
            <div className="text-[9px] md:text-[10px] uppercase tracking-[0.18em] text-neutral-600 mt-0.5 font-semibold">Laundry <span style={{ color: "#F5A623" }}>|</span> Dryclean Polish <span style={{ color: "#F5A623" }}>|</span> Steam Iron</div>
          </div>
        </Link>

        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-neutral-700">
          <button onClick={() => scrollTo("services")} className="hover:text-black transition-colors" data-testid="nav-services">Services</button>
          <button onClick={() => scrollTo("how-it-works")} className="hover:text-black transition-colors" data-testid="nav-how">How it works</button>
          <button onClick={() => scrollTo("pricing")} className="hover:text-black transition-colors" data-testid="nav-pricing">Pricing</button>
          <button onClick={() => scrollTo("contact")} className="hover:text-black transition-colors" data-testid="nav-contact">Contact</button>
        </nav>

        <div className="flex items-center gap-3">
          <button
            onClick={() => scrollTo("book")}
            className="inline-flex items-center gap-2 rounded-full px-4 md:px-5 py-2 md:py-2.5 text-sm font-semibold text-white shadow-sm hover:-translate-y-0.5 transition-all"
            style={{ backgroundColor: "#D92328" }}
            data-testid="navbar-book-btn"
          >
            Book Pickup
          </button>
        </div>
      </div>

      {/* Free pickup banner */}
      <div className="bg-red-600 text-white text-[11px] md:text-xs">
        <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12 py-1.5 flex items-center justify-center gap-2 text-center">
          <span className="font-semibold tracking-wide">FREE PICKUP AND DROP AROUND 40 KM · OPEN 9 AM TO 7 PM</span>
        </div>
      </div>
    </header>
  );
}
