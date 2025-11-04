import { Shield, Award, Users, Zap, CheckCircle, TrendingUp } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

const trustPoints = [
  {
    icon: Shield,
    title: "5-Year Warranty",
    description: "Comprehensive coverage on all products",
  },
  {
    icon: Award,
    title: "ISO 9001 Certified",
    description: "International quality standards",
  },
  {
    icon: Users,
    title: "Expert Installation",
    description: "Professional team with 15+ years experience",
  },
  {
    icon: Zap,
    title: "Fast Delivery",
    description: "24-48 hour delivery across major cities",
  },
  {
    icon: CheckCircle,
    title: "Quality Assured",
    description: "Premium materials, rigorous testing",
  },
  {
    icon: TrendingUp,
    title: "Industry Leader",
    description: "Trusted by 2,500+ satisfied customers",
  },
]

export function TrustSection() {
  return (
    <section className="py-24 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-balance">Why Thousands Trust GlassVision</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            We're committed to delivering excellence in every aspect of our service.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {trustPoints.map((point, index) => {
            const Icon = point.icon
            return (
              <Card key={index} className="border-2 hover:border-primary/50 transition-all hover:shadow-lg">
                <CardContent className="pt-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Icon className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-2">{point.title}</h3>
                      <p className="text-sm text-muted-foreground">{point.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Certifications */}
        <div className="mt-16 pt-16 border-t border-border">
          <p className="text-center text-sm text-muted-foreground mb-8">Certified & Trusted By</p>
          <div className="flex flex-wrap justify-center items-center gap-12 opacity-60">
            <div className="text-2xl font-bold">ISO 9001</div>
            <div className="text-2xl font-bold">CE Certified</div>
            <div className="text-2xl font-bold">Green Building</div>
            <div className="text-2xl font-bold">Safety First</div>
          </div>
        </div>
      </div>
    </section>
  )
}
