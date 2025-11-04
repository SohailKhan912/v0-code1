"use client"

import { useEffect } from "react"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useCart } from "@/components/cart-context"
import Link from "next/link"
import { ArrowLeft, Lock, Shield } from "lucide-react"
import { useRouter } from "next/navigation"
import { RazorpayCheckoutForm } from "@/components/razorpay-checkout-form"

export default function CheckoutPage() {
  const router = useRouter()
  const { items, total } = useCart()

  const subtotal = total
  const gst = subtotal * 0.18
  const shipping = subtotal > 50000 ? 0 : 1500
  const finalTotal = subtotal + gst + shipping

  useEffect(() => {
    if (items.length === 0) {
      router.push("/cart")
    }
  }, [items, router])

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="pt-20 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8 flex items-center gap-4">
            <Link href="/cart">
              <Button variant="ghost" size="sm" className="gap-2">
                <ArrowLeft className="w-4 h-4" />
                Back to Cart
              </Button>
            </Link>
            <h1 className="text-4xl font-bold">Checkout</h1>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <RazorpayCheckoutForm finalTotal={Math.round(finalTotal)} />
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <Card className="sticky top-24">
                <CardContent className="pt-6 space-y-4">
                  <h2 className="font-bold text-lg">Order Summary</h2>
                  <div className="space-y-3 max-h-64 overflow-y-auto">
                    {items.map((item) => (
                      <div key={item.id} className="pb-3 border-b text-sm">
                        <p className="font-medium">
                          {item.width}×{item.height}mm
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {item.quantity} × ₹{item.price.toLocaleString()}
                        </p>
                        <p className="font-semibold text-primary">₹{(item.price * item.quantity).toLocaleString()}</p>
                      </div>
                    ))}
                  </div>

                  <div className="border-t pt-4 space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Subtotal</span>
                      <span className="font-medium">₹{subtotal.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Tax (18% GST)</span>
                      <span className="font-medium">₹{Math.round(gst).toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Shipping</span>
                      <span className="font-medium">{shipping === 0 ? "FREE" : `₹${shipping.toLocaleString()}`}</span>
                    </div>
                  </div>

                  <div className="border-t pt-4">
                    <div className="flex justify-between">
                      <span className="font-bold">Total</span>
                      <span className="text-2xl font-bold text-primary">
                        ₹{Math.round(finalTotal).toLocaleString()}
                      </span>
                    </div>
                  </div>

                  {/* Trust Badges */}
                  <div className="grid grid-cols-2 gap-2 pt-4 border-t">
                    <div className="flex items-center gap-2 text-xs">
                      <Lock className="w-4 h-4 text-green-600" />
                      <span>SSL Secure</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs">
                      <Shield className="w-4 h-4 text-green-600" />
                      <span>Verified</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
