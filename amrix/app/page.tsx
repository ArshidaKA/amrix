"use client";

import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Services from "@/components/Services";
import { CTA } from "@/components/CTA";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import { ProcessSection } from "@/components/Processsection";
export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Services />
        <ProcessSection/>
        <CTA />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
