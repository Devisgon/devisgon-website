"use client";

import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useRef } from "react";

const ScrollFlipSection = ({ children, direction = "up" }) => {
  const ref = useRef(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // Smoothed rotation using spring
  const rotationRange = direction === "up" || direction === "left" ? [45, 0, 0, -45] : [-45, 0, 0, 45];
  const rawRotation = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], rotationRange);
  const rotateX = (direction === "up" || direction === "down") ? useSpring(rawRotation, { stiffness: 80, damping: 20 }) : 0;
  const rotateY = (direction === "left" || direction === "right") ? useSpring(rawRotation, { stiffness: 80, damping: 20 }) : 0;

  // Smooth opacity & scale
  const opacity = useSpring(useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]), { stiffness: 50, damping: 20 });
  const scale = useSpring(useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.9, 1, 1, 0.9]), { stiffness: 80, damping: 25 });

  return (
    <div ref={ref} className="scroll-section">
      <motion.div
        style={{
          rotateX,
          rotateY,
          opacity,
          scale,
          transformStyle: "preserve-3d",
          transformOrigin:
            direction === "up"
              ? "top"
              : direction === "down"
              ? "bottom"
              : "center",
        }}
        className="h-full w-full"
      >
        {children}
      </motion.div>
    </div>
  );
};

export default ScrollFlipSection;