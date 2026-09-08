"use client";

import { useRef, useState } from "react";
import { ArrowUpRight, ChevronDown, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { PointerHighlight } from "@/components/ui/pointer-highlight";
import { section } from "framer-motion/client";

const servicesList = [
  "AI Strategy, Audit & Governance",
  "Workflow Automation & Integration",
  "AI Agents & Custom Solutions",
  "Data Intelligence & Reporting",
  "Digital Experience",
  "Marketing Intelligence & Content Systems",
];

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
  const [isOpen, setIsOpen] = useState(false);

  const handleSelectService = (service: string) => {
    window.location.href = `mailto:core@amrix-ai.com?subject=Inquiry about ${encodeURIComponent(service)}`;
    setIsOpen(false);
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
            Your competitors are already asking this question. Book your service today.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ delay: 0.6, duration: 0.6 }}
        >
          <div>
            <button
              onClick={() => setIsOpen(true)}
              className="group inline-flex items-center gap-3 rounded-full bg-white text-black px-10 py-3 text-sm mt-10 font-medium shadow-[0_0_40px_-10px_rgba(255,255,255,0.3)] transition-all duration-500 hover:shadow-[0_0_80px_-10px_rgba(255,255,255,0.5)]"
            >
              Book your service
            </button>
            <AnimatePresence>
              {isOpen && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
                  onClick={() => setIsOpen(false)}
                >
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: 20 }}
                    transition={{ type: "spring", duration: 0.5 }}
                    onClick={(e) => e.stopPropagation()}
                    className="relative w-full max-w-md overflow-hidden rounded-2xl bg-[#0a0a0a] border border-white/10 shadow-2xl text-left"
                  >
                    <div className="flex items-center justify-between border-b border-white/10 px-6 py-4">
                      <h3 className="text-lg font-medium text-white">Select a Service</h3>
                      <button 
                        onClick={() => setIsOpen(false)}
                        className="text-[#8a8a8f] hover:text-white transition-colors"
                      >
                        <X className="size-5" />
                      </button>
                    </div>
                    <div className="flex flex-col py-2 max-h-[60vh] overflow-y-auto">
                      {servicesList.map((service, idx) => (
                        <button
                          key={idx}
                          onClick={() => {
                            handleSelectService(service);
                            setIsOpen(false);
                          }}
                          className="px-6 py-4 text-sm text-[#8a8a8f] hover:bg-white/5 hover:text-white transition-colors text-left flex items-center justify-between group/btn"
                        >
                          {service}
                          <ArrowUpRight className="size-4 opacity-0 -translate-x-2 group-hover/btn:opacity-100 group-hover/btn:translate-x-0 transition-all" />
                        </button>
                      ))}
                    </div>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
