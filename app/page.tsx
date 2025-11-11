// app/page.tsx
"use client"

import { Navigation } from "@/components/navigation"
import { HeroSection } from "@/components/hero-section"
import { FeaturesSection } from "@/components/features-section"
import { GallerySection } from "@/components/gallery-section"
import { TrustSection } from "@/components/trust-section"
import { TestimonialsSection } from "@/components/testimonials-section"
import { CTASection } from "@/components/cta-section"
import { ExpertHelpBox } from "@/components/expert-help-box"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Remove the extra top-right buttons section */}
      {/* <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-4 flex justify-end">
        ...
      </div> */}

      <HeroSection />
      <FeaturesSection />
      <GallerySection />
      <TrustSection />
      <TestimonialsSection />
      <CTASection />
      <Footer />
      <ExpertHelpBox />
    </div>
  )
}
