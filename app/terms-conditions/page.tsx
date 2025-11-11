import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { FileText, Scale, AlertCircle, CheckCircle } from "lucide-react"

export default function TermsConditionsPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <Link href="/" className="text-sm text-muted-foreground hover:text-primary">
            ← Back to Home
          </Link>
        </div>

        <div className="mb-12">
          <h1 className="text-4xl font-bold mb-4">Terms and Conditions</h1>
          <p className="text-muted-foreground">Last updated: January 2025</p>
        </div>

        <div className="prose prose-slate max-w-none">
          <Card className="p-6 mb-8 bg-primary/5 border-primary/20">
            <div className="flex items-start gap-4">
              <Scale className="h-6 w-6 text-primary mt-1" />
              <div>
                <h3 className="text-lg font-semibold mb-2">Agreement to Terms</h3>
                <p className="text-sm text-muted-foreground">
                  By accessing and using GlassVision's website and services, you agree to be bound by these Terms and
                  Conditions. Please read them carefully before making a purchase.
                </p>
              </div>
            </div>
          </Card>

          <section className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <FileText className="h-5 w-5 text-primary" />
              <h2 className="text-2xl font-bold">1. Use of Website</h2>
            </div>
            <div className="space-y-3 text-muted-foreground">
              <p>
                You agree to use our website only for lawful purposes and in accordance with these Terms. You agree not
                to:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Use the website in any way that violates applicable laws or regulations</li>
                <li>Attempt to gain unauthorized access to our systems or networks</li>
                <li>Interfere with or disrupt the website's functionality</li>
                <li>Use automated systems to access the website without permission</li>
                <li>Reproduce, duplicate, or copy any content without authorization</li>
              </ul>
            </div>
          </section>

          <section className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <CheckCircle className="h-5 w-5 text-primary" />
              <h2 className="text-2xl font-bold">2. Product Information</h2>
            </div>
            <div className="space-y-3 text-muted-foreground">
              <p>We strive to provide accurate product descriptions and images. However:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Colors may vary slightly due to screen settings</li>
                <li>Dimensions are approximate and may have minor variations</li>
                <li>We reserve the right to correct errors in product information</li>
                <li>Custom designs are subject to technical feasibility review</li>
                <li>AR/3D previews are representations and may differ from final products</li>
              </ul>
            </div>
          </section>

          <section className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <FileText className="h-5 w-5 text-primary" />
              <h2 className="text-2xl font-bold">3. Orders and Pricing</h2>
            </div>
            <div className="space-y-3 text-muted-foreground">
              <h3 className="font-semibold text-foreground">Order Acceptance</h3>
              <p>All orders are subject to acceptance and availability. We reserve the right to:</p>
              <ul className="list-disc pl-6 space-y-2 mb-4">
                <li>Refuse or cancel any order for any reason</li>
                <li>Limit quantities on any product</li>
                <li>Verify information before processing orders</li>
              </ul>

              <h3 className="font-semibold text-foreground">Pricing</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>All prices are in Indian Rupees (INR) unless stated otherwise</li>
                <li>Prices are subject to change without notice</li>
                <li>The price charged will be the price displayed at checkout</li>
                <li>Additional charges may apply for custom designs or installations</li>
              </ul>
            </div>
          </section>

          <section className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <FileText className="h-5 w-5 text-primary" />
              <h2 className="text-2xl font-bold">4. Payment Terms</h2>
            </div>
            <div className="space-y-3 text-muted-foreground">
              <p>Payment must be made in full at the time of order unless otherwise agreed. We accept:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Credit and debit cards</li>
                <li>UPI and digital wallets</li>
                <li>Net banking</li>
                <li>EMI options (subject to approval)</li>
              </ul>
              <p className="mt-4">All payments are processed securely through our certified payment partners.</p>
            </div>
          </section>

          <section className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <FileText className="h-5 w-5 text-primary" />
              <h2 className="text-2xl font-bold">5. Intellectual Property</h2>
            </div>
            <p className="text-muted-foreground">
              All content on this website, including text, graphics, logos, images, and software, is the property of
              GlassVision and protected by intellectual property laws. You may not use, reproduce, or distribute any
              content without our written permission.
            </p>
          </section>

          <section className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <AlertCircle className="h-5 w-5 text-primary" />
              <h2 className="text-2xl font-bold">6. Limitation of Liability</h2>
            </div>
            <div className="space-y-3 text-muted-foreground">
              <p>To the fullest extent permitted by law, GlassVision shall not be liable for:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Indirect, incidental, or consequential damages</li>
                <li>Loss of profits, data, or business opportunities</li>
                <li>Damages resulting from unauthorized access to our systems</li>
                <li>Delays or failures due to circumstances beyond our control</li>
              </ul>
            </div>
          </section>

          <section className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <FileText className="h-5 w-5 text-primary" />
              <h2 className="text-2xl font-bold">7. Governing Law</h2>
            </div>
            <p className="text-muted-foreground">
              These Terms and Conditions are governed by the laws of India. Any disputes shall be subject to the
              exclusive jurisdiction of the courts in Mumbai, Maharashtra.
            </p>
          </section>

          <Card className="p-6 bg-muted/50">
            <p className="text-sm text-muted-foreground">
              We reserve the right to modify these Terms and Conditions at any time. Changes will be effective
              immediately upon posting. Your continued use of the website constitutes acceptance of the modified terms.
            </p>
          </Card>
        </div>

        <div className="mt-12 flex gap-4">
          <Button asChild>
            <Link href="/contact">Contact Us</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/">Back to Home</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
