import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { RefreshCw, Clock, CheckCircle, XCircle, AlertTriangle } from "lucide-react"

export default function RefundPolicyPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <Link href="/" className="text-sm text-muted-foreground hover:text-primary">
            ← Back to Home
          </Link>
        </div>

        <div className="mb-12">
          <h1 className="text-4xl font-bold mb-4">Cancellation & Refund Policy</h1>
          <p className="text-muted-foreground">Last updated: January 2025</p>
        </div>

        <div className="prose prose-slate max-w-none">
          <Card className="p-6 mb-8 bg-primary/5 border-primary/20">
            <div className="flex items-start gap-4">
              <RefreshCw className="h-6 w-6 text-primary mt-1" />
              <div>
                <h3 className="text-lg font-semibold mb-2">Customer Satisfaction Guaranteed</h3>
                <p className="text-sm text-muted-foreground">
                  We want you to be completely satisfied with your purchase. This policy outlines our cancellation and
                  refund procedures to ensure a smooth experience.
                </p>
              </div>
            </div>
          </Card>

          <section className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <XCircle className="h-5 w-5 text-primary" />
              <h2 className="text-2xl font-bold">Order Cancellation</h2>
            </div>

            <div className="space-y-4">
              <div className="bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-900 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400 mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-green-900 dark:text-green-100 mb-2">
                      Before Production (Free Cancellation)
                    </h3>
                    <p className="text-sm text-green-800 dark:text-green-200">
                      Orders can be cancelled free of charge within 24 hours of placement, before production begins.
                      Full refund will be processed within 5-7 business days.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-yellow-50 dark:bg-yellow-950/20 border border-yellow-200 dark:border-yellow-900 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="h-5 w-5 text-yellow-600 dark:text-yellow-400 mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-yellow-900 dark:text-yellow-100 mb-2">
                      During Production (Partial Refund)
                    </h3>
                    <p className="text-sm text-yellow-800 dark:text-yellow-200 mb-2">
                      If production has started, cancellation will incur a 30% processing fee. Refund of 70% of the
                      order value will be processed within 7-10 business days.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-900 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <XCircle className="h-5 w-5 text-red-600 dark:text-red-400 mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-red-900 dark:text-red-100 mb-2">
                      After Dispatch (No Cancellation)
                    </h3>
                    <p className="text-sm text-red-800 dark:text-red-200">
                      Orders cannot be cancelled once dispatched. Please refer to our return policy for post-delivery
                      options.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 text-muted-foreground">
              <h3 className="font-semibold text-foreground mb-2">How to Cancel</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>Contact us immediately at orders@glassvision.com</li>
                <li>Provide your order number and reason for cancellation</li>
                <li>Our team will process your request within 24 hours</li>
              </ul>
            </div>
          </section>

          <section className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <RefreshCw className="h-5 w-5 text-primary" />
              <h2 className="text-2xl font-bold">Return & Refund Policy</h2>
            </div>

            <div className="space-y-4 text-muted-foreground">
              <div>
                <h3 className="font-semibold text-foreground mb-2">Eligible Returns</h3>
                <p className="mb-2">We accept returns within 7 days of delivery for:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Damaged or defective products</li>
                  <li>Wrong product delivered</li>
                  <li>Manufacturing defects</li>
                  <li>Significant variation from product description</li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold text-foreground mb-2">Non-Returnable Items</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Custom-designed or personalized glass doors</li>
                  <li>Products damaged due to improper installation</li>
                  <li>Items used or installed</li>
                  <li>Products without original packaging</li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold text-foreground mb-2">Return Process</h3>
                <ol className="list-decimal pl-6 space-y-2">
                  <li>Contact our support team within 7 days of delivery</li>
                  <li>Provide photos/videos of the issue</li>
                  <li>Our team will verify and approve the return</li>
                  <li>Schedule pickup or return shipping (we cover costs for defective items)</li>
                  <li>Refund processed within 10-14 business days after inspection</li>
                </ol>
              </div>
            </div>
          </section>

          <section className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <Clock className="h-5 w-5 text-primary" />
              <h2 className="text-2xl font-bold">Refund Timeline</h2>
            </div>
            <div className="space-y-3 text-muted-foreground">
              <p>Refunds are processed based on the original payment method:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  <strong>Credit/Debit Cards:</strong> 5-7 business days
                </li>
                <li>
                  <strong>UPI/Digital Wallets:</strong> 3-5 business days
                </li>
                <li>
                  <strong>Net Banking:</strong> 7-10 business days
                </li>
                <li>
                  <strong>EMI:</strong> Processed according to bank policies (10-15 business days)
                </li>
              </ul>
              <p className="mt-4">
                Note: Bank processing times may vary. If you don't receive your refund within the specified timeframe,
                please contact your bank or our support team.
              </p>
            </div>
          </section>

          <section className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <AlertTriangle className="h-5 w-5 text-primary" />
              <h2 className="text-2xl font-bold">Important Notes</h2>
            </div>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
              <li>Shipping charges are non-refundable unless the return is due to our error</li>
              <li>Installation charges are non-refundable once service is provided</li>
              <li>Custom orders require 50% advance payment (non-refundable)</li>
              <li>Warranty claims are handled separately from returns</li>
              <li>All returns must be approved before shipping back to us</li>
            </ul>
          </section>

          <Card className="p-6 bg-muted/50">
            <h3 className="font-semibold mb-2">Need Help?</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Our customer support team is here to assist you with any questions about cancellations or refunds.
            </p>
            <div className="space-y-2 text-sm">
              <p>
                <strong>Email:</strong> support@glassvision.com
              </p>
              <p>
                <strong>Phone:</strong> +91 1800-123-4567 (Mon-Sat, 9 AM - 6 PM)
              </p>
              <p>
                <strong>WhatsApp:</strong> +91 98765-43210
              </p>
            </div>
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
