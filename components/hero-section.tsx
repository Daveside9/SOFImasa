"use client"

import { motion } from "framer-motion"

export default function HeroSection() {
  return (
    <section className="relative px-4 py-16 overflow-hidden md:py-24">
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute top-10 right-10 w-32 h-32 bg-accent/20 rounded-full blur-3xl"
          animate={{ y: [0, 20, 0] }}
          transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY }}
        />
        <motion.div
          className="absolute bottom-20 left-10 w-40 h-40 bg-primary/15 rounded-full blur-3xl"
          animate={{ y: [0, -20, 0] }}
          transition={{ duration: 5, repeat: Number.POSITIVE_INFINITY, delay: 0.5 }}
        />
      </div>

      <div className="relative z-10 max-w-2xl mx-auto text-center">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-4 text-balance">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent via-primary to-secondary">
              SofiMasa
            </span>
          </h1>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-xl md:text-2xl text-foreground/80 mb-8 text-balance"
        >
          Your Weekend Masa Delight
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="inline-block"
        >
          <div className="bg-primary/10 border-2 border-primary/30 rounded-2xl px-6 py-4">
            <p className="text-sm md:text-base font-semibold text-primary">📅 Friday & Saturday Only</p>
            <p className="text-xs md:text-sm text-foreground/70 mt-1">Bookings close every Thursday at 2 PM</p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-12 relative"
        >
          <div className="relative w-full max-w-md mx-auto aspect-square bg-gradient-to-br from-secondary/40 to-accent/40 rounded-3xl overflow-hidden backdrop-blur-md border border-primary/20 shadow-2xl">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <img
                src="/delicious-masa-breakfast-with-eggs-and-bread.jpg"
                alt="Delicious SofiMasa breakfast"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
