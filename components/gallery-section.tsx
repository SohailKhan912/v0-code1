"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import Link from "next/link"

const galleryImages = [
  {
    src: "/modern-glass-door-office-entrance-professional.jpg",
    title: "Office Entrance",
    category: "Commercial",
  },
  {
    src: "/luxury-residential-glass-door-home-interior.jpg",
    title: "Luxury Home",
    category: "Residential",
  },
  {
    src: "/frameless-glass-door-minimalist-design.jpg",
    title: "Minimalist Design",
    category: "Modern",
  },
  {
    src: "/industrial-glass-door-warehouse-style.jpg",
    title: "Industrial Style",
    category: "Industrial",
  },
]

export function GallerySection() {
  return (
    <section className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-balance">Our Work Speaks for Itself</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Explore our portfolio of stunning glass door installations across residential and commercial spaces.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {galleryImages.map((image, index) => (
            <Card key={index} className="group overflow-hidden hover:shadow-2xl transition-all duration-300">
              <div className="relative h-80 overflow-hidden">
                <img
                  src={image.src || "/placeholder.svg"}
                  alt={image.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-4 group-hover:translate-y-0 transition-transform">
                  <span className="inline-block px-3 py-1 bg-primary/90 text-primary-foreground text-xs font-medium rounded-full mb-2">
                    {image.category}
                  </span>
                  <h3 className="text-white font-semibold text-lg">{image.title}</h3>
                </div>
              </div>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Link href="/catalog">
            <Button size="lg" variant="outline" className="bg-transparent hover:bg-muted">
              View Full Portfolio
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
