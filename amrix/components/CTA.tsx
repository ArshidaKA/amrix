"use client";

import { useRef } from "react";
import { ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";
import { PointerHighlight } from "@/components/ui/pointer-highlight";

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
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

export function CTA() {
  const sectionRef = useRef<HTMLElement>(null);

  const scrollToContact = () => {
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      ref={sectionRef}
      className="relative flex h-screen w-full items-center justify-center overflow-hidden"
    >
      <div aria-hidden className="pointer-events-none absolute inset-0">
        {[0, 1, 2, 3].map((i) => (
          <span
            key={i}
            className="absolute top-[-30%] h-[160%] w-[9vw]"
            style={{
              left: `${8 + i * 22}%`,
              background:
                "linear-gradient(to bottom, transparent, oklch(1 0 0 / 10%), transparent)",
              filter: "blur(18px)",
              animation: `beam-sweep ${11 + i * 3}s linear ${i * 2}s infinite`,
            }}
          />
        ))}
        <div
          className="absolute inset-0"
          style={{
            background: "radial-gradient(50% 50% at 50% 50%, oklch(1 0 0 / 8%) 0%, transparent 70%)",
          }}
        />
      </div>

      <div className="relative z-10 mx-auto max-w-[1100px] px-6 text-center md:px-10">
        <motion.h2
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-10%" }}
          className="font-display text-[clamp(2.6rem,9vw,8rem)] font-medium leading-[0.95] text-gradient-silver"
        >
          <span className="block overflow-hidden">
            <motion.span variants={lineVariant} className="block">
              <PointerHighlight>
                <span>Ready to Automate?</span>
              </PointerHighlight>
            </motion.span>
          </span>
        </motion.h2>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          <p className="mx-auto mt-8 max-w-xl text-balance text-base text-muted-foreground md:text-lg">
            Your competitors are already asking this question. Book your AI Audit today.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="mt-12 flex justify-center"
        >
          <button
            onClick={scrollToContact}
            className="group inline-flex items-center gap-3 rounded-full bg-white text-black px-10 py-5 text-sm font-medium shadow-[0_0_40px_-10px_rgba(255,255,255,0.3)] transition-all duration-500 hover:shadow-[0_0_80px_-10px_rgba(255,255,255,0.5)]"
          >
            Book AI Audit
            <ArrowUpRight className="size-4 transition-transform duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </button>
        </motion.div>
      </div>
    </section>
  );
}
