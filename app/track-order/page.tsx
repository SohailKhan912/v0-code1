"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Package, Search, CheckCircle, Truck, MapPin, Clock } from "lucide-react"

export default function TrackOrderPage() {
  const [orderId, setOrderId] = useState("")
  const [tracking, setTracking] = useState<any>(null)

  const handleTrack = (e: React.FormEvent) => {
    e.preventDefault()
    // Simulate tracking data
    setTracking({
      orderId: orderId,
      status: "In Transit",
      estimatedDelivery: "Jan 15, 2025",
      currentLocation: "Mumbai Distribution Center",
      timeline: [
        { status: "Order Placed", date: "Jan 8, 2025", time: "10:30 AM", completed: true },
        { status: "Order Confirmed", date: "Jan 8, 2025", time: "11:00 AM", completed: true },
        { status: "In Production", date: "Jan 9, 2025", time: "9:00 AM", completed: true },
        { status: "Quality Check", date: "Jan 11, 2025", time: "2:00 PM", completed: true },
        { status: "Dispatched", date: "Jan 12, 2025", time: "8:00 AM", completed: true },
        { status: "In Transit", date: "Jan 13, 2025", time: "6:00 PM", completed: true },
        { status: "Out for Delivery", date: "Jan 15, 2025", time: "Pending", completed: false },
        { status: "Delivered", date: "Jan 15, 2025", time: "Pending", completed: false },
      ],
    })
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <Link href="/" className="text-sm text-muted-foreground hover:text-primary">
            ← Back to Home
          </Link>
        </div>

        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold mb-4">Track Your Order</h1>
          <p className="text-muted-foreground">Enter your order ID to track your shipment in real-time</p>
        </div>

        <Card className="p-6 mb-8">
          <form onSubmit={handleTrack} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="orderId">Order ID</Label>
              <div className="flex gap-2">
                <Input
                  id="orderId"
                  placeholder="e.g., ORD-1234567890"
                  value={orderId}
                  onChange={(e) => setOrderId(e.target.value)}
                  className="flex-1"
                />
                <Button type="submit">
                  <Search className="h-4 w-4 mr-2" />
                  Track
                </Button>
              </div>
            </div>
            <p className="text-sm text-muted-foreground">
              You can find your order ID in the confirmation email or on your order confirmation page.
            </p>
          </form>
        </Card>

        {tracking && (
          <div className="space-y-6">
            <Card className="p-6">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-bold mb-2">Order {tracking.orderId}</h2>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <MapPin className="h-4 w-4" />
                    <span>Current Location: {tracking.currentLocation}</span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-sm font-medium">
                    <Truck className="h-4 w-4" />
                    {tracking.status}
                  </div>
                  <p className="text-sm text-muted-foreground mt-2">Est. Delivery: {tracking.estimatedDelivery}</p>
                </div>
              </div>

              <div className="relative">
                {tracking.timeline.map((item: any, index: number) => (
                  <div key={index} className="flex gap-4 pb-8 last:pb-0">
                    <div className="relative flex flex-col items-center">
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center ${
                          item.completed
                            ? "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300"
                            : "bg-muted text-muted-foreground"
                        }`}
                      >
                        {item.completed ? <CheckCircle className="h-5 w-5" /> : <Clock className="h-5 w-5" />}
                      </div>
                      {index < tracking.timeline.length - 1 && (
                        <div
                          className={`w-0.5 h-full absolute top-10 ${
                            item.completed ? "bg-green-300 dark:bg-green-700" : "bg-border"
                          }`}
                        />
                      )}
                    </div>
                    <div className="flex-1 pt-1">
                      <h3 className={`font-semibold ${item.completed ? "text-foreground" : "text-muted-foreground"}`}>
                        {item.status}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {item.date} {item.time !== "Pending" && `• ${item.time}`}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            <Card className="p-6 bg-muted/50">
              <h3 className="font-semibold mb-4">Need Help?</h3>
              <p className="text-sm text-muted-foreground mb-4">
                If you have any questions about your order or delivery, our support team is here to help.
              </p>
              <div className="flex gap-4">
                <Button variant="outline" asChild>
                  <Link href="/contact">Contact Support</Link>
                </Button>
                <Button variant="outline" asChild>
                  <Link href="/shipping">Shipping Info</Link>
                </Button>
              </div>
            </Card>
          </div>
        )}

        {!tracking && (
          <Card className="p-8 text-center">
            <Package className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Enter your order ID to track</h3>
            <p className="text-sm text-muted-foreground">
              Your tracking information will appear here once you submit your order ID
            </p>
          </Card>
        )}
      </div>
    </div>
  )
}
