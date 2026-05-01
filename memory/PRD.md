# Mahaveer Brothers Trading And Service Company — Laundry Website

## Original Problem Statement
"i want to build website for this laundry and it should have whataspp booking also" — laundry & dry cleaning business in Deoria, UP. Invoice provided with brand details (logo, GSTIN, contact, bank, UPI).

## User Choices
- WhatsApp Booking: Simple `wa.me` deep-link button (no Twilio/API)
- Backend: MongoDB-backed bookings + admin panel
- Services: Default 6 services with sample rates
- Visual style: Clean & professional white/red theme matching invoice
- WhatsApp number: 9695178760

## Architecture
- **Backend**: FastAPI + Motor (MongoDB). Public endpoints `/api/services`, `/api/bookings`. Admin endpoints under `/api/admin/*` gated by `x-admin-token` header.
- **Frontend**: React (CRA) + Tailwind + shadcn/ui. Routes: `/`, `/admin/login`, `/admin`.
- **Auth**: Simple env-based admin password → returns static token stored in localStorage. (MVP-grade; flagged for JWT upgrade.)
- **WhatsApp Integration**: `https://wa.me/919695178760?text=<encoded message>` — opens new tab with pre-filled booking details.

## Personas
- **Customer**: Books a free laundry pickup via WhatsApp or form
- **Admin (shop owner)**: Manages all bookings, updates status (pending → picked_up → in_progress → delivered)

## Core Requirements
- Mobile-first responsive landing page
- Floating WhatsApp button (always visible)
- Booking form with calendar + time-slot selection
- Admin dashboard with stats + status management

## What's Implemented (2026-05-01)
- Landing page: Navbar (now with **top address bar** showing full address + phone + email, and updated **real brand logo** `/mb-logo.png`), Hero with WhatsApp CTA, Services grid, How-it-works, Pricing rate card, Booking form (saves to DB + opens WhatsApp), Testimonials, Contact w/ embedded Google Map, Footer
- Booking form: client validation, calendar + time-slots, confirms via WhatsApp
- Floating WhatsApp button (pulsing)
- Admin login (`/admin/login`) — admin/admin123
- Admin dashboard — **tabbed view**: Bookings tab (stats cards, bookings table, inline status select, delete, message-customer-on-WhatsApp shortcut) and **Services & Pricing tab** (add new service, edit name/price/unit/description, delete)
- Backend: `/api/services` (DB-backed, auto-seeded), `/api/bookings`, `/api/admin/login`, `/api/admin/bookings` (GET, PATCH, DELETE), `/api/admin/services` (POST, PATCH, DELETE), `/api/admin/stats`
- Tested 100% across two iterations (20/20 pytest + full e2e UI)

## Backlog (P1/P2)
- **P1**: Multi-image gallery; richer testimonials with photos; Google review embed
- **P1**: Per-customer order history (lookup by phone)
- **P1**: Subscription/monthly plan signup
- **P2**: SMS/Email notifications on status change (Twilio/SendGrid)
- **P2**: Replace static admin token with JWT + refresh
- **P2**: Multi-language support (Hindi)
- **P2**: Coupon codes / referral program
- **P2**: Pickup-tracking link sent to customer

## Next Tasks
- Replace placeholder customer reviews with real ones
- Add real shop interior photos
- Optional: connect actual Google Maps coordinates (currently uses search-string embed)
