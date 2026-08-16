"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { ArrowUpRight, TrendingUp, Target, Sparkles } from "lucide-react";
import CountUp from "./CountUp";
import { PointerHighlight } from "@/components/ui/pointer-highlight";

const headline = ["INTELLIGENT AUTOMATION.", "SEAMLESS WORKFLOWS.", "MEASURABLE IMPACT."];

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
  { icon: TrendingUp, value: 134.8, decimals: 1, suffix: "%", label: "Avg. Organic Growth" },
  { icon: Target, value: 72, decimals: 0, suffix: "%", label: "SEO Score Increase" },
  { icon: Sparkles, value: 389, decimals: 0, suffix: "%", label: "Average ROI Increase" },
];

/** Animated logo scene — reused for both mobile (centered bg) and desktop (right panel) */
function LogoScene({ className }: { className?: string }) {
  return (
    <div className={`relative flex items-center justify-center ${className ?? ""}`}>
      {/* outer slow-spin orbital ring */}
      <motion.div
        className="absolute inset-0 rounded-full border border-white/[0.06]"
        animate={{ rotate: 360 }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
      >
        <motion.div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-[#9db4ff]/70 shadow-[0_0_8px_2px_rgba(157,180,255,0.6)]" />
      </motion.div>

      {/* inner counter-spin orbital ring */}
      <motion.div
        className="absolute inset-[18%] rounded-full border border-white/[0.05]"
        animate={{ rotate: -360 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      >
        <motion.div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-1.5 h-1.5 rounded-full bg-white/50 shadow-[0_0_6px_2px_rgba(255,255,255,0.4)]" />
      </motion.div>

      {/* pulsing glow rings */}
      {[1, 1.6, 2.2].map((scale, i) => (
        <motion.div
          key={i}
          className="absolute inset-[28%] rounded-full border border-[#9db4ff]/10"
          animate={{ scale: [1, scale, 1], opacity: [0.5, 0, 0.5] }}
          transition={{ duration: 4 + i * 1.5, repeat: Infinity, ease: "easeInOut", delay: i * 1.2 }}
        />
      ))}

      {/* floating logo */}
      <motion.div
        animate={{ y: [0, -14, 0], rotate: [-1, 1, -1] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="relative z-10 drop-shadow-[0_0_40px_rgba(157,180,255,0.25)]"
      >
        <Image
          src="/logo.png"
          alt="Amrix"
          width={220}
          height={220}
          className="w-full h-full object-contain select-none"
          priority
        />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(157,180,255,0.18)_0%,transparent_65%)] blur-xl" />
      </motion.div>

      {/* sparkle particles */}
      {[
        { top: "10%", left: "15%", delay: 0,   dur: 3.2 },
        { top: "75%", left: "8%",  delay: 0.8, dur: 4   },
        { top: "20%", left: "80%", delay: 1.5, dur: 3.6 },
        { top: "85%", left: "72%", delay: 0.4, dur: 5   },
        { top: "50%", left: "5%",  delay: 2,   dur: 4.4 },
      ].map((p, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 rounded-full bg-white/40"
          style={{ top: p.top, left: p.left }}
          animate={{ opacity: [0, 1, 0], scale: [0.5, 1.4, 0.5] }}
          transition={{ duration: p.dur, repeat: Infinity, ease: "easeInOut", delay: p.delay }}
        />
      ))}
    </div>
  );
}

export default function Hero() {
  return (
    <section id="home" className="relative min-h-screen overflow-hidden pt-20">

      {/* ══════════════════════════════════════════════
          MOBILE background logo (centered, dimmed)
          Hidden on md+
         ══════════════════════════════════════════════ */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center md:hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(157,180,255,0.05)_0%,transparent_70%)]" />
        <div className="opacity-20 w-[280px] h-[280px]">
          <LogoScene className="w-full h-full" />
        </div>
      </div>

      {/* ══════════════════════════════════════════════
          DESKTOP background logo (right-aligned)
          Hidden below md
         ══════════════════════════════════════════════ */}
      <div className="pointer-events-none absolute inset-0 hidden md:flex items-center justify-end pr-20">
        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-[radial-gradient(ellipse_at_center,rgba(157,180,255,0.07)_0%,transparent_70%)]" />
        <LogoScene className="w-[480px] h-[480px]" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#050505] via-transparent to-[#050505]" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#050505] via-transparent to-[#050505]/30" />
      </div>

      {/* ══════════════════════════════════════════════
          Content
         ══════════════════════════════════════════════ */}
      <div className="relative mx-auto max-w-7xl px-6 md:px-10 pt-10 md:pt-16 pb-10 md:pb-48">

        {/* eyebrow */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.6 }}
          className="eyebrow mb-5 text-center md:text-left text-[10px] md:text-xs"
        >
          AI Automation&nbsp;•&nbsp;AI Workflow Integration&nbsp;•&nbsp;AI &amp; Data Intelligence
        </motion.p>

        {/* headline */}
        <motion.h1
          variants={container}
          initial="hidden"
          animate="show"
          className="font-display font-semibold uppercase leading-[0.98] tracking-tight
                     text-[10vw] sm:text-[8vw] md:text-5xl lg:text-7xl
                     max-w-4xl text-center md:text-left"
        >
          {headline.map((line) => (
            <span key={line} className="block overflow-hidden">
              <motion.span variants={lineVariant} className="block">
                <PointerHighlight>
                  <span
                    className={
                      line === "MEASURABLE IMPACT."
                        ? "text-transparent bg-clip-text bg-gradient-to-r from-gray-100 via-white to-gray-400 drop-shadow-[0_0_15px_rgba(255,255,255,0.4)]"
                        : ""
                    }
                  >
                    {line}
                  </span>
                </PointerHighlight>
              </motion.span>
            </span>
          ))}
        </motion.h1>

        {/* sub-copy */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1, duration: 0.6 }}
          className="mt-7 max-w-md mx-auto md:mx-0 text-center md:text-left"
        >
          <div className="h-px w-16 bg-white/25 mb-4 mx-auto md:mx-0" />
          <p className="eyebrow !text-[#f4f4f2] !tracking-normal !normal-case text-sm md:text-base mb-2">
            Built for what&apos;s next
          </p>
          <p className="text-[#8a8a8f] text-sm leading-relaxed">
            Amrix combines data, creativity, and artificial intelligence to build smarter
            systems and workflows that drive real business growth.
          </p>
        </motion.div>

        {/* CTA buttons */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.3, duration: 0.6 }}
          className="mt-8 flex flex-col sm:flex-row items-center justify-center md:justify-start gap-3"
        >
          <a
            href="#services"
            className="group inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-full
                       bg-[#f4f4f2] text-black text-sm font-medium px-6 py-3
                       hover:gap-3 transition-all"
          >
            Our Services
            <ArrowUpRight size={16} />
          </a>
          <a
            href="#contact"
            className="btn-outline inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-full
                       text-sm font-medium px-6 py-3
                       hover:gap-3 transition-all"
          >
            Start a Project
            <ArrowUpRight size={16} />
          </a>
        </motion.div>

        {/* ── MOBILE stats strip ──────────────────────────────────────
            Horizontal scrollable row, visible only on mobile          */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.6 }}
          className="mt-10 flex md:hidden gap-3 overflow-x-auto pb-1 -mx-2 px-2
                     scrollbar-none snap-x snap-mandatory"
        >
          {stats.map((s) => (
            <div
              key={s.label}
              className="flex-shrink-0 snap-start glass rounded-xl p-4 min-w-[140px] flex flex-col gap-1"
            >
              <div className="w-7 h-7 rounded-full border border-white/15 flex items-center justify-center mb-1">
                <s.icon size={13} className="text-[#9db4ff]" />
              </div>
              <div className="font-display text-lg font-semibold">
                <CountUp target={s.value} decimals={s.decimals} suffix={s.suffix} />
              </div>
              <div className="text-[10px] text-[#8a8a8f] leading-tight">{s.label}</div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* ── DESKTOP floating stats card ─────────────────────────────
          Absolute-positioned card, visible only on md+             */}
      <motion.aside
        initial={{ opacity: 0, x: 24 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.9, duration: 0.7, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
        className="hidden md:block absolute right-10 top-28 glass rounded-2xl p-6 w-[260px]"
      >
        <p className="eyebrow mb-5">Results That Matter</p>
        <div className="space-y-5">
          {stats.map((s) => (
            <div key={s.label} className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full border border-white/15 flex items-center justify-center shrink-0">
                <s.icon size={15} className="text-[#9db4ff]" />
              </div>
              <div>
                <div className="font-display text-xl font-semibold">
                  <CountUp target={s.value} decimals={s.decimals} suffix={s.suffix} />
                </div>
                <div className="text-[11px] text-[#8a8a8f] leading-tight">{s.label}</div>
              </div>
            </div>
          ))}
        </div>
        <a
          href="#services"
          className="mt-6 inline-flex items-center gap-1.5 text-xs text-[#f4f4f2] hover:gap-2.5 transition-all"
        >
          Explore results <ArrowUpRight size={13} />
        </a>
      </motion.aside>
    </section>
  );
}
