"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { AlertCircle, CheckCircle2 } from "lucide-react"
import PaymentModal from "./payment-modal"

interface BookingFormProps {
  isBookingClosed: boolean
  onSuccess: (message: string) => void
  onError: (message: string) => void
}

export default function BookingForm({ isBookingClosed, onSuccess, onError }: BookingFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    location: "",
    package: "",
    message: "",
  })
  const [isLoading, setIsLoading] = useState(false)
  const [showPayment, setShowPayment] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!formData.name || !formData.phone || !formData.location || !formData.package) {
      onError("Please fill in all required fields")
      return
    }

    setShowPayment(true)
  }

  const handleConfirmBooking = async () => {
    setIsLoading(true)

    try {
      const message = `Hi Sofia! I'd like to book a ${formData.package} for delivery in ${formData.location}.

Name: ${formData.name}
Phone: ${formData.phone}
Location: ${formData.location}

${formData.message ? `Additional notes: ${formData.message}` : ""}`

      const encodedMessage = encodeURIComponent(message)
      const whatsappUrl = `https://wa.me/2347013223861?text=${encodedMessage}`

      // Open WhatsApp
      window.open(whatsappUrl, "_blank")

      onSuccess("Redirecting to WhatsApp! Please confirm your booking.")
      setFormData({ name: "", phone: "", location: "", package: "", message: "" })
      setShowPayment(false)
    } catch (error) {
      onError("Failed to process booking. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      <section className="px-4 py-16 md:py-24 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4 text-balance">
            Book Your{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-primary">Masa</span>
          </h2>
          <p className="text-foreground/70 text-lg">Fill in your details and we'll send you via WhatsApp</p>
        </motion.div>

        {isBookingClosed && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 bg-destructive/10 border border-destructive/50 rounded-lg p-4 flex gap-3"
          >
            <AlertCircle className="text-destructive flex-shrink-0" />
            <div>
              <h3 className="font-semibold text-destructive mb-1">Bookings Closed</h3>
              <p className="text-sm text-destructive/80">
                Bookings are currently closed. They reopen on Monday for the next weekend.
              </p>
            </div>
          </motion.div>
        )}

        <Card className="border-2 border-border overflow-hidden">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="p-6 md:p-10 bg-gradient-to-br from-secondary/5 to-accent/5"
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-foreground mb-3">
                    Your Name <span className="text-destructive">*</span>
                  </label>
                  <motion.input
                    whileFocus={{ scale: 1.02 }}
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter your full name"
                    className="w-full px-4 py-3 rounded-lg border-2 border-border focus:border-primary focus:outline-none bg-card text-foreground transition-colors"
                    disabled={isBookingClosed}
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-foreground mb-3">
                    Phone Number <span className="text-destructive">*</span>
                  </label>
                  <motion.input
                    whileFocus={{ scale: 1.02 }}
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+234 XXX XXX XXXX"
                    className="w-full px-4 py-3 rounded-lg border-2 border-border focus:border-primary focus:outline-none bg-card text-foreground transition-colors"
                    disabled={isBookingClosed}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-foreground mb-3">
                    Location in Kaduna <span className="text-destructive">*</span>
                  </label>
                  <motion.input
                    whileFocus={{ scale: 1.02 }}
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    placeholder="e.g., GRA, Sabon Tasha"
                    className="w-full px-4 py-3 rounded-lg border-2 border-border focus:border-primary focus:outline-none bg-card text-foreground transition-colors"
                    disabled={isBookingClosed}
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-foreground mb-3">
                    Package <span className="text-destructive">*</span>
                  </label>
                  <motion.select
                    whileFocus={{ scale: 1.02 }}
                    name="package"
                    value={formData.package}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border-2 border-border focus:border-primary focus:outline-none bg-card text-foreground transition-colors cursor-pointer"
                    disabled={isBookingClosed}
                  >
                    <option value="">Select a package</option>
                    <option value="Family Masa Pack (₦5,000)">Family Masa Pack (₦5,000)</option>
                    <option value="Classic Masa Pack (₦2,500)">Classic Masa Pack (₦2,500)</option>
                    <option value="Kids Masa Pack (₦1,500)">Kids Masa Pack (₦1,500)</option>
                  </motion.select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-foreground mb-3">Additional Notes (Optional)</label>
                <motion.textarea
                  whileFocus={{ scale: 1.02 }}
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Any special requests or preferences..."
                  rows={4}
                  className="w-full px-4 py-3 rounded-lg border-2 border-border focus:border-primary focus:outline-none bg-card text-foreground transition-colors resize-none"
                  disabled={isBookingClosed}
                />
              </div>

              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Button
                  type="submit"
                  disabled={isLoading || isBookingClosed}
                  className="w-full bg-gradient-to-r from-accent via-primary to-secondary text-white font-bold py-4 rounded-lg hover:shadow-lg transition-all duration-300 disabled:opacity-50"
                >
                  {isLoading ? (
                    <span className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Booking...
                    </span>
                  ) : isBookingClosed ? (
                    <span className="flex items-center gap-2">
                      <AlertCircle className="w-4 h-4" />
                      Bookings Closed
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4" />
                      Book via WhatsApp
                    </span>
                  )}
                </Button>
              </motion.div>
            </form>
          </motion.div>
        </Card>
      </section>

      {/* Payment Modal */}
      <PaymentModal
        isOpen={showPayment}
        onClose={() => setShowPayment(false)}
        onConfirm={handleConfirmBooking}
        packageName={formData.package}
        customerName={formData.name}
        isLoading={isLoading}
      />
    </>
  )
}
