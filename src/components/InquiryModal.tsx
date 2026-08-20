'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function InquiryModal() {
  const [open, setOpen] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setSubmitted(true)
    setTimeout(() => {
      setOpen(false)
      setSubmitted(false)
    }, 1600)
  }

  return (
    <>
      {/* Floating commission trigger removed */}

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-6"
            role="dialog"
            aria-modal="true"
            aria-label="Commission inquiry"
          >
            <div className="absolute inset-0 bg-clay/80 backdrop-blur-sm" onClick={() => setOpen(false)} aria-hidden="true" />

            <motion.div
              initial={{ scale: 0.98, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.98, y: 20 }}
              transition={{ type: 'spring', damping: 20, stiffness: 300 }}
              className="relative w-full max-w-2xl bg-cream rounded-3xl overflow-hidden shadow-2xl p-6"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-display text-xl text-clay font-medium">Commission Inquiry</h3>
                <button onClick={() => setOpen(false)} className="text-clay/60">Close</button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4" aria-live="polite">
                <div className="relative">
                  <input id="name" name="name" required className="input-field peer" placeholder=" " />
                  <label htmlFor="name" className="absolute left-4 -top-2 text-sm text-clay/60 bg-cream px-2 peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-placeholder-shown:text-clay/40 transition-all">
                    Full name
                  </label>
                </div>

                <div className="relative">
                  <input id="email" name="email" type="email" required className="input-field peer" placeholder=" " />
                  <label htmlFor="email" className="absolute left-4 -top-2 text-sm text-clay/60 bg-cream px-2 peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-placeholder-shown:text-clay/40 transition-all">
                    Email address
                  </label>
                </div>

                <div className="relative">
                  <select id="pieceType" name="pieceType" className="input-field peer" required>
                    <option value="">Select piece type</option>
                    <option value="vase">Vase</option>
                    <option value="sculpture">Sculpture</option>
                    <option value="tableware">Tableware</option>
                    <option value="limited">Limited Edition</option>
                  </select>
                  <label htmlFor="pieceType" className="absolute left-4 -top-2 text-sm text-clay/60 bg-cream px-2 peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-placeholder-shown:text-clay/40 transition-all">
                    Piece type
                  </label>
                </div>

                <div className="relative">
                  <textarea id="message" name="message" rows={4} className="input-field rounded-2xl peer" placeholder=" " required />
                  <label htmlFor="message" className="absolute left-4 -top-2 text-sm text-clay/60 bg-cream px-2 peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-placeholder-shown:text-clay/40 transition-all">
                    Describe your vision
                  </label>
                </div>

                <div className="flex items-center gap-3">
                  <button type="submit" className="btn-primary flex-1">
                    {submitted ? 'Sending...' : 'Send Inquiry'}
                  </button>
                  <button type="button" onClick={() => setOpen(false)} className="btn-secondary">
                    Cancel
                  </button>
                </div>

                {submitted && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-4 text-sm text-clay/60">
                    Thanks — your inquiry has been sent. We'll reply within 24 hours.
                  </motion.div>
                )}
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}