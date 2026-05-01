import React from "react";
import { Shirt, Wind, Droplets, Sparkles, Footprints, Layers } from "lucide-react";

const ICONS = {
  wash_iron: Shirt,
  dry_cleaning: Sparkles,
  steam_iron: Wind,
  premium_dry_clean: Droplets,
  shoe_cleaning: Footprints,
  carpet_cleaning: Layers,
};

export default function Services({ services = [] }) {
  return (
    <section id="services" className="bg-white py-16 md:py-24" data-testid="services-section">
      <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12">
        <div className="max-w-2xl">
          <div className="text-xs tracking-[0.25em] uppercase font-bold" style={{ color: "#D92328" }} data-testid="services-eyebrow">Our Services</div>
          <h2 className="mt-3 font-heading font-bold text-3xl md:text-4xl lg:text-5xl text-neutral-900 tracking-tight">
            Care for every fabric, every garment.
          </h2>
          <p className="mt-4 text-neutral-600 text-base md:text-lg leading-relaxed">
            From daily wear to wedding sherwanis — we handle everything with industrial-grade machines and gentle, fabric-friendly detergents.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
          {services.map((svc, idx) => {
            const Icon = ICONS[svc.id] || Shirt;
            return (
              <div
                key={svc.id}
                className="group relative bg-white border border-neutral-200 rounded-2xl p-6 md:p-7 hover:border-neutral-900 hover:shadow-xl transition-all"
                data-testid={`service-card-${svc.id}`}
              >
                <div className="flex items-start justify-between">
                  <div className="h-12 w-12 rounded-xl bg-red-50 flex items-center justify-center group-hover:bg-red-100 transition-colors">
                    <Icon className="w-6 h-6" style={{ color: "#D92328" }} />
                  </div>
                  <span className="font-heading font-black text-3xl text-neutral-200 group-hover:text-neutral-300">
                    0{idx + 1}
                  </span>
                </div>
                <h3 className="mt-5 font-heading font-bold text-xl md:text-2xl text-neutral-900">{svc.name}</h3>
                <p className="mt-2 text-sm text-neutral-600 leading-relaxed">{svc.description}</p>
                <div className="mt-5 pt-5 border-t border-neutral-100 flex items-baseline justify-between">
                  <div>
                    <span className="font-heading font-bold text-2xl text-neutral-900">₹{svc.price}</span>
                    <span className="text-xs text-neutral-500 ml-1">{svc.unit}</span>
                  </div>
                  <a href="#book" className="text-xs font-bold uppercase tracking-widest" style={{ color: "#D92328" }} data-testid={`service-book-${svc.id}`}>
                    Book →
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
