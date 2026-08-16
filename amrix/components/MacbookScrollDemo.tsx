"use client";
import React from "react";
import { motion } from "framer-motion";
import { MacbookScroll } from "@/components/ui/macbook-scroll";

const lineVariant = {
  hidden: { y: "110%", opacity: 0 },
  show: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
  },
};

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.14, delayChildren: 0.05 } },
};

const headlineLines = ["We are architects of", "intelligent systems", "for the AI era."];
const bodyLines = [
  "Amrix combines data, creativity,",
  "and artificial intelligence to build",
  "smarter systems and workflows",
  "that drive real business growth.",
];

/** ─── Mobile fallback card (shown only on < md) ─────────────────────────── */
function MobileAboutCard() {
  return (
    <div className="relative w-full overflow-hidden bg-gradient-to-b from-neutral-900 via-[#0a0a0c] to-[#050505] px-6 py-20">
      {/* ambient glow */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(157,180,255,0.08)_0%,transparent_70%)]" />

      <div className="relative mx-auto max-w-sm">
        {/* eyebrow */}
        <motion.span
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-6 block text-center text-xs font-medium uppercase tracking-[0.3em] text-[#9db4ff]"
        >
          Who We Are
        </motion.span>

        {/* headline */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="mb-10 flex flex-col items-center text-center"
        >
          {headlineLines.map((line) => (
            <span key={line} className="block overflow-hidden">
              <motion.span
                variants={lineVariant}
                className="block font-display text-3xl font-semibold leading-[1.15] text-[#d1d1d6]"
              >
                {line}
              </motion.span>
            </span>
          ))}
        </motion.div>

        {/* screen content card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="relative overflow-hidden rounded-2xl border border-white/10 bg-[#18181b] p-7 text-center shadow-[0_0_0_1px_rgba(255,255,255,0.04)_inset]"
        >
          {/* subtle top glow line */}
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#9db4ff]/30 to-transparent" />

          <div className="flex flex-col gap-1.5">
            {bodyLines.map((line, i) => (
              <motion.p
                key={i}
                initial={{ y: "110%", opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.75, delay: 0.4 + i * 0.13, ease: [0.16, 1, 0.3, 1] }}
                className="text-[0.95rem] font-medium leading-relaxed text-white/80"
              >
                {line}
              </motion.p>
            ))}
          </div>

          {/* corner badge */}
          <a
            href="#services"
            className="mt-6 inline-flex items-center gap-1.5 text-xs text-[#9db4ff] hover:gap-2.5 transition-all"
          >
            Explore our services
            <svg width="12" height="12" viewBox="0 0 16 16" fill="currentColor">
              <path d="M3.204 11h9.592L8 3.185 3.204 11zm-.753.5a.5.5 0 0 1-.439-.748L7.439 2.31a.75.75 0 0 1 1.122 0l5.43 8.442a.5.5 0 0 1-.44.748H2.45z"/>
            </svg>
          </a>
        </motion.div>
      </div>
    </div>
  );
}

/** ─── Desktop MacBook scroll (shown only on md+) ────────────────────────── */
function DesktopMacbookScroll() {
  return (
    <div className="relative w-full overflow-hidden bg-gradient-to-b from-neutral-900 via-[#0a0a0c] to-[#050505]">
      <MacbookScroll
        title={
          <div className="flex flex-col items-center gap-3">
            <motion.span
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-xs uppercase tracking-[0.3em] text-[#9db4ff] font-medium"
            >
              Who We Are
            </motion.span>
            <motion.div
              variants={container}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="flex flex-col items-center"
            >
              {headlineLines.map((line) => (
                <span key={line} className="block overflow-hidden">
                  <motion.span
                    variants={lineVariant}
                    className="block font-display font-semibold text-3xl md:text-5xl leading-[1.1] text-[#d1d1d6]"
                  >
                    {line}
                  </motion.span>
                </span>
              ))}
            </motion.div>
          </div>
        }
        badge={
          <a href="#services">
            <Badge className="h-10 w-10 -rotate-12 transform" />
          </a>
        }
        screenContent={
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: "#18181b",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              textAlign: "center",
              padding: "2.5rem",
              gap: "0.5rem",
              border: "1px solid rgba(255,255,255,0.25)",
              borderRadius: "0.5rem",
              boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.06)",
            }}
          >
            {bodyLines.map((line, i) => (
              <div key={i} style={{ overflow: "hidden" }}>
                <motion.p
                  initial={{ y: "110%", opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.75, delay: 0.3 + i * 0.13, ease: [0.16, 1, 0.3, 1] }}
                  style={{
                    color: "rgba(255,255,255,0.85)",
                    fontSize: "1.1rem",
                    fontWeight: 500,
                    lineHeight: 1.6,
                    margin: 0,
                  }}
                >
                  {line}
                </motion.p>
              </div>
            ))}
          </div>
        }
        showGradient={false}
      />
    </div>
  );
}

/** ─── Main export ───────────────────────────────────────────────────────── */
export function MacbookScrollDemo() {
  return (
    <>
      {/* Mobile: clean static card */}
      <div className="block md:hidden">
        <MobileAboutCard />
      </div>
      {/* Desktop: full MacBook scroll animation */}
      <div className="hidden md:block">
        <DesktopMacbookScroll />
      </div>
    </>
  );
}

const Badge = ({ className }: { className?: string }) => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 56 56"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <circle cx="28" cy="28" r="28" fill="#f4f4f2" />
      <path d="M28 15L40 38H16L28 15Z" fill="#050505" />
    </svg>
  );
};