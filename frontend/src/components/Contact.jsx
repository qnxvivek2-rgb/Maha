import React from "react";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { BUSINESS, openWhatsapp } from "../lib/business";

export default function Contact() {
  return (
    <section id="contact" className="bg-neutral-50 py-16 md:py-24 border-t border-neutral-200" data-testid="contact-section">
      <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12 grid lg:grid-cols-2 gap-10">
        <div>
          <div className="text-xs tracking-[0.25em] uppercase font-bold" style={{ color: "#D92328" }}>Visit us</div>
          <h2 className="mt-3 font-heading font-bold text-3xl md:text-4xl lg:text-5xl text-neutral-900 tracking-tight">
            Drop by, or we'll come to you.
          </h2>

          <div className="mt-8 space-y-5">
            <div className="flex items-start gap-4">
              <div className="h-11 w-11 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: "#D92328" }}>
                <MapPin className="w-5 h-5 text-white" />
              </div>
              <div>
                <div className="font-semibold text-neutral-900">Address</div>
                <div className="text-sm text-neutral-600 mt-1 leading-relaxed" data-testid="contact-address">{BUSINESS.address}</div>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="h-11 w-11 rounded-xl bg-neutral-900 flex items-center justify-center flex-shrink-0">
                <Phone className="w-5 h-5 text-white" />
              </div>
              <div>
                <div className="font-semibold text-neutral-900">Phone</div>
                <a href={`tel:+91${BUSINESS.phone}`} className="text-sm text-neutral-600 mt-1 hover:text-neutral-900" data-testid="contact-phone">+91 {BUSINESS.phone}</a>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="h-11 w-11 rounded-xl bg-neutral-900 flex items-center justify-center flex-shrink-0">
                <Mail className="w-5 h-5 text-white" />
              </div>
              <div>
                <div className="font-semibold text-neutral-900">Email</div>
                <a href={`mailto:${BUSINESS.email}`} className="text-sm text-neutral-600 mt-1 hover:text-neutral-900 break-all" data-testid="contact-email">{BUSINESS.email}</a>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="h-11 w-11 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: "#F5A623" }}>
                <Clock className="w-5 h-5 text-white" />
              </div>
              <div>
                <div className="font-semibold text-neutral-900">Hours</div>
                <div className="text-sm text-neutral-600 mt-1">Mon – Sun · 9:00 AM – 7:00 PM</div>
              </div>
            </div>
          </div>

          <button
            onClick={() => openWhatsapp("Hi, I'd like to know more about your laundry services.")}
            className="mt-8 inline-flex items-center gap-2 rounded-full px-6 py-3.5 text-white font-semibold shadow-lg hover:-translate-y-0.5 transition-all"
            style={{ backgroundColor: "#25D366" }}
            data-testid="contact-whatsapp-btn"
          >
            Message on WhatsApp
          </button>
        </div>

        <div className="rounded-3xl overflow-hidden border border-neutral-200 shadow-sm min-h-[400px] bg-white">
          <iframe
            title="Mahaveer Brothers location"
            src="https://www.google.com/maps?q=Gauribazar%20Deoria%20Uttar%20Pradesh&output=embed"
            className="w-full h-full min-h-[400px]"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            data-testid="contact-map"
          ></iframe>
        </div>
      </div>
    </section>
  );
}
