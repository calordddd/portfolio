"use client"

import * as React from "react"
import { motion } from "framer-motion"

const HolographicAvatar = React.forwardRef<HTMLDivElement, React.ComponentPropsWithoutRef<"div">>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={`relative w-32 h-32 mx-auto mb-8 cursor-pointer group ${className || ""}`}
        {...props}
      >
        {/* Holographic Ring */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
          className="absolute inset-0 rounded-full border-2 border-cyan-400/30 group-hover:border-cyan-400/80 transition-colors duration-300"
        />

        {/* Inner Ring */}
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 15, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
          className="absolute inset-2 rounded-full border border-purple-400/40 group-hover:border-purple-400/80 transition-colors duration-300"
        />

        {/* Avatar Container */}
        <motion.div
          animate={{ y: [-5, 5, -5] }}
          transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
          className="absolute inset-4 rounded-full glass-morphism flex items-center justify-center overflow-hidden group-hover:scale-105 transition-transform duration-300"
        >
          <img
            src="/placeholder-user.jpg"
            alt="Lord Cedric Arive"
            className="w-full h-full object-cover rounded-full animate-fade-in"
          />
        </motion.div>

        {/* Glow Effect */}
        <div className="absolute inset-0 rounded-full bg-cyan-400/10 blur-xl animate-pulse group-hover:bg-cyan-400/20 transition-colors duration-300" />
      </div>
    )
  }
)
HolographicAvatar.displayName = "HolographicAvatar"

export default HolographicAvatar
