"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Loader() {
  const [visible, setVisible] = useState(true);
  const [phase, setPhase] = useState<"in" | "hold" | "out">("in");

  useEffect(() => {
    // Phase: in → hold → out
    const holdTimer = setTimeout(() => setPhase("hold"), 900);
    const outTimer = setTimeout(() => setPhase("out"), 1800);
    const hideTimer = setTimeout(() => setVisible(false), 2700);
    return () => {
      clearTimeout(holdTimer);
      clearTimeout(outTimer);
      clearTimeout(hideTimer);
    };
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 9999,
            background: "#050505",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: "2rem",
          }}
        >
          {/* Animated ring */}
          <div style={{ position: "relative", width: 90, height: 90 }}>
            {/* Outer spinning ring */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              style={{
                position: "absolute",
                inset: 0,
                borderRadius: "50%",
                border: "1.5px solid transparent",
                borderTopColor: "rgba(157, 180, 255, 0.8)",
                borderRightColor: "rgba(157, 180, 255, 0.2)",
              }}
            />
            {/* Inner pulse ring */}
            <motion.div
              animate={{ scale: [1, 1.08, 1], opacity: [0.3, 0.6, 0.3] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              style={{
                position: "absolute",
                inset: 8,
                borderRadius: "50%",
                border: "1px solid rgba(157, 180, 255, 0.25)",
              }}
            />
            {/* Center logo text */}
            <motion.div
              initial={{ opacity: 0, scale: 0.7 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
              style={{
                position: "absolute",
                inset: 0,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <span
                style={{
                  fontFamily: "var(--font-display, sans-serif)",
                  fontSize: "0.7rem",
                  fontWeight: 600,
                  letterSpacing: "0.3em",
                  color: "#f4f4f2",
                }}
              >
                AMX
              </span>
            </motion.div>
          </div>

          {/* Logo wordmark */}
          <div style={{ overflow: "hidden" }}>
            <motion.p
              initial={{ y: "110%", opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
              style={{
                fontFamily: "var(--font-display, sans-serif)",
                fontSize: "1.5rem",
                fontWeight: 600,
                letterSpacing: "0.35em",
                color: "#f4f4f2",
                margin: 0,
              }}
            >
              A M R I X
            </motion.p>
          </div>

          {/* Tagline */}
          <div style={{ overflow: "hidden" }}>
            <motion.p
              initial={{ y: "110%", opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.45 }}
              style={{
                fontFamily: "var(--font-display, sans-serif)",
                fontSize: "0.65rem",
                fontWeight: 400,
                letterSpacing: "0.25em",
                color: "rgba(157, 180, 255, 0.75)",
                textTransform: "uppercase",
                margin: 0,
              }}
            >
              Intelligent Automation
            </motion.p>
          </div>

          {/* Bottom progress bar */}
          <motion.div
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              height: "1.5px",
              background: "linear-gradient(90deg, transparent, #9db4ff, transparent)",
            }}
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
