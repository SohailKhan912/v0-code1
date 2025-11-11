import { Card, CardContent } from "@/components/ui/card"
import { Star } from "lucide-react"

const testimonials = [
  {
    name: "Amit Verma",
    role: "Homeowner, Mumbai",
    image: "/indian-male-customer-portrait.jpg",
    rating: 5,
    text: "The AR visualization was incredible! I could see exactly how the door would look in my home before ordering. The quality exceeded my expectations.",
  },
  {
    name: "Sneha Reddy",
    role: "Interior Designer, Bangalore",
    image: "/indian-female-interior-designer-portrait.jpg",
    rating: 5,
    text: "I recommend GlassVision to all my clients. Their customization options are unmatched, and the installation team is professional and punctual.",
  },
  {
    name: "Vikram Singh",
    role: "Business Owner, Delhi",
    image: "/indian-male-business-owner-portrait.jpg",
    rating: 5,
    text: "Installed glass doors in my office. The modern look transformed the entire space. Great quality and excellent customer service throughout.",
  },
]

export function TestimonialsSection() {
  return (
    <section className="py-20 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 text-pretty">What Our Customers Say</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Join thousands of satisfied customers who transformed their spaces with GlassVision.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="hover:shadow-lg transition">
              <CardContent className="pt-6 space-y-4">
                <div className="flex gap-1">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-primary text-primary" />
                  ))}
                </div>
                <p className="text-muted-foreground leading-relaxed">"{testimonial.text}"</p>
                <div className="flex items-center gap-3 pt-4 border-t">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 overflow-hidden">
                    <img
                      src={testimonial.image || "/placeholder.svg"}
                      alt={testimonial.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <p className="font-semibold">{testimonial.name}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
