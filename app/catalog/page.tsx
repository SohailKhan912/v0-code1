"use client"

import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { CatalogGrid } from "@/components/catalog-grid"
import { CatalogFilters } from "@/components/catalog-filters"
import { useState } from "react"

export default function CatalogPage() {
  const [selectedStyle, setSelectedStyle] = useState<string | null>(null)
  const [selectedSize, setSelectedSize] = useState<string | null>(null)
  const [priceRange, setPriceRange] = useState([0, 5000])

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="pt-20 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-12">
            <h1 className="text-4xl font-bold mb-2">Glass Door Catalog</h1>
            <p className="text-muted-foreground text-lg">
              Browse our premium collection of glass doors. Customize any design to match your needs.
            </p>
          </div>

          {/* Filters and Grid */}
          <div className="grid lg:grid-cols-4 gap-8">
            <div className="lg:col-span-1">
              <CatalogFilters
                selectedStyle={selectedStyle}
                setSelectedStyle={setSelectedStyle}
                selectedSize={selectedSize}
                setSelectedSize={setSelectedSize}
                priceRange={priceRange}
                setPriceRange={setPriceRange}
              />
            </div>
            <div className="lg:col-span-3">
              <CatalogGrid style={selectedStyle} size={selectedSize} priceRange={priceRange} />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
