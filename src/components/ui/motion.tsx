"use client";

import { AnimatePresence, motion, type Variants } from "framer-motion";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

const easeOut = [0.22, 1, 0.36, 1] as const;

export function PageTransition({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={pathname}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -8 }}
        transition={{ duration: 0.4, ease: easeOut }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.07, delayChildren: 0.05 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: easeOut } },
};

export function MotionGrid({ children, className, as = "div" }: { children: ReactNode; className?: string; as?: "div" | "section" | "ul" }) {
  const C = motion[as];
  return (
    <C
      className={className}
      variants={containerVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.1 }}
    >
      {children}
    </C>
  );
}

export function MotionItem({ children, className, as = "div" }: { children: ReactNode; className?: string; as?: "div" | "article" | "li" | "section" }) {
  const C = motion[as];
  return <C className={className} variants={itemVariants}>{children}</C>;
}

export function MotionReveal({
  children, className, delay = 0, y = 24, as = "div",
}: { children: ReactNode; className?: string; delay?: number; y?: number; as?: "div" | "section" | "article" | "aside" | "header" }) {
  const C = motion[as];
  return (
    <C
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.55, ease: easeOut, delay }}
    >
      {children}
    </C>
  );
}
