"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { ChevronDown } from "lucide-react";
import { PointerHighlight } from "@/components/ui/pointer-highlight";

const headline = ["Intelligent systems.", "Measurable impact."];

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.12, delayChildren: 0.3 },
  },
};

const lineVariant = {
  hidden: { y: "110%", opacity: 0 },
  show: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
  },
};

const stats = [
  { title: "Bottleneck", label: "Identify issues early" },
  { title: "Smarter", label: "Work better with AI" },
  { title: "Connect", label: "System sync in mins" },
];

export default function Hero() {
  return (
    <section id="home" className="relative min-h-screen w-full bg-[#0f0f0f] grid grid-cols-1 md:grid-cols-2">
      {/* ══════════════════════════════════════════════
          Left Side (Content)
         ══════════════════════════════════════════════ */}
      <div className="relative flex flex-col justify-center px-8 md:pl-20 md:pr-16 pt-32 pb-16 md:pt-40 md:pb-24 z-10 bg-transparent md:bg-[#0f0f0f]">
        <div className="max-w-[480px]">
          {/* eyebrow */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.6 }}
            className="text-[10px] md:text-[11px] font-medium tracking-[0.2em] text-[#8a8a8f] mb-8 uppercase"
          >
            AMRIX | ESTAB 2024 - SING - UK
          </motion.p>

          {/* headline */}
          <motion.h1
            variants={container}
            initial="hidden"
            animate="show"
            className="font-display font-medium leading-[1.15] tracking-[-0.02em]
                       text-4xl md:text-5xl lg:text-[52px] text-[#f4f4f2] mb-6"
          >
            {headline.map((line, idx) => (
              <span key={line} className="block pb-2">
                <motion.span variants={lineVariant} className="block">
                  {idx === 1 ? (
                    <PointerHighlight rectangleClassName="border-white/30" pointerClassName="text-white">
                      <span>{line}</span>
                    </PointerHighlight>
                  ) : (
                    line
                  )}
                </motion.span>
              </span>
            ))}
          </motion.h1>

          {/* sub-copy */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.1, duration: 0.6 }}
            className="text-[#a0a0a5] text-sm md:text-[15px] leading-relaxed mb-10 max-w-md"
          >
            AMRIX designs, connects, and powers intelligent systems that improve how businesses operate, serve customers, and grow.
          </motion.p>

          {/* CTA buttons */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.3, duration: 0.6 }}
            className="flex flex-col sm:flex-row items-center gap-4 mb-20"
          >
            <button
              className="group inline-flex w-full sm:w-auto items-center justify-between sm:justify-center gap-6 rounded-full
                         bg-[#f4f4f2] text-[#0f0f0f] text-[13px] font-medium px-6 py-3.5
                         transition-all hover:bg-white"
            >
              Enterprise Intelligence tech
              <ChevronDown className="size-4 opacity-50" />
            </button>
            <a
              href="#contact"
              className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-full
                         border border-white/10 text-white text-[13px] font-medium px-6 py-3.5
                         hover:bg-white/5 hover:border-white/20 transition-all"
            >
              Book a discovery call
            </a>
          </motion.div>

          {/* bottom stats strip */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5, duration: 0.6 }}
            className="grid grid-cols-3 gap-6 pt-12 border-t border-white/[0.06]"
          >
            {stats.map((s) => (
              <div key={s.title} className="flex flex-col gap-1.5">
                <h4 className="text-[#f4f4f2] text-[13px] font-semibold tracking-wide">{s.title}</h4>
                <p className="text-[11px] text-[#6b6b70]">{s.label}</p>
              </div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2, duration: 1 }}
            className="mt-20 text-[9px] text-[#555] flex justify-between uppercase tracking-[0.3em] font-medium"
          >
            <span>01 / HOME / INTRO</span>
            <span>SCROLL /</span>
          </motion.div>
        </div>
      </div>

      {/* ══════════════════════════════════════════════
          Right Side (Video - Mobile background overlay / Desktop split)
         ══════════════════════════════════════════════ */}
      <div className="absolute inset-0 md:relative md:inset-auto h-full w-full bg-[#0f0f0f] overflow-hidden z-0 md:z-auto opacity-30 md:opacity-100">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover select-none object-center"
        >
          <source src="/hero.MP4" type="video/mp4" />
        </video>
        {/* Soft edge blend for desktop split & gradient mask for mobile */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0f0f0f] via-transparent to-[#0f0f0f]/60 md:hidden pointer-events-none" />
        <div className="hidden md:block absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-[#0f0f0f] via-[#0f0f0f]/80 to-transparent pointer-events-none" />
      </div>
    </section>
  );
}
