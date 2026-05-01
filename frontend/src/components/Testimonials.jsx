import React from "react";
import { Star, Quote } from "lucide-react";

const REVIEWS = [
  { name: "Vivek Singh", area: "Lavkani, Deoria", rating: 5, text: "Best laundry service in Gauribazar. Free pickup is super convenient and clothes come back smelling fresh." },
  { name: "Priya Sharma", area: "Rudrapur Road", rating: 5, text: "Got my wedding lehenga drycleaned here. They handled it with so much care — looked brand new!" },
  { name: "Rahul Verma", area: "Deoria City", rating: 5, text: "I've been using their monthly plan for 6 months. Always on time, always crisp. Highly recommend." },
];

export default function Testimonials() {
  return (
    <section className="bg-neutral-900 text-white py-16 md:py-24 relative overflow-hidden" data-testid="testimonials-section">
      <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: "radial-gradient(circle at 1px 1px, white 1px, transparent 0)", backgroundSize: "32px 32px" }}></div>
      <div className="relative max-w-7xl mx-auto px-4 md:px-8 lg:px-12">
        <div className="max-w-2xl">
          <div className="text-xs tracking-[0.25em] uppercase font-bold" style={{ color: "#F5A623" }}>Reviews</div>
          <h2 className="mt-3 font-heading font-bold text-3xl md:text-4xl lg:text-5xl tracking-tight">
            Loved by 5,000+ families in Deoria.
          </h2>
        </div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6">
          {REVIEWS.map((r, i) => (
            <div key={i} className="bg-white/5 backdrop-blur border border-white/10 rounded-2xl p-6 md:p-7" data-testid={`testimonial-${i}`}>
              <Quote className="w-7 h-7" style={{ color: "#F5A623" }} />
              <p className="mt-4 text-white/90 leading-relaxed text-sm md:text-base">"{r.text}"</p>
              <div className="mt-5 flex gap-0.5">
                {Array.from({ length: r.rating }).map((_, k) => (
                  <Star key={k} className="w-4 h-4 fill-current" style={{ color: "#F5A623" }} />
                ))}
              </div>
              <div className="mt-4 pt-4 border-t border-white/10">
                <div className="font-semibold">{r.name}</div>
                <div className="text-xs text-white/60">{r.area}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
