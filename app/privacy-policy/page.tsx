import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Shield, Lock, Eye, Database, UserCheck, Mail } from "lucide-react"

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <Link href="/" className="text-sm text-muted-foreground hover:text-primary">
            ← Back to Home
          </Link>
        </div>

        <div className="mb-12">
          <h1 className="text-4xl font-bold mb-4">Privacy Policy</h1>
          <p className="text-muted-foreground">Last updated: January 2025</p>
        </div>

        <div className="prose prose-slate max-w-none">
          <Card className="p-6 mb-8 bg-primary/5 border-primary/20">
            <div className="flex items-start gap-4">
              <Shield className="h-6 w-6 text-primary mt-1" />
              <div>
                <h3 className="text-lg font-semibold mb-2">Your Privacy Matters</h3>
                <p className="text-sm text-muted-foreground">
                  At GlassVision, we are committed to protecting your personal information and your right to privacy.
                  This policy explains how we collect, use, and safeguard your data.
                </p>
              </div>
            </div>
          </Card>

          <section className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <Database className="h-5 w-5 text-primary" />
              <h2 className="text-2xl font-bold">Information We Collect</h2>
            </div>
            <div className="space-y-4 text-muted-foreground">
              <div>
                <h3 className="font-semibold text-foreground mb-2">Personal Information</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Name, email address, and phone number</li>
                  <li>Shipping and billing addresses</li>
                  <li>Payment information (processed securely through our payment partners)</li>
                  <li>Order history and preferences</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-2">Automatically Collected Information</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li>IP address and browser type</li>
                  <li>Device information and operating system</li>
                  <li>Pages visited and time spent on our website</li>
                  <li>Cookies and similar tracking technologies</li>
                </ul>
              </div>
            </div>
          </section>

          <section className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <Eye className="h-5 w-5 text-primary" />
              <h2 className="text-2xl font-bold">How We Use Your Information</h2>
            </div>
            <div className="space-y-3 text-muted-foreground">
              <p>We use the information we collect to:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Process and fulfill your orders</li>
                <li>Communicate with you about your orders and account</li>
                <li>Provide customer support and respond to inquiries</li>
                <li>Send promotional emails and marketing communications (with your consent)</li>
                <li>Improve our website, products, and services</li>
                <li>Detect and prevent fraud and security issues</li>
                <li>Comply with legal obligations</li>
              </ul>
            </div>
          </section>

          <section className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <Lock className="h-5 w-5 text-primary" />
              <h2 className="text-2xl font-bold">Data Security</h2>
            </div>
            <p className="text-muted-foreground mb-4">
              We implement industry-standard security measures to protect your personal information:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
              <li>SSL encryption for all data transmission</li>
              <li>Secure payment processing through certified payment gateways</li>
              <li>Regular security audits and updates</li>
              <li>Restricted access to personal information</li>
              <li>Employee training on data protection</li>
            </ul>
          </section>

          <section className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <UserCheck className="h-5 w-5 text-primary" />
              <h2 className="text-2xl font-bold">Your Rights</h2>
            </div>
            <p className="text-muted-foreground mb-4">You have the right to:</p>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
              <li>Access the personal information we hold about you</li>
              <li>Request correction of inaccurate information</li>
              <li>Request deletion of your personal information</li>
              <li>Opt-out of marketing communications</li>
              <li>Object to processing of your personal information</li>
              <li>Request data portability</li>
            </ul>
          </section>

          <section className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <Mail className="h-5 w-5 text-primary" />
              <h2 className="text-2xl font-bold">Contact Us</h2>
            </div>
            <p className="text-muted-foreground mb-4">
              If you have any questions about this Privacy Policy or wish to exercise your rights, please contact us:
            </p>
            <div className="bg-muted/50 p-4 rounded-lg space-y-2 text-sm">
              <p>
                <strong>Email:</strong> privacy@glassvision.com
              </p>
              <p>
                <strong>Phone:</strong> +91 1800-123-4567
              </p>
              <p>
                <strong>Address:</strong> GlassVision Pvt Ltd, Mumbai, Maharashtra, India
              </p>
            </div>
          </section>

          <Card className="p-6 bg-muted/50">
            <p className="text-sm text-muted-foreground">
              We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new
              Privacy Policy on this page and updating the "Last updated" date.
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
