"use client";

import { motion } from "framer-motion";

export function PageLoader() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-background z-50">
      <div className="relative">
        <motion.div
          className="w-20 h-20 border-4 border-primary rounded-full"
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 2,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute inset-0 border-t-4 border-primary-light rounded-full"
          animate={{ rotate: 360 }}
          transition={{
            duration: 1.5,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div
            className="w-12 h-12 bg-primary rounded-full"
            animate={{
              scale: [0.8, 1, 0.8],
              opacity: [0.7, 1, 0.7],
            }}
            transition={{
              duration: 2,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
          />
        </div>
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div
            className="text-xl font-bold text-primary-foreground"
            animate={{
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 2,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
          >
            Р
          </motion.div>
        </div>
      </div>
    </div>
  );
}
