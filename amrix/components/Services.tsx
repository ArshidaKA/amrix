"use client";

import dynamic from "next/dynamic";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { PointerHighlight } from "@/components/ui/pointer-highlight";
import { useRef } from "react";
import { useMagneticTilt } from "@/components/hooks/use-magnetic-tilt";
import {
  AutomationIcon,
  StudioIcon,
  DigitalExperienceIcon,
  MarketingIcon,
  AuditIcon,
} from "@/components/icons/AnimatedServiceIcons";
import type { ServiceSceneVariant } from "./ServiceScene3D";

const ServiceScene3D = dynamic(() => import("./ServiceScene3D"), { ssr: false });

const EASE = [0.16, 1, 0.3, 1] as [number, number, number, number];

const services: {
  icon: typeof AutomationIcon;
  title: string;
  desc: string;
  tags: string[];
  scene: ServiceSceneVariant;
  featured?: boolean;
}[] = [
  {
    icon: AuditIcon,
    title: "AI Strategy, Audit & Governance",
    desc: "A structured assessment of business opportunities, AI maturity, data readiness, risk, and governance. Produces a prioritized roadmap showing what to implement, in what order, and under which controls.",
    tags: ["Assessment", "Roadmap", "Governance"],
    scene: "audit",
  },
  {
    icon: AutomationIcon,
    title: "Workflow Automation & Integration",
    desc: "Redesigns repetitive workflows and connects ERP, CRM, finance, HR, email, messaging, and operational tools into governed automated processes.",
    tags: ["RPA", "Integration", "Efficiency"],
    scene: "automation",
  },
  {
    icon: StudioIcon,
    title: "AI Agents & Custom Solutions",
    desc: "Custom AI agents, copilots, RAG systems, predictive solutions, NLP, computer vision, and role-specific productivity systems built around real business use cases.",
    tags: ["RAG", "Copilots", "NLP"],
    scene: "studio",
  },
  {
    icon: MarketingIcon,
    title: "Data Intelligence & Reporting",
    desc: "Connected dashboards, analytics, predictive insight, and automated reporting that turn live operational and customer data into clear decisions.",
    tags: ["Dashboards", "Analytics", "Predictive"],
    scene: "marketing",
  },
  {
    icon: DigitalExperienceIcon,
    title: "Digital Experience",
    desc: "High-performing websites, applications, portals, and conversational interfaces that combine refined design, scalable engineering, and intelligent personalization.",
    tags: ["Web", "Design", "AI UI"],
    scene: "digital",
  },
  {
    icon: MarketingIcon,
    title: "Marketing Intelligence & Content Systems",
    desc: "A connected growth system that unifies marketing data, segmentation, predictive insight, campaign automation, personalization, and governed content production.",
    tags: ["Growth", "Campaigns", "Content"],
    scene: "marketing",
  },
];

function ServiceCard({ service, index }: { service: (typeof services)[0]; index: number }) {
  const prefersReducedMotion = useReducedMotion();
  const cardRef = useRef<HTMLDivElement>(null);
  const { rotateX, rotateY, handleMouseMove, handleMouseLeave, mousePosition } =
    useMagneticTilt(cardRef);

  return (
    <motion.div
      ref={cardRef}
      initial={{ clipPath: "inset(0 100% 0 0)", opacity: 0 }}
      whileInView={{ clipPath: "inset(0 0% 0 0)", opacity: 1 }}
      viewport={{ once: true, margin: "-10% 0px" }}
      transition={{ duration: 0.8, delay: index * 0.1, ease: EASE }}
      onMouseMove={!prefersReducedMotion ? handleMouseMove : undefined}
      onMouseLeave={handleMouseLeave}
      style={
        !prefersReducedMotion
          ? { rotateX, rotateY, transformPerspective: 1000 }
          : undefined
      }
      className={`group relative flex flex-col overflow-hidden rounded-2xl bg-[#050505] transition-colors hover:bg-[#0a0a0a] border border-white/5 ${
        service.featured ? "md:col-span-2" : "col-span-1"
      }`}
    >
      {/* cursor sheen */}
      <div
        className="pointer-events-none absolute inset-0 z-20 opacity-0 transition-opacity duration-300 group-hover:opacity-100 mix-blend-overlay"
        style={{
          background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(157, 180, 255, 0.15), transparent 40%)`,
        }}
      />

      {/* 3D model thumbnail instead of an image */}
      <div className="relative h-48 w-full overflow-hidden border-b border-white/5 bg-gradient-to-b from-white/[0.03] to-transparent">
        <ServiceScene3D variant={service.scene} />
        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent" />
      </div>

      <div className="relative z-10 flex flex-1 flex-col gap-5 p-8">
        <div className="flex items-start justify-between">
          <div className="flex h-12 w-12 items-center justify-center rounded-full border border-white/10 text-[#f4f4f2] transition-all duration-500 group-hover:border-[#9db4ff]/50 group-hover:text-[#9db4ff]">
            <service.icon className="h-5 w-5" />
          </div>
          <a
            href="#contact"
            className="inline-flex items-center gap-1.5 rounded-full border border-white/10 px-3 py-1.5 text-xs text-[#8a8a8f] opacity-0 transition-all group-hover:border-white/20 group-hover:text-[#f4f4f2] group-hover:opacity-100"
          >
            View service{" "}
            <ArrowUpRight size={13} className="transition-transform group-hover:translate-x-0.5" />
          </a>
        </div>

        <div className="mt-2 flex-1">
          <h3 className="font-display mb-3 text-lg font-semibold md:text-xl">{service.title}</h3>
          <p className="text-sm leading-relaxed text-[#8a8a8f] md:text-base">{service.desc}</p>
        </div>

        <div className="mt-auto flex flex-wrap gap-2 pt-4">
          {service.tags.map((tag, i) => (
            <motion.span
              key={tag}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 + 0.4 + i * 0.1 }}
              className="rounded-full border border-white/10 bg-transparent px-3 py-1 text-[11px] font-medium tracking-wide text-[#8a8a8f] transition-colors group-hover:border-white/20 group-hover:text-[#f4f4f2]"
            >
              {tag}
            </motion.span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export default function Services() {
  const containerRef = useRef<HTMLElement>(null);

  return (
    <section ref={containerRef} id="services" className="relative border-t border-white/10">
      <div className="mx-auto max-w-7xl px-6 py-24 md:px-10 md:py-32">
        <div className="mb-16 max-w-xl">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10% 0px" }}
            transition={{ duration: 0.6 }}
          >
            <p className="eyebrow mb-4">What We Do</p>
          </motion.div>

          <motion.h2
            variants={{
              hidden: {},
              show: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
            }}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-10% 0px" }}
            className="font-display text-3xl font-semibold leading-[1.05] md:text-5xl"
          >
            <span className="block overflow-hidden">
              <motion.span
                variants={{
                  hidden: { y: "110%", opacity: 0 },
                  show: { y: 0, opacity: 1, transition: { duration: 0.9, ease: EASE } },
                }}
                className="block"
              >
                <PointerHighlight>
                  <span>Six disciplines.</span>
                </PointerHighlight>
              </motion.span>
            </span>
            <span className="block overflow-hidden">
              <motion.span
                variants={{
                  hidden: { y: "110%", opacity: 0 },
                  show: { y: 0, opacity: 1, transition: { duration: 0.9, ease: EASE } },
                }}
                className="block"
              >
                <PointerHighlight>
                  <span>One intelligent system.</span>
                </PointerHighlight>
              </motion.span>
            </span>
          </motion.h2>
        </div>

        <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => (
            <ServiceCard key={service.title} service={service} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
