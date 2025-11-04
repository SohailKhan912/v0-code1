import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Mail, Phone, MapPin, Clock, MessageSquare } from "lucide-react"

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <Link href="/" className="text-sm text-muted-foreground hover:text-primary">
            ← Back to Home
          </Link>
        </div>

        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold mb-4">Contact Us</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Have questions? We're here to help. Reach out to our team and we'll get back to you as soon as possible.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 mb-12">
          <Card className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                <Phone className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold">Phone</h3>
                <p className="text-sm text-muted-foreground">Mon-Sat, 9 AM - 6 PM</p>
              </div>
            </div>
            <p className="text-sm mb-2">+91 1800-123-4567</p>
            <p className="text-sm text-muted-foreground">Toll-free support line</p>
          </Card>

          <Card className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                <Mail className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold">Email</h3>
                <p className="text-sm text-muted-foreground">24/7 support</p>
              </div>
            </div>
            <p className="text-sm mb-2">support@glassvision.com</p>
            <p className="text-sm text-muted-foreground">We'll respond within 24 hours</p>
          </Card>

          <Card className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                <MapPin className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold">Office</h3>
                <p className="text-sm text-muted-foreground">Visit our showroom</p>
              </div>
            </div>
            <p className="text-sm mb-2">123 Glass Street, Andheri</p>
            <p className="text-sm text-muted-foreground">Mumbai, Maharashtra 400053</p>
          </Card>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          <div>
            <h2 className="text-2xl font-bold mb-6">Send us a Message</h2>
            <form className="space-y-6">
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input id="firstName" placeholder="John" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input id="lastName" placeholder="Doe" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="john@example.com" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input id="phone" type="tel" placeholder="+91 98765 43210" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="subject">Subject</Label>
                <Input id="subject" placeholder="How can we help?" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="message">Message</Label>
                <Textarea id="message" placeholder="Tell us more about your inquiry..." rows={6} />
              </div>

              <Button type="submit" className="w-full">
                <MessageSquare className="h-4 w-4 mr-2" />
                Send Message
              </Button>
            </form>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-6">Visit Our Showroom</h2>
            <Card className="p-6 mb-6">
              <div className="aspect-video bg-muted rounded-lg mb-4 flex items-center justify-center">
                <MapPin className="h-12 w-12 text-muted-foreground" />
              </div>
              <h3 className="font-semibold mb-2">GlassVision Showroom</h3>
              <p className="text-sm text-muted-foreground mb-4">
                123 Glass Street, Andheri East
                <br />
                Mumbai, Maharashtra 400053
                <br />
                India
              </p>
              <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
                <Clock className="h-4 w-4" />
                <span>Mon-Sat: 9:00 AM - 6:00 PM | Sun: Closed</span>
              </div>
              <Button variant="outline" className="w-full bg-transparent">
                Get Directions
              </Button>
            </Card>

            <Card className="p-6">
              <h3 className="font-semibold mb-4">Frequently Asked Questions</h3>
              <div className="space-y-4">
                <div>
                  <h4 className="text-sm font-semibold mb-1">What are your business hours?</h4>
                  <p className="text-sm text-muted-foreground">
                    Monday to Saturday, 9:00 AM to 6:00 PM. Closed on Sundays and public holidays.
                  </p>
                </div>
                <div>
                  <h4 className="text-sm font-semibold mb-1">Do you offer installation services?</h4>
                  <p className="text-sm text-muted-foreground">
                    Yes, we provide professional installation services across India. Contact us for a quote.
                  </p>
                </div>
                <div>
                  <h4 className="text-sm font-semibold mb-1">Can I customize my glass door?</h4>
                  <p className="text-sm text-muted-foreground">
                    Use our 3D customizer or contact our design team for personalized solutions.
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
