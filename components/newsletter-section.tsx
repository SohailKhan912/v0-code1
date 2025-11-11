"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Mail, CheckCircle2 } from "lucide-react"
import { toast } from "sonner"

export function NewsletterSection() {
  const [email, setEmail] = useState("")
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      setIsSubmitted(true)
      toast.success("Successfully subscribed to newsletter!")
      setEmail("")
      setTimeout(() => setIsSubmitted(false), 3000)
    }
  }

  return (
    <section className="py-20 bg-gradient-to-br from-primary/10 via-accent/10 to-background">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-6">
          <Mail className="w-8 h-8 text-primary" />
        </div>

        <h2 className="text-4xl font-bold mb-4 text-balance">Stay Updated with Latest Designs</h2>
        <p className="text-lg text-muted-foreground mb-8 text-balance max-w-2xl mx-auto">
          Subscribe to our newsletter for exclusive offers, new product launches, and design inspiration delivered to
          your inbox.
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
          <Input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="flex-1 h-12 text-base"
            disabled={isSubmitted}
          />
          <Button type="submit" size="lg" className="h-12 px-8 bg-primary hover:bg-primary/90" disabled={isSubmitted}>
            {isSubmitted ? (
              <>
                <CheckCircle2 className="w-5 h-5 mr-2" />
                Subscribed
              </>
            ) : (
              "Subscribe"
            )}
          </Button>
        </form>

        <p className="text-xs text-muted-foreground mt-4">We respect your privacy. Unsubscribe at any time.</p>
      </div>
    </section>
  )
}
