"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, Mail, MapPin, Phone } from "lucide-react";
import { PointerHighlight } from "@/components/ui/pointer-highlight";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] } },
};

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <section id="contact" className="relative border-t border-white/10">
      <div className="mx-auto max-w-7xl px-6 md:px-10 py-24 md:py-32 grid lg:grid-cols-5 gap-16">
        <div className="lg:col-span-2">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-15%" }}
            transition={{ duration: 0.6 }}
          >
            <p className="eyebrow mb-4">Get In Touch</p>
          </motion.div>

          <motion.h2
            variants={{
              hidden: {},
              show: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
            }}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-15%" }}
            className="font-display font-semibold text-3xl md:text-5xl leading-[1.05] mb-6"
          >
            <span className="block overflow-hidden">
              <motion.span
                variants={{
                  hidden: { y: "110%", opacity: 0 },
                  show: {
                    y: 0,
                    opacity: 1,
                    transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
                  },
                }}
                className="block"
              >
                <PointerHighlight>
                  <span>Let&apos;s build</span>
                </PointerHighlight>
              </motion.span>
            </span>
            <span className="block overflow-hidden">
              <motion.span
                variants={{
                  hidden: { y: "110%", opacity: 0 },
                  show: {
                    y: 0,
                    opacity: 1,
                    transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
                  },
                }}
                className="block"
              >
                <PointerHighlight>
                  <span>what&apos;s next.</span>
                </PointerHighlight>
              </motion.span>
            </span>
          </motion.h2>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-15%" }}
          >
          <p className="text-[#8a8a8f] text-sm leading-relaxed max-w-sm mb-10">
            Tell us about your workflows, your data, or the automation you wish existed.
            We&apos;ll get back within one business day.
          </p>

          <div className="space-y-5">
            <div className="flex items-center gap-3 text-sm">
              <Mail size={16} className="text-[#9db4ff]" />
              hello@amrix.ai
            </div>
            <div className="flex items-center gap-3 text-sm">
              <Phone size={16} className="text-[#9db4ff]" />
              +91 000 000 0000
            </div>
            <div className="flex items-center gap-3 text-sm">
              <MapPin size={16} className="text-[#9db4ff]" />
              Kozhikode, Kerala, India
            </div>
          </div>
        </motion.div>
      </div>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-15%" }}
          className="lg:col-span-3"
        >
          {submitted ? (
            <div className="glass rounded-2xl p-10 text-center">
              <p className="font-display text-xl mb-2">Message sent.</p>
              <p className="text-[#8a8a8f] text-sm">We&apos;ll be in touch shortly.</p>
            </div>
          ) : (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setSubmitted(true);
              }}
              className="glass rounded-2xl p-6 md:p-10 grid sm:grid-cols-2 gap-5"
            >
              <div className="flex flex-col gap-2">
                <label className="eyebrow" htmlFor="name">Name</label>
                <input
                  id="name"
                  required
                  type="text"
                  placeholder="Your name"
                  className="bg-transparent border-b border-white/15 focus:border-[#9db4ff] outline-none py-2 text-sm transition-colors placeholder:text-[#5a5a5f]"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="eyebrow" htmlFor="email">Email</label>
                <input
                  id="email"
                  required
                  type="email"
                  placeholder="you@company.com"
                  className="bg-transparent border-b border-white/15 focus:border-[#9db4ff] outline-none py-2 text-sm transition-colors placeholder:text-[#5a5a5f]"
                />
              </div>
              <div className="sm:col-span-2 flex flex-col gap-2">
                <label className="eyebrow" htmlFor="company">Company</label>
                <input
                  id="company"
                  type="text"
                  placeholder="Company name"
                  className="bg-transparent border-b border-white/15 focus:border-[#9db4ff] outline-none py-2 text-sm transition-colors placeholder:text-[#5a5a5f]"
                />
              </div>
              <div className="sm:col-span-2 flex flex-col gap-2">
                <label className="eyebrow" htmlFor="message">Message</label>
                <textarea
                  id="message"
                  required
                  rows={4}
                  placeholder="Tell us about your project"
                  className="bg-transparent border-b border-white/15 focus:border-[#9db4ff] outline-none py-2 text-sm transition-colors resize-none placeholder:text-[#5a5a5f]"
                />
              </div>
              <button
                type="submit"
                className="sm:col-span-2 mt-2 inline-flex items-center justify-center gap-2 rounded-full bg-[#f4f4f2] text-black text-sm font-medium px-6 py-3.5 hover:gap-3 transition-all w-full sm:w-auto sm:justify-start sm:self-start"
              >
                Send Message <ArrowUpRight size={16} />
              </button>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  );
}
