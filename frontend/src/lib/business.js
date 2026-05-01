// Centralized business config + WhatsApp utilities
export const BUSINESS = {
  name: "Mahaveer Brothers Trading And Service Company",
  shortName: "Mahaveer Brothers",
  tagline: "Best Laundry & Drycleaning Service with Free Pickup and Drop",
  phone: "9695178760",
  whatsappNumber: "919695178760", // E.164 without "+"
  email: "mahaveerbrothers.services@gmail.com",
  address: "Rudrapur Road, Beside Punjab National Bank, Gauribazar, Deoria, Uttar Pradesh, 274202",
  gstin: "09FQKPM6612K1ZA",
  pan: "FQKPM6612K",
  bank: { name: "VIJAY MAURYA", ifsc: "SBIN0012910", account: "42472176383", branch: "State Bank of India, GAURI BAZAR" },
  upi: "7991493609@ybl",
};

export const buildWhatsappUrl = (message) => {
  const encoded = encodeURIComponent(message || "Hi, I would like to book a laundry pickup.");
  return `https://wa.me/${BUSINESS.whatsappNumber}?text=${encoded}`;
};

export const buildBookingMessage = (data) => {
  const lines = [
    `*New Laundry Booking — ${BUSINESS.shortName}*`,
    "",
    `*Name:* ${data.name}`,
    `*Phone:* ${data.phone}`,
    `*Address:* ${data.address}`,
    `*Service:* ${data.service}`,
    `*Pickup Date:* ${data.pickup_date}`,
    `*Pickup Time:* ${data.pickup_time}`,
  ];
  if (data.notes) lines.push(`*Notes:* ${data.notes}`);
  lines.push("", "Please confirm pickup. Thank you!");
  return lines.join("\n");
};

export const openWhatsapp = (message) => {
  window.open(buildWhatsappUrl(message), "_blank", "noopener,noreferrer");
};
