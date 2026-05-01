import React from "react";
import { openWhatsapp } from "../lib/business";

export default function FloatingWhatsApp() {
  return (
    <button
      onClick={() => openWhatsapp("Hi, I would like to book a laundry pickup.")}
      className="fixed bottom-5 right-5 md:bottom-8 md:right-8 z-50 h-14 w-14 md:h-16 md:w-16 rounded-full text-white shadow-2xl flex items-center justify-center wa-pulse hover:scale-105 transition-transform"
      style={{ backgroundColor: "#25D366" }}
      aria-label="Chat on WhatsApp"
      data-testid="floating-whatsapp-btn"
    >
      <svg viewBox="0 0 24 24" className="w-7 h-7 md:w-8 md:h-8 fill-current"><path d="M.057 24l1.687-6.163a11.867 11.867 0 0 1-1.587-5.946C.16 5.335 5.495 0 12.05 0a11.81 11.81 0 0 1 8.413 3.488 11.824 11.824 0 0 1 3.48 8.414c-.003 6.557-5.338 11.892-11.893 11.892a11.9 11.9 0 0 1-5.688-1.448L.057 24zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884a9.86 9.86 0 0 0 1.51 5.26L3.4 19.46l3.254-1.27z"/></svg>
    </button>
  );
}
