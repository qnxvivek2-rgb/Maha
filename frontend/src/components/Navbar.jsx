import React from "react";
import { Phone, MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import { BUSINESS } from "../lib/business";

export default function Navbar() {
  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur border-b border-neutral-200" data-testid="site-navbar">
      <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12 h-16 md:h-20 flex items-center justify-between gap-4">
        <Link to="/" className="flex items-center gap-3" data-testid="navbar-logo">
          <div className="h-10 w-10 md:h-11 md:w-11 rounded-full bg-black flex items-center justify-center border-2 border-brand-gold" style={{ borderColor: "#F5A623" }}>
            <span className="font-heading font-black text-lg" style={{ color: "#F5A623" }}>MB</span>
          </div>
          <div className="leading-tight">
            <div className="font-heading font-bold text-base md:text-lg" style={{ color: "#D92328" }}>Mahaveer Brothers</div>
            <div className="text-[10px] md:text-xs uppercase tracking-widest text-neutral-500">Laundry & Drycleaning</div>
          </div>
        </Link>

        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-neutral-700">
          <button onClick={() => scrollTo("services")} className="hover:text-black transition-colors" data-testid="nav-services">Services</button>
          <button onClick={() => scrollTo("how-it-works")} className="hover:text-black transition-colors" data-testid="nav-how">How it works</button>
          <button onClick={() => scrollTo("pricing")} className="hover:text-black transition-colors" data-testid="nav-pricing">Pricing</button>
          <button onClick={() => scrollTo("contact")} className="hover:text-black transition-colors" data-testid="nav-contact">Contact</button>
        </nav>

        <div className="flex items-center gap-3">
          <a
            href={`tel:+91${BUSINESS.phone}`}
            className="hidden sm:inline-flex items-center gap-2 text-sm font-semibold text-neutral-700 hover:text-black"
            data-testid="navbar-call"
          >
            <Phone className="w-4 h-4" /> {BUSINESS.phone}
          </a>
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
      <div className="bg-black text-white text-[11px] md:text-xs">
        <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12 py-1.5 flex items-center justify-center gap-2 text-center">
          <MapPin className="w-3 h-3" style={{ color: "#F5A623" }} />
          <span className="tracking-wide">FREE PICKUP & DROP across Deoria · Open 8 AM – 9 PM · Same-day delivery available</span>
        </div>
      </div>
    </header>
  );
}
