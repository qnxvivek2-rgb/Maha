import React, { useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { Calendar as CalendarIcon, Loader2 } from "lucide-react";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Textarea } from "../components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "../components/ui/popover";
import { Calendar } from "../components/ui/calendar";
import { format } from "date-fns";
import { buildBookingMessage, openWhatsapp } from "../lib/business";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

const TIME_SLOTS = ["08:00", "09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00"];

export default function BookingForm({ services = [] }) {
  const [date, setDate] = useState(null);
  const [form, setForm] = useState({ name: "", phone: "", address: "", service: "", pickup_time: "", notes: "" });
  const [submitting, setSubmitting] = useState(false);

  const update = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  const validate = () => {
    if (!form.name.trim() || form.name.trim().length < 2) return "Please enter your name";
    if (!/^\d{7,15}$/.test(form.phone.replace(/\D/g, ""))) return "Enter a valid phone number";
    if (!form.address.trim() || form.address.trim().length < 5) return "Please enter pickup address";
    if (!form.service) return "Please select a service";
    if (!date) return "Please pick a pickup date";
    if (!form.pickup_time) return "Please pick a pickup time slot";
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const err = validate();
    if (err) {
      toast.error(err);
      return;
    }
    const payload = {
      ...form,
      pickup_date: format(date, "yyyy-MM-dd"),
    };
    setSubmitting(true);
    try {
      await axios.post(`${API}/bookings`, payload);
      toast.success("Booking received! Opening WhatsApp to confirm…");
      openWhatsapp(buildBookingMessage(payload));
      setForm({ name: "", phone: "", address: "", service: "", pickup_time: "", notes: "" });
      setDate(null);
    } catch (err) {
      console.error(err);
      toast.error("Couldn't save booking. Please try WhatsApp directly.");
      // Still open WhatsApp so user can complete booking
      openWhatsapp(buildBookingMessage(payload));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="book" className="bg-white py-16 md:py-24" data-testid="booking-section">
      <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12 grid lg:grid-cols-12 gap-10 items-start">
        <div className="lg:col-span-5 lg:sticky lg:top-28">
          <div className="text-xs tracking-[0.25em] uppercase font-bold" style={{ color: "#D92328" }}>Schedule Pickup</div>
          <h2 className="mt-3 font-heading font-bold text-3xl md:text-4xl lg:text-5xl text-neutral-900 tracking-tight">
            Book your free<br />pickup in 30 seconds.
          </h2>
          <p className="mt-5 text-neutral-600 leading-relaxed">
            Fill the form and we'll instantly open WhatsApp with your booking details — confirm and we'll be at your door at the chosen time.
          </p>
          <div className="mt-8 p-5 rounded-2xl border border-neutral-200 bg-neutral-50">
            <div className="font-heading font-bold text-neutral-900">Need help?</div>
            <p className="text-sm text-neutral-600 mt-1">Call us directly at <a href="tel:+919695178760" className="font-semibold text-neutral-900 underline">+91 96951 78760</a></p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="lg:col-span-7 bg-white border border-neutral-200 rounded-3xl p-6 md:p-8 shadow-sm" data-testid="booking-form">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <Label htmlFor="name">Full Name</Label>
              <Input id="name" placeholder="e.g. Vivek Singh" value={form.name} onChange={(e) => update("name", e.target.value)} className="mt-1.5" data-testid="booking-name" />
            </div>
            <div>
              <Label htmlFor="phone">Phone Number</Label>
              <Input id="phone" inputMode="tel" placeholder="10-digit mobile" value={form.phone} onChange={(e) => update("phone", e.target.value)} className="mt-1.5" data-testid="booking-phone" />
            </div>
            <div className="md:col-span-2">
              <Label htmlFor="address">Pickup Address</Label>
              <Textarea id="address" rows={2} placeholder="House no, street, area, landmark" value={form.address} onChange={(e) => update("address", e.target.value)} className="mt-1.5" data-testid="booking-address" />
            </div>
            <div>
              <Label>Select Service</Label>
              <Select value={form.service} onValueChange={(v) => update("service", v)}>
                <SelectTrigger className="mt-1.5" data-testid="booking-service-trigger"><SelectValue placeholder="Choose a service" /></SelectTrigger>
                <SelectContent>
                 {(Array.isArray(services) ? services : []).map((s) => (
                    <SelectItem key={s.id} value={s.name} data-testid={`booking-service-opt-${s.id}`}>{s.name} — ₹{s.price} {s.unit}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Pickup Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <button type="button" className="mt-1.5 w-full inline-flex items-center justify-between rounded-md border border-neutral-200 bg-white px-3 h-10 text-sm hover:bg-neutral-50" data-testid="booking-date-trigger">
                    <span className={date ? "text-neutral-900" : "text-neutral-500"}>{date ? format(date, "EEE, dd MMM yyyy") : "Pick a date"}</span>
                    <CalendarIcon className="w-4 h-4 text-neutral-500" />
                  </button>
                </PopoverTrigger>
                <PopoverContent align="start" className="p-0 w-auto">
                  <Calendar mode="single" selected={date} onSelect={setDate} disabled={(d) => d < new Date(new Date().setHours(0, 0, 0, 0))} initialFocus />
                </PopoverContent>
              </Popover>
            </div>
            <div className="md:col-span-2">
              <Label>Pickup Time</Label>
              <Select value={form.pickup_time} onValueChange={(v) => update("pickup_time", v)}>
                <SelectTrigger className="mt-1.5" data-testid="booking-time-trigger"><SelectValue placeholder="Pick a time slot" /></SelectTrigger>
                <SelectContent>
                  {TIME_SLOTS.map((t) => (
                    <SelectItem key={t} value={t} data-testid={`booking-time-${t}`}>{t}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="md:col-span-2">
              <Label htmlFor="notes">Notes (optional)</Label>
              <Textarea id="notes" rows={2} placeholder="Any special instructions, fabric care, etc." value={form.notes} onChange={(e) => update("notes", e.target.value)} className="mt-1.5" data-testid="booking-notes" />
            </div>
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="mt-7 w-full inline-flex items-center justify-center gap-2 rounded-full px-6 py-4 text-white font-semibold shadow-lg hover:-translate-y-0.5 transition-all disabled:opacity-60 disabled:translate-y-0"
            style={{ backgroundColor: "#25D366" }}
            data-testid="booking-submit-btn"
          >
            {submitting ? <Loader2 className="w-5 h-5 animate-spin" /> : <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current"><path d="M.057 24l1.687-6.163a11.867 11.867 0 0 1-1.587-5.946C.16 5.335 5.495 0 12.05 0a11.81 11.81 0 0 1 8.413 3.488 11.824 11.824 0 0 1 3.48 8.414c-.003 6.557-5.338 11.892-11.893 11.892a11.9 11.9 0 0 1-5.688-1.448L.057 24z"/></svg>}
            {submitting ? "Submitting…" : "Confirm on WhatsApp"}
          </button>
          <p className="mt-3 text-center text-xs text-neutral-500">By booking you agree to our terms. We'll never spam you.</p>
        </form>
      </div>
    </section>
  );
}
