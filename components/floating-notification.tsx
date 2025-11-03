"use client"

import { motion, AnimatePresence } from "framer-motion"
import { CheckCircle2, AlertCircle, X } from "lucide-react"
import { useState } from "react"

interface FloatingNotificationProps {
  type: "success" | "error"
  message: string
}

export default function FloatingNotification({ type, message }: FloatingNotificationProps) {
  const [isVisible, setIsVisible] = useState(true)

  const isSuccess = type === "success"

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: -20, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -20, scale: 0.9 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="fixed bottom-6 right-6 z-50 max-w-sm"
        >
          <div
            className={`flex gap-4 px-6 py-4 rounded-xl shadow-2xl backdrop-blur-md border-2 ${
              isSuccess
                ? "bg-accent/20 border-accent/50 text-accent"
                : "bg-destructive/20 border-destructive/50 text-destructive"
            }`}
          >
            {isSuccess ? (
              <CheckCircle2 className="w-5 h-5 flex-shrink-0 mt-0.5" />
            ) : (
              <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
            )}
            <p className="flex-grow text-sm font-medium">{message}</p>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsVisible(false)}
              className="flex-shrink-0"
            >
              <X className="w-4 h-4" />
            </motion.button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
