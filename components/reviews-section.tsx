"use client"

import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"
import { Star } from "lucide-react"

const reviews = [
  {
    id: 1,
    author: "Amina Hassan",
    location: "GRA, Kaduna",
    rating: 5,
    text: "SofiMasa's weekend breakfast is absolutely delicious! Best masa I've had in Kaduna. Will definitely order again.",
    date: "2 weeks ago",
  },
  {
    id: 2,
    author: "Chioma Okonkwo",
    location: "Sabon Tasha",
    rating: 5,
    text: "Fresh, hot, and delivered on time. Sofia really cares about quality. Highly recommended!",
    date: "1 week ago",
  },
  {
    id: 3,
    author: "Ibrahim Musa",
    location: "Tudun Wada",
    rating: 5,
    text: "Perfect for our family breakfast. Kids loved it. Great service and fair prices.",
    date: "3 days ago",
  },
]

export default function ReviewsSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
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
          What Our{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-primary">Customers</span> Say
        </h2>
        <p className="text-foreground/70 text-lg">Join hundreds of happy weekend breakfast lovers</p>
      </motion.div>

      <motion.div
        className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        {reviews.map((review) => (
          <motion.div key={review.id} variants={cardVariants}>
            <Card className="border-2 border-border h-full overflow-hidden hover:border-primary/50 transition-all duration-300 group">
              <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-primary/5 group-hover:from-accent/10 group-hover:to-primary/10 transition-all duration-300" />

              <div className="relative p-6 md:p-8 flex flex-col h-full">
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: review.rating }).map((_, i) => (
                    <motion.div
                      key={i}
                      whileHover={{ scale: 1.1 }}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: i * 0.1 }}
                    >
                      <Star className="w-5 h-5 fill-accent text-accent" />
                    </motion.div>
                  ))}
                </div>

                <p className="text-foreground/80 text-base mb-4 flex-grow leading-relaxed italic">"{review.text}"</p>

                <div className="border-t border-border pt-4">
                  <h3 className="font-semibold text-foreground">{review.author}</h3>
                  <p className="text-sm text-foreground/60">{review.location}</p>
                  <p className="text-xs text-foreground/50 mt-1">{review.date}</p>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </motion.div>
    </section>
  )
}
