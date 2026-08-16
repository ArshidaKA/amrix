"use client";
import React, { useRef } from "react";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useScroll,
  useTransform,
} from "framer-motion";
import { PointerHighlight } from "@/components/ui/pointer-highlight";

const lineVariant = {
  hidden: { y: "110%", opacity: 0 },
  show: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
  },
};

const headlineContainer = {
  hidden: {},
  show: { transition: { staggerChildren: 0.14, delayChildren: 0.05 } },
};

type Step = {
  number: string;
  title: string;
  tag: string;
  description: string;
};

const STEPS: Step[] = [
  {
    number: "01",
    title: "Discovery",
    tag: "Days 1–3",
    description:
      "A focused discovery form and a 45-minute call. We assess fit: need, readiness, and value.",
  },
  {
    number: "02",
    title: "Audit & Proposal",
    tag: "Days 3–7",
    description:
      "We map your current state against the automated state and present scope, timeline, investment, and ROI estimate, live on a call.",
  },
  {
    number: "03",
    title: "Agreement & Onboarding",
    tag: "Days 7–10",
    description:
      "A simple two-page agreement, a structured onboarding pack, and a dedicated project workspace.",
  },
  {
    number: "04",
    title: "Build",
    tag: "Weeks 2–4",
    description:
      "We build in your environment with weekly video progress updates and a structured client testing phase.",
  },
  {
    number: "05",
    title: "Launch & Handover",
    tag: "Final week",
    description:
      "Your system goes live with team training, visual documentation, and a full handover report.",
  },
  {
    number: "06",
    title: "Support & Growth",
    tag: "Ongoing",
    description:
      "Monthly check-ins, proactive automation suggestions, and quarterly expansion reviews. Your systems compound.",
  },
];

/** Card with a pointer-tracked spotlight: a soft radial highlight and a
 * matching glow on the border that follow the cursor while hovering. */
