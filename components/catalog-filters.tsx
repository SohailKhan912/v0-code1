"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

interface CatalogFiltersProps {
  selectedStyle: string | null
  setSelectedStyle: (style: string | null) => void
  selectedSize: string | null
  setSelectedSize: (size: string | null) => void
  priceRange: [number, number]
  setPriceRange: (range: [number, number]) => void
}

const styles = ["Modern", "Minimalist", "Classic", "Contemporary", "Industrial"]
const sizes = ["Small (600-800mm)", "Medium (800-1200mm)", "Large (1200-1600mm)", "Extra Large (1600mm+)"]

export function CatalogFilters({
  selectedStyle,
  setSelectedStyle,
  selectedSize,
  setSelectedSize,
  priceRange,
  setPriceRange,
}: CatalogFiltersProps) {
  return (
    <div className="space-y-6 sticky top-24">
      {/* Style Filter */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Style</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {styles.map((style) => (
            <button
              key={style}
              onClick={() => setSelectedStyle(selectedStyle === style ? null : style)}
              className={`w-full text-left px-4 py-2 rounded-lg transition ${
                selectedStyle === style
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted hover:bg-muted/80 text-foreground"
              }`}
            >
              {style}
            </button>
          ))}
        </CardContent>
      </Card>

      {/* Size Filter */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Size</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {sizes.map((size) => (
            <button
              key={size}
              onClick={() => setSelectedSize(selectedSize === size ? null : size)}
              className={`w-full text-left px-4 py-2 rounded-lg transition text-sm ${
                selectedSize === size
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted hover:bg-muted/80 text-foreground"
              }`}
            >
              {size}
            </button>
          ))}
        </CardContent>
      </Card>

      {/* Price Filter */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Price Range</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <input
            type="range"
            min="0"
            max="5000"
            step="100"
            value={priceRange[1]}
            onChange={(e) => setPriceRange([priceRange[0], Number.parseInt(e.target.value)])}
            className="w-full"
          />
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">₹{priceRange[0].toLocaleString()}</span>
            <span className="text-muted-foreground">₹{priceRange[1].toLocaleString()}</span>
          </div>
        </CardContent>
      </Card>

      <Button
        variant="outline"
        onClick={() => {
          setSelectedStyle(null)
          setSelectedSize(null)
          setPriceRange([0, 5000])
        }}
        className="w-full"
      >
        Clear Filters
      </Button>
    </div>
  )
}
