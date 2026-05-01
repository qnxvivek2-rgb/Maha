import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import GoogleReviews from "../components/GoogleReviews";
import Services from "../components/Services";
import HowItWorks from "../components/HowItWorks";
import Pricing from "../components/Pricing";
import Testimonials from "../components/Testimonials";
import BookingForm from "../components/BookingForm";
import Contact from "../components/Contact";
import Footer from "../components/Footer";
import FloatingWhatsApp from "../components/FloatingWhatsApp";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

export default function Home() {
  const [services, setServices] = useState([]);

  useEffect(() => {
    axios.get(`${API}/services`).then((r) => setServices(r.data)).catch((e) => console.error(e));
  }, []);

  return (
    <div className="min-h-screen bg-white" data-testid="home-page">
      <Navbar />
      <Hero />
      <GoogleReviews />
      <Services services={services} />
      <HowItWorks />
      <Pricing services={services} />
      <BookingForm services={services} />
      <Testimonials />
      <Contact />
      <Footer />
      <FloatingWhatsApp />
    </div>
  );
}
