import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Glasses, Cable as Cube, Zap, BarChart3 } from "lucide-react"

const features = [
  {
    icon: Glasses,
    title: "AR Visualization",
    description: "See how glass doors look in your space using augmented reality before you buy.",
  },
  {
    icon: Cube,
    title: "3D Customization",
    description: "Design your perfect door with custom sizes, finishes, and styles in real-time.",
  },
  {
    icon: Zap,
    title: "VR Experience",
    description: "Immerse yourself in a virtual showroom to explore every detail.",
  },
  {
    icon: BarChart3,
    title: "Easy Booking",
    description: "Book installation appointments with just a few clicks. Real-time availability.",
  },
]

export function FeaturesSection() {
  return (
    <section className="py-20 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 text-pretty">Why Choose GlassVision?</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Innovative technology meets premium craftsmanship. Experience the future of glass door shopping.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <Card key={index} className="hover:shadow-lg transition">
                <CardHeader>
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <CardTitle>{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>{feature.description}</CardDescription>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}
