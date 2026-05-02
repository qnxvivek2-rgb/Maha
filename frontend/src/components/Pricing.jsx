import React from "react";
import { Check } from "lucide-react";

export default function Pricing({ services = [] }) {
  return (
    <section id="pricing" className="bg-white py-16 md:py-24" data-testid="pricing-section">
      <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12">
        <div className="grid lg:grid-cols-12 gap-10">
          <div className="lg:col-span-5">
            <div className="text-xs tracking-[0.25em] uppercase font-bold" style={{ color: "#D92328" }}>Rate Card</div>
            <h2 className="mt-3 font-heading font-bold text-3xl md:text-4xl lg:text-5xl text-neutral-900 tracking-tight">
              Honest pricing.<br />No hidden charges.
            </h2>
            <p className="mt-5 text-neutral-600 leading-relaxed">
              Pay only for what you wash. Pickup and drop are always on us. Bulk discounts available for monthly subscriptions and household plans.
            </p>
            <ul className="mt-7 space-y-3">
              {[
                "Free pickup & drop within 40 KM",
                "Same-day delivery available",
                "100% genuine detergent & solvents",
                "Damage compensation up to 25% of market value",
              ].map((p, i) => (
                <li key={i} className="flex items-start gap-3 text-sm md:text-base text-neutral-700">
                  <span className="mt-0.5 h-5 w-5 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: "#D92328" }}>
                    <Check className="w-3 h-3 text-white" />
                  </span>
                  {p}
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-7">
            <div className="rounded-3xl border border-neutral-200 overflow-hidden shadow-sm">
              <div className="bg-neutral-900 text-white px-6 py-4 flex items-center justify-between">
                <div className="font-heading font-bold text-lg">Service</div>
                <div className="font-heading font-bold text-lg">Price</div>
              </div>
              <div className="bg-white divide-y divide-neutral-100">
               {(Array.isArray(services) ? services : []).map((s) => (
                  <div key={s.id} className="px-6 py-4 flex items-center justify-between hover:bg-neutral-50 transition-colors" data-testid={`pricing-row-${s.id}`}>
                    <div>
                      <div className="font-semibold text-neutral-900">{s.name}</div>
                      <div className="text-xs text-neutral-500 mt-0.5">{s.description}</div>
                    </div>
                    <div className="text-right">
                      <div className="font-heading font-bold text-xl text-neutral-900">₹{s.price}</div>
                      <div className="text-[11px] text-neutral-500">{s.unit}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