function ProcessStep({ step, index }: { step: Step; index: number }) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  }

  const background = useMotionTemplate`radial-gradient(380px circle at ${mouseX}px ${mouseY}px, rgba(157,180,255,0.13), transparent 70%)`;
  const borderGlow = useMotionTemplate`radial-gradient(260px circle at ${mouseX}px ${mouseY}px, rgba(157,180,255,0.75), transparent 65%)`;

  return (
    <motion.div
      initial={{ opacity: 0, x: -24 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, delay: index * 0.06, ease: [0.16, 1, 0.3, 1] }}
      onMouseMove={handleMouseMove}
      className="group relative -mx-5 grid grid-cols-[3.5rem_1fr] gap-x-6 rounded-2xl px-5 py-6 transition-all duration-300 md:grid-cols-[5rem_1fr] md:gap-x-10 hover:bg-white/[0.02]"
    >
      {/* pointer-tracked fill */}
      <motion.div
        className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-200 group-hover:opacity-100"
        style={{ background }}
      />
      {/* pointer-tracked border glow (1px ring that lights up near the cursor) */}
      <motion.div
        className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-200 group-hover:opacity-100"
        style={{
          padding: 1,
          background: borderGlow,
          WebkitMask:
            "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
          WebkitMaskComposite: "xor",
          maskComposite: "exclude",
        }}
      />
      {/* subtle inner bottom separator line */}
      <div className="pointer-events-none absolute bottom-0 left-14 right-0 h-px bg-gradient-to-r from-white/5 to-transparent transition-colors duration-300 group-hover:from-[#9db4ff]/20 md:left-20" />

      {/* number column */}
      <div className="relative flex justify-center">
        <motion.span
          className="font-display text-2xl font-semibold tabular-nums text-white/15 transition-colors duration-500 group-hover:text-[#9db4ff] md:text-3xl"
          whileHover={{ scale: 1.08 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
          {step.number}
        </motion.span>
      </div>

      {/* content column */}
      <div className="relative pb-8 md:pb-12">
        <div className="mb-2 flex flex-wrap items-center gap-x-3 gap-y-1">
          <h3 className="font-display text-xl font-semibold text-[#e8e8ec] transition-colors duration-300 group-hover:text-white md:text-2xl">
            {step.title}
          </h3>
          <span className="rounded-full border border-white/10 px-2.5 py-0.5 text-[10px] font-medium uppercase tracking-[0.18em] text-white/40 transition-colors duration-300 group-hover:border-[#9db4ff]/30 group-hover:text-[#9db4ff]">
            {step.tag}
          </span>
        </div>
        <p className="max-w-xl text-[0.95rem] leading-relaxed text-white/45 transition-colors duration-300 group-hover:text-white/70 md:text-base">
          {step.description}
        </p>
      </div>
    </motion.div>
  );
}

export function ProcessSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 0.75", "end 0.4"],
  });

  const spineScale = useTransform(scrollYProgress, [0, 1], [0, 1]);
  // percentage position of the traveling glow dot along the track
  const dotTop = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  const dotOpacity = useTransform(scrollYProgress, [0, 0.03, 0.97, 1], [0, 1, 1, 0]);

  // ambient section-wide pointer glow for atmosphere
  const ambientX = useMotionValue(0);
  const ambientY = useMotionValue(0);
  const ambientBackground = useMotionTemplate`radial-gradient(700px circle at ${ambientX}px ${ambientY}px, rgba(157,180,255,0.07), transparent 80%)`;

  function handleSectionMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    ambientX.set(e.clientX - rect.left);
    ambientY.set(e.clientY - rect.top);
  }

  return (
    <section
      ref={sectionRef}
      onMouseMove={handleSectionMouseMove}
      className="relative w-full overflow-hidden bg-gradient-to-b from-[#050505] via-[#08080a] to-[#050505] px-6 py-28 md:py-40"
    >
      {/* ambient cursor glow across the whole section */}
      <motion.div
        className="pointer-events-none absolute inset-0"
        style={{ background: ambientBackground }}
      />

      <div className="relative mx-auto max-w-5xl">
        {/* eyebrow + headline */}
        <motion.div
          variants={headlineContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="mb-20 md:mb-28"
        >
          <span className="block overflow-hidden">
            <motion.span
              variants={lineVariant}
              className="mb-4 block text-xs font-medium uppercase tracking-[0.3em] text-[#9db4ff]"
            >
              The Process
            </motion.span>
          </span>
          <PointerHighlight
            rectangleClassName="border-[#9db4ff]/40"
            pointerClassName="text-[#9db4ff]"
            containerClassName="block"
          >
            <span className="block overflow-hidden">
              <motion.span
                variants={lineVariant}
                className="block font-display text-3xl font-semibold leading-[1.15] text-[#d1d1d6] sm:text-4xl md:text-5xl"
              >
                From first call to live system
              </motion.span>
            </span>
            <span className="block overflow-hidden">
              <motion.span
                variants={lineVariant}
                className="block font-display text-3xl font-semibold leading-[1.15] text-[#d1d1d6] sm:text-4xl md:text-5xl"
              >
                in weeks, not quarters.
              </motion.span>
            </span>
          </PointerHighlight>
        </motion.div>

        {/* timeline */}
        <div className="relative">
          {/* static track */}
          <div
            className="absolute top-2 bottom-14 hidden w-px bg-white/8 md:block"
            style={{ left: "2.5rem" }}
          />
          {/* animated fill, grows with scroll progress */}
          <motion.div
            className="absolute top-2 hidden w-px origin-top bg-gradient-to-b from-[#9db4ff] via-[#9db4ff] to-[#9db4ff]/20 md:block"
            style={{
              left: "2.5rem",
              bottom: "3.5rem",
              scaleY: spineScale,
              boxShadow: "0 0 12px 0 rgba(157,180,255,0.35)",
            }}
          />
          {/* traveling glow dot — marks current scroll position on the spine */}
          <motion.div
            className="absolute z-10 hidden h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#9db4ff] md:block"
            style={{
              left: "2.5rem",
              top: dotTop,
              opacity: dotOpacity,
              boxShadow: "0 0 10px 3px rgba(157,180,255,0.6)",
            }}
          />

          <div className="flex flex-col">
            {STEPS.map((step, i) => (
              <ProcessStep key={step.number} step={step} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}