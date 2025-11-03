"use client"

import { motion, AnimatePresence } from "framer-motion"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { X, Copy, Check } from "lucide-react"
import { useState } from "react"

interface PaymentModalProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
  packageName: string
  customerName: string
  isLoading: boolean
}

export default function PaymentModal({
  isOpen,
  onClose,
  onConfirm,
  packageName,
  customerName,
  isLoading,
}: PaymentModalProps) {
  const [copiedField, setCopiedField] = useState<string | null>(null)

  const opayDetails = {
    accountName: "SOPHIE SOFIYA USMAN",
    accountNumber: "8035589483",
  }

  const handleCopy = (text: string, field: string) => {
    navigator.clipboard.writeText(text)
    setCopiedField(field)
    setTimeout(() => setCopiedField(null), 2000)
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-md"
          >
            <Card className="border-2 border-primary overflow-hidden">
              <div className="bg-gradient-to-r from-accent via-primary to-secondary p-6 flex items-center justify-between">
                <h2 className="text-xl font-bold text-white">Complete Your Payment</h2>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={onClose}
                  className="text-white hover:bg-white/20 p-2 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5" />
                </motion.button>
              </div>

              <div className="p-6 space-y-6 bg-gradient-to-br from-secondary/5 to-accent/5">
                {/* Order Summary */}
                <div className="space-y-3">
                  <h3 className="font-semibold text-foreground">Order Summary</h3>
                  <div className="bg-card border border-border rounded-lg p-4 space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-foreground/70">Customer:</span>
                      <span className="font-medium text-foreground">{customerName}</span>
                    </div>
                    <div className="flex justify-between text-sm border-t border-border pt-2">
                      <span className="text-foreground/70">Package:</span>
                      <span className="font-medium text-foreground">{packageName}</span>
                    </div>
                  </div>
                </div>

                {/* OPay Details */}
                <div className="space-y-3">
                  <h3 className="font-semibold text-foreground">OPay Transfer Details</h3>

                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    className="bg-gradient-to-br from-orange-50 to-yellow-50 border-2 border-primary rounded-lg p-4 space-y-4"
                  >
                    {/* Account Name */}
                    <div>
                      <p className="text-xs font-semibold text-foreground/60 mb-2">Account Name</p>
                      <div className="flex items-center gap-2 bg-white rounded-lg p-3 border border-border">
                        <span className="flex-1 font-semibold text-foreground text-sm">{opayDetails.accountName}</span>
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => handleCopy(opayDetails.accountName, "accountName")}
                          className="text-primary hover:bg-primary/10 p-2 rounded transition-colors"
                        >
                          {copiedField === "accountName" ? (
                            <Check className="w-4 h-4 text-green-500" />
                          ) : (
                            <Copy className="w-4 h-4" />
                          )}
                        </motion.button>
                      </div>
                    </div>

                    {/* Account Number */}
                    <div>
                      <p className="text-xs font-semibold text-foreground/60 mb-2">Account Number</p>
                      <div className="flex items-center gap-2 bg-white rounded-lg p-3 border border-border">
                        <span className="flex-1 font-semibold text-foreground text-lg tracking-wider">
                          {opayDetails.accountNumber}
                        </span>
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => handleCopy(opayDetails.accountNumber, "accountNumber")}
                          className="text-primary hover:bg-primary/10 p-2 rounded transition-colors"
                        >
                          {copiedField === "accountNumber" ? (
                            <Check className="w-4 h-4 text-green-500" />
                          ) : (
                            <Copy className="w-4 h-4" />
                          )}
                        </motion.button>
                      </div>
                    </div>
                  </motion.div>

                  <p className="text-xs text-foreground/60 bg-yellow-50 border border-yellow-200 rounded p-3">
                    Copy the account details and make payment via OPay. Once done, confirm your booking via WhatsApp.
                  </p>
                </div>

                {/* Action Buttons */}
                <div className="grid grid-cols-2 gap-3 pt-4">
                  <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    <Button
                      onClick={onClose}
                      variant="outline"
                      className="w-full border-2 border-border hover:bg-secondary/10 bg-transparent"
                    >
                      Cancel
                    </Button>
                  </motion.div>

                  <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    <Button
                      onClick={onConfirm}
                      disabled={isLoading}
                      className="w-full bg-gradient-to-r from-accent via-primary to-secondary text-white font-bold hover:shadow-lg transition-all"
                    >
                      {isLoading ? (
                        <span className="flex items-center gap-2">
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          Confirming...
                        </span>
                      ) : (
                        "Confirm & WhatsApp"
                      )}
                    </Button>
                  </motion.div>
                </div>
              </div>
            </Card>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
