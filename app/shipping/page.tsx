import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Truck, Package, MapPin, Clock, IndianRupee, CheckCircle } from "lucide-react"

export default function ShippingPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <Link href="/" className="text-sm text-muted-foreground hover:text-primary">
            ← Back to Home
          </Link>
        </div>

        <div className="mb-12">
          <h1 className="text-4xl font-bold mb-4">Shipping & Delivery</h1>
          <p className="text-muted-foreground">Fast, secure, and reliable delivery across India</p>
        </div>

        <div className="prose prose-slate max-w-none">
          <Card className="p-6 mb-8 bg-primary/5 border-primary/20">
            <div className="flex items-start gap-4">
              <Truck className="h-6 w-6 text-primary mt-1" />
              <div>
                <h3 className="text-lg font-semibold mb-2">Professional Delivery Service</h3>
                <p className="text-sm text-muted-foreground">
                  We ensure your premium glass doors are delivered safely with specialized packaging and handling. Track
                  your order every step of the way.
                </p>
              </div>
            </div>
          </Card>

          <section className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <MapPin className="h-5 w-5 text-primary" />
              <h2 className="text-2xl font-bold">Delivery Coverage</h2>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <Card className="p-4">
                <h3 className="font-semibold mb-2 flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  Metro Cities
                </h3>
                <p className="text-sm text-muted-foreground mb-2">
                  Mumbai, Delhi, Bangalore, Hyderabad, Chennai, Kolkata, Pune, Ahmedabad
                </p>
                <p className="text-sm font-semibold text-primary">5-7 business days</p>
              </Card>
              <Card className="p-4">
                <h3 className="font-semibold mb-2 flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  Tier 2 Cities
                </h3>
                <p className="text-sm text-muted-foreground mb-2">Major cities and state capitals across India</p>
                <p className="text-sm font-semibold text-primary">7-10 business days</p>
              </Card>
              <Card className="p-4">
                <h3 className="font-semibold mb-2 flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  Other Locations
                </h3>
                <p className="text-sm text-muted-foreground mb-2">Remote areas and smaller towns</p>
                <p className="text-sm font-semibold text-primary">10-15 business days</p>
              </Card>
              <Card className="p-4">
                <h3 className="font-semibold mb-2 flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  Express Delivery
                </h3>
                <p className="text-sm text-muted-foreground mb-2">Available in select metro cities</p>
                <p className="text-sm font-semibold text-primary">3-5 business days</p>
              </Card>
            </div>
          </section>

          <section className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <IndianRupee className="h-5 w-5 text-primary" />
              <h2 className="text-2xl font-bold">Shipping Charges</h2>
            </div>
            <div className="space-y-4">
              <Card className="p-4 bg-green-50 dark:bg-green-950/20 border-green-200 dark:border-green-900">
                <div className="flex items-center gap-3 mb-2">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  <h3 className="font-semibold text-green-900 dark:text-green-100">Free Shipping</h3>
                </div>
                <p className="text-sm text-green-800 dark:text-green-200">
                  On all orders above ₹50,000 to metro cities
                </p>
              </Card>

              <div className="text-muted-foreground space-y-3">
                <p>
                  <strong className="text-foreground">Standard Shipping:</strong>
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Metro Cities: ₹1,500 - ₹2,500 (based on product size)</li>
                  <li>Tier 2 Cities: ₹2,500 - ₹4,000</li>
                  <li>Remote Areas: ₹4,000 - ₹6,000</li>
                </ul>
                <p className="mt-4">
                  <strong className="text-foreground">Express Delivery:</strong> Additional ₹2,000
                </p>
                <p>
                  <strong className="text-foreground">Installation Service:</strong> ₹3,000 - ₹8,000 (optional, varies
                  by location)
                </p>
              </div>
            </div>
          </section>

          <section className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <Package className="h-5 w-5 text-primary" />
              <h2 className="text-2xl font-bold">Packaging & Handling</h2>
            </div>
            <div className="space-y-3 text-muted-foreground">
              <p>We take extra care to ensure your glass doors arrive in perfect condition:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Industrial-grade protective packaging with foam and bubble wrap</li>
                <li>Wooden crates for large or custom doors</li>
                <li>Corner protectors and edge guards</li>
                <li>Moisture-resistant wrapping</li>
                <li>Fragile handling labels and instructions</li>
                <li>Insurance coverage for transit damage</li>
              </ul>
            </div>
          </section>

          <section className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <Clock className="h-5 w-5 text-primary" />
              <h2 className="text-2xl font-bold">Delivery Process</h2>
            </div>
            <div className="space-y-4">
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-semibold">
                  1
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Order Confirmation</h3>
                  <p className="text-sm text-muted-foreground">
                    You'll receive an order confirmation email with estimated delivery date
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-semibold">
                  2
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Production & Quality Check</h3>
                  <p className="text-sm text-muted-foreground">
                    Your door is manufactured and undergoes rigorous quality inspection
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-semibold">
                  3
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Dispatch Notification</h3>
                  <p className="text-sm text-muted-foreground">
                    Receive tracking details via SMS and email when your order ships
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-semibold">
                  4
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Real-time Tracking</h3>
                  <p className="text-sm text-muted-foreground">
                    Track your shipment in real-time through our website or tracking link
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-semibold">
                  5
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Delivery & Installation</h3>
                  <p className="text-sm text-muted-foreground">
                    Our team delivers to your doorstep. Optional installation service available
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <CheckCircle className="h-5 w-5 text-primary" />
              <h2 className="text-2xl font-bold">Delivery Guidelines</h2>
            </div>
            <div className="space-y-3 text-muted-foreground">
              <ul className="list-disc pl-6 space-y-2">
                <li>Someone must be present to receive the delivery</li>
                <li>Valid ID proof required at the time of delivery</li>
                <li>Inspect the package before accepting delivery</li>
                <li>Report any visible damage immediately to the delivery person</li>
                <li>Sign the delivery receipt only after inspection</li>
                <li>Keep the packaging for 7 days in case of returns</li>
              </ul>
            </div>
          </section>

          <Card className="p-6 bg-muted/50">
            <h3 className="font-semibold mb-2">Track Your Order</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Use your order number to track your shipment in real-time.
            </p>
            <Button asChild>
              <Link href="/track-order">Track Order</Link>
            </Button>
          </Card>
        </div>

        <div className="mt-12 flex gap-4">
          <Button asChild>
            <Link href="/contact">Contact Support</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/">Back to Home</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
