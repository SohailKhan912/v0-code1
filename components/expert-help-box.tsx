"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { X, Phone, MessageCircle, Mail, Send, CheckCircle } from "lucide-react"

export function ExpertHelpBox() {
  const [isOpen, setIsOpen] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("[v0] Expert help form submitted:", formData)
    setIsSubmitted(true)
    setTimeout(() => {
      setIsOpen(false)
      setIsSubmitted(false)
      setFormData({ name: "", email: "", phone: "", message: "" })
    }, 2000)
  }

  return (
    <>
      {/* Floating help button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-24 right-6 z-50 group"
          aria-label="Talk to an expert"
        >
          <div className="relative">
            <div className="absolute inset-0 bg-primary rounded-full blur-xl opacity-50 group-hover:opacity-75 transition-opacity animate-pulse" />
            <div className="relative bg-gradient-to-br from-primary to-primary/80 text-primary-foreground rounded-full p-4 shadow-2xl hover:shadow-primary/50 transition-all hover:scale-110">
              <MessageCircle className="w-6 h-6" />
            </div>
          </div>
          <div className="absolute -top-12 right-0 bg-background border border-border rounded-lg px-3 py-2 shadow-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
            <p className="text-sm font-medium">Talk to an Expert</p>
          </div>
        </button>
      )}

      {/* Help box modal */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 z-50 w-full max-w-md animate-in slide-in-from-bottom-5">
          <Card className="shadow-2xl border-2">
            <div className="bg-gradient-to-r from-primary to-primary/80 text-primary-foreground p-4 rounded-t-lg">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary-foreground/20 flex items-center justify-center">
                    <MessageCircle className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">Talk to an Expert</h3>
                    <p className="text-xs opacity-90">We're here to help you</p>
                  </div>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="w-8 h-8 rounded-full hover:bg-primary-foreground/20 flex items-center justify-center transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="p-6">
              {!isSubmitted ? (
                <>
                  <div className="space-y-4 mb-6">
                    <p className="text-sm text-muted-foreground">
                      Have questions about our glass doors? Our experts are ready to assist you with customization,
                      pricing, and installation.
                    </p>

                    <div className="grid grid-cols-3 gap-2">
                      <a
                        href="tel:+911234567890"
                        className="flex flex-col items-center gap-2 p-3 rounded-lg border border-border hover:bg-muted transition-colors"
                      >
                        <Phone className="w-5 h-5 text-primary" />
                        <span className="text-xs font-medium">Call</span>
                      </a>
                      <a
                        href="mailto:support@glassvision.com"
                        className="flex flex-col items-center gap-2 p-3 rounded-lg border border-border hover:bg-muted transition-colors"
                      >
                        <Mail className="w-5 h-5 text-primary" />
                        <span className="text-xs font-medium">Email</span>
                      </a>
                      <button className="flex flex-col items-center gap-2 p-3 rounded-lg border border-border hover:bg-muted transition-colors">
                        <MessageCircle className="w-5 h-5 text-primary" />
                        <span className="text-xs font-medium">Chat</span>
                      </button>
                    </div>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <Input
                        placeholder="Your Name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        required
                      />
                    </div>
                    <div>
                      <Input
                        type="email"
                        placeholder="Email Address"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        required
                      />
                    </div>
                    <div>
                      <Input
                        type="tel"
                        placeholder="Phone Number"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        required
                      />
                    </div>
                    <div>
                      <Textarea
                        placeholder="How can we help you?"
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        rows={3}
                        required
                      />
                    </div>
                    <Button type="submit" className="w-full" size="lg">
                      <Send className="w-4 h-4 mr-2" />
                      Send Message
                    </Button>
                  </form>

                  <p className="text-xs text-muted-foreground text-center mt-4">
                    Average response time: <span className="font-semibold text-primary">2 minutes</span>
                  </p>
                </>
              ) : (
                <div className="py-8 text-center">
                  <div className="w-16 h-16 rounded-full bg-green-100 dark:bg-green-900/20 flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="w-8 h-8 text-green-600 dark:text-green-400" />
                  </div>
                  <h4 className="text-lg font-semibold mb-2">Message Sent!</h4>
                  <p className="text-sm text-muted-foreground">
                    Our expert will contact you shortly. Thank you for reaching out!
                  </p>
                </div>
              )}
            </div>
          </Card>
        </div>
      )}
    </>
  )
}
