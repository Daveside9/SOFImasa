"use client"

import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

const packages = [
  {
    id: "family",
    name: "Family Masa Pack",
    price: 5000,
    description: "3 large portions with all sides",
    color: "from-pink-400 to-orange-300",
    buttonColor: "bg-pink-500 hover:bg-pink-600",
    icon: "👨‍👩‍👧‍👦",
  },
  {
    id: "classic",
    name: "Classic Masa Pack",
    price: 2500,
    description: "2 portions with all sides",
    color: "from-yellow-300 to-orange-400",
    buttonColor: "bg-yellow-500 hover:bg-yellow-600",
    icon: "🍽️",
  },
  {
    id: "kids",
    name: "Kids Masa Pack",
    price: 1500,
    description: "1 portion (kid-sized)",
    color: "from-orange-300 to-yellow-400",
    buttonColor: "bg-orange-500 hover:bg-orange-600",
    icon: "👶",
  },
]

export default function PackagesSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  }

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  }

  return (
    <section className="px-4 py-16 md:py-24 max-w-6xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="text-center mb-12"
      >
        <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4 text-balance">
          Choose Your{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-primary">Package</span>
        </h2>
        <p className="text-foreground/70 text-lg">Select the perfect masa breakfast for your weekend</p>
      </motion.div>

      <motion.div
        className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        {packages.map((pkg) => (
          <motion.div key={pkg.id} variants={cardVariants}>
            <Card className="relative overflow-hidden h-full border-2 border-border hover:border-primary/50 transition-all duration-300 group cursor-pointer">
              <div
                className={`absolute inset-0 bg-gradient-to-br ${pkg.color} opacity-5 group-hover:opacity-10 transition-opacity duration-300`}
              />

              <div className="relative p-6 md:p-8 flex flex-col h-full">
                <div className="text-4xl mb-4">{pkg.icon}</div>

                <h3 className="text-2xl font-bold text-foreground mb-2">{pkg.name}</h3>
                <p className="text-foreground/70 text-sm mb-6">{pkg.description}</p>

                <div className="mt-auto space-y-4">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-accent to-primary"
                  >
                    ₦{pkg.price.toLocaleString()}
                  </motion.div>

                  <Button
                    className={`w-full ${pkg.buttonColor} text-white font-semibold py-3 rounded-lg transition-all duration-300 transform hover:scale-105`}
                  >
                    Book Now
                  </Button>
                </div>
              </div>

              <motion.div
                className="absolute inset-0 border-2 border-transparent bg-gradient-to-r from-accent via-primary to-secondary bg-clip-border opacity-0 group-hover:opacity-50 transition-opacity duration-300"
                animate={{ backgroundPosition: ["0%", "100%"] }}
                transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
              />
            </Card>
          </motion.div>
        ))}
      </motion.div>
    </section>
  )
}
