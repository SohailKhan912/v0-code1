import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Phone } from "lucide-react"

export function CTASection() {
  return (
    <section className="py-24 bg-gradient-to-br from-primary/10 via-accent/5 to-primary/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <h2 className="text-4xl md:text-5xl font-bold text-balance">Ready to Transform Your Space?</h2>
          <p className="text-xl text-muted-foreground">
            Start designing your perfect glass door today with our interactive 3D customizer and AR preview.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Link href="/customize">
              <Button
                size="lg"
                className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg hover:shadow-xl transition-all"
              >
                Start Customizing Now
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
            <Link href="/catalog">
              <Button size="lg" variant="outline" className="w-full sm:w-auto bg-background hover:bg-muted">
                <Phone className="mr-2 w-4 h-4" />
                Talk to an Expert
              </Button>
            </Link>
          </div>

          <p className="text-sm text-muted-foreground pt-4">Free consultation • No obligation • Expert guidance</p>
        </div>
      </div>
    </section>
  )
}
