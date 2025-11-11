"use client"

import type React from "react"

import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { useState } from "react"
import Link from "next/link"
import { Calendar, MapPin, User } from "lucide-react"

export default function BookingPage() {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    pincode: "",
    preferredDate: "",
    preferredTime: "10:00",
    installationType: "professional",
    specialRequirements: "",
  })

  const [bookingConfirmed, setBookingConfirmed] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (step === 1) {
      setStep(2)
    } else if (step === 2) {
      setStep(3)
    } else {
      // Save booking
      const booking = {
        ...formData,
        bookingId: `GB${Date.now()}`,
        bookingDate: new Date().toISOString(),
        status: "pending",
      }
      console.log("Booking submitted:", booking)
      localStorage.setItem("latest_booking", JSON.stringify(booking))
      setBookingConfirmed(true)
      window.scrollTo(0, 0)
    }
  }

  if (bookingConfirmed) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <main className="pt-20 pb-12">
          <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center py-16 space-y-6">
              <div className="text-6xl animate-pulse">✓</div>
              <h1 className="text-4xl font-bold">Booking Confirmed!</h1>
              <p className="text-lg text-muted-foreground max-w-md mx-auto">
                Your glass door installation has been scheduled. You'll receive a confirmation email shortly with all
                details.
              </p>

              <Card className="bg-primary/5 border-primary/20 mt-8">
                <CardContent className="pt-6 space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Booking ID</span>
                    <span className="font-semibold">GB{Date.now()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Name</span>
                    <span className="font-semibold">
                      {formData.firstName} {formData.lastName}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Date</span>
                    <span className="font-semibold">{formData.preferredDate}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Time</span>
                    <span className="font-semibold">{formData.preferredTime}</span>
                  </div>
                </CardContent>
              </Card>

              <div className="space-y-3 pt-6">
                <p className="text-sm text-muted-foreground">What happens next?</p>
                <div className="space-y-2 text-sm">
                  <p>✓ We'll contact you to confirm the installation date</p>
                  <p>✓ Our team will visit for on-site measurement</p>
                  <p>✓ Professional installation within 48 hours</p>
                  <p>✓ Follow-up support and warranty registration</p>
                </div>
              </div>

              <div className="flex gap-4 justify-center pt-8">
                <Link href="/catalog">
                  <Button variant="outline" size="lg">
                    Continue Shopping
                  </Button>
                </Link>
                <Link href="/">
                  <Button size="lg" className="bg-primary hover:bg-primary/90">
                    Back to Home
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="pt-20 pb-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-12">
            <h1 className="text-4xl font-bold mb-2">Schedule Your Installation</h1>
            <p className="text-muted-foreground text-lg">Complete your booking in just {3} steps</p>
          </div>

          {/* Progress Indicator */}
          <div className="flex gap-4 mb-12">
            {[1, 2, 3].map((s) => (
              <div key={s} className="flex-1">
                <div className={`h-2 rounded-full transition ${s <= step ? "bg-primary" : "bg-muted"}`} />
                <p className="text-xs font-medium mt-2 text-muted-foreground">
                  {s === 1 ? "Personal Info" : s === 2 ? "Location" : "Schedule"}
                </p>
              </div>
            ))}
          </div>

          {/* Form */}
          <Card>
            <CardContent className="p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Step 1: Personal Information */}
                {step === 1 && (
                  <div className="space-y-6">
                    <h2 className="text-2xl font-bold flex items-center gap-3">
                      <User className="w-6 h-6" />
                      Personal Information
                    </h2>

                    <div className="grid md:grid-cols-2 gap-4">
                      <input
                        type="text"
                        name="firstName"
                        placeholder="First Name"
                        value={formData.firstName}
                        onChange={handleChange}
                        className="px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                        required
                      />
                      <input
                        type="text"
                        name="lastName"
                        placeholder="Last Name"
                        value={formData.lastName}
                        onChange={handleChange}
                        className="px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                        required
                      />
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={handleChange}
                        className="px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                        required
                      />
                      <input
                        type="tel"
                        name="phone"
                        placeholder="Phone Number"
                        value={formData.phone}
                        onChange={handleChange}
                        className="px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                        required
                      />
                    </div>
                  </div>
                )}

                {/* Step 2: Location */}
                {step === 2 && (
                  <div className="space-y-6">
                    <h2 className="text-2xl font-bold flex items-center gap-3">
                      <MapPin className="w-6 h-6" />
                      Installation Location
                    </h2>

                    <textarea
                      name="address"
                      placeholder="Full Address"
                      value={formData.address}
                      onChange={handleChange}
                      rows={3}
                      className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                      required
                    />

                    <div className="grid md:grid-cols-2 gap-4">
                      <input
                        type="text"
                        name="city"
                        placeholder="City"
                        value={formData.city}
                        onChange={handleChange}
                        className="px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                        required
                      />
                      <input
                        type="text"
                        name="pincode"
                        placeholder="Pincode"
                        value={formData.pincode}
                        onChange={handleChange}
                        className="px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                        required
                      />
                    </div>
                  </div>
                )}

                {/* Step 3: Schedule */}
                {step === 3 && (
                  <div className="space-y-6">
                    <h2 className="text-2xl font-bold flex items-center gap-3">
                      <Calendar className="w-6 h-6" />
                      Schedule Installation
                    </h2>

                    <div className="grid md:grid-cols-2 gap-4">
                      <input
                        type="date"
                        name="preferredDate"
                        value={formData.preferredDate}
                        onChange={handleChange}
                        className="px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                        required
                      />
                      <select
                        name="preferredTime"
                        value={formData.preferredTime}
                        onChange={handleChange}
                        className="px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                      >
                        <option value="09:00">9:00 AM - 12:00 PM</option>
                        <option value="10:00">10:00 AM - 1:00 PM</option>
                        <option value="12:00">12:00 PM - 3:00 PM</option>
                        <option value="14:00">2:00 PM - 5:00 PM</option>
                        <option value="16:00">4:00 PM - 7:00 PM</option>
                      </select>
                    </div>

                    <textarea
                      name="specialRequirements"
                      placeholder="Any special requirements or notes?"
                      value={formData.specialRequirements}
                      onChange={handleChange}
                      rows={3}
                      className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
                )}

                {/* Buttons */}
                <div className="flex gap-4 pt-8">
                  {step > 1 && (
                    <Button
                      type="button"
                      variant="outline"
                      size="lg"
                      onClick={() => setStep(step - 1)}
                      className="flex-1"
                    >
                      Previous
                    </Button>
                  )}
                  <Button type="submit" size="lg" className="flex-1 bg-primary hover:bg-primary/90">
                    {step === 3 ? "Confirm Booking" : "Next"}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  )
}
