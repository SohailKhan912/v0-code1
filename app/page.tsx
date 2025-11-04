import { Navigation } from "@/components/navigation"
import { HeroSection } from "@/components/hero-section"
import { FeaturesSection } from "@/components/features-section"
import { GallerySection } from "@/components/gallery-section"
import { TrustSection } from "@/components/trust-section"
import { TestimonialsSection } from "@/components/testimonials-section"
import { CTASection } from "@/components/cta-section"
import { NewsletterSection } from "@/components/newsletter-section"
import { ExpertHelpBox } from "@/components/expert-help-box"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <HeroSection />
      <FeaturesSection />
      <GallerySection />
      <TrustSection />
      <TestimonialsSection />
      <NewsletterSection />
      <CTASection />
      <Footer />
      <ExpertHelpBox />
    </div>
  )
}
