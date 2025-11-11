"use client"

import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { OrderTracker } from "@/components/order-tracker"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CheckCircle2, Package, TrendingUp, Download, Calendar, MapPin, Mail } from "lucide-react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"

interface OrderData {
  orderId: string
  estimatedDelivery: string
  customerInfo: {
    email: string
    name: string
  }
  total: number
  shippingAddress: {
    address: string
    city: string
    pincode: string
  }
}

export default function OrderConfirmationPage() {
  const searchParams = useSearchParams()
  const orderId = searchParams.get("orderId")
  const [orderData, setOrderData] = useState<OrderData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (orderId) {
      const fetchOrder = async () => {
        try {
          const response = await fetch(`/api/orders/get?orderId=${orderId}`)
          if (response.ok) {
            const data = await response.json()
            setOrderData(data.order || data)
            console.log("[v0] Order data loaded:", data.order)
          } else {
            console.warn("[v0] Order not found, using placeholder data")
            // Fallback to mock data
            const mockOrder: OrderData = {
              orderId,
              estimatedDelivery: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
              customerInfo: {
                email: "customer@example.com",
                name: "Customer Name",
              },
              total: 50000,
              shippingAddress: {
                address: "123 Main Street",
                city: "Mumbai",
                pincode: "400001",
              },
            }
            setOrderData(mockOrder)
          }
        } catch (error) {
          console.error("[v0] Failed to fetch order:", error)
        } finally {
          setLoading(false)
        }
      }
      fetchOrder()
    } else {
      setLoading(false)
    }
  }, [orderId])

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-IN", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="pt-20 pb-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-8 mb-12">
            <div className="flex justify-center">
              <div className="bg-green-100 rounded-full p-4">
                <CheckCircle2 className="w-12 h-12 text-green-600" />
              </div>
            </div>

            <div>
              <h1 className="text-4xl font-bold mb-2">Booking Confirmed!</h1>
              <p className="text-lg text-muted-foreground">
                Your glass door order has been confirmed and payment processed successfully.
              </p>
            </div>

            <Card className="bg-green-50 border-green-200">
              <CardContent className="pt-6 space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="flex items-start gap-3 p-4 bg-white rounded-lg">
                    <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <div className="text-left">
                      <p className="text-sm text-muted-foreground">Order ID</p>
                      <p className="font-bold text-lg">{orderId || "ORD-XXXXXXXXX"}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-4 bg-white rounded-lg">
                    <Calendar className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                    <div className="text-left">
                      <p className="text-sm text-muted-foreground">Estimated Delivery</p>
                      <p className="font-bold text-lg">
                        {orderData ? formatDate(orderData.estimatedDelivery) : "7-10 business days"}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="pt-2 text-sm text-center text-green-700 bg-green-100 p-3 rounded-lg">
                  <Mail className="w-4 h-4 inline mr-2" />A confirmation email has been sent to your registered email
                  address with all booking details.
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Booking Details Card */}
          <Card className="mb-12">
            <CardHeader>
              <CardTitle>Booking Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold text-sm text-muted-foreground mb-2">CUSTOMER INFORMATION</h3>
                  <div className="space-y-2">
                    <p className="font-medium">Name</p>
                    <p className="text-sm text-muted-foreground">{orderData?.customerInfo?.name || "Customer Name"}</p>
                    <p className="font-medium mt-3">Email</p>
                    <p className="text-sm text-muted-foreground break-all">
                      {orderData?.customerInfo?.email || "customer@example.com"}
                    </p>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold text-sm text-muted-foreground mb-2">SHIPPING ADDRESS</h3>
                  <div className="flex gap-2">
                    <MapPin className="w-4 h-4 text-muted-foreground flex-shrink-0 mt-0.5" />
                    <div className="space-y-1 text-sm">
                      <p>{orderData?.shippingAddress?.address || "123 Main Street"}</p>
                      <p>
                        {orderData?.shippingAddress?.city || "Mumbai"},{" "}
                        {orderData?.shippingAddress?.pincode || "400001"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Order Tracker */}
          {orderId && (
            <div className="mb-12">
              <OrderTracker orderId={orderId} />
            </div>
          )}

          {/* What Happens Next */}
          <div className="space-y-4 mb-12">
            <h3 className="font-semibold text-lg">What Happens Next?</h3>
            <div className="grid md:grid-cols-3 gap-4">
              <Card>
                <CardContent className="pt-6 space-y-3 text-sm">
                  <div className="bg-primary/10 w-10 h-10 rounded-full flex items-center justify-center">
                    <Package className="w-5 h-5 text-primary" />
                  </div>
                  <h4 className="font-semibold">Processing</h4>
                  <p className="text-muted-foreground">Your door is being prepared for shipment (1-2 days)</p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6 space-y-3 text-sm">
                  <div className="bg-primary/10 w-10 h-10 rounded-full flex items-center justify-center">
                    <TrendingUp className="w-5 h-5 text-primary" />
                  </div>
                  <h4 className="font-semibold">Shipping</h4>
                  <p className="text-muted-foreground">Your order ships with tracking info provided (3-5 days)</p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6 space-y-3 text-sm">
                  <div className="bg-primary/10 w-10 h-10 rounded-full flex items-center justify-center">
                    <CheckCircle2 className="w-5 h-5 text-primary" />
                  </div>
                  <h4 className="font-semibold">Delivery</h4>
                  <p className="text-muted-foreground">Professional installation and setup (scheduled)</p>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* FAQ Section */}
          <Card className="mb-12">
            <CardHeader>
              <CardTitle>Frequently Asked Questions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold mb-2">When will my order be delivered?</h4>
                <p className="text-sm text-muted-foreground">
                  Most orders are delivered within 7-10 business days from confirmation. You'll receive tracking
                  information via email.
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Is installation included?</h4>
                <p className="text-sm text-muted-foreground">
                  Yes, professional installation is included in your order. Our team will contact you to schedule the
                  installation.
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">What about warranty and returns?</h4>
                <p className="text-sm text-muted-foreground">
                  All orders come with a 5-year comprehensive warranty covering manufacturing defects. Returns are
                  accepted within 14 days.
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">How can I track my order?</h4>
                <p className="text-sm text-muted-foreground">
                  You can track your order using the order ID above. A tracking link will be sent to your email once
                  your order ships.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex gap-4 justify-center flex-wrap">
            <Link href="/catalog">
              <Button variant="outline" size="lg">
                Continue Shopping
              </Button>
            </Link>
            <Button size="lg" className="gap-2 bg-primary hover:bg-primary/90">
              <Download className="w-4 h-4" />
              Download Invoice
            </Button>
            <Link href="/">
              <Button size="lg" className="bg-primary hover:bg-primary/90">
                Back to Home
              </Button>
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
