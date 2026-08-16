"use client";

import { RefObject, useCallback, useState } from "react";
import { useMotionValue, useSpring } from "framer-motion";

const SPRING = { stiffness: 150, damping: 18, mass: 0.4 };
const MAX_TILT = 6;

export function useMagneticTilt(ref: RefObject<HTMLElement | null>) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const rawRotateX = useMotionValue(0);
  const rawRotateY = useMotionValue(0);
  const rotateX = useSpring(rawRotateX, SPRING);
  const rotateY = useSpring(rawRotateY, SPRING);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      setMousePosition({ x, y });

      const px = x / rect.width - 0.5;
      const py = y / rect.height - 0.5;

      rawRotateY.set(px * MAX_TILT * 2);
      rawRotateX.set(-py * MAX_TILT * 2);
    },
    [ref, rawRotateX, rawRotateY]
  );

  const handleMouseLeave = useCallback(() => {
    rawRotateX.set(0);
    rawRotateY.set(0);
  }, [rawRotateX, rawRotateY]);

  return { rotateX, rotateY, handleMouseMove, handleMouseLeave, mousePosition };
}
