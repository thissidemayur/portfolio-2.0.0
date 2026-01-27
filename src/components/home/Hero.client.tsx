"use client";
import { motion } from "framer-motion";

export default function HeroEffects() {
  return (
    <motion.div
      aria-hidden
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="absolute inset-0 pointer-events-none"
    >
      <div className="absolute w-[1000px] h-[1000px] bg-blue-500/20 blur-[120px]" />
    </motion.div>
  );
}
