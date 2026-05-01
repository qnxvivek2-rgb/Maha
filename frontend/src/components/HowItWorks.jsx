import React from "react";
import { MessageCircle, Truck, WashingMachine, PackageCheck } from "lucide-react";

const STEPS = [
  { icon: MessageCircle, title: "Book on WhatsApp", desc: "Send us your details — name, address & garments. Takes 30 seconds." },
  { icon: Truck, title: "We pickup free", desc: "Our delivery boy collects garments from your doorstep at your chosen time." },
  { icon: WashingMachine, title: "Premium care", desc: "Industrial wash, dry cleaning or steam press with fabric-safe detergents." },
  { icon: PackageCheck, title: "Doorstep delivery", desc: "Crisp, neatly folded garments delivered back — same day or next day." },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="bg-neutral-50 py-16 md:py-24 border-y border-neutral-200" data-testid="how-it-works-section">
      <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
          <div className="max-w-2xl">
            <div className="text-xs tracking-[0.25em] uppercase font-bold" style={{ color: "#D92328" }}>How it works</div>
            <h2 className="mt-3 font-heading font-bold text-3xl md:text-4xl lg:text-5xl text-neutral-900 tracking-tight">
              Four simple steps. Zero hassle.
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6">
          {STEPS.map((s, i) => (
            <div key={i} className="relative bg-white rounded-2xl p-6 md:p-7 border border-neutral-200" data-testid={`how-step-${i}`}>
              <div className="font-heading font-black text-5xl" style={{ color: "#F5A623", opacity: 0.85 }}>0{i + 1}</div>
              <div className="mt-3 h-11 w-11 rounded-xl bg-neutral-900 flex items-center justify-center">
                <s.icon className="w-5 h-5 text-white" />
              </div>
              <h3 className="mt-4 font-heading font-bold text-lg text-neutral-900">{s.title}</h3>
              <p className="mt-2 text-sm text-neutral-600 leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
