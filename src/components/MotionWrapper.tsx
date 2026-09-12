"use client";

import React from "react";
import { motion, HTMLMotionProps, Variants } from "framer-motion";

interface MotionProps extends HTMLMotionProps<"div"> {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  direction?: "up" | "down" | "left" | "right" | "none";
  distance?: number;
  scale?: number;
  className?: string;
  once?: boolean;
}

// Fade / Slide in on scroll
export function MotionFadeIn({
  children,
  delay = 0,
  duration = 0.6,
  direction = "up",
  distance = 30,
  scale = 1,
  className = "",
  once = true,
  ...props
}: MotionProps) {
  const getInitial = () => {
    switch (direction) {
      case "up":
        return { opacity: 0, y: distance, scale };
      case "down":
        return { opacity: 0, y: -distance, scale };
      case "left":
        return { opacity: 0, x: distance, scale };
      case "right":
        return { opacity: 0, x: -distance, scale };
      case "none":
      default:
        return { opacity: 0, scale };
    }
  };

  return (
    <motion.div
      initial={getInitial()}
      whileInView={{ opacity: 1, x: 0, y: 0, scale: 1 }}
      viewport={{ once, amount: 0.2 }}
      transition={{
        duration,
        delay,
        ease: [0.21, 0.47, 0.32, 0.98],
      }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
}

// Motion Text Reveal for Headings and Subtitles
export function MotionText({
  children,
  delay = 0,
  duration = 0.7,
  className = "",
  once = true,
  ...props
}: Omit<MotionProps, "direction" | "distance" | "scale">) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, amount: 0.3 }}
      transition={{
        duration,
        delay,
        ease: [0.16, 1, 0.3, 1],
      }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
}

// Stagger Container for lists and card grids
export function MotionStagger({
  children,
  staggerDelay = 0.15,
  className = "",
  once = true,
}: {
  children: React.ReactNode;
  staggerDelay?: number;
  className?: string;
  once?: boolean;
}) {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: staggerDelay,
      },
    },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ once, amount: 0.15 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// Stagger Child Item
export function MotionStaggerItem({
  children,
  className = "",
  duration = 0.6,
  style,
  ...props
}: {
  children: React.ReactNode;
  className?: string;
  duration?: number;
  style?: React.CSSProperties;
} & HTMLMotionProps<"div">) {
  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30, scale: 0.96 },
    show: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration,
        ease: [0.21, 0.47, 0.32, 0.98],
      },
    },
  };

  return (
    <motion.div variants={itemVariants} className={className} style={style} {...props}>
      {children}
    </motion.div>
  );
}

// Scale / Zoom reveal for floating illustrations & badges
export function MotionScale({
  children,
  delay = 0,
  duration = 0.7,
  className = "",
  once = true,
}: {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  className?: string;
  once?: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.85 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once, amount: 0.25 }}
      transition={{
        duration,
        delay,
        ease: [0.34, 1.56, 0.64, 1], // subtle spring pop
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
