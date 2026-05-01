import React, { useEffect, useRef } from "react";
import { Star } from "lucide-react";

// Google G icon
const GoogleG = ({ className = "w-5 h-5" }) => (
  <svg className={className} viewBox="0 0 48 48" aria-hidden>
    <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
    <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
    <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
    <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
  </svg>
);

const REVIEWS = [
  { name: "Vivek Singh", avatar: "V", color: "#EA4335", rating: 5, date: "2 weeks ago", text: "Best laundry service in Gauribazar! Free pickup works like magic. My suits came back like new." },
  { name: "Priya Sharma", avatar: "P", color: "#4285F4", rating: 5, date: "1 month ago", text: "Got my wedding lehenga drycleaned. Super careful handling and timely delivery. Highly recommend!" },
  { name: "Rahul Verma", avatar: "R", color: "#34A853", rating: 5, date: "3 weeks ago", text: "Been using their monthly plan for 6 months. Always on time, crisp ironing, fair pricing." },
  { name: "Anjali Gupta", avatar: "A", color: "#FBBC05", rating: 5, date: "5 days ago", text: "Called them at 9am, pickup done by 10am, delivered fresh by evening. Unbelievable speed!" },
  { name: "Sanjay Kumar", avatar: "S", color: "#EA4335", rating: 5, date: "1 week ago", text: "Affordable rates and genuine staff. Steam iron finish is better than any other laundry here." },
  { name: "Neha Pandey", avatar: "N", color: "#4285F4", rating: 5, date: "2 months ago", text: "They even cleaned my old carpet that I thought was ruined. Came back spotless. Thank you team!" },
  { name: "Amit Tiwari", avatar: "A", color: "#34A853", rating: 5, date: "4 weeks ago", text: "Drycleaning is excellent. Delivery boy is polite and always on time. 100% trust." },
  { name: "Shruti Singh", avatar: "S", color: "#FBBC05", rating: 4, date: "3 days ago", text: "Clothes always smell fresh. Prices are very reasonable. Will continue using them." },
];

// Duplicate the list for seamless infinite scroll
const LOOP = [...REVIEWS, ...REVIEWS];

export default function GoogleReviews() {
  const trackRef = useRef(null);

  return (
    <section className="bg-white pt-10 md:pt-14 pb-4 md:pb-6 border-b border-neutral-100" data-testid="google-reviews-section">
      <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 rounded-2xl bg-white border border-neutral-200 shadow-sm flex items-center justify-center">
              <GoogleG className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-heading font-bold text-neutral-900 text-lg">Google Reviews</span>
                <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 rounded-full px-2 py-0.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500"></span> Verified
                </span>
              </div>
              <div className="flex items-center gap-2 mt-0.5">
                <div className="flex gap-0.5">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Star key={i} className="w-4 h-4 fill-current" style={{ color: "#FBBC05" }} />
                  ))}
                </div>
                <span className="text-sm font-semibold text-neutral-900">4.9</span>
                <span className="text-xs text-neutral-500">· Based on 520+ reviews</span>
              </div>
            </div>
          </div>
          <a
            href="https://www.google.com/search?q=Mahaveer+Brothers+Gauribazar+Deoria"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-xs font-semibold text-neutral-700 hover:text-black underline-offset-4 hover:underline"
            data-testid="reviews-google-link"
          >
            See all reviews on Google →
          </a>
        </div>

        {/* Marquee track */}
        <div className="relative overflow-hidden" data-testid="reviews-marquee">
          {/* gradient masks */}
          <div className="pointer-events-none absolute inset-y-0 left-0 w-16 md:w-24 bg-gradient-to-r from-white to-transparent z-10"></div>
          <div className="pointer-events-none absolute inset-y-0 right-0 w-16 md:w-24 bg-gradient-to-l from-white to-transparent z-10"></div>

          <div ref={trackRef} className="reviews-track flex gap-4 md:gap-5 w-max">
            {LOOP.map((r, i) => (
              <article
                key={i}
                className="w-[300px] md:w-[360px] flex-shrink-0 bg-white border border-neutral-200 rounded-2xl p-5 hover:shadow-md transition-shadow"
                data-testid={`review-card-${i}`}
              >
                <header className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full flex items-center justify-center text-white font-heading font-bold" style={{ backgroundColor: r.color }}>
                    {r.avatar}
                  </div>
                  <div className="min-w-0">
                    <div className="font-semibold text-neutral-900 truncate">{r.name}</div>
                    <div className="text-[11px] text-neutral-500">{r.date}</div>
                  </div>
                  <GoogleG className="w-4 h-4 ml-auto flex-shrink-0" />
                </header>
                <div className="mt-3 flex gap-0.5">
                  {Array.from({ length: 5 }).map((_, k) => (
                    <Star key={k} className={`w-4 h-4 ${k < r.rating ? "fill-current" : ""}`} style={{ color: k < r.rating ? "#FBBC05" : "#E5E7EB" }} />
                  ))}
                </div>
                <p className="mt-3 text-sm text-neutral-700 leading-relaxed line-clamp-4">"{r.text}"</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
