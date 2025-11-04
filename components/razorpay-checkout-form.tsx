"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CreditCard, AlertCircle, Loader2, CheckCircle } from "lucide-react"
import { useCart } from "@/components/cart-context"
import { useRouter } from "next/navigation"

declare global {
  interface Window {
    Razorpay: any
  }
}

interface RazorpayCheckoutFormProps {
  finalTotal?: number
}

export function RazorpayCheckoutForm({ finalTotal }: RazorpayCheckoutFormProps) {
  const router = useRouter()
  const { items, total, clearCart } = useCart()
  const [isProcessing, setIsProcessing] = useState(false)
  const [error, setError] = useState("")
  const [formData, setFormData] = useState({
    email: "",
    customerName: "",
    phone: "",
    address: "",
    city: "",
    pincode: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleDummyPayment = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setIsProcessing(true)

    try {
      console.log("[v0] Starting dummy Razorpay checkout process")

      const paymentAmount = finalTotal || total
      const subtotal = total
      const gst = subtotal * 0.18
      const shipping = subtotal > 50000 ? 0 : 1500

      // Step 1: Create Razorpay order (dummy)
      const orderResponse = await fetch("/api/razorpay/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: paymentAmount,
          email: formData.email,
          customerName: formData.customerName,
          items,
        }),
      })

      if (!orderResponse.ok) {
        throw new Error("Failed to create Razorpay order")
      }

      const razorpayOrderData = await orderResponse.json()
      console.log("[v0] Razorpay order created:", razorpayOrderData)

      // Step 2: Create database order with complete pricing breakdown
      const dbOrderResponse = await fetch("/api/orders/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items,
          subtotal: Math.round(subtotal),
          gst: Math.round(gst),
          shipping,
          total: Math.round(paymentAmount),
          customerInfo: {
            email: formData.email,
            name: formData.customerName,
            phone: formData.phone,
          },
          razorpayOrderId: razorpayOrderData.razorpayOrderId,
          shippingAddress: {
            address: formData.address,
            city: formData.city,
            pincode: formData.pincode,
          },
        }),
      })

      if (!dbOrderResponse.ok) {
        throw new Error("Failed to create order")
      }

      const dbOrder = await dbOrderResponse.json()
      console.log("[v0] Database order created:", dbOrder)

      const dummyPaymentId = `pay_DUMMY_${Date.now()}`
      console.log("[v0] Dummy payment approved:", dummyPaymentId)

      // Step 3: Send confirmation email
      try {
        const emailResponse = await fetch("/api/email/send-confirmation", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            to: formData.email,
            orderId: dbOrder.orderId,
            paymentId: dummyPaymentId,
            customerName: formData.customerName,
            amount: paymentAmount,
            items,
            estimatedDelivery: dbOrder.estimatedDelivery,
            shippingAddress: {
              address: formData.address,
              city: formData.city,
              pincode: formData.pincode,
            },
          }),
        })

        if (emailResponse.ok) {
          console.log("[v0] Confirmation email sent successfully")
        } else {
          console.warn("[v0] Email sending had an issue, but order confirmed")
        }
      } catch (emailErr) {
        console.warn("[v0] Email sending error:", emailErr)
      }

      // Step 4: Clear cart and redirect with proper delay
      clearCart()

      setTimeout(() => {
        router.push(`/order-confirmation?orderId=${dbOrder.orderId}&paymentId=${dummyPaymentId}&isDummy=true`)
      }, 500)
    } catch (err) {
      console.error("[v0] Dummy checkout error:", err)
      setError(err instanceof Error ? err.message : "Checkout failed")
      setIsProcessing(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    await handleDummyPayment(e)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <CreditCard className="w-5 h-5" />
          Payment Details
        </CardTitle>
      </CardHeader>
      <CardContent>
        {error && (
          <div className="mb-4 p-3 bg-destructive/10 text-destructive rounded-lg flex gap-2">
            <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
            <p className="text-sm">{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="your@email.com"
              className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Full Name</label>
            <input
              type="text"
              name="customerName"
              value={formData.customerName}
              onChange={handleChange}
              placeholder="John Doe"
              className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Phone Number</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="9876543210"
              className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              required
            />
          </div>

          <div className="border-t pt-4 space-y-3">
            <h3 className="font-semibold text-sm">Shipping Address</h3>
            <div>
              <label className="block text-sm font-medium mb-1">Street Address</label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="123 Main Street"
                className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">City</label>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  placeholder="Mumbai"
                  className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Pincode</label>
                <input
                  type="text"
                  name="pincode"
                  value={formData.pincode}
                  onChange={handleChange}
                  placeholder="400001"
                  className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  required
                />
              </div>
            </div>
          </div>

          <div className="flex gap-2 p-3 bg-blue-50 rounded-lg text-xs text-blue-700">
            <CheckCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
            <p>
              Test Mode: Using dummy payment for demonstration. Click "Pay" to confirm booking and receive confirmation
              email.
            </p>
          </div>

          <Button
            type="submit"
            disabled={isProcessing || items.length === 0}
            className="w-full bg-primary hover:bg-primary/90"
            size="lg"
          >
            {isProcessing ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Processing Payment...
              </>
            ) : (
              `Pay ₹${(finalTotal || total).toLocaleString()}`
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
