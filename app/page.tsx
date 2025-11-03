"use client"

import { useState, useMemo } from "react"
import { motion } from "framer-motion"
import HeroSection from "@/components/hero-section"
import PackagesSection from "@/components/packages-section"
import BookingForm from "@/components/booking-form"
import ReviewsSection from "@/components/reviews-section"
import FloatingNotification from "@/components/floating-notification"

export default function Home() {
  const [notification, setNotification] = useState<{
    type: "success" | "error"
    message: string
  } | null>(null)

  const isBookingClosed = useMemo(() => {
    const now = new Date()
    const dayOfWeek = now.getDay()
    const hour = now.getHours()

    // Booking closed on Thursday (4) after 2 PM, and all day Friday-Sunday (5, 6, 0)
    return (dayOfWeek === 4 && hour >= 14) || dayOfWeek === 5 || dayOfWeek === 6 || dayOfWeek === 0
  }, [])

  const handleBookingSuccess = (message: string) => {
    setNotification({
      type: "success",
      message,
    })
    setTimeout(() => setNotification(null), 5000)
  }

  const handleBookingError = (message: string) => {
    setNotification({
      type: "error",
      message,
    })
    setTimeout(() => setNotification(null), 5000)
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-background via-secondary/10 to-background">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
        <HeroSection />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <PackagesSection />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <BookingForm isBookingClosed={isBookingClosed} onSuccess={handleBookingSuccess} onError={handleBookingError} />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <ReviewsSection />
      </motion.div>

      {notification && <FloatingNotification type={notification.type} message={notification.message} />}
    </main>
  )
}
