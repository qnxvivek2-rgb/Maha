import React from "react";
import { ArrowRight, Sparkles, Truck, Clock, ShieldCheck } from "lucide-react";
import { openWhatsapp, BUSINESS } from "../lib/business";

const HERO_IMG = "https://images.unsplash.com/photo-1604335399105-a0c585fd81a1?auto=format&fit=crop&w=1400&q=80";

export default function Hero() {
  const scrollToBook = () => document.getElementById("book")?.scrollIntoView({ behavior: "smooth" });

  return (
    <section className="relative bg-white" data-testid="hero-section">
      <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12 py-12 md:py-20 lg:py-24 grid lg:grid-cols-12 gap-10 lg:gap-14 items-center">
        <div className="lg:col-span-7 fade-up">
          <div className="inline-flex items-center gap-2 rounded-full bg-red-50 text-red-700 px-3 py-1 text-xs font-semibold tracking-wide" data-testid="hero-badge">
            <Sparkles className="w-3.5 h-3.5" /> TRUSTED IN DEORIA SINCE YEARS
          </div>
          <h1 className="mt-5 font-heading font-bold text-4xl sm:text-5xl lg:text-6xl leading-[1.05] text-neutral-900 tracking-tight">
            Fresh laundry,<br />
            <span style={{ color: "#D92328" }}>delivered to your door.</span>
          </h1>
          <p className="mt-5 text-base md:text-lg text-neutral-600 max-w-2xl leading-relaxed">
            Premium washing, drycleaning & steam ironing with <strong className="text-neutral-900">free pickup and drop</strong>.
            Book in 30 seconds — chat with us directly on WhatsApp.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <button
              onClick={() => openWhatsapp(`Hi ${BUSINESS.shortName}, I would like to book a laundry pickup.`)}
              className="inline-flex items-center gap-2 rounded-full px-6 py-3.5 text-white font-semibold shadow-lg hover:-translate-y-0.5 transition-all"
              style={{ backgroundColor: "#25D366" }}
              data-testid="hero-whatsapp-booking-btn"
            >
              <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current"><path d="M.057 24l1.687-6.163a11.867 11.867 0 0 1-1.587-5.946C.16 5.335 5.495 0 12.05 0a11.81 11.81 0 0 1 8.413 3.488 11.824 11.824 0 0 1 3.48 8.414c-.003 6.557-5.338 11.892-11.893 11.892a11.9 11.9 0 0 1-5.688-1.448L.057 24zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884a9.86 9.86 0 0 0 1.51 5.26L3.4 19.46l3.254-1.27z"/></svg>
              Book on WhatsApp
            </button>
            <button
              onClick={scrollToBook}
              className="inline-flex items-center gap-2 rounded-full px-6 py-3.5 font-semibold border border-neutral-300 text-neutral-900 hover:bg-neutral-50 transition-all"
              data-testid="hero-form-booking-btn"
            >
              Schedule Pickup <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="mt-10 grid grid-cols-3 gap-4 max-w-lg">
            {[
              { icon: Truck, label: "Free Pickup & Drop" },
              { icon: Clock, label: "Same-day available" },
              { icon: ShieldCheck, label: "Garments insured" },
            ].map((item, i) => (
              <div key={i} className="flex flex-col items-start gap-2" data-testid={`hero-feature-${i}`}>
                <div className="h-10 w-10 rounded-xl bg-neutral-100 flex items-center justify-center">
                  <item.icon className="w-5 h-5" style={{ color: "#D92328" }} />
                </div>
                <div className="text-xs md:text-sm font-medium text-neutral-700 leading-tight">{item.label}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="lg:col-span-5 relative">
          <div className="absolute -top-4 -left-4 w-32 h-32 rounded-full" style={{ backgroundColor: "#F5A623", opacity: 0.15 }}></div>
          <div className="absolute -bottom-6 -right-2 w-40 h-40 rounded-full" style={{ backgroundColor: "#D92328", opacity: 0.1 }}></div>
          <div className="relative rounded-3xl overflow-hidden border border-neutral-200 shadow-2xl">
            <img
              src={HERO_IMG}
              alt="Folded fresh laundry"
              className="w-full h-[420px] md:h-[520px] object-cover"
              data-testid="hero-image"
            />
            <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur rounded-2xl p-4 border border-white shadow-lg">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-[11px] uppercase tracking-widest text-neutral-500 font-bold">Starting at</div>
                  <div className="font-heading font-black text-2xl text-neutral-900">₹20<span className="text-sm font-medium text-neutral-500">/piece</span></div>
                </div>
                <button
                  onClick={scrollToBook}
                  className="rounded-full px-4 py-2 text-sm font-semibold text-white"
                  style={{ backgroundColor: "#D92328" }}
                  data-testid="hero-card-cta"
                >
                  Book now
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
