import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Card, CardContent } from "@/components/ui/card"
import { Award, Users, Zap, Shield, Heart, TrendingUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Hero Section */}
      <section className="pt-24 pb-16 bg-gradient-to-br from-primary/5 via-transparent to-accent/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h1 className="text-5xl font-bold leading-tight text-pretty">Crafting Excellence in Glass Since 2015</h1>
              <p className="text-xl text-muted-foreground leading-relaxed">
                GlassVision is revolutionizing the glass door industry by combining traditional craftsmanship with
                cutting-edge AR/VR technology. We believe every space deserves the perfect entrance.
              </p>
              <div className="flex gap-4">
                <Link href="/catalog">
                  <Button size="lg" className="bg-primary hover:bg-primary/90">
                    Explore Products
                  </Button>
                </Link>
                <Link href="/customize">
                  <Button variant="outline" size="lg" className="bg-transparent">
                    Start Customizing
                  </Button>
                </Link>
              </div>
            </div>
            <div className="relative h-96 rounded-2xl overflow-hidden">
              <img src="/modern-glass-door-manufacturing-workshop-with-craf.jpg" alt="GlassVision Workshop" className="w-full h-full object-cover" />
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <p className="text-4xl font-bold text-primary mb-2">10+</p>
              <p className="text-muted-foreground">Years Experience</p>
            </div>
            <div className="text-center">
              <p className="text-4xl font-bold text-primary mb-2">5000+</p>
              <p className="text-muted-foreground">Happy Customers</p>
            </div>
            <div className="text-center">
              <p className="text-4xl font-bold text-primary mb-2">50+</p>
              <p className="text-muted-foreground">Design Options</p>
            </div>
            <div className="text-center">
              <p className="text-4xl font-bold text-primary mb-2">99%</p>
              <p className="text-muted-foreground">Satisfaction Rate</p>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-pretty">Our Core Values</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              These principles guide everything we do, from design to installation.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="hover:shadow-lg transition">
              <CardContent className="pt-6 space-y-4">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Award className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold">Quality First</h3>
                <p className="text-muted-foreground">
                  We use only premium materials and employ master craftsmen to ensure every door meets our exacting
                  standards.
                </p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition">
              <CardContent className="pt-6 space-y-4">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Zap className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold">Innovation</h3>
                <p className="text-muted-foreground">
                  Pioneering AR/VR visualization technology to help you see your perfect door before it's made.
                </p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition">
              <CardContent className="pt-6 space-y-4">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Heart className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold">Customer Care</h3>
                <p className="text-muted-foreground">
                  From consultation to installation, we're with you every step of the way with dedicated support.
                </p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition">
              <CardContent className="pt-6 space-y-4">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Shield className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold">Reliability</h3>
                <p className="text-muted-foreground">
                  10-year warranty on all products. We stand behind our work with comprehensive coverage.
                </p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition">
              <CardContent className="pt-6 space-y-4">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold">Sustainability</h3>
                <p className="text-muted-foreground">
                  Eco-friendly materials and processes. We're committed to reducing our environmental impact.
                </p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition">
              <CardContent className="pt-6 space-y-4">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Users className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold">Community</h3>
                <p className="text-muted-foreground">
                  Supporting local artisans and giving back to the communities we serve.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="relative h-96 rounded-2xl overflow-hidden order-2 md:order-1">
              <img src="/luxury-glass-door-showroom-interior.jpg" alt="Our Showroom" className="w-full h-full object-cover" />
            </div>
            <div className="space-y-6 order-1 md:order-2">
              <h2 className="text-4xl font-bold text-pretty">Our Story</h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  Founded in 2015 by a team of passionate architects and engineers, GlassVision was born from a simple
                  observation: choosing the right door shouldn't require imagination alone.
                </p>
                <p>
                  We pioneered the use of AR and VR technology in the glass door industry, allowing customers to
                  visualize their choices in real-time. What started as a small workshop in Mumbai has grown into
                  India's leading premium glass door manufacturer.
                </p>
                <p>
                  Today, we combine traditional craftsmanship with modern technology to deliver doors that are not just
                  functional, but works of art. Every door tells a story, and we're honored to be part of yours.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-pretty">Meet Our Leadership</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              The visionaries behind GlassVision's success.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="hover:shadow-lg transition">
              <CardContent className="pt-6 text-center space-y-4">
                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 mx-auto flex items-center justify-center">
                  <img src="/professional-indian-male-ceo-portrait.jpg" alt="CEO" className="w-full h-full rounded-full object-cover" />
                </div>
                <div>
                  <h3 className="text-xl font-bold">Rajesh Kumar</h3>
                  <p className="text-sm text-muted-foreground">Founder & CEO</p>
                </div>
                <p className="text-sm text-muted-foreground">
                  20+ years in architectural glass design. Visionary behind our AR/VR technology.
                </p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition">
              <CardContent className="pt-6 text-center space-y-4">
                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 mx-auto flex items-center justify-center">
                  <img src="/professional-indian-female-cto-portrait.jpg" alt="CTO" className="w-full h-full rounded-full object-cover" />
                </div>
                <div>
                  <h3 className="text-xl font-bold">Priya Sharma</h3>
                  <p className="text-sm text-muted-foreground">Chief Technology Officer</p>
                </div>
                <p className="text-sm text-muted-foreground">
                  Leading our innovation in 3D visualization and smart manufacturing.
                </p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition">
              <CardContent className="pt-6 text-center space-y-4">
                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 mx-auto flex items-center justify-center">
                  <img
                    src="/indian-male-designer.png"
                    alt="Design Director"
                    className="w-full h-full rounded-full object-cover"
                  />
                </div>
                <div>
                  <h3 className="text-xl font-bold">Arjun Patel</h3>
                  <p className="text-sm text-muted-foreground">Design Director</p>
                </div>
                <p className="text-sm text-muted-foreground">
                  Award-winning designer with expertise in contemporary and traditional styles.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-primary/10 via-transparent to-accent/10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <h2 className="text-4xl font-bold text-pretty">Ready to Transform Your Space?</h2>
          <p className="text-xl text-muted-foreground">
            Join thousands of satisfied customers who chose GlassVision for their perfect door.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/catalog">
              <Button size="lg" className="bg-primary hover:bg-primary/90">
                Browse Catalog
              </Button>
            </Link>
            <Link href="/customize">
              <Button variant="outline" size="lg" className="bg-transparent">
                Start Customizing
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
